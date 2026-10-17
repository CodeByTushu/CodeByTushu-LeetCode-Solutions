# LeetCode 3718: Smallest Missing Multiple of K

- **Publication Date:** 25 August 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/smallest-missing-multiple-of-k/](https://leetcode.com/problems/smallest-missing-multiple-of-k/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/OdnT2Zwdr74?si=MS3GVoWnevP6KzZF)

---

## Problem Summary

Given an integer array `nums` and an integer `k`, return the **smallest positive multiple of $k$ that is missing from `nums`**.

A multiple of $k$ is defined as any positive integer divisible by $k$ (i.e., $k, 2k, 3k, 4k, \dots$).

---

### Examples

#### Example 1:

- **Input:** `nums = [8, 2, 3, 4, 6]`, `k = 2`
- **Output:** `10`
- **Explanation:**
  - The positive multiples of $k = 2$ are $2, 4, 6, 8, 10, 12, \dots$
  - The numbers $2, 4, 6, 8$ are present in `nums`.
  - The smallest multiple not found in `nums` is $10$.

#### Example 2:

- **Input:** `nums = [1, 4, 7, 10, 15]`, `k = 5`
- **Output:** `5`
- **Explanation:**
  - The positive multiples of $k = 5$ are $5, 10, 15, 20, \dots$
  - The smallest multiple $5$ is missing from `nums`.

---

### Constraints

- $1 \le \text{nums.length} \le 100$
- $1 \le \text{nums}[i] \le 100$
- $1 \le k \le 100$

---

## Topics and Tags

- **Array**
- **Hash Table**
- **Math**

---

## Intuition and Approach

### 1. Hash Set for Fast Membership Testing
To quickly determine whether candidate multiples of $k$ exist in `nums`, we can insert all elements of `nums` into a hash set. This provides $\mathcal{O}(1)$ average-time lookup for each query.

### 2. Linear Multiple Increment
We begin testing positive multiples of $k$ starting at $k$:
- Check if $k$ is present in the hash set.
- If it is present, increment by $k$ to check $2k, 3k, \dots$
- As soon as a multiple is not found in the hash set, that value is guaranteed to be the smallest missing multiple of $k$.

### 3. Bound on Iterations
By the Pigeonhole Principle, among the first $N + 1$ multiples of $k$ (where $N = \text{nums.length}$), at most $N$ can exist in the set. Hence, the while loop will execute at most $N + 1$ times before finding a missing multiple.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - Inserting $N$ elements into a hash set takes $\mathcal{O}(N)$ time.
  - The search loop performs at most $N + 1$ set lookups, each taking $\mathcal{O}(1)$ on average.
  - Overall time complexity: $\mathcal{O}(N)$.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - Used to store the elements of `nums` in a hash set.
