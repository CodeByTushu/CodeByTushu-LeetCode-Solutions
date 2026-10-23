# LeetCode 1975: Maximum Matrix Sum

- **Publication Date:** 05 January 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/maximum-matrix-sum/](https://leetcode.com/problems/maximum-matrix-sum/)
- **YouTube Solution:** *Coming Soon* ⏳

---

## Problem Summary

You are given an `n x n` integer `matrix`. You can do the following operation any number of times:
- Choose any two **adjacent** elements of `matrix` and multiply each of them by `-1`.

Two elements are considered adjacent if and only if they share a border.

Your goal is to maximize the summation of the matrix's elements. Return *the maximum sum of the matrix's elements using the operation mentioned above*.

---

### Examples

#### Example 1:
- **Input:** `matrix = [[1,-1],[-1,1]]`
- **Output:** `4`
- **Explanation:** We can reach sum equals 4 by:
  - Multiplying the 2 elements in the first row by -1.
  - Multiplying the 2 elements in the first column by -1.

#### Example 2:
- **Input:** `matrix = [[1,2,3],[-1,-2,-3],[1,2,3]]`
- **Output:** `16`
- **Explanation:** Multiply the 2 last elements in the second row by -1.

---

### Constraints

- $n == \text{matrix.length} == \text{matrix}[i]\text{.length}$
- $2 \le n \le 250$
- $-10^5 \le \text{matrix}[i][j] \le 10^5$

---

## Topics and Tags

- **Array**
- **Greedy**
- **Matrix**

---

## Approach & Intuition

### 1. Parity of Negative Signs (Greedy Invariant)

- **Propagation of Negative Signs:**
  Multiplying any two adjacent elements by $-1$ allows us to shift a negative sign from one cell to its neighbor. Since the grid is fully connected, a negative sign can be moved to any arbitrary cell in the matrix through a sequence of adjacent flips.
- **Pairwise Cancellation:**
  When two negative signs are positioned adjacent to each other, a single operation turns both into positive values ($(-1) \times (-1) = 1$).
  Hence, any two negative numbers in the matrix can cancel each other out.
- **Decision Based on Parity:**
  - **Even Count of Negatives:**
    All negative signs can be paired up and eliminated completely. Every element in the matrix becomes positive, achieving the maximum possible sum:
    $$\sum_{i,j} |\text{matrix}[i][j]|$$
  - **Odd Count of Negatives:**
    All negative signs except one can be eliminated. To maximize the total sum, the single negative sign should be assigned to the element with the **minimum absolute value** in the whole matrix:
    $$\sum_{i,j} |\text{matrix}[i][j]| - 2 \times \min_{i,j} |\text{matrix}[i][j]|$$
  - *(Note: If any cell contains 0, it can absorb the lone negative sign without any penalty since $-0 = 0$; this is automatically covered as $\min |\text{matrix}[i][j]| = 0$.)*

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n^2)$, visiting each element of the $n \times n$ matrix exactly once.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$, using only scalar variables for the running sum, negative count, and minimum absolute value.

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
