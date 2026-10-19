# LeetCode 3612: Process String with Special Operations I

- **Publication Date:** 16 June 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/process-string-with-special-operations-i/](https://leetcode.com/problems/process-string-with-special-operations-i/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/cRZmZxVi3nc?si=KhMsd3PN_s4vmJFK)

---

## Problem Summary

You are given a string `s` consisting of lowercase English letters and the special characters: `*`, `#`, and `%`.

Build a new string `result` by processing `s` according to the following rules from left to right:
- If the letter is a **lowercase English letter**, append it to `result`.
- A `'*'` removes the last character from `result`, if it exists.
- A `'#'` duplicates the current `result` and appends it to itself.
- A `'%'` reverses the current `result`.

Return the final string `result` after processing all characters in `s`.

---

### Examples

#### Example 1:
- **Input:** `s = "a#b%*"`
- **Output:** `"ba"`
- **Explanation:**

| Step $i$ | Character `s[i]` | Operation | Current `result` |
|:---:|:---:|:---|:---:|
| 0 | `'a'` | Append `'a'` | `"a"` |
| 1 | `'#'` | Duplicate `result` | `"aa"` |
| 2 | `'b'` | Append `'b'` | `"aab"` |
| 3 | `'%'` | Reverse `result` | `"baa"` |
| 4 | `'*'` | Remove last character | `"ba"` |

Final string returned is `"ba"`.

---

### Constraints

- $1 \le s.\text{length} \le 100$
- `s` consists of lowercase English letters and special characters `'*'`, `'#'`, and `'%'`.

---

## Algorithmic Approach

### Direct Sequence Simulation

The rules operate sequentially from left to right on an accumulator (`result`), making direct simulation using a dynamic string or character array the most optimal and intuitive technique:

1. **Accumulator Representation:**
   - In Java: Use `StringBuilder` for efficient in-place append, delete, reverse, and duplication.
   - In Python: Use a dynamic list of characters `result = []`.
   - In C++: Use `std::string` with `push_back`, `pop_back`, and `std::reverse`.
   - In JavaScript: Use a character array with `push`, `pop`, `concat`, and `reverse`.

2. **Sequential Character Processing:**
   - **Lowercase letter (`'a'` - `'z'`):** Append the character to `result`.
   - **Backtrack (`'*'`):** If `result` is non-empty, remove its last element.
   - **Duplication (`'#'`):** Append a copy of `result` to itself (doubling its length).
   - **Reversal (`'%'`):** Reverse the sequence of characters currently in `result` in-place.

3. **Termination:**
   - After traversing all characters in `s`, return the accumulated string.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N \cdot L)$ | Appending or popping takes $\mathcal{O}(1)$ time. Duplication and reversal take $\mathcal{O}(L)$ time, where $L$ is the length of `result` at that step. Given $N \le 100$, the simulation executes in under a few milliseconds. |
| **Auxiliary Space** | $\mathcal{O}(L)$ | Space needed to store the characters of the resulting string `result`. |

---

## Multi-Language Implementations

### Java
```java
class Solution {
    public String processStr(String s) {
        StringBuilder result = new StringBuilder();

        for (char ch : s.toCharArray()) {

            if (ch >= 'a' && ch <= 'z') {
                result.append(ch);
            }
            else if (ch == '*') {
                if (result.length() > 0) {
                    result.deleteCharAt(result.length() - 1);
                }
            }
            else if (ch == '#') {
                result.append(result.toString());
            }
            else if (ch == '%') {
                result.reverse();
            }
        }

        return result.toString();
    }
}
```

### Python
```python
class Solution:
    def processStr(self, s: str) -> str:
        result = []

        for ch in s:
            if "a" <= ch <= "z":
                result.append(ch)
            elif ch == "*":
                if result:
                    result.pop()
            elif ch == "#":
                result += result
            elif ch == "%":
                result.reverse()

        return "".join(result)
```

### C++
```cpp
#include <string>
#include <algorithm>

using namespace std;

class Solution {
public:
    string processStr(string s) {
        string result = "";

        for (char ch : s) {
            if (ch >= 'a' && ch <= 'z') {
                result.push_back(ch);
            } else if (ch == '*') {
                if (!result.empty()) {
                    result.pop_back();
                }
            } else if (ch == '#') {
                result += result;
            } else if (ch == '%') {
                reverse(result.begin(), result.end());
            }
        }

        return result;
    }
};
```

### JavaScript
```javascript
/**
 * @param {string} s
 * @return {string}
 */
var processStr = function(s) {
    let result = [];

    for (let i = 0; i < s.length; i++) {
        const ch = s[i];

        if (ch >= 'a' && ch <= 'z') {
            result.push(ch);
        } else if (ch === '*') {
            if (result.length > 0) {
                result.pop();
            }
        } else if (ch === '#') {
            result = result.concat(result);
        } else if (ch === '%') {
            result.reverse();
        }
    }

    return result.join('');
};
```

---

<p align="center">
  <a href="../15-June/2095-Delete-the-Middle-Node-of-a-Linked-List/"><strong>⬅️ Previous Problem (15 June: #2095)</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../README.md"><strong>🌊 June 2026 Archive</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../../README.md"><strong>🗂️ All Solutions Archive</strong></a>
</p>
