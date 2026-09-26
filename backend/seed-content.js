require('dotenv').config();
const { Client } = require('pg');
const path = require('path');

const lessons = [
  // ─── HTML ──────────────────────────────────────────────────────────────────
  {
    title: 'HTML Basics',
    content: `<h2>What is HTML?</h2>
<p>HTML stands for <strong>HyperText Markup Language</strong>. It is the standard language used to create and structure content on the web. Every webpage you visit is built with HTML at its core.</p>
<p>HTML uses <strong>elements</strong> (also called tags) to wrap content and give it meaning. A tag looks like this: <code>&lt;tagname&gt;</code>. Most tags come in pairs — an opening tag and a closing tag.</p>

<h2>The Structure of an HTML Document</h2>
<p>Every HTML file has a standard skeleton structure. Think of it as the blueprint that every webpage must follow:</p>

<h2>Key Tags to Know</h2>
<ul>
  <li><code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code> — Headings (h1 is the largest, h6 is smallest)</li>
  <li><code>&lt;p&gt;</code> — A paragraph of text</li>
  <li><code>&lt;div&gt;</code> — A generic container block</li>
  <li><code>&lt;span&gt;</code> — A generic inline container</li>
  <li><code>&lt;strong&gt;</code> — Bold text</li>
  <li><code>&lt;em&gt;</code> — Italic text</li>
  <li><code>&lt;br&gt;</code> — A line break</li>
</ul>

<h2>Attributes</h2>
<p>HTML tags can have <strong>attributes</strong> that provide extra information. Attributes are placed inside the opening tag:</p>
<p>For example: <code>&lt;a href="https://google.com"&gt;Visit Google&lt;/a&gt;</code></p>
<p>Here, <code>href</code> is the attribute and <code>"https://google.com"</code> is its value.</p>

<h2>Key Takeaways</h2>
<ul>
  <li>HTML structures the content on a webpage</li>
  <li>Tags wrap content to give it meaning</li>
  <li>Most tags need an opening and closing tag</li>
  <li>Attributes give tags extra information</li>
</ul>`,
    example_code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My First Page</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n  <p>This is my first webpage.</p>\n  <p>I am learning <strong>HTML</strong> right now.</p>\n</body>\n</html>`
  },
  {
    title: 'Semantic HTML',
    content: `<h2>What is Semantic HTML?</h2>
<p>Semantic HTML means using the <strong>right HTML tag for the right purpose</strong>. Instead of using <code>&lt;div&gt;</code> for everything, semantic tags describe the <em>meaning</em> of the content they contain.</p>
<p>This helps browsers, screen readers, and search engines understand your page's structure.</p>

<h2>Common Semantic Tags</h2>
<ul>
  <li><code>&lt;header&gt;</code> — The top section of the page or a section (logo, nav)</li>
  <li><code>&lt;nav&gt;</code> — Navigation links</li>
  <li><code>&lt;main&gt;</code> — The primary content of the page</li>
  <li><code>&lt;section&gt;</code> — A standalone section of content</li>
  <li><code>&lt;article&gt;</code> — A self-contained piece of content (like a blog post)</li>
  <li><code>&lt;aside&gt;</code> — Side content (like a sidebar)</li>
  <li><code>&lt;footer&gt;</code> — Bottom section of the page</li>
</ul>

<h2>Why Semantic HTML Matters</h2>
<ul>
  <li><strong>Accessibility:</strong> Screen readers use semantic tags to help visually impaired users navigate</li>
  <li><strong>SEO:</strong> Search engines rank pages higher when they understand the structure</li>
  <li><strong>Readability:</strong> Your code is easier for other developers to understand</li>
</ul>`,
    example_code: `<!-- Non-semantic (bad practice) -->\n<div class="header">\n  <div class="nav">...</div>\n</div>\n<div class="content">...</div>\n\n<!-- Semantic (good practice) -->\n<header>\n  <nav>\n    <a href="/">Home</a>\n    <a href="/about">About</a>\n  </nav>\n</header>\n\n<main>\n  <article>\n    <h1>My Blog Post</h1>\n    <p>This is the content...</p>\n  </article>\n  <aside>\n    <h3>Related Posts</h3>\n  </aside>\n</main>\n\n<footer>\n  <p>&copy; 2024 My Website</p>\n</footer>`
  },
  {
    title: 'Forms',
    content: `<h2>What are HTML Forms?</h2>
<p>Forms are used to collect information from the user. When you log in to a website, search on Google, or fill in your name — you are using an HTML form.</p>

<h2>The Form Tag</h2>
<p>The <code>&lt;form&gt;</code> tag wraps all the inputs. It has two important attributes:</p>
<ul>
  <li><code>action</code> — Where to send the data (a URL)</li>
  <li><code>method</code> — How to send it (<code>GET</code> or <code>POST</code>)</li>
</ul>

<h2>Common Input Types</h2>
<ul>
  <li><code>type="text"</code> — Single line text</li>
  <li><code>type="email"</code> — Email address (with validation)</li>
  <li><code>type="password"</code> — Hidden text</li>
  <li><code>type="number"</code> — Numbers only</li>
  <li><code>type="checkbox"</code> — Tick boxes</li>
  <li><code>type="radio"</code> — Choose one from many</li>
  <li><code>type="submit"</code> — Submit the form</li>
</ul>

<h2>Labels</h2>
<p>Always pair inputs with a <code>&lt;label&gt;</code>. The <code>for</code> attribute on the label must match the <code>id</code> of the input. This improves accessibility.</p>`,
    example_code: `<form action="/login" method="POST">\n\n  <label for="username">Username:</label>\n  <input type="text" id="username" name="username" placeholder="Enter username" required>\n\n  <label for="email">Email:</label>\n  <input type="email" id="email" name="email" placeholder="you@email.com">\n\n  <label for="password">Password:</label>\n  <input type="password" id="password" name="password">\n\n  <label for="age">Age:</label>\n  <input type="number" id="age" name="age" min="1" max="120">\n\n  <label>\n    <input type="checkbox" name="agree"> I agree to the terms\n  </label>\n\n  <button type="submit">Login</button>\n</form>`
  },
  {
    title: 'Tables',
    content: `<h2>What are HTML Tables?</h2>
<p>Tables are used to display data in rows and columns — like a spreadsheet. They are great for structured data like schedules, prices, or comparisons.</p>

<h2>Table Structure Tags</h2>
<ul>
  <li><code>&lt;table&gt;</code> — The outer table wrapper</li>
  <li><code>&lt;thead&gt;</code> — The header section of the table</li>
  <li><code>&lt;tbody&gt;</code> — The body (data rows)</li>
  <li><code>&lt;tr&gt;</code> — A table row</li>
  <li><code>&lt;th&gt;</code> — A header cell (bold and centered by default)</li>
  <li><code>&lt;td&gt;</code> — A standard data cell</li>
</ul>

<h2>Spanning Rows and Columns</h2>
<ul>
  <li><code>colspan="2"</code> — Makes a cell span 2 columns</li>
  <li><code>rowspan="3"</code> — Makes a cell span 3 rows</li>
</ul>`,
    example_code: `<table border="1">\n  <thead>\n    <tr>\n      <th>Name</th>\n      <th>Subject</th>\n      <th>Score</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Alice</td>\n      <td>Math</td>\n      <td>95</td>\n    </tr>\n    <tr>\n      <td>Bob</td>\n      <td>Science</td>\n      <td>88</td>\n    </tr>\n    <tr>\n      <td colspan="2">Average</td>\n      <td>91.5</td>\n    </tr>\n  </tbody>\n</table>`
  },
  {
    title: 'Links and Navigation',
    content: `<h2>The Anchor Tag</h2>
<p>The <code>&lt;a&gt;</code> tag creates a hyperlink. The <code>href</code> attribute holds the destination URL.</p>

<h2>Types of Links</h2>
<ul>
  <li><strong>External link:</strong> Links to another website — use a full URL starting with <code>https://</code></li>
  <li><strong>Internal link:</strong> Links to another page in your own site — use a relative path like <code>about.html</code></li>
  <li><strong>Anchor link:</strong> Jumps to a section on the same page using an <code>id</code></li>
  <li><strong>Email link:</strong> Opens an email app with <code>mailto:</code></li>
</ul>

<h2>The target Attribute</h2>
<p><code>target="_blank"</code> opens the link in a new tab. Always add <code>rel="noopener noreferrer"</code> with it for security.</p>

<h2>Building a Navigation Bar</h2>
<p>Use the <code>&lt;nav&gt;</code> semantic tag to wrap your navigation links.</p>`,
    example_code: `<!-- External link -->\n<a href="https://google.com" target="_blank" rel="noopener noreferrer">Visit Google</a>\n\n<!-- Internal link -->\n<a href="about.html">About Us</a>\n\n<!-- Anchor link (jumps to section with id="contact") -->\n<a href="#contact">Go to Contact Section</a>\n\n<!-- Email link -->\n<a href="mailto:hello@example.com">Email Us</a>\n\n<!-- Navigation bar -->\n<nav>\n  <a href="index.html">Home</a>\n  <a href="about.html">About</a>\n  <a href="contact.html">Contact</a>\n</nav>\n\n<!-- Target section -->\n<section id="contact">\n  <h2>Contact Us</h2>\n</section>`
  },
  {
    title: 'Images',
    content: `<h2>The img Tag</h2>
<p>The <code>&lt;img&gt;</code> tag is used to display images. It is a <strong>self-closing tag</strong> — it does not have a closing tag.</p>

<h2>Essential Attributes</h2>
<ul>
  <li><code>src</code> — The path or URL to the image</li>
  <li><code>alt</code> — Alternative text shown if the image fails to load, and read by screen readers. <strong>Always include this!</strong></li>
  <li><code>width</code> and <code>height</code> — Set the size (in pixels or percent)</li>
</ul>

<h2>Image Formats</h2>
<ul>
  <li><strong>JPEG/JPG</strong> — Best for photos</li>
  <li><strong>PNG</strong> — Best for images with transparency</li>
  <li><strong>SVG</strong> — Scalable vector graphics, perfect for icons and logos</li>
  <li><strong>WebP</strong> — Modern format, smaller file sizes</li>
</ul>

<h2>Responsive Images</h2>
<p>Set <code>max-width: 100%</code> in CSS to make images responsive so they never overflow their container.</p>`,
    example_code: `<!-- Basic image -->\n<img src="photo.jpg" alt="A sunset over the ocean">\n\n<!-- Image with size -->\n<img src="logo.png" alt="Company Logo" width="200" height="100">\n\n<!-- Image from external URL -->\n<img src="https://picsum.photos/400/300" alt="Random placeholder">\n\n<!-- Responsive image (in CSS: img { max-width: 100%; }) -->\n<img src="banner.jpg" alt="Banner" style="max-width: 100%; height: auto;">\n\n<!-- Figure with caption -->\n<figure>\n  <img src="chart.png" alt="Sales chart for 2024">\n  <figcaption>Figure 1: Annual Sales 2024</figcaption>\n</figure>`
  },
  {
    title: 'Accessibility',
    content: `<h2>What is Web Accessibility?</h2>
<p>Web accessibility means building websites that <strong>everyone can use</strong> — including people with visual, hearing, motor, or cognitive disabilities.</p>
<p>Around 15% of the world's population has some form of disability. Accessible sites are also better for SEO and easier to maintain.</p>

<h2>Key Accessibility Principles (WCAG)</h2>
<ul>
  <li><strong>Perceivable:</strong> Content can be seen or heard</li>
  <li><strong>Operable:</strong> The interface can be navigated with a keyboard</li>
  <li><strong>Understandable:</strong> Content is easy to understand</li>
  <li><strong>Robust:</strong> Works with assistive technologies</li>
</ul>

<h2>Practical Tips</h2>
<ul>
  <li>Always use <code>alt</code> text on images</li>
  <li>Use semantic HTML (not <code>&lt;div&gt;</code> for everything)</li>
  <li>Ensure sufficient color contrast</li>
  <li>Make sure your site is fully navigable with just a keyboard (Tab key)</li>
  <li>Use ARIA attributes when semantic HTML isn't enough</li>
  <li>Add <code>&lt;label&gt;</code> to every form input</li>
</ul>

<h2>ARIA Attributes</h2>
<p>ARIA (Accessible Rich Internet Applications) attributes add extra meaning for screen readers. Common ones include:</p>
<ul>
  <li><code>aria-label="..."</code> — Provides a text label for an element</li>
  <li><code>aria-hidden="true"</code> — Hides decorative elements from screen readers</li>
  <li><code>role="button"</code> — Declares the role of an element</li>
</ul>`,
    example_code: `<!-- Bad: no alt text -->\n<img src="logo.png">\n\n<!-- Good: descriptive alt text -->\n<img src="logo.png" alt="StackGen company logo">\n\n<!-- Bad: non-semantic button -->\n<div onclick="submit()">Submit</div>\n\n<!-- Good: real button, keyboard accessible -->\n<button type="submit">Submit</button>\n\n<!-- Skip navigation link for keyboard users -->\n<a href="#main-content" class="skip-link">Skip to main content</a>\n\n<!-- ARIA label on icon button -->\n<button aria-label="Close menu">\n  <img src="x-icon.svg" aria-hidden="true">\n</button>\n\n<!-- Good form -->\n<label for="email">Email Address</label>\n<input type="email" id="email" name="email" required aria-required="true">`
  },

  // ─── CSS ───────────────────────────────────────────────────────────────────
  {
    title: 'CSS Basics',
    content: `<h2>What is CSS?</h2>
<p>CSS stands for <strong>Cascading Style Sheets</strong>. It controls how HTML elements look — their colors, fonts, sizes, spacing, and layout.</p>
<p>Without CSS, every website would look like a plain text document.</p>

<h2>Three Ways to Add CSS</h2>
<ol>
  <li><strong>Inline:</strong> Directly in the HTML element using the <code>style</code> attribute</li>
  <li><strong>Internal:</strong> Inside a <code>&lt;style&gt;</code> tag in the <code>&lt;head&gt;</code></li>
  <li><strong>External:</strong> In a separate <code>.css</code> file linked with <code>&lt;link&gt;</code> — <strong>best practice</strong></li>
</ol>

<h2>CSS Syntax</h2>
<p>A CSS rule has three parts:</p>
<ul>
  <li><strong>Selector:</strong> Which HTML element to style</li>
  <li><strong>Property:</strong> What to change (e.g. <code>color</code>, <code>font-size</code>)</li>
  <li><strong>Value:</strong> What to set it to</li>
</ul>

<h2>Common CSS Properties</h2>
<ul>
  <li><code>color</code> — Text color</li>
  <li><code>background-color</code> — Background color</li>
  <li><code>font-size</code> — Text size</li>
  <li><code>font-weight</code> — Bold/normal</li>
  <li><code>margin</code> — Space outside the element</li>
  <li><code>padding</code> — Space inside the element</li>
  <li><code>border</code> — Border around the element</li>
</ul>`,
    example_code: `/* External CSS file (style.css) */\n\n/* Style all h1 elements */\nh1 {\n  color: #3b82f6;\n  font-size: 2rem;\n  font-weight: bold;\n}\n\n/* Style all paragraphs */\np {\n  color: #334155;\n  font-size: 1rem;\n  line-height: 1.6;\n}\n\n/* Style an element by class */\n.card {\n  background-color: white;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 1.5rem;\n  margin-bottom: 1rem;\n}\n\n/* Style an element by id */\n#header {\n  background-color: #0f172a;\n  color: white;\n  padding: 1rem;\n}`
  },
  {
    title: 'Selectors',
    content: `<h2>What are CSS Selectors?</h2>
<p>Selectors tell CSS <em>which</em> HTML elements to style. There are many types of selectors, from very broad to very specific.</p>

<h2>Types of Selectors</h2>
<ul>
  <li><strong>Element selector:</strong> Targets all elements of a type — <code>p { }</code></li>
  <li><strong>Class selector:</strong> Targets elements with a specific class — <code>.card { }</code></li>
  <li><strong>ID selector:</strong> Targets a unique element — <code>#header { }</code></li>
  <li><strong>Universal selector:</strong> Targets everything — <code>* { }</code></li>
  <li><strong>Group selector:</strong> Multiple selectors at once — <code>h1, h2, h3 { }</code></li>
  <li><strong>Descendant selector:</strong> Targets an element inside another — <code>nav a { }</code></li>
  <li><strong>Child selector:</strong> Direct child only — <code>ul > li { }</code></li>
</ul>

<h2>Pseudo-classes</h2>
<p>Pseudo-classes target elements in a special state:</p>
<ul>
  <li><code>a:hover</code> — When mouse hovers over a link</li>
  <li><code>button:active</code> — When a button is clicked</li>
  <li><code>input:focus</code> — When an input is selected</li>
  <li><code>li:first-child</code> — The first list item</li>
  <li><code>li:nth-child(2)</code> — The second list item</li>
</ul>

<h2>Specificity</h2>
<p>When multiple rules target the same element, specificity decides which wins. Order from highest to lowest: <strong>ID > Class > Element</strong>.</p>`,
    example_code: `/* Element selector */\np { color: gray; }\n\n/* Class selector */\n.highlight { background-color: yellow; }\n\n/* ID selector */\n#logo { width: 150px; }\n\n/* Group selector */\nh1, h2, h3 { font-family: 'Inter', sans-serif; }\n\n/* Descendant: any <a> inside <nav> */\nnav a { color: white; text-decoration: none; }\n\n/* Direct child only */\nul > li { list-style: square; }\n\n/* Pseudo-class: hover effect */\nbutton:hover {\n  background-color: #2563eb;\n  cursor: pointer;\n}\n\n/* Focus state for accessibility */\ninput:focus {\n  outline: 2px solid #3b82f6;\n  border-color: #3b82f6;\n}\n\n/* Every other row in a table */\ntr:nth-child(even) { background-color: #f8fafc; }`
  },
  {
    title: 'Box Model',
    content: `<h2>What is the CSS Box Model?</h2>
<p>Every HTML element is a rectangular box. The <strong>Box Model</strong> describes how that box is structured — from the innermost content outward.</p>

<h2>The Four Layers</h2>
<ol>
  <li><strong>Content:</strong> The actual text, image, or other content inside the element</li>
  <li><strong>Padding:</strong> Transparent space <em>inside</em> the border, between content and border</li>
  <li><strong>Border:</strong> A line surrounding the padding</li>
  <li><strong>Margin:</strong> Transparent space <em>outside</em> the border, between this element and others</li>
</ol>

<h2>box-sizing: border-box</h2>
<p>By default, <code>width</code> only includes the content. So a box with <code>width: 200px</code> and <code>padding: 20px</code> would actually be 240px wide. This is confusing!</p>
<p>Setting <code>box-sizing: border-box</code> makes <code>width</code> include the padding and border too — much easier to work with. Always add this at the top of your CSS:</p>
<pre>* { box-sizing: border-box; }</pre>

<h2>Shorthand for margin and padding</h2>
<ul>
  <li><code>margin: 10px</code> — All four sides</li>
  <li><code>margin: 10px 20px</code> — Top/bottom, Left/right</li>
  <li><code>margin: 10px 20px 5px 15px</code> — Top, Right, Bottom, Left (clockwise)</li>
</ul>`,
    example_code: `/* Apply border-box to everything — do this always! */\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n.card {\n  width: 300px;\n  padding: 20px;       /* space inside */\n  border: 2px solid #3b82f6; /* border */\n  margin: 15px;        /* space outside */\n  background: white;\n}\n\n/* With border-box, the card is exactly 300px wide */\n/* Without it, it would be 300 + 40 (padding) + 4 (border) = 344px */\n\n/* Margin auto for centering */\n.container {\n  width: 800px;\n  margin: 0 auto; /* center horizontally */\n}\n\n/* Padding shorthand */\n.button {\n  padding: 12px 24px; /* 12px top/bottom, 24px left/right */\n}`
  },
  {
    title: 'Flexbox',
    content: `<h2>What is Flexbox?</h2>
<p>Flexbox (Flexible Box Layout) is a CSS layout system that makes it easy to <strong>align and distribute items</strong> inside a container — in one dimension (a row or a column).</p>
<p>Before Flexbox, centering things with CSS was painful. Now it's simple.</p>

<h2>How to Enable Flexbox</h2>
<p>Apply <code>display: flex</code> to the <strong>parent container</strong>. Its direct children automatically become flex items.</p>

<h2>Key Flexbox Properties on the Container</h2>
<ul>
  <li><code>flex-direction</code> — Direction: <code>row</code> (default), <code>column</code>, <code>row-reverse</code></li>
  <li><code>justify-content</code> — Align items along the main axis: <code>flex-start</code>, <code>center</code>, <code>flex-end</code>, <code>space-between</code>, <code>space-around</code></li>
  <li><code>align-items</code> — Align items along the cross axis: <code>stretch</code>, <code>center</code>, <code>flex-start</code>, <code>flex-end</code></li>
  <li><code>gap</code> — Space between flex items</li>
  <li><code>flex-wrap</code> — Whether items wrap to the next line</li>
</ul>

<h2>Key Flexbox Properties on Items</h2>
<ul>
  <li><code>flex: 1</code> — Item takes up equal share of available space</li>
  <li><code>flex-grow</code> — How much the item grows</li>
  <li><code>flex-shrink</code> — How much the item shrinks</li>
  <li><code>align-self</code> — Override alignment for a single item</li>
</ul>`,
    example_code: `/* Centering with Flexbox — the classic use case */\n.container {\n  display: flex;\n  justify-content: center; /* horizontal center */\n  align-items: center;     /* vertical center */\n  height: 100vh;           /* full screen height */\n}\n\n/* Navigation bar */\n.navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem 2rem;\n  background: #0f172a;\n}\n\n/* Card row with gap */\n.cards {\n  display: flex;\n  gap: 1.5rem;\n  flex-wrap: wrap; /* wrap to next line if needed */\n}\n\n.card {\n  flex: 1;          /* each card takes equal space */\n  min-width: 200px;\n  padding: 1.5rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n}\n\n/* Column layout */\n.sidebar-layout {\n  display: flex;\n  flex-direction: row;\n  gap: 2rem;\n}\n\n.sidebar { width: 250px; }\n.main { flex: 1; }`
  },
  {
    title: 'Grid',
    content: `<h2>What is CSS Grid?</h2>
<p>CSS Grid is a powerful 2D layout system. While Flexbox handles layout in <em>one direction</em> (row or column), Grid handles <strong>both rows and columns at the same time</strong>.</p>
<p>Grid is ideal for building full page layouts.</p>

<h2>How to Enable Grid</h2>
<p>Apply <code>display: grid</code> to a container, then define columns and rows.</p>

<h2>Key Grid Properties</h2>
<ul>
  <li><code>grid-template-columns</code> — Define column sizes</li>
  <li><code>grid-template-rows</code> — Define row sizes</li>
  <li><code>gap</code> — Space between grid cells</li>
  <li><code>grid-column</code> — How many columns an item spans</li>
  <li><code>grid-row</code> — How many rows an item spans</li>
</ul>

<h2>The fr Unit</h2>
<p>The <code>fr</code> (fraction) unit divides the available space. <code>1fr 2fr 1fr</code> gives the middle column twice as much space as the others.</p>

<h2>repeat() and auto-fill</h2>
<p><code>repeat(3, 1fr)</code> creates 3 equal columns. <code>repeat(auto-fill, minmax(200px, 1fr))</code> creates as many columns as fit, each at least 200px — perfect for responsive grids.</p>`,
    example_code: `/* Basic 3-column grid */\n.grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr; /* or repeat(3, 1fr) */\n  gap: 1.5rem;\n}\n\n/* Full page layout */\n.page-layout {\n  display: grid;\n  grid-template-columns: 250px 1fr;\n  grid-template-rows: 60px 1fr 50px;\n  height: 100vh;\n}\n\n.header  { grid-column: 1 / -1; } /* spans all columns */\n.sidebar { grid-row: 2; }\n.main    { grid-row: 2; }\n.footer  { grid-column: 1 / -1; } /* spans all columns */\n\n/* Responsive card grid — no media queries needed! */\n.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n  gap: 1.5rem;\n}\n\n/* Spanning cells */\n.featured {\n  grid-column: span 2; /* takes up 2 columns */\n}`
  },
  {
    title: 'Positioning',
    content: `<h2>CSS Position Property</h2>
<p>The <code>position</code> property controls how an element is placed in the document. Once positioned, you can use <code>top</code>, <code>right</code>, <code>bottom</code>, and <code>left</code> to move it.</p>

<h2>Position Values</h2>
<ul>
  <li><strong>static</strong> (default) — Normal document flow, top/left/etc. have no effect</li>
  <li><strong>relative</strong> — Offset from its <em>normal position</em>. Other elements still occupy the original space</li>
  <li><strong>absolute</strong> — Removed from document flow. Positioned relative to its nearest <em>positioned ancestor</em> (one that isn't static)</li>
  <li><strong>fixed</strong> — Stays in the same place on the screen, even when scrolling (like a sticky navbar)</li>
  <li><strong>sticky</strong> — Acts like <code>relative</code> until you scroll past it, then becomes <code>fixed</code></li>
</ul>

<h2>z-index</h2>
<p>When elements overlap, <code>z-index</code> controls which one appears on top. Higher values appear in front. Only works on positioned elements (not static).</p>`,
    example_code: `/* Relative positioning */\n.box {\n  position: relative;\n  top: 20px;   /* moves 20px down from its normal spot */\n  left: 10px;  /* moves 10px right */\n}\n\n/* Absolute — positioned inside a relative parent */\n.parent {\n  position: relative; /* establishes positioning context */\n}\n.badge {\n  position: absolute;\n  top: 10px;\n  right: 10px; /* in the top-right corner of parent */\n}\n\n/* Fixed navbar — stays at top when scrolling */\n.navbar {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: 1000;\n  background: #0f172a;\n}\n\n/* Sticky sidebar */\n.sidebar {\n  position: sticky;\n  top: 80px; /* sticks 80px from top when scrolling */\n}`
  },

  // ─── RESPONSIVE ────────────────────────────────────────────────────────────
  {
    title: 'Responsive Design',
    content: `<h2>What is Responsive Design?</h2>
<p>Responsive design means your website <strong>adapts to look great on any screen size</strong> — from a huge desktop monitor to a small mobile phone.</p>
<p>Today, over 60% of web traffic comes from mobile devices. Responsive design is not optional — it's essential.</p>

<h2>Core Principles</h2>
<ul>
  <li><strong>Fluid grids:</strong> Use percentages or <code>fr</code> units instead of fixed pixel widths</li>
  <li><strong>Flexible images:</strong> <code>max-width: 100%</code> prevents images from overflowing</li>
  <li><strong>Media queries:</strong> Apply different styles at different screen sizes</li>
  <li><strong>Mobile-first:</strong> Design for mobile screens first, then add styles for larger screens</li>
</ul>

<h2>The Viewport Meta Tag</h2>
<p>This tag in your <code>&lt;head&gt;</code> is critical! Without it, mobile browsers will zoom out and render your site at a desktop width:</p>
<code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code>

<h2>Mobile-First vs Desktop-First</h2>
<p><strong>Mobile-first</strong> is the recommended approach. You write your base CSS for small screens, then use <code>min-width</code> media queries to add styles for larger screens. This results in simpler, more efficient CSS.</p>`,
    example_code: `/* ✅ Mobile-first approach */\n\n/* Base styles — designed for mobile */\n.container {\n  width: 100%;\n  padding: 1rem;\n}\n\n.cards {\n  display: flex;\n  flex-direction: column; /* stacked on mobile */\n  gap: 1rem;\n}\n\nimg {\n  max-width: 100%;\n  height: auto;\n}\n\n/* Tablet (768px and up) */\n@media (min-width: 768px) {\n  .container {\n    padding: 1.5rem;\n  }\n  .cards {\n    flex-direction: row; /* side by side on tablet */\n  }\n}\n\n/* Desktop (1024px and up) */\n@media (min-width: 1024px) {\n  .container {\n    max-width: 1200px;\n    margin: 0 auto;\n  }\n}`
  },
  {
    title: 'Media Queries',
    content: `<h2>What are Media Queries?</h2>
<p>Media queries are a CSS feature that lets you <strong>apply different styles based on conditions</strong> like screen width, height, or device type.</p>

<h2>Syntax</h2>
<p><code>@media (condition) { /* CSS rules */ }</code></p>

<h2>Common Breakpoints</h2>
<ul>
  <li><strong>Mobile:</strong> up to 767px</li>
  <li><strong>Tablet:</strong> 768px – 1023px</li>
  <li><strong>Desktop:</strong> 1024px and above</li>
  <li><strong>Large Desktop:</strong> 1440px and above</li>
</ul>

<h2>min-width vs max-width</h2>
<ul>
  <li><code>min-width: 768px</code> — Applies when screen is AT LEAST 768px (mobile-first)</li>
  <li><code>max-width: 767px</code> — Applies when screen is AT MOST 767px (desktop-first)</li>
</ul>

<h2>Other Media Features</h2>
<ul>
  <li><code>orientation: portrait</code> — Portrait mode</li>
  <li><code>prefers-color-scheme: dark</code> — Dark mode preference</li>
  <li><code>print</code> — Print-only styles</li>
</ul>`,
    example_code: `/* Mobile-first media queries */\n\n/* Base: mobile */\n.nav { display: none; }\n.menu-toggle { display: block; }\n\n/* Tablet and up */\n@media (min-width: 768px) {\n  .nav { display: flex; }\n  .menu-toggle { display: none; }\n}\n\n/* Desktop */\n@media (min-width: 1024px) {\n  .grid {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n\n/* Dark mode */\n@media (prefers-color-scheme: dark) {\n  body {\n    background: #0f172a;\n    color: #f8fafc;\n  }\n}\n\n/* Print styles */\n@media print {\n  .navbar, .sidebar, .ads {\n    display: none;\n  }\n  body {\n    font-size: 12pt;\n    color: black;\n  }\n}`
  },
  {
    title: 'CSS Variables',
    content: `<h2>What are CSS Variables?</h2>
<p>CSS Variables (officially called <strong>Custom Properties</strong>) let you store values in one place and reuse them throughout your stylesheet. If you want to change your brand color, you only change it in one place instead of searching through hundreds of lines.</p>

<h2>Declaring Variables</h2>
<p>Variables must start with <code>--</code> and are usually declared on the <code>:root</code> selector so they're available everywhere:</p>

<h2>Using Variables</h2>
<p>Use the <code>var()</code> function to use a variable. You can also provide a fallback value:</p>
<code>color: var(--primary-color, blue);</code>

<h2>Why Use CSS Variables?</h2>
<ul>
  <li>Easy to build a <strong>design system</strong> (colors, sizes, fonts in one place)</li>
  <li>Makes <strong>theming</strong> (dark mode/light mode) very simple</li>
  <li>Can be changed with JavaScript at runtime</li>
  <li>Inherited by child elements</li>
</ul>`,
    example_code: `/* Declare variables on :root (global scope) */\n:root {\n  --color-primary: #3b82f6;\n  --color-success: #22c55e;\n  --color-danger: #ef4444;\n  --color-bg: #0f172a;\n  --color-text: #f8fafc;\n  --border-radius: 8px;\n  --font-size-base: 1rem;\n  --spacing-md: 1rem;\n  --spacing-lg: 2rem;\n}\n\n/* Use the variables */\nbody {\n  background-color: var(--color-bg);\n  color: var(--color-text);\n  font-size: var(--font-size-base);\n}\n\n.button {\n  background-color: var(--color-primary);\n  border-radius: var(--border-radius);\n  padding: var(--spacing-md);\n}\n\n/* Dark mode theme — just override variables! */\n[data-theme="light"] {\n  --color-bg: #ffffff;\n  --color-text: #0f172a;\n}`
  },
  {
    title: 'Animations',
    content: `<h2>CSS Transitions</h2>
<p>Transitions create smooth animations when a CSS property changes value. For example, smoothly changing the background color of a button when you hover over it.</p>
<p><code>transition: property duration timing-function;</code></p>

<h2>CSS Keyframe Animations</h2>
<p>For more complex animations that run automatically (not just on hover), use <code>@keyframes</code>. You define what the element looks like at different points (0% to 100%), and CSS animates between them.</p>

<h2>Animation Properties</h2>
<ul>
  <li><code>animation-name</code> — The @keyframes name</li>
  <li><code>animation-duration</code> — How long one cycle takes</li>
  <li><code>animation-iteration-count</code> — How many times (use <code>infinite</code> for looping)</li>
  <li><code>animation-timing-function</code> — Easing: <code>ease</code>, <code>linear</code>, <code>ease-in-out</code></li>
  <li><code>animation-delay</code> — Wait before starting</li>
</ul>

<h2>Transform</h2>
<p>The <code>transform</code> property moves, scales, or rotates elements without affecting layout:</p>
<ul>
  <li><code>translate(x, y)</code> — Move</li>
  <li><code>scale(1.1)</code> — Grow to 110%</li>
  <li><code>rotate(45deg)</code> — Rotate</li>
</ul>`,
    example_code: `/* Transition: smooth hover effect */\n.button {\n  background-color: #3b82f6;\n  transition: background-color 0.3s ease, transform 0.2s ease;\n}\n\n.button:hover {\n  background-color: #2563eb;\n  transform: scale(1.05); /* slightly bigger */\n}\n\n/* Keyframe animation: fade in */\n@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(20px); }\n  to   { opacity: 1; transform: translateY(0); }\n}\n\n.card {\n  animation: fadeIn 0.5s ease forwards;\n}\n\n/* Spinning loader */\n@keyframes spin {\n  from { transform: rotate(0deg); }\n  to   { transform: rotate(360deg); }\n}\n\n.loader {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #e2e8f0;\n  border-top-color: #3b82f6;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}`
  },

  // ─── JAVASCRIPT ────────────────────────────────────────────────────────────
  {
    title: 'JavaScript Introduction',
    content: `<h2>What is JavaScript?</h2>
<p>JavaScript (JS) is the programming language of the web. While HTML structures content and CSS styles it, <strong>JavaScript makes it interactive</strong>.</p>
<p>Examples of JavaScript in action: clicking a button and seeing a dropdown appear, form validation, fetching data from an API, animations, and entire web applications.</p>

<h2>Where Does JavaScript Run?</h2>
<ul>
  <li><strong>In the browser:</strong> JavaScript is built into every web browser. Your code runs on the user's computer</li>
  <li><strong>On the server:</strong> With Node.js, JavaScript also runs on servers (which is what powers our backend!)</li>
</ul>

<h2>How to Add JavaScript</h2>
<ol>
  <li><strong>Inline:</strong> <code>&lt;button onclick="alert('Hi!')"&gt;</code></li>
  <li><strong>Internal:</strong> Inside a <code>&lt;script&gt;</code> tag in HTML</li>
  <li><strong>External file:</strong> <code>&lt;script src="app.js"&gt;&lt;/script&gt;</code> — best practice</li>
</ol>
<p>Always put your <code>&lt;script&gt;</code> tag at the <strong>end of the body</strong> so the HTML loads first.</p>

<h2>Your First JavaScript</h2>
<p><code>console.log()</code> prints messages to the browser's Developer Console (press F12 to open it). It's your most important debugging tool.</p>`,
    example_code: `// JavaScript runs in the browser\nconsole.log("Hello, World!");\nconsole.log("I am learning JavaScript!");\n\n// Showing an alert popup\nalert("Welcome to StackGen!");\n\n// Asking the user a question\nlet name = prompt("What is your name?");\nconsole.log("Hello, " + name + "!");\n\n// Confirming an action\nlet confirmed = confirm("Are you sure you want to delete this?");\nif (confirmed) {\n  console.log("Item deleted!");\n} else {\n  console.log("Cancelled.");\n}\n\n// Simple math\nconsole.log(2 + 3);   // 5\nconsole.log(10 - 4);  // 6\nconsole.log(3 * 4);   // 12\nconsole.log(9 / 3);   // 3`
  },
  {
    title: 'Variables',
    content: `<h2>What is a Variable?</h2>
<p>A variable is a <strong>named container for storing data</strong>. Instead of typing the same value over and over, you store it in a variable and use the name.</p>
<p>Think of a variable like a labeled box: you put something in it, give it a name, and can get it back later.</p>

<h2>Three Ways to Declare Variables</h2>
<ul>
  <li><code>let</code> — Use for values that will change. Block-scoped. <strong>Preferred for most cases.</strong></li>
  <li><code>const</code> — Use for values that will NOT change. Block-scoped. <strong>Preferred when value is fixed.</strong></li>
  <li><code>var</code> — The old way. Function-scoped and has some quirky behaviors. <strong>Avoid in modern code.</strong></li>
</ul>

<h2>Naming Rules</h2>
<ul>
  <li>Can contain letters, numbers, underscore <code>_</code>, and dollar sign <code>$</code></li>
  <li>Cannot start with a number</li>
  <li>Cannot use reserved words like <code>let</code>, <code>const</code>, <code>function</code></li>
  <li>Case-sensitive: <code>myName</code> and <code>myname</code> are different</li>
  <li>Use camelCase by convention: <code>firstName</code>, <code>userAge</code></li>
</ul>`,
    example_code: `// let — value can change\nlet score = 0;\nscore = 10; // updating the value\nscore = score + 5; // now 15\nconsole.log(score); // 15\n\n// const — value cannot be reassigned\nconst PI = 3.14159;\nconst siteName = "StackGen";\n// PI = 3; // ❌ TypeError: Assignment to constant variable\n\n// var — avoid this\nvar oldStyle = "don't use me";\n\n// Variable naming examples\nlet firstName = "Alice";     // camelCase ✅\nlet user_age = 25;           // underscore (OK)\nlet $price = 9.99;           // dollar sign (OK)\n// let 2fast = true;         // ❌ starts with number\n\n// Variables hold different types\nlet name = "Bob";        // string\nlet age = 30;            // number\nlet isLoggedIn = true;   // boolean\nlet nothing = null;      // null\nlet unknown;             // undefined (not yet assigned)`
  },
  {
    title: 'Data Types',
    content: `<h2>What are Data Types?</h2>
<p>Data types tell JavaScript what <em>kind</em> of value a variable holds. JavaScript is a <strong>dynamically typed</strong> language, meaning variables can hold any type and can even change type.</p>

<h2>Primitive Types (7 types)</h2>
<ul>
  <li><strong>String:</strong> Text, enclosed in quotes — <code>"Hello"</code>, <code>'World'</code>, <code>\`Template\`</code></li>
  <li><strong>Number:</strong> Both integers and decimals — <code>42</code>, <code>3.14</code>, <code>-7</code></li>
  <li><strong>Boolean:</strong> True or false — <code>true</code>, <code>false</code></li>
  <li><strong>Null:</strong> Intentional absence of a value — <code>null</code></li>
  <li><strong>Undefined:</strong> Variable declared but not assigned — <code>undefined</code></li>
  <li><strong>BigInt:</strong> Very large integers — <code>9007199254740991n</code></li>
  <li><strong>Symbol:</strong> Unique identifier (advanced)</li>
</ul>

<h2>Reference Types</h2>
<ul>
  <li><strong>Object:</strong> Collection of key-value pairs <code>{ name: "Alice" }</code></li>
  <li><strong>Array:</strong> Ordered list of values <code>[1, 2, 3]</code></li>
  <li><strong>Function:</strong> Reusable block of code</li>
</ul>

<h2>Checking the Type</h2>
<p>Use <code>typeof</code> to check a value's type: <code>typeof "hello"</code> returns <code>"string"</code></p>`,
    example_code: `// String\nlet greeting = "Hello, World!";\nlet city = 'Lagos';\nlet template = \`Learning JavaScript\`;\n\n// Number (integers and decimals are the same type)\nlet age = 25;\nlet price = 19.99;\nlet negative = -5;\nlet big = 1_000_000; // underscores for readability\n\n// Boolean\nlet isActive = true;\nlet isLoggedIn = false;\n\n// Null — intentionally empty\nlet selectedUser = null;\n\n// Undefined — not yet assigned\nlet result;\nconsole.log(result); // undefined\n\n// Checking types with typeof\nconsole.log(typeof "hello");    // "string"\nconsole.log(typeof 42);         // "number"\nconsole.log(typeof true);       // "boolean"\nconsole.log(typeof null);       // "object" ← known JS quirk!\nconsole.log(typeof undefined);  // "undefined"\nconsole.log(typeof []);         // "object"\nconsole.log(typeof {});         // "object"`
  },
  {
    title: 'Operators',
    content: `<h2>What are Operators?</h2>
<p>Operators let you perform operations on values. JavaScript has several categories.</p>

<h2>Arithmetic Operators</h2>
<ul>
  <li><code>+</code> Addition &nbsp; <code>-</code> Subtraction &nbsp; <code>*</code> Multiplication &nbsp; <code>/</code> Division</li>
  <li><code>%</code> Modulus (remainder): <code>10 % 3</code> = <code>1</code></li>
  <li><code>**</code> Exponent: <code>2 ** 10</code> = <code>1024</code></li>
  <li><code>++</code> Increment &nbsp; <code>--</code> Decrement</li>
</ul>

<h2>Assignment Operators</h2>
<p><code>=</code> assigns. Shorthand: <code>+=</code>, <code>-=</code>, <code>*=</code>, <code>/=</code>, <code>%=</code></p>

<h2>Comparison Operators (return true/false)</h2>
<ul>
  <li><code>===</code> Strict equality (same value AND same type) — <strong>always use this</strong></li>
  <li><code>!==</code> Strict inequality</li>
  <li><code>==</code> Loose equality (converts types) — avoid this</li>
  <li><code>&gt;</code> <code>&lt;</code> <code>&gt;=</code> <code>&lt;=</code> — Comparison</li>
</ul>

<h2>Logical Operators</h2>
<ul>
  <li><code>&&</code> AND — both must be true</li>
  <li><code>||</code> OR — at least one must be true</li>
  <li><code>!</code> NOT — flips true to false and vice versa</li>
</ul>`,
    example_code: `// Arithmetic\nconsole.log(5 + 3);    // 8\nconsole.log(10 - 4);   // 6\nconsole.log(3 * 4);    // 12\nconsole.log(9 / 2);    // 4.5\nconsole.log(10 % 3);   // 1 (remainder)\nconsole.log(2 ** 8);   // 256\n\n// Increment / Decrement\nlet count = 0;\ncount++;  // count = 1\ncount++;  // count = 2\ncount--;  // count = 1\n\n// Assignment shorthand\nlet score = 10;\nscore += 5;  // score = 15\nscore *= 2;  // score = 30\n\n// Comparison\nconsole.log(5 === 5);    // true\nconsole.log(5 === "5");  // false ← different types!\nconsole.log(5 == "5");   // true ← dangerous loose equality\nconsole.log(10 > 5);     // true\nconsole.log(3 <= 3);     // true\n\n// Logical\nconsole.log(true && true);   // true\nconsole.log(true && false);  // false\nconsole.log(true || false);  // true\nconsole.log(!true);          // false`
  },
  {
    title: 'Strings',
    content: `<h2>What are Strings?</h2>
<p>A string is a sequence of characters — text. Strings can be enclosed in single quotes, double quotes, or backticks (template literals).</p>

<h2>String Methods</h2>
<p>JavaScript strings come with many built-in methods for manipulation:</p>
<ul>
  <li><code>.length</code> — Returns number of characters</li>
  <li><code>.toUpperCase()</code> / <code>.toLowerCase()</code> — Change case</li>
  <li><code>.trim()</code> — Remove whitespace from both ends</li>
  <li><code>.includes("text")</code> — Returns true if text found</li>
  <li><code>.startsWith("text")</code> / <code>.endsWith("text")</code> — Check start or end</li>
  <li><code>.indexOf("text")</code> — Returns position of first match (-1 if not found)</li>
  <li><code>.slice(start, end)</code> — Extract a substring</li>
  <li><code>.replace("old", "new")</code> — Replace text</li>
  <li><code>.split(",")</code> — Split into an array</li>
  <li><code>.repeat(3)</code> — Repeat the string 3 times</li>
</ul>

<h2>String Concatenation</h2>
<p>Joining strings together with <code>+</code> or with template literals (backticks).</p>`,
    example_code: `let name = "Alice";\nlet city = "Lagos";\n\n// Length\nconsole.log(name.length); // 5\n\n// Case\nconsole.log(name.toUpperCase()); // "ALICE"\nconsole.log(name.toLowerCase()); // "alice"\n\n// Trim whitespace\nlet messy = "  hello world  ";\nconsole.log(messy.trim()); // "hello world"\n\n// Check content\nconsole.log(name.includes("lic")); // true\nconsole.log(name.startsWith("Al")); // true\n\n// Slice (extract part)\nlet message = "Hello, World!";\nconsole.log(message.slice(7, 12)); // "World"\n\n// Replace\nconsole.log(message.replace("World", "StackGen")); // "Hello, StackGen!"\n\n// Split into array\nlet csv = "red,green,blue";\nconsole.log(csv.split(",")); // ["red", "green", "blue"]\n\n// Concatenation\nlet greeting = "Hello, " + name + "!";\nconsole.log(greeting); // "Hello, Alice!"\n\n// Template literal (much cleaner!)\nconsole.log(\`Hello, \${name}! You live in \${city}.\`);`
  },
  {
    title: 'Type Conversion',
    content: `<h2>What is Type Conversion?</h2>
<p>Type conversion means <strong>explicitly</strong> changing a value from one data type to another. You, the programmer, do it intentionally.</p>

<h2>Converting to Number</h2>
<ul>
  <li><code>Number("42")</code> → <code>42</code></li>
  <li><code>Number("hello")</code> → <code>NaN</code> (Not a Number)</li>
  <li><code>Number(true)</code> → <code>1</code></li>
  <li><code>Number(false)</code> → <code>0</code></li>
  <li><code>Number(null)</code> → <code>0</code></li>
  <li><code>parseInt("42px")</code> → <code>42</code> (parses the leading number)</li>
  <li><code>parseFloat("3.14abc")</code> → <code>3.14</code></li>
</ul>

<h2>Converting to String</h2>
<ul>
  <li><code>String(42)</code> → <code>"42"</code></li>
  <li><code>(42).toString()</code> → <code>"42"</code></li>
  <li><code>String(true)</code> → <code>"true"</code></li>
</ul>

<h2>Converting to Boolean</h2>
<ul>
  <li><strong>Falsy values</strong> (convert to false): <code>0</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code>, <code>false</code></li>
  <li>Everything else is <strong>truthy</strong> (converts to true)</li>
</ul>`,
    example_code: `// String to Number\nlet ageInput = "25"; // from a form, comes as string\nlet age = Number(ageInput);\nconsole.log(age + 5); // 30 (works correctly now)\n\n// parseInt and parseFloat\nconsole.log(parseInt("42px"));     // 42\nconsole.log(parseFloat("3.14abc")); // 3.14\n\n// NaN\nlet bad = Number("hello");\nconsole.log(bad);         // NaN\nconsole.log(isNaN(bad));  // true (use this to check!)\n\n// Number to String\nlet num = 100;\nconsole.log(String(num));   // "100"\nconsole.log(num.toString()); // "100"\n\n// Boolean conversion\nconsole.log(Boolean(0));         // false\nconsole.log(Boolean(""));        // false\nconsole.log(Boolean(null));      // false\nconsole.log(Boolean("hello"));   // true\nconsole.log(Boolean(42));        // true\nconsole.log(Boolean([]));        // true (even empty array!)\n\n// Practical: check if input is a valid number\nfunction isValidAge(input) {\n  const num = Number(input);\n  return !isNaN(num) && num > 0 && num < 150;\n}`
  },
  {
    title: 'Type Coercion',
    content: `<h2>What is Type Coercion?</h2>
<p>Type coercion is when JavaScript <strong>automatically</strong> converts a value from one type to another — without you asking it to. This happens implicitly and can cause very surprising bugs if you don't understand it.</p>

<h2>Common Coercion Situations</h2>
<p>The <code>+</code> operator is a prime example. When one operand is a string, <code>+</code> concatenates instead of adding:</p>

<h2>Loose Equality (==) Coercion</h2>
<p>The <code>==</code> operator coerces types before comparing. This is why you should always use <code>===</code> (strict equality) instead.</p>

<h2>Truthy and Falsy in Conditions</h2>
<p>In an <code>if</code> statement, JavaScript coerces the condition to a boolean. Falsy values (<code>0</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code>) are treated as <code>false</code>. Everything else is <code>true</code>.</p>

<h2>How to Avoid Coercion Bugs</h2>
<ul>
  <li>Always use <code>===</code> instead of <code>==</code></li>
  <li>Explicitly convert types with <code>Number()</code>, <code>String()</code>, <code>Boolean()</code></li>
</ul>`,
    example_code: `// + operator with strings\nconsole.log("5" + 3);    // "53" ← concatenation, not addition!\nconsole.log(5 + 3);      // 8   ← number addition\nconsole.log("5" - 3);    // 2   ← subtraction converts string to number\nconsole.log("5" * 2);    // 10  ← multiplication also converts\n\n// Loose equality (==) coercion — avoid this!\nconsole.log(0 == false);   // true ← dangerous!\nconsole.log("" == false);  // true ← dangerous!\nconsole.log(null == undefined); // true ← dangerous!\nconsole.log(1 == "1");     // true ← dangerous!\n\n// Strict equality (===) — always use this\nconsole.log(0 === false);  // false ← correct!\nconsole.log(1 === "1");    // false ← correct!\n\n// Truthy/Falsy in conditions\nlet username = "";  // falsy\nif (username) {\n  console.log("Hello, " + username);\n} else {\n  console.log("Please enter a username"); // This runs\n}\n\n// The fix — explicit conversion\nlet formInput = "42";\nlet num = Number(formInput); // explicitly convert\nconsole.log(num + 8); // 50 (correct)`
  },
  {
    title: 'Conditions',
    content: `<h2>What are Conditions?</h2>
<p>Conditions let your code make decisions. Based on whether something is true or false, different code runs.</p>

<h2>if / else if / else</h2>
<p>The basic structure for conditional logic. Only the first matching block runs.</p>

<h2>Ternary Operator</h2>
<p>A shorthand for simple if/else. Syntax: <code>condition ? valueIfTrue : valueIfFalse</code></p>

<h2>switch Statement</h2>
<p>When you have many possible values to check, <code>switch</code> is cleaner than many <code>else if</code>s. Don't forget <code>break</code>!</p>

<h2>Nullish Coalescing (??)</h2>
<p><code>a ?? b</code> — returns <code>b</code> only if <code>a</code> is <code>null</code> or <code>undefined</code>. Useful for default values.</p>

<h2>Optional Chaining (?.)</h2>
<p><code>user?.address?.city</code> — safely accesses nested properties without throwing an error if something is null.</p>`,
    example_code: `// if / else if / else\nlet score = 78;\n\nif (score >= 90) {\n  console.log("Grade: A");\n} else if (score >= 80) {\n  console.log("Grade: B");\n} else if (score >= 70) {\n  console.log("Grade: C");\n} else {\n  console.log("Grade: F");\n}\n// Output: "Grade: C"\n\n// Ternary operator\nlet age = 20;\nlet status = age >= 18 ? "Adult" : "Minor";\nconsole.log(status); // "Adult"\n\n// switch statement\nlet day = "Monday";\nswitch(day) {\n  case "Saturday":\n  case "Sunday":\n    console.log("Weekend!");\n    break;\n  case "Monday":\n    console.log("Start of the week");\n    break;\n  default:\n    console.log("Weekday");\n}\n\n// Nullish coalescing for default values\nlet userName = null;\nconsole.log(userName ?? "Guest"); // "Guest"\n\n// Optional chaining\nlet user = { profile: { city: "Abuja" } };\nconsole.log(user?.profile?.city);    // "Abuja"\nconsole.log(user?.address?.street);  // undefined (no error!)`
  },
  {
    title: 'Loops',
    content: `<h2>What are Loops?</h2>
<p>Loops let you <strong>repeat a block of code multiple times</strong>. Instead of writing the same code 100 times, you write it once inside a loop.</p>

<h2>for Loop</h2>
<p>Use when you know exactly how many times to repeat. Has three parts: initialization, condition, and increment.</p>

<h2>while Loop</h2>
<p>Use when you want to repeat until a condition becomes false. Be careful of infinite loops!</p>

<h2>do...while Loop</h2>
<p>Like while, but always runs at least once because the condition is checked at the end.</p>

<h2>for...of Loop</h2>
<p>The cleanest way to loop through arrays and strings — gives you the <em>value</em> directly.</p>

<h2>for...in Loop</h2>
<p>Loops through the <em>keys</em> of an object.</p>

<h2>break and continue</h2>
<ul>
  <li><code>break</code> — Exits the loop entirely</li>
  <li><code>continue</code> — Skips to the next iteration</li>
</ul>`,
    example_code: `// for loop\nfor (let i = 0; i < 5; i++) {\n  console.log("Count:", i);\n}\n// Output: 0, 1, 2, 3, 4\n\n// Loop through an array\nlet fruits = ["apple", "banana", "mango"];\nfor (let i = 0; i < fruits.length; i++) {\n  console.log(fruits[i]);\n}\n\n// for...of (cleaner for arrays)\nfor (let fruit of fruits) {\n  console.log(fruit);\n}\n\n// while loop\nlet count = 0;\nwhile (count < 3) {\n  console.log("Count:", count);\n  count++; // don't forget this or it loops forever!\n}\n\n// for...in (loop through object keys)\nlet person = { name: "Alice", age: 25, city: "Lagos" };\nfor (let key in person) {\n  console.log(key + ": " + person[key]);\n}\n// name: Alice\n// age: 25\n// city: Lagos\n\n// break and continue\nfor (let i = 0; i < 10; i++) {\n  if (i === 5) break;    // stop at 5\n  if (i % 2 === 0) continue; // skip even numbers\n  console.log(i); // prints: 1, 3\n}`
  },
  {
    title: 'Arrays',
    content: `<h2>What is an Array?</h2>
<p>An array is an <strong>ordered collection of values</strong>. Each value is called an element, and each element has a numeric position called its <strong>index</strong> (starting from 0).</p>

<h2>Creating Arrays</h2>
<p>Use square brackets: <code>let colors = ["red", "green", "blue"]</code></p>

<h2>Accessing Elements</h2>
<p>Use the index in square brackets: <code>colors[0]</code> is <code>"red"</code>, <code>colors[1]</code> is <code>"green"</code></p>

<h2>Common Array Methods</h2>
<ul>
  <li><code>.length</code> — Number of elements</li>
  <li><code>.push(value)</code> — Add to end</li>
  <li><code>.pop()</code> — Remove from end (returns removed element)</li>
  <li><code>.unshift(value)</code> — Add to beginning</li>
  <li><code>.shift()</code> — Remove from beginning</li>
  <li><code>.indexOf(value)</code> — Find index of a value (-1 if not found)</li>
  <li><code>.includes(value)</code> — Returns true if value exists</li>
  <li><code>.slice(start, end)</code> — Returns a portion of the array</li>
  <li><code>.splice(start, deleteCount)</code> — Remove or insert elements</li>
  <li><code>.join(separator)</code> — Join elements into a string</li>
  <li><code>.reverse()</code> — Reverse the array in place</li>
</ul>`,
    example_code: `// Creating arrays\nlet numbers = [1, 2, 3, 4, 5];\nlet mixed = ["Alice", 25, true, null]; // can hold any types\nlet empty = [];\n\n// Accessing elements (0-indexed)\nconsole.log(numbers[0]);  // 1 (first)\nconsole.log(numbers[4]);  // 5 (last)\nconsole.log(numbers[numbers.length - 1]); // 5 (last, dynamic)\n\n// Adding and removing\nlet fruits = ["apple", "banana"];\nfruits.push("mango");        // ["apple", "banana", "mango"]\nfruits.unshift("cherry");    // ["cherry", "apple", "banana", "mango"]\nlet removed = fruits.pop();  // removes "mango", returns "mango"\nfruits.shift();              // removes "cherry"\nconsole.log(fruits);         // ["apple", "banana"]\n\n// Checking contents\nconsole.log(fruits.includes("apple")); // true\nconsole.log(fruits.indexOf("banana")); // 1\n\n// Slicing (does not modify original)\nlet nums = [1, 2, 3, 4, 5];\nconsole.log(nums.slice(1, 4)); // [2, 3, 4]\n\n// Joining\nlet colors = ["red", "green", "blue"];\nconsole.log(colors.join(", ")); // "red, green, blue"`
  },
  {
    title: 'Objects',
    content: `<h2>What is an Object?</h2>
<p>An object is a collection of <strong>key-value pairs</strong>. Each key (also called a property) is a string that maps to a value. Objects model real-world things — a user, a product, a car.</p>

<h2>Creating Objects</h2>
<p>Use curly braces with <code>key: value</code> pairs, separated by commas.</p>

<h2>Accessing Properties</h2>
<ul>
  <li><strong>Dot notation:</strong> <code>person.name</code> — use this most of the time</li>
  <li><strong>Bracket notation:</strong> <code>person["name"]</code> — use when the key is in a variable or has special characters</li>
</ul>

<h2>Modifying Objects</h2>
<ul>
  <li>Add: <code>person.country = "Nigeria"</code></li>
  <li>Update: <code>person.age = 26</code></li>
  <li>Delete: <code>delete person.age</code></li>
</ul>

<h2>Object Methods</h2>
<ul>
  <li><code>Object.keys(obj)</code> — Array of all keys</li>
  <li><code>Object.values(obj)</code> — Array of all values</li>
  <li><code>Object.entries(obj)</code> — Array of [key, value] pairs</li>
</ul>

<h2>Nested Objects</h2>
<p>Objects can contain other objects, creating nested structures.</p>`,
    example_code: `// Creating an object\nlet person = {\n  name: "Alice",\n  age: 25,\n  city: "Lagos",\n  isStudent: true\n};\n\n// Accessing properties\nconsole.log(person.name);    // "Alice" (dot notation)\nconsole.log(person["age"]); // 25 (bracket notation)\n\n// Adding and modifying\nperson.country = "Nigeria";  // add new property\nperson.age = 26;             // modify existing\ndelete person.isStudent;     // remove property\n\n// Object methods\nconsole.log(Object.keys(person));    // ["name", "age", "city", "country"]\nconsole.log(Object.values(person));  // ["Alice", 26, "Lagos", "Nigeria"]\n\n// Nested objects\nlet user = {\n  id: 1,\n  name: "Bob",\n  address: {\n    street: "123 Main St",\n    city: "Abuja",\n    country: "Nigeria"\n  },\n  hobbies: ["coding", "reading", "gaming"] // array inside object\n};\n\nconsole.log(user.address.city);     // "Abuja"\nconsole.log(user.hobbies[0]);       // "coding"\n\n// Looping through an object\nfor (let key in person) {\n  console.log(\`\${key}: \${person[key]}\`);\n}`
  },
  {
    title: 'Functions',
    content: `<h2>What is a Function?</h2>
<p>A function is a <strong>reusable block of code</strong> that performs a specific task. Instead of writing the same logic multiple times, you write it once as a function and call it whenever needed.</p>

<h2>Function Declaration</h2>
<p>The classic way to define a function. These are "hoisted" — you can call them before they're defined in the code.</p>

<h2>Function Expression</h2>
<p>A function stored in a variable. Not hoisted.</p>

<h2>Arrow Functions (ES6)</h2>
<p>A shorter syntax for functions. Arrow functions are very common in modern JavaScript.</p>

<h2>Parameters and Arguments</h2>
<ul>
  <li><strong>Parameters:</strong> Placeholders in the function definition</li>
  <li><strong>Arguments:</strong> The actual values passed when calling the function</li>
</ul>

<h2>Return Values</h2>
<p>Functions can return a value using the <code>return</code> keyword. After <code>return</code>, the function stops executing.</p>

<h2>Default Parameters</h2>
<p>Give parameters a default value in case no argument is passed.</p>`,
    example_code: `// Function declaration\nfunction greet(name) {\n  return "Hello, " + name + "!";\n}\nconsole.log(greet("Alice")); // "Hello, Alice!"\n\n// Function expression\nconst add = function(a, b) {\n  return a + b;\n};\nconsole.log(add(3, 5)); // 8\n\n// Arrow function (short and modern)\nconst multiply = (a, b) => a * b;\nconsole.log(multiply(4, 6)); // 24\n\n// Arrow function with multiple lines\nconst calculateTotal = (price, tax) => {\n  const taxAmount = price * tax;\n  const total = price + taxAmount;\n  return total;\n};\nconsole.log(calculateTotal(100, 0.1)); // 110\n\n// Default parameters\nfunction createUser(name, role = "student") {\n  return { name, role };\n}\nconsole.log(createUser("Bob"));         // { name: "Bob", role: "student" }\nconsole.log(createUser("Alice", "admin")); // { name: "Alice", role: "admin" }\n\n// Multiple return points\nfunction getGrade(score) {\n  if (score >= 90) return "A";\n  if (score >= 80) return "B";\n  if (score >= 70) return "C";\n  return "F";\n}`
  },
  {
    title: 'Callbacks',
    content: `<h2>What is a Callback?</h2>
<p>A callback is a <strong>function passed as an argument to another function</strong>, to be called later. It's one of the most fundamental patterns in JavaScript, especially for handling asynchronous tasks.</p>
<p>Think of it like ordering food: you give the restaurant your phone number (callback) and they call you when the food is ready — they don't make you stand there waiting.</p>

<h2>Why Callbacks?</h2>
<p>JavaScript is single-threaded — it can only do one thing at a time. Callbacks let it say "do this task, and when you're done, run <em>this function</em>."</p>

<h2>Synchronous Callbacks</h2>
<p>Callbacks called immediately — like in array methods (<code>.forEach</code>, <code>.map</code>, <code>.filter</code>).</p>

<h2>Asynchronous Callbacks</h2>
<p>Callbacks called later — like in <code>setTimeout</code> or old-style AJAX requests.</p>

<h2>Callback Hell</h2>
<p>When you nest many callbacks inside each other, code becomes deeply indented and hard to read — this is called "callback hell." That's why Promises and async/await were introduced.</p>`,
    example_code: `// Simple callback\nfunction doTask(taskName, callback) {\n  console.log("Starting: " + taskName);\n  callback(); // call the function that was passed in\n}\n\ndoTask("Wash dishes", function() {\n  console.log("Dishes are done!");\n});\n\n// Using arrow function as callback\ndoTask("Study JavaScript", () => {\n  console.log("Studied for 1 hour!");\n});\n\n// Synchronous callback with forEach\nlet numbers = [1, 2, 3, 4, 5];\nnumbers.forEach(function(num) {\n  console.log(num * 2);\n});\n// Output: 2, 4, 6, 8, 10\n\n// Asynchronous callback with setTimeout\nconsole.log("Before timer");\nsetTimeout(function() {\n  console.log("This runs after 2 seconds!");\n}, 2000);\nconsole.log("After timer (this runs first!)");\n// Output order: "Before timer", "After timer...", "This runs after 2 seconds!"\n\n// Callback hell (to understand why Promises exist)\nloginUser("alice", function(user) {\n  getProfile(user.id, function(profile) {\n    getPosts(profile.id, function(posts) {\n      // deeply nested = hard to read!\n    });\n  });\n});`
  },
  {
    title: 'Array Methods',
    content: `<h2>Powerful Array Methods</h2>
<p>JavaScript arrays have powerful built-in methods that accept callbacks. These are some of the most-used tools in modern JavaScript.</p>

<h2>.forEach()</h2>
<p>Runs a function for each element. Returns nothing (undefined). Use when you just want to loop and do something for each item.</p>

<h2>.map()</h2>
<p>Creates a <em>new array</em> by transforming each element. The original array is not changed. Always returns a new array of the same length.</p>

<h2>.filter()</h2>
<p>Creates a <em>new array</em> with only elements that pass a test. The callback must return <code>true</code> or <code>false</code>.</p>

<h2>.find()</h2>
<p>Returns the <em>first element</em> that passes the test. Returns <code>undefined</code> if nothing matches.</p>

<h2>.reduce()</h2>
<p>Reduces the array to a <em>single value</em> by running a function against an accumulator.</p>

<h2>.some() and .every()</h2>
<ul>
  <li><code>.some()</code> — true if at least one element passes the test</li>
  <li><code>.every()</code> — true if ALL elements pass the test</li>
</ul>`,
    example_code: `let students = [\n  { name: "Alice", grade: 92 },\n  { name: "Bob",   grade: 74 },\n  { name: "Carol", grade: 88 },\n  { name: "Dave",  grade: 61 },\n];\n\n// forEach — just loop\nstudents.forEach(s => console.log(s.name));\n// Alice, Bob, Carol, Dave\n\n// map — transform each element\nlet names = students.map(s => s.name);\nconsole.log(names); // ["Alice", "Bob", "Carol", "Dave"]\n\nlet grades = students.map(s => s.grade * 1.05); // add 5%\nconsole.log(grades); // [96.6, 77.7, 92.4, 64.05]\n\n// filter — keep only matching elements\nlet passing = students.filter(s => s.grade >= 70);\nconsole.log(passing); // Alice, Bob, Carol\n\n// find — first match\nlet topStudent = students.find(s => s.grade > 90);\nconsole.log(topStudent); // { name: "Alice", grade: 92 }\n\n// reduce — calculate total\nlet total = students.reduce((sum, s) => sum + s.grade, 0);\nconsole.log(total);         // 315\nconsole.log(total / students.length); // 78.75 (average)\n\n// some and every\nconsole.log(students.some(s => s.grade > 90));  // true (Alice)\nconsole.log(students.every(s => s.grade > 50)); // true`
  },
  {
    title: 'DOM Manipulation',
    content: `<h2>What is the DOM?</h2>
<p>The <strong>DOM (Document Object Model)</strong> is the browser's internal representation of your HTML page as a tree of objects. JavaScript can read and change this tree — which is how it makes pages dynamic.</p>
<p>When you click a button and something appears on the page — that's DOM manipulation.</p>

<h2>Selecting Elements</h2>
<ul>
  <li><code>document.getElementById("id")</code> — Select by id</li>
  <li><code>document.querySelector(".class")</code> — Select first matching element (uses CSS selectors)</li>
  <li><code>document.querySelectorAll("p")</code> — Select all matching elements (returns NodeList)</li>
</ul>

<h2>Modifying Elements</h2>
<ul>
  <li><code>element.textContent = "..."</code> — Change text content</li>
  <li><code>element.innerHTML = "..."</code> — Change HTML content (careful: XSS risk with user data)</li>
  <li><code>element.style.color = "red"</code> — Change CSS style</li>
  <li><code>element.classList.add("class")</code> — Add a CSS class</li>
  <li><code>element.classList.remove("class")</code> — Remove a class</li>
  <li><code>element.classList.toggle("class")</code> — Toggle a class</li>
  <li><code>element.setAttribute("attr", "value")</code> — Set an attribute</li>
</ul>

<h2>Creating and Removing Elements</h2>
<ul>
  <li><code>document.createElement("div")</code> — Create a new element</li>
  <li><code>parent.appendChild(child)</code> — Add as last child</li>
  <li><code>parent.removeChild(child)</code> — Remove a child</li>
  <li><code>element.remove()</code> — Remove the element itself</li>
</ul>`,
    example_code: `// Selecting elements\nconst title = document.getElementById("main-title");\nconst button = document.querySelector(".btn-primary");\nconst allCards = document.querySelectorAll(".card");\n\n// Changing text and HTML\ntitle.textContent = "Welcome to StackGen!";\nconst container = document.querySelector("#content");\ncontainer.innerHTML = '<p>Hello <strong>World</strong></p>';\n\n// Changing styles\ntitle.style.color = "#3b82f6";\ntitle.style.fontSize = "2rem";\n\n// CSS classes (cleaner than inline styles)\nbutton.classList.add("active");\nbutton.classList.remove("disabled");\nbutton.classList.toggle("highlighted"); // adds if missing, removes if present\n\n// Creating new elements\nconst newItem = document.createElement("li");\nnewItem.textContent = "New lesson item";\nnewItem.classList.add("lesson-item");\n\nconst list = document.getElementById("lesson-list");\nlist.appendChild(newItem); // adds to end of list\n\n// Removing elements\nconst oldCard = document.querySelector(".old-card");\nif (oldCard) oldCard.remove();\n\n// Loop through NodeList\nallCards.forEach(card => {\n  card.style.border = "1px solid #3b82f6";\n});`
  },
  {
    title: 'Events',
    content: `<h2>What are Events?</h2>
<p>Events are things that happen in the browser — a user clicks a button, moves the mouse, types in an input, or a page finishes loading. JavaScript can <strong>listen for events</strong> and run code when they occur.</p>

<h2>addEventListener</h2>
<p>The modern and preferred way to handle events. You can add multiple listeners to the same element:</p>
<code>element.addEventListener("event", callbackFunction);</code>

<h2>Common Events</h2>
<ul>
  <li><strong>Mouse:</strong> <code>click</code>, <code>dblclick</code>, <code>mouseover</code>, <code>mouseout</code>, <code>mousemove</code></li>
  <li><strong>Keyboard:</strong> <code>keydown</code>, <code>keyup</code>, <code>keypress</code></li>
  <li><strong>Form:</strong> <code>submit</code>, <code>change</code>, <code>input</code>, <code>focus</code>, <code>blur</code></li>
  <li><strong>Document:</strong> <code>DOMContentLoaded</code>, <code>load</code></li>
</ul>

<h2>The Event Object</h2>
<p>The callback receives an <code>event</code> object with useful info:</p>
<ul>
  <li><code>event.target</code> — The element that triggered the event</li>
  <li><code>event.preventDefault()</code> — Stop default browser behavior (e.g., stop form submission)</li>
  <li><code>event.key</code> — Which key was pressed</li>
  <li><code>event.clientX / clientY</code> — Mouse coordinates</li>
</ul>`,
    example_code: `// Click event\nconst button = document.getElementById("myBtn");\nbutton.addEventListener("click", function(event) {\n  console.log("Button clicked!");\n  console.log("Clicked element:", event.target);\n});\n\n// Using arrow function\nbutton.addEventListener("click", (e) => {\n  button.textContent = "Clicked!";\n  button.classList.add("active");\n});\n\n// Keyboard event\ndocument.addEventListener("keydown", (e) => {\n  console.log("Key pressed:", e.key);\n  if (e.key === "Escape") {\n    closeModal();\n  }\n});\n\n// Form submission — prevent page reload\nconst form = document.getElementById("loginForm");\nform.addEventListener("submit", (e) => {\n  e.preventDefault(); // stop browser from refreshing the page\n  const email = document.getElementById("email").value;\n  console.log("Form submitted with:", email);\n});\n\n// Input event (fires on every keystroke)\nconst searchInput = document.getElementById("search");\nsearchInput.addEventListener("input", (e) => {\n  const value = e.target.value;\n  filterResults(value); // live search as user types\n});\n\n// DOMContentLoaded — run code when HTML is fully loaded\ndocument.addEventListener("DOMContentLoaded", () => {\n  console.log("Page is ready!");\n  initializeApp();\n});`
  },
  {
    title: 'Template Literals',
    content: `<h2>What are Template Literals?</h2>
<p>Template literals (also called template strings) are a modern way to work with strings in JavaScript. They use <strong>backticks</strong> instead of quotes and allow you to embed expressions directly inside the string.</p>

<h2>Key Features</h2>
<ul>
  <li><strong>Expression interpolation:</strong> Embed any JavaScript expression with <code>\${expression}</code></li>
  <li><strong>Multi-line strings:</strong> Write strings that span multiple lines without special characters</li>
  <li><strong>No more concatenation mess:</strong> Much cleaner than <code>"Hello " + name + "!"</code></li>
</ul>

<h2>Tagged Templates (Advanced)</h2>
<p>You can prefix a template literal with a function name to process it. This is used in libraries like styled-components.</p>`,
    example_code: '// Old way (string concatenation)\nlet name = "Alice";\nlet age = 25;\nlet oldGreeting = "Hello, my name is " + name + " and I am " + age + " years old.";\n\n// Modern way (template literal)\nlet greeting = `Hello, my name is ${name} and I am ${age} years old.`;\nconsole.log(greeting);\n// "Hello, my name is Alice and I am 25 years old."\n\n// Expressions inside ${}\nlet a = 10, b = 5;\nconsole.log(`Sum: ${a + b}`);           // "Sum: 15"\nconsole.log(`Is adult: ${age >= 18}`);  // "Is adult: true"\nconsole.log(`Uppercase: ${name.toUpperCase()}`); // "Uppercase: ALICE"\n\n// Multi-line strings\nconst html = `\n  <div class="card">\n    <h2>${name}</h2>\n    <p>Age: ${age}</p>\n  </div>\n`;\n\n// Building dynamic HTML for the DOM\nfunction createCard(lesson) {\n  return `\n    <div class="lesson-card">\n      <h3>${lesson.title}</h3>\n      <p>${lesson.description}</p>\n      <span class="badge ${lesson.status}">${lesson.status}</span>\n    </div>\n  `;\n}\n\n// Nested template literals\nlet items = ["HTML", "CSS", "JavaScript"];\nlet list = `<ul>${items.map(item => `<li>${item}</li>`).join("")}</ul>`;'
  },
  {
    title: 'ES6+',
    content: `<h2>What is ES6?</h2>
<p>ES6 (ECMAScript 2015) was a major update to JavaScript that introduced many powerful features. Together with subsequent versions (ES7, ES8, etc.), these are collectively referred to as "modern JavaScript".</p>

<h2>Destructuring</h2>
<p>Extract values from arrays or objects into variables in one clean line.</p>

<h2>Spread Operator (...)</h2>
<p>Spread an array or object into individual elements. Great for copying and merging.</p>

<h2>Rest Parameter (...)</h2>
<p>Collects remaining arguments into an array.</p>

<h2>Default Parameters</h2>
<p>Give function parameters default values.</p>

<h2>Shorthand Properties</h2>
<p>When key and variable name are the same, you don't need to repeat yourself.</p>

<h2>Modules (import/export)</h2>
<p>Split code across multiple files and import what you need.</p>`,
    example_code: `// Destructuring — arrays\nconst [first, second, ...rest] = [1, 2, 3, 4, 5];\nconsole.log(first);  // 1\nconsole.log(second); // 2\nconsole.log(rest);   // [3, 4, 5]\n\n// Destructuring — objects\nconst user = { name: "Alice", age: 25, city: "Lagos" };\nconst { name, age, city } = user;\nconsole.log(name); // "Alice"\n\n// Rename while destructuring\nconst { name: userName } = user;\n\n// Spread operator — copy an array\nconst nums = [1, 2, 3];\nconst numsCopy = [...nums];\nconst moreNums = [...nums, 4, 5];\n\n// Spread — merge objects\nconst defaults = { color: "blue", size: "medium" };\nconst custom = { size: "large", weight: "bold" };\nconst merged = { ...defaults, ...custom };\n// { color: "blue", size: "large", weight: "bold" }\n\n// Rest parameters\nfunction sum(...numbers) {\n  return numbers.reduce((total, n) => total + n, 0);\n}\nconsole.log(sum(1, 2, 3, 4, 5)); // 15\n\n// Shorthand object properties\nconst firstName = "Bob";\nconst score = 95;\nconst student = { firstName, score }; // same as { firstName: firstName, score: score }\n\n// Computed property names\nconst field = "email";\nconst obj = { [field]: "bob@example.com" };\nconsole.log(obj.email); // "bob@example.com"`
  },
  {
    title: 'Fetch API',
    content: `<h2>What is the Fetch API?</h2>
<p>The Fetch API is a modern built-in browser function for making <strong>HTTP requests</strong> to servers. It's how your frontend JavaScript talks to your backend API.</p>
<p>It replaces the older, clunkier <code>XMLHttpRequest</code> approach.</p>

<h2>Basic Fetch</h2>
<p><code>fetch(url)</code> returns a <strong>Promise</strong>. You then chain <code>.then()</code> to handle the response.</p>

<h2>The Two-Step Process</h2>
<ol>
  <li>First <code>.then()</code> gets the raw Response object — call <code>.json()</code> on it to parse the body</li>
  <li>Second <code>.then()</code> gets the actual parsed data</li>
</ol>

<h2>Making POST Requests</h2>
<p>For POST, PUT, DELETE — pass an options object as the second argument.</p>

<h2>Handling Errors</h2>
<p>Fetch only rejects on network errors. A 404 or 500 response is still considered "successful" by fetch! Check <code>response.ok</code> manually.</p>`,
    example_code: `// Basic GET request\nfetch("https://api.example.com/users")\n  .then(response => {\n    if (!response.ok) {\n      throw new Error("HTTP error! status: " + response.status);\n    }\n    return response.json(); // parse JSON body\n  })\n  .then(data => {\n    console.log("Users:", data);\n  })\n  .catch(error => {\n    console.error("Fetch failed:", error);\n  });\n\n// POST request (sending data)\nfetch("https://api.example.com/users", {\n  method: "POST",\n  headers: {\n    "Content-Type": "application/json",\n    "Authorization": "Bearer " + localStorage.getItem("token")\n  },\n  body: JSON.stringify({\n    name: "Alice",\n    email: "alice@example.com"\n  })\n})\n  .then(res => res.json())\n  .then(data => console.log("Created user:", data))\n  .catch(err => console.error(err));\n\n// DELETE request\nfetch("/api/lessons/5", {\n  method: "DELETE",\n  headers: { "Authorization": "Bearer " + token }\n})\n  .then(res => res.json())\n  .then(data => console.log(data.msg));`
  },
  {
    title: 'Async JavaScript',
    content: `<h2>Why Async JavaScript?</h2>
<p>JavaScript is <strong>single-threaded</strong> — it can only do one thing at a time. Without async patterns, fetching data from a server would freeze the entire browser until the data arrived.</p>
<p>Async programming lets JavaScript <em>start</em> a task, move on to other things, and come back to handle the result when it's ready.</p>

<h2>The Event Loop</h2>
<p>JavaScript uses an <strong>event loop</strong> to handle asynchronous tasks. When you call <code>setTimeout</code> or <code>fetch</code>, the task is handed off to the browser's Web APIs. When it completes, the callback is placed in a queue, and the event loop picks it up when the main thread is free.</p>

<h2>Async / Await</h2>
<p><code>async/await</code> is the modern way to write asynchronous code that <em>looks</em> synchronous and is much easier to read than chains of <code>.then()</code>.</p>
<ul>
  <li><code>async function</code> — Marks a function as asynchronous. It always returns a Promise</li>
  <li><code>await</code> — Pauses the async function until the Promise resolves. Can only be used inside an <code>async</code> function</li>
</ul>`,
    example_code: `// Without async: confusing order\nconsole.log("1. Start");\nsetTimeout(() => console.log("2. Timeout done"), 0);\nconsole.log("3. End");\n// Output: 1. Start → 3. End → 2. Timeout done\n// Even with 0ms delay, setTimeout always goes to the queue!\n\n// async/await — reads like synchronous code\nasync function getUser(userId) {\n  console.log("Fetching user...");\n  \n  const response = await fetch(\`/api/users/\${userId}\`);\n  const user = await response.json();\n  \n  console.log("Got user:", user.name);\n  return user;\n}\n\n// Call an async function\ngetUser(1).then(user => {\n  // do something with user\n});\n\n// Or use await inside another async function\nasync function main() {\n  const user = await getUser(1);\n  console.log("User:", user);\n  \n  const posts = await fetchPosts(user.id);\n  console.log("Posts:", posts);\n}\n\nmain();\n\n// Running multiple async tasks in parallel\nasync function loadDashboard() {\n  // Run both requests at the same time!\n  const [user, stats] = await Promise.all([\n    fetch("/api/auth/me").then(r => r.json()),\n    fetch("/api/progress/stats").then(r => r.json())\n  ]);\n  return { user, stats };\n}`
  },
  {
    title: 'Promises',
    content: `<h2>What is a Promise?</h2>
<p>A Promise is an object that represents the <strong>eventual result of an asynchronous operation</strong>. It's a placeholder for a value that might not exist yet.</p>
<p>A Promise is in one of three states:</p>
<ul>
  <li><strong>Pending:</strong> The operation is still in progress</li>
  <li><strong>Fulfilled:</strong> The operation succeeded — the Promise resolved with a value</li>
  <li><strong>Rejected:</strong> The operation failed — the Promise rejected with an error</li>
</ul>

<h2>Promise Chaining</h2>
<p>Each <code>.then()</code> returns a new Promise, so you can chain them. This avoids deeply nested callbacks.</p>

<h2>Promise.all()</h2>
<p>Runs multiple Promises in parallel and waits for all to complete. If any one rejects, the whole thing rejects.</p>

<h2>Promise.allSettled()</h2>
<p>Like <code>Promise.all()</code> but waits for all to finish regardless of success or failure.</p>

<h2>Creating Your Own Promise</h2>
<p>Wrap callback-based APIs in a Promise for cleaner code.</p>`,
    example_code: `// Creating a Promise\nconst myPromise = new Promise((resolve, reject) => {\n  let success = true;\n  \n  if (success) {\n    resolve("Operation succeeded!");\n  } else {\n    reject(new Error("Operation failed!"));\n  }\n});\n\nmyPromise\n  .then(result => console.log(result)) // "Operation succeeded!"\n  .catch(error => console.error(error));\n\n// Simulating an API call with a Promise\nfunction fetchData(url) {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      if (url) {\n        resolve({ data: "Some data from " + url });\n      } else {\n        reject(new Error("URL is required"));\n      }\n    }, 1000); // simulate 1 second network delay\n  });\n}\n\n// Promise chaining\nfetchData("/api/users")\n  .then(result => {\n    console.log(result.data);\n    return fetchData("/api/posts"); // return another promise\n  })\n  .then(result => console.log(result.data))\n  .catch(err => console.error("Error:", err.message));\n\n// Promise.all — parallel execution\nPromise.all([\n  fetch("/api/users").then(r => r.json()),\n  fetch("/api/posts").then(r => r.json()),\n  fetch("/api/stats").then(r => r.json())\n]).then(([users, posts, stats]) => {\n  console.log("All data loaded:", users, posts, stats);\n}).catch(err => console.error(err));`
  },
  {
    title: 'Error Handling',
    content: `<h2>Why Handle Errors?</h2>
<p>Errors are inevitable in programming — network requests fail, users enter unexpected input, databases go down. Without error handling, your app crashes and shows users a confusing broken page. Good error handling makes apps <strong>resilient and user-friendly</strong>.</p>

<h2>try / catch / finally</h2>
<p>The main mechanism for catching errors in JavaScript:</p>
<ul>
  <li><code>try { }</code> — Code that might throw an error</li>
  <li><code>catch(error) { }</code> — Runs if an error is thrown. The <code>error</code> object has <code>.message</code> and <code>.name</code></li>
  <li><code>finally { }</code> — Always runs whether there was an error or not (great for cleanup)</li>
</ul>

<h2>The Error Object</h2>
<ul>
  <li><code>error.message</code> — Description of the error</li>
  <li><code>error.name</code> — Type of error (e.g., "TypeError", "ReferenceError")</li>
  <li><code>error.stack</code> — Stack trace for debugging</li>
</ul>

<h2>Throwing Custom Errors</h2>
<p>You can throw your own errors using <code>throw new Error("message")</code>.</p>

<h2>Async Error Handling</h2>
<p>Use <code>try/catch</code> with <code>async/await</code>:</p>`,
    example_code: `// Basic try/catch\ntry {\n  let result = 10 / 0;\n  let data = JSON.parse("invalid json {{{");\n} catch (error) {\n  console.error("Error name:", error.name);\n  console.error("Error message:", error.message);\n} finally {\n  console.log("This always runs!");\n}\n\n// Throwing custom errors\nfunction validateAge(age) {\n  if (typeof age !== "number") {\n    throw new TypeError("Age must be a number");\n  }\n  if (age < 0 || age > 150) {\n    throw new RangeError("Age must be between 0 and 150");\n  }\n  return true;\n}\n\ntry {\n  validateAge("twenty"); // throws TypeError\n} catch (e) {\n  console.error(e.message); // "Age must be a number"\n}\n\n// Async/await error handling\nasync function loadUserData(userId) {\n  try {\n    const response = await fetch(\`/api/users/\${userId}\`);\n    \n    if (!response.ok) {\n      throw new Error(\`HTTP \${response.status}: Failed to load user\`);\n    }\n    \n    const user = await response.json();\n    return user;\n    \n  } catch (error) {\n    console.error("Failed to load user:", error.message);\n    // Show error to user\n    showErrorMessage("Could not load user data. Please try again.");\n    return null; // return safe fallback\n  }\n}`
  },

  // ─── NODE.JS ───────────────────────────────────────────────────────────────
  {
    title: 'Node.js',
    content: `<h2>What is Node.js?</h2>
<p>Node.js is a <strong>runtime environment</strong> that allows JavaScript to run <em>outside</em> the browser — on a server, your computer, or anywhere else.</p>
<p>Before Node.js (2009), JavaScript only ran in browsers. Ryan Dahl took Chrome's V8 JavaScript engine and built Node.js so JavaScript could run on servers too. This made full-stack JavaScript development possible.</p>

<h2>Key Characteristics</h2>
<ul>
  <li><strong>Asynchronous and Non-blocking:</strong> Node.js handles many requests at once without waiting for each to complete</li>
  <li><strong>Single-threaded:</strong> Uses one thread with an event loop (unlike traditional servers that spawn a new thread per request)</li>
  <li><strong>Fast:</strong> Built on Chrome's V8 engine, which compiles JavaScript directly to machine code</li>
  <li><strong>JavaScript everywhere:</strong> Same language on frontend and backend</li>
</ul>

<h2>What Node.js is Good For</h2>
<ul>
  <li>Web servers and REST APIs</li>
  <li>Real-time apps (chat, notifications)</li>
  <li>Command-line tools</li>
  <li>File system operations</li>
</ul>

<h2>Running Node.js</h2>
<p>Type <code>node filename.js</code> in your terminal to run a JavaScript file with Node.</p>`,
    example_code: `// Run this file with: node app.js\n\n// Node.js has no window or document — it's not a browser!\n// Instead it has global objects like:\nconsole.log("Hello from Node.js!");\nconsole.log(process.version); // Node.js version\nconsole.log(process.platform); // "win32", "linux", etc.\nconsole.log(__dirname);  // current directory path\nconsole.log(__filename); // current file path\n\n// Basic HTTP server (built-in, no express needed)\nconst http = require("http");\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { "Content-Type": "text/plain" });\n  res.end("Hello from my Node.js server!");\n});\n\nserver.listen(3000, () => {\n  console.log("Server running at http://localhost:3000");\n});\n\n// Node.js also handles errors differently\nprocess.on("uncaughtException", (err) => {\n  console.error("Uncaught exception:", err.message);\n  process.exit(1);\n});`
  },
  {
    title: 'npm',
    content: `<h2>What is npm?</h2>
<p>npm stands for <strong>Node Package Manager</strong>. It is the world's largest software registry and comes bundled with Node.js. It lets you install, share, and manage <strong>packages</strong> (reusable code libraries) in your projects.</p>

<h2>Key Concepts</h2>
<ul>
  <li><strong>Package:</strong> A folder with JavaScript files and a <code>package.json</code> file</li>
  <li><strong>package.json:</strong> A file that tracks your project's dependencies and scripts</li>
  <li><strong>node_modules/:</strong> The folder where installed packages live (never commit this to Git!)</li>
  <li><strong>package-lock.json:</strong> Records exact versions of every dependency (commit this!)</li>
</ul>

<h2>Essential npm Commands</h2>
<ul>
  <li><code>npm init -y</code> — Create a new <code>package.json</code></li>
  <li><code>npm install express</code> — Install a package</li>
  <li><code>npm install</code> — Install all dependencies listed in <code>package.json</code></li>
  <li><code>npm install -D nodemon</code> — Install as dev-only dependency</li>
  <li><code>npm uninstall express</code> — Remove a package</li>
  <li><code>npm run start</code> — Run the "start" script in package.json</li>
  <li><code>npm update</code> — Update all packages to latest versions</li>
</ul>`,
    example_code: `// package.json structure\n{\n  "name": "stackgen",\n  "version": "1.0.0",\n  "description": "Learning progress tracker",\n  "main": "backend/server.js",\n  "scripts": {\n    "start": "node backend/server.js",\n    "dev": "nodemon backend/server.js"\n  },\n  "dependencies": {\n    "express": "^5.0.0",\n    "pg": "^8.0.0",\n    "bcrypt": "^6.0.0",\n    "jsonwebtoken": "^9.0.0",\n    "cors": "^2.8.0",\n    "dotenv": "^16.0.0"\n  },\n  "devDependencies": {\n    "nodemon": "^3.0.0"\n  }\n}\n\n// Common terminal commands\n// npm init -y                    → create package.json\n// npm install express            → install express\n// npm install -D nodemon         → install as dev dependency\n// npm install                    → install all from package.json\n// npm run dev                    → run the "dev" script\n\n// .gitignore — always add these:\n// node_modules/\n// .env`
  },
  {
    title: 'Modules',
    content: `<h2>What are Modules?</h2>
<p>Modules let you split your code across multiple files. Instead of one giant file, you organize code into focused, reusable modules. Each file is its own module.</p>

<h2>CommonJS (Node.js default)</h2>
<p>Node.js uses CommonJS modules by default:</p>
<ul>
  <li><code>module.exports = ...</code> — Export from a file</li>
  <li><code>require("./filename")</code> — Import from another file</li>
</ul>

<h2>ES Modules (Modern)</h2>
<p>The modern standard used in browsers and optionally in Node.js:</p>
<ul>
  <li><code>export default function...</code> or <code>export const name = ...</code></li>
  <li><code>import myFunction from "./filename.js"</code></li>
</ul>

<h2>Built-in Node.js Modules</h2>
<p>Node.js comes with many built-in modules — no installation needed:</p>
<ul>
  <li><code>fs</code> — File system operations</li>
  <li><code>path</code> — File path utilities</li>
  <li><code>http</code> — HTTP server</li>
  <li><code>os</code> — Operating system info</li>
  <li><code>crypto</code> — Cryptographic functions</li>
</ul>`,
    example_code: `// ─── CommonJS (used in this project) ───\n\n// math.js — exporting\nfunction add(a, b) { return a + b; }\nfunction subtract(a, b) { return a - b; }\n\nmodule.exports = { add, subtract }; // export multiple\n// OR: module.exports = add;        // export single\n\n// app.js — importing\nconst { add, subtract } = require("./math");\nconsole.log(add(5, 3));      // 8\nconsole.log(subtract(10, 4)); // 6\n\n// Built-in modules\nconst path = require("path");\nconst os = require("os");\n\nconsole.log(path.join(__dirname, "uploads")); // safe path joining\nconsole.log(os.homedir()); // home directory\nconsole.log(os.platform()); // "win32" or "linux"\n\n// ─── ES Modules (modern) ───\n// In package.json: "type": "module"\n\n// math.mjs — exporting\nexport function add(a, b) { return a + b; }\nexport default function multiply(a, b) { return a * b; }\n\n// app.mjs — importing\nimport multiply, { add } from "./math.mjs";\nconsole.log(add(2, 3));       // 5\nconsole.log(multiply(4, 5));  // 20`
  },
  {
    title: 'File System',
    content: `<h2>The fs Module</h2>
<p>The <code>fs</code> (File System) module is built into Node.js and lets you <strong>read, write, create, and delete files</strong> on the computer.</p>
<p>This is something browsers cannot do for security reasons — only Node.js server code can touch the file system.</p>

<h2>Sync vs Async Methods</h2>
<p>Most fs methods have both a synchronous and asynchronous version:</p>
<ul>
  <li><code>fs.readFileSync()</code> — Blocks until done (simple but slow)</li>
  <li><code>fs.readFile()</code> — Async with callback (non-blocking)</li>
  <li><code>fs.promises.readFile()</code> — Returns a Promise (use with async/await)</li>
</ul>
<p>In server code, always prefer the async versions so you don't block other requests.</p>

<h2>Common Operations</h2>
<ul>
  <li>Read a file</li>
  <li>Write to a file (creates if doesn't exist)</li>
  <li>Append to a file</li>
  <li>Delete a file</li>
  <li>Check if file exists</li>
  <li>Create a directory</li>
  <li>List directory contents</li>
</ul>`,
    example_code: `const fs = require("fs");\nconst path = require("path");\n\n// ── Reading files ──\n// Synchronous (blocking)\nconst data = fs.readFileSync("notes.txt", "utf8");\nconsole.log(data);\n\n// Asynchronous with async/await (preferred)\nasync function readNotes() {\n  try {\n    const content = await fs.promises.readFile("notes.txt", "utf8");\n    console.log(content);\n  } catch (err) {\n    console.error("File not found:", err.message);\n  }\n}\n\n// ── Writing files ──\nasync function saveData() {\n  const content = JSON.stringify({ name: "Alice", score: 100 }, null, 2);\n  await fs.promises.writeFile("data.json", content, "utf8");\n  console.log("File saved!");\n}\n\n// ── Appending to a file ──\nasync function logActivity(message) {\n  const timestamp = new Date().toISOString();\n  await fs.promises.appendFile("activity.log", \`\${timestamp}: \${message}\\n\`);\n}\n\n// ── Check if file exists ──\nfunction fileExists(filePath) {\n  try {\n    fs.accessSync(filePath);\n    return true;\n  } catch {\n    return false;\n  }\n}\n\n// ── Create directory ──\nawait fs.promises.mkdir(path.join(__dirname, "uploads"), { recursive: true });`
  },
  {
    title: 'HTTP',
    content: `<h2>The http Module</h2>
<p>Node.js's built-in <code>http</code> module lets you create web servers from scratch — no external libraries needed. It's what powers everything underneath frameworks like Express.</p>

<h2>How a Web Server Works</h2>
<ol>
  <li>A client (browser) sends an <strong>HTTP Request</strong> to the server (e.g., GET /users)</li>
  <li>The server receives it, processes it, and sends back an <strong>HTTP Response</strong></li>
  <li>The response includes a status code, headers, and a body</li>
</ol>

<h2>HTTP Methods</h2>
<ul>
  <li><strong>GET</strong> — Read data</li>
  <li><strong>POST</strong> — Create new data</li>
  <li><strong>PUT/PATCH</strong> — Update data</li>
  <li><strong>DELETE</strong> — Delete data</li>
</ul>

<h2>HTTP Status Codes</h2>
<ul>
  <li><strong>200 OK</strong> — Success</li>
  <li><strong>201 Created</strong> — Resource was created</li>
  <li><strong>400 Bad Request</strong> — Client sent invalid data</li>
  <li><strong>401 Unauthorized</strong> — Not logged in</li>
  <li><strong>403 Forbidden</strong> — Logged in but no permission</li>
  <li><strong>404 Not Found</strong> — Resource doesn't exist</li>
  <li><strong>500 Internal Server Error</strong> — Server crashed</li>
</ul>`,
    example_code: `const http = require("http");\nconst url = require("url");\n\n// Create a basic server\nconst server = http.createServer((req, res) => {\n  const parsedUrl = url.parse(req.url, true);\n  const pathname = parsedUrl.pathname;\n  const method = req.method;\n  \n  console.log(\`\${method} \${pathname}\`);\n  \n  // Route handling (manual — express does this automatically)\n  if (pathname === "/" && method === "GET") {\n    res.writeHead(200, { "Content-Type": "application/json" });\n    res.end(JSON.stringify({ message: "Welcome to the API!" }));\n    \n  } else if (pathname === "/users" && method === "GET") {\n    const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];\n    res.writeHead(200, { "Content-Type": "application/json" });\n    res.end(JSON.stringify(users));\n    \n  } else {\n    res.writeHead(404, { "Content-Type": "application/json" });\n    res.end(JSON.stringify({ error: "Not Found" }));\n  }\n});\n\nconst PORT = 3000;\nserver.listen(PORT, () => {\n  console.log(\`Server running on http://localhost:\${PORT}\`);\n});\n\n// This is basically what Express does internally,\n// but it makes all of this much simpler!`
  },

  // ─── EXPRESS ───────────────────────────────────────────────────────────────
  {
    title: 'Express.js',
    content: `<h2>What is Express.js?</h2>
<p>Express.js is the most popular Node.js web framework. It wraps Node's built-in <code>http</code> module and adds clean routing, middleware, and a simple API for building web servers and REST APIs.</p>
<p>The same things that would take 50 lines in raw Node.js take 10 in Express.</p>

<h2>Core Concepts</h2>
<ul>
  <li><strong>Router:</strong> Maps HTTP methods and URLs to handler functions</li>
  <li><strong>Route Handler:</strong> A function that receives <code>req</code> (request) and <code>res</code> (response)</li>
  <li><strong>Middleware:</strong> Functions that run before the route handler (more on this next)</li>
</ul>

<h2>Request Object (req)</h2>
<ul>
  <li><code>req.params</code> — URL parameters like <code>/users/:id</code></li>
  <li><code>req.query</code> — Query string like <code>?search=alice</code></li>
  <li><code>req.body</code> — Request body (from POST/PUT)</li>
  <li><code>req.headers</code> — HTTP headers</li>
</ul>

<h2>Response Object (res)</h2>
<ul>
  <li><code>res.json(data)</code> — Send JSON response</li>
  <li><code>res.status(404).json({msg: "Not Found"})</code> — Set status code</li>
  <li><code>res.sendFile(path)</code> — Send a file</li>
  <li><code>res.redirect("/login")</code> — Redirect to another URL</li>
</ul>`,
    example_code: `const express = require("express");\nconst app = express();\n\n// Parse JSON request bodies\napp.use(express.json());\n\n// ── Routes ──\n\n// GET all users\napp.get("/api/users", (req, res) => {\n  const users = [\n    { id: 1, name: "Alice" },\n    { id: 2, name: "Bob" }\n  ];\n  res.json(users);\n});\n\n// GET a single user by id\napp.get("/api/users/:id", (req, res) => {\n  const userId = parseInt(req.params.id);\n  const user = { id: userId, name: "Alice" }; // fetch from DB normally\n  \n  if (!user) return res.status(404).json({ msg: "User not found" });\n  res.json(user);\n});\n\n// GET with query params: /api/users?role=admin&limit=10\napp.get("/api/search", (req, res) => {\n  const { role, limit } = req.query;\n  res.json({ role, limit });\n});\n\n// POST — create new user\napp.post("/api/users", (req, res) => {\n  const { name, email } = req.body;\n  // Save to database...\n  res.status(201).json({ msg: "User created", name, email });\n});\n\n// DELETE\napp.delete("/api/users/:id", (req, res) => {\n  const { id } = req.params;\n  // Delete from database...\n  res.json({ msg: \`User \${id} deleted\` });\n});\n\napp.listen(5000, () => console.log("Server on port 5000"));`
  },
  {
    title: 'Middleware',
    content: `<h2>What is Middleware?</h2>
<p>Middleware functions are functions that run <strong>between the incoming request and the final route handler</strong>. Think of it as an assembly line — each middleware function processes the request and passes it to the next station.</p>
<p>Each middleware receives <code>(req, res, next)</code> and must either send a response or call <code>next()</code> to pass control to the next middleware.</p>

<h2>Types of Middleware</h2>
<ul>
  <li><strong>Built-in:</strong> <code>express.json()</code>, <code>express.static()</code></li>
  <li><strong>Third-party:</strong> <code>cors</code>, <code>morgan</code>, <code>multer</code></li>
  <li><strong>Custom:</strong> Your own middleware functions</li>
  <li><strong>Error-handling:</strong> Has 4 parameters: <code>(err, req, res, next)</code></li>
</ul>

<h2>Order Matters!</h2>
<p>Express runs middleware in the order you define it. If you define your auth middleware after a route, it won't protect that route.</p>

<h2>Common Middleware Use Cases</h2>
<ul>
  <li>Authentication (verify JWT tokens)</li>
  <li>Logging (log every request)</li>
  <li>CORS (allow cross-origin requests)</li>
  <li>Request validation</li>
  <li>Error handling</li>
</ul>`,
    example_code: `const express = require("express");\nconst app = express();\n\n// ── Built-in middleware ──\napp.use(express.json());          // parse JSON bodies\napp.use(express.urlencoded({ extended: true })); // parse form data\napp.use(express.static("public")); // serve static files\n\n// ── Custom logging middleware ──\napp.use((req, res, next) => {\n  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.path}\`);\n  next(); // MUST call next() or the request hangs!\n});\n\n// ── Authentication middleware ──\nconst jwt = require("jsonwebtoken");\n\nfunction authMiddleware(req, res, next) {\n  const token = req.header("Authorization")?.replace("Bearer ", "");\n  \n  if (!token) {\n    return res.status(401).json({ msg: "No token — access denied" });\n  }\n  \n  try {\n    const decoded = jwt.verify(token, process.env.JWT_SECRET);\n    req.user = decoded.user; // attach user to request\n    next();\n  } catch (err) {\n    res.status(401).json({ msg: "Token is invalid" });\n  }\n}\n\n// Apply to specific routes\napp.get("/api/dashboard", authMiddleware, (req, res) => {\n  res.json({ user: req.user }); // req.user was set by middleware\n});\n\n// ── Error handling middleware (4 params!) ──\napp.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).json({ msg: err.message });\n});`
  },

  // ─── REST APIS ─────────────────────────────────────────────────────────────
  {
    title: 'REST APIs',
    content: `<h2>What is a REST API?</h2>
<p>REST (Representational State Transfer) is an architectural style for designing APIs. A REST API is a set of rules for how clients and servers communicate over HTTP.</p>
<p>The frontend (your HTML/JS) is the client. The backend (your Express server) is the server. They communicate through REST API endpoints.</p>

<h2>REST Principles</h2>
<ul>
  <li><strong>Resources:</strong> Everything is a resource (users, posts, lessons). Resources are identified by URLs</li>
  <li><strong>HTTP Methods:</strong> Use the right HTTP method for the right action (GET to read, POST to create, etc.)</li>
  <li><strong>Stateless:</strong> Each request is independent — the server doesn't remember previous requests</li>
  <li><strong>JSON:</strong> Data is typically sent and received as JSON</li>
</ul>

<h2>RESTful URL Design</h2>
<ul>
  <li>Use nouns, not verbs: <code>/api/users</code> (not <code>/api/getUsers</code>)</li>
  <li>Plural for collections: <code>/api/lessons</code></li>
  <li>Singular for a specific resource: <code>/api/lessons/5</code></li>
  <li>Nested for relationships: <code>/api/users/1/posts</code></li>
</ul>

<h2>CRUD to HTTP Method Mapping</h2>
<ul>
  <li><strong>Create</strong> → POST</li>
  <li><strong>Read</strong> → GET</li>
  <li><strong>Update</strong> → PUT (full) or PATCH (partial)</li>
  <li><strong>Delete</strong> → DELETE</li>
</ul>`,
    example_code: `// REST API endpoint design for a "lessons" resource:\n\n// GET    /api/lessons        → Get all lessons\n// GET    /api/lessons/:id    → Get one lesson\n// POST   /api/lessons        → Create a lesson\n// PUT    /api/lessons/:id    → Update a lesson (full replace)\n// PATCH  /api/lessons/:id    → Update a lesson (partial)\n// DELETE /api/lessons/:id    → Delete a lesson\n\n// Calling these from the frontend (JavaScript)\n\n// GET all lessons\nconst response = await fetch("/api/lessons", {\n  headers: { Authorization: "Bearer " + token }\n});\nconst lessons = await response.json();\n\n// POST create a new lesson\nconst newLesson = await fetch("/api/lessons", {\n  method: "POST",\n  headers: {\n    "Content-Type": "application/json",\n    Authorization: "Bearer " + token\n  },\n  body: JSON.stringify({\n    title: "New Lesson",\n    category_id: 4\n  })\n}).then(r => r.json());\n\n// DELETE a lesson\nawait fetch("/api/lessons/5", {\n  method: "DELETE",\n  headers: { Authorization: "Bearer " + token }\n});`
  },
  {
    title: 'CRUD APIs',
    content: `<h2>Building a Complete CRUD API</h2>
<p>CRUD stands for <strong>Create, Read, Update, Delete</strong> — the four fundamental database operations. A CRUD API exposes these operations through REST endpoints.</p>
<p>This is the backbone of almost every web application. StackGen itself is a CRUD app — you create, read, update, and delete your lessons, projects, and notes.</p>

<h2>Full CRUD Example: Notes API</h2>
<p>We'll build the complete API for managing notes — from the Express route definition to the controller logic to the database query.</p>

<h2>Testing Your API</h2>
<p>Use tools like:</p>
<ul>
  <li><strong>Thunder Client</strong> (VS Code extension) — lightweight API tester</li>
  <li><strong>Postman</strong> — full-featured API testing tool</li>
  <li><strong>curl</strong> — command-line tool</li>
</ul>`,
    example_code: `// routes/notes.routes.js\nconst router = require("express").Router();\nconst auth = require("../middleware/auth");\nconst ctrl = require("../controllers/notes.controller");\n\nrouter.get("/",    auth, ctrl.getNotes);     // Read all\nrouter.get("/:id", auth, ctrl.getNoteById);  // Read one\nrouter.post("/",   auth, ctrl.createNote);   // Create\nrouter.put("/:id", auth, ctrl.updateNote);   // Update\nrouter.delete("/:id", auth, ctrl.deleteNote); // Delete\n\nmodule.exports = router;\n\n// controllers/notes.controller.js\nconst db = require("../db");\n\n// READ all\nexports.getNotes = async (req, res) => {\n  const result = await db.query(\n    "SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC",\n    [req.user.id]\n  );\n  res.json(result.rows);\n};\n\n// CREATE\nexports.createNote = async (req, res) => {\n  const { title, content } = req.body;\n  const result = await db.query(\n    "INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING *",\n    [req.user.id, title, content]\n  );\n  res.status(201).json(result.rows[0]);\n};\n\n// UPDATE\nexports.updateNote = async (req, res) => {\n  const { id } = req.params;\n  const { title, content } = req.body;\n  const result = await db.query(\n    "UPDATE notes SET title=$1, content=$2, updated_at=NOW() WHERE id=$3 AND user_id=$4 RETURNING *",\n    [title, content, id, req.user.id]\n  );\n  res.json(result.rows[0]);\n};\n\n// DELETE\nexports.deleteNote = async (req, res) => {\n  await db.query(\n    "DELETE FROM notes WHERE id=$1 AND user_id=$2",\n    [req.params.id, req.user.id]\n  );\n  res.json({ msg: "Note deleted" });\n};`
  },

  // ─── POSTGRESQL ────────────────────────────────────────────────────────────
  {
    title: 'SQL Basics',
    content: `<h2>What is SQL?</h2>
<p>SQL (Structured Query Language) is the language used to communicate with relational databases. Whether you're using PostgreSQL, MySQL, or SQLite — they all use SQL (with minor differences).</p>
<p>SQL lets you Create, Read, Update, and Delete data (CRUD) using simple English-like commands.</p>

<h2>The Four Core SQL Commands</h2>
<ul>
  <li><code>SELECT</code> — Read data from a table</li>
  <li><code>INSERT INTO</code> — Add new data</li>
  <li><code>UPDATE</code> — Modify existing data</li>
  <li><code>DELETE</code> — Remove data</li>
</ul>

<h2>Filtering with WHERE</h2>
<p>The <code>WHERE</code> clause filters rows. You can use <code>AND</code>, <code>OR</code>, <code>NOT</code>, <code>LIKE</code>, <code>IN</code>, <code>BETWEEN</code>, <code>IS NULL</code>.</p>

<h2>Sorting and Limiting</h2>
<ul>
  <li><code>ORDER BY column ASC/DESC</code> — Sort results</li>
  <li><code>LIMIT 10</code> — Return only 10 rows</li>
  <li><code>OFFSET 20</code> — Skip first 20 rows (for pagination)</li>
</ul>`,
    example_code: `-- SELECT all users\nSELECT * FROM users;\n\n-- SELECT specific columns\nSELECT id, name, email FROM users;\n\n-- WHERE clause — filtering\nSELECT * FROM users WHERE email = 'alice@example.com';\nSELECT * FROM lessons WHERE category_id = 4;\nSELECT * FROM notes WHERE user_id = 1 AND title LIKE '%JavaScript%';\n\n-- ORDER BY and LIMIT\nSELECT * FROM users ORDER BY created_at DESC LIMIT 10;\n\n-- INSERT\nINSERT INTO users (name, email, password_hash)\nVALUES ('Alice', 'alice@example.com', 'hashed_password');\n\n-- UPDATE\nUPDATE users\nSET name = 'Alice Smith', updated_at = NOW()\nWHERE id = 1;\n\n-- DELETE\nDELETE FROM notes WHERE id = 5 AND user_id = 1;\n\n-- COUNT\nSELECT COUNT(*) FROM lessons;\n\n-- Aggregate functions\nSELECT AVG(score), MAX(score), MIN(score) FROM test_results;\n\n-- Alias columns\nSELECT name AS student_name, grade AS final_grade FROM students;`
  },
  {
    title: 'PostgreSQL',
    content: `<h2>What is PostgreSQL?</h2>
<p>PostgreSQL (often called "Postgres") is a powerful, open-source <strong>relational database management system (RDBMS)</strong>. It's one of the most popular databases in the world for production web applications.</p>

<h2>Why PostgreSQL?</h2>
<ul>
  <li>Free and open-source</li>
  <li>Extremely reliable and feature-rich</li>
  <li>Supports advanced data types (JSON, arrays, custom types)</li>
  <li>Strong data integrity with constraints and transactions</li>
  <li>Scales well</li>
</ul>

<h2>Connecting from Node.js</h2>
<p>We use the <code>pg</code> package (node-postgres). The most efficient approach is a <strong>connection pool</strong> — it maintains a set of open database connections and reuses them rather than creating a new one for every query.</p>

<h2>Parameterized Queries</h2>
<p>NEVER put user input directly in a SQL string — that's a <strong>SQL injection vulnerability</strong>! Always use parameterized queries with <code>$1, $2, ...</code> placeholders.</p>`,
    example_code: `// db.js — connection pool setup\nconst { Pool } = require("pg");\nrequire("dotenv").config();\n\nconst pool = new Pool({\n  connectionString: process.env.DATABASE_URL\n  // DATABASE_URL = postgres://user:password@localhost:5432/dbname\n});\n\nmodule.exports = {\n  query: (text, params) => pool.query(text, params)\n};\n\n// ── Using in a controller ──\nconst db = require("./db");\n\nasync function getUser(userId) {\n  // ✅ Parameterized query — safe from SQL injection\n  const result = await db.query(\n    "SELECT id, name, email FROM users WHERE id = $1",\n    [userId]  // $1 is replaced with this value safely\n  );\n  return result.rows[0]; // first row\n}\n\nasync function createNote(userId, title, content) {\n  const result = await db.query(\n    "INSERT INTO notes (user_id, title, content, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",\n    [userId, title, content]\n  );\n  return result.rows[0]; // the newly created row\n}\n\n// ❌ NEVER do this — SQL injection risk!\n// db.query("SELECT * FROM users WHERE id = " + userId);`
  },
  {
    title: 'Tables',
    content: `<h2>Creating Tables</h2>
<p>Tables are the fundamental storage structure in a relational database. Each table has columns (fields) with specific data types, and rows (records) of data.</p>

<h2>Common PostgreSQL Data Types</h2>
<ul>
  <li><code>SERIAL</code> — Auto-incrementing integer (perfect for IDs)</li>
  <li><code>INTEGER</code> — Whole number</li>
  <li><code>NUMERIC(10,2)</code> — Decimal number (10 digits, 2 after decimal)</li>
  <li><code>VARCHAR(255)</code> — Variable length string, max 255 characters</li>
  <li><code>TEXT</code> — Unlimited length text</li>
  <li><code>BOOLEAN</code> — True or false</li>
  <li><code>DATE</code> — Date only</li>
  <li><code>TIMESTAMP</code> — Date and time</li>
  <li><code>JSONB</code> — JSON stored as binary (efficient)</li>
</ul>

<h2>Constraints</h2>
<ul>
  <li><code>NOT NULL</code> — Field must have a value</li>
  <li><code>UNIQUE</code> — No duplicate values</li>
  <li><code>DEFAULT value</code> — Default if none provided</li>
  <li><code>CHECK (condition)</code> — Validate data</li>
</ul>`,
    example_code: `-- Create the users table\nCREATE TABLE IF NOT EXISTS users (\n  id            SERIAL PRIMARY KEY,\n  name          VARCHAR(255) NOT NULL,\n  email         VARCHAR(255) UNIQUE NOT NULL,\n  password_hash VARCHAR(255) NOT NULL,\n  phone         VARCHAR(50),\n  address       TEXT,\n  bio           TEXT,\n  profile_picture VARCHAR(255),\n  date_of_birth DATE,\n  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\n-- Create a lessons table\nCREATE TABLE IF NOT EXISTS lessons (\n  id          SERIAL PRIMARY KEY,\n  category_id INTEGER NOT NULL,\n  title       VARCHAR(255) NOT NULL,\n  description TEXT,\n  content     TEXT,\n  order_index INTEGER NOT NULL DEFAULT 0\n);\n\n-- Alter an existing table\nALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT;\nALTER TABLE users DROP COLUMN IF EXISTS old_column;\nALTER TABLE lessons ALTER COLUMN title TYPE VARCHAR(500);\n\n-- Drop a table (careful!)\nDROP TABLE IF EXISTS old_table;\n\n-- See table structure\n\\d users  -- in psql shell`
  },
  {
    title: 'Primary Keys',
    content: `<h2>What is a Primary Key?</h2>
<p>A Primary Key (PK) is a column (or group of columns) that <strong>uniquely identifies each row</strong> in a table. No two rows can have the same primary key value, and it cannot be NULL.</p>
<p>Every table should have a primary key. It's the fundamental way to reference a specific record.</p>

<h2>SERIAL (Auto-increment)</h2>
<p>The most common approach is to use <code>SERIAL PRIMARY KEY</code> which automatically generates a unique incrementing integer for each new row. You never insert the ID — PostgreSQL handles it.</p>

<h2>Composite Primary Keys</h2>
<p>Sometimes a primary key is made of two columns together. For example, in the <code>user_progress</code> table, the unique identifier is the combination of <code>user_id</code> AND <code>lesson_id</code> — one user can't have two progress records for the same lesson.</p>

<h2>UUIDs as Primary Keys</h2>
<p>An alternative to auto-incrementing integers. UUIDs (Universally Unique Identifiers) are random 128-bit strings that are globally unique, even across different databases.</p>`,
    example_code: `-- SERIAL auto-increment primary key (most common)\nCREATE TABLE products (\n  id    SERIAL PRIMARY KEY, -- PostgreSQL assigns 1, 2, 3...\n  name  VARCHAR(255) NOT NULL,\n  price NUMERIC(10,2)\n);\n\n-- Inserting — don't include the id!\nINSERT INTO products (name, price)\nVALUES ('Laptop', 999.99);\n-- id is automatically 1\n\nINSERT INTO products (name, price)\nVALUES ('Mouse', 29.99);\n-- id is automatically 2\n\n-- Composite primary key\nCREATE TABLE user_progress (\n  user_id   INTEGER NOT NULL,\n  lesson_id INTEGER NOT NULL,\n  status    VARCHAR(50) DEFAULT 'not_started',\n  PRIMARY KEY (user_id, lesson_id) -- combination is unique\n);\n\n-- UUID primary key (alternative)\nCREATE EXTENSION IF NOT EXISTS "pgcrypto";\n\nCREATE TABLE sessions (\n  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  user_id    INTEGER NOT NULL,\n  token      TEXT NOT NULL,\n  expires_at TIMESTAMP\n);`
  },
  {
    title: 'Foreign Keys',
    content: `<h2>What is a Foreign Key?</h2>
<p>A Foreign Key (FK) is a column that <strong>references the Primary Key of another table</strong>. It's how you create relationships between tables and enforce data integrity.</p>
<p>For example, every note in the <code>notes</code> table has a <code>user_id</code> that references the <code>id</code> in the <code>users</code> table. This ensures you can't create a note for a user that doesn't exist.</p>

<h2>Referential Integrity</h2>
<p>Foreign keys enforce referential integrity — they prevent "orphaned" records (e.g., a note that references a deleted user).</p>

<h2>ON DELETE Behavior</h2>
<p>What happens to child rows when the parent is deleted?</p>
<ul>
  <li><code>ON DELETE CASCADE</code> — Delete child rows automatically</li>
  <li><code>ON DELETE SET NULL</code> — Set the FK column to NULL</li>
  <li><code>ON DELETE RESTRICT</code> — Prevent deletion if child rows exist (default)</li>
</ul>`,
    example_code: `-- Foreign key: notes.user_id references users.id\nCREATE TABLE notes (\n  id         SERIAL PRIMARY KEY,\n  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n  -- When a user is deleted, their notes are deleted too\n  title      VARCHAR(255) NOT NULL,\n  content    TEXT,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\n-- user_progress links users and lessons\nCREATE TABLE user_progress (\n  user_id   INTEGER REFERENCES users(id)   ON DELETE CASCADE,\n  lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,\n  status    VARCHAR(50) DEFAULT 'not_started',\n  PRIMARY KEY (user_id, lesson_id)\n);\n\n-- You CAN'T insert a note with a user_id that doesn't exist:\n-- INSERT INTO notes (user_id, title) VALUES (9999, 'My note');\n-- ERROR: insert or update on table "notes" violates foreign key constraint\n\n-- You CAN delete a user and all their notes disappear (CASCADE)\nDELETE FROM users WHERE id = 1;\n-- Automatically deletes all notes, projects, progress for user 1`
  },
  {
    title: 'Relationships',
    content: `<h2>Types of Database Relationships</h2>
<p>Relationships define how tables connect to each other. There are three main types:</p>

<h2>One-to-One (1:1)</h2>
<p>Each row in Table A relates to exactly one row in Table B. Example: each user has one profile picture. Implemented with a unique foreign key.</p>

<h2>One-to-Many (1:N)</h2>
<p>The most common relationship. One row in Table A relates to many rows in Table B. Example: one user can have many notes. Implemented with a foreign key in the "many" table.</p>
<p>In our app: <code>users</code> → <code>notes</code>, <code>users</code> → <code>projects</code>, <code>categories</code> → <code>lessons</code></p>

<h2>Many-to-Many (N:M)</h2>
<p>Many rows in Table A relate to many rows in Table B. Example: a user can complete many lessons, and a lesson can be completed by many users.</p>
<p>Implemented with a <strong>junction table</strong> (also called a bridge or pivot table) that holds the foreign keys of both tables. In our app: <code>user_progress</code> is the junction between <code>users</code> and <code>lessons</code>.</p>`,
    example_code: `-- One-to-One: user → profile_settings\nCREATE TABLE profile_settings (\n  id      SERIAL PRIMARY KEY,\n  user_id INTEGER UNIQUE REFERENCES users(id), -- UNIQUE enforces 1:1\n  theme   VARCHAR(50) DEFAULT 'dark',\n  lang    VARCHAR(10) DEFAULT 'en'\n);\n\n-- One-to-Many: categories → lessons\n-- One category has many lessons\n-- Each lesson belongs to ONE category\nCREATE TABLE learning_categories (\n  id   SERIAL PRIMARY KEY,\n  name VARCHAR(255) NOT NULL\n);\n\nCREATE TABLE lessons (\n  id          SERIAL PRIMARY KEY,\n  category_id INTEGER REFERENCES learning_categories(id), -- FK (many side)\n  title       VARCHAR(255) NOT NULL\n);\n\n-- Many-to-Many: users ↔ lessons (via user_progress)\nCREATE TABLE user_progress (\n  user_id   INTEGER REFERENCES users(id)   ON DELETE CASCADE,\n  lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,\n  status    VARCHAR(50) DEFAULT 'not_started',\n  completed_at TIMESTAMP,\n  PRIMARY KEY (user_id, lesson_id) -- junction table\n);\n\n-- Query: get all lessons for user 1 with their status\nSELECT l.title, up.status\nFROM lessons l\nJOIN user_progress up ON l.id = up.lesson_id\nWHERE up.user_id = 1;`
  },
  {
    title: 'CRUD',
    content: `<h2>CRUD in PostgreSQL</h2>
<p>CRUD stands for <strong>Create, Read, Update, Delete</strong>. These four operations cover everything you'll ever need to do with data in a database.</p>
<p>In PostgreSQL, they map to: <code>INSERT</code>, <code>SELECT</code>, <code>UPDATE</code>, <code>DELETE</code>.</p>

<h2>Returning Data After Write Operations</h2>
<p>PostgreSQL has a unique and useful feature: the <code>RETURNING</code> clause. After an INSERT, UPDATE, or DELETE, you can return the affected row(s) immediately — no need for a second query.</p>

<h2>Transactions</h2>
<p>A transaction groups multiple SQL operations together. Either ALL succeed or NONE do. This prevents partial writes that leave your database in an inconsistent state. Use <code>BEGIN</code>, <code>COMMIT</code>, and <code>ROLLBACK</code>.</p>`,
    example_code: `-- ── CREATE (INSERT) ──\nINSERT INTO notes (user_id, title, content)\nVALUES (1, 'My First Note', 'JavaScript is amazing!')\nRETURNING *;  -- returns the newly created row\n\n-- Insert multiple rows at once\nINSERT INTO lessons (category_id, title, order_index)\nVALUES\n  (4, 'Variables', 1),\n  (4, 'Functions', 2),\n  (4, 'Arrays', 3);\n\n-- ── READ (SELECT) ──\nSELECT * FROM notes WHERE user_id = 1;\nSELECT id, title FROM notes WHERE user_id = 1 ORDER BY created_at DESC LIMIT 5;\n\n-- ── UPDATE ──\nUPDATE notes\nSET title = 'Updated Title', content = 'New content', updated_at = NOW()\nWHERE id = 3 AND user_id = 1\nRETURNING *;  -- returns the updated row\n\n-- ── DELETE ──\nDELETE FROM notes\nWHERE id = 5 AND user_id = 1\nRETURNING id;  -- confirm which id was deleted\n\n-- ── TRANSACTION ──\nBEGIN;\n  INSERT INTO orders (user_id, total) VALUES (1, 100) RETURNING id;\n  UPDATE inventory SET quantity = quantity - 1 WHERE product_id = 5;\n  INSERT INTO order_items (order_id, product_id) VALUES (1, 5);\nCOMMIT;  -- all succeed together\n-- If anything fails: ROLLBACK; -- undoes everything`
  },
  {
    title: 'Joins',
    content: `<h2>What are Joins?</h2>
<p>Joins combine rows from two or more tables based on a related column. Instead of making multiple queries, you get all the data you need in one query.</p>

<h2>Types of Joins</h2>
<ul>
  <li><strong>INNER JOIN</strong> — Returns rows where there's a match in BOTH tables. The most common join.</li>
  <li><strong>LEFT JOIN</strong> — Returns ALL rows from the left table, and matching rows from the right. If no match, right side is NULL.</li>
  <li><strong>RIGHT JOIN</strong> — Opposite of LEFT JOIN (rarely used)</li>
  <li><strong>FULL OUTER JOIN</strong> — Returns all rows from both tables, with NULLs where there's no match</li>
</ul>

<h2>When to Use LEFT JOIN vs INNER JOIN</h2>
<p>Use <code>INNER JOIN</code> when you only want records with matches (e.g., lessons that have user progress).</p>
<p>Use <code>LEFT JOIN</code> when you want all records from one table even if the other has no match (e.g., all lessons, even if the user has no progress entry for them yet).</p>`,
    example_code: `-- INNER JOIN: only lessons with progress entries\nSELECT l.title, up.status\nFROM lessons l\nINNER JOIN user_progress up\n  ON l.id = up.lesson_id AND up.user_id = 1;\n\n-- LEFT JOIN: all lessons, with status (NULL if no progress)\nSELECT\n  l.id,\n  l.title,\n  c.name AS category,\n  COALESCE(up.status, 'not_started') AS status,\n  up.completed_at\nFROM lessons l\nJOIN learning_categories c ON l.category_id = c.id\nLEFT JOIN user_progress up\n  ON l.id = up.lesson_id AND up.user_id = 1\nORDER BY c.order_index, l.order_index;\n\n-- Join 3 tables: notes with category and lesson names\nSELECT\n  n.title AS note_title,\n  n.content,\n  c.name  AS category_name,\n  l.title AS lesson_name\nFROM notes n\nLEFT JOIN learning_categories c ON n.category_id = c.id\nLEFT JOIN lessons l ON n.lesson_id = l.id\nWHERE n.user_id = 1\nORDER BY n.created_at DESC;\n\n-- Aggregate with JOIN: progress stats per category\nSELECT\n  c.name,\n  COUNT(l.id) AS total_lessons,\n  SUM(CASE WHEN up.status = 'completed' THEN 1 ELSE 0 END) AS completed\nFROM learning_categories c\nJOIN lessons l ON c.id = l.category_id\nLEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = 1\nGROUP BY c.id, c.name\nORDER BY c.order_index;`
  },
  {
    title: 'Database Design',
    content: `<h2>What is Database Design?</h2>
<p>Database design is the process of structuring your data to be efficient, accurate, and scalable. Good design prevents data duplication, makes queries fast, and ensures data integrity.</p>

<h2>Normalization</h2>
<p>Normalization is the process of organizing data to reduce redundancy. The key idea: store each piece of information in exactly one place.</p>
<ul>
  <li><strong>1NF:</strong> Each column has one value; each row is unique</li>
  <li><strong>2NF:</strong> No partial dependencies (all columns depend on the whole primary key)</li>
  <li><strong>3NF:</strong> No transitive dependencies (columns only depend on the PK, not other non-key columns)</li>
</ul>

<h2>Key Design Principles</h2>
<ul>
  <li>Every table should have a primary key</li>
  <li>Use foreign keys to link related data</li>
  <li>Don't store calculated values — calculate them in queries</li>
  <li>Use the right data type for each column</li>
  <li>Add indexes on columns you filter by frequently</li>
  <li>Name things clearly (plural tables: <code>users</code>, not <code>user</code>)</li>
</ul>

<h2>Indexes</h2>
<p>Indexes make queries faster by creating a lookup structure. Without an index, the database reads every row (full table scan). With an index on <code>email</code>, it jumps directly to the match.</p>`,
    example_code: `-- ── Good Database Design ──\n\n-- Users table (single source of truth for user data)\nCREATE TABLE users (\n  id            SERIAL PRIMARY KEY,\n  email         VARCHAR(255) UNIQUE NOT NULL,\n  name          VARCHAR(255) NOT NULL,\n  password_hash VARCHAR(255) NOT NULL,\n  created_at    TIMESTAMP DEFAULT NOW()\n);\n\n-- Lessons belong to categories (normalized: category name stored once)\nCREATE TABLE learning_categories (\n  id          SERIAL PRIMARY KEY,\n  name        VARCHAR(100) UNIQUE NOT NULL,\n  order_index SMALLINT NOT NULL\n);\n\nCREATE TABLE lessons (\n  id          SERIAL PRIMARY KEY,\n  category_id INTEGER NOT NULL REFERENCES learning_categories(id),\n  title       VARCHAR(255) NOT NULL,\n  order_index SMALLINT NOT NULL,\n  UNIQUE (category_id, order_index) -- no duplicate order within category\n);\n\n-- ── Add indexes for performance ──\nCREATE INDEX idx_users_email ON users(email);\nCREATE INDEX idx_lessons_category ON lessons(category_id);\nCREATE INDEX idx_progress_user ON user_progress(user_id);\nCREATE INDEX idx_notes_user ON notes(user_id);\n\n-- ── Anti-patterns to avoid ──\n-- Bad: storing category name in every lesson row (repetition)\n-- CREATE TABLE lessons (id SERIAL, category_name VARCHAR, ...);\n\n-- Bad: storing comma-separated values\n-- UPDATE users SET tags = 'html,css,js' WHERE id = 1;\n-- Use a separate tags table instead!`
  },

  // ─── AUTH ──────────────────────────────────────────────────────────────────
  {
    title: 'Authentication',
    content: `<h2>What is Authentication?</h2>
<p>Authentication is the process of <strong>verifying who a user is</strong>. When you enter your email and password, the system checks if you are who you claim to be.</p>
<p>Don't confuse with Authorization (next lesson) — Authentication = "Who are you?", Authorization = "What can you do?"</p>

<h2>Password Hashing with bcrypt</h2>
<p><strong>NEVER store plain-text passwords!</strong> If your database is leaked, all user passwords are exposed. Instead, hash passwords before storing them.</p>
<p>bcrypt is a hashing algorithm designed specifically for passwords. It's intentionally slow (to resist brute force attacks) and adds a "salt" (random data) to prevent rainbow table attacks.</p>

<h2>JWT (JSON Web Tokens)</h2>
<p>After a user logs in, the server gives them a <strong>JWT token</strong>. The client stores this token and sends it with every subsequent request. The server verifies the token to identify the user — no sessions required.</p>
<p>A JWT has three parts separated by dots: <code>header.payload.signature</code></p>

<h2>Token Storage</h2>
<p>We store JWTs in <code>localStorage</code>. This is fine for learning apps but in production, consider using httpOnly cookies (safer against XSS).</p>`,
    example_code: `// ── Password Hashing ──\nconst bcrypt = require("bcrypt");\n\n// Registration: hash before saving\nasync function registerUser(email, plainPassword) {\n  const saltRounds = 10; // higher = slower but more secure\n  const passwordHash = await bcrypt.hash(plainPassword, saltRounds);\n  \n  await db.query(\n    "INSERT INTO users (email, password_hash) VALUES ($1, $2)",\n    [email, passwordHash]\n  );\n}\n\n// Login: compare password with stored hash\nasync function loginUser(email, plainPassword) {\n  const user = await db.query(\n    "SELECT * FROM users WHERE email = $1", [email]\n  );\n  \n  if (user.rows.length === 0) return null; // user not found\n  \n  const isMatch = await bcrypt.compare(plainPassword, user.rows[0].password_hash);\n  return isMatch ? user.rows[0] : null;\n}\n\n// ── JWT ──\nconst jwt = require("jsonwebtoken");\n\n// Create token on successful login\nfunction createToken(userId) {\n  const payload = { user: { id: userId } };\n  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5d" });\n}\n\n// Verify token in middleware\nfunction verifyToken(token) {\n  return jwt.verify(token, process.env.JWT_SECRET); // throws if invalid\n}\n\n// Frontend: store and send token\nlocalStorage.setItem("token", token);\n// In every request:\n// headers: { Authorization: "Bearer " + localStorage.getItem("token") }`
  },
  {
    title: 'Authorization',
    content: `<h2>What is Authorization?</h2>
<p>Authorization determines <strong>what an authenticated user is allowed to do</strong>. Authentication says "I know who you are." Authorization says "Here is what you're allowed to access."</p>
<p>Example: All logged-in users can see their own notes. Only admins can delete other users' accounts.</p>

<h2>Role-Based Access Control (RBAC)</h2>
<p>A common approach: assign users a role (e.g., "user", "admin", "moderator") and check that role before allowing access to specific endpoints.</p>

<h2>Resource Ownership</h2>
<p>The most important authorization check in StackGen: always verify that the <code>user_id</code> in the database row matches <code>req.user.id</code> from the JWT token. This prevents User A from deleting User B's data.</p>

<h2>Middleware for Authorization</h2>
<p>Just like authentication middleware, you can create authorization middleware that checks roles before the route handler runs.</p>`,
    example_code: `// ── Resource Ownership Check ──\n// Always verify the resource belongs to the requesting user!\n\nexports.deleteNote = async (req, res) => {\n  const { id } = req.params;\n  \n  // Check ownership first!\n  const note = await db.query(\n    "SELECT * FROM notes WHERE id = $1",\n    [id]\n  );\n  \n  if (note.rows.length === 0) {\n    return res.status(404).json({ msg: "Note not found" });\n  }\n  \n  // Is this user the owner?\n  if (note.rows[0].user_id !== req.user.id) {\n    return res.status(403).json({ msg: "Forbidden: not your note" });\n  }\n  \n  await db.query("DELETE FROM notes WHERE id = $1", [id]);\n  res.json({ msg: "Note deleted" });\n};\n\n// ── Role-Based Middleware ──\nfunction requireAdmin(req, res, next) {\n  if (req.user.role !== "admin") {\n    return res.status(403).json({ msg: "Admin access required" });\n  }\n  next();\n}\n\n// Apply to admin-only routes\napp.delete("/api/users/:id", auth, requireAdmin, deleteUser);\n\n// ── What users CAN do ──\n// ✅ Read their own data\n// ✅ Create their own notes, projects\n// ✅ Edit their own profile\n// ❌ Read another user's notes\n// ❌ Delete another user's account`
  },
  {
    title: 'Error Handling',
    content: `<h2>Error Handling in Express.js</h2>
<p>Proper error handling on the backend means your API always returns meaningful, consistent error responses — never crashes silently, and never exposes sensitive server details to the client.</p>

<h2>Types of Errors</h2>
<ul>
  <li><strong>Validation errors (400):</strong> Client sent bad data — wrong format, missing fields</li>
  <li><strong>Auth errors (401/403):</strong> Not logged in or not authorized</li>
  <li><strong>Not found (404):</strong> Resource doesn't exist</li>
  <li><strong>Database errors (500):</strong> Query failed, connection lost</li>
  <li><strong>Server errors (500):</strong> Unexpected bugs</li>
</ul>

<h2>Global Error Handler</h2>
<p>Register a special middleware with 4 parameters at the END of your Express app. Express recognizes it as an error handler. Any <code>next(error)</code> call jumps directly to this handler.</p>

<h2>Best Practices</h2>
<ul>
  <li>Always use try/catch in async route handlers</li>
  <li>Send a consistent JSON error format: <code>{ msg: "..." }</code></li>
  <li>Log errors on the server (console.error)</li>
  <li>Don't expose stack traces to clients in production</li>
  <li>Use appropriate HTTP status codes</li>
</ul>`,
    example_code: `// ── Wrapping async routes ──\n// This wrapper catches any async error and passes it to next()\nconst asyncHandler = (fn) => (req, res, next) =>\n  Promise.resolve(fn(req, res, next)).catch(next);\n\n// Use it like this:\napp.get("/api/users", asyncHandler(async (req, res) => {\n  const users = await db.query("SELECT * FROM users");\n  res.json(users.rows);\n  // If query fails, error is automatically passed to global handler\n}));\n\n// ── Throwing specific errors ──\napp.get("/api/users/:id", asyncHandler(async (req, res) => {\n  const user = await db.query("SELECT * FROM users WHERE id = $1", [req.params.id]);\n  \n  if (user.rows.length === 0) {\n    const error = new Error("User not found");\n    error.status = 404;\n    throw error; // goes to global error handler\n  }\n  \n  res.json(user.rows[0]);\n}));\n\n// ── Global error handler (LAST middleware in server.js) ──\napp.use((err, req, res, next) => {\n  console.error(\`[Error] \${req.method} \${req.path}:\`, err.message);\n  \n  const status = err.status || 500;\n  const message = process.env.NODE_ENV === "production"\n    ? "Internal server error"  // hide details in production\n    : err.message;\n  \n  res.status(status).json({ msg: message });\n});`
  },

  // ─── FULL STACK ─────────────────────────────────────────────────────────────
  {
    title: 'Connecting frontend to backend',
    content: `<h2>The Full-Stack Connection</h2>
<p>In a full-stack app, the frontend (HTML, CSS, JS running in the browser) communicates with the backend (Node.js/Express running on the server) through HTTP requests using the Fetch API.</p>

<h2>The Flow</h2>
<ol>
  <li>User does something in the browser (clicks a button, submits a form)</li>
  <li>JavaScript catches the event and calls <code>fetch()</code></li>
  <li>The request travels over the network to the Express server</li>
  <li>Express processes it, queries the database, and sends back a JSON response</li>
  <li>The JavaScript receives the response and updates the DOM</li>
</ol>

<h2>CORS (Cross-Origin Resource Sharing)</h2>
<p>When your frontend is on a different origin than your backend (different port, domain), browsers block the request by default for security. You need to enable CORS on the backend.</p>
<p>In development, your frontend might be on port 5500 (Live Server) and backend on port 5000. We use the <code>cors</code> package to allow this.</p>

<h2>The API URL</h2>
<p>In development: <code>http://localhost:5000/api</code>. In production: your actual domain. Store the base URL in a constant so you only change it in one place.</p>`,
    example_code: `// ── Backend: Enable CORS (server.js) ──\nconst cors = require("cors");\napp.use(cors()); // allow all origins (development)\n\n// For production — restrict to your frontend URL:\napp.use(cors({\n  origin: "https://your-app.com",\n  credentials: true\n}));\n\n// ── Frontend: Fetch wrapper (app.js) ──\nconst API_URL = "http://localhost:5000/api";\n\nasync function fetchAPI(endpoint, options = {}) {\n  const token = localStorage.getItem("token");\n  \n  const headers = {\n    "Content-Type": "application/json",\n    ...options.headers\n  };\n  if (token) headers["Authorization"] = "Bearer " + token;\n  \n  const response = await fetch(API_URL + endpoint, { ...options, headers });\n  const data = await response.json();\n  \n  if (!response.ok) {\n    if (response.status === 401) window.location.href = "login.html";\n    throw new Error(data.msg || "Request failed");\n  }\n  return data;\n}\n\n// ── Frontend: Using the wrapper ──\nconst stats = await fetchAPI("/progress/stats");\ndocument.getElementById("percentage").textContent = stats.overallPercentage + "%";\n\nawait fetchAPI("/progress/5", {\n  method: "PUT",\n  body: JSON.stringify({ status: "completed" })\n});`
  },
  {
    title: 'Connecting backend to PostgreSQL',
    content: `<h2>The Backend-Database Connection</h2>
<p>The backend (Express) connects to PostgreSQL using the <code>pg</code> package. This connection allows your server to run SQL queries to store and retrieve data.</p>

<h2>Connection String</h2>
<p>The database connection is configured with a URL: <code>postgres://username:password@host:port/database</code></p>
<p>We store this in <code>.env</code> and never hardcode it in the source code.</p>

<h2>Connection Pool</h2>
<p>Instead of opening a new database connection for every request (expensive), we use a <strong>pool</strong> that maintains multiple open connections and reuses them. The <code>pg</code> Pool manages this automatically.</p>

<h2>Query Results</h2>
<p>The result of <code>db.query()</code> returns an object with:</p>
<ul>
  <li><code>result.rows</code> — Array of row objects</li>
  <li><code>result.rows[0]</code> — First row (for single-record queries)</li>
  <li><code>result.rowCount</code> — Number of rows affected</li>
</ul>`,
    example_code: `// ── db.js — Connection Pool ──\nconst { Pool } = require("pg");\nrequire("dotenv").config();\n\nconst pool = new Pool({\n  connectionString: process.env.DATABASE_URL\n});\n\n// Test the connection\npool.connect((err, client, release) => {\n  if (err) {\n    console.error("DB connection error:", err.message);\n  } else {\n    console.log("Connected to PostgreSQL!");\n    release(); // return connection to pool\n  }\n});\n\nmodule.exports = {\n  query: (text, params) => pool.query(text, params)\n};\n\n// ── Using db in a controller ──\nconst db = require("../db");\n\nasync function getAllLessons(req, res) {\n  const result = await db.query(\n    "SELECT * FROM lessons ORDER BY category_id, order_index"\n  );\n  \n  console.log("Rows returned:", result.rowCount);\n  res.json(result.rows);\n}\n\nasync function getLessonById(req, res) {\n  const { id } = req.params;\n  \n  const result = await db.query(\n    "SELECT l.*, c.name as category_name FROM lessons l JOIN learning_categories c ON l.category_id = c.id WHERE l.id = $1",\n    [id]\n  );\n  \n  if (result.rows.length === 0) {\n    return res.status(404).json({ msg: "Lesson not found" });\n  }\n  \n  res.json(result.rows[0]);\n}`
  },
  {
    title: 'Full-stack architecture',
    content: `<h2>How a Full-Stack App is Structured</h2>
<p>A full-stack web application has several distinct layers, each with a clear responsibility:</p>

<h2>The Three-Tier Architecture</h2>
<ol>
  <li><strong>Presentation Layer (Frontend)</strong> — What users see and interact with. HTML, CSS, JavaScript running in the browser. Sends HTTP requests, renders responses.</li>
  <li><strong>Application Layer (Backend)</strong> — The brain of the app. Node.js + Express. Handles business logic, authentication, data validation. Talks to the database.</li>
  <li><strong>Data Layer (Database)</strong> — Where data is stored persistently. PostgreSQL. The backend is the only layer that talks to the database.</li>
</ol>

<h2>Request Lifecycle</h2>
<p>Browser → DNS → Web Server → Express Router → Auth Middleware → Controller → Database → Response</p>

<h2>MVC Pattern</h2>
<p>Express apps often follow MVC (Model-View-Controller):</p>
<ul>
  <li><strong>Model:</strong> Database logic (queries)</li>
  <li><strong>View:</strong> The HTML frontend</li>
  <li><strong>Controller:</strong> Handles the request, calls the model, sends response</li>
</ul>

<h2>File Organization</h2>
<p>Keep your code organized — routes handle URL mapping, controllers handle business logic, db.js handles database queries, middleware handles cross-cutting concerns.</p>`,
    example_code: `// ── Full-Stack App Structure ──\n\n// stackgen/\n// ├── frontend/           ← Presentation Layer\n// │   ├── index.html\n// │   ├── css/style.css\n// │   └── js/\n// │       ├── app.js      ← Shared helpers, auth check\n// │       └── dashboard.js\n// │\n// ├── backend/            ← Application Layer\n// │   ├── server.js       ← Express app, middleware setup\n// │   ├── db.js           ← Database connection pool\n// │   ├── middleware/\n// │   │   └── auth.js     ← JWT verification\n// │   ├── routes/         ← URL → handler mapping\n// │   │   └── lessons.routes.js\n// │   └── controllers/    ← Business logic\n// │       └── lessons.controller.js\n// │\n// ├── database/           ← Data Layer setup\n// │   ├── schema.sql      ← Table definitions\n// │   └── seed.sql        ← Initial data\n// │\n// └── .env                ← Secrets (never commit!)\n\n// ── Request flow example ──\n// 1. Browser: fetch("/api/progress/stats", { headers: { Authorization: token } })\n// 2. Express: app.use("/api/progress", progressRouter)\n// 3. Router: router.get("/stats", auth, progressController.getStats)\n// 4. Auth middleware: verify JWT, attach req.user\n// 5. Controller: query PostgreSQL, calculate percentages\n// 6. Response: res.json({ overallPercentage: 35, ... })\n// 7. Browser: render progress bars with the data`
  },
  {
    title: 'Deployment',
    content: `<h2>What is Deployment?</h2>
<p>Deployment is the process of making your app accessible on the internet so anyone can use it. Instead of running on <code>localhost:5000</code>, it runs on a server in the cloud.</p>

<h2>Hosting Options</h2>
<ul>
  <li><strong>Railway</strong> — Great for beginners. Deploy Node.js apps and PostgreSQL databases easily. Has a free tier.</li>
  <li><strong>Render</strong> — Similar to Railway. Free tier available.</li>
  <li><strong>Heroku</strong> — Popular but removed free tier.</li>
  <li><strong>DigitalOcean</strong> — More control, virtual servers (VPS). Paid.</li>
  <li><strong>Vercel</strong> — Great for frontends (Next.js, static sites).</li>
  <li><strong>AWS / Google Cloud / Azure</strong> — Enterprise grade, complex, powerful.</li>
</ul>

<h2>Deployment Checklist</h2>
<ul>
  <li>Set all environment variables in the hosting platform (never hardcode)</li>
  <li>Set <code>NODE_ENV=production</code></li>
  <li>Make sure your database is accessible from the server</li>
  <li>Add a <code>start</code> script to <code>package.json</code></li>
  <li>Test everything works before going live</li>
</ul>

<h2>CI/CD</h2>
<p>Continuous Integration / Continuous Deployment: Automatically test and deploy your app whenever you push to GitHub. GitHub Actions, Railway, and Render all support this.</p>`,
    example_code: `// ── package.json scripts for deployment ──\n{\n  "scripts": {\n    "start": "node backend/server.js",\n    "dev": "nodemon backend/server.js",\n    "build": "echo 'No build step needed'\n  }\n}\n\n// ── Railway deployment (railway.json) ──\n{\n  "build": {\n    "builder": "NIXPACKS"\n  },\n  "deploy": {\n    "startCommand": "npm start",\n    "healthcheckPath": "/api/health"\n  }\n}\n\n// ── Add health check endpoint ──\napp.get("/api/health", (req, res) => {\n  res.json({ status: "OK", timestamp: new Date().toISOString() });\n});\n\n// ── Environment variables for production ──\n// On Railway/Render dashboard, set:\n// NODE_ENV=production\n// DATABASE_URL=postgres://... (your cloud database URL)\n// JWT_SECRET=very_long_random_secret_here\n// PORT=5000 (or let the platform set it)\n\n// ── .gitignore — never commit these! ──\n// node_modules/\n// .env\n// uploads/       (use cloud storage in production)\n\n// ── Procfile (for some platforms) ──\n// web: node backend/server.js`
  },
  {
    title: 'Environment variables',
    content: `<h2>What are Environment Variables?</h2>
<p>Environment variables are <strong>configuration values stored outside your code</strong>. They change depending on the environment (development on your machine vs. production on a server) without requiring code changes.</p>

<h2>Why Environment Variables?</h2>
<ul>
  <li><strong>Security:</strong> Database passwords, JWT secrets, API keys should NEVER be in your source code (which might be on GitHub)</li>
  <li><strong>Flexibility:</strong> Different settings for development, testing, and production without changing code</li>
  <li><strong>12-Factor App:</strong> Best practice standard for modern web apps</li>
</ul>

<h2>The .env File</h2>
<p>A <code>.env</code> file in your project root holds environment variables as key=value pairs. The <code>dotenv</code> package loads them into <code>process.env</code> at startup.</p>
<p><strong>Critical: Always add <code>.env</code> to your <code>.gitignore</code>!</strong> Commit a <code>.env.example</code> with empty values instead.</p>

<h2>process.env</h2>
<p>In Node.js, environment variables are accessible via <code>process.env.VARIABLE_NAME</code>.</p>`,
    example_code: `// ── .env file (NEVER commit this!) ──\nPORT=5000\nDATABASE_URL=postgres://postgres:mypassword@localhost:5432/stackgen\nJWT_SECRET=my_super_secret_key_at_least_32_chars_long\nNODE_ENV=development\n\n// ── .env.example file (safe to commit) ──\nPORT=5000\nDATABASE_URL=postgres://username:password@localhost:5432/database_name\nJWT_SECRET=your_jwt_secret_here\nNODE_ENV=development\n\n// ── server.js — load .env at the very top ──\nrequire("dotenv").config(); // must be first!\n\nconst port = process.env.PORT || 5000;\nconst jwtSecret = process.env.JWT_SECRET;\n\nif (!jwtSecret) {\n  console.error("FATAL: JWT_SECRET is not set!");\n  process.exit(1);\n}\n\n// ── db.js ──\nconst { Pool } = require("pg");\nconst pool = new Pool({\n  connectionString: process.env.DATABASE_URL\n});\n\n// ── Frontend: API URL based on environment ──\nconst API_URL = window.location.hostname === "localhost"\n  ? "http://localhost:5000/api"     // development\n  : "https://your-app.railway.app/api"; // production\n\n// ── .gitignore ──\n// node_modules/\n// .env\n// .DS_Store`
  },
  {
    title: 'Security',
    content: `<h2>Web Application Security</h2>
<p>Security is not an afterthought — it needs to be built in from the start. Here are the most important security concepts for a full-stack developer.</p>

<h2>SQL Injection</h2>
<p>Attacker manipulates your SQL query by injecting malicious SQL. <strong>Always use parameterized queries.</strong></p>

<h2>XSS (Cross-Site Scripting)</h2>
<p>Attacker injects malicious JavaScript into your page that runs for other users. Avoid using <code>innerHTML</code> with user data. Use <code>textContent</code> instead.</p>

<h2>CSRF (Cross-Site Request Forgery)</h2>
<p>Attacker tricks a user into making unintended requests. JWT tokens (stored in memory or httpOnly cookies) help prevent this.</p>

<h2>Security Headers</h2>
<p>Use the <code>helmet</code> package in Express to set secure HTTP headers automatically.</p>

<h2>Rate Limiting</h2>
<p>Prevent brute force attacks by limiting how many requests a single IP can make in a time period.</p>

<h2>HTTPS</h2>
<p>Always use HTTPS in production. Most hosting platforms (Railway, Render, Vercel) provide HTTPS automatically.</p>`,
    example_code: `// ── Install security packages ──\n// npm install helmet express-rate-limit\n\nconst helmet = require("helmet");\nconst rateLimit = require("express-rate-limit");\n\n// ── Security headers (helmet) ──\napp.use(helmet()); // sets X-Content-Type-Options, X-Frame-Options, etc.\n\n// ── Rate limiting ──\nconst limiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minutes\n  max: 100,                  // max 100 requests per window\n  message: "Too many requests, please try again later."\n});\napp.use("/api/", limiter);\n\n// Stricter limit for auth endpoints\nconst authLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000,\n  max: 5, // only 5 login attempts per 15 minutes\n});\napp.use("/api/auth/login", authLimiter);\n\n// ── XSS Prevention (frontend) ──\n// ❌ BAD: directly insert user content as HTML\nelement.innerHTML = userInput; // could run malicious scripts!\n\n// ✅ GOOD: use textContent\nelement.textContent = userInput; // treated as plain text\n\n// ── SQL Injection Prevention ──\n// ❌ BAD:\ndb.query("SELECT * FROM users WHERE email = '" + email + "'")\n\n// ✅ GOOD: parameterized query\ndb.query("SELECT * FROM users WHERE email = $1", [email])`
  },
  {
    title: 'Full-stack projects',
    content: `<h2>Building Complete Full-Stack Projects</h2>
<p>You've learned all the pieces. Now it's time to put them together. A full-stack project combines everything: HTML, CSS, JavaScript, Node.js, Express, PostgreSQL, Authentication, and REST APIs.</p>

<h2>Project Ideas (Start to Finish)</h2>
<ul>
  <li><strong>StackGen (this app!):</strong> You're already building it — a learning tracker with auth, CRUD, progress tracking</li>
  <li><strong>Todo App:</strong> Simple CRUD with user accounts</li>
  <li><strong>Blog Platform:</strong> Create/read/edit posts, comments, user profiles</li>
  <li><strong>Expense Tracker:</strong> Track income and expenses, visualize with charts</li>
  <li><strong>Recipe App:</strong> Save and share recipes, ingredient lists</li>
</ul>

<h2>Project Phases</h2>
<ol>
  <li><strong>Plan:</strong> Define features, design the database schema, plan API endpoints</li>
  <li><strong>Database:</strong> Create tables, relationships, seed data</li>
  <li><strong>Backend API:</strong> Build routes, controllers, middleware</li>
  <li><strong>Frontend:</strong> Build HTML pages, fetch from the API, handle user interactions</li>
  <li><strong>Auth:</strong> Add registration, login, logout, protect routes</li>
  <li><strong>Polish:</strong> Error handling, loading states, responsive design</li>
  <li><strong>Deploy:</strong> Push to GitHub, deploy on Railway/Render</li>
</ol>

<h2>You Made It! 🎉</h2>
<p>Completing this curriculum means you have the fundamental skills of a full-stack JavaScript developer. Keep building projects — that's the fastest way to grow.</p>`,
    example_code: `// ── Full Project Checklist ──\n\n// 1. Database Schema\n// ✅ users, content tables, junction tables\n// ✅ Primary keys, foreign keys, constraints\n// ✅ Indexes on frequently queried columns\n\n// 2. Backend (Express)\n// ✅ server.js with middleware (cors, json, helmet)\n// ✅ Routes organized by resource\n// ✅ Controllers with business logic\n// ✅ JWT authentication middleware\n// ✅ Global error handler\n// ✅ Environment variables via .env\n\n// 3. Frontend\n// ✅ Auth pages (login, register)\n// ✅ Protected pages (redirect if no token)\n// ✅ Fetch wrapper with token injection\n// ✅ DOM updates without page refresh\n// ✅ Responsive CSS\n// ✅ Error messages shown to users\n\n// 4. Security\n// ✅ Passwords hashed with bcrypt\n// ✅ JWT for stateless auth\n// ✅ Parameterized SQL queries\n// ✅ Ownership checks on all write operations\n// ✅ HTTPS in production\n\n// 5. Deployment\n// ✅ .gitignore includes .env, node_modules\n// ✅ Environment variables set on hosting platform\n// ✅ npm start script defined\n// ✅ Health check endpoint\n\nconsole.log("You are now a Full-Stack Developer! 🚀");`
  }
];

async function seedContent() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });

  try {
    await client.connect();
    console.log('Connected. Seeding lesson content...\n');

    let updated = 0;
    let notFound = 0;

    for (const lesson of lessons) {
      const result = await client.query(
        'UPDATE lessons SET content = $1, example_code = $2 WHERE title = $3 RETURNING id, title',
        [lesson.content, lesson.example_code, lesson.title]
      );

      if (result.rowCount > 0) {
        console.log(`✅ [${result.rows[0].id}] ${result.rows[0].title}`);
        updated++;
      } else {
        console.warn(`⚠️  Not found: "${lesson.title}"`);
        notFound++;
      }
    }

    console.log(`\n─────────────────────────────`);
    console.log(`✅ Updated: ${updated} lessons`);
    if (notFound > 0) console.log(`⚠️  Not found: ${notFound} lessons`);
    console.log('Done!');
  } catch (err) {
    console.error('Error seeding content:', err.message);
  } finally {
    await client.end();
  }
}

seedContent();
