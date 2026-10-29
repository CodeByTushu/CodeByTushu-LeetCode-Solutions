# LeetCode 1888: Minimum Number of Flips to Make the Binary String Alternating

- **Publication Date:** 07 March 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-number-of-flips-to-make-the-binary-string-alternating/](https://leetcode.com/problems/minimum-number-of-flips-to-make-the-binary-string-alternating/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

You are given a binary string `s`. You are allowed to perform two types of operations on the string in any sequence:
- **Type-1:** Remove the character at the start of the string `s` and append it to the end of the string.
- **Type-2:** Pick any character in `s` and flip its value, i.e., if its value is `'0'` it becomes `'1'` and vice-versa.

Return the **minimum number of type-2 operations** (flips) you need to perform such that `s` becomes **alternating**.

A string is called **alternating** if no two adjacent characters are equal (e.g., `"010"` and `"1010"` are alternating, while `"0100"` is not).

---

### Examples

#### Example 1:
- **Input:** `s = "111000"`
- **Output:** `2`
- **Explanation:** Use the first operation two times to make `s = "100011"`. Then, use the second operation on the third and sixth elements to make `s = "101010"`.

#### Example 2:
- **Input:** `s = "010"`
- **Output:** `0`
- **Explanation:** The string is already alternating.

#### Example 3:
- **Input:** `s = "1110"`
- **Output:** `1`
- **Explanation:** Use the second operation on the second element to make `s = "1010"`.

---

### Constraints

- `1 <= s.length <= 10^5`
- `s[i]` is either `'0'` or `'1'`.

---

## Topics and Tags

- **Primary Tags:** String, Sliding Window
- **Secondary Tags:** Greedy

---

## Detailed Algorithm Walkthrough

### 1. Representing Type-1 Operations (Rotations)

Operation 1 allows us to move characters from the prefix to the suffix, effectively generating every circular shift of `s`.
A classic and powerful technique to examine all circular shifts of a string of length $n$ is to consider the concatenated string:
$$\text{doubled} = s + s$$
Every possible cyclic shift of `s` corresponds to a unique contiguous substring of length $n$ starting at some index $0 \le \text{start} < n$ within $s + s$.

### 2. Target Alternating Patterns

For any binary string, there are only two alternating templates:
- **Pattern 1:** Starts with `'0'` $\implies$ `"01010101..."` where character at index $i$ is `'0'` if $i$ is even and `'1'` if $i$ is odd.
- **Pattern 2:** Starts with `'1'` $\implies$ `"10101010..."` where character at index $i$ is `'1'` if $i$ is even and `'0'` if $i$ is odd.

When evaluating a substring of length $n$ within $s + s$, the number of type-2 operations required to match either pattern is simply the count of mismatches between the substring and that pattern.

### 3. Fixed-Size Sliding Window Strategy

Instead of recalculating mismatches from scratch for each of the $n$ rotations (which would require $\mathcal{O}(n^2)$ time), we maintain a **sliding window of fixed size $n$** across $2n$ characters:

1. Maintain two mismatch counters:
   - `diff1`: Mismatches with Pattern 1 (`"0101..."`)
   - `diff2`: Mismatches with Pattern 2 (`"1010..."`)
2. As index $i$ advances from $0$ to $2n - 1$:
   - Look up character `s[i % n]` (without creating a new allocated string).
   - If `s[i % n]` differs from Pattern 1 at position $i$, increment `diff1`.
   - If `s[i % n]` differs from Pattern 2 at position $i$, increment `diff2`.
3. When the window size exceeds $n$ ($i \ge n$):
   - The element leaving the window is at index $i - n$.
   - Decrement `diff1` and `diff2` if the outgoing character mismatched the respective pattern at index $i - n$.
4. Whenever the window reaches size $n$ ($i \ge n - 1$):
   - Record the answer as $\min(\text{ans}, \text{diff1}, \text{diff2})$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$, where $n$ is the length of string `s`. The sliding window iterates through $2n$ positions, performing $\mathcal{O}(1)$ constant-time increment/decrement operations at each step.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$. By utilizing modular indexing (`i % n`), we simulate the doubled string without allocating extra memory.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 1888 - Minimum Number of Flips to Make the Binary String Alternating
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int minFlips(String s) {
        int n = s.length();
        int diff1 = 0; // Mismatches with alternating pattern starting with '0'
        int diff2 = 0; // Mismatches with alternating pattern starting with '1'
        int minFlips = n;

        // Simulate sliding window of length n over virtual doubled string (s + s)
        for (int i = 0; i < 2 * n; i++) {
            char curr = s.charAt(i % n);
            char target1 = (i % 2 == 0) ? '0' : '1';
            char target2 = (i % 2 == 0) ? '1' : '0';

            if (curr != target1) diff1++;
            if (curr != target2) diff2++;

            // Shrink window if it exceeds length n
            if (i >= n) {
                char out = s.charAt((i - n) % n);
                char outTarget1 = ((i - n) % 2 == 0) ? '0' : '1';
                char outTarget2 = ((i - n) % 2 == 0) ? '1' : '0';

                if (out != outTarget1) diff1--;
                if (out != outTarget2) diff2--;
            }

            // Once window reaches size n, record the minimum flips
            if (i >= n - 1) {
                minFlips = Math.min(minFlips, Math.min(diff1, diff2));
            }
        }

        return minFlips;
    }
}
```

### Python
```python
"""
Problem: LeetCode 1888 - Minimum Number of Flips to Make the Binary String Alternating
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

class Solution:
    def minFlips(self, s: str) -> int:
        n = len(s)
        diff1 = 0  # Mismatches with pattern starting with '0' ("010101...")
        diff2 = 0  # Mismatches with pattern starting with '1' ("101010...")
        min_flips = n

        # Slide a window of length n over virtual doubled string s + s
        for i in range(2 * n):
            curr = s[i % n]
            t1 = '0' if i % 2 == 0 else '1'
            t2 = '1' if i % 2 == 0 else '0'

            if curr != t1:
                diff1 += 1
            if curr != t2:
                diff2 += 1

            # Remove character going out of window
            if i >= n:
                out = s[(i - n) % n]
                out_t1 = '0' if (i - n) % 2 == 0 else '1'
                out_t2 = '1' if (i - n) % 2 == 0 else '0'

                if out != out_t1:
                    diff1 -= 1
                if out != out_t2:
                    diff2 -= 1

            # Window of length n reached
            if i >= n - 1:
                min_flips = min(min_flips, diff1, diff2)

        return min_flips
```

### C++
```cpp
/**
 * Problem: LeetCode 1888 - Minimum Number of Flips to Make the Binary String Alternating
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minFlips(string s) {
        int n = s.length();
        int diff1 = 0; // Mismatches with pattern starting with '0'
        int diff2 = 0; // Mismatches with pattern starting with '1'
        int minFlips = n;

        // Slide window of length n across virtual concatenated string s + s
        for (int i = 0; i < 2 * n; i++) {
            char curr = s[i % n];
            char target1 = (i % 2 == 0) ? '0' : '1';
            char target2 = (i % 2 == 0) ? '1' : '0';

            if (curr != target1) diff1++;
            if (curr != target2) diff2++;

            if (i >= n) {
                char out = s[(i - n) % n];
                char outTarget1 = ((i - n) % 2 == 0) ? '0' : '1';
                char outTarget2 = ((i - n) % 2 == 0) ? '1' : '0';

                if (out != outTarget1) diff1--;
                if (out != outTarget2) diff2--;
            }

            if (i >= n - 1) {
                minFlips = min({minFlips, diff1, diff2});
            }
        }

        return minFlips;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 1888 - Minimum Number of Flips to Make the Binary String Alternating
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} s
 * @return {number}
 */
var minFlips = function(s) {
    const n = s.length;
    let diff1 = 0; // Mismatches with pattern starting with '0'
    let diff2 = 0; // Mismatches with pattern starting with '1'
    let minFlips = n;

    // Slide window of length n over virtual doubled string
    for (let i = 0; i < 2 * n; i++) {
        const curr = s[i % n];
        const target1 = (i % 2 === 0) ? '0' : '1';
        const target2 = (i % 2 === 0) ? '1' : '0';

        if (curr !== target1) diff1++;
        if (curr !== target2) diff2++;

        if (i >= n) {
            const out = s[(i - n) % n];
            const outTarget1 = ((i - n) % 2 === 0) ? '0' : '1';
            const outTarget2 = ((i - n) % 2 === 0) ? '1' : '0';

            if (out !== outTarget1) diff1--;
            if (out !== outTarget2) diff2--;
        }

        if (i >= n - 1) {
            minFlips = Math.min(minFlips, diff1, diff2);
        }
    }

    return minFlips;
};
```
