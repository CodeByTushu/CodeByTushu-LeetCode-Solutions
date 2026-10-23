const fs = require('fs');
const path = require('path');

function getJavaHeader(id, title, difficulty) {
  return `/**\n * Problem: LeetCode ${id} - ${title}\n * Difficulty: ${difficulty}\n * Language: Java\n * Author: CodeByTushu\n */\n`;
}

function getPythonHeader(id, title, difficulty) {
  return `"""\nProblem: LeetCode ${id} - ${title}\nDifficulty: ${difficulty}\nLanguage: Python 3\nAuthor: CodeByTushu\n"""\n\n`;
}

function getCppHeader(id, title, difficulty) {
  return `/**\n * Problem: LeetCode ${id} - ${title}\n * Difficulty: ${difficulty}\n * Language: C++\n * Author: CodeByTushu\n */\n`;
}

function getJsHeaderBlock(id, title, difficulty) {
  return `/**\n * Problem: LeetCode ${id} - ${title}\n * Difficulty: ${difficulty}\n * Language: JavaScript (ES6+ / Node.js)\n * Author: CodeByTushu\n */\n\n`;
}

function getJsHeaderInsideJSDoc(id, title, difficulty) {
  return `/**\n * Problem: LeetCode ${id} - ${title}\n * Difficulty: ${difficulty}\n * Language: JavaScript (ES6+ / Node.js)\n * Author: CodeByTushu\n *\n`;
}

function transformJava(content, id, title, difficulty, filePath) {
  if (content.includes('CodeByTushu')) return null;

  // Case 1: Sept 1-3 old header before class Solution
  const oldHeaderRegex = /\/\*\*[\s\S]*?\* Problem: LeetCode[\s\S]*?\*\/\r?\n(?=class Solution)/;
  if (oldHeaderRegex.test(content)) {
    return content.replace(oldHeaderRegex, getJavaHeader(id, title, difficulty));
  }

  // Case 2: standard class Solution insertion
  const classSolIdx = content.indexOf('class Solution');
  if (classSolIdx !== -1) {
    const before = content.slice(0, classSolIdx);
    const after = content.slice(classSolIdx);
    const header = getJavaHeader(id, title, difficulty);
    return before + header + after;
  }

  console.warn(`[JAVA] Could not find class Solution in: ${filePath}`);
  return null;
}

function transformCpp(content, id, title, difficulty, filePath) {
  if (content.includes('CodeByTushu')) return null;

  // Case 1: Sept 1-3 old header before class Solution
  const oldHeaderRegex = /\/\*\*[\s\S]*?\* Problem: LeetCode[\s\S]*?\*\/\r?\n(?=class Solution)/;
  if (oldHeaderRegex.test(content)) {
    return content.replace(oldHeaderRegex, getCppHeader(id, title, difficulty));
  }

  // Case 2: standard class Solution insertion
  const classSolIdx = content.indexOf('class Solution');
  if (classSolIdx !== -1) {
    const before = content.slice(0, classSolIdx);
    const after = content.slice(classSolIdx);
    const header = getCppHeader(id, title, difficulty);
    return before + header + after;
  }

  console.warn(`[CPP] Could not find class Solution in: ${filePath}`);
  return null;
}

function transformPython(content, id, title, difficulty, filePath) {
  if (content.includes('CodeByTushu')) return null;

  // Case 1: Sept 1-3 existing docstring
  const oldDocRegex = /^"""[\s\S]*?Problem: LeetCode[\s\S]*?"""\r?\n*/;
  if (oldDocRegex.test(content)) {
    return content.replace(oldDocRegex, getPythonHeader(id, title, difficulty));
  }

  // Case 1b: docstring after imports in Sept 1-3
  const midDocRegex = /"""[\s\S]*?Problem: LeetCode[\s\S]*?"""\r?\n*/;
  if (midDocRegex.test(content)) {
    // Remove the mid-docstring and place standard docstring at top
    const cleaned = content.replace(midDocRegex, '').trimStart();
    return getPythonHeader(id, title, difficulty) + cleaned;
  }

  // Case 2: prepend module docstring at top
  const header = getPythonHeader(id, title, difficulty);
  return header + content;
}

