# LeetCode 3212: Count Submatrices With Equal Frequency of X and Y

- **Publication Date:** 19 March 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/count-submatrices-with-equal-frequency-of-x-and-y/](https://leetcode.com/problems/count-submatrices-with-equal-frequency-of-x-and-y/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

Given a 2D character matrix `grid`, where `grid[i][j]` is either `'X'`, `'Y'`, or `'.'`.

Return the number of **submatrices** that contain:
1. `grid[0][0]` (the top-left element)
2. An **equal frequency** of `'X'` and `'Y'`
3. At least one `'X'` (i.e. `countX == countY >= 1`)

---

### Examples

#### Example 1:
- **Input:** `grid = [["X","Y","."],["Y",".","."]]`
- **Output:** `3`
- **Explanation:**
  The 3 valid submatrices anchored at `(0, 0)` are:
  - From `(0, 0)` to `(0, 1)`: contains 1 `'X'` and 1 `'Y'` $\rightarrow$ Equal and $\ge 1$.
  - From `(0, 0)` to `(0, 2)`: contains 1 `'X'` and 1 `'Y'` $\rightarrow$ Equal and $\ge 1$.
  - From `(0, 0)` to `(1, 0)`: contains 1 `'X'` and 1 `'Y'` $\rightarrow$ Equal and $\ge 1$.

#### Example 2:
- **Input:** `grid = [["X","X"],["X","Y"]]`
- **Output:** `0`
- **Explanation:**
  No submatrix anchored at `(0, 0)` contains an equal number of `'X'` and `'Y'`.

#### Example 3:
- **Input:** `grid = [[".","."],[".","."]]`
- **Output:** `0`
- **Explanation:**
  There are no `'X'` characters, so the condition of at least one `'X'` is never satisfied.

---

### Constraints

- $1 \le m, n \le 1000$ where $m = \text{grid.length}$ and $n = \text{grid}[i]\text{.length}$
- $1 \le m \cdot n \le 10^6$
- `grid[i][j]` is either `'X'`, `'Y'`, or `'.'`.

---

## Intuition & Algorithmic Approach

Every valid submatrix is required to contain `grid[0][0]`. Therefore, the top-left cell of every candidate submatrix is fixed at `(0, 0)`, and the submatrix is uniquely identified by its bottom-right cell `(i, j)`.

For each cell `(i, j)`, we need to determine:
- `countX(i, j)`: Total occurrences of `'X'` within the rectangle from `(0, 0)` to `(i, j)`.
- `countY(i, j)`: Total occurrences of `'Y'` within the rectangle from `(0, 0)` to `(i, j)`.

A submatrix bounded by `(0, 0)` and `(i, j)` is valid if and only if:
$$\text{countX}(i, j) = \text{countY}(i, j) \quad \text{and} \quad \text{countX}(i, j) \ge 1$$

### Space-Optimized Running Prefix Sum:
Rather than storing two full $m \times n$ tables, we can maintain two 1D arrays:
- `colX[j]`: running sum of `'X'` in column `j` from row `0` up to row `i`.
- `colY[j]`: running sum of `'Y'` in column `j` from row `0` up to row `i`.

For each row `i`, we update `colX[j]` and `colY[j]`. As we iterate horizontally from $j = 0$ to $n - 1$, we maintain running cumulative sums `currentX` and `currentY`:
- `currentX += colX[j]`
- `currentY += colY[j]`

`currentX` and `currentY` immediately represent the total frequencies of `'X'` and `'Y'` in the 2D range `(0, 0)` to `(i, j)`. If `currentX == currentY && currentX > 0`, we increment our counter.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(m \cdot n)$
  - We visit each cell in the $m \times n$ matrix exactly once, performing $\mathcal{O}(1)$ updates per cell.
- **Auxiliary Space Complexity:** $\mathcal{O}(n)$
  - We only allocate two 1D integer arrays of size $n$ to hold column prefix sums.
