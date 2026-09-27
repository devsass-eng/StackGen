document.addEventListener('DOMContentLoaded', async () => {
  if (!window.location.pathname.includes('lesson-detail.html')) return;
  
  const urlParams = new URLSearchParams(window.location.search);
  const lessonId = urlParams.get('id');
  
  if (!lessonId) {
    document.getElementById('lesson-container').innerHTML = '<p class="text-danger">No lesson ID provided.</p>';
    return;
  }
  
  const loadLessonDetails = async () => {
    try {
      const lesson = localStorage.getItem('token')
        ? await fetchAPI(`/lessons/${lessonId}`)
        : (await window.getOfflineCurriculum()).lessons.find(item => String(item.id) === lessonId);
      if (!lesson) throw new Error('Lesson not found.');
      const container = document.getElementById('lesson-container');
      
      let html = `
        <div class="lesson-content">
          <p class="text-muted" style="margin-bottom: 0.5rem; text-transform: uppercase; font-size: 0.9rem; letter-spacing: 1px;">
            ${lesson.category.name}
          </p>
          <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">${lesson.title}</h1>
          <p style="font-size: 1.2rem; color: var(--text-muted); margin-bottom: 3rem;">${lesson.description}</p>
          
          <div class="content-body">
            ${lesson.content}
          </div>
      `;
      
      if (lesson.example_code) {
        html += `
          <h2 style="margin-top: 3rem; margin-bottom: 1rem; color: var(--accent-primary);">Practical Example</h2>
          <div class="code-block">${lesson.example_code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
        `;
      }
      
      // Progress is available only to signed-in users and requires a connection.
      if (localStorage.getItem('token')) html += `
        <div class="action-panel">
          <h3 style="margin-bottom: 1rem;">Have you mastered this topic?</h3>
          <div style="display: flex; gap: 1rem; justify-content: center;">
            <button class="btn ${lesson.status === 'in_progress' ? 'btn-primary' : 'btn-outline'}" onclick="updateStatus(${lesson.id}, 'in_progress')">
              I'm Still Learning
            </button>
            <button class="btn ${lesson.status === 'completed' ? 'btn-primary' : 'btn-outline'}" onclick="updateStatus(${lesson.id}, 'completed')">
              ${lesson.status === 'completed' ? '✅ Completed' : 'Mark as Completed'}
            </button>
          </div>
        </div>
      `;
      else html += '<div class="action-panel"><p>Lessons are available offline. Sign in while online to track your progress.</p></div>';
      
      // Navigation
      html += `<div class="nav-buttons">`;
      if (lesson.prev) {
        html += `<a href="lesson-detail.html?id=${lesson.prev.id}" class="btn btn-outline">← ${lesson.prev.title}</a>`;
      } else {
        html += `<div></div>`;
      }
      if (lesson.next) {
        html += `<a href="lesson-detail.html?id=${lesson.next.id}" class="btn btn-primary">${lesson.next.title} →</a>`;
      } else {
        html += `<div></div>`;
      }
      html += `</div></div>`; // Close nav-buttons and lesson-content
      
      container.innerHTML = html;
      
    } catch (err) {
      console.error('Error loading lesson details:', err);
      document.getElementById('lesson-container').innerHTML = '<p class="text-danger">Failed to load lesson details.</p>';
    }
  };
  
  loadLessonDetails();
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
    // Reload page to reflect new status
    window.location.reload();
  } catch (err) {
    console.error('Error updating status:', err);
    alert(err.message || 'Progress could not be saved. Reconnect and try again.');
  }
};
