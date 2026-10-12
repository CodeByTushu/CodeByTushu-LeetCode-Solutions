/**
 * CodeByTushu — Repository Quality Assurance & Validation Script
 * Usage: node scripts/sync-hub.js
 */

const fs = require('fs');
const path = require('path');

console.log('⚡ CodeByTushu: Running Repository QA & Validation...\n');

const ROOT_DIR = path.resolve(__dirname, '..');
const SOLUTIONS_JSON_PATH = path.join(ROOT_DIR, 'solutions.json');

if (!fs.existsSync(SOLUTIONS_JSON_PATH)) {
    console.error('❌ Error: solutions.json not found!');
    process.exit(1);
}

let solutions = [];
try {
    const raw = fs.readFileSync(SOLUTIONS_JSON_PATH, 'utf8');
    solutions = JSON.parse(raw);
    console.log(`✅ Loaded ${solutions.length} problem records from solutions.json`);
} catch (err) {
    console.error('❌ Error parsing solutions.json:', err.message);
    process.exit(1);
}

let errorCount = 0;
const languages = ['java', 'python', 'cpp', 'javascript'];

solutions.forEach(prob => {
    console.log(`\n🔍 Validating Problem #${prob.id} — ${prob.title}:`);

    // Verify Folder
    const folder = path.join(ROOT_DIR, prob.folderPath);
    if (!fs.existsSync(folder)) {
        console.error(`  ❌ Missing problem folder: ${prob.folderPath}`);
        errorCount++;
    } else {
        console.log(`  ✓ Folder exists: ${prob.folderPath}`);
    }

    // Verify Problem README
    const readme = path.join(folder, 'README.md');
    if (!fs.existsSync(readme)) {
        console.error(`  ❌ Missing problem README: ${readme}`);
        errorCount++;
    } else {
        console.log(`  ✓ README exists`);
    }

    // Verify 4 Languages
    languages.forEach(lang => {
        const langInfo = prob.languages && prob.languages[lang];
        if (!langInfo) {
            console.error(`  ❌ Missing ${lang} configuration in JSON`);
            errorCount++;
            return;
        }
        const filePath = path.join(ROOT_DIR, langInfo.relativePath);
        if (!fs.existsSync(filePath)) {
            console.error(`  ❌ Missing ${lang} file on disk: ${langInfo.relativePath}`);
            errorCount++;
        } else {
            const size = fs.statSync(filePath).size;
            console.log(`  ✓ ${langInfo.name} (${langInfo.file}): ${size} bytes`);
        }
    });

    // Check YouTube URL Status
    if (prob.youtubeUrl) {
        console.log(`  ✓ YouTube Walkthrough: ${prob.youtubeUrl}`);
    } else {
        console.log(`  ℹ YouTube Walkthrough: Pending`);
    }
});

// Summary
console.log('\n----------------------------------------');
if (errorCount === 0) {
    console.log('🎉 All Quality Checks Passed! 0 Errors Found.');
} else {
    console.error(`⚠️ Found ${errorCount} error(s). Please review the logs above.`);
    process.exit(1);
}
