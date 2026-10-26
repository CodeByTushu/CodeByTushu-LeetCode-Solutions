# LeetCode 868: Binary Gap

- **Publication Date:** 22 February 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/binary-gap/](https://leetcode.com/problems/binary-gap/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

Given a positive integer `n`, find and return the longest distance between any two adjacent `1`'s in the binary representation of `n`. If there are no two adjacent `1`'s, return `0`.

Two `1`'s are considered adjacent if there are only `0`'s separating them (possibly no `0`'s). The distance between two `1`'s is the absolute difference between their bit positions.

---

### Examples

#### Example 1:
- **Input:** `n = 22`
- **Output:** `2`
- **Explanation:**
  - $22$ in binary is `10110`.
  - The set bits are located at indices 1, 2, and 4 (0-indexed from right: bits 1, 2, and 4 are `1`).
  - Distance between bit 1 and bit 2 is $2 - 1 = 1$.
  - Distance between bit 2 and bit 4 is $4 - 2 = 2$.
  - The maximum distance is $\max(1, 2) = 2$.

#### Example 2:
- **Input:** `n = 8`
- **Output:** `0`
- **Explanation:**
  - $8$ in binary is `1000`.
  - There is only one set bit, so no two adjacent `1`'s exist. The result is `0`.

#### Example 3:
- **Input:** `n = 5`
- **Output:** `2`
- **Explanation:**
  - $5$ in binary is `101`.
  - The adjacent `1`'s are at bit positions 0 and 2.
  - The distance is $2 - 0 = 2$.

---

### Constraints

- $1 \le n \le 10^9$

---

## Topics and Tags

- **Primary Tags:** Bit Manipulation
- **Secondary Tags:** Simulation

---

## Detailed Algorithm Walkthrough

### 1. Sequential Bit Inspection

Since $n \le 10^9 < 2^{30}$, the binary representation of $n$ contains at most 30 bits.

We can inspect each bit from the least significant bit (position 0) upwards:
- Maintain `currPos` initialized to `0`.
- Maintain `lastPos` initialized to `-1` (indicating that no set bit has been observed yet).
- Maintain `maxGap` initialized to `0`.

### 2. Updating Gaps on Encountering '1'

While $n > 0$:
1. Check the lowest bit: `(n & 1) == 1`.
2. If it is set:
   - If `lastPos != -1`, an adjacent pair of `1`s has just been completed! The distance between them is `currPos - lastPos`.
   - Update `maxGap = max(maxGap, currPos - lastPos)`.
   - Record `lastPos = currPos`.
3. Shift $n$ to the right by 1 bit: `n >>= 1`.
4. Increment `currPos++`.

When the loop terminates, `maxGap` holds the maximum distance between any two adjacent set bits. If $n$ contains fewer than two set bits, `maxGap` remains `0`, perfectly satisfying the problem requirements.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(\log n)$. The while loop executes at most $\lfloor \log_2 n \rfloor + 1 \le 30$ times. Each iteration performs $\mathcal{O}(1)$ bitwise operations.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$. Solved completely in-place using only three primitive integer variables (`lastPos`, `maxGap`, `currPos`).

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 868 - Binary Gap
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int binaryGap(int n) {
        int lastPos = -1;
        int maxGap = 0;
        int currPos = 0;

        while (n > 0) {
            if ((n & 1) == 1) {
                if (lastPos != -1) {
                    maxGap = Math.max(maxGap, currPos - lastPos);
                }
                lastPos = currPos;
            }
            n >>= 1;
            currPos++;
        }

        return maxGap;
    }
}
```

### Python
```python
"""
Problem: LeetCode 868 - Binary Gap
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""

class Solution:
    def binaryGap(self, n: int) -> int:
        last_pos = -1
        max_gap = 0
        curr_pos = 0

        while n > 0:
            if n & 1:
                if last_pos != -1:
                    max_gap = max(max_gap, curr_pos - last_pos)
                last_pos = curr_pos
            n >>= 1
            curr_pos += 1

        return max_gap
```

### C++
```cpp
/**
 * Problem: LeetCode 868 - Binary Gap
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <algorithm>

using namespace std;

class Solution {
public:
    int binaryGap(int n) {
        int lastPos = -1;
        int maxGap = 0;
        int currPos = 0;

        while (n > 0) {
            if (n & 1) {
                if (lastPos != -1) {
                    maxGap = max(maxGap, currPos - lastPos);
                }
                lastPos = currPos;
            }
            n >>= 1;
            currPos++;
        }

        return maxGap;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 868 - Binary Gap
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} n
 * @return {number}
 */
var binaryGap = function(n) {
    let lastPos = -1;
    let maxGap = 0;
    let currPos = 0;

    while (n > 0) {
        if ((n & 1) === 1) {
            if (lastPos !== -1) {
                maxGap = Math.max(maxGap, currPos - lastPos);
            }
            lastPos = currPos;
        }
        n >>>= 1;
        currPos++;
    }

    return maxGap;
};
```
