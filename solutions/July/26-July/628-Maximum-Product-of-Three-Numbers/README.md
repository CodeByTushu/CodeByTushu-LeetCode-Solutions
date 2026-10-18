# LeetCode 628: Maximum Product of Three Numbers

- **Publication Date:** 26 July 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/maximum-product-of-three-numbers/](https://leetcode.com/problems/maximum-product-of-three-numbers/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/Mcq84C3PKTs?si=zovlxqrDnauzdslZ)

---

## Problem Summary

You are given an integer array `nums`.

Find three numbers whose product is maximum and return the **maximum product**.

---

### Examples

#### Example 1:

- **Input:** `nums = [1, 2, -3]`
- **Output:** `-6`
- **Explanation:** The only three numbers are $1, 2,$ and $-3$, so the maximum product is $1 \times 2 \times (-3) = -6$.

#### Example 2:

- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `24`
- **Explanation:** The largest product comes from the three greatest numbers: $2 \times 3 \times 4 = 24$.

#### Example 3:

- **Input:** `nums = [-1, -2, -3]`
- **Output:** `-6`
- **Explanation:** The only three numbers are $-1, -2,$ and $-3$, so the maximum product is $(-1) \times (-2) \times (-3) = -6$.

---

### Constraints

- $3 \le \text{nums.length} \le 10^4$
- $-1000 \le \text{nums}[i] \le 1000$

---

## Algorithmic Approach

### 1. Mathematical Observations
When selecting three numbers from an array containing both positive and negative integers, the maximum product can arise from only two distinct configurations:
1. **Three Largest Values:** $\text{max}_1 \times \text{max}_2 \times \text{max}_3$ (e.g., when all numbers are positive, or all are negative).
2. **Two Most Negative Values $\times$ The Largest Value:** $\text{max}_1 \times \text{min}_1 \times \text{min}_2$ (multiplying two large-magnitude negative numbers yields a large positive product, which when multiplied by the largest positive number $\text{max}_1$ may exceed $\text{max}_1 \times \text{max}_2 \times \text{max}_3$).

Therefore, the result is always:
$$\max(\text{max}_1 \times \text{max}_2 \times \text{max}_3, \; \text{max}_1 \times \text{min}_1 \times \text{min}_2)$$

### 2. Linear Scan ($\mathcal{O}(n)$ Time, $\mathcal{O}(1)$ Space)
Instead of sorting the entire array in $\mathcal{O}(n \log n)$ time:
- Maintain five scalar variables:
  - $\text{max}_1, \text{max}_2, \text{max}_3$: the top three maximums initialized to $-\infty$.
  - $\text{min}_1, \text{min}_2$: the bottom two minimums initialized to $+\infty$.
- In a single linear scan through `nums`, cascade-update the maximums and minimums whenever a new qualifying element is encountered.
- Return the maximum of the two candidate products.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(n)$ | A single pass over $n$ elements updates five scalar variables in constant time $\mathcal{O}(1)$ per element. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Only five tracking variables are maintained. No heap allocation or auxiliary arrays are used. |

---

## Multi-Language Implementations

- [Java Solution](./Solution.java)
- [Python Solution](./solution.py)
- [C++ Solution](./solution.cpp)
- [JavaScript Solution](./solution.js)
