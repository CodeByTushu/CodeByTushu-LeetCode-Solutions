# LeetCode 1979: Find Greatest Common Divisor of Array

- **Publication Date:** 18 July 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/find-greatest-common-divisor-of-array/](https://leetcode.com/problems/find-greatest-common-divisor-of-array/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/3OjdkRCfohM?si=AKPh09CWRMdBtd5e)

---

## Problem Summary

Given an integer array `nums`, return the **greatest common divisor** of the smallest number and largest number in `nums`.

The **greatest common divisor** of two numbers is the largest positive integer that evenly divides both numbers.

---

### Examples

#### Example 1:

- **Input:** `nums = [2, 5, 6, 9, 10]`
- **Output:** `2`
- **Explanation:**
  - The smallest number in `nums` is $2$.
  - The largest number in `nums` is $10$.
  - The greatest common divisor of $2$ and $10$ is $\gcd(2, 10) = 2$.

#### Example 2:

- **Input:** `nums = [7, 5, 6, 8, 3]`
- **Output:** `1`
- **Explanation:**
  - The smallest number in `nums` is $3$.
  - The largest number in `nums` is $8$.
  - The greatest common divisor of $3$ and $8$ is $\gcd(3, 8) = 1$.

#### Example 3:

- **Input:** `nums = [3, 3]`
- **Output:** `3`
- **Explanation:**
  - The smallest number in `nums` is $3$.
  - The largest number in `nums` is $3$.
  - The greatest common divisor of $3$ and $3$ is $\gcd(3, 3) = 3$.

---

### Constraints

- $2 \le \text{nums.length} \le 1000$
- $1 \le \text{nums}[i] \le 1000$

---

## Algorithmic Approach

### 1. Single-Pass Extremes Identification
- Scan through `nums` once to find the minimum value (`min`) and maximum value (`max`).
- This linear traversal operates in $\mathcal{O}(n)$ time and $\mathcal{O}(1)$ auxiliary space.

### 2. Euclidean GCD Computation
- Apply the classical Euclidean algorithm to find $\gcd(\text{min}, \text{max})$:
  - While $b \ne 0$:
    - $t = a \pmod b$
    - $a = b$
    - $b = t$
  - Return $a$.
- Because $\text{nums}[i] \le 1000$, the Euclidean algorithm completes in at most $10$ iterations ($\mathcal{O}(\log(\min A))$).

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(n + \log(\min A))$ | Finding the minimum and maximum takes a single pass over $n$ elements ($\mathcal{O}(n)$). The Euclidean algorithm on numbers $\le 1000$ runs in $\mathcal{O}(\log(\min A))$ steps. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Only a few primitive scalar variables are allocated. |

---

## Multi-Language Implementations

- [Java Solution](./Solution.java)
- [Python Solution](./solution.py)
- [C++ Solution](./solution.cpp)
- [JavaScript Solution](./solution.js)
