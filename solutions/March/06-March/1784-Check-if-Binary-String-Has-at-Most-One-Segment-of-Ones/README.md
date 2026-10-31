# LeetCode 1784: Check if Binary String Has at Most One Segment of Ones

- **Publication Date:** 06 March 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/check-if-binary-String-has-at-most-one-segment-of-ones/](https://leetcode.com/problems/check-if-binary-string-has-at-most-one-segment-of-ones/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/uwKtmEBGEno?si=V4zMS3yiD9EwcuTN)

---

## Problem Summary

Given a binary string `s` **without leading zeros**, return `true` if `s` contains **at most one contiguous segment of ones**. Otherwise, return `false`.

A contiguous segment of ones is a contiguous substring consisting purely of `'1'` characters.

---

### Examples

#### Example 1:
- **Input:** `s = "1001"`
- **Output:** `false`
- **Explanation:** The string has two segments of size 1: the first at index 0 and the second at index 3.

#### Example 2:
- **Input:** `s = "110"`
- **Output:** `true`
- **Explanation:** There is only one segment of ones located at indices 0 and 1.

---

### Constraints

- `1 <= s.length <= 100`
- `s[i]` is either `'0'` or `'1'`.
- `s[0]` is `'1'`.

---

## Topics and Tags

- **Primary Tags:** String
- **Secondary Tags:** Simulation

---

## Detailed Algorithm Walkthrough

### 1. Understanding the Constraints & Leading Zero Invariant

The problem specifies that `s` contains **no leading zeros**, which directly establishes the invariant:
$$s[0] = '1'$$

Because the string always starts with `'1'`, the first contiguous segment of ones begins right at index `0`.

### 2. Identifying Multiple Segments

For a second segment of ones to exist:
1. The first segment of ones must end with a transition from `'1'` to `'0'`.
2. Following one or more `'0'` characters, there must be a transition back from `'0'` to `'1'` to start a new segment.

Such a transition from `'0'` to `'1'` corresponds directly to the substring `"01"`.

### 3. The Equivalence Condition

- If `"01"` is **present** in `s`:
  - A `'1'` occurs after a `'0'`.
  - Since $s[0] = '1'$, this means a new segment of ones has started after an earlier segment ended.
  - Therefore, the string contains **at least two** contiguous segments of ones $\implies$ return `false`.
- If `"01"` is **not present** in `s`:
  - Once a `'0'` is encountered, no subsequent `'1'` ever appears.
  - All ones in the string are clustered together from the beginning up to the first `'0'` (or the end of the string).
  - Therefore, there is **at most one** contiguous segment of ones $\implies$ return `true`.

Hence, the problem reduces down to a simple, elegant check:
$$\text{return } \neg s.\text{contains}("01")$$

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$, where $n$ is the length of string `s`. Searching for the two-character pattern `"01"` takes linear time in the worst case (with $n \le 100$, this executes in a fraction of a millisecond).
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$, as no auxiliary data structures or string duplications are required.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 1784 - Check if Binary String Has at Most One Segment of Ones
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public boolean checkOnesSegment(String s) {
        // Because s[0] == '1' (no leading zeros),
        // any second segment of ones must be preceded by at least one '0'.
        // If "01" appears anywhere in the string, there is more than one segment.
        return !s.contains("01");
    }
}
```

### Python
```python
"""
Problem: LeetCode 1784 - Check if Binary String Has at Most One Segment of Ones
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""

class Solution:
    def checkOnesSegment(self, s: str) -> bool:
        # Since s has no leading zeros, s starts with '1'.
        # A second segment of '1's would require a '0' followed by a '1' ("01").
        return "01" not in s
```

### C++
```cpp
/**
 * Problem: LeetCode 1784 - Check if Binary String Has at Most One Segment of Ones
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>

using namespace std;

class Solution {
public:
    bool checkOnesSegment(string s) {
        // Since s has no leading zeros (s[0] == '1'),
        // more than one segment of ones exists if and only if "01" is present.
        return s.find("01") == string::npos;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 1784 - Check if Binary String Has at Most One Segment of Ones
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} s
 * @return {boolean}
 */
var checkOnesSegment = function(s) {
    // Since s starts with '1' (no leading zeros),
    // a second segment of ones exists if and only if "01" appears in the string.
    return !s.includes("01");
};
```
