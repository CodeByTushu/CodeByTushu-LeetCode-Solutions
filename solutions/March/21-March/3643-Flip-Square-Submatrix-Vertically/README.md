# LeetCode 3643: Flip Square Submatrix Vertically

- **Publication Date:** 21 March 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/flip-square-submatrix-vertically/](https://leetcode.com/problems/flip-square-submatrix-vertically/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

You are given an $m \times n$ integer matrix `grid`, and three integers `x`, `y`, and `k`.

- `(x, y)` represents the row and column indices of the **top-left corner** of a square submatrix.
- `k` represents the size (side length) of the square submatrix.

Your task is to **flip the square submatrix vertically** (i.e. reverse the order of its rows from top to bottom) while keeping the remainder of the matrix unchanged, and return the modified `grid`.

---

### Examples

#### Example 1:
- **Input:**
  ```text
  grid = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
  ], x = 1, y = 0, k = 3
  ```
- **Output:**
  ```text
  [
    [1, 2, 3, 4],
    [13, 14, 15, 8],
    [9, 10, 11, 12],
    [5, 6, 7, 16]
  ]
  ```
- **Explanation:**
  The $3 \times 3$ submatrix starting at `(1, 0)` spans rows 1 to 3 and columns 0 to 2.
  Row 1 (`[5, 6, 7]`) and Row 3 (`[13, 14, 15]`) are swapped, while Row 2 (`[9, 10, 11]`) remains in place.

#### Example 2:
- **Input:** `grid = [[3, 4, 2, 3], [2, 3, 4, 2]], x = 0, y = 2, k = 2`
- **Output:** `[[3, 4, 4, 2], [2, 3, 2, 3]]`
- **Explanation:**
  The submatrix starts at `(0, 2)` with size $2 \times 2$:
  - Original submatrix elements: row 0 has `[2, 3]`, row 1 has `[4, 2]`.
  - After vertical flip: row 0 becomes `[4, 2]`, row 1 becomes `[2, 3]`.

---

### Constraints

- $m == \text{grid.length}$
- $n == \text{grid}[i]\text{.length}$
- $1 \le m, n \le 50$
- $1 \le \text{grid}[i][j] \le 100$
- $0 \le x < m$
- $0 \le y < n$
- $1 \le k \le \min(m - x, n - y)$

---

## Intuition & Algorithmic Approach

The problem requires a vertical flip of a square submatrix in-place. A vertical flip is mathematically equivalent to reversing the row order within the target boundary $[x, x + k - 1]$.

### Two-Pointer Simulation:
1. Initialize two pointers representing the row indices of the square submatrix:
   - `top = x`
   - `bottom = x + k - 1`
2. While `top < bottom`:
   - Iterate across each column $j$ in the submatrix range $[y, y + k - 1]$.
   - Swap `grid[top][j]` and `grid[bottom][j]`.
   - Increment `top` and decrement `bottom`.
3. Return the modified `grid`.

Since the operation only modifies elements within the $k \times k$ region directly on the input matrix, no extra allocations are required.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(k^2)$
  - There are $\lfloor k / 2 \rfloor$ row pairs to swap, and each swap visits $k$ column elements, taking $\mathcal{O}(k^2)$ operations.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - All swaps are performed in-place using a single temporary variable.
