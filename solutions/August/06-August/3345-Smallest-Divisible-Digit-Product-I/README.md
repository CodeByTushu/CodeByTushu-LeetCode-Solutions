# LeetCode 3345: Smallest Divisible Digit Product I

- **Publication Date:** 06 August 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/smallest-divisible-digit-product-i/](https://leetcode.com/problems/smallest-divisible-digit-product-i/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/s5l_psaxdqg?si=8xiX7X6n_y8FQLK8)

---

## Problem Summary

You are given two integers `n` and `t`. Return the **smallest number greater than or equal to `n`** such that the **product of its digits** is divisible by `t`.

---

### Examples

#### Example 1:

- **Input:** `n = 10, t = 2`
- **Output:** `10`
- **Explanation:**
  - The digit product of `10` is `1 * 0 = 0`.
  - `0` is divisible by `2` (`0 % 2 == 0`).
  - Thus, `10` is the smallest number $\ge 10$ satisfying the condition.

#### Example 2:

- **Input:** `n = 15, t = 3`
- **Output:** `16`
- **Explanation:**
  - For `15`: digit product is `1 * 5 = 5` (not divisible by `3`).
  - For `16`: digit product is `1 * 6 = 6` (`6 % 3 == 0`).
  - Thus, `16` is the smallest number $\ge 15$ satisfying the condition.

---

### Constraints

- $1 \le n \le 100$
- $1 \le t \le 10$

---

## Topics and Tags

- **Math**
- **Simulation**

---

## Intuition and Approach

### Simulation & Digit Extraction:
Starting from $x = n$, we check candidate numbers in increasing order:
1. Extract the digits of $x$ by repeatedly taking `x % 10` and dividing by `10`.
2. Compute the cumulative product of these digits.
3. If `product % t == 0`, we have found the smallest valid integer and immediately return $x$.
4. Otherwise, increment $x$ by $1$ and test the next integer.

### Upper Bound on Iterations:
Notice that within at most $10$ consecutive numbers starting from any $n$, we will always encounter a multiple of $10$ (a number ending with digit `0`).
- The digit product of any number containing a `0` is $0$.
- Since $0 \pmod t = 0$ for all valid $t \in [1, 10]$, the search terminates in at most $10$ iterations, guaranteeing blazing fast $\mathcal{O}(1)$ execution!

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(1)$
  - At most $10$ candidates are checked before reaching a number ending in $0$.
  - Each candidate has at most $3$ digits ($n \le 100$).
  - Overall time is $\mathcal{O}(1)$, executing in $< 1\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Only uses primitive integers for the product calculation.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
