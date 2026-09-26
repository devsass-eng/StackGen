document.addEventListener('DOMContentLoaded', async () => {
  if (!window.location.pathname.includes('roadmap.html')) return;
  
  try {
    const categories = await fetchAPI('/lessons');
    const timeline = document.getElementById('roadmap-timeline');
    
    timeline.innerHTML = '';
    
    // Determine current topic (first one that is not 100% complete)
    let currentTopicIndex = -1;
    for (let i = 0; i < categories.length; i++) {
      const cat = categories[i];
      const completed = cat.lessons.filter(l => l.status === 'completed').length;
      if (completed < cat.lessons.length) {
        currentTopicIndex = i;
        break;
      }
    }
    
    categories.forEach((cat, index) => {
      let stateClass = 'upcoming';
      let stateBadge = '<span class="badge upcoming">🔒 Upcoming</span>';
      
      const completed = cat.lessons.filter(l => l.status === 'completed').length;
      
      if (completed === cat.lessons.length && cat.lessons.length > 0) {
        stateClass = 'completed';
        stateBadge = '<span class="badge completed">✓ Completed</span>';
      } else if (index === currentTopicIndex) {
        stateClass = 'current';
        stateBadge = '<span class="badge current">🟡 Current</span>';
      }
      
      const lessonList = cat.lessons.map(l => {
        let check = '🔒';
        if (l.status === 'completed') check = '✓';
        else if (l.status === 'in_progress') check = '🟡';
        return `<li>${check} ${l.title}</li>`;
      }).join('');
      
      timeline.innerHTML += `
        <div class="timeline-item ${stateClass}">
          <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center">
              <h3>${cat.name}</h3>
              ${stateBadge}
            </div>
            <p class="text-muted mb-1">${cat.lessons.length} lessons</p>
            <ul style="list-style: none; line-height: 1.5">
              ${lessonList}
            </ul>
          </div>
        </div>
      `;
    });
    
  } catch (err) {
    console.error('Error loading roadmap:', err);
  }
});
