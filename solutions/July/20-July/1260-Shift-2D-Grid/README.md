# LeetCode 1260: Shift 2D Grid

- **Publication Date:** 20 July 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/shift-2d-grid/](https://leetcode.com/problems/shift-2d-grid/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/AXx9c4YUOZM?si=rkj8QeQRgQDzQuLY)

---

## Problem Summary

Given a 2D `grid` of size `m x n` and an integer `k`, return the 2D grid after shifting it `k` times.

In one shift operation:
- Element at `grid[i][j]` moves to `grid[i][j + 1]`.
- Element at `grid[i][n - 1]` moves to `grid[i + 1][0]`.
- Element at `grid[m - 1][n - 1]` moves to `grid[0][0]`.

---

### Examples

#### Example 1:

- **Input:** `grid = [[1,2,3],[4,5,6],[7,8,9]], k = 1`
- **Output:** `[[9,1,2],[3,4,5],[6,7,8]]`
- **Explanation:**
  - Every element shifts by 1 position forward in row-major order.
  - The last element `9` wraps around to `[0][0]`.

#### Example 2:

- **Input:** `grid = [[3,8,1,9],[19,7,2,5],[4,6,11,10],[12,0,21,13]], k = 4`
- **Output:** `[[12,0,21,13],[3,8,1,9],[19,7,2,5],[4,6,11,10]]`
- **Explanation:**
  - Since $n = 4$ columns, shifting by 4 positions shifts every row down by exactly 1 row, wrapping the last row to the top.

#### Example 3:

- **Input:** `grid = [[1,2,3],[4,5,6],[7,8,9]], k = 9`
- **Output:** `[[1,2,3],[4,5,6],[7,8,9]]`
- **Explanation:**
  - Total cells is $3 \times 3 = 9$. Shifting by $9$ is equivalent to shifting by $9 \pmod 9 = 0$, leaving the grid unchanged.

---

### Constraints

- $m == \text{grid.length}$
- $n == \text{grid}[i]\text{.length}$
- $1 \le m \le 50$
- $1 \le n \le 50$
- $-1000 \le \text{grid}[i][j] \le 1000$
- $0 \le k \le 100$

---

## Algorithmic Approach

The problem asks us to perform cyclic shifts on a 2D grid in row-major order. We can map the 2D matrix directly to a 1D array to avoid simulating $k$ individual step-by-step movements.

### 1. 1D Coordinate Flattening
- A cell at row $i$ and column $j$ corresponds to a unique 1D index:
  $$\text{idx} = i \times n + j$$
  where total cells is $\text{total} = m \times n$.

### 2. Modulo Optimization
- Performing $\text{total}$ shifts results in the original grid configuration.
- We only need to shift by:
  $$k = k \pmod{\text{total}}$$
- The destination 1D index for cell $(i, j)$ is:
  $$\text{newIdx} = (\text{idx} + k) \pmod{\text{total}}$$

### 3. Coordinate Conversion
- Convert $\text{newIdx}$ back to 2D indices:
  $$r = \lfloor\text{newIdx} / n\rfloor, \quad c = \text{newIdx} \pmod n$$
- Place the original element $\text{grid}[i][j]$ directly into $\text{ans}[r][c]$.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(m \times n)$ | We iterate through each of the $m \times n$ cells once and perform $\mathcal{O}(1)$ arithmetic operations per cell. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Beyond the resulting output matrix/list, only a few primitive integer variables are maintained. |

---

## Multi-Language Implementations

- [Java Solution](./Solution.java)
- [Python Solution](./solution.py)
- [C++ Solution](./solution.cpp)
- [JavaScript Solution](./solution.js)
