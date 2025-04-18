// generate-articles-json.js
const fs = require('fs');
const path = require('path');

const baseDir = './'; // root of your repo
const folders = [
  { key: 'pressReleases', dir: 'press-releases' },
  { key: 'recordReleaseNotes', dir: 'record-release-notes' }
];

let articles = [];

folders.forEach(({ key, dir }) => {
  const files = fs.readdirSync(path.join(baseDir, dir))
    .filter(name => name.endsWith('.html'))
    .map(name => ({
      date: name.slice(0, 10), // from filename
      path: `${dir}/${name}`,
      title: name.split('-').slice(3).join(' ').replace('.html', ''), // crude title
      category: key
    }));

  articles = articles.concat(files);
});

articles.sort((a, b) => new Date(b.date) - new Date(a.date)); // newest first

fs.writeFileSync(
  path.join(baseDir, 'articles.json'),
  JSON.stringify(articles, null, 2)
);

console.log('✅ articles.json created');