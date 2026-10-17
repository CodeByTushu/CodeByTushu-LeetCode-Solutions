# LeetCode 3622: Check Divisibility by Digit Sum and Product

- **Publication Date:** 22 August 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/check-divisibility-by-digit-sum-and-product/](https://leetcode.com/problems/check-divisibility-by-digit-sum-and-product/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/zRTF8a8pECM?si=RNyqWMulvcgGlk_z)

---

## Problem Summary

You are given a positive integer `n`. Determine whether `n` is divisible by the sum of the following two values:
- The **digit sum** of `n` (the sum of its digits).
- The **digit product** of `n` (the product of its digits).

Return `true` if `n` is divisible by this combined sum; otherwise, return `false`.

---

### Examples

#### Example 1:

- **Input:** `n = 99`
- **Output:** `true`
- **Explanation:**
  - Digit sum: $9 + 9 = 18$
  - Digit product: $9 \times 9 = 81$
  - Combined total: $18 + 81 = 99$
  - Since $99 \pmod{99} = 0$, $99$ is divisible by $99$, so the output is `true`.

#### Example 2:

- **Input:** `n = 23`
- **Output:** `false`
- **Explanation:**
  - Digit sum: $2 + 3 = 5$
  - Digit product: $2 \times 3 = 6$
  - Combined total: $5 + 6 = 11$
  - Since $23 \pmod{11} = 1 \ne 0$, $23$ is not divisible by $11$, so the output is `false`.

---

### Constraints

- $1 \le n \le 10^6$

---

## Topics and Tags

- **Math**
- **Simulation**

---

## Intuition and Approach

### 1. Extracting Digits:
To compute both the digit sum and digit product:
- Initialize `sum = 0` and `product = 1`.
- While `n > 0`:
  - Extract the last digit: `digit = n % 10`.
  - Accumulate: `sum += digit` and `product *= digit`.
  - Remove the last digit: `n /= 10`.

### 2. Divisibility Check:
- Compute the denominator `total = sum + product`.
- Check if original $n \pmod{\text{total}} == 0$.
- Since $n \ge 1$ and all digits are non-negative, $\text{sum} \ge 1$, so division by zero is impossible.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(\log_{10} n)$
  - Extracting digits takes proportional to the number of decimal digits in $n$.
  - With $n \le 10^6$, there are at most $7$ digits, executing in $\mathcal{O}(1)$ time ($< 1\text{ ms}$).
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Only a few scalar integer variables are used.
