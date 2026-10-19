# LeetCode 1189: Maximum Number of Balloons

- **Publication Date:** 22 June 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/maximum-number-of-balloons/](https://leetcode.com/problems/maximum-number-of-balloons/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/sTxKOFHh_TU?si=LpG6fYcoAY3GpPq_)

---

## Problem Summary

Given a string `text`, you want to use the characters of `text` to form as many instances of the word `"balloon"` as possible.

You can use each character in `text` at most once. Return the maximum number of instances that can be formed.

---

### Examples

#### Example 1:
- **Input:** `text = "nlaebolko"`
- **Output:** `1`
- **Explanation:** We can pick `'b'`, `'a'`, `'l'`, `'l'`, `'o'`, `'o'`, `'n'` from the text to form 1 instance of `"balloon"`.

#### Example 2:
- **Input:** `text = "loonbalxballpoon"`
- **Output:** `2`
- **Explanation:** We can form at most 2 instances of `"balloon"`.

#### Example 3:
- **Input:** `text = "leetcode"`
- **Output:** `0`
- **Explanation:** There are no `'b'` or `'a'` characters in `text`, so 0 instances can be formed.

---

### Constraints

- $1 \le \text{text.length} \le 10^4$
- `text` consists of lowercase English letters only.

---

## Algorithmic Approach

### Character Frequency Counting & Bottleneck Calculation

1. **Character Requirements of `"balloon"`:**
   - The target word `"balloon"` consists of:
     - `'b'` : $1$
     - `'a'` : $1$
     - `'l'` : $2$
     - `'o'` : $2$
     - `'n'` : $1$

2. **Frequency Array:**
   - Maintain a fixed-size frequency array `freq` of size $26$ representing the counts of lowercase English letters `'a'` through `'z'`.
   - Traverse the input string `text` character by character and increment `freq[ch - 'a']++`.

3. **Bottleneck Minimum Calculation:**
   - Each complete `"balloon"` requires 1 `'b'`, 1 `'a'`, 2 `'l'`s, 2 `'o'`s, and 1 `'n'`.
   - Hence, the maximum number of words we can form is limited by the rarest required character (the bottleneck):
     $$\text{ans} = \min\left(\text{freq}[\text{'b'}],\; \text{freq}[\text{'a'}],\; \left\lfloor \frac{\text{freq}[\text{'l'}]}{2} \right\rfloor,\; \left\lfloor \frac{\text{freq}[\text{'o'}]}{2} \right\rfloor,\; \text{freq}[\text{'n'}]\right)$$

4. **Result:**
   - Return the calculated minimum value.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N)$ | Counting frequencies requires a single linear pass over the string `text` of length $N$. The bottleneck calculation operates in $\mathcal{O}(1)$ time. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | A fixed-size array of 26 integers is used regardless of the input size $N$. |

---

## Multi-Language Implementations

### Java
```java
class Solution {
    public int maxNumberOfBalloons(String text) {
        int[] freq = new int[26];

        // Count frequency of each character
        for (char ch : text.toCharArray()) {
            freq[ch - 'a']++;
        }

        // "balloon" -> b=1, a=1, l=2, o=2, n=1
        return Math.min(
                Math.min(freq['b' - 'a'], freq['a' - 'a']),
                Math.min(
                        Math.min(freq['l' - 'a'] / 2, freq['o' - 'a'] / 2),
                        freq['n' - 'a']
                )
        );
    }
}
```

### Python
```python
class Solution:
    def maxNumberOfBalloons(self, text: str) -> int:
        freq = [0] * 26

        # Count frequency of each character
        for ch in text:
            freq[ord(ch) - ord('a')] += 1

        # "balloon" -> b=1, a=1, l=2, o=2, n=1
        return min(
            freq[ord('b') - ord('a')],
            freq[ord('a') - ord('a')],
            freq[ord('l') - ord('a')] // 2,
            freq[ord('o') - ord('a')] // 2,
            freq[ord('n') - ord('a')]
        )
```

### C++
```cpp
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maxNumberOfBalloons(string text) {
        vector<int> freq(26, 0);

        // Count frequency of each character
        for (char ch : text) {
            freq[ch - 'a']++;
        }

        // "balloon" -> b=1, a=1, l=2, o=2, n=1
        return min({
            freq['b' - 'a'],
            freq['a' - 'a'],
            freq['l' - 'a'] / 2,
            freq['o' - 'a'] / 2,
            freq['n' - 'a']
        });
    }
};
```

### JavaScript
```javascript
/**
 * @param {string} text
 * @return {number}
 */
var maxNumberOfBalloons = function(text) {
    const freq = new Int32Array(26);

    // Count frequency of each character
    for (let i = 0; i < text.length; i++) {
        freq[text.charCodeAt(i) - 97]++;
    }

    // "balloon" -> b=1, a=1, l=2, o=2, n=1
    const b = freq['b'.charCodeAt(0) - 97];
    const a = freq['a'.charCodeAt(0) - 97];
    const l = Math.floor(freq['l'.charCodeAt(0) - 97] / 2);
    const o = Math.floor(freq['o'.charCodeAt(0) - 97] / 2);
    const n = freq['n'.charCodeAt(0) - 97];

    return Math.min(b, a, l, o, n);
};
```

---

<p align="center">
  <a href="../21-June/1833-Maximum-Ice-Cream-Bars/"><strong>⬅️ Previous Problem (21 June: #1833)</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../README.md"><strong>🌊 June 2026 Archive</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../../README.md"><strong>🗂️ All Solutions Archive</strong></a>
</p>
