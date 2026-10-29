# LeetCode 1009: Complement of Base 10 Integer

- **Publication Date:** 11 March 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/complement-of-base-10-integer/](https://leetcode.com/problems/complement-of-base-10-integer/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

The **complement** of an integer is the integer you get when you flip all the `0`'s to `1`'s and all the `1`'s to `0`'s in its binary representation.

- For example, the integer `5` is `"101"` in binary and its complement is `"010"` which is the integer `2`.

Given an integer `n`, return *its complement*.

---

### Examples

#### Example 1:
- **Input:** `n = 5`
- **Output:** `2`
- **Explanation:** `5` is `"101"` in binary, with complement `"010"` in binary, which is `2` in base-10.

#### Example 2:
- **Input:** `n = 7`
- **Output:** `0`
- **Explanation:** `7` is `"111"` in binary, with complement `"000"` in binary, which is `0` in base-10.

#### Example 3:
- **Input:** `n = 10`
- **Output:** `5`
- **Explanation:** `10` is `"1010"` in binary, with complement `"0101"` in binary, which is `5` in base-10.

---

### Constraints

- `0 <= n < 10^9`

> **Note:** This question is identical to LeetCode 476: *Number Complement*.

---

## Topics and Tags

- **Primary Tags:** Bit Manipulation
- **Secondary Tags:** Math

---

## Detailed Algorithm Walkthrough

### 1. Intuition & Invariant

In standard 32-bit signed integers, taking the bitwise NOT operation (`~n`) flips every bit in the full 32-bit width. For example, for $n = 5$ (`...00000101`), `~5` turns all leading zeros into ones, yielding a negative value in two's complement.

However, the problem requires flipping **only** the significant bits of $n$ (from the most significant set bit down to bit 0), ignoring any leading zeros.

If $n$ has $L$ significant bits, we want to XOR $n$ with a bitmask $M$ consisting of exactly $L$ ones:
$$M = \underbrace{11\dots1}_{L \text{ ones}} = 2^L - 1$$

Since $x \oplus 1 = \sim x$ (flipping the bit) and $x \oplus 0 = x$, computing:
$$\text{complement}(n) = M \oplus n$$
flips every significant bit from $0$ to $1$ and $1$ to $0$ without affecting higher bit positions.

### 2. Edge Case: $n = 0$

When $n = 0$, its binary representation without leading zeros is `"0"`.
Flipping its single bit gives `"1"`, which corresponds to `1`.
We handle $n = 0$ directly with an early return:
```java
if (n == 0) return 1;
```

### 3. Bit Smearing Technique ($\mathcal{O}(1)$ without loops)

Rather than using a loop to shift bits one by one or calling logarithmic math functions, we can construct the bitmask $M$ in constant time using **bit smearing** (bit propagation):
1. Start with `mask = n`.
2. `mask |= mask >> 1;` — sets the bit immediately to the right of every set bit.
3. `mask |= mask >> 2;` — propagates sets of 2 bits.
4. `mask |= mask >> 4;` — propagates sets of 4 bits.
5. `mask |= mask >> 8;` — propagates sets of 8 bits.
6. `mask |= mask >> 16;` — propagates sets of 16 bits.

After these five bitwise OR operations, all bits from the most significant set bit down to bit 0 are guaranteed to be `1`.
Finally, `mask ^ n` flips only those bits in pure $\mathcal{O}(1)$ time.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(1)$. The algorithm executes a fixed sequence of 5 bitwise shifts and OR operations, requiring no loops or variable iterations.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$. Uses a single integer register variable with zero extra allocations.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 1009 - Complement of Base 10 Integer
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int bitwiseComplement(int n) {
        if (n == 0) {
            return 1;
        }

        // Smear highest set bit downwards to create a bitmask of all 1s
        int mask = n;
        mask |= mask >> 1;
        mask |= mask >> 2;
        mask |= mask >> 4;
        mask |= mask >> 8;
        mask |= mask >> 16;

        return mask ^ n;
    }
}
```

### Python
```python
"""
Problem: LeetCode 1009 - Complement of Base 10 Integer
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""

class Solution:
    def bitwiseComplement(self, n: int) -> int:
        if n == 0:
            return 1

        # Smear highest set bit downwards to create a bitmask of all 1s
        mask = n
        mask |= mask >> 1
        mask |= mask >> 2
        mask |= mask >> 4
        mask |= mask >> 8
        mask |= mask >> 16

        return mask ^ n
```

### C++
```cpp
/**
 * Problem: LeetCode 1009 - Complement of Base 10 Integer
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    int bitwiseComplement(int n) {
        if (n == 0) {
            return 1;
        }

        // Smear highest set bit downwards to create a bitmask of all 1s
        int mask = n;
        mask |= mask >> 1;
        mask |= mask >> 2;
        mask |= mask >> 4;
        mask |= mask >> 8;
        mask |= mask >> 16;

        return mask ^ n;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 1009 - Complement of Base 10 Integer
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} n
 * @return {number}
 */
var bitwiseComplement = function(n) {
    if (n === 0) {
        return 1;
    }

    // Smear highest set bit downwards to create a bitmask of all 1s
    let mask = n;
    mask |= mask >> 1;
    mask |= mask >> 2;
    mask |= mask >> 4;
    mask |= mask >> 8;
    mask |= mask >> 16;

    return mask ^ n;
};
```
