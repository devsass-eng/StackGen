const practiceQuestionBank = {
  HTML: [
    { topic: 'Semantic HTML', prompt: 'Which element should contain the main, unique content of a page?', options: ['<section>', '<main>', '<footer>', '<aside>'], answer: 1, explanation: 'Use one <main> element for the dominant content of the document.' },
    { topic: 'Forms', prompt: 'How should a visible label be connected to an input?', options: ['Give both the same class', 'Put the input inside a <label> or match for and id', 'Use the placeholder as the label', 'Add a title to the form'], answer: 1, explanation: 'A <label for="…"> matching the input id gives the control a reliable accessible name.' },
    { topic: 'Links and navigation', prompt: 'Which element is appropriate when the user should navigate to another page?', options: ['<button>', '<a href="…">', '<span>', '<label>'], answer: 1, explanation: 'An anchor with an href represents navigation and works with browser link features.' },
    { topic: 'Accessibility', prompt: 'What should informative image alt text communicate?', options: ['The file name', 'The image’s meaning in its context', 'The image dimensions', 'The word “image”'], answer: 1, explanation: 'Alt text provides the useful information conveyed by an image to people who cannot see it.' }
  ],
  CSS: [
    { topic: 'Box Model', prompt: 'With the default content-box model, what does an element’s declared width exclude?', options: ['Padding and borders', 'Its content', 'Its margin only', 'Nothing'], answer: 0, explanation: 'content-box width applies to content; padding and border are added outside that width.' },
    { topic: 'Selectors', prompt: 'Which selector targets an element with class “card”?', options: ['#card', '.card', 'card()', '*card'], answer: 1, explanation: 'A leading dot selects a class in CSS.' },
    { topic: 'Flexbox', prompt: 'Which property aligns flex items along the main axis?', options: ['align-items', 'justify-content', 'flex-wrap', 'position'], answer: 1, explanation: 'justify-content distributes items along a flex container’s main axis.' },
    { topic: 'Grid', prompt: 'Which declaration creates three equal grid columns?', options: ['grid-columns: 3', 'grid-template-columns: repeat(3, 1fr)', 'display: columns(3)', 'grid: 3 equal'], answer: 1, explanation: 'repeat(3, 1fr) creates three tracks that share the available space equally.' }
  ],
  'Responsive Design': [
    { topic: 'Media Queries', prompt: 'What does a CSS media query let you do?', options: ['Load a database query', 'Apply styles when device or viewport conditions match', 'Add a page route', 'Resize an image file'], answer: 1, explanation: 'Media queries apply CSS conditionally, often based on viewport width.' },
    { topic: 'Mobile-first design', prompt: 'In a mobile-first stylesheet, where do the base styles target?', options: ['Large desktop screens', 'Small screens, with enhancements added at wider breakpoints', 'Print only', 'Every screen with fixed widths'], answer: 1, explanation: 'Mobile-first starts with a small-screen layout and progressively enhances it.' },
    { topic: 'Fluid layouts', prompt: 'Which choice usually helps an image avoid overflowing its container?', options: ['width: 100vw', 'max-width: 100%; height: auto', 'position: fixed', 'min-width: 1000px'], answer: 1, explanation: 'max-width: 100% keeps the image within its container while auto preserves its ratio.' },
    { topic: 'Viewport', prompt: 'Why include the viewport meta tag on mobile pages?', options: ['To enable JavaScript', 'To make the layout viewport match the device width', 'To set the page language', 'To cache images'], answer: 1, explanation: 'The viewport meta tag helps mobile browsers lay out the page at the device’s CSS width.' }
  ],
  JavaScript: [
    { topic: 'Variables', prompt: 'Which declaration prevents reassignment of the variable binding?', options: ['var', 'let', 'const', 'static'], answer: 2, explanation: 'const prevents rebinding the variable, though objects assigned to it can still be mutated.' },
    { topic: 'Conditions', prompt: 'Which operator compares both value and type?', options: ['==', '===', '=', '=>'], answer: 1, explanation: 'The strict equality operator === does not perform type coercion.' },
    { topic: 'Array Methods', prompt: 'Which array method returns a new array containing items that pass a test?', options: ['forEach', 'filter', 'push', 'findIndex'], answer: 1, explanation: 'filter returns a new array containing every item for which the callback is truthy.' },
    { topic: 'Async JavaScript', prompt: 'What does await do inside an async function?', options: ['Stops the browser permanently', 'Waits for a promise to settle before continuing that function', 'Converts a promise to a callback', 'Starts a new thread'], answer: 1, explanation: 'await pauses the async function until the promise settles, then returns its value or throws its error.' }
  ],
  'Node.js': [
    { topic: 'npm', prompt: 'What is package.json commonly used for in a Node project?', options: ['Store database rows', 'Describe project metadata, scripts, and dependencies', 'Replace JavaScript files', 'Configure the browser viewport'], answer: 1, explanation: 'package.json records project details, dependency versions, and runnable scripts.' },
    { topic: 'Modules', prompt: 'Why split a Node application into modules?', options: ['To make every variable global', 'To organize and reuse related code', 'To avoid using functions', 'To disable imports'], answer: 1, explanation: 'Modules help keep code organized and make reusable functionality easier to manage.' },
    { topic: 'Environment', prompt: 'Where should private production credentials be stored?', options: ['In a public JavaScript file', 'In environment variables or a secret manager', 'In the page title', 'In a committed README'], answer: 1, explanation: 'Keep secrets out of source control and provide them through protected environment configuration.' },
    { topic: 'Asynchronous I/O', prompt: 'Why use asynchronous file or network operations in Node?', options: ['They let the event loop handle other work while waiting', 'They always run on the browser', 'They remove the need to handle errors', 'They make all operations synchronous'], answer: 0, explanation: 'Non-blocking I/O lets Node continue processing other events while an operation is pending.' }
  ],
  'Express.js': [
    { topic: 'Routes', prompt: 'What does an Express route handler receive?', options: ['Only a SQL connection', 'Request, response, and optionally next', 'A browser window', 'A CSS selector'], answer: 1, explanation: 'Route handlers receive req and res, with next available to pass control onward.' },
    { topic: 'Middleware', prompt: 'What should middleware call to pass control to the next middleware?', options: ['continue()', 'next()', 'resume()', 'route()'], answer: 1, explanation: 'Calling next() continues through the middleware chain.' },
    { topic: 'JSON requests', prompt: 'What does express.json() middleware do?', options: ['Serves JSON files from disk', 'Parses incoming JSON request bodies', 'Encrypts responses', 'Creates database tables'], answer: 1, explanation: 'express.json() parses JSON payloads and makes the result available on req.body.' },
    { topic: 'Error handling', prompt: 'How is Express error-handling middleware commonly identified?', options: ['It has four parameters: err, req, res, next', 'It uses only a CSS class', 'Its name starts with error', 'It must be the first middleware'], answer: 0, explanation: 'Express recognizes error middleware by its four-argument signature.' }
  ],
  'REST APIs': [
    { topic: 'HTTP methods', prompt: 'Which HTTP method is typically used to retrieve a resource?', options: ['GET', 'POST', 'DELETE', 'PATCH'], answer: 0, explanation: 'GET requests retrieve a representation of a resource.' },
    { topic: 'HTTP status codes', prompt: 'Which status code indicates a resource was successfully created?', options: ['200', '201', '301', '404'], answer: 1, explanation: '201 Created is the standard success response for a newly created resource.' },
    { topic: 'Resources', prompt: 'Which route shape best represents a collection of lessons?', options: ['/getAllLessonsNow', '/api/lessons', '/api/doLessons', '/api/lessonCollectionAction'], answer: 1, explanation: 'A noun-based collection path such as /api/lessons represents the resource cleanly.' },
    { topic: 'Validation', prompt: 'What should an API do with invalid client input?', options: ['Silently store it', 'Return a clear 4xx response with useful validation details', 'Return success anyway', 'Expose a stack trace'], answer: 1, explanation: 'Validate at the API boundary and return a client error without exposing internals.' }
  ],
  PostgreSQL: [
    { topic: 'Primary Keys', prompt: 'What does a primary key guarantee for each row?', options: ['The row is encrypted', 'A unique, non-null identifier', 'The row is always first', 'All columns are text'], answer: 1, explanation: 'A primary key uniquely identifies each row and cannot be null.' },
    { topic: 'Foreign Keys', prompt: 'What does a foreign key help enforce?', options: ['Referential integrity between related tables', 'CSS inheritance', 'Password complexity', 'Unique file names'], answer: 0, explanation: 'A foreign key constrains values to valid references in a related table.' },
    { topic: 'Joins', prompt: 'Which join keeps every row from the left table, with matching right-side values where available?', options: ['INNER JOIN', 'LEFT JOIN', 'CROSS JOIN', 'SELF JOIN'], answer: 1, explanation: 'LEFT JOIN returns all left rows and fills unmatched right columns with NULL.' },
    { topic: 'Parameterized queries', prompt: 'Why use placeholders such as $1 in a PostgreSQL query?', options: ['They make SQL run only once', 'They separate data values from SQL text and help prevent injection', 'They create indexes', 'They hide query results'], answer: 1, explanation: 'Parameterized values are passed separately, helping prevent untrusted input from changing SQL structure.' }
  ],
  Authentication: [
    { topic: 'Password storage', prompt: 'How should a user password be stored?', options: ['As plain text', 'As a salted, slow password hash', 'Base64 encoded', 'In a browser cookie'], answer: 1, explanation: 'Store a purpose-built password hash, such as bcrypt or Argon2, never the raw password.' },
    { topic: 'Authentication vs authorization', prompt: 'What does authentication answer?', options: ['What can this user do?', 'Who is this user?', 'Which CSS theme is active?', 'Where is the database?'], answer: 1, explanation: 'Authentication verifies identity; authorization decides what that identity may access.' },
    { topic: 'JWTs', prompt: 'What should a server do before trusting a signed JWT?', options: ['Decode it only', 'Verify its signature and relevant claims', 'Trust its user ID field', 'Store its secret in the token'], answer: 1, explanation: 'A server must verify the signature and validate claims such as expiry before accepting a JWT.' },
    { topic: 'Authorization', prompt: 'Where should access permissions be checked?', options: ['Only in a hidden frontend button', 'On the server for each protected operation', 'Only when registering', 'Inside CSS'], answer: 1, explanation: 'Frontend checks improve the interface, but the server must enforce permissions.' }
  ],
  'Full Stack': [
    { topic: 'Frontend and backend', prompt: 'What is a common role of the frontend in a full-stack app?', options: ['Render the interface and send user actions to services', 'Store the only copy of credentials', 'Replace the database', 'Manage the server operating system'], answer: 0, explanation: 'The frontend presents the user interface and communicates with backend APIs.' },
    { topic: 'Database integration', prompt: 'Why should database credentials stay on the backend?', options: ['Browsers cannot display them', 'Client code is visible to users and cannot protect secrets', 'It makes SQL faster', 'It prevents page styling'], answer: 1, explanation: 'Anything shipped to a browser can be inspected, so secrets belong in server-side configuration.' },
    { topic: 'Deployment', prompt: 'What is a useful first check after deploying a web service?', options: ['Delete the source repository', 'Check a health endpoint and review runtime logs', 'Turn off HTTPS', 'Clear the production database'], answer: 1, explanation: 'A health endpoint and deployment logs help confirm the app started and can reach required services.' },
    { topic: 'Environment variables', prompt: 'Why use separate environment values for local and production systems?', options: ['To let each environment use its own URLs and secrets', 'To hide all frontend code', 'To make the app use no configuration', 'To share passwords publicly'], answer: 0, explanation: 'Separate configuration prevents local settings and credentials from being hard-coded into a production build.' }
  ]
};
const escapePracticeText = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

