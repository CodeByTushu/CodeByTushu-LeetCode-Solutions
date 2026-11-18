# LeetCode 2914: Minimum Number of Changes to Make Binary String Beautiful

- **Publication Date:** 18 November 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-number-of-changes-to-make-binary-string-beautiful/](https://leetcode.com/problems/minimum-number-of-changes-to-make-binary-string-beautiful/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/V9h3WfOHQ1U)

---

## 💡 Problem Summary

You are given a **0-indexed** binary string `s` having an **even** length.

A string is **beautiful** if it is possible to partition it into one or more substrings such that:
- Each substring has an **even length**.
- Each substring contains **only `'1'`s or only `'0'`s**.

You can change any character in `s` to `'0'` or `'1'`.

Return the **minimum** number of changes required to make the string `s` beautiful.

---

### 🧪 Examples

#### Example 1:
- **Input:** `s = "1001"`
- **Output:** `2`
- **Explanation:**
  - We change `s[1]` to `'1'` and `s[3]` to `'0'` to get `"1100"`.
  - `"1100"` is beautiful because we can partition it into `"11"` and `"00"`, each of even length and uniform characters.
  - 2 is the minimum number of changes needed.

#### Example 2:
- **Input:** `s = "10"`
- **Output:** `1`
- **Explanation:**
  - We change `s[1]` to `'1'` to get `"11"`, which is beautiful as a single partition `"11"`.

#### Example 3:
- **Input:** `s = "0000"`
- **Output:** `0`
- **Explanation:**
  - `"0000"` is already beautiful (single even-length partition of all `'0'`s).

---

### 🔒 Constraints

- $2 \le \text{s.length} \le 10^5$
- `s` has an **even** length.
- `s[i]` is either `'0'` or `'1'`.

---

## 🧠 Algorithmic Approach & Key Observations

### 1. Decomposition into Disjoint Pairs of Length 2
Every even-length uniform substring (length $2, 4, 6, \dots$) can itself be cleanly subdivided into consecutive blocks of **length 2**, where every pair is either `"00"` or `"11"`.

Conversely, if we partition `s` into $n / 2$ adjacent non-overlapping pairs:
$$(s[0], s[1]),\ (s[2], s[3]),\ \dots,\ (s[n - 2], s[n - 1])$$
and ensure that every pair has identical characters (`s[i] == s[i + 1]`), then the entire string is automatically valid—even if adjacent pairs have different values (`"00"` followed by `"11"`), each pair is a valid even-length uniform partition!

### 2. Greedy Optimality Proof
- Consider any block $(s[2k], s[2k + 1])$:
  - If $s[2k] == s[2k + 1]$ (`"00"` or `"11"`), **0 changes** are needed.
  - If $s[2k] \ne s[2k + 1]$ (`"01"` or `"10"`), **at least 1 change** is strictly necessary because any valid partition into even-length substrings must place indices $2k$ and $2k + 1$ inside the **same** substring (since every preceding substring has an even length, every substring starts at an even index and ends at an odd index).
- Flipping either character of a mismatched pair takes exactly **1 change** and resolves that pair completely without imposing any constraint on neighboring pairs.
- Therefore, the minimum total number of changes equals the count of mismatched adjacent pairs at even indices $i = 0, 2, 4, \dots, n - 2$.

---

## ⏱️ Complexity Analysis

| Metric | Complexity | Description |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(n)$ | We make a single linear pass through the string stepping by $2$, inspecting $n / 2$ pairs in total. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Only a single integer counter `changes` and loop index `i` are maintained with no extra data structures. |

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
/**
 * Problem: LeetCode 2914 - Minimum Number of Changes to Make Binary String Beautiful
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

class Solution {
    public int minChanges(String s) {
        int changes = 0;

        for (int i = 0; i < s.length(); i += 2) {
            if (s.charAt(i) != s.charAt(i + 1)) {
                changes++;
            }
        }

        return changes;
    }
}
```

### 🐍 Python (Python 3)
```python
"""
Problem: LeetCode 2914 - Minimum Number of Changes to Make Binary String Beautiful
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""


class Solution:
    def minChanges(self, s: str) -> int:
        changes = 0

        for i in range(0, len(s), 2):
            if s[i] != s[i + 1]:
                changes += 1

        return changes
```

### ⚡ C++ (C++20)
```cpp
/**
 * Problem: LeetCode 2914 - Minimum Number of Changes to Make Binary String Beautiful
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <string>

using namespace std;

class Solution {
public:
    int minChanges(string s) {
        int changes = 0;

        for (int i = 0; i < (int)s.length(); i += 2) {
            if (s[i] != s[i + 1]) {
                changes++;
            }
        }

        return changes;
    }
};
```

### 🌐 JavaScript (Node.js / ES2022)
```javascript
/**
 * Problem: LeetCode 2914 - Minimum Number of Changes to Make Binary String Beautiful
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} s
 * @return {number}
 */
var minChanges = function(s) {
    let changes = 0;

    for (let i = 0; i < s.length; i += 2) {
        if (s[i] !== s[i + 1]) {
            changes++;
        }
    }

    return changes;
};
```

---

## 🔗 Quick Navigation

- ⬅️ [Back to November 2026 Archive](../../README.md)
- 🏠 [Main Repository](../../../../README.md)
- 🌐 [Official Live Platform — CodeByTushu](https://codebytushu.com/Leetcode/)
