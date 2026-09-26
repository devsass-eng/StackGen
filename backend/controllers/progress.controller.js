const db = require('../db');

exports.updateProgress = async (req, res) => {
  const { lessonId } = req.params;
  const { status } = req.body; // 'not_started', 'in_progress', 'completed'
  
  try {
    let completedAt = status === 'completed' ? new Date() : null;
    
    // Check if progress entry exists
    const checkQuery = 'SELECT * FROM user_progress WHERE user_id = $1 AND lesson_id = $2';
    const checkResult = await db.query(checkQuery, [req.user.id, lessonId]);
    
    if (checkResult.rows.length === 0) {
      // Insert
      await db.query(
        'INSERT INTO user_progress (user_id, lesson_id, status, completed_at) VALUES ($1, $2, $3, $4)',
        [req.user.id, lessonId, status, completedAt]
      );
    } else {
      // Update
      await db.query(
        'UPDATE user_progress SET status = $1, completed_at = $2 WHERE user_id = $3 AND lesson_id = $4',
        [status, completedAt, req.user.id, lessonId]
      );
    }
    
    res.json({ msg: 'Progress updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getProgressStats = async (req, res) => {
  try {
    // Total lessons
    const totalResult = await db.query('SELECT COUNT(*) FROM lessons');
    const totalLessons = parseInt(totalResult.rows[0].count);
    
    // Progress per status
    const statsQuery = `
      SELECT status, COUNT(*) 
      FROM user_progress 
      WHERE user_id = $1 
      GROUP BY status
    `;
    const statsResult = await db.query(statsQuery, [req.user.id]);
    
    let completed = 0;
    let inProgress = 0;
    
    statsResult.rows.forEach(row => {
      if (row.status === 'completed') completed = parseInt(row.count);
      if (row.status === 'in_progress') inProgress = parseInt(row.count);
    });
    
    // Category breakdown
    const categoryStatsQuery = `
      SELECT c.name as category_name, c.id as category_id,
             COUNT(l.id) as total_category_lessons,
             SUM(CASE WHEN up.status = 'completed' THEN 1 ELSE 0 END) as completed_category_lessons,
             SUM(CASE WHEN up.status = 'in_progress' THEN 1 ELSE 0 END) as in_progress_category_lessons
      FROM learning_categories c
      JOIN lessons l ON c.id = l.category_id
      LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = $1
      GROUP BY c.id, c.name
      ORDER BY c.order_index
    `;
    const categoryStatsResult = await db.query(categoryStatsQuery, [req.user.id]);
    
    // Determine current learning position (first category with in-progress lessons, or first non-100% completed)
    let currentTopic = null;
    let foundCurrent = false;
    for (let cat of categoryStatsResult.rows) {
      if (parseInt(cat.in_progress_category_lessons) > 0) {
        currentTopic = cat.category_name;
        foundCurrent = true;
        break;
      }
    }
    
    if (!foundCurrent) {
      for (let cat of categoryStatsResult.rows) {
        if (parseInt(cat.completed_category_lessons) < parseInt(cat.total_category_lessons)) {
          currentTopic = cat.category_name;
          break;
        }
      }
    }
    if (!currentTopic) currentTopic = 'All Completed!';
    
    let overallPercentage = totalLessons === 0 ? 0 : Math.round((completed / totalLessons) * 100);
    
    res.json({
      totalLessons,
      completedLessons: completed,
      inProgressLessons: inProgress,
      notStartedLessons: totalLessons - completed - inProgress,
      overallPercentage,
      currentTopic,
      categoryStats: categoryStatsResult.rows.map(row => ({
        id: row.category_id,
        name: row.category_name,
        total: parseInt(row.total_category_lessons),
        completed: parseInt(row.completed_category_lessons),
        percentage: parseInt(row.total_category_lessons) === 0 ? 0 : Math.round((parseInt(row.completed_category_lessons) / parseInt(row.total_category_lessons)) * 100)
      }))
    });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
