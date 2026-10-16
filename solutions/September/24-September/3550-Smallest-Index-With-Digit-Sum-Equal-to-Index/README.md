# LeetCode 3550: Smallest Index With Digit Sum Equal to Index

- **Publication Date:** 24 September 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/smallest-index-with-digit-sum-equal-to-index/](https://leetcode.com/problems/smallest-index-with-digit-sum-equal-to-index/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/8iL2OXi1ElA?si=c6kDkQhlsyme3kKH)

---

## Problem Summary

You are given an integer array `nums`.

Return the **smallest index** `i` such that the sum of the digits of `nums[i]` is equal to `i`.

If no such index exists, return `-1`.

---

### Examples

#### Example 1:
- **Input:** `nums = [1,3,2]`
- **Output:** `2`
- **Explanation:**
  - For $i = 0$: `nums[0] = 1`, digit sum is $1 \ne 0$.
  - For $i = 1$: `nums[1] = 3`, digit sum is $3 \ne 1$.
  - For $i = 2$: `nums[2] = 2`, digit sum is $2 = 2$.
  - The smallest satisfying index is $2$.

#### Example 2:
- **Input:** `nums = [1,10,11]`
- **Output:** `1`
- **Explanation:**
  - For $i = 0$: `nums[0] = 1`, digit sum is $1 \ne 0$.
  - For $i = 1$: `nums[1] = 10`, digit sum is $1 + 0 = 1$, which equals $i = 1$.
  - For $i = 2$: `nums[2] = 11`, digit sum is $1 + 1 = 2$, which equals $i = 2$.
  - Since index $1$ is smaller than $2$, the output is $1$.

#### Example 3:
- **Input:** `nums = [1,2,3]`
- **Output:** `-1`
- **Explanation:**
  - Since no index satisfies the condition, the output is $-1$.

---

### Constraints

- $1 \le \text{nums.length} \le 100$
- $0 \le \text{nums}[i] \le 1000$

---

## Topics and Tags

- **Array**
- **Math**
- **Simulation**

---

## Approach & Intuition

### 1. Sequential Scanning
We need the **smallest index** $i$ where the sum of the digits of `nums[i]` equals $i$.
- By iterating from $i = 0$ to $n - 1$ sequentially, the very first index that satisfies the condition is guaranteed to be the smallest valid index.
- If such an index is encountered, we return it immediately.
- If the loop finishes without finding any match, return `-1`.

### 2. Digit Sum Helper
To compute the sum of digits of a non-negative integer $n$:
- Initialize `sum = 0`.
- While $n > 0$:
  - Extract the last digit: `sum += n % 10`.
  - Truncate the last digit: `n /= 10`.
- Return `sum`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N \log_{10}(\max(\text{nums})))$
  - With $N \le 100$ and $\text{nums}[i] \le 1000$, each number has at most $4$ digits.
  - The loop performs at most $100 \times 4 = 400$ basic operations, executing in under $1\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Only constant extra memory is used for iteration variables and digit accumulation.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
