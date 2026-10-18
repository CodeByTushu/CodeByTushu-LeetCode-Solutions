# LeetCode 3536: Maximum Product of Two Digits

- **Publication Date:** 25 July 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/maximum-product-of-two-digits/](https://leetcode.com/problems/maximum-product-of-two-digits/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/rZcPoUpOtLU?si=1Yp3OyflWRo0ByHC)

---

## Problem Summary

You are given a positive integer `n`.

Return the **maximum product** of any two digits in `n`.

> **Note:** You may use the same digit twice if it appears more than once in `n`.

---

### Examples

#### Example 1:

- **Input:** `n = 31`
- **Output:** `3`
- **Explanation:**
  - The digits of `n` are `[3, 1]`.
  - The possible products of any two digits are: $3 \times 1 = 3$.
  - The maximum product is $3$.

#### Example 2:

- **Input:** `n = 22`
- **Output:** `4`
- **Explanation:**
  - The digits of `n` are `[2, 2]`.
  - The possible products of any two digits are: $2 \times 2 = 4$.
  - The maximum product is $4$.

#### Example 3:

- **Input:** `n = 124`
- **Output:** `8`
- **Explanation:**
  - The digits of `n` are `[1, 2, 4]`.
  - The possible products of any two digits are: $1 \times 2 = 2$, $1 \times 4 = 4$, $2 \times 4 = 8$.
  - The maximum product is $8$.

---

### Constraints

- $10 \le n \le 10^9$

---

## Algorithmic Approach

### 1. Greedy Top-Two Digits Tracking
- Since all decimal digits are non-negative ($0 \le d \le 9$), the maximum product of any two digits is achieved by multiplying the **largest digit** and the **second largest digit** present in $n$.
- If a digit appears multiple times, it can naturally serve as both the largest and the second largest digit (as handled by the comparison `digit >= first`).

### 2. Single-Pass Digit Extraction
- Extract digits of $n$ one by one from right to left using `digit = n % 10` and `n /= 10`.
- Maintain two scalar variables:
  - `first`: the maximum digit encountered so far.
  - `second`: the second maximum digit encountered so far.
- For each extracted `digit`:
  - If `digit >= first`: the old `first` demotes to `second`, and `first` becomes `digit`.
  - Else if `digit > second`: update `second = digit`.
- After processing all digits, the answer is simply `first * second`.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(\log_{10} n)$ | A single while loop extracts each decimal digit of $n$. For $n \le 10^9$, there are at most $10$ digits, running in $\mathcal{O}(1)$ practical time. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Only two integer trackers (`first`, `second`) and loop variables are used. No additional memory or heap allocation is required. |

---

## Multi-Language Implementations

- [Java Solution](./Solution.java)
- [Python Solution](./solution.py)
- [C++ Solution](./solution.cpp)
- [JavaScript Solution](./solution.js)
