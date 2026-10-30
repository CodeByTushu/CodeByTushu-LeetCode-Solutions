# LeetCode 2906: Construct Product Matrix

- **Publication Date:** 24 March 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/construct-product-matrix/](https://leetcode.com/problems/construct-product-matrix/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

Given a 0-indexed 2D integer matrix `grid` of size $n \times m$, define a 0-indexed 2D matrix `p` of size $n \times m$ as the **product matrix** of `grid` such that:

- Each element `p[i][j]` equals the product of all elements in `grid` **except** for `grid[i][j]`, taken modulo $12345$.

Return the product matrix `p`.

---

### Examples

#### Example 1:
- **Input:** `grid = [[1, 2], [3, 4]]`
- **Output:** `[[24, 12], [8, 6]]`
- **Explanation:**
  - `p[0][0] = 2 * 3 * 4 = 24`
  - `p[0][1] = 1 * 3 * 4 = 12`
  - `p[1][0] = 1 * 2 * 4 = 8`
  - `p[1][1] = 1 * 2 * 3 = 6`

#### Example 2:
- **Input:** `grid = [[12345], [2], [1]]`
- **Output:** `[[2], [0], [0]]`
- **Explanation:**
  - `p[0][0] = 2 * 1 = 2`
  - `p[1][0] = 12345 * 1 = 12345 % 12345 = 0`
  - `p[2][0] = 12345 * 2 = 24690 % 12345 = 0`

---

### Constraints

- $1 \le n == \text{grid.length} \le 10^5$
- $1 \le m == \text{grid}[i]\text{.length} \le 10^5$
- $2 \le n \cdot m \le 10^5$
- $1 \le \text{grid}[i][j] \le 10^9$

---

## Intuition & Algorithmic Approach

In standard array problems, "product except self" can sometimes be solved by dividing the total product by `grid[i][j]`. However, this problem requires the answer modulo $12345$.
Notice that:
$$12345 = 3 \times 5 \times 823$$
Because $12345$ is **not prime**, division using Fermat's Little Theorem or modular multiplicative inverses is mathematically invalid whenever $\gcd(\text{grid}[i][j], 12345) > 1$.

### Two-Pass Prefix and Suffix Scan:
We can view the $n \times m$ matrix as a single 1D flattened array traversed in row-major order:
1. **Forward Prefix Pass:**
   - Initialize `prefix = 1`.
   - Traverse the matrix in row-major order from `(0, 0)` to `(n - 1, m - 1)`.
   - Set `p[i][j] = prefix`.
   - Update `prefix = (prefix * (grid[i][j] % 12345)) % 12345`.
2. **Backward Suffix Pass:**
   - Initialize `suffix = 1`.
   - Traverse the matrix in reverse row-major order from `(n - 1, m - 1)` down to `(0, 0)`.
   - Multiply `p[i][j] = (p[i][j] * suffix) % 12345`.
   - Update `suffix = (suffix * (grid[i][j] % 12345)) % 12345`.

This directly computes the product of all elements strictly preceding `grid[i][j]` and strictly succeeding `grid[i][j]` without requiring division.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n \cdot m)$
  - Two passes visiting each cell in the matrix once with $\mathcal{O}(1)$ multiplication and modulo operations per cell.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Modifies and populates the return matrix `p` directly without auxiliary arrays.
