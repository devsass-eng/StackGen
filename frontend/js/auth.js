document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const forgotPasswordForm = document.getElementById('forgot-password-form');
  const resetPasswordForm = document.getElementById('reset-password-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const data = await fetchAPI('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password })
        });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = 'index.html';
      } catch (err) {
        alert(err.message);
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      try {
        const data = await fetchAPI('/auth/register', {
          method: 'POST',
          body: JSON.stringify({ name, email, password })
        });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = 'index.html';
      } catch (err) {
        alert(err.message);
      }
    });
  }

  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const status = document.getElementById('forgot-password-status');
      const button = forgotPasswordForm.querySelector('button[type="submit"]');
      status.textContent = '';
      status.className = 'auth-feedback';
      button.disabled = true;

      try {
        const email = document.getElementById('recovery-email').value.trim();
        const data = await fetchAPI('/auth/forgot-password', {
          method: 'POST',
          body: JSON.stringify({ email })
        });
        status.textContent = data.msg;
        status.classList.add('success');
      } catch (error) {
        status.textContent = error.message;
        status.classList.add('error');
      } finally {
        button.disabled = false;
      }
    });
  }

  if (resetPasswordForm) {
    const token = new URLSearchParams(window.location.search).get('token');
    const status = document.getElementById('reset-password-status');
    const submitButton = resetPasswordForm.querySelector('button[type="submit"]');

    if (!token) {
      status.textContent = 'This password reset link is invalid or incomplete.';
      status.className = 'auth-feedback error';
      submitButton.disabled = true;
    }

    resetPasswordForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const password = document.getElementById('new-password').value;
      const confirmPassword = document.getElementById('confirm-new-password').value;
      status.textContent = '';
      status.className = 'auth-feedback';
      if (password !== confirmPassword) {
        status.textContent = 'The passwords do not match.';
        status.classList.add('error');
        return;
      }

      submitButton.disabled = true;
      try {
        const data = await fetchAPI('/auth/reset-password', {
          method: 'POST',
          body: JSON.stringify({ token, password })
        });
        status.textContent = data.msg;
        status.classList.add('success');
        resetPasswordForm.reset();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.setTimeout(() => { window.location.href = 'login.html'; }, 1800);
      } catch (error) {
        status.textContent = error.message;
        status.classList.add('error');
        submitButton.disabled = false;
      }
    });
  }
});
