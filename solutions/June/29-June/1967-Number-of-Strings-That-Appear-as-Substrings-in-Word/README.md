# LeetCode 1967: Number of Strings That Appear as Substrings in Word

- **Publication Date:** 29 June 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/number-of-strings-that-appear-as-substrings-in-word/](https://leetcode.com/problems/number-of-strings-that-appear-as-substrings-in-word/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/xv20n7ZUwB4?si=jj35Jf38wbXWf_eA)

---

## Problem Summary

Given an array of strings `patterns` and a string `word`, return the **number of strings** in `patterns` that exist as a **substring** in `word`.

A **substring** is a contiguous sequence of characters within a string.

---

### Examples

#### Example 1:
- **Input:** `patterns = ["a", "abc", "bc", "d"], word = "abc"`
- **Output:** `3`
- **Explanation:**
  - `"a"` appears as a substring in `"abc"`.
  - `"abc"` appears as a substring in `"abc"`.
  - `"bc"` appears as a substring in `"abc"`.
  - `"d"` does not appear as a substring in `"abc"`.
  - Total valid patterns = `3`.

#### Example 2:
- **Input:** `patterns = ["a", "b", "c"], word = "aaaaabbbbb"`
- **Output:** `2`
- **Explanation:**
  - `"a"` appears as a substring in `"aaaaabbbbb"`.
  - `"b"` appears as a substring in `"aaaaabbbbb"`.
  - `"c"` does not appear as a substring in `"aaaaabbbbb"`.
  - Total valid patterns = `2`.

#### Example 3:
- **Input:** `patterns = ["a", "a", "a"], word = "ab"`
- **Output:** `3`
- **Explanation:** Each of the patterns appears as a substring in word `"ab"`.

---

### Constraints

- $1 \le \text{patterns.length} \le 100$
- $1 \le \text{patterns}[i]\text{.length} \le 100$
- $1 \le \text{word.length} \le 100$
- `patterns[i]` and `word` consist of lowercase English letters.

---

## Algorithmic Approach

### Linear Pattern Scan & Substring Matching

1. **Direct Traversal:**
   - Initialize an accumulator variable `count = 0`.
   - Iterate through every string `pattern` in the `patterns` array.

2. **Substring Detection:**
   - For each `pattern`, check if it exists as a contiguous substring within `word`.
   - We utilize standard native library string searching routines:
     - **Java:** `word.contains(pattern)`
     - **Python:** `pattern in word`
     - **C++:** `word.find(pattern) != string::npos`
     - **JavaScript:** `word.includes(pattern)`
   - If the condition is met, increment `count` by `1`.

3. **Termination:**
   - After testing all patterns in the array, return `count`.

Given the problem constraints ($N \le 100$ patterns, lengths $\le 100$), this direct scan executes in under $\approx 1\text{ ms}$, representing the simplest and most readable solution.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N \times M)$ or $\mathcal{O}(N \times M \times L)$ | For each of the $N$ patterns of length up to $L$, searching for it inside `word` of length $M$ takes at most $\mathcal{O}(M \times L)$ time using standard substring search algorithms. Across all patterns, total operations remain well below $10^5$, executing instantaneously. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Only a single integer counter `count` is maintained. No additional data structures or dynamic memory allocations are needed. |

---

## Multi-Language Implementations

### Java
```java
class Solution {
    public int numOfStrings(String[] patterns, String word) {
        int count = 0;

        for (String pattern : patterns) {
            if (word.contains(pattern)) {
                count++;
            }
        }

        return count;
    }
}
```

### Python
```python
from typing import List


class Solution:
    def numOfStrings(self, patterns: List[str], word: str) -> int:
        count = 0

        for pattern in patterns:
            if pattern in word:
                count += 1

        return count
```

### C++
```cpp
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    int numOfStrings(vector<string>& patterns, string word) {
        int count = 0;

        for (const string& pattern : patterns) {
            if (word.find(pattern) != string::npos) {
                count++;
            }
        }

        return count;
    }
};
```

### JavaScript
```javascript
/**
 * @param {string[]} patterns
 * @param {string} word
 * @return {number}
 */
var numOfStrings = function(patterns, word) {
    let count = 0;

    for (let pattern of patterns) {
        if (word.includes(pattern)) {
            count++;
        }
    }

    return count;
};
```

---

<p align="center">
  <a href="../28-June/1846-Maximum-Element-After-Decreasing-and-Rearranging/"><strong>⬅️ Previous Problem (28 June: #1846)</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../README.md"><strong>🌊 June 2026 Archive</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../../README.md"><strong>🗂️ All Solutions Archive</strong></a>
</p>
