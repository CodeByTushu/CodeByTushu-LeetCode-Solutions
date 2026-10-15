const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SOLUTIONS_DIR = path.join(ROOT_DIR, 'solutions');

const months = [
  { name: 'January', emoji: '❄️', quarter: 'Q1', season: 'Winter', days: 31, status: 'Archive / Ingesting' },
  { name: 'February', emoji: '🌸', quarter: 'Q1', season: 'Late Winter', days: 28, status: 'Archive / Ingesting' },
  { name: 'March', emoji: '🌷', quarter: 'Q1', season: 'Spring', days: 31, status: 'Archive / Ingesting' },
  { name: 'April', emoji: '🌿', quarter: 'Q2', season: 'Spring', days: 30, status: 'Archive / Ingesting' },
  { name: 'May', emoji: '☀️', quarter: 'Q2', season: 'Early Summer', days: 31, status: 'Archive / Ingesting' },
  { name: 'June', emoji: '🌊', quarter: 'Q2', season: 'Summer', days: 30, status: 'Archive / Ingesting' },
  { name: 'July', emoji: '🍉', quarter: 'Q3', season: 'Mid Summer', days: 31, status: 'Archive / Ingesting' },
  { name: 'August', emoji: '🌴', quarter: 'Q3', season: 'Late Summer', days: 31, status: 'Archive / Ingesting' },
  { name: 'September', emoji: '🍂', quarter: 'Q3', season: 'Autumn', days: 30, status: 'Archive / Transitioned to Oct' },
  { name: 'November', emoji: '🍁', quarter: 'Q4', season: 'Late Autumn', days: 30, status: 'Upcoming Series' },
  { name: 'December', emoji: '🎄', quarter: 'Q4', season: 'Winter Finale', days: 31, status: 'Upcoming Series' }
];

months.forEach(m => {
  const dir = path.join(SOLUTIONS_DIR, m.name);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const content = `# CodeByTushu — ${m.name} 2026 LeetCode Solutions Archive ${m.emoji}

<p align="center">
  <img src="../../assets/logo.png" alt="CodeByTushu Logo" width="85" height="85" style="border-radius: 50%; object-fit: cover;"/>
  <br>
  <strong>Daily Algorithmic Solutions — ${m.name} 2026 (${m.quarter})</strong>
  <br>
  <em>Clean, optimal, production-grade solutions across Java, Python, C++, and JavaScript.</em>
</p>

<p align="center">
  <a href="../../README.md"><img src="https://img.shields.io/badge/⬅️_Back_to-Main_Repository-161b22?style=for-the-badge&logo=github&logoColor=white" alt="Main Repo"/></a>
  <a href="../README.md"><img src="https://img.shields.io/badge/🗂️_Browse-All_Months_Hub-0ea5e9?style=for-the-badge&logo=safari&logoColor=white" alt="All Months"/></a>
  <a href="../October/"><img src="https://img.shields.io/badge/🎃_Active_Month-October_2026-10b981?style=for-the-badge&logo=codeforces&logoColor=white" alt="Active October"/></a>
  <a href="https://codebytushu.com/Leetcode/"><img src="https://img.shields.io/badge/Live_Platform-codebytushu.com%2FLeetcode-ffc400?style=for-the-badge&logo=google-chrome&logoColor=black" alt="Live Platform"/></a>
</p>

---

## 📊 Month Overview: ${m.name} 2026

| Attribute | Details |
| :--- | :--- |
| **Month / Quarter** | ${m.name} 2026 (${m.quarter} — ${m.season}) |
| **Status** | \`${m.status}\` |
| **Total Days** | ${m.days} Days |
| **Language Standards** | Java, Python, C++, JavaScript |
| **Current Active Month** | 👉 **[October 2026 (15 Solved Solutions)](../October/)** |

---

## 📂 Folder & Solution Structure

When new daily problems are added for ${m.name}, each problem is organized as:

\`\`\`text
solutions/${m.name}/
├── DD-${m.name}/
│   └── <Problem-ID>-<Problem-Title>/
│       ├── README.md        # Comprehensive problem statement, approach & complexity
│       ├── Solution.java    # Optimal Java implementation
│       ├── solution.py      # Pythonic solution with type annotations
│       ├── solution.cpp     # High-performance C++ solution
│       └── solution.js      # Modern ECMAScript (ES6+) implementation
\`\`\`

---

## 🗓️ Daily Solutions Index

*No daily solutions are currently queued for ${m.name}. Browse our active **[October 2026 Solutions Archive](../October/)** for complete daily code implementations.*

---

<p align="center">
  <a href="../../README.md"><strong>⬅️ Return to Main Repository</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../README.md"><strong>🗂️ View All Months Hub</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../October/"><strong>🎃 Browse October Solutions (15 Solved)</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="https://codebytushu.com/Leetcode/"><strong>🌐 Official Live Platform</strong></a>
</p>
`;

  fs.writeFileSync(path.join(dir, 'README.md'), content, 'utf8');
  console.log(`✅ Created monthly folder & README: solutions/${m.name}`);
});

console.log('\n🎉 All 11 month directories & README files generated successfully!');
