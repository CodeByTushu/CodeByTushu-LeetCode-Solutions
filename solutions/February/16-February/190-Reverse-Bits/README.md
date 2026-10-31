# LeetCode 190: Reverse Bits

- **Publication Date:** 16 February 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/reverse-bits/](https://leetcode.com/problems/reverse-bits/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/vMPfJ8aewI8?si=VGvxu1dHWyA7nciX)

---

## Problem Summary

Reverse bits of a given 32 bits signed/unsigned integer.

---

### Examples

#### Example 1:
- **Input:** `n = 43261596`
- **Output:** `964176192`
- **Explanation:**
  - `43261596` in binary: `00000010100101000001111010011100`
  - Reversed binary: `00111001011110000010100101000000`
  - Resulting integer: `964176192`.

#### Example 2:
- **Input:** `n = 2147483644`
- **Output:** `1073741822`
- **Explanation:**
  - `2147483644` in binary: `01111111111111111111111111111100`
  - Reversed binary: `00111111111111111111111111111110`
  - Resulting integer: `1073741822`.

---

### Constraints

- $0 \le n \le 2^{31} - 2$
- $n$ is even.

---

## Topics and Tags

- **Primary Tags:** Bit Manipulation, Divide and Conquer
- **Secondary Tags:** Simulation

---

## Detailed Algorithm Walkthrough

### 1. Bit-by-Bit Extraction and Assembly

A 32-bit integer contains 32 discrete bits indexed from $0$ (least significant bit) to $31$ (most significant bit).
To reverse the bit order:
1. Initialize an accumulator `result = 0`.
2. Iterate $32$ times (for each bit position):
   - Shift `result` to the left by 1 position: `result = (result << 1) | (n & 1)`.
   - Shift `n` logically to the right by 1 position: `n >>>= 1` (or `n >>= 1` for unsigned types).
3. After exactly 32 iterations, `result` holds the mirrored bit pattern.

---

### 2. Follow-Up Optimization: Divide and Conquer Mask Swapping

If this function is called millions of times, we can eliminate loops entirely and reverse bits in $\mathcal{O}(1)$ time using $5$ parallel bitwise mask swaps:
1. **Swap 16-bit blocks:** `n = (n >>> 16) | (n << 16)`
2. **Swap 8-bit bytes:** `n = ((n & 0xff00ff00) >>> 8) | ((n & 0x00ff00ff) << 8)`
3. **Swap 4-bit nibbles:** `n = ((n & 0xf0f0f0f0) >>> 4) | ((n & 0x0f0f0f0f) << 4)`
4. **Swap 2-bit pairs:** `n = ((n & 0xcccccccc) >>> 2) | ((n & 0x33333333) << 2)`
5. **Swap adjacent bits:** `n = ((n & 0xaaaaaaaa) >>> 1) | ((n & 0x55555555) << 1)`

---

### 3. Follow-Up Optimization: Precomputed Byte Lookup Table

For massive batch processing:
- Precompute a lookup table `table` of size $256$ ($2^8$), where `table[b]` is the 8-bit bit-reversal of byte $b$.
- Any 32-bit integer $n$ can be reversed with 4 table lookups:
  $$\text{rev}(n) = (\text{table}[n \& 0\text{xFF}] \ll 24) \mid (\text{table}[(n \gg 8) \& 0\text{xFF}] \ll 16) \mid (\text{table}[(n \gg 16) \& 0\text{xFF}] \ll 8) \mid \text{table}[(n \gg 24) \& 0\text{xFF}]$$

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(1)$. The algorithm executes a fixed loop of 32 iterations, independent of input value.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$. Uses only integer registers without memory allocation.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 190 - Reverse Bits
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
public class Solution {
    // you need treat n as an unsigned value
    public int reverseBits(int n) {
        int result = 0;
        for (int i = 0; i < 32; i++) {
            result = (result << 1) | (n & 1);
            n >>>= 1;
        }
        return result;
    }
}
```

### Python
```python
"""
Problem: LeetCode 190 - Reverse Bits
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""

class Solution:
    def reverseBits(self, n: int) -> int:
        result = 0
        for _ in range(32):
            result = (result << 1) | (n & 1)
            n >>= 1
        return result
```

### C++
```cpp
/**
 * Problem: LeetCode 190 - Reverse Bits
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <cstdint>

class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        uint32_t result = 0;
        for (int i = 0; i < 32; i++) {
            result = (result << 1) | (n & 1);
            n >>= 1;
        }
        return result;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 190 - Reverse Bits
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function(n) {
    let result = 0;
    for (let i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n >>>= 1;
    }
    return result >>> 0;
};
```
