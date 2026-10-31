# LeetCode 693: Binary Number with Alternating Bits

- **Publication Date:** 18 February 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/binary-number-with-alternating-bits/](https://leetcode.com/problems/binary-number-with-alternating-bits/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/zp-G8ooihyI?si=OGkxPTeyJqKLKfyu)

---

## Problem Summary

Given a positive integer $n$, check whether it has alternating bits: namely, if two adjacent bits in its binary representation always have different values.

---

### Examples

#### Example 1:
- **Input:** `n = 5`
- **Output:** `true`
- **Explanation:**
  - Binary representation of 5 is `101`. Adjacent bits alternate between 1 and 0.

#### Example 2:
- **Input:** `n = 7`
- **Output:** `false`
- **Explanation:**
  - Binary representation of 7 is `111`. Adjacent bits are identical.

#### Example 3:
- **Input:** `n = 11`
- **Output:** `false`
- **Explanation:**
  - Binary representation of 11 is `1011`. Adjacent bits at positions 0 and 1 are both 1.

---

### Constraints

- $1 \le n \le 2^{31} - 1$

---

## Topics and Tags

- **Primary Tags:** Bit Manipulation
- **Secondary Tags:** Math, Simulation

---

## Detailed Algorithm Walkthrough

### 1. XOR Adjacent Bit Invariant

If a number $n$ has alternating bits (such as `10101` or `1010`):
- Shifting $n$ to the right by 1 bit yields $n \gg 1$ (`01010` or `00101`).
- Every bit in $n$ differs from the adjacent bit in $n \gg 1$.
- Computing the bitwise XOR between $n$ and $n \gg 1$:
  $$x = n \oplus (n \gg 1)$$
  Because every adjacent bit pair differs, every bit from the most significant bit down to bit 0 becomes $1$!
  For example, if $n = 5 = 101_2$:
  $$x = 101_2 \oplus 010_2 = 111_2 = 7$$

### 2. The Power-of-Two Property of All-Ones Masks

A number $x$ consists of all continuous 1s (i.e., $x = 2^k - 1$) **if and only if** adding $1$ yields a pure power of $2$ ($x + 1 = 2^k$):
- Therefore, $x$ and $x + 1$ share no set bits:
  $$x \ \& \ (x + 1) == 0$$
- If any adjacent bits in $n$ were identical, that position would result in a $0$ in $x$, breaking the contiguous sequence of 1s and making $x \ \& \ (x + 1) \ne 0$.

### 3. Overflow Safety

Since $n$ can be up to $2^{31} - 1$, casting $x$ to a 64-bit integer (`long` in Java, `long long` in C++) completely eliminates signed integer overflow when computing $x + 1$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(1)$. Solved using exactly three constant-time bitwise operations ($\oplus$, $\gg$, $\&$).
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$. Operates in-place with zero memory allocation.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 693 - Binary Number with Alternating Bits
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public boolean hasAlternatingBits(int n) {
        long x = n ^ (n >> 1);
        return (x & (x + 1)) == 0;
    }
}
```

### Python
```python
"""
Problem: LeetCode 693 - Binary Number with Alternating Bits
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""

class Solution:
    def hasAlternatingBits(self, n: int) -> bool:
        x = n ^ (n >> 1)
        return (x & (x + 1)) == 0
```

### C++
```cpp
/**
 * Problem: LeetCode 693 - Binary Number with Alternating Bits
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    bool hasAlternatingBits(int n) {
        long long x = n ^ (n >> 1);
        return (x & (x + 1)) == 0;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 693 - Binary Number with Alternating Bits
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} n
 * @return {boolean}
 */
var hasAlternatingBits = function(n) {
    const x = n ^ (n >> 1);
    return ((x + 1) & x) === 0;
};
```
