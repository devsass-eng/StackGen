// Global utilities and state

const API_URL = '/api';
const offlineKey = (kind) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return `stackgenOffline:${user?.id || user?.email || 'default'}:${kind}`;
};
const readOffline = (key) => {
  try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
};
const writeOffline = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (err) { console.warn('Unable to save offline data', err); }
};
const applyQueuedProgress = (data) => {
  if (!Array.isArray(data)) return data;
  const queue = readOffline(offlineKey('progress-queue')) || [];
  return data.map(category => ({ ...category, lessons: category.lessons.map(lesson => {
    const pending = queue.find(item => String(item.lessonId) === String(lesson.id));
    return pending ? { ...lesson, status: pending.status } : lesson;
  }) }));
};
const syncOfflineProgress = async () => {
  const token = localStorage.getItem('token');
  if (!token || !navigator.onLine) return;
  const key = offlineKey('progress-queue');
  const queue = readOffline(key) || [];
  const remaining = [];
  for (const item of queue) {
    try {
      const response = await fetch(`${API_URL}/progress/${item.lessonId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: item.status })
      });
      if (!response.ok) remaining.push(item);
    } catch { remaining.push(item); }
  }
  writeOffline(key, remaining);
};
window.addEventListener('online', syncOfflineProgress);
window.addEventListener('load', syncOfflineProgress);

const applyPreferences = () => {
  const prefs = JSON.parse(localStorage.getItem('stackgenPreferences') || '{}');
  document.documentElement.dataset.theme = prefs.theme || 'dark';
  document.documentElement.dataset.motion = prefs.reducedMotion ? 'reduced' : 'full';
  document.documentElement.dataset.textSize = prefs.textSize || 'normal';
  const accents = { blue: ['#3b82f6', '#2563eb'], purple: ['#8b5cf6', '#7c3aed'], green: ['#10b981', '#059669'] };
  const pair = accents[prefs.accent] || accents.blue;
  document.documentElement.style.setProperty('--accent-primary', pair[0]);
  document.documentElement.style.setProperty('--accent-hover', pair[1]);
};
applyPreferences();

// Check auth status on load for protected pages
const checkAuth = () => {
  const token = localStorage.getItem('token');
  const path = window.location.pathname;
  
  const isAuthPage = path.includes('login.html') || path.includes('register.html');
  
  if (!token && !isAuthPage) {
    window.location.href = 'login.html';
  } else if (token && isAuthPage) {
    window.location.href = 'index.html';
  }
};

// API Fetch wrapper
const fetchAPI = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  } catch (err) {
    if (options.method === 'PUT' && endpoint.startsWith('/progress/')) {
      const lessonId = endpoint.split('/').pop();
      const { status } = JSON.parse(options.body || '{}');
      const key = offlineKey('progress-queue');
      const queue = readOffline(key) || [];
      const existing = queue.findIndex(item => String(item.lessonId) === String(lessonId));
      const update = { lessonId, status, updatedAt: new Date().toISOString() };
      if (existing >= 0) queue[existing] = update; else queue.push(update);
      writeOffline(key, queue);
      return { msg: 'Saved on this device. It will sync when you are online.', offlineQueued: true };
    }
    if (options.method && options.method !== 'GET') throw err;
    const cacheKey = offlineKey(`GET:${endpoint}`);
    const cached = readOffline(cacheKey);
    if (cached !== null) {
      if (endpoint === '/lessons') return applyQueuedProgress(cached);
      if (endpoint.startsWith('/lessons/')) {
        const pending = (readOffline(offlineKey('progress-queue')) || []).find(item => endpoint === `/lessons/${item.lessonId}`);
        return pending ? { ...cached, status: pending.status } : cached;
      }
    }
    throw err;
  }

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = 'login.html';
    }
    throw new Error(data.msg || 'Something went wrong');
  }

  if ((!options.method || options.method === 'GET') && (endpoint === '/lessons' || endpoint.startsWith('/lessons/'))) {
    writeOffline(offlineKey(`GET:${endpoint}`), data);
  }
  return data;
};

const notificationStorageKey = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return `stackgenNotifications:${user?.id || user?.email || 'default'}`;
};
const getNotifications = () => JSON.parse(localStorage.getItem(notificationStorageKey()) || '[]');

const renderNotifications = () => {
  const button = document.getElementById('notification-toggle');
  const badge = document.getElementById('notification-count');
  const list = document.getElementById('notification-list');
  if (!button || !badge || !list) return;
  const notifications = getNotifications();
  const unread = notifications.filter(item => !item.read).length;
  badge.textContent = unread > 99 ? '99+' : String(unread);
  badge.hidden = unread === 0;
  list.replaceChildren();
  if (!notifications.length) {
    const empty = document.createElement('p');
    empty.className = 'notification-empty';
    empty.textContent = 'You’re all caught up.';
    list.appendChild(empty);
    return;
  }
  notifications.slice(0, 10).forEach(note => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = `notification-item ${note.read ? '' : 'unread'}`;
    const title = document.createElement('strong');
    title.textContent = note.title;
    const message = document.createElement('span');
    message.textContent = note.message;
    const date = document.createElement('small');
    date.textContent = new Date(note.createdAt).toLocaleString();
    item.append(title, message, date);
    item.addEventListener('click', () => {
      localStorage.setItem(notificationStorageKey(), JSON.stringify(getNotifications().map(entry => entry.id === note.id ? { ...entry, read: true } : entry)));
      renderNotifications();
    });
    list.appendChild(item);
  });
};

window.recordCompletionNotifications = (before, after) => {
  const existing = getNotifications();
  const known = new Set(existing.map(item => item.id));
  const added = [];
  (after || []).forEach(category => {
    const oldCategory = (before || []).find(item => item.id === category.id);
    category.lessons.forEach(lesson => {
      const wasComplete = oldCategory?.lessons.some(item => item.id === lesson.id && item.status === 'completed');
      if (!wasComplete && lesson.status === 'completed') {
        const id = `topic-${lesson.id}`;
        if (!known.has(id)) added.push({ id, title: 'Topic completed', message: lesson.title, createdAt: new Date().toISOString(), read: false });
      }
    });
    const wasCourseComplete = oldCategory?.lessons.length > 0 && oldCategory.lessons.every(item => item.status === 'completed');
    const isCourseComplete = category.lessons.length > 0 && category.lessons.every(item => item.status === 'completed');
    if (!wasCourseComplete && isCourseComplete) {
      const id = `course-${category.id}`;
      if (!known.has(id)) added.push({ id, title: 'Course completed', message: category.name, createdAt: new Date().toISOString(), read: false });
    }
  });
  if (!added.length) return;
  localStorage.setItem(notificationStorageKey(), JSON.stringify([...added, ...existing].slice(0, 50)));
  const latest = added[added.length - 1];
  sessionStorage.setItem('stackgenPendingAlert', JSON.stringify(latest));
};

// UI Helpers
const setupSidebar = () => {
  const toggle = document.getElementById('mobile-toggle');
  const sidebar = document.getElementById('sidebar');
  const header = document.querySelector('.header');

  if (header && !header.querySelector('.mobile-brand')) {
    const mobileBrand = document.createElement('a');
    mobileBrand.className = 'mobile-brand';
    mobileBrand.href = 'index.html';
    mobileBrand.setAttribute('aria-label', 'StackGen home');
    const logo = document.createElement('img');
    logo.className = 'mobile-brand-logo';
    logo.src = '/icons/stackgen-brand.svg';
    logo.alt = 'StackGen';
    mobileBrand.appendChild(logo);
    header.insertBefore(mobileBrand, document.getElementById('header-user-info') || null);
  }
  
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      syncMobileBackdrop();
    });
  }
  const syncMobileBackdrop = () => {
    let backdrop = document.getElementById('mobile-nav-backdrop');
    if (sidebar.classList.contains('active')) {
      if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = 'mobile-nav-backdrop';
        backdrop.className = 'mobile-nav-backdrop';
        backdrop.addEventListener('click', () => {
          sidebar.classList.remove('active');
          backdrop.remove();
        });
        document.body.appendChild(backdrop);
      }
    } else if (backdrop) backdrop.remove();
  };
  if (sidebar) {
    sidebar.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
      sidebar.classList.remove('active');
      syncMobileBackdrop();
    }));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        sidebar.classList.remove('active');
        syncMobileBackdrop();
      }
    });
  }

  const logoutBtn = document.getElementById('logout-btn');
  const nav = document.querySelector('.nav-links');
  if (nav && !document.getElementById('settings-nav-link')) {
    const item = document.createElement('li');
    item.innerHTML = '<a href="settings.html" id="settings-nav-link">⚙️ Settings</a>';
    nav.insertBefore(item, logoutBtn ? logoutBtn.closest('li') : null);
  }
  const settingsLink = document.getElementById('settings-nav-link');
  if (settingsLink && window.location.pathname.endsWith('settings.html')) settingsLink.classList.add('active');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = 'login.html';
    });
  }

  const user = JSON.parse(localStorage.getItem('user'));
  const userInfoEl = document.getElementById('header-user-info') || document.querySelector('.user-info');
  
  if (user && userInfoEl) {
    const avatarUrl = user.profile_picture ? user.profile_picture : 'https://via.placeholder.com/40';
    userInfoEl.innerHTML = `
      <div class="notification-wrap">
        <button type="button" class="notification-toggle" id="notification-toggle" aria-label="Notifications" aria-expanded="false" title="Notifications">
          <span aria-hidden="true">🔔</span><span class="notification-count" id="notification-count" hidden></span>
        </button>
        <div class="notification-popover" id="notification-popover" hidden>
          <div class="notification-heading"><strong>Notifications</strong><button type="button" class="notification-read-all" id="notification-read-all">Mark all read</button></div>
          <div id="notification-list" class="notification-list"></div>
        </div>
      </div>
      <button type="button" class="theme-toggle" id="header-theme-toggle" aria-label="Toggle light and dark theme" title="Toggle theme">☀️</button>
      <span id="user-name">Welcome, ${user.name}!</span>
      <a href="profile.html"><img src="${avatarUrl}" alt="Profile" class="avatar" id="header-avatar"></a>
    `;
    document.getElementById('header-theme-toggle').addEventListener('click', () => {
      const prefs = JSON.parse(localStorage.getItem('stackgenPreferences') || '{}');
      prefs.theme = (prefs.theme || 'dark') === 'dark' ? 'light' : 'dark';
      localStorage.setItem('stackgenPreferences', JSON.stringify(prefs));
      applyPreferences();
      syncThemeIcon();
      syncSettingsControls();
    });
    const notificationToggle = document.getElementById('notification-toggle');
    const notificationPopover = document.getElementById('notification-popover');
    notificationToggle.addEventListener('click', () => {
      notificationPopover.hidden = !notificationPopover.hidden;
      notificationToggle.setAttribute('aria-expanded', String(!notificationPopover.hidden));
    });
    document.getElementById('notification-read-all').addEventListener('click', () => {
      localStorage.setItem(notificationStorageKey(), JSON.stringify(getNotifications().map(item => ({ ...item, read: true }))));
      renderNotifications();
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.notification-wrap')) {
        notificationPopover.hidden = true;
        notificationToggle.setAttribute('aria-expanded', 'false');
      }
    });
    renderNotifications();
    const pendingAlert = JSON.parse(sessionStorage.getItem('stackgenPendingAlert') || 'null');
    if (pendingAlert) {
      sessionStorage.removeItem('stackgenPendingAlert');
      const toast = document.createElement('div');
      toast.className = 'completion-toast';
      toast.setAttribute('role', 'status');
      toast.textContent = `${pendingAlert.title}: ${pendingAlert.message}`;
      document.body.appendChild(toast);
      window.setTimeout(() => toast.remove(), 4500);
    }
    syncThemeIcon();
  }
};

const syncThemeIcon = () => {
  const button = document.getElementById('header-theme-toggle');
  if (button) button.textContent = document.documentElement.dataset.theme === 'light' ? '🌙' : '☀️';
};

const syncSettingsControls = () => {
  const prefs = JSON.parse(localStorage.getItem('stackgenPreferences') || '{}');
  const theme = document.getElementById('preference-theme');
  if (!theme) return;
  theme.value = prefs.theme || 'dark';
  document.getElementById('preference-accent').value = prefs.accent || 'blue';
  document.getElementById('preference-text-size').value = prefs.textSize || 'normal';
  document.getElementById('preference-reduced-motion').checked = Boolean(prefs.reducedMotion);
};

const setupSettings = () => {
  const form = document.getElementById('settings-form');
  if (!form) return;
  syncSettingsControls();
  form.addEventListener('change', () => {
    const prefs = {
      theme: document.getElementById('preference-theme').value,
      accent: document.getElementById('preference-accent').value,
      textSize: document.getElementById('preference-text-size').value,
      reducedMotion: document.getElementById('preference-reduced-motion').checked
    };
    localStorage.setItem('stackgenPreferences', JSON.stringify(prefs));
    applyPreferences();
    syncThemeIcon();
  });
};

document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  setupSidebar();
  setupSettings();
});
