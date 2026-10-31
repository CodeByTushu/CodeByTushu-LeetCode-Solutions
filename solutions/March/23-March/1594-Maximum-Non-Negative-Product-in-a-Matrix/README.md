# LeetCode 1594: Maximum Non Negative Product in a Matrix

- **Publication Date:** 23 March 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/maximum-non-negative-product-in-a-matrix/](https://leetcode.com/problems/maximum-non-negative-product-in-a-matrix/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/-DyeWqkVQxE?si=uUNwp4XTwZyIOlG9)

---

## Problem Summary

You are given an $m \times n$ matrix `grid`. Initially, you are located at the top-left corner `(0, 0)`, and in each step, you can only move **right** or **down** in the matrix.

Among all possible paths starting from the top-left corner `(0, 0)` and ending at the bottom-right corner `(m - 1, n - 1)`, find the path with the **maximum non-negative product**. The product of a path is the product of all integers in the visited grid cells.

Return the maximum non-negative product **modulo** $10^9 + 7$. If the maximum product is negative, return `-1`.

> **Note:** The modulo operation is performed **after** finding the maximum product.

---

### Examples

#### Example 1:
- **Input:** `grid = [[-1, -2, -3], [-2, -3, -3], [-3, -3, -2]]`
- **Output:** `-1`
- **Explanation:**
  It is not possible to obtain a non-negative product along any path from `(0, 0)` to `(2, 2)`, so return `-1`.

#### Example 2:
- **Input:** `grid = [[1, -2, 1], [1, -2, 1], [3, -4, 1]]`
- **Output:** `8`
- **Explanation:**
  The path with the maximum non-negative product is:
  $$(0, 0) \to (1, 0) \to (1, 1) \to (2, 1) \to (2, 2)$$
  Product: $1 \times 1 \times (-2) \times (-4) \times 1 = 8$.

#### Example 3:
- **Input:** `grid = [[1, 3], [0, -4]]`
- **Output:** `0`
- **Explanation:**
  The path with maximum non-negative product is:
  $$(0, 0) \to (1, 0) \to (1, 1)$$
  Product: $1 \times 0 \times (-4) = 0$.

---

### Constraints

- $m == \text{grid.length}$
- $n == \text{grid}[i]\text{.length}$
- $1 \le m, n \le 15$
- $-4 \le \text{grid}[i][j] \le 4$

---

## Intuition & Algorithmic Approach

Because matrix cells may contain negative integers, multiplying by a negative number can turn a very small (large magnitude negative) product into an extremely large positive product. Conversely, multiplying a large positive product by a negative value turns it into a small negative product.

Consequently, a greedy approach that tracks only the maximum product fails. We must maintain **both** the maximum product and the minimum product reachable at each cell $(i, j)$ using Dynamic Programming.

### 2D DP State Formulation:
Let:
- `maxProd[i][j]`: Maximum product of any valid path from `(0, 0)` to `(i, j)`.
- `minProd[i][j]`: Minimum product of any valid path from `(0, 0)` to `(i, j)`.

### State Transitions:
For any cell $(i, j)$, you can only arrive from either the top cell $(i - 1, j)$ or the left cell $(i, j - 1)$.
Multiplying each incoming extremum by `grid[i][j]` yields 4 candidate values:
1. `maxProd[i - 1][j] * grid[i][j]`
2. `minProd[i - 1][j] * grid[i][j]`
3. `maxProd[i][j - 1] * grid[i][j]`
4. `minProd[i][j - 1] * grid[i][j]`

Then:
$$\text{maxProd}[i][j] = \max(c_1, c_2, c_3, c_4)$$
$$\text{minProd}[i][j] = \min(c_1, c_2, c_3, c_4)$$

### Precision & Modulo:
With $m, n \le 15$, path length is at most $15 + 15 - 1 = 29$.
The maximum product is at most $4^{29} = 2^{58} \approx 2.88 \times 10^{17}$, which fits comfortably inside a standard signed 64-bit integer (`long` / `long long` / `BigInt`).
If `maxProd[m - 1][n - 1] < 0`, return `-1`. Otherwise, return `maxProd[m - 1][n - 1] % 1_000_000_007`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(m \cdot n)$
  - Each cell computes $\mathcal{O}(1)$ transitions from its top and left neighbors. For $m, n \le 15$, this requires at most 225 cell updates.
- **Auxiliary Space Complexity:** $\mathcal{O}(m \cdot n)$
  - Two DP tables of size $m \times n$ store the 64-bit maximum and minimum products.
