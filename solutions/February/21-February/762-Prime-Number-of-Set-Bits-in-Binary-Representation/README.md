# LeetCode 762: Prime Number of Set Bits in Binary Representation

- **Publication Date:** 21 February 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/prime-number-of-set-bits-in-binary-representation/](https://leetcode.com/problems/prime-number-of-set-bits-in-binary-representation/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

Given two integers `left` and `right`, return the count of numbers in the inclusive range `[left, right]` having a prime number of set bits in their binary representation.

The number of set bits an integer has is the number of `1`'s present when written in binary.

---

### Examples

#### Example 1:
- **Input:** `left = 6, right = 10`
- **Output:** `4`
- **Explanation:**
  - $6 \to 110_2$ (2 set bits, 2 is prime)
  - $7 \to 111_2$ (3 set bits, 3 is prime)
  - $8 \to 1000_2$ (1 set bit, 1 is not prime)
  - $9 \to 1001_2$ (2 set bits, 2 is prime)
  - $10 \to 1010_2$ (2 set bits, 2 is prime)
  - 4 numbers have a prime number of set bits.

#### Example 2:
- **Input:** `left = 10, right = 15`
- **Output:** `5`
- **Explanation:**
  - $10 \to 1010_2$ (2 set bits, 2 is prime)
  - $11 \to 1011_2$ (3 set bits, 3 is prime)
  - $12 \to 1100_2$ (2 set bits, 2 is prime)
  - $13 \to 1101_2$ (3 set bits, 3 is prime)
  - $14 \to 1110_2$ (3 set bits, 3 is prime)
  - $15 \to 1111_2$ (4 set bits, 4 is not prime)
  - 5 numbers have a prime number of set bits.

---

### Constraints

- $1 \le \text{left} \le \text{right} \le 10^6$
- $0 \le \text{right} - \text{left} \le 10^4$

---

## Topics and Tags

- **Primary Tags:** Bit Manipulation, Math
- **Secondary Tags:** Simulation

---

## Detailed Algorithm Walkthrough

### 1. Bounded Population Count (Popcount)

The problem constraints specify that $\text{right} \le 10^6$.
Because $2^{20} = 1,048,576 > 10^6$, any number in the range $[left, right]$ has at most 20 binary digits.
Consequently, the maximum possible number of set bits for any integer up to $10^6$ cannot exceed 19 (as $2^{19} = 524,288$ and $10^6 < 2^{20}$).

The prime numbers $\le 19$ are:
$$\{2, 3, 5, 7, 11, 13, 17, 19\}$$

### 2. $\mathcal{O}(1)$ Primality Check with an Integer Bitmask

Rather than running trial division or creating a hash set, we can encode all relevant prime values into a single 32-bit integer bitmask:
$$\text{primeMask} = \sum_{p \in \{2, 3, 5, 7, 11, 13, 17, 19\}} 2^p$$
Evaluating this sum:
$$2^2 + 2^3 + 2^5 + 2^7 + 2^{11} + 2^{13} + 2^{17} + 2^{19} = 665,772$$

To check whether a bit count $k$ is prime, we simply inspect the $k$-th bit of $\text{primeMask}$:
$$(\text{primeMask} \gg k) \ \& \ 1 \ne 0$$
This evaluates in $\mathcal{O}(1)$ time using a single bitwise shift and mask operation.

### 3. Iteration and Counting

We iterate $i$ from `left` to `right`:
1. Compute the number of set bits in $i$ using the hardware/built-in population count instruction (`Integer.bitCount(i)` in Java, `num.bit_count()` in Python, `__builtin_popcount(i)` in C++).
2. Check if the $k$-th bit of `primeMask` is set.
3. If true, increment the answer counter.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(\text{right} - \text{left} + 1)$. For each number in the range, computing the popcount and testing the prime bitmask is an $\mathcal{O}(1)$ operation. Since $\text{right} - \text{left} \le 10^4$, total execution requires at most $10^4 + 1$ constant-time iterations ($< 2$ ms).
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$. Solved completely in-place with no additional data structures.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 762 - Prime Number of Set Bits in Binary Representation
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int countPrimeSetBits(int left, int right) {
        // Bitmask representing prime bit counts up to 19:
        // Primes <= 19 are 2, 3, 5, 7, 11, 13, 17, 19
        // mask = (1<<2)|(1<<3)|(1<<5)|(1<<7)|(1<<11)|(1<<13)|(1<<17)|(1<<19) = 665772
        int primeMask = 665772;
        int count = 0;

        for (int i = left; i <= right; i++) {
            int setBits = Integer.bitCount(i);
            if (((primeMask >> setBits) & 1) != 0) {
                count++;
            }
        }

        return count;
    }
}
```

### Python
```python
"""
Problem: LeetCode 762 - Prime Number of Set Bits in Binary Representation
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""

class Solution:
    def countPrimeSetBits(self, left: int, right: int) -> int:
        # Primes <= 19: 2, 3, 5, 7, 11, 13, 17, 19
        prime_mask = 665772
        count = 0

        for num in range(left, right + 1):
            set_bits = num.bit_count()
            if (prime_mask >> set_bits) & 1:
                count += 1

        return count
```

### C++
```cpp
/**
 * Problem: LeetCode 762 - Prime Number of Set Bits in Binary Representation
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <algorithm>

class Solution {
public:
    int countPrimeSetBits(int left, int right) {
        // Primes <= 19: 2, 3, 5, 7, 11, 13, 17, 19
        const int primeMask = 665772;
        int count = 0;

        for (int i = left; i <= right; i++) {
            int setBits = __builtin_popcount(i);
            if ((primeMask >> setBits) & 1) {
                count++;
            }
        }

        return count;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 762 - Prime Number of Set Bits in Binary Representation
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var countPrimeSetBits = function(left, right) {
    const primeMask = 665772;
    let count = 0;

    for (let i = left; i <= right; i++) {
        let n = i;
        let setBits = 0;
        while (n > 0) {
            n &= (n - 1);
            setBits++;
        }

        if ((primeMask >> setBits) & 1) {
            count++;
        }
    }

    return count;
};
```
