# LeetCode 2124: Check if All A's Appears Before All B's

- **Publication Date:** 22 November 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/check-if-all-as-appears-before-all-bs/](https://leetcode.com/problems/check-if-all-as-appears-before-all-bs/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/XW6lICRGxH0)

---

## 💡 Problem Summary

Given a string `s` consisting of only the characters `'a'` and `'b'`, return `true` if **every** `'a'` appears before **every** `'b'` in the string. Otherwise, return `false`.

---

### 🧪 Examples

#### Example 1:
- **Input:** `s = "aaabbb"`
- **Output:** `true`
- **Explanation:**
  The `'a'` characters are located at indices $0, 1,$ and $2$, while the `'b'` characters are at indices $3, 4,$ and $5$. Hence, every `'a'` appears strictly before every `'b'`, satisfying the condition.

#### Example 2:
- **Input:** `s = "abab"`
- **Output:** `false`
- **Explanation:**
  There is an `'a'` at index $2$ and a `'b'` at index $1$. Since an `'a'` appears after a `'b'`, the condition is violated and we return `false`.

#### Example 3:
- **Input:** `s = "bbb"`
- **Output:** `true`
- **Explanation:**
  There are no `'a'` characters in the string. By definition, every `'a'` vacuously appears before every `'b'`, so the function returns `true`.

---

### 🔒 Constraints

- $1 \le \text{s.length} \le 100$
- `s[i]` is either `'a'` or `'b'`.

---

## 🧠 Algorithmic Approach & Key Observations

### 1. Invariant & The Substring Observation
A string composed entirely of `'a'` and `'b'` satisfies the condition if and only if all `'a'`s precede all `'b'`s. In regular language terms, the string must match the pattern `^a*b*$`:
- An invalid state occurs if and only if at least one `'a'` appears somewhere after a `'b'`.
- Whenever an `'a'` appears after a `'b'` in any sequence of characters, there **must** exist at least one adjacent pair where a `'b'` is immediately followed by an `'a'` (the substring `"ba"`).

### 2. Equivalence of `!s.contains("ba")`
- **Necessary Condition:** If `"ba"` appears in `s`, then an `'a'` immediately follows a `'b'`, violating the rule.
- **Sufficient Condition:** If `"ba"` does not appear anywhere in `s`, then no transition from `'b'` to `'a'` can occur. Once the first `'b'` appears, all subsequent characters must also be `'b'`. Therefore, no `'a'` can follow any `'b'`.

Hence, checking whether `s` contains the substring `"ba"` completely resolves the problem in a single elegant check.

### 3. Step-by-Step Implementation Strategy
1. **Java:** Use `!s.contains("ba")` to perform an internal linear search for `"ba"`.
2. **Python:** Check `"ba" not in s`.
3. **C++:** Verify `s.find("ba") == string::npos`.
4. **JavaScript:** Check `!s.includes("ba")`.

---

## ⏱️ Complexity Analysis

| Metric | Complexity | Description |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N)$ | Substring search algorithms inspect adjacent characters in a single linear pass of length $N$. With $N \le 100$, at most $99$ comparisons occur, running in $< 1\text{ ms}$. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Operates purely using constant stack pointers without allocating any dynamic collections or auxiliary memory. |

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
/**
 * Problem: LeetCode 2124 - Check if All A's Appears Before All B's
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public boolean checkString(String s) {
        // Agar string me kahin bhi "ba" substring exist karti hai,
        // iska matlab koi 'a' kisi 'b' ke baad aaya hai.
        return !s.contains("ba");
    }
}
```

### 🐍 Python (Python 3)
```python
"""
Problem: LeetCode 2124 - Check if All A's Appears Before All B's
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""
class Solution:
    def checkString(self, s: str) -> bool:
        # Agar "ba" substring present hai, toh 'a' kisi 'b' ke baad appear ho raha hai
        return "ba" not in s
```

### ⚡ C++ (C++20)
```cpp
/**
 * Problem: LeetCode 2124 - Check if All A's Appears Before All B's
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>

using namespace std;

class Solution {
public:
    bool checkString(string s) {
        // Agar string me "ba" substring nahi milti (find returns npos), toh true
        return s.find("ba") == string::npos;
    }
};
```

### 🌐 JavaScript (Node.js ES2022)
```javascript
/**
 * Problem: LeetCode 2124 - Check if All A's Appears Before All B's
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * @param {string} s
 * @return {boolean}
 */
var checkString = function(s) {
    // Agar "ba" substring present nahi hai toh return true
    return !s.includes("ba");
};
```
