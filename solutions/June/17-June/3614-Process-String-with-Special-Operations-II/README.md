# LeetCode 3614: Process String with Special Operations II

- **Publication Date:** 17 June 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/process-string-with-special-operations-ii/](https://leetcode.com/problems/process-string-with-special-operations-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/TleL2gNlTAo?si=-TyNaAkuPteJLONx)

---

## Problem Summary

You are given a string `s` consisting of lowercase English letters and the special characters: `'*'`, `'#'`, and `'%'`.
You are also given an integer `k`.

Build a new string `result` by processing `s` according to the following rules from left to right:
- If the letter is a **lowercase English letter**, append it to `result`.
- A `'*'` removes the last character from `result`, if it exists.
- A `'#'` duplicates the current `result` and appends it to itself.
- A `'%'` reverses the current `result`.

Return the $k^{\text{th}}$ character of the final string `result` (0-indexed). If $k$ is out of the bounds of `result`, return `'.'`.

---

### Examples

#### Example 1:
- **Input:** `s = "a#b%*", k = 1`
- **Output:** `"a"`
- **Explanation:**

| Step $i$ | Character `s[i]` | Operation | String `result` | Length |
|:---:|:---:|:---|:---:|:---:|
| 0 | `'a'` | Append `'a'` | `"a"` | 1 |
| 1 | `'#'` | Duplicate `result` | `"aa"` | 2 |
| 2 | `'b'` | Append `'b'` | `"aab"` | 3 |
| 3 | `'%'` | Reverse `result` | `"baa"` | 3 |
| 4 | `'*'` | Remove last character | `"ba"` | 2 |

Final string `result` is `"ba"`.
- Index 0: `'b'`
- Index 1: `'a'`

The character at index $k = 1$ is `'a'`.

---

### Constraints

- $1 \le s.\text{length} \le 10^5$
- `s` consists of lowercase English letters and special characters `'*'`, `'#'`, and `'%'`.
- $0 \le k \le 10^{15}$

---

## Algorithmic Approach

### 1. Why Direct Simulation Fails
In this Hard version of the problem, the duplicate operation `'#'` doubles the string length each time it occurs. After only 50 to 60 duplications, the string length exceeds $10^{15}$, making it impossible to construct or store the full string in memory.

### 2. Forward Length Calculation Pass
Instead of building the string, we simulate only its length at each operation:
- Let `cur` denote the length of the string after operation $i$.
- **Lowercase letter (`'a'` - `'z'`):** Length increments by 1 (`cur++`).
- **Remove last (`'*'`):** If `cur > 0`, length decrements by 1 (`cur--`).
- **Duplicate (`'#'`):** Length doubles (`cur = cur * 2`). Because $k \le 10^{15}$, we cap `cur` at $10^{15} + 5$ to prevent integer overflow while preserving correctness.
- **Reverse (`'%'`):** Length remains unchanged.
- Record `len[i] = cur` for all $i \in [0, n - 1]$.

If $k \ge \text{final length}$, the index $k$ is out of bounds, so we return `'.'`.

### 3. Backward Coordinate Inversion Pass
Knowing the valid target index $k$, we trace backward from the last operation $i = n - 1$ down to $0$:
Let `before = (i == 0) ? 0 : len[i - 1]` be the length of the string immediately before operation $i$:
1. **Lowercase letter (`'a'` - `'z'`):**
   - This character was appended at index `before`.
   - If our target index $k == before$, this appended character is precisely the character sought! Return `s[i]`.
2. **Remove last (`'*'`):**
   - The character at `before - 1` was removed. Because $k < len[i] = before - 1$, the character at index $k$ was untouched by this deletion. No transformation needed.
3. **Duplicate (`'#'`):**
   - The string of length `before` was appended to itself.
   - If $k \ge before$, the target position was in the second half (the duplicate), which corresponds to index $k - before$ in the first half. Update $k \leftarrow k - before$.
4. **Reverse (`'%'`):**
   - The entire string of length `before` was reversed.
   - The character at index $k$ originated from index $before - 1 - k$ prior to reversal. Update $k \leftarrow before - 1 - k$.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N)$ | We execute two linear passes: a forward pass to compute lengths and a backward pass to trace index $k$. Each step performs $\mathcal{O}(1)$ arithmetic. |
| **Auxiliary Space** | $\mathcal{O}(N)$ | We store the length array `len` of size $N$ using 64-bit integers. |

---

## Multi-Language Implementations

