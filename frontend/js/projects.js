document.addEventListener('DOMContentLoaded', async () => {
  if (!window.location.pathname.includes('projects.html')) return;
  
  const modal = document.getElementById('project-modal');
  const addBtn = document.getElementById('add-project-btn');
  const closeBtn = document.getElementById('close-project-modal');
  const form = document.getElementById('project-form');
  
  // Modal logic
  addBtn.onclick = () => {
    form.reset();
    document.getElementById('project-id').value = '';
    document.getElementById('modal-title').textContent = 'Add Project';
    modal.style.display = 'block';
  };
  
  closeBtn.onclick = () => { modal.style.display = 'none'; };
  window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };
  
  // Load Projects
  const loadProjects = async () => {
    try {
      const projects = await fetchAPI('/projects');
      const container = document.getElementById('projects-container');
      container.innerHTML = '';
      
      if (projects.length === 0) {
        container.innerHTML = '<p class="text-muted">No projects yet. Add one to get started!</p>';
        return;
      }
      
      projects.forEach(p => {
        let statusBadge = '';
        if (p.status === 'completed') statusBadge = '<span class="badge completed">Completed</span>';
        else if (p.status === 'in_progress') statusBadge = '<span class="badge current">In Progress</span>';
        else statusBadge = '<span class="badge upcoming">Planned</span>';
        
        container.innerHTML += `
          <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: start" class="mb-1">
              <h3>${p.name}</h3>
              ${statusBadge}
            </div>
            <p class="text-muted mb-1">${p.description || 'No description'}</p>
            <p class="mb-1"><small><strong>Tech:</strong> ${p.technologies || 'None'}</small></p>
            <div class="project-actions">
              <button class="btn btn-outline" onclick="editProject(${p.id})">Edit</button>
              <button class="btn btn-danger" onclick="deleteProject(${p.id})">Delete</button>
            </div>
          </div>
        `;
      });
      // Store in window for easy edit access
      window.projectsData = projects;
    } catch (err) {
      console.error(err);
    }
  };
  
  loadProjects();
  
  // Handle form submit
  form.onsubmit = async (e) => {
    e.preventDefault();
    const id = document.getElementById('project-id').value;
    const projectData = {
      name: document.getElementById('project-name').value,
      description: document.getElementById('project-description').value,
      technologies: document.getElementById('project-tech').value,
      status: document.getElementById('project-status').value
    };
    
    try {
      if (id) {
        await fetchAPI(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(projectData) });
      } else {
        await fetchAPI('/projects', { method: 'POST', body: JSON.stringify(projectData) });
      }
      modal.style.display = 'none';
      loadProjects();
    } catch (err) {
      console.error(err);
    }
  };
  
  // Global functions for inline onclick
  window.editProject = (id) => {
    const project = window.projectsData.find(p => p.id === id);
    if (project) {
      document.getElementById('project-id').value = project.id;
      document.getElementById('project-name').value = project.name;
      document.getElementById('project-description').value = project.description || '';
      document.getElementById('project-tech').value = project.technologies || '';
      document.getElementById('project-status').value = project.status;
      document.getElementById('modal-title').textContent = 'Edit Project';
      modal.style.display = 'block';
    }
  };
  
  window.deleteProject = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await fetchAPI(`/projects/${id}`, { method: 'DELETE' });
        loadProjects();
      } catch (err) {
        console.error(err);
      }
    }
  };
});
