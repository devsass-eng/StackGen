document.addEventListener('DOMContentLoaded', async () => {
  if (!window.location.pathname.includes('profile.html')) return;

  // Load user details from the API (always fresh)
  const loadProfile = async () => {
    try {
      const user = await fetchAPI('/auth/me');

      // Update localStorage with latest data
      const stored = JSON.parse(localStorage.getItem('user')) || {};
      localStorage.setItem('user', JSON.stringify({ ...stored, ...user }));

      // Fill the left avatar card
      const avatarSrc = user.profile_picture
        ? user.profile_picture
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3b82f6&color=fff&size=130`;

      document.getElementById('profile-picture-preview').src = avatarSrc;
      document.getElementById('profile-name-display').textContent = user.name;
      document.getElementById('profile-email-display').textContent = user.email;

      if (user.created_at) {
        const date = new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        document.getElementById('member-since').textContent = `Member since: ${date}`;
      }

      // Pre-fill the settings form
      document.getElementById('profile-name').value = user.name || '';
      document.getElementById('profile-email').value = user.email || '';
      document.getElementById('profile-phone').value = user.phone || '';
      document.getElementById('profile-address').value = user.address || '';
      document.getElementById('profile-bio').value = user.bio || '';
      // Format date_of_birth as YYYY-MM-DD for the date input
      if (user.date_of_birth) {
        document.getElementById('profile-dob').value = user.date_of_birth.split('T')[0];
      }

    } catch (err) {
      console.error('Failed to load profile:', err.message);
    }
  };

  await loadProfile();

  // ─── Avatar Upload via clicking ───────────────────────────────────────────
  const fileInput = document.getElementById('avatar-file-input');

  fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${API_URL}/auth/upload-profile-picture`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg);

      // Instantly update the preview
      document.getElementById('profile-picture-preview').src = data.profile_picture;

      // Update localStorage
      const user = JSON.parse(localStorage.getItem('user')) || {};
      user.profile_picture = data.profile_picture;
      localStorage.setItem('user', JSON.stringify(user));

      // Update header avatar
      const headerAvatar = document.getElementById('header-avatar');
      if (headerAvatar) headerAvatar.src = data.profile_picture;

    } catch (err) {
      alert('Upload failed: ' + err.message);
    }
  });

  // ─── Profile Settings Form ────────────────────────────────────────────────
  const form = document.getElementById('profile-form');
  const saveBtn = document.getElementById('save-btn');
  const successMsg = document.getElementById('success-msg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const updatedData = {
      name: document.getElementById('profile-name').value.trim(),
      email: document.getElementById('profile-email').value.trim(),
      phone: document.getElementById('profile-phone').value.trim(),
      address: document.getElementById('profile-address').value.trim(),
      bio: document.getElementById('profile-bio').value.trim(),
      date_of_birth: document.getElementById('profile-dob').value || null
    };

    saveBtn.textContent = 'Saving...';
    saveBtn.disabled = true;

    try {
      const result = await fetchAPI('/auth/update-profile', {
        method: 'PUT',
        body: JSON.stringify(updatedData)
      });

      // Update localStorage with fresh user data
      const stored = JSON.parse(localStorage.getItem('user')) || {};
      localStorage.setItem('user', JSON.stringify({ ...stored, ...result.user }));

      // Update the left card display
      document.getElementById('profile-name-display').textContent = result.user.name;
      document.getElementById('profile-email-display').textContent = result.user.email;

      // Update header name
      const headerName = document.getElementById('user-name');
      if (headerName) headerName.textContent = `Welcome, ${result.user.name}!`;

      // Show success message
      successMsg.style.display = 'inline';
      setTimeout(() => { successMsg.style.display = 'none'; }, 3000);

    } catch (err) {
      alert('Failed to save: ' + err.message);
    } finally {
      saveBtn.textContent = 'Save Changes';
      saveBtn.disabled = false;
    }
  });

  const passwordForm = document.getElementById('password-form');
  const passwordMessage = document.getElementById('password-message');
  const changePasswordBtn = document.getElementById('change-password-btn');

  passwordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    passwordMessage.textContent = '';
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword !== confirmPassword) {
      passwordMessage.textContent = 'New passwords do not match.';
      passwordMessage.style.color = 'var(--danger, #ef4444)';
      return;
    }

    changePasswordBtn.disabled = true;
    changePasswordBtn.textContent = 'Updating...';
    try {
      const result = await fetchAPI('/auth/change-password', {
        method: 'PUT',
        body: JSON.stringify({ currentPassword, newPassword })
      });
      passwordMessage.textContent = result.msg;
      passwordMessage.style.color = 'var(--success)';
      passwordForm.reset();
    } catch (err) {
      passwordMessage.textContent = err.message;
      passwordMessage.style.color = 'var(--danger, #ef4444)';
    } finally {
      changePasswordBtn.disabled = false;
      changePasswordBtn.textContent = 'Change Password';
    }
  });
});
