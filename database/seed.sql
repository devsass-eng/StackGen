-- Initial Seed Data for Learning Categories and Lessons

INSERT INTO learning_categories (name, description, order_index) VALUES
('HTML', 'Structure of the web', 1),
('CSS', 'Styling the web', 2),
('Responsive Design', 'Making the web look good on all devices', 3),
('JavaScript', 'Adding interactivity to the web', 4),
('Node.js', 'Running JS outside the browser', 5),
('Express.js', 'Building web servers', 6),
('REST APIs', 'Building APIs', 7),
('PostgreSQL', 'Relational Databases', 8),
('Authentication', 'Securing applications', 9),
('Full Stack', 'Putting it all together', 10);

-- HTML Lessons (Category 1)
INSERT INTO lessons (category_id, title, description, order_index) VALUES
(1, 'HTML Basics', 'Introduction to tags and structure', 1),
(1, 'Semantic HTML', 'Meaningful markup', 2),
(1, 'Forms', 'Handling user input', 3),
(1, 'Tables', 'Displaying tabular data', 4),
(1, 'Links and Navigation', 'Moving between pages', 5),
(1, 'Images', 'Displaying graphics', 6),
(1, 'Accessibility', 'Making sites usable for everyone', 7);

-- CSS Lessons (Category 2)
INSERT INTO lessons (category_id, title, description, order_index) VALUES
(2, 'CSS Basics', 'Introduction to styles', 1),
(2, 'Selectors', 'Targeting elements', 2),
(2, 'Box Model', 'Margins, padding, and borders', 3),
(2, 'Flexbox', '1D layout system', 4),
(2, 'Grid', '2D layout system', 5),
(2, 'Positioning', 'Controlling element placement', 6);

-- Responsive Design Lessons (Category 3)
INSERT INTO lessons (category_id, title, description, order_index) VALUES
(3, 'Responsive Design', 'Adapting to screen sizes', 1),
(3, 'Media Queries', 'Applying styles conditionally', 2),
(3, 'CSS Variables', 'Custom properties', 3),
(3, 'Animations', 'CSS transitions and keyframes', 4);

-- JavaScript Lessons (Category 4)
INSERT INTO lessons (category_id, title, description, order_index) VALUES
(4, 'JavaScript Introduction', 'Adding logic', 1),
(4, 'Variables', 'Storing data', 2),
(4, 'Data Types', 'Numbers, Strings, Booleans, etc.', 3),
(4, 'Operators', 'Math and logic', 4),
(4, 'Strings', 'Text manipulation', 5),
(4, 'Type Conversion', 'Changing types', 6),
(4, 'Type Coercion', 'Automatic type changes', 7),
(4, 'Conditions', 'If/Else statements', 8),
(4, 'Loops', 'Repeating actions', 9),
(4, 'Arrays', 'Lists of data', 10),
(4, 'Objects', 'Key-value stores', 11),
(4, 'Functions', 'Reusable code blocks', 12),
(4, 'Callbacks', 'Passing functions', 13),
(4, 'Array Methods', 'Map, filter, reduce', 14),
(4, 'DOM Manipulation', 'Changing HTML with JS', 15),
(4, 'Events', 'Handling user actions', 16),
(4, 'Template Literals', 'Better strings', 17),
(4, 'ES6+', 'Modern JavaScript features', 18),
(4, 'Fetch API', 'Making HTTP requests', 19),
(4, 'Async JavaScript', 'Non-blocking code', 20),
(4, 'Promises', 'Handling asynchronous results', 21),
(4, 'Error Handling', 'Try/Catch blocks', 22);

-- Backend (Categories 5, 6, 7)
INSERT INTO lessons (category_id, title, description, order_index) VALUES
(5, 'Node.js', 'Intro to Node.js', 1),
(5, 'npm', 'Node Package Manager', 2),
(5, 'Modules', 'Organizing code', 3),
(5, 'File System', 'Reading/Writing files', 4),
(5, 'HTTP', 'Built-in web server', 5),
(6, 'Express.js', 'Express basics', 1),
(6, 'Middleware', 'Processing requests', 2),
(7, 'REST APIs', 'API architecture', 1),
(7, 'CRUD APIs', 'Create, Read, Update, Delete', 2);

-- Database (Category 8)
INSERT INTO lessons (category_id, title, description, order_index) VALUES
(8, 'SQL Basics', 'Introduction to SQL', 1),
(8, 'PostgreSQL', 'Setup and tools', 2),
(8, 'Tables', 'Creating and modifying tables', 3),
(8, 'Primary Keys', 'Unique identifiers', 4),
(8, 'Foreign Keys', 'Linking tables', 5),
(8, 'Relationships', '1:1, 1:N, N:M', 6),
(8, 'CRUD', 'Data manipulation', 7),
(8, 'Joins', 'Combining data', 8),
(8, 'Database Design', 'Structuring databases', 9);

-- Authentication (Category 9)
INSERT INTO lessons (category_id, title, description, order_index) VALUES
(9, 'Authentication', 'Verifying identity', 1),
(9, 'Authorization', 'Verifying permissions', 2),
(9, 'Error Handling', 'Secure errors', 3);

-- Full Stack (Category 10)
INSERT INTO lessons (category_id, title, description, order_index) VALUES
(10, 'Connecting frontend to backend', 'Integration basics', 1),
(10, 'Connecting backend to PostgreSQL', 'Database integration', 2),
(10, 'Authentication', 'Full-stack auth', 3),
(10, 'Full-stack architecture', 'System design', 4),
(10, 'Deployment', 'Hosting your app', 5),
(10, 'Environment variables', 'Configuration', 6),
(10, 'Security', 'Best practices', 7),
(10, 'Full-stack projects', 'Building complete apps', 8);