### Java
```java
class Solution {
    public char processStr(String s, long k) {

        int n = s.length();
        long[] len = new long[n];

        long cur = 0;

        // Calculate final length after every operation
        for (int i = 0; i < n; i++) {
            char ch = s.charAt(i);

            if (ch >= 'a' && ch <= 'z') {
                cur++;
            } else if (ch == '*') {
                if (cur > 0) cur--;
            } else if (ch == '#') {
                cur = Math.min(cur * 2, (long) 1e15 + 5);
            } else { // '%'
                // length unchanged
            }

            len[i] = cur;
        }

        if (k >= cur) {
            return '.';
        }

        // Work backwards
        for (int i = n - 1; i >= 0; i--) {

            char ch = s.charAt(i);
            long before = (i == 0) ? 0 : len[i - 1];

            if (ch >= 'a' && ch <= 'z') {

                if (k == before) {
                    return ch;
                }

            } else if (ch == '*') {

                // Removed last character.
                // Existing indices stay unchanged.

            } else if (ch == '#') {

                if (before > 0 && k >= before) {
                    k -= before;
                }

            } else { // '%'

                if (before > 0) {
                    k = before - 1 - k;
                }
            }
        }

        return '.';
    }
}
```

### Python
```python
class Solution:
    def processStr(self, s: str, k: int) -> str:
        n = len(s)
        length = [0] * n
        cur = 0

        # Calculate final length after every operation
        for i, ch in enumerate(s):
            if 'a' <= ch <= 'z':
                cur += 1
            elif ch == '*':
                if cur > 0:
                    cur -= 1
            elif ch == '#':
                cur = min(cur * 2, 10**15 + 5)
            # '%' does not change length
            length[i] = cur

        if k >= cur:
            return '.'

        # Work backwards
        for i in range(n - 1, -1, -1):
            ch = s[i]
            before = 0 if i == 0 else length[i - 1]

            if 'a' <= ch <= 'z':
                if k == before:
                    return ch
            elif ch == '*':
                # Removed last character; existing indices stay unchanged.
                pass
            elif ch == '#':
                if before > 0 and k >= before:
                    k -= before
            elif ch == '%':
                if before > 0:
                    k = before - 1 - k

        return '.'
```

### C++
```cpp
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    char processStr(string s, long long k) {
        int n = s.length();
        vector<long long> len(n);
        long long cur = 0;

        // Calculate final length after every operation
        for (int i = 0; i < n; i++) {
            char ch = s[i];
            if (ch >= 'a' && ch <= 'z') {
                cur++;
            } else if (ch == '*') {
                if (cur > 0) cur--;
            } else if (ch == '#') {
                cur = min(cur * 2, (long long)1e15 + 5);
            } else { // '%'
                // length unchanged
            }
            len[i] = cur;
        }

        if (k >= cur) {
            return '.';
        }

        // Work backwards
        for (int i = n - 1; i >= 0; i--) {
            char ch = s[i];
            long long before = (i == 0) ? 0 : len[i - 1];

            if (ch >= 'a' && ch <= 'z') {
                if (k == before) {
                    return ch;
                }
            } else if (ch == '*') {
                // Removed last character; existing indices stay unchanged.
            } else if (ch == '#') {
                if (before > 0 && k >= before) {
                    k -= before;
                }
            } else { // '%'
                if (before > 0) {
                    k = before - 1 - k;
                }
            }
        }

        return '.';
    }
};
```

### JavaScript
```javascript
/**
 * @param {string} s
 * @param {number} k
 * @return {character}
 */
var processStr = function(s, k) {
    const n = s.length;
    const len = new Array(n);
    let cur = 0;

    // Calculate final length after every operation
    for (let i = 0; i < n; i++) {
        const ch = s[i];

        if (ch >= 'a' && ch <= 'z') {
            cur++;
        } else if (ch === '*') {
            if (cur > 0) cur--;
        } else if (ch === '#') {
            cur = Math.min(cur * 2, 1e15 + 5);
        } else { // '%'
            // length unchanged
        }

        len[i] = cur;
    }

    if (k >= cur) {
        return '.';
    }

    // Work backwards
    for (let i = n - 1; i >= 0; i--) {
        const ch = s[i];
        const before = (i === 0) ? 0 : len[i - 1];

        if (ch >= 'a' && ch <= 'z') {
            if (k === before) {
                return ch;
            }
        } else if (ch === '*') {
            // Removed last character; existing indices stay unchanged.
        } else if (ch === '#') {
            if (before > 0 && k >= before) {
                k -= before;
            }
        } else { // '%'
            if (before > 0) {
                k = before - 1 - k;
            }
        }
    }

    return '.';
};
```

---

<p align="center">
  <a href="../16-June/3612-Process-String-with-Special-Operations-I/"><strong>⬅️ Previous Problem (16 June: #3612)</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../README.md"><strong>🌊 June 2026 Archive</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../../README.md"><strong>🗂️ All Solutions Archive</strong></a>
</p>
