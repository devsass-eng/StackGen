const db = require('../db');

exports.getLessons = async (req, res) => {
  try {
    // Get all categories and lessons, alongside user progress
    const query = `
      SELECT 
        l.id AS lesson_id, l.title, l.description AS lesson_description, l.order_index AS lesson_order,
        c.id AS category_id, c.name AS category_name, c.order_index AS category_order,
        up.status, up.completed_at
      FROM lessons l
      JOIN learning_categories c ON l.category_id = c.id
      LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = $1
      ORDER BY c.order_index ASC, l.order_index ASC
    `;
    const result = await db.query(query, [req.user.id]);
    
    // Group by category for easier frontend rendering
    const categoriesMap = new Map();
    
    result.rows.forEach(row => {
      if (!categoriesMap.has(row.category_id)) {
        categoriesMap.set(row.category_id, {
          id: row.category_id,
          name: row.category_name,
          order: row.category_order,
          lessons: []
        });
      }
      categoriesMap.get(row.category_id).lessons.push({
        id: row.lesson_id,
        title: row.title,
        description: row.lesson_description,
        order: row.lesson_order,
        status: row.status || 'not_started',
        completed_at: row.completed_at
      });
    });

    const categories = Array.from(categoriesMap.values()).sort((a, b) => a.order - b.order);
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getLessonById = async (req, res) => {
  try {
    const lessonId = req.params.id;
    
    // Get the lesson details including the long TEXT fields (content, example_code)
    const query = `
      SELECT 
        l.id AS lesson_id, l.title, l.description AS lesson_description, 
        l.content, l.example_code, l.order_index AS lesson_order,
        c.id AS category_id, c.name AS category_name,
        up.status, up.completed_at
      FROM lessons l
      JOIN learning_categories c ON l.category_id = c.id
      LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = $1
      WHERE l.id = $2
    `;
    const result = await db.query(query, [req.user.id, lessonId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: 'Lesson not found' });
    }
    
    const row = result.rows[0];
    
    // Also fetch the previous and next lessons for navigation
    const navQuery = `
      SELECT id, title 
      FROM lessons 
      WHERE (category_id = $1 AND order_index < $2) OR (category_id < $1)
      ORDER BY category_id DESC, order_index DESC 
      LIMIT 1
    `;
    const prevResult = await db.query(navQuery, [row.category_id, row.lesson_order]);
    
    const nextQuery = `
      SELECT id, title 
      FROM lessons 
      WHERE (category_id = $1 AND order_index > $2) OR (category_id > $1)
      ORDER BY category_id ASC, order_index ASC 
      LIMIT 1
    `;
    const nextResult = await db.query(nextQuery, [row.category_id, row.lesson_order]);
    
    const lesson = {
      id: row.lesson_id,
      title: row.title,
      description: row.lesson_description,
      content: row.content,
      example_code: row.example_code,
      category: {
        id: row.category_id,
        name: row.category_name
      },
      status: row.status || 'not_started',
      completed_at: row.completed_at,
      prev: prevResult.rows.length > 0 ? prevResult.rows[0] : null,
      next: nextResult.rows.length > 0 ? nextResult.rows[0] : null
    };

    res.json(lesson);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
