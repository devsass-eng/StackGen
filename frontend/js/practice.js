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

// Extra questions bring each learning stage to a 15-question trial. Scenario
// questions are marked Practical and check how the learner would apply a skill.
const extraPracticeQuestions = {
  HTML: [
    ['HTML Basics', 'Practical: Which structure gives a valid HTML document its basic outline?', ['<!doctype html>, html, head, body', 'body, head, html', 'head, body, doctype', 'main, html, footer'], 0],
    ['Semantic HTML', 'Which element is best for a self-contained article that could stand on its own?', ['<article>', '<div>', '<span>', '<b>'], 0],
    ['Forms', 'Practical: Which input type asks the browser to validate an email address?', ['type="email"', 'type="text-email"', 'type="mailbox"', 'type="url-email"'], 0],
    ['Forms', 'Which attribute prevents a form control from being left empty?', ['required', 'placeholder', 'autofocus', 'autocomplete'], 0],
    ['Tables', 'Which element groups column heading cells in a table?', ['<thead>', '<caption>', '<tbody>', '<tfoot>'], 0],
    ['Links and Navigation', 'Practical: Which attribute opens a link in a new tab?', ['target="_blank"', 'new="tab"', 'open="new"', 'rel="external-tab"'], 0],
    ['Images', 'Which attribute provides alternative text for an image?', ['alt', 'title', 'caption', 'description'], 0],
    ['Accessibility', 'Practical: A button contains only an icon. What should you add so assistive technology can name it?', ['An accessible label such as aria-label', 'A larger icon', 'A CSS title class', 'A placeholder attribute'], 0],
    ['HTML Basics', 'Which element contains metadata and the document title?', ['<head>', '<header>', '<main>', '<meta>'], 0],
    ['Semantic HTML', 'Which element represents navigation links?', ['<nav>', '<menuitem>', '<aside>', '<address>'], 0],
    ['Forms', 'Practical: How do you associate a label with an input whose id is "email"?', ['Set the label for="email"', 'Set the label name="email"', 'Set input label="email"', 'Give both the same class'], 0]
  ],
  CSS: [
    ['Selectors', 'Practical: Which selector styles every element with class card?', ['.card', '#card', 'card()', '*card'], 0],
    ['Box Model', 'With box-sizing: border-box, what does the declared width include?', ['Content, padding, and border', 'Content only', 'Margin only', 'Content and margin'], 0],
    ['Flexbox', 'Practical: Which declaration places flex items in a vertical column?', ['flex-direction: column', 'align-items: column', 'display: vertical', 'flex-wrap: column'], 0],
    ['Grid', 'Which unit shares remaining grid space proportionally?', ['fr', 'px', 'vh', 'em'], 0],
    ['Positioning', 'Which position value keeps an element in normal flow until a scroll threshold?', ['sticky', 'fixed', 'absolute', 'static'], 0],
    ['CSS Basics', 'Practical: Which property changes the text color?', ['color', 'font-color', 'text-style', 'foreground'], 0],
    ['Selectors', 'Which selector targets an element with id main?', ['#main', '.main', 'main#', '@main'], 0],
    ['Box Model', 'Which property adds space outside an element border?', ['margin', 'padding', 'outline', 'gap'], 0],
    ['Flexbox', 'Which property aligns flex items across the cross axis?', ['align-items', 'justify-content', 'flex-basis', 'order'], 0],
    ['Grid', 'Practical: Which declaration creates two equal columns?', ['grid-template-columns: repeat(2, 1fr)', 'grid-columns: 2', 'columns: 1fr 1fr', 'display: grid(2)'], 0],
    ['Positioning', 'Which positioning mode is removed from normal document flow and anchored to a positioned ancestor?', ['absolute', 'relative', 'static', 'sticky'], 0]
  ],
  'Responsive Design': [
    ['Media Queries', 'Practical: Which query applies styles at widths up to 600px?', ['@media (max-width: 600px)', '@screen (width < 600)', '@responsive 600px', '@media mobile'], 0],
    ['Mobile-first design', 'In mobile-first CSS, where do you put styles for wider screens?', ['Inside min-width media queries', 'Inside max-width media queries only', 'Inline on every element', 'In the HTML title'], 0],
    ['Fluid layouts', 'Practical: Which CSS keeps an image inside its container without distorting it?', ['max-width: 100%; height: auto', 'width: 100vw; height: 100vh', 'min-width: 1000px', 'position: fixed'], 0],
    ['Viewport', 'Which viewport declaration is commonly used for responsive pages?', ['width=device-width, initial-scale=1', 'height=device-height, scale=10', 'responsive=true', 'mobile=enabled'], 0],
    ['CSS Variables', 'How do you read a custom property named --brand-color?', ['var(--brand-color)', 'get(--brand-color)', '$brand-color', 'css(--brand-color)'], 0],
    ['Animations', 'Which property controls how long a CSS transition takes?', ['transition-duration', 'animation-count', 'transform-time', 'motion-speed'], 0],
    ['Fluid layouts', 'Practical: Which width is generally safer for a content panel across screen sizes?', ['width: 100%; max-width: 60rem', 'width: 1200px', 'width: 100vw; padding: 80px', 'min-width: 900px'], 0],
    ['Media Queries', 'What does a min-width media query commonly target?', ['Viewports at or wider than a breakpoint', 'Only smaller phones', 'Printers only', 'Image dimensions'], 0],
    ['Mobile-first design', 'Why avoid fixed-width page layouts on phones?', ['They can cause horizontal overflow', 'They disable HTML', 'They make CSS variables invalid', 'They prevent touch input'], 0],
    ['CSS Variables', 'Practical: Where can a site-wide custom property be declared?', [':root', ':document only', 'body::after only', '@variables'], 0],
    ['Animations', 'Which user preference can CSS check to reduce motion?', ['prefers-reduced-motion', 'prefers-no-animation', 'motion-disabled', 'accessibility-motion'], 0]
  ],
  JavaScript: [
    ['Data Types', 'What is the result of typeof null in JavaScript?', ['"object"', '"null"', '"undefined"', '"number"'], 0],
    ['Operators', 'Practical: What is the result of 5 === "5"?', ['false', 'true', '5', 'A syntax error'], 0],
    ['Loops', 'Which loop is convenient when you need each value from an array?', ['for...of', 'for...in on every case', 'while...in', 'repeat...until'], 0],
    ['Arrays', 'What does array.map(callback) return?', ['A new array of callback results', 'The first matching item', 'A number of items', 'The original array sorted'], 0],
    ['Objects', 'Practical: How do you read the name property from user?', ['user.name', 'user->name', 'user[name()]', 'name.user'], 0],
    ['Functions', 'What does a function return when it has no return statement?', ['undefined', 'null', 'false', 'An empty string'], 0],
    ['DOM Manipulation', 'Which method selects the first element matching a CSS selector?', ['document.querySelector()', 'document.getAll()', 'document.findCSS()', 'window.select()'], 0],
    ['Events', 'Practical: Which method registers a click handler?', ['element.addEventListener("click", handler)', 'element.on("click", handler)', 'element.listenClick(handler)', 'element.clickHandler = true'], 0],
    ['Fetch API', 'What should you check on a fetch response before treating HTTP errors as failures?', ['response.ok', 'response.json is true', 'response.statusText only', 'request.ready'], 0],
    ['Promises', 'Which method handles a rejected promise?', ['catch()', 'thenError()', 'rejectWith()', 'finallyError()'], 0],
    ['Error Handling', 'Practical: Which construct catches an exception from synchronous code?', ['try...catch', 'if...else', 'for...of', 'switch...case'], 0],
    ['Conditions', 'What does an if statement do when its condition evaluates to true?', ['Runs its code block', 'Skips its code block', 'Stops the program', 'Converts the condition to text'], 0],
    ['Conditions', 'Practical: What is logged by if (4 > 2) { console.log("yes"); }?', ['yes', 'no', 'true', 'Nothing'], 0],
    ['Conditions', 'Which keyword provides an alternative branch when an if condition is false?', ['else', 'then', 'case', 'default'], 0],
    ['Conditions', 'Practical: Which condition checks that score is at least 50?', ['score >= 50', 'score => 50', 'score =< 50', 'score ==< 50'], 0],
    ['Conditions', 'What does an else if branch let you do?', ['Check another condition if earlier branches did not match', 'Repeat a block forever', 'Declare a constant', 'Create an array'], 0],
    ['Conditions', 'Practical: What is the value of 3 < 2 ? "A" : "B"?', ['"B"', '"A"', 'false', 'undefined'], 0],
    ['Conditions', 'Which logical operator means both conditions must be true?', ['&&', '||', '!', '??'], 0],
    ['Conditions', 'Practical: Which expression is true when age is 18 or older?', ['age >= 18', 'age > 18 only', 'age = 18', 'age <= 18'], 0],
    ['Conditions', 'What does the logical OR operator (||) require?', ['At least one condition is truthy', 'Every condition is truthy', 'Every condition is false', 'The left value is a number'], 0],
    ['Conditions', 'What does the ! operator do to a boolean value?', ['Negates it', 'Adds one', 'Compares its type', 'Joins two strings'], 0],
    ['Conditions', 'Practical: Which branch runs when temperature is 20 in if (temperature > 20) ... else ...?', ['The else branch', 'The if branch', 'Both branches', 'Neither branch always'], 0],
    ['Conditions', 'When is a switch statement often useful?', ['When comparing one value against several possible cases', 'When repeating code for each array item', 'When declaring a function parameter', 'When importing a module'], 0],
    ['Conditions', 'Why should a switch case commonly end with break?', ['To prevent falling through to the next case', 'To restart the switch', 'To return a boolean', 'To declare the next case'], 0],
    ['Conditions', 'Practical: What does (isMember && hasTicket) evaluate to if isMember is true and hasTicket is false?', ['false', 'true', 'null', '"false"'], 0]
  ],
  'Node.js': [
    ['npm', 'Practical: Which command installs dependencies listed in package.json?', ['npm install', 'node package.json', 'npm start --all', 'install node_modules'], 0],
    ['Modules', 'Which CommonJS syntax imports a module?', ['require("./module")', 'include("./module")', 'using "./module"', 'load module from'], 0],
    ['File System', 'Which Node module provides file operations?', ['node:fs', 'node:html', 'node:style', 'node:dom'], 0],
    ['HTTP', 'Which built-in module can create an HTTP server?', ['node:http', 'node:request', 'node:webpage', 'node:server-ui'], 0],
    ['Environment', 'Practical: How do you read the PORT environment variable?', ['process.env.PORT', 'process.PORT', 'env.process.PORT', 'node.config.PORT'], 0],
    ['Asynchronous I/O', 'What is a benefit of non-blocking I/O?', ['The event loop can handle other work while waiting', 'It makes every operation synchronous', 'It removes the need for error handling', 'It runs only in the browser'], 0],
    ['npm', 'Where are project scripts such as start commonly defined?', ['package.json', 'index.html', '.gitignore', 'README only'], 0],
    ['Modules', 'Practical: What must a CommonJS module do to expose a value?', ['Assign it to module.exports or exports', 'Put it in a global CSS file', 'Add it to package-lock only', 'Call console.log'], 0],
    ['File System', 'Which API style is usually preferred for new asynchronous file operations?', ['Promise-based fs/promises', 'Synchronous fs only', 'DOM FileReader', 'CSS url()'], 0],
    ['HTTP', 'What does an HTTP server send after receiving a request?', ['A response', 'A package lock', 'A DOM event', 'A database schema every time'], 0],
    ['Environment', 'Why keep secrets in environment variables?', ['They stay out of committed source code', 'They become encrypted automatically', 'They are visible only to the browser', 'They remove the need for access control'], 0]
  ],
  'Express.js': [
    ['Routes', 'Practical: Which route handles GET requests to /lessons?', ['app.get("/lessons", handler)', 'app.fetch("/lessons", handler)', 'app.routeGET("/lessons")', 'app.useGET("/lessons")'], 0],
    ['Middleware', 'What does middleware call to pass control onward?', ['next()', 'continue()', 'forward()', 'resumeRoute()'], 0],
    ['JSON requests', 'Which middleware parses incoming JSON request bodies?', ['express.json()', 'express.staticJSON()', 'express.body()', 'express.parse("json")'], 0],
    ['Error handling', 'How many parameters identify standard Express error middleware?', ['Four', 'Two', 'Three', 'Five'], 0],
    ['Routes', 'Practical: Where is a route parameter from /users/:id read?', ['req.params.id', 'req.query.id', 'res.params.id', 'req.body.route.id'], 0],
    ['Middleware', 'Where should middleware that handles errors be registered?', ['After routes and other middleware', 'Before all routes only', 'Inside package.json', 'In the browser script'], 0],
    ['JSON requests', 'Which method sends a JSON response?', ['res.json(data)', 'req.json(data)', 'res.sendJSON(data)', 'response.writeObject(data)'], 0],
    ['Routing', 'What does app.use() commonly register?', ['Middleware', 'A CSS selector', 'A database table', 'A browser event'], 0],
    ['Routes', 'Practical: Which object contains query-string values?', ['req.query', 'req.params', 'res.locals', 'req.headers.path'], 0],
    ['Middleware', 'What can middleware do before a route handler runs?', ['Inspect or modify the request and response', 'Change the browser viewport', 'Create HTML elements in the client', 'Automatically migrate a database'], 0],
    ['Security', 'Where should authorization checks for a protected route happen?', ['On the server before returning protected data', 'Only by hiding the frontend link', 'In a CSS media query', 'Only during registration'], 0]
  ],
  'REST APIs': [
    ['HTTP methods', 'Practical: Which method is normally used to create a new resource?', ['POST', 'GET', 'HEAD', 'OPTIONS'], 0],
    ['HTTP status codes', 'Which status indicates the request succeeded but returned no body?', ['204', '301', '401', '500'], 0],
    ['Resources', 'Which route best represents one lesson with id 42?', ['/api/lessons/42', '/api/getLesson?id=42/action', '/api/lesson42/delete', '/lesson-action/42'], 0],
    ['Validation', 'What should an API return for invalid client input?', ['A clear 4xx response', 'A success response with no validation', 'A database password', 'A server stack trace'], 0],
    ['CRUD APIs', 'Practical: Which method is commonly used to update part of a resource?', ['PATCH', 'TRACE', 'CONNECT', 'HEAD'], 0],
    ['HTTP status codes', 'Which status indicates the client is not authenticated?', ['401', '200', '302', '503'], 0],
    ['Resources', 'Why use nouns such as /api/projects in REST route paths?', ['They represent resources', 'They execute browser scripts', 'They encrypt requests', 'They define CSS classes'], 0],
    ['Validation', 'Why validate request data on the server?', ['Clients can bypass frontend checks', 'Browsers cannot send strings', 'It automatically creates indexes', 'It hides public routes'], 0],
    ['HTTP methods', 'Practical: Which method should retrieve a resource without changing it?', ['GET', 'DELETE', 'PATCH', 'POST'], 0],
    ['CRUD APIs', 'Which operation does DELETE represent?', ['Removing a resource', 'Reading a collection', 'Creating a resource', 'Partially updating a resource'], 0],
    ['HTTP status codes', 'Which status is appropriate when a requested resource does not exist?', ['404', '201', '204', '304'], 0]
  ],
  PostgreSQL: [
    ['SQL Basics', 'Practical: Which query retrieves every column from users?', ['SELECT * FROM users;', 'GET ALL users;', 'OPEN users;', 'FETCH users.*;'], 0],
    ['Tables', 'Which SQL statement adds a new row?', ['INSERT INTO', 'ALTER TABLE', 'CREATE INDEX', 'DROP TABLE'], 0],
    ['Primary Keys', 'Can a primary key contain duplicate values?', ['No', 'Yes, if the column is text', 'Yes, when rows are sorted', 'Only when it is indexed'], 0],
    ['Foreign Keys', 'What does ON DELETE CASCADE do?', ['Deletes dependent rows when the referenced row is deleted', 'Copies rows into a new table', 'Blocks every delete', 'Encrypts foreign-key values'], 0],
    ['Relationships', 'Which relationship lets one course have many lessons?', ['One-to-many', 'One-to-one only', 'Many-to-many only', 'No relationship'], 0],
    ['CRUD', 'Practical: Which clause limits an update to the row with id 7?', ['WHERE id = 7', 'ORDER BY id = 7', 'GROUP BY id = 7', 'HAVING id = 7'], 0],
    ['Joins', 'Which join returns only rows with matches in both tables?', ['INNER JOIN', 'LEFT JOIN', 'FULL OUTER JOIN', 'CROSS JOIN'], 0],
    ['Database Design', 'Why split repeating data into related tables?', ['To reduce duplication and improve consistency', 'To make every query return all columns', 'To avoid using keys', 'To store passwords as plain text'], 0],
    ['Parameterized queries', 'Practical: Why pass user input as a query parameter?', ['It separates data from SQL and helps prevent injection', 'It makes all queries public', 'It disables constraints', 'It skips database authentication'], 0],
    ['SQL Basics', 'Which clause filters rows in a SELECT query?', ['WHERE', 'ORDER BY', 'FROM ONLY', 'VALUES'], 0],
    ['CRUD', 'Which SQL command changes existing rows?', ['UPDATE', 'INSERT', 'CREATE', 'GRANT'], 0]
  ],
  Authentication: [
    ['Password storage', 'Practical: What should a login system compare with the submitted password?', ['A stored password hash using a password-hashing verifier', 'A plaintext password in the database', 'A Base64 string', 'A password in a URL'], 0],
    ['Authentication vs authorization', 'What does authorization determine?', ['What an authenticated user is allowed to do', 'Whether a page uses CSS', 'The user’s email format', 'Which database is installed'], 0],
    ['JWTs', 'What must a server do before trusting a JWT?', ['Verify its signature and validate relevant claims', 'Decode it and trust its contents', 'Accept any token with three parts', 'Read the user id from the URL'], 0],
    ['Authorization', 'Practical: Where should ownership of a requested record be checked?', ['On the server before returning or changing it', 'Only in a hidden button', 'In the page stylesheet', 'Only in localStorage'], 0],
    ['Sessions', 'Why should authentication tokens be protected from script access when possible?', ['To reduce the impact of cross-site scripting theft', 'To make CSS load faster', 'To avoid validating passwords', 'To make tokens public'], 0],
    ['Password storage', 'Why use a slow password-hashing algorithm?', ['It makes large-scale guessing more costly', 'It lets users recover the original password', 'It removes the need for unique salts', 'It encrypts the browser'], 0],
    ['Authentication vs authorization', 'Which question does authentication answer?', ['Who is this user?', 'Which action may this user take?', 'What theme is selected?', 'Where is the app hosted?'], 0],
    ['JWTs', 'What does an expiration claim help limit?', ['How long a token remains valid', 'How many database tables exist', 'The user’s password length', 'The size of a response body'], 0],
    ['Authorization', 'Practical: A user changes a record ID in a URL. What should the API do?', ['Check permission for that specific record', 'Assume the user owns it', 'Hide the URL field with CSS', 'Return all records'], 0],
    ['Password reset', 'What is a safer way to store a password-reset token?', ['Store a hash of a random, expiring token', 'Store a permanent plaintext password', 'Use the user email as the token', 'Put the database password in the link'], 0],
    ['Security', 'Which response is safer when an email address is not registered during password recovery?', ['Use a generic response that does not reveal account existence', 'Say explicitly that no account exists', 'Return the password hash', 'Redirect to the admin page'], 0]
  ],
  'Full Stack': [
    ['Frontend and backend', 'Practical: Where should private database credentials be used?', ['On the backend only', 'In browser JavaScript', 'In a public HTML attribute', 'In the page title'], 0],
    ['Database integration', 'What role does a backend API play between a frontend and database?', ['It validates requests and performs controlled data operations', 'It makes the database public', 'It replaces all HTML', 'It stores CSS styles'], 0],
    ['Full-stack architecture', 'Why keep user interface, server logic, and data storage as distinct responsibilities?', ['It makes the system easier to change and secure', 'It guarantees there will be no bugs', 'It removes network requests', 'It prevents use of APIs'], 0],
    ['Deployment', 'Practical: What is a useful check after deploying a backend?', ['Check its health endpoint and deployment logs', 'Delete the production database', 'Disable HTTPS', 'Commit production secrets'], 0],
    ['Environment variables', 'Why use different environment settings for local and production?', ['Each environment needs its own URLs and secrets', 'The frontend becomes invisible', 'It removes configuration', 'It shares passwords with users'], 0],
    ['Security', 'Which input should the server trust by default?', ['None; validate and authorize incoming data', 'Any hidden form value', 'Any user id in a request', 'Only values sent over HTTPS'], 0],
    ['Connecting frontend to backend', 'Practical: What should a frontend do if an API request fails?', ['Show a useful error state and allow recovery', 'Pretend the request succeeded', 'Display server secrets', 'Delete local user data'], 0],
    ['Database integration', 'Why should a backend use parameterized database queries?', ['To keep data values separate from query structure', 'To disable database permissions', 'To let users write arbitrary SQL', 'To avoid handling errors'], 0],
    ['Full-stack architecture', 'What is an API contract?', ['An agreed shape and behavior for requests and responses', 'A hosting invoice', 'A database password', 'A CSS component'], 0],
    ['Deployment', 'Practical: Where should production secrets be configured?', ['In the host’s protected environment settings', 'In a public repository', 'In frontend localStorage', 'In a committed SQL seed file'], 0],
    ['Full-stack projects', 'What is a useful first step when a feature spans frontend and backend?', ['Define the user flow and API/data requirements', 'Write random code in every layer', 'Expose the database to the browser', 'Skip validation until production'], 0]
  ]
};

