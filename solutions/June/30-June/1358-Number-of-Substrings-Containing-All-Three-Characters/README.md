# LeetCode 1358: Number of Substrings Containing All Three Characters

- **Publication Date:** 30 June 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/](https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/e0_8x22SCec?si=3QlIwBqS3z5o1faO)

---

## Problem Summary

Given a string `s` consisting only of characters `'a'`, `'b'`, and `'c'`.

Return the **number of substrings** containing **at least** one occurrence of all these characters `'a'`, `'b'`, and `'c'`.

---

### Examples

#### Example 1:
- **Input:** `s = "abcabc"`
- **Output:** `10`
- **Explanation:** The substrings containing at least one occurrence of characters `'a'`, `'b'`, and `'c'` are:
  - Starting at index 0: `"abc"`, `"abca"`, `"abcab"`, `"abcabc"` (4 substrings)
  - Starting at index 1: `"bca"`, `"bcab"`, `"bcabc"` (3 substrings)
  - Starting at index 2: `"cab"`, `"cabc"` (2 substrings)
  - Starting at index 3: `"abc"` (1 substring)
  - Total = $4 + 3 + 2 + 1 = 10$.

#### Example 2:
- **Input:** `s = "aaacb"`
- **Output:** `3`
- **Explanation:** The substrings containing at least one occurrence of `'a'`, `'b'`, and `'c'` are `"aaacb"`, `"aacb"`, and `"acb"`.

#### Example 3:
- **Input:** `s = "abc"`
- **Output:** `1`
- **Explanation:** Only `"abc"` itself contains all three characters.

---

### Constraints

- $3 \le s.\text{length} \le 5 \times 10^4$
- `s` consists only of characters `'a'`, `'b'`, and `'c'`.

---

## Algorithmic Approach

### Sliding Window / Two-Pointer Technique

1. **State & Frequency Counter:**
   - Maintain a frequency array `count` of size `3` tracking occurrences of `'a'`, `'b'`, and `'c'` in the current window.
   - Maintain two pointers: `left = 0` and `right` iterating from `0` to $n - 1$.

2. **Window Expansion & Invariant:**
   - Expand `right`, incrementing `count[s[right] - 'a']`.
   - A window `s[left..right]` is valid whenever `count[0] > 0 && count[1] > 0 && count[2] > 0`.
   - **Crucial Observation:** If `s[left..right]` already contains all three characters, then appending *any* characters up to the end of the string will keep all three characters present!
   - Thus, every substring starting at index `left` with an end index in the range $[\text{right}, n - 1]$ is valid.
   - The number of such valid substrings starting at index `left` is precisely:
     $$\text{valid substrings} = n - \text{right}$$

3. **Window Shrinking:**
   - Add $n - \text{right}$ to `ans`.
   - Shrink the window from the left by decrementing `count[s[left] - 'a']` and incrementing `left`.
   - Continue shrinking in a `while` loop as long as the window still contains all three characters.

4. **Linear Complexity:**
   - Both `left` and `right` traverse the string monotonically from $0$ to $n - 1$.
   - Each character is processed at most twice, guaranteeing strict $\mathcal{O}(N)$ runtime.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N)$ | The two pointers `left` and `right` advance at most $N$ times each across the string of length $N \le 5 \times 10^4$. Total operations $\le 10^5$, executing in $\approx 5\text{ ms}$. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Fixed-size array `count[3]` and primitive pointer variables require constant extra space. |

---

## Multi-Language Implementations

### Java
```java
class Solution {
    public int numberOfSubstrings(String s) {
        int[] count = new int[3];
        int left = 0;
        int ans = 0;

        for (int right = 0; right < s.length(); right++) {
            count[s.charAt(right) - 'a']++;

            while (count[0] > 0 && count[1] > 0 && count[2] > 0) {
                ans += s.length() - right;
                count[s.charAt(left) - 'a']--;
                left++;
            }
        }

        return ans;
    }
}
```

### Python
```python
class Solution:
    def numberOfSubstrings(self, s: str) -> int:
        count = [0] * 3
        left = 0
        ans = 0
        n = len(s)

        for right in range(n):
            count[ord(s[right]) - ord('a')] += 1

            while count[0] > 0 and count[1] > 0 and count[2] > 0:
                ans += n - right
                count[ord(s[left]) - ord('a')] -= 1
                left += 1

        return ans
```

### C++
```cpp
#include <string>
#include <vector>

using namespace std;

class Solution {
public:
    int numberOfSubstrings(string s) {
        vector<int> count(3, 0);
        int left = 0;
        int ans = 0;
        int n = s.length();

        for (int right = 0; right < n; right++) {
            count[s[right] - 'a']++;

            while (count[0] > 0 && count[1] > 0 && count[2] > 0) {
                ans += n - right;
                count[s[left] - 'a']--;
                left++;
            }
        }

        return ans;
    }
};
```

### JavaScript
```javascript
/**
 * @param {string} s
 * @return {number}
 */
var numberOfSubstrings = function(s) {
    const count = [0, 0, 0];
    let left = 0;
    let ans = 0;
    const n = s.length;

    for (let right = 0; right < n; right++) {
        count[s.charCodeAt(right) - 97]++;

        while (count[0] > 0 && count[1] > 0 && count[2] > 0) {
            ans += n - right;
            count[s.charCodeAt(left) - 97]--;
            left++;
        }
    }

    return ans;
};
```

---

<p align="center">
  <a href="../29-June/1967-Number-of-Strings-That-Appear-as-Substrings-in-Word/"><strong>⬅️ Previous Problem (29 June: #1967)</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../README.md"><strong>🌊 June 2026 Archive</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../../README.md"><strong>🗂️ All Solutions Archive</strong></a>
</p>
