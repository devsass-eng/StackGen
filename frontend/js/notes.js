document.addEventListener('DOMContentLoaded', async () => {
  if (!window.location.pathname.includes('notes.html')) return;
  
  const modal = document.getElementById('note-modal');
  const addBtn = document.getElementById('add-note-btn');
  const closeBtn = document.getElementById('close-note-modal');
  const form = document.getElementById('note-form');
  const searchInput = document.getElementById('search-notes');
  
  // Modal logic
  addBtn.onclick = () => {
    form.reset();
    document.getElementById('note-id').value = '';
    document.getElementById('modal-title').textContent = 'Add Note';
    modal.style.display = 'block';
  };
  
  closeBtn.onclick = () => { modal.style.display = 'none'; };
  window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };
  
  let allNotes = [];
  
  const renderNotes = (notesToRender) => {
    const container = document.getElementById('notes-container');
    container.innerHTML = '';
    
    if (notesToRender.length === 0) {
      container.innerHTML = '<p class="text-muted">No notes found.</p>';
      return;
    }
    
    notesToRender.forEach(n => {
      container.innerHTML += `
        <div class="card">
          <h3 class="mb-1">${n.title}</h3>
          <p class="mb-1" style="white-space: pre-wrap;">${n.content}</p>
          <div class="project-actions">
            <button class="btn btn-outline" onclick="editNote(${n.id})">Edit</button>
            <button class="btn btn-danger" onclick="deleteNote(${n.id})">Delete</button>
          </div>
        </div>
      `;
    });
  };
  
  const loadNotes = async () => {
    try {
      allNotes = await fetchAPI('/notes');
      renderNotes(allNotes);
    } catch (err) {
      console.error(err);
    }
  };
  
  loadNotes();
  
  // Search
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allNotes.filter(n => 
      n.title.toLowerCase().includes(term) || 
      n.content.toLowerCase().includes(term)
    );
    renderNotes(filtered);
  });
  
  // Form submit
  form.onsubmit = async (e) => {
    e.preventDefault();
    const id = document.getElementById('note-id').value;
    const noteData = {
      title: document.getElementById('note-title').value,
      content: document.getElementById('note-content').value
    };
    
    try {
      if (id) {
        await fetchAPI(`/notes/${id}`, { method: 'PUT', body: JSON.stringify(noteData) });
      } else {
        await fetchAPI('/notes', { method: 'POST', body: JSON.stringify(noteData) });
      }
      modal.style.display = 'none';
      loadNotes();
    } catch (err) {
      console.error(err);
    }
  };
  
  // Global functions
  window.editNote = (id) => {
    const note = allNotes.find(n => n.id === id);
    if (note) {
      document.getElementById('note-id').value = note.id;
      document.getElementById('note-title').value = note.title;
      document.getElementById('note-content').value = note.content;
      document.getElementById('modal-title').textContent = 'Edit Note';
      modal.style.display = 'block';
    }
  };
  
  window.deleteNote = async (id) => {
    if (confirm('Are you sure you want to delete this note?')) {
      try {
        await fetchAPI(`/notes/${id}`, { method: 'DELETE' });
        loadNotes();
      } catch (err) {
        console.error(err);
      }
    }
  };
});