function transformJs(content, id, title, difficulty, filePath) {
  if (content.includes('CodeByTushu')) return null;

  // Case 1: July 14-16 standalone problem header at top:
  // /**\n * Problem: LeetCode ...\n */\n\n/**\n * @param ...
  const julyHeaderRegex = /^\/\*\*[\s\S]*?\* Problem: LeetCode[\s\S]*?\*\/\r?\n*/;
  if (julyHeaderRegex.test(content)) {
    // If the next comment is JSDoc, merge or replace cleanly
    const rest = content.replace(julyHeaderRegex, '');
    if (rest.startsWith('/**\n') || rest.startsWith('/**\r\n')) {
      return rest.replace(/^\/\*\*\r?\n/, getJsHeaderInsideJSDoc(id, title, difficulty));
    } else {
      return getJsHeaderBlock(id, title, difficulty) + rest;
    }
  }

  // Case 2: Sept 1-3 where Problem and @param are in the same opening /**
  const septJsRegex = /^\/\*\*[\s\S]*?\* Problem: LeetCode[\s\S]*?\*(?=\s*@param|\s*@return)/;
  if (septJsRegex.test(content)) {
    return content.replace(septJsRegex, getJsHeaderInsideJSDoc(id, title, difficulty).trimEnd() + '\n *');
  }

  // Case 3: Starts with /** (JSDoc @param)
  if (content.startsWith('/**\n') || content.startsWith('/**\r\n')) {
    return content.replace(/^\/\*\*\r?\n/, getJsHeaderInsideJSDoc(id, title, difficulty));
  }

  // Case 4: Does not start with /** (e.g. class MaxHeap, class Solution, etc.)
  return getJsHeaderBlock(id, title, difficulty) + content;
}

function run() {
  const DRY_RUN = process.argv.includes('--dry-run');
  const problems = JSON.parse(fs.readFileSync('solutions.json', 'utf8'));

  let updatedCount = 0;
  let skippedCount = 0;
  const updatedByLang = { java: 0, python: 0, cpp: 0, javascript: 0 };
  const sampleDiffs = [];

  problems.forEach(p => {
    const { id, title, difficulty } = p;

    const langs = [
      { key: 'java', transform: transformJava },
      { key: 'python', transform: transformPython },
      { key: 'cpp', transform: transformCpp },
      { key: 'javascript', transform: transformJs }
    ];

    langs.forEach(({ key, transform }) => {
      const relPath = p.languages?.[key]?.relativePath;
      if (!relPath || !fs.existsSync(relPath)) return;

      const original = fs.readFileSync(relPath, 'utf8');
      if (original.includes('CodeByTushu')) {
        skippedCount++;
        return;
      }

      const transformed = transform(original, id, title, difficulty, relPath);
      if (transformed === null) {
        console.warn(`Failed to transform ${key}: ${relPath}`);
        return;
      }

      updatedCount++;
      updatedByLang[key]++;

      if (sampleDiffs.length < 12) {
        sampleDiffs.push({
          file: relPath,
          preview: transformed.split('\n').slice(0, 15).join('\n')
        });
      }

      if (!DRY_RUN) {
        fs.writeFileSync(relPath, transformed, 'utf8');
      }
    });
  });

  console.log(`\n=== Execution Summary ===`);
  console.log(`Mode: ${DRY_RUN ? 'DRY-RUN (no files written)' : 'LIVE (files written)'}`);
  console.log(`Updated files: ${updatedCount}`);
  console.log(`Skipped (already branded): ${skippedCount}`);
  console.log(`Breakdown by language:`, updatedByLang);

  console.log(`\n=== Sample Transformed Previews ===`);
  sampleDiffs.forEach(s => {
    console.log(`\n--- [${s.file}] ---`);
    console.log(s.preview);
  });
}

if (require.main === module) {
  run();
}

module.exports = {
  transformJava,
  transformCpp,
  transformPython,
  transformJs,
  getJavaHeader,
  getPythonHeader,
  getCppHeader,
  getJsHeaderBlock,
  getJsHeaderInsideJSDoc
};
