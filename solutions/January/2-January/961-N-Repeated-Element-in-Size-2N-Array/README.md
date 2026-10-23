# LeetCode 961: N-Repeated Element in Size 2N Array

- **Publication Date:** 02 January 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/n-repeated-element-in-size-2n-array/](https://leetcode.com/problems/n-repeated-element-in-size-2n-array/)
- **YouTube Solution:** *Coming Soon* ⏳

---

## Problem Summary

You are given an integer array `nums` with the following properties:
- `nums.length == 2 * n`.
- `nums` contains `n + 1` unique elements, and `n` of which occur exactly once in the array.
- Exactly one element of `nums` is repeated `n` times.

Return the element that is repeated `n` times.

---

### Examples

#### Example 1:
- **Input:** `nums = [1, 2, 3, 3]`
- **Output:** `3`

#### Example 2:
- **Input:** `nums = [2, 1, 2, 5, 3, 2]`
- **Output:** `2`

#### Example 3:
- **Input:** `nums = [5, 1, 5, 2, 5, 3, 5, 4]`
- **Output:** `5`

---

### Constraints

- $2 \le n \le 5000$
- $\text{nums.length} == 2 \times n$
- $0 \le \text{nums}[i] \le 10^4$
- `nums` contains $n + 1$ unique elements and one of them is repeated exactly $n$ times.

---

## Topics and Tags

- **Array**
- **Hash Table**

---

## Approach & Intuition

### 1. Hash Set / First Duplicate Detection

- **Key Insight:**
  The array has a total length of $2n$ elements with $n + 1$ unique values. Exactly $n$ elements appear once, and exactly **one** special element appears $n$ times.
- Since all other $n$ elements are strictly unique (they appear exactly once in the entire array), **the very first duplicate value encountered while iterating through `nums` is guaranteed to be the element repeated $n$ times**.
- We iterate through `nums` while keeping track of numbers we've already observed in a hash set:
  1. For each `num`, check if `num` is already in `seen`.
  2. If it is present, return `num` immediately as our answer.
  3. Otherwise, insert `num` into `seen`.
- By the Pigeonhole Principle, among any 4 consecutive elements (or at most $n + 2$ elements overall), a duplicate must appear. Thus, the loop terminates very quickly.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$, where $2n$ is the length of `nums`. In the worst-case scenario, at most $n + 2$ lookups are performed before finding the duplicate; on average it terminates in $\mathcal{O}(1)$ time. Hash set lookup and insertion take $\mathcal{O}(1)$ on average.
- **Auxiliary Space Complexity:** $\mathcal{O}(n)$ to store visited unique elements in the hash set.

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