document.addEventListener('DOMContentLoaded', async () => {
  if (!window.location.pathname.endsWith('practice.html')) return;

  const summary = document.getElementById('practice-stage-summary');
  const container = document.getElementById('practice-container');

  try {
    const categories = await fetchAPI('/lessons');
    if (!categories.length) throw new Error('No learning stages are available yet.');

    const incompleteIndex = categories.findIndex(category =>
      category.lessons.length > 0 && category.lessons.some(lesson => lesson.status !== 'completed')
    );
    const currentIndex = incompleteIndex === -1 ? categories.length - 1 : incompleteIndex;
    const currentCategory = categories[currentIndex];
    summary.innerHTML = `<span class="practice-current-dot"></span><span>Current stage</span><strong>${currentCategory.name}</strong>`;

    container.innerHTML = `
      <section class="card practice-picker">
        <div class="practice-picker-copy">
          <h2>Choose a stage to practice</h2>
          <p class="text-muted">Your current stage is selected. Earlier stages stay available for review.</p>
        </div>
        <label for="practice-stage-select">Learning stage</label>
        <select id="practice-stage-select" class="form-control"></select>
        <div id="practice-topic-list" class="practice-topic-list"></div>
        <button id="start-practice" class="btn btn-primary" type="button">Start stage trial</button>
      </section>
      <div id="practice-trial" class="practice-trial" aria-live="polite"></div>
    `;

    const select = document.getElementById('practice-stage-select');
    const topicList = document.getElementById('practice-topic-list');
    const renderStageInfo = () => {
      const category = categories[Number(select.value)];
      const topics = category.lessons.map(lesson => `<span class="practice-topic-chip">${lesson.title}</span>`).join('');
      topicList.innerHTML = `<span class="practice-topic-label">Topics in this stage</span><div>${topics}</div>`;
    };

    categories.slice(0, currentIndex + 1).forEach((category, index) => {
      const completed = category.lessons.length > 0 && category.lessons.every(lesson => lesson.status === 'completed');
      const option = document.createElement('option');
      option.value = String(index);
      option.textContent = `${category.name}${index === currentIndex ? ' · Current' : completed ? ' · Review' : ''}`;
      select.appendChild(option);
    });
    select.value = String(currentIndex);
    select.addEventListener('change', renderStageInfo);
    renderStageInfo();

    const trialContainer = document.getElementById('practice-trial');
    const startTrial = () => {
      const category = categories[Number(select.value)];
      const questions = practiceQuestionBank[category.name];
      if (!questions?.length) {
        trialContainer.innerHTML = '<div class="card practice-empty"><h3>Practice questions are coming soon</h3><p class="text-muted">This stage is available in your curriculum, but its trial is not ready yet.</p></div>';
        return;
      }

      trialContainer.innerHTML = `
        <form id="practice-trial-form" class="practice-trial-form">
          <div class="practice-trial-heading"><div><span class="practice-eyebrow">Stage trial</span><h2>${category.name}</h2></div><span class="practice-question-count">${questions.length} questions</span></div>
          ${questions.map((question, questionIndex) => `
            <fieldset class="practice-question" data-question="${questionIndex}">
              <legend><span class="practice-question-number">${String(questionIndex + 1).padStart(2, '0')}</span><span><small>${question.topic}</small>${question.prompt}</span></legend>
              <div class="practice-options">
                ${question.options.map((option, optionIndex) => `
                  <label class="practice-option"><input type="radio" name="question-${questionIndex}" value="${optionIndex}"><span>${escapePracticeText(option)}</span></label>
                `).join('')}
              </div>
            </fieldset>
          `).join('')}
          <button class="btn btn-primary practice-submit" type="submit">Submit trial</button>
        </form>
      `;

      document.getElementById('practice-trial-form').addEventListener('submit', event => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const score = questions.reduce((total, question, index) => {
          const selected = formData.get(`question-${index}`);
          return total + (selected !== null && Number(selected) === question.answer ? 1 : 0);
        }, 0);
        const passed = score / questions.length >= 0.7;

        questions.forEach((question, index) => {
          const selectedValue = formData.get(`question-${index}`);
          const selected = selectedValue === null ? -1 : Number(selectedValue);
          const fieldset = form.querySelector(`[data-question="${index}"]`);
          fieldset.classList.add(selected === question.answer ? 'is-correct' : 'is-incorrect');
          const feedback = document.createElement('p');
          feedback.className = 'practice-answer-feedback';
          feedback.textContent = `${selected === question.answer ? 'Correct.' : `Correct answer: ${question.options[question.answer]}.`} ${question.explanation}`;
          fieldset.appendChild(feedback);
        });

        const result = document.createElement('section');
        result.className = `practice-result card ${passed ? 'passed' : 'needs-review'}`;
        result.setAttribute('role', 'status');
        result.innerHTML = `<div><span class="practice-eyebrow">Trial result</span><h2>${passed ? 'Stage trial passed' : 'Keep practicing'}</h2><p class="text-muted">${passed ? 'Nice work. You have a solid grasp of this stage.' : 'Review the topics below and try the stage trial again.'}</p></div><strong class="practice-score">${score}<span>/${questions.length}</span></strong>`;
        form.before(result);
        form.querySelectorAll('input, button').forEach(control => { control.disabled = true; });
        form.querySelector('.practice-submit').textContent = 'Trial submitted';
        result.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      trialContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    document.getElementById('start-practice').addEventListener('click', startTrial);
  } catch (error) {
    summary.textContent = 'Your current stage could not be loaded.';
    container.innerHTML = `<div class="card practice-empty"><h3>Practice is unavailable</h3><p class="text-muted">${error.message}</p><a href="lessons.html" class="btn btn-outline">Go to lessons</a></div>`;
  }
});
