# LeetCode 2911: Minimum Changes to Make K Semi-palindromes

- **Publication Date:** 17 November 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/minimum-changes-to-make-k-semi-palindromes/](https://leetcode.com/problems/minimum-changes-to-make-k-semi-palindromes/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/-mdDEBhdJb0)

---

## 💡 Problem Summary

Given a string `s` and an integer `k`, partition `s` into `k` substrings such that the letter changes needed to make each substring a **semi-palindrome** are minimized.

Return the **minimum** number of letter changes required.

A **semi-palindrome** is a special type of string that can be divided into palindromes based on a repeating pattern:
1. Choose a positive divisor `d` of the string's length, where $1 \le d < \text{length}$. For a string of length $1$, it does not have a valid divisor per definition (since $d = \text{length}$ is not allowed), meaning a substring of length $1$ cannot be a semi-palindrome.
2. For a given divisor `d`, divide the string into `d` groups where each group contains characters following a stride pattern of length `d`:
   - Group $0$: characters at indices $0, d, 2d, \dots$
   - Group $1$: characters at indices $1, 1+d, 1+2d, \dots$
   - $\dots$
   - Group $r$: characters at indices $r, r+d, r+2d, \dots$
3. The string is considered a semi-palindrome if **every one** of these `d` groups forms a palindrome.

---

### 🧪 Examples

#### Example 1:
- **Input:** `s = "abcac"`, `k = 2`
- **Output:** `1`
- **Explanation:**
  - Divide `s` into `"ab"` and `"cac"`.
  - `"cac"` has length 3 and divisor $d = 1$: characters at positions $(0, 1, 2)$ form `"cac"`, which is already a palindrome.
  - `"ab"` has length 2 and divisor $d = 1$: change `"ab"` to `"aa"` (1 change) to become a semi-palindrome.
  - Total changes = $1$.

#### Example 2:
- **Input:** `s = "abcdef"`, `k = 2`
- **Output:** `2`
- **Explanation:**
  - Divide `s` into `"abc"` and `"def"`. Each needs 1 change to become a semi-palindrome. Total changes = $2$.

#### Example 3:
- **Input:** `s = "aabbaa"`, `k = 3`
- **Output:** `0`
- **Explanation:**
  - Divide `s` into substrings `"aa"`, `"bb"`, and `"aa"`. All three are already semi-palindromes with $d = 1$. Total changes = $0$.

---

### 🔒 Constraints

- $2 \le \text{s.length} \le 200$
- $1 \le k \le \lfloor \text{s.length} / 2 \rfloor$
- `s` contains only lowercase English letters.

---

## 🧠 Algorithmic Approach & Key Observations

### 1. Structure of a Semi-Palindrome
For any substring $s[i \dots j]$ with length $\text{len} = j - i + 1$:
- If $\text{len} = 1$, it cannot be a semi-palindrome because the only divisor is $1 = \text{len}$ (not allowed). Its cost is $\infty$.
- For $\text{len} \ge 2$, any proper divisor $d$ ($1 \le d < \text{len}$ such that $\text{len} \pmod d = 0$) partitions the substring into $d$ disjoint subsequences of length $m = \text{len} / d$.
- For each remainder $r \in [0, d - 1]$, the characters at indices $i + r + a \cdot d$ for $a \in [0, m - 1]$ must form a palindrome.
- Using two pointers $a = 0$ and $b = m - 1$, we count how many pairs differ: $s[i + r + a \cdot d] \ne s[i + r + b \cdot d]$.
- The minimum cost for substring $s[i \dots j]$ across all proper divisors $d$ is:
  $$\text{cost}[i][j] = \min_{d \mid \text{len}, d < \text{len}} \left( \sum_{r=0}^{d-1} \text{mismatches}(r, d) \right)$$

### 2. Precomputation of Substring Costs
With $n \le 200$, the total number of substrings is $\frac{n(n + 1)}{2} \le 20{,}100$. For each length $\text{len}$, the number of divisors is small ($\le 12$ for numbers up to 200). Thus, precomputing the entire `cost[n][n]` table takes:
$$\mathcal{O}\left(n^2 \sum_{d \mid \text{len}} \frac{\text{len}}{d}\right) = \mathcal{O}(n^3)$$
which requires fewer than $5 \times 10^6$ operations and executes in under $50\text{ ms}$.

### 3. Dynamic Programming for K-Partitioning
We define:
$$\text{dp}[j][p] = \text{minimum changes to partition prefix } s[0 \dots p - 1] \text{ into } j \text{ semi-palindromes}$$

- **Base Cases:**
  - $\text{dp}[0][0] = 0$
  - All other $\text{dp}[j][p] = \infty$
- **Transitions:**
  - To form $j$ substrings, each of length at least $2$, prefix length $p$ must satisfy $2j \le p \le n$.
  - The previous partition point $q$ must satisfy $2(j - 1) \le q \le p - 2$.
  - $$\text{dp}[j][p] = \min_{q} \left( \text{dp}[j - 1][q] + \text{cost}[q][p - 1] \right)$$
- **Result:**
  - $\text{dp}[k][n]$ yields the minimum letter changes.

---

## ⏱️ Complexity Analysis

| Metric | Complexity | Description |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(n^3 + k \cdot n^2)$ | Precomputing the semi-palindrome cost table takes $\mathcal{O}(n^3)$ operations. The DP state-space has $k \times n$ states with $\mathcal{O}(n)$ transitions each, taking $\mathcal{O}(k \cdot n^2)$ time. For $n \le 200$ and $k \le 100$, total operations remain $\le 8 \times 10^6$, executing in ~100 ms. |
| **Auxiliary Space** | $\mathcal{O}(n^2 + k \cdot n)$ | The 2D cost table requires an $\mathcal{O}(n^2)$ array ($200 \times 200$), and the DP table requires $\mathcal{O}(k \cdot n)$ space ($101 \times 201$), easily fitting within standard memory limits. |

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
/**
 * Problem: LeetCode 2911 - Minimum Changes to Make K Semi-palindromes
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */

class Solution {
    public int minimumChanges(String s, int k) {
        int n = s.length();
        final int INF = 1_000_000;

        int[][] cost = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                int len = j - i + 1;
                if (len == 1) {
                    cost[i][j] = INF;
                    continue;
                }

                int best = INF;
                for (int d = 1; d < len; d++) {
                    if (len % d != 0) continue;

                    int changes = 0;
                    int m = len / d;
                    for (int r = 0; r < d; r++) {
                        for (int a = 0, b = m - 1; a < b; a++, b--) {
                            if (s.charAt(i + r + a * d) != s.charAt(i + r + b * d)) {
                                changes++;
                            }
                        }
                    }
                    best = Math.min(best, changes);
                }
                cost[i][j] = best;
            }
        }

        int[][] dp = new int[k + 1][n + 1];
        for (int[] row : dp) java.util.Arrays.fill(row, INF);
        dp[0][0] = 0;

        for (int j = 1; j <= k; j++) {
            for (int p = 2 * j; p <= n; p++) {
                for (int q = 2 * (j - 1); q <= p - 2; q++) {
                    if (dp[j - 1][q] >= INF) continue;
                    dp[j][p] = Math.min(dp[j][p], dp[j - 1][q] + cost[q][p - 1]);
                }
            }
        }

        return dp[k][n];
    }
}
```

### 🐍 Python (Python 3)
```python
"""
Problem: LeetCode 2911 - Minimum Changes to Make K Semi-palindromes
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""


class Solution:
    def minimumChanges(self, s: str, k: int) -> int:
        n = len(s)
        INF = 1_000_000

        cost = [[0] * n for _ in range(n)]
        for i in range(n):
            for j in range(i, n):
                length = j - i + 1
                if length == 1:
                    cost[i][j] = INF
                    continue

                best = INF
                for d in range(1, length):
                    if length % d != 0:
                        continue
                    changes = 0
                    m = length // d
                    for r in range(d):
                        a, b = 0, m - 1
                        while a < b:
                            if s[i + r + a * d] != s[i + r + b * d]:
                                changes += 1
                            a += 1
                            b -= 1
                    if changes < best:
                        best = changes
                cost[i][j] = best

        dp = [[INF] * (n + 1) for _ in range(k + 1)]
        dp[0][0] = 0

        for j in range(1, k + 1):
            for p in range(2 * j, n + 1):
                for q in range(2 * (j - 1), p - 1):
                    if dp[j - 1][q] >= INF:
                        continue
                    if dp[j - 1][q] + cost[q][p - 1] < dp[j][p]:
                        dp[j][p] = dp[j - 1][q] + cost[q][p - 1]

        return dp[k][n]
```

### ⚡ C++ (C++20)
```cpp
/**
 * Problem: LeetCode 2911 - Minimum Changes to Make K Semi-palindromes
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */

#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minimumChanges(string s, int k) {
        int n = s.length();
        const int INF = 1000000;

        vector<vector<int>> cost(n, vector<int>(n, 0));
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                int len = j - i + 1;
                if (len == 1) {
                    cost[i][j] = INF;
                    continue;
                }

                int best = INF;
                for (int d = 1; d < len; d++) {
                    if (len % d != 0) continue;

                    int changes = 0;
                    int m = len / d;
                    for (int r = 0; r < d; r++) {
                        for (int a = 0, b = m - 1; a < b; a++, b--) {
                            if (s[i + r + a * d] != s[i + r + b * d]) {
                                changes++;
                            }
                        }
                    }
                    best = min(best, changes);
                }
                cost[i][j] = best;
            }
        }

        vector<vector<int>> dp(k + 1, vector<int>(n + 1, INF));
        dp[0][0] = 0;

        for (int j = 1; j <= k; j++) {
            for (int p = 2 * j; p <= n; p++) {
                for (int q = 2 * (j - 1); q <= p - 2; q++) {
                    if (dp[j - 1][q] >= INF) continue;
                    dp[j][p] = min(dp[j][p], dp[j - 1][q] + cost[q][p - 1]);
                }
            }
        }

        return dp[k][n];
    }
};
```

### 🌐 JavaScript (Node.js ES2022)
```javascript
/**
 * Problem: LeetCode 2911 - Minimum Changes to Make K Semi-palindromes
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var minimumChanges = function(s, k) {
    const n = s.length;
    const INF = 1_000_000;

    const cost = Array.from({ length: n }, () => new Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            const len = j - i + 1;
            if (len === 1) {
                cost[i][j] = INF;
                continue;
            }

            let best = INF;
            for (let d = 1; d < len; d++) {
                if (len % d !== 0) continue;

                let changes = 0;
                const m = Math.floor(len / d);
                for (let r = 0; r < d; r++) {
                    for (let a = 0, b = m - 1; a < b; a++, b--) {
                        if (s[i + r + a * d] !== s[i + r + b * d]) {
                            changes++;
                        }
                    }
                }
                best = Math.min(best, changes);
            }
            cost[i][j] = best;
        }
    }

    const dp = Array.from({ length: k + 1 }, () => new Array(n + 1).fill(INF));
    dp[0][0] = 0;

    for (let j = 1; j <= k; j++) {
        for (let p = 2 * j; p <= n; p++) {
            for (let q = 2 * (j - 1); q <= p - 2; q++) {
                if (dp[j - 1][q] >= INF) continue;
                dp[j][p] = Math.min(dp[j][p], dp[j - 1][q] + cost[q][p - 1]);
            }
        }
    }

    return dp[k][n];
};
```
