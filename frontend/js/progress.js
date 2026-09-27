document.addEventListener('DOMContentLoaded', async () => {
  if (!window.location.pathname.includes('progress.html')) return;
  
  try {
    const stats = await fetchAPI('/progress/stats');
    
    // Overall
    document.getElementById('overall-percentage').textContent = `${stats.overallPercentage}%`;
    document.getElementById('overall-progress-bar').style.width = `${stats.overallPercentage}%`;
    
    // Stats
    document.getElementById('stat-completed').textContent = stats.completedLessons;
    document.getElementById('stat-in-progress').textContent = stats.inProgressLessons;
    document.getElementById('stat-not-started').textContent = stats.notStartedLessons;
    document.getElementById('stat-total').textContent = stats.totalLessons;
    
    // Categories
    const container = document.getElementById('category-progress-container');
    container.innerHTML = '';
    
    stats.categoryStats.forEach(cat => {
      container.innerHTML += `
        <div class="mb-2">
          <div style="display: flex; justify-content: space-between" class="mb-1">
            <strong>${cat.name}</strong>
            <span>${cat.percentage}%</span>
          </div>
          <div class="progress-container">
            <div class="progress-bar ${cat.percentage === 100 ? 'success' : 'current'}" style="width: ${cat.percentage}%"></div>
          </div>
        </div>
      `;
    });
    
  } catch (err) {
    console.error('Error loading progress:', err);
  }

  // Load interactive curriculum checklist
  const loadLessons = async () => {
    try {
      const categories = await fetchAPI('/lessons');
      const container = document.getElementById('lessons-container');
      
      container.innerHTML = '';
      
      categories.forEach(cat => {
        let html = `<h3 class="mt-2 mb-1">${cat.name}</h3>`;
        html += `<div class="grid-2">`;
        
        cat.lessons.forEach(l => {
          html += `
            <div class="card">
              <h4>${l.title}</h4>
              <p class="text-muted mb-1">${l.description}</p>
              <div style="display: flex; gap: 0.5rem">
                <button class="btn ${l.status === 'not_started' ? 'btn-primary' : 'btn-outline'}" onclick="updateStatus(${l.id}, 'not_started')">Not Started</button>
                <button class="btn ${l.status === 'in_progress' ? 'btn-primary' : 'btn-outline'}" onclick="updateStatus(${l.id}, 'in_progress')">In Progress</button>
                <button class="btn ${l.status === 'completed' ? 'btn-primary' : 'btn-outline'}" onclick="updateStatus(${l.id}, 'completed')">Completed</button>
              </div>
            </div>
          `;
        });
        
        html += `</div>`;
        container.innerHTML += html;
      });
      
    } catch (err) {
      console.error('Error loading lessons:', err);
    }
  };
  
  loadLessons();
});

window.updateStatus = async (lessonId, status) => {
  try {
    const before = status === 'completed' ? await fetchAPI('/lessons') : null;
    await fetchAPI(`/progress/${lessonId}`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
    if (before) {
      const after = await fetchAPI('/lessons');
      window.recordCompletionNotifications(before, after);
    }
    // Reload page to reflect new progress stats
    window.location.reload();
  } catch (err) {
    console.error('Error updating status:', err);
    alert(err.message || 'Progress could not be saved. Reconnect and try again.');
  }
};
