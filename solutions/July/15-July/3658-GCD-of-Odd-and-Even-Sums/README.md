# LeetCode 3658: GCD of Odd and Even Sums

- **Publication Date:** 15 July 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/gcd-of-odd-and-even-sums/](https://leetcode.com/problems/gcd-of-odd-and-even-sums/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/C7o33wjkeKs?si=4dD_J2qmNbdw3Qrr)

---

## Problem Summary

You are given an integer $n$. Your task is to compute the Greatest Common Divisor (GCD) of two values:
- `sumOdd`: the sum of the smallest $n$ positive odd numbers.
- `sumEven`: the sum of the smallest $n$ positive even numbers.

Return the GCD of `sumOdd` and `sumEven`.

---

### Examples

#### Example 1:

- **Input:** `n = 4`
- **Output:** `4`
- **Explanation:**
  - Sum of the first 4 odd numbers: $\text{sumOdd} = 1 + 3 + 5 + 7 = 16$
  - Sum of the first 4 even numbers: $\text{sumEven} = 2 + 4 + 6 + 8 = 20$
  - Hence, $\gcd(\text{sumOdd}, \text{sumEven}) = \gcd(16, 20) = 4$.

#### Example 2:

- **Input:** `n = 5`
- **Output:** `5`
- **Explanation:**
  - Sum of the first 5 odd numbers: $\text{sumOdd} = 1 + 3 + 5 + 7 + 9 = 25$
  - Sum of the first 5 even numbers: $\text{sumEven} = 2 + 4 + 6 + 8 + 10 = 30$
  - Hence, $\gcd(\text{sumOdd}, \text{sumEven}) = \gcd(25, 30) = 5$.

---

### Constraints

- $1 \le n \le 1000$

---

## Mathematical Proof & Algorithmic Approach

### Analytical Derivation

1. **Sum of the first $n$ positive odd numbers:**
   $$\text{sumOdd} = \sum_{k=1}^n (2k - 1) = 1 + 3 + 5 + \dots + (2n - 1) = n^2$$

2. **Sum of the first $n$ positive even numbers:**
   $$\text{sumEven} = \sum_{k=1}^n 2k = 2(1 + 2 + \dots + n) = 2 \cdot \frac{n(n + 1)}{2} = n(n + 1)$$

3. **Computing the Greatest Common Divisor:**
   By applying the distributive property of GCD over multiplication:
   $$\gcd(\text{sumOdd}, \text{sumEven}) = \gcd(n^2, n(n + 1)) = n \cdot \gcd(n, n + 1)$$

4. **Coprimality of Consecutive Integers:**
   For any positive integer $n$:
   $$\gcd(n, n + 1) = \gcd(n, (n + 1) - n) = \gcd(n, 1) = 1$$

5. **Conclusion:**
   $$\gcd(\text{sumOdd}, \text{sumEven}) = n \cdot 1 = n$$

Thus, regardless of the value of $n$, the result is always identically equal to $n$. The problem can be solved in pure $\mathcal{O}(1)$ constant time by returning $n$ directly.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(1)$ | The result is evaluated mathematically in constant time by returning $n$. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | No additional memory or data structures are allocated. |

---

## Multi-Language Implementations

- [Java Solution](./Solution.java)
- [Python Solution](./solution.py)
- [C++ Solution](./solution.cpp)
- [JavaScript Solution](./solution.js)
