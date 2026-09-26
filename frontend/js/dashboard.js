document.addEventListener('DOMContentLoaded', async () => {
  if (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html')) return;
  
  try {
    const stats = await fetchAPI('/progress/stats');
    
    // Overall Progress
    document.getElementById('overall-percentage').textContent = `${stats.overallPercentage}%`;
    document.getElementById('overall-progress-bar').style.width = `${stats.overallPercentage}%`;
    document.getElementById('lessons-stats').textContent = `${stats.completedLessons} of ${stats.totalLessons} lessons completed`;
    
    // Current Topic
    document.getElementById('current-topic').textContent = stats.currentTopic;
    
    // Category Stats
    const container = document.getElementById('category-stats-container');
    if (container) {
      container.innerHTML = '';
      stats.categoryStats.forEach(cat => {
        let statusText = `${cat.percentage}%`;
        let barClass = '';
        if (cat.percentage === 100) {
          statusText = '✓ Completed';
          barClass = 'success';
        } else if (cat.name === stats.currentTopic) {
          statusText = '🟡 Current';
          barClass = 'current';
        }
        
        container.innerHTML += `
          <div class="card">
            <h4>${cat.name}</h4>
            <div style="display: flex; justify-content: space-between; font-size: 0.9rem" class="text-muted mt-1">
              <span>${cat.completed}/${cat.total}</span>
              <span>${statusText}</span>
            </div>
            <div class="progress-container">
              <div class="progress-bar ${barClass}" style="width: ${cat.percentage}%"></div>
            </div>
          </div>
        `;
      });
    }
    
  } catch (err) {
    console.error('Error loading dashboard:', err);
  }
});
