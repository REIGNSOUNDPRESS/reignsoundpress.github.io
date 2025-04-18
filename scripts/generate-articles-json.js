const fs = require('fs');
const path = require('path');

const folders = ['record-release-notes', 'press-releases'];
const articles = [];

folders.forEach(folder => {
  const folderPath = path.join(__dirname, '..', folder);
  if (!fs.existsSync(folderPath)) return;

  fs.readdirSync(folderPath).forEach(file => {
    if (file.endsWith('.html')) {
      const date = file.split('-').slice(0, 3).join('-');
      articles.push({
        path: `/${folder}/${file}`,
        date
      });
    }
  });
});

// Sort by date descending
articles.sort((a, b) => new Date(b.date) - new Date(a.date));

// Write to articles.json
fs.writeFileSync(
  path.join(__dirname, '..', 'articles.json'),
  JSON.stringify(articles, null, 2)
);

console.log(`✅ Generated articles.json with ${articles.length} articles.`);