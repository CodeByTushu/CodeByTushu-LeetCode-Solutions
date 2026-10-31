# LeetCode 2946: Matrix Similarity After Cyclic Shifts

- **Publication Date:** 27 March 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/matrix-similarity-after-cyclic-shifts/](https://leetcode.com/problems/matrix-similarity-after-cyclic-shifts/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/ZEbsF_RRncI?si=SP0ppPsNVpjt5xx_)

---

## Problem Summary

You are given an $m \times n$ integer matrix `mat` and an integer `k`. The matrix rows are 0-indexed.

The following process happens `k` times:
- **Even-indexed rows** ($0, 2, 4, \dots$) are cyclically shifted to the **left**.
- **Odd-indexed rows** ($1, 3, 5, \dots$) are cyclically shifted to the **right**.

Return `true` if the final modified matrix after $k$ steps is identical to the original matrix, and `false` otherwise.

---

### Examples

#### Example 1:
- **Input:** `mat = [[1, 2, 3], [4, 5, 6], [7, 8, 9]], k = 4`
- **Output:** `false`
- **Explanation:**
  - $n = 3$, so shifting $4$ times is equivalent to shifting $4 \pmod 3 = 1$ time.
  - In each step, left shift is applied to rows 0 and 2, and right shift to row 1.
  - After 4 steps:
    - Row 0 becomes `[2, 3, 1]` $\ne$ `[1, 2, 3]`
    - Row 1 becomes `[6, 4, 5]` $\ne$ `[4, 5, 6]`
    - Row 2 becomes `[8, 9, 7]` $\ne$ `[7, 8, 9]`
  - The matrix is not identical to the original, so return `false`.

#### Example 2:
- **Input:** `mat = [[1, 2, 1, 2], [5, 5, 5, 5], [6, 3, 6, 3]], k = 2`
- **Output:** `true`
- **Explanation:**
  - $n = 4$, $k = 2$.
  - Shifting row 0 (`[1, 2, 1, 2]`) left by 2 yields `[1, 2, 1, 2]`.
  - Shifting row 1 (`[5, 5, 5, 5]`) right by 2 yields `[5, 5, 5, 5]`.
  - Shifting row 2 (`[6, 3, 6, 3]`) left by 2 yields `[6, 3, 6, 3]`.
  - The entire matrix remains identical to the original, so return `true`.

#### Example 3:
- **Input:** `mat = [[2, 2], [2, 2]], k = 3`
- **Output:** `true`
- **Explanation:**
  All elements in each row are identical, so any cyclic shift leaves the matrix unchanged. Return `true`.

---

### Constraints

- $1 \le m == \text{mat.length} \le 25$
- $1 \le n == \text{mat}[i]\text{.length} \le 25$
- $1 \le \text{mat}[i][j] \le 25$
- $1 \le k \le 50$

---

## Key Invariant & Algorithmic Approach

A cyclic shift of an array of length $n$ by $k$ positions repeats periodically with period $n$. Therefore, we first reduce $k$:
$$k = k \pmod n$$

If $k = 0$, zero shifts occur, meaning the matrix is guaranteed to be unchanged, so we immediately return `true`.

### Symmetry of Left and Right Invariance:
For any row $A$ of length $n$:
1. A **left shift** by $k$ moves the element at original index $(j + k) \pmod n$ to index $j$.
   For the row to be invariant under left shift:
   $$A[j] = A[(j + k) \pmod n] \quad \text{for all } j \in [0, n - 1]$$
2. A **right shift** by $k$ moves the element at original index $(j - k + n) \pmod n$ to index $j$.
   For the row to be invariant under right shift:
   $$A[j] = A[(j - k + n) \pmod n] \quad \text{for all } j \in [0, n - 1]$$

Notice that since shifting is a cyclic permutation, $A[j] = A[(j + k) \pmod n]$ for all $j$ if and only if $A[j] = A[(j - k + n) \pmod n]$ for all $j$! The condition for invariance is identical regardless of shift direction.

Thus, we simply iterate through every row $i$ and column $j$:
- If $\text{mat}[i][j] \ne \text{mat}[i][(j + k) \pmod n]$, return `false`.
- If all cells match their shifted counterparts, return `true`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(m \cdot n)$
  - We iterate through each element of the $m \times n$ matrix exactly once, performing an $\mathcal{O}(1)$ index arithmetic and comparison check.
  - Given $m, n \le 25$, at most $625$ operations are performed, which executes in $< 1\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - No extra data structures or copies of the matrix are allocated.
