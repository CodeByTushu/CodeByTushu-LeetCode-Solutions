# LeetCode 1545: Find Kth Bit in Nth Binary String

- **Publication Date:** 03 March 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/find-kth-bit-in-nth-binary-string/](https://leetcode.com/problems/find-kth-bit-in-nth-binary-string/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

Given two positive integers `n` and `k`, the binary string $S_n$ is formed as follows:
- $S_1 = \text{"0"}$
- $S_i = S_{i-1} + \text{"1"} + \text{reverse}(\text{invert}(S_{i-1}))$ for $i > 1$

Where $+$ denotes concatenation, $\text{reverse}(x)$ returns the reversed string $x$, and $\text{invert}(x)$ inverts all bits in $x$ (`0` changes to `1` and `1` changes to `0`).

Return the $k$-th bit in $S_n$. It is guaranteed that $k$ is valid for the given $n$.

---

### Examples

#### Example 1:
- **Input:** `n = 3, k = 1`
- **Output:** `"0"`
- **Explanation:** $S_3$ is `"0111001"`. The 1st bit is `"0"`.

#### Example 2:
- **Input:** `n = 4, k = 11`
- **Output:** `"1"`
- **Explanation:** $S_4$ is `"011100110110001"`. The 11th bit is `"1"`.

---

### Constraints

- $1 \le n \le 20$
- $1 \le k \le 2^n - 1$

---

## Topics and Tags

- **Primary Tags:** String, Divide and Conquer
- **Secondary Tags:** Simulation, Recursion

---

## Detailed Algorithm Walkthrough

### 1. Structural Symmetry of $S_n$

The length of string $S_n$ is $L_n = 2^n - 1$.
The string is divided into three distinct sections by its center:
1. **Left Half (positions $1$ to $2^{n-1} - 1$):** Exactly identical to $S_{n-1}$.
2. **Center Bit (position $2^{n-1}$):** Always `'1'` for $n > 1$.
3. **Right Half (positions $2^{n-1} + 1$ to $2^n - 1$):** Formed by $\text{reverse}(\text{invert}(S_{n-1}))$.

### 2. Divide and Conquer Reductions

Let $\text{mid} = 2^{n-1}$:
- **Case 1 ($k == \text{mid}$):**
  The center element is always `'1'` (subject to cumulative parity inversions).
- **Case 2 ($k < \text{mid}$):**
  The target bit falls entirely inside the left half, so it equals the $k$-th bit of $S_{n-1}$ without any modifications.
- **Case 3 ($k > \text{mid}$):**
  The target bit falls in the right half.
  - Due to reversal, position $k$ in $S_n$ corresponds to symmetrical index $k' = 2^n - k$ in $S_{n-1}$.
  - Due to bit inversion, the value is inverted from the original bit in $S_{n-1}$.
  - We increment our inversion counter and set $k = 2^n - k$.

### 3. Iterative Space-Optimized Execution

Instead of allocating strings of exponential size $2^{20} \approx 10^6$ characters, we simulate the reduction iteratively:
- Track `invertCount = 0`.
- Decrement $n$ by 1 at each step until we either hit a known center bit or reach $n = 1$ (where $S_1 = \text{"0"}$).
- The final bit is determined in at most $20$ iterations with zero dynamic memory allocation.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$, where $n \le 20$. In each iteration of the while loop, $n$ decrements by $1$, performing $\mathcal{O}(1)$ arithmetic and bitwise operations. Total runtime is under $1$ ms.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$. Solved completely iteratively with a few primitive integer variables without generating any strings.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 1545 - Find Kth Bit in Nth Binary String
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public char findKthBit(int n, int k) {
        int invertCount = 0;

        while (n > 1) {
            int mid = 1 << (n - 1); // 2^(n-1) is the center index of S_n

            if (k == mid) {
                // The center bit of S_n is always '1' (inverted invertCount times)
                return (invertCount % 2 == 0) ? '1' : '0';
            } else if (k > mid) {
                // In the right half: reverse(invert(S_{n-1}))
                // Symmetrical index in S_{n-1} from right is 2^n - k
                k = (1 << n) - k;
                invertCount++;
            }
            // If k < mid, k remains the same in the left half S_{n-1}
            n--;
        }

        // S_1 is "0"
        return (invertCount % 2 == 0) ? '0' : '1';
    }
}
```

### Python
```python
"""
Problem: LeetCode 1545 - Find Kth Bit in Nth Binary String
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

class Solution:
    def findKthBit(self, n: int, k: int) -> str:
        invert_count = 0

        while n > 1:
            mid = 1 << (n - 1)

            if k == mid:
                return '1' if invert_count % 2 == 0 else '0'
            elif k > mid:
                k = (1 << n) - k
                invert_count += 1

            n -= 1

        return '0' if invert_count % 2 == 0 else '1'
```

### C++
```cpp
/**
 * Problem: LeetCode 1545 - Find Kth Bit in Nth Binary String
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    char findKthBit(int n, int k) {
        int invertCount = 0;

        while (n > 1) {
            int mid = 1 << (n - 1);

            if (k == mid) {
                return (invertCount % 2 == 0) ? '1' : '0';
            } else if (k > mid) {
                k = (1 << n) - k;
                invertCount++;
            }

            n--;
        }

        return (invertCount % 2 == 0) ? '0' : '1';
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 1545 - Find Kth Bit in Nth Binary String
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} n
 * @param {number} k
 * @return {character}
 */
var findKthBit = function(n, k) {
    let invertCount = 0;

    while (n > 1) {
        const mid = 1 << (n - 1);

        if (k === mid) {
            return (invertCount % 2 === 0) ? '1' : '0';
        } else if (k > mid) {
            k = (1 << n) - k;
            invertCount++;
        }

        n--;
    }

    return (invertCount % 2 === 0) ? '0' : '1';
};
```
