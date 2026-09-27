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
let bundledCurriculum;
window.getOfflineCurriculum = async () => {
  if (!bundledCurriculum) {
    const response = await fetch('/offline-curriculum.json');
    if (!response.ok) throw new Error('Offline lessons are not available on this installation.');
    bundledCurriculum = await response.json();
  }
  return bundledCurriculum;
};
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
  const isPasswordRecoveryPage = path.includes('forgot-password.html') || path.includes('reset-password.html');
  
  const isPublicLessonPage = path.endsWith('/lessons.html') || path.endsWith('/lesson-detail.html');
  if (!token && !navigator.onLine && !isPublicLessonPage) {
    window.location.replace('lessons.html');
    return;
  }
  if (!token && !isAuthPage && !isPasswordRecoveryPage && !isPublicLessonPage) {
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
    if (options.method && options.method !== 'GET' && !navigator.onLine) {
      throw new Error('Progress cannot be saved while offline. Reconnect to save your progress.');
    }
    response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  } catch (err) {
    if (options.method && options.method !== 'GET') throw err;
    const cacheKey = offlineKey(`GET:${endpoint}`);
    const cached = readOffline(cacheKey);
    if (cached !== null) return cached;
    if (endpoint === '/lessons' || endpoint.startsWith('/lessons/')) {
      const curriculum = await window.getOfflineCurriculum();
      if (endpoint === '/lessons') return curriculum.categories;
      const requestedId = endpoint.split('/').pop();
      let lesson = curriculum.lessons.find(item => String(item.id) === requestedId);
      if (!lesson) {
        const savedCategories = readOffline(offlineKey('GET:/lessons')) || [];
        const savedLesson = savedCategories.flatMap(category => category.lessons || []).find(item => String(item.id) === requestedId);
        if (savedLesson) lesson = curriculum.lessons.find(item => item.title === savedLesson.title);
      }
      if (lesson) return lesson;
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

  if (!options.method || options.method === 'GET') {
    writeOffline(offlineKey(`GET:${endpoint}`), data);
  }
  return data;
};

const notificationStorageKey = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return `stackgenNotifications:${user?.id || user?.email || 'default'}`;
};
const notificationReadLifetime = 30 * 60 * 1000;
let notificationExpiryTimer;
const getNotifications = () => {
  const storageKey = notificationStorageKey();
  const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
  const now = Date.now();
  let changed = false;
  const visible = stored.flatMap(note => {
    if (!note.read) return [note];
    const readAt = Date.parse(note.readAt);
    if (!Number.isFinite(readAt)) {
      changed = true;
      return [{ ...note, readAt: new Date(now).toISOString() }];
    }
    if (now - readAt >= notificationReadLifetime) {
      changed = true;
      return [];
    }
    return [note];
  });
  if (changed) localStorage.setItem(storageKey, JSON.stringify(visible));
  return visible;
};

const renderNotifications = () => {
  const button = document.getElementById('notification-toggle');
  const badge = document.getElementById('notification-count');
  const list = document.getElementById('notification-list');
  if (!button || !badge || !list) return;
  clearTimeout(notificationExpiryTimer);
  const notifications = getNotifications();
  const nextExpiry = notifications
    .filter(item => item.read)
    .map(item => Date.parse(item.readAt) + notificationReadLifetime)
    .filter(expiry => expiry > Date.now())
    .sort((a, b) => a - b)[0];
  if (nextExpiry) notificationExpiryTimer = setTimeout(renderNotifications, nextExpiry - Date.now() + 25);
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
      const readAt = new Date().toISOString();
      localStorage.setItem(notificationStorageKey(), JSON.stringify(getNotifications().map(entry => entry.id === note.id ? { ...entry, read: true, readAt } : entry)));
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
  if (nav && !document.getElementById('practice-nav-link')) {
    const lessonsItem = nav.querySelector('a[href="lessons.html"]')?.closest('li');
    if (lessonsItem) {
      const item = document.createElement('li');
      item.innerHTML = '<a href="practice.html" id="practice-nav-link">🧠 Practice</a>';
      lessonsItem.after(item);
    }
  }
  const practiceLink = document.getElementById('practice-nav-link');
  if (practiceLink && window.location.pathname.endsWith('practice.html')) practiceLink.classList.add('active');
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
      const readAt = new Date().toISOString();
      localStorage.setItem(notificationStorageKey(), JSON.stringify(getNotifications().map(item => ({ ...item, read: true, readAt: item.readAt || readAt }))));
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
