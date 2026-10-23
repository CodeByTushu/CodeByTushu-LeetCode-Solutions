const fs = require('fs');
const path = require('path');

const problems = JSON.parse(fs.readFileSync('solutions.json', 'utf8'));

let stats = {
  totalProblems: problems.length,
  totalFiles: 0,
  withBranding: 0,
  withoutBranding: 0,
  byLanguage: {
    java: { with: 0, without: 0 },
    python: { with: 0, without: 0 },
    cpp: { with: 0, without: 0 },
    javascript: { with: 0, without: 0 }
  }
};

problems.forEach(p => {
  ['java', 'python', 'cpp', 'javascript'].forEach(lang => {
    const relPath = p.languages?.[lang]?.relativePath;
    if (relPath && fs.existsSync(relPath)) {
      stats.totalFiles++;
      const content = fs.readFileSync(relPath, 'utf8');
      const hasBranding = content.includes('CodeByTushu');
      if (hasBranding) {
        stats.withBranding++;
        stats.byLanguage[lang].with++;
      } else {
        stats.withoutBranding++;
        stats.byLanguage[lang].without++;
      }
    } else {
      console.warn(`Missing file: ${relPath}`);
    }
  });
});

console.log(JSON.stringify(stats, null, 2));
