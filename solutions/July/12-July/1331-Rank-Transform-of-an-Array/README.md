# LeetCode 1331: Rank Transform of an Array

- **Publication Date:** 12 July 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/rank-transform-of-an-array/](https://leetcode.com/problems/rank-transform-of-an-array/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/LFkjoNaZd5A?si=lYzHBFD5OVozX8Jh)

---

## Problem Summary

Given an array of integers `arr`, replace each element with its **rank**.

The rank represents how large the element is according to the following rules:
- Rank is a positive integer starting from $1$.
- The larger the element, the larger the rank.
- If two elements are equal, their rank must be the same.
- Rank should be as small as possible (consecutive distinct integers starting at 1).

---

### Examples

#### Example 1:

- **Input:** `arr = [40, 10, 20, 30]`
- **Output:** `[4, 1, 2, 3]`
- **Explanation:** 
  - $10$ is the smallest $\implies$ rank $1$.
  - $20$ is the second smallest $\implies$ rank $2$.
  - $30$ is the third smallest $\implies$ rank $3$.
  - $40$ is the largest $\implies$ rank $4$.

#### Example 2:

- **Input:** `arr = [100, 100, 100]`
- **Output:** `[1, 1, 1]`
- **Explanation:** All elements are identical and therefore share rank $1$.

#### Example 3:

- **Input:** `arr = [37, 12, 28, 9, 100, 56, 80, 5, 12]`
- **Output:** `[5, 3, 4, 2, 8, 6, 7, 1, 3]`
- **Explanation:** Sorted unique values: `[5, 9, 12, 28, 37, 56, 80, 100]`. Their ranks are $1$ through $8$. Note that the duplicate value $12$ gets rank $3$ in both positions.

---

### Constraints

- $0 \le \text{arr.length} \le 10^5$
- $-10^9 \le \text{arr}[i] \le 10^9$

---

## Algorithmic Approach

This problem is a classic example of **coordinate compression**:

1. **Sort Unique Values:**
   - Clone or copy the array and sort it in ascending order.
2. **Assign Ranks via Hash Map:**
   - Iterate through the sorted elements. Maintain an incrementing rank counter starting at $1$.
   - When encountering a number for the first time, record `rank[num] = r` and increment `r`. Duplicate elements are skipped since they already have their rank recorded in the map.
3. **Transform the Original Array:**
   - Iterate over the original array `arr` and replace each value `arr[i]` with its mapped rank `rank[arr[i]]`.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(n \log n)$ | Sorting $n$ elements takes $\mathcal{O}(n \log n)$ time. Building the hash map and transforming the original array each require $\mathcal{O}(n)$ time. |
| **Auxiliary Space** | $\mathcal{O}(n)$ | Storing the sorted copy, the hash map of unique ranks (up to $n$ entries), and the output array each require $\mathcal{O}(n)$ auxiliary memory. |

---

## Multi-Language Implementations

- [Java Solution](./Solution.java)
- [Python Solution](./solution.py)
- [C++ Solution](./solution.cpp)
- [JavaScript Solution](./solution.js)
