# LeetCode 1464: Maximum Product of Two Elements in an Array

- **Publication Date:** 27 July 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/maximum-product-of-two-elements-in-an-array/](https://leetcode.com/problems/maximum-product-of-two-elements-in-an-array/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/ZTa6oHtIDMM?si=54-tRAm-OZFSCUxa)

---

## Problem Summary

You are given an array of integers `nums`.

Choose two different indices `i` and `j` of that array.

Return the **maximum value** of `(nums[i] - 1) * (nums[j] - 1)`.

---

### Examples

#### Example 1:

- **Input:** `nums = [3, 4, 5, 2]`
- **Output:** `12`
- **Explanation:** If you choose the indices $i=1$ and $j=2$ (0-indexed), you get $(nums[1] - 1) \times (nums[2] - 1) = (4 - 1) \times (5 - 1) = 3 \times 4 = 12$.

#### Example 2:

- **Input:** `nums = [1, 5, 4, 5]`
- **Output:** `16`
- **Explanation:** Choosing the indices $i=1$ and $j=3$ (0-indexed), you get $(5 - 1) \times (5 - 1) = 16$.

#### Example 3:

- **Input:** `nums = [3, 7]`
- **Output:** `12`
- **Explanation:** The only two available elements are $3$ and $7$, giving $(3 - 1) \times (7 - 1) = 2 \times 6 = 12$.

---

### Constraints

- $2 \le \text{nums.length} \le 500$
- $1 \le \text{nums}[i] \le 10^3$

---

## Algorithmic Approach

### 1. Monotonicity & Greedy Observation
- Each element satisfies $\text{nums}[i] \ge 1$, which implies $(\text{nums}[i] - 1) \ge 0$.
- Because both factors are non-negative, the product $(\text{nums}[i] - 1) \times (\text{nums}[j] - 1)$ is strictly maximized by selecting the **two largest elements** in the entire array.

### 2. Single-Pass Linear Scan ($\mathcal{O}(n)$ Time, $\mathcal{O}(1)$ Space)
Instead of sorting the array in $\mathcal{O}(n \log n)$ time:
- Maintain two scalar trackers:
  - `max1`: the largest element found so far (initialized to $0$).
  - `max2`: the second largest element found so far (initialized to $0$).
- Traverse each `num` in `nums`:
  - If `num >= max1`: the former `max1` demotes to `max2`, and `max1` becomes `num`.
  - Else if `num > max2`: update `max2 = num`.
- Return `(max1 - 1) * (max2 - 1)`.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(n)$ | Single pass over $n$ elements in `nums`. Each element is checked against `max1` and `max2` in constant time $\mathcal{O}(1)$. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Only two integer tracking variables are allocated. No heap allocation or extra arrays are used. |

---

## Multi-Language Implementations

- [Java Solution](./Solution.java)
- [Python Solution](./solution.py)
- [C++ Solution](./solution.cpp)
- [JavaScript Solution](./solution.js)
