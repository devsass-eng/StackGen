document.addEventListener('DOMContentLoaded', async () => {
  if (!window.location.pathname.includes('lessons.html')) return;
  
  const loadLessons = async () => {
    try {
      const categories = await fetchAPI('/lessons');
      const container = document.getElementById('lessons-container');
      
      container.innerHTML = '';
      
      categories.forEach(cat => {
        let html = `<h2 class="mt-2 mb-1">${cat.name}</h2>`;
        html += `<div class="grid-2">`;
        
        cat.lessons.forEach(l => {
          let statusBadge = '';
          if (l.status === 'completed') {
            statusBadge = '<span class="badge" style="background: var(--success); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; margin-top: 0.5rem; display: inline-block;">Completed</span>';
          } else if (l.status === 'in_progress') {
            statusBadge = '<span class="badge" style="background: var(--accent-current); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; margin-top: 0.5rem; display: inline-block;">In Progress</span>';
          }

          html += `
            <a href="lesson-detail.html?id=${l.id}" style="text-decoration: none; color: inherit;">
              <div class="card lesson-card-hover" style="transition: transform 0.2s; cursor: pointer; height: 100%;">
                <h4>${l.title}</h4>
                <p class="text-muted mb-1">${l.description}</p>
                ${statusBadge}
              </div>
            </a>
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
