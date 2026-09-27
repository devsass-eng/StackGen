const fs = require('fs');
const path = require('path');
const lessonContent = require('./seed-content');

const seedSql = fs.readFileSync(path.join(__dirname, '../database/seed.sql'), 'utf8');
const statements = [...seedSql.matchAll(/INSERT INTO (learning_categories|lessons)[\s\S]*?VALUES([\s\S]*?);/gi)];
const unquote = value => value.replace(/''/g, "'");
const tuples = value => [...value.matchAll(/\(([^()]*)\)/g)].map(match => match[1]);
const readFields = value => [...value.matchAll(/'((?:''|[^'])*)'|(-?\d+)/g)].map(field => field[1] === undefined ? Number(field[2]) : unquote(field[1]));

const categories = [];
const lessons = [];
for (const [, table, values] of statements) {
  if (table.toLowerCase() === 'learning_categories') {
    for (const tuple of tuples(values)) {
      const [name, description, order] = readFields(tuple);
      categories.push({ id: order, name, description, order, lessons: [] });
    }
  } else {
    for (const tuple of tuples(values)) {
      const [categoryId, title, description, order] = readFields(tuple);
      const content = lessonContent.find(item => item.title === title);
      if (!content) throw new Error(`Missing lesson body for "${title}" in backend/seed-content.js`);
      const lesson = {
        id: lessons.length + 1,
        title,
        description,
        order,
        status: 'not_started',
        completed_at: null,
        content: content.content,
        example_code: content.example_code || null,
        category: { id: categoryId, name: categories.find(item => item.id === categoryId)?.name }
      };
      lessons.push(lesson);
      categories.find(item => item.id === categoryId)?.lessons.push({
        id: lesson.id, title, description, order, status: lesson.status, completed_at: null
      });
    }
  }
}

if (!categories.length || lessons.length === 0) throw new Error('No curriculum records were found in database/seed.sql.');

lessons.forEach((lesson, index) => {
  lesson.prev = lessons[index - 1] ? { id: lessons[index - 1].id, title: lessons[index - 1].title } : null;
  lesson.next = lessons[index + 1] ? { id: lessons[index + 1].id, title: lessons[index + 1].title } : null;
});

const output = { categories, lessons };
fs.writeFileSync(path.join(__dirname, '../frontend/offline-curriculum.json'), `${JSON.stringify(output)}\n`);
console.log(`Exported ${lessons.length} lessons in ${categories.length} categories for offline use.`);