for (const [stage, questions] of Object.entries(extraPracticeQuestions)) {
  practiceQuestionBank[stage].push(...questions.map(([topic, prompt, options, answer]) => ({
    topic,
    prompt,
    options,
    answer,
    explanation: `Review ${topic.toLowerCase()} and try applying it in a small example.`,
    practical: prompt.startsWith('Practical:')
  })));
}
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

    const allLessons = categories.flatMap((category, categoryIndex) =>
      category.lessons.map((lesson, lessonIndex) => ({ category, categoryIndex, lessonIndex, lesson }))
    );
    const latestCompletedLesson = allLessons
      .filter(item => item.lesson.status === 'completed')
      .reduce((latest, item) => {
        if (!latest) return item;
        const latestTime = latest.lesson.completed_at ? new Date(latest.lesson.completed_at).getTime() : 0;
        const itemTime = item.lesson.completed_at ? new Date(item.lesson.completed_at).getTime() : 0;
        return itemTime >= latestTime ? item : latest;
      }, null);
    const activeLessonMatch = allLessons.find(item => item.lesson.status === 'in_progress');
    const incompleteIndex = categories.findIndex(category =>
      category.lessons.length > 0 && category.lessons.some(lesson => lesson.status !== 'completed')
    );
    const currentIndex = incompleteIndex === -1 ? categories.length - 1 : incompleteIndex;
    const selectedLesson = latestCompletedLesson || activeLessonMatch;
    const currentCategory = selectedLesson?.category || categories[currentIndex];
    const currentLesson = selectedLesson?.lesson || currentCategory.lessons.find(lesson => lesson.status !== 'completed') || currentCategory.lessons.at(-1);
    if (!currentLesson) throw new Error('No lesson is available to practice yet.');
    summary.innerHTML = `<span class="practice-current-dot"></span><span>Current lesson</span><strong>${escapePracticeText(currentCategory.name)} · ${escapePracticeText(currentLesson.title)}</strong>`;

    container.innerHTML = `
      <section class="card practice-picker">
        <div class="practice-picker-copy">
          <h2>Practice your current lesson</h2>
          <p class="text-muted">Practice automatically starts with the most recently completed lesson. Its focused questions come first, followed by review questions from the same learning stage.</p>
        </div>
        <p><strong>${escapePracticeText(currentCategory.name)} → ${escapePracticeText(currentLesson.title)}</strong></p>
      </section>
      <div id="practice-trial" class="practice-trial" aria-live="polite"></div>
    `;

    const trialContainer = document.getElementById('practice-trial');
    const startTrial = (category, lesson) => {
      const normalizeTopic = value => String(value).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
      const lessonName = normalizeTopic(lesson.title.replace(/^javascript introduction$/i, 'javascript'));
      const aliases = {
        'responsive design': ['responsive design', 'mobile first design', 'fluid layouts', 'media queries'],
        'css basics': ['css basics'],
        'html basics': ['html basics'],
        'javascript': ['javascript', 'variables'],
        'javascript introduction': ['javascript', 'variables'],
        'authentication': ['authentication vs authorization', 'password storage'],
        'connecting frontend to backend': ['frontend and backend'],
        'connecting backend to postgresql': ['database integration']
      };
      const topicNames = aliases[lessonName] || [lessonName];
      const stageQuestions = practiceQuestionBank[category.name] || [];
      const focusedQuestions = stageQuestions.filter(question =>
        topicNames.includes(normalizeTopic(question.topic))
      );
      const questions = [...focusedQuestions];
      for (const question of stageQuestions) {
        if (questions.length >= 15) break;
        if (!questions.includes(question)) questions.push(question);
      }
      if (questions.length < 15) {
        for (const question of stageQuestions) {
          if (questions.length >= 15) break;
          questions.push(question);
        }
      }
      if (!questions.length) {
        trialContainer.innerHTML = `<div class="card practice-empty"><h3>Questions for ${escapePracticeText(lesson.title)} are coming soon</h3><p class="text-muted">Your most recently completed lesson was detected, but this learning stage has no question bank yet.</p><a href="lesson-detail.html?id=${encodeURIComponent(lesson.id)}" class="btn btn-outline">Review lesson</a></div>`;
        return;
      }

      trialContainer.innerHTML = `
        <form id="practice-trial-form" class="practice-trial-form">
          <div class="practice-trial-heading"><div><span class="practice-eyebrow">Recently completed · ${escapePracticeText(category.name)}</span><h2>${escapePracticeText(lesson.title)}</h2><p class="text-muted">Questions about this topic first, with review questions from ${escapePracticeText(category.name)} to complete your 15-question trial.</p></div><span class="practice-question-count">${questions.length} questions</span></div>
          ${questions.map((question, questionIndex) => `
            <fieldset class="practice-question" data-question="${questionIndex}">
              <legend><span class="practice-question-number">${String(questionIndex + 1).padStart(2, '0')}</span><span><small>${question.practical ? 'Practical · ' : ''}${question.topic}</small>${question.prompt.replace(/^Practical: /, '')}</span></legend>
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
        result.innerHTML = `<div><span class="practice-eyebrow">Subtopic result</span><h2>${passed ? 'Subtopic practice passed' : 'Keep practicing'}</h2><p class="text-muted">${passed ? `Nice work. You have a solid grasp of ${escapePracticeText(lesson.title)}.` : 'Review the answers below and try this subtopic again.'}</p></div><strong class="practice-score">${score}<span>/${questions.length}</span></strong>`;
        form.before(result);
        form.querySelectorAll('input, button').forEach(control => { control.disabled = true; });
        form.querySelector('.practice-submit').textContent = 'Trial submitted';
        result.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      trialContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    startTrial(currentCategory, currentLesson);
  } catch (error) {
    summary.textContent = 'Your current stage could not be loaded.';
    container.innerHTML = `<div class="card practice-empty"><h3>Practice is unavailable</h3><p class="text-muted">${error.message}</p><a href="lessons.html" class="btn btn-outline">Go to lessons</a></div>`;
  }
});
