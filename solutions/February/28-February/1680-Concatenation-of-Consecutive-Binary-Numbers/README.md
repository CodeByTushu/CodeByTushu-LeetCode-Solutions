# LeetCode 1680: Concatenation of Consecutive Binary Numbers

- **Publication Date:** 28 February 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/concatenation-of-consecutive-binary-numbers/](https://leetcode.com/problems/concatenation-of-consecutive-binary-numbers/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

Given an integer `n`, return the decimal value of the binary string formed by concatenating the binary representations of `1` to `n` in order, modulo $10^9 + 7$.

---

### Examples

#### Example 1:
- **Input:** `n = 1`
- **Output:** `1`
- **Explanation:** `"1"` in binary corresponds to the decimal value $1$.

#### Example 2:
- **Input:** `n = 3`
- **Output:** `27`
- **Explanation:** In binary, $1$, $2$, and $3$ are `"1"`, `"10"`, and `"11"`.
  - Concatenating them gives `"11011"`, which corresponds to decimal value $27$.

#### Example 3:
- **Input:** `n = 12`
- **Output:** `505379714`
- **Explanation:** The concatenation of the numbers from $1$ to $12$ is `"1101110010111011110001001101010111100"`.
  - The decimal value is $118805379714$.
  - Modulo $10^9 + 7$, the result is $505379714$.

---

### Constraints

- $1 \le n \le 10^5$

---

## Topics and Tags

- **Primary Tags:** Bit Manipulation, Math
- **Secondary Tags:** Simulation

---

## Detailed Algorithm Walkthrough

### 1. Mathematical Formulation & Bit-Shifting Recurrence

Let $S_i$ be the binary string obtained after concatenating representations of numbers from $1$ through $i$, and let $V(i)$ denote its decimal value modulo $10^9 + 7$.

When appending the next number $i$ to the accumulated string:
- Let $L(i)$ be the length (number of bits) in the binary representation of $i$.
- Appending $i$ to the end of the existing binary string shifts the previous bits to the left by $L(i)$ positions and adds $i$ to the lowest $L(i)$ bit positions.
- Hence, the recurrence relation is:
  $$V(i) = \left( (V(i - 1) \ll L(i)) \mid i \right) \pmod{10^9 + 7}$$

### 2. Efficient Tracking of Bit Length $L(i)$

Rather than recomputing the bit length with $\lfloor \log_2(i) \rfloor + 1$ or converting to strings at each iteration:
- $L(i)$ increases by $1$ if and only if $i$ is an exact power of $2$ (i.e., $1, 2, 4, 8, 16, \dots$).
- We can check whether $i$ is a power of $2$ in $\mathcal{O}(1)$ time using the classic bitwise trick:
  $$(i \ \& \ (i - 1)) == 0$$
- Whenever this condition is met, we increment our maintained `bitLength` counter by $1$.

### 3. Step-by-Step Simulation

1. Initialize `ans = 0`, `bitLength = 0`, and modulus $MOD = 10^9 + 7$.
2. For each integer $i$ from $1$ to $n$:
   - Check if $(i \ \& \ (i - 1)) == 0$: if true, `bitLength++`.
   - Update: `ans = ((ans << bitLength) | i) % MOD`.
3. Return `ans` as the final answer.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$, as we iterate from $1$ to $n$ exactly once performing constant-time $\mathcal{O}(1)$ bitwise operations per step.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$, requiring only a few 64-bit integer variables.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 1680 - Concatenation of Consecutive Binary Numbers
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int concatenatedBinary(int n) {
        long ans = 0;
        int bitLength = 0;
        final long MOD = 1_000_000_007L;

        for (int i = 1; i <= n; i++) {
            // When i is a power of 2, its binary representation requires one more bit
            if ((i & (i - 1)) == 0) {
                bitLength++;
            }
            ans = ((ans << bitLength) | i) % MOD;
        }

        return (int) ans;
    }
}
```

### Python
```python
"""
Problem: LeetCode 1680 - Concatenation of Consecutive Binary Numbers
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

class Solution:
    def concatenatedBinary(self, n: int) -> int:
        ans = 0
        bit_length = 0
        MOD = 1_000_000_007

        for i in range(1, n + 1):
            if (i & (i - 1)) == 0:
                bit_length += 1
            ans = ((ans << bit_length) | i) % MOD

        return ans
```

### C++
```cpp
/**
 * Problem: LeetCode 1680 - Concatenation of Consecutive Binary Numbers
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <iostream>

using namespace std;

class Solution {
public:
    int concatenatedBinary(int n) {
        long long ans = 0;
        int bitLength = 0;
        const long long MOD = 1'000'000'007LL;

        for (int i = 1; i <= n; i++) {
            // When i is a power of 2, its binary representation increases by 1 bit
            if ((i & (i - 1)) == 0) {
                bitLength++;
            }
            ans = ((ans << bitLength) | i) % MOD;
        }

        return static_cast<int>(ans);
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 1680 - Concatenation of Consecutive Binary Numbers
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} n
 * @return {number}
 */
var concatenatedBinary = function(n) {
    let ans = 0n;
    let bitLength = 0n;
    const MOD = 1000000007n;

    for (let i = 1n; i <= BigInt(n); i++) {
        // When i is a power of 2, its binary representation requires one more bit
        if ((i & (i - 1n)) === 0n) {
            bitLength++;
        }
        ans = ((ans << bitLength) | i) % MOD;
    }

    return Number(ans);
};
```
