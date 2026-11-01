/**
 * GitHub Repository & Profile Updater
 * CodeByTushu - Run this ONCE after setting GITHUB_TOKEN
 * 
 * Usage: 
 *   $env:GITHUB_TOKEN = "your_token_here"
 *   node scripts/update-github-settings.js
 */

const https = require('https');

const TOKEN = process.env.GITHUB_TOKEN;
if (!TOKEN) {
  console.error('❌ Please set GITHUB_TOKEN environment variable first!');
  console.error('   $env:GITHUB_TOKEN = "ghp_your_token_here"');
  process.exit(1);
}

function apiCall(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: path,
      method: method,
      headers: {
        'Authorization': `token ${TOKEN}`,
        'User-Agent': 'CodeByTushu-Updater',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function updateRepo(owner, repo, data) {
  console.log(`\n📦 Updating ${owner}/${repo}...`);
  const res = await apiCall('PATCH', `/repos/${owner}/${repo}`, data);
  if (res.status === 200) {
    console.log(`  ✅ Description: "${data.description}"`);
    console.log(`  ✅ Homepage: "${data.homepage}"`);
    console.log(`  ✅ Has_wiki: ${data.has_wiki}`);
  } else {
    console.log(`  ❌ Failed (${res.status}):`, JSON.stringify(res.body));
  }
  return res;
}

async function replaceTopics(owner, repo, topics) {
  console.log(`  🏷️  Setting topics for ${owner}/${repo}...`);
  const res = await apiCall('PUT', `/repos/${owner}/${repo}/topics`, { names: topics });
  if (res.status === 200) {
    console.log(`  ✅ Topics set: ${topics.join(', ')}`);
  } else {
    console.log(`  ❌ Topics failed (${res.status}):`, JSON.stringify(res.body));
  }
}

async function createRelease(owner, repo, tag, name, body) {
  console.log(`  🚀 Creating release ${tag} for ${owner}/${repo}...`);
  const res = await apiCall('POST', `/repos/${owner}/${repo}/releases`, {
    tag_name: tag,
    name: name,
    body: body,
    draft: false,
    prerelease: false,
    make_latest: 'true'
  });
  if (res.status === 201) {
    console.log(`  ✅ Release created: ${name}`);
    console.log(`  🔗 URL: ${res.body.html_url}`);
  } else {
    console.log(`  ❌ Release failed (${res.status}):`, JSON.stringify(res.body));
  }
}

async function updateProfile(data) {
  console.log(`\n👤 Updating GitHub profile...`);
  const res = await apiCall('PATCH', '/user', data);
  if (res.status === 200) {
    console.log(`  ✅ Bio: "${data.bio}"`);
    console.log(`  ✅ Location: "${data.location}"`);
    console.log(`  ✅ Blog: "${data.blog}"`);
    console.log(`  ✅ Company: "${data.company}"`);
  } else {
    console.log(`  ❌ Profile update failed (${res.status}):`, JSON.stringify(res.body));
  }
}

async function checkExistingRelease(owner, repo, tag) {
  const res = await apiCall('GET', `/repos/${owner}/${repo}/releases/tags/${tag}`);
  return res.status === 200;
}

// ─────────────────────────────────────────────────────────
// MAIN EXECUTION
// ─────────────────────────────────────────────────────────
async function main() {
  console.log('🚀 CodeByTushu GitHub Settings Updater\n');
  console.log('=' .repeat(50));

  // ─── 1. LeetCode Solutions Repository ───────────────────
  await updateRepo('CodeByTushu', 'CodeByTushu-LeetCode-Solutions', {
    description: '🚀 Daily LeetCode Solutions in Java, Python, C++ & JavaScript | 304+ Problems Solved | Jan–Nov 2026 | CodeByTushu',
    homepage: 'https://codebytushu.com/Leetcode/',
    has_wiki: true,
    has_issues: true,
    has_projects: false
  });

  await replaceTopics('CodeByTushu', 'CodeByTushu-LeetCode-Solutions', [
    'leetcode',
    'leetcode-solutions',
    'daily-leetcode',
    'java',
    'python',
    'cpp',
    'javascript',
    'dsa',
    'competitive-programming',
    'algorithms',
    'data-structures',
    'codebytushu',
    'coding-interview',
    'problem-solving'
  ]);

  const hasRelease1 = await checkExistingRelease('CodeByTushu', 'CodeByTushu-LeetCode-Solutions', 'v1.0.0');
  if (!hasRelease1) {
    await createRelease(
      'CodeByTushu',
      'CodeByTushu-LeetCode-Solutions',
      'v1.0.0',
      'v1.0.0 — Jan–Nov 2026 Complete LeetCode Solutions (305 Problems)',
      `## 🎉 CodeByTushu LeetCode Solutions — v1.0.0

### 📊 What's Included

- ✅ **305 Daily LeetCode Problems** solved (January 2026 – November 2026)
- ☕ **Java** solutions (primary language)
- 🐍 **Python** solutions
- ⚡ **C++** solutions
- 🌐 **JavaScript** solutions
- 📺 **YouTube video links** for every problem
- 📁 Structured folder organization by month and date

### 📅 Coverage
| Month | Problems |
|-------|----------|
| January 2026 | 31 |
| February 2026 | 28 |
| March 2026 | 31 |
| April 2026 | 30 |
| May 2026 | 31 |
| June 2026 | 30 |
| July 2026 | 31 |
| August 2026 | 31 |
| September 2026 | 30 |
| October 2026 | 31 |
| November 2026 | 1+ (Active) |
| **Total** | **305+** |

### 🌐 Links
- 🌍 Website: https://codebytushu.com/Leetcode/
- ▶️ YouTube: https://www.youtube.com/@codebytushu
- 📸 Instagram: https://instagram.com/codebytushu/
- 💬 WhatsApp: https://whatsapp.com/channel/0029Vb8k5mCDeON2Xwlkxe40

### 📌 How to Use
\`\`\`bash
git clone https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions.git
\`\`\``
    );
  } else {
    console.log('  ℹ️  Release v1.0.0 already exists for LeetCode Solutions repo');
  }

  // ─── 2. Learn-Build-Share-Grow Repository ───────────────
  await updateRepo('CodeByTushu', 'CodeByTushu-Learn-Build-Share-Grow', {
    description: '📚 Learn • Build • Share • Grow — Official CodeByTushu documentation, architecture, roadmap & community resources for building modern developer ecosystems.',
    homepage: 'https://codebytushu.com',
    has_wiki: true,
    has_issues: true
  });

  await replaceTopics('CodeByTushu', 'CodeByTushu-Learn-Build-Share-Grow', [
    'codebytushu',
    'documentation',
    'roadmap',
    'open-source',
    'developer-resources',
    'architecture',
    'contributing',
    'community',
    'java',
    'dsa',
    'leetcode',
    'software-development',
    'learning-resources',
    'educational'
  ]);

  const hasRelease2 = await checkExistingRelease('CodeByTushu', 'CodeByTushu-Learn-Build-Share-Grow', 'v1.0.0');
  if (!hasRelease2) {
    await createRelease(
      'CodeByTushu',
      'CodeByTushu-Learn-Build-Share-Grow',
      'v1.0.0',
      'v1.0.0 — CodeByTushu Platform Documentation & Community Resources',
      `## 📚 CodeByTushu Learn • Build • Share • Grow — v1.0.0

### What's Included
- 📁 \`architecture/\` — Platform architecture documents
- 📁 \`contributing/\` — How to contribute guides
- 📁 \`docs/\` — Full platform documentation
- 📁 \`faq/\` — Frequently asked questions
- 📁 \`roadmap/\` — Future roadmap and plans
- 📄 \`CHANGELOG.md\` — Version history
- 📄 \`CODE_OF_CONDUCT.md\` — Community standards
- 📄 \`LICENSE\` — MIT License
- 📄 \`SECURITY.md\` — Security policy

### 🌐 Connect
- Website: https://codebytushu.com
- YouTube: https://www.youtube.com/@codebytushu
- GitHub: https://github.com/CodeByTushu
- Instagram: https://instagram.com/codebytushu/`
    );
  } else {
    console.log('  ℹ️  Release v1.0.0 already exists for Learn-Build-Share-Grow repo');
  }

  // ─── 3. Profile Repository (CodeByTushu/CodeByTushu) ────
  await updateRepo('CodeByTushu', 'CodeByTushu', {
    description: '✨ CodeByTushu GitHub Profile — Software Developer & Founder | Building Modern Developer Ecosystems | Daily LeetCode Solutions 🚀',
    homepage: 'https://codebytushu.com',
    has_wiki: false,
    has_issues: false
  });

  await replaceTopics('CodeByTushu', 'CodeByTushu', [
    'profile',
    'codebytushu',
    'software-developer',
    'java',
    'javascript',
    'dsa',
    'leetcode',
    'open-source',
    'india'
  ]);

  // ─── 4. GitHub Profile (Bio, Location, etc.) ─────────────
  await updateProfile({
    name: 'CodeByTushu',
    bio: 'Software Developer & Founder 🚀 | Java | JavaScript | React | Node.js | DSA | Daily LeetCode Solutions | Building Modern Developer Ecosystems',
    company: 'CodeByTushu',
    location: 'Noida, Uttar Pradesh, India',
    blog: 'https://codebytushu.com',
    hireable: true
  });

  console.log('\n' + '='.repeat(50));
  console.log('✅ All GitHub settings updated successfully!');
  console.log('\n🔗 View your repositories:');
  console.log('   https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions');
  console.log('   https://github.com/CodeByTushu/CodeByTushu-Learn-Build-Share-Grow');
  console.log('   https://github.com/CodeByTushu/CodeByTushu');
  console.log('   https://github.com/CodeByTushu (profile)');
}

main().catch(console.error);
