document.addEventListener('DOMContentLoaded', async () => {
  if (!window.location.pathname.includes('lessons.html')) return;
  
  const loadLessons = async () => {
    try {
      const categories = await fetchAPI('/lessons');
      const container = document.getElementById('lessons-container');
      const searchInput = document.getElementById('lesson-search-input');
      const clearButton = document.getElementById('lesson-search-clear');
      const searchStatus = document.getElementById('lesson-search-status');

      const renderLessons = () => {
        const query = searchInput.value.trim().toLocaleLowerCase();
        const matches = categories.map(category => ({
          ...category,
          lessons: category.lessons.filter(lesson =>
            `${lesson.title} ${lesson.description || ''} ${category.name}`.toLocaleLowerCase().includes(query)
          )
        })).filter(category => category.lessons.length);
        const matchCount = matches.reduce((total, category) => total + category.lessons.length, 0);
        clearButton.hidden = !query;
        searchStatus.textContent = query
          ? `${matchCount} ${matchCount === 1 ? 'topic' : 'topics'} found`
          : `${categories.reduce((total, category) => total + category.lessons.length, 0)} topics available`;

        if (!matches.length) {
          container.innerHTML = '<div class="card lesson-search-empty"><h3>No topics found</h3><p class="text-muted">Try another topic or keyword.</p></div>';
          return;
        }

        container.innerHTML = matches.map(cat => {
          let html = `<section class="lesson-search-category"><h2 class="mt-2 mb-1">${cat.name}</h2><div class="grid-2">`;

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

          return `${html}</div></section>`;
        }).join('');
      };

      searchInput.addEventListener('input', renderLessons);
      clearButton.addEventListener('click', () => {
        searchInput.value = '';
        renderLessons();
        searchInput.focus();
      });
      renderLessons();
      
    } catch (err) {
      console.error('Error loading lessons:', err);
    }
  };
  
  loadLessons();
});
