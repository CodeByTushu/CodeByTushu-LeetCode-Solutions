# LeetCode 3225: Maximum Score From Grid Operations

- **Publication Date:** 29 April 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/maximum-score-from-grid-operations/](https://leetcode.com/problems/maximum-score-from-grid-operations/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/3FrjmpNSm34)

---

## Problem Summary

You are given a 2D matrix `grid` of size $n \times n$. Initially, all cells of the grid are colored white. In one operation, you can select any cell of indices $(i, j)$, and color black all the cells of the $j$-th column starting from the top row down to the $i$-th row.

The grid score is the sum of all `grid[i][j]` such that cell $(i, j)$ is white and it has a horizontally adjacent black cell.

Return the *maximum score* that can be achieved after some number of operations.

---

### Examples

#### Example 1:
- **Input:** `grid = [[0,0,0,0,0],[0,0,3,0,0],[0,1,0,0,0],[5,0,0,3,0],[0,0,0,0,2]]`
- **Output:** `11`
- **Explanation:**
  - Color all cells in column 1 down to row 3.
  - Color all cells in column 4 down to row 4 (the last row).
  - The score is $\text{grid}[3][0] + \text{grid}[1][2] + \text{grid}[3][3] = 5 + 3 + 3 = 11$.

#### Example 2:
- **Input:** `grid = [[10,9,0,0,5],[0,7,8,0,10],[1,0,0,2,0],[10,0,4,0,0],[0,0,3,0,0]]`
- **Output:** `37`

---

### Constraints

- $n == \text{grid.length} == \text{grid}[i].\text{length}$
- $1 \le n \le 100$
- $0 \le \text{grid}[i][j] \le 10^9$

---

## Topics and Tags

- **Array**
- **Dynamic Programming**
- **Matrix**
- **Prefix Sum**

---

## Approach & Intuition

### 1. Operation Mechanics & Scoring Rule
- Coloring a column $j$ down to row $i$ means the top $i + 1$ cells (rows $0 \dots i$) become black, and the remaining cells (rows $i + 1 \dots n - 1$) stay white.
- Let $h_j \in [0, n]$ denote the height of black cells chosen for column $j$:
  - $h_j = 0$ means the entire column remains white.
  - $h_j = k$ means rows $0 \dots k - 1$ are black, and rows $k \dots n - 1$ are white.
- A cell at $(r, j)$ is scored if:
  1. It is white ($r \ge h_j$).
  2. It has an adjacent black cell horizontally, which means either $r < h_{j - 1}$ or $r < h_{j + 1}$.

### 2. Dynamic Programming State Design
Because scoring horizontally connects adjacent columns ($j - 1, j, j + 1$), decisions can be framed column-by-column:
- `prevPick[prev]`: The maximum score up to column $j - 1$ when column $j - 1$ was colored down to height `prev`.
- `prevSkip[prev]`: The maximum score up to column $j - 1$ when column $j - 1$ was empty / bypassed, inheriting the reach `prev` from column $j - 2$.

When transitioning to column $j$ with height `curr`:
1. **Case 1: $curr > prev$ (Current column is taller than previous)**
   - Column $j$ covers rows $0 \dots curr - 1$.
   - The white cells in column $j - 1$ from row $prev$ to $curr - 1$ are adjacent to column $j$'s black cells.
   - Score gained: $\sum_{r=prev}^{curr - 1} \text{grid}[r][j - 1]$.
   - Both `currPick[curr]` and `currSkip[curr]` can transition from `prevSkip[prev] + score`.
2. **Case 2: $curr \le prev$ (Previous column is taller than current)**
   - Column $j - 1$ has black cells down to $prev$.
   - The white cells in column $j$ from row $curr$ to $prev - 1$ are adjacent to column $j - 1$'s black cells.
   - Score gained: $\sum_{r=curr}^{prev - 1} \text{grid}[r][j]$.
   - `currPick[curr]` gains this score from `prevPick[prev]`.
   - `currSkip[curr]` retains `prevPick[prev]` without double-scoring since column $j$ can be bypassed.

### 3. Complexity
- With $n \le 100$, evaluating all pairs of $(curr, prev)$ for each of the $n$ columns requires $n \times (n + 1)^2 \approx 10^6$ operations, which executes in $< 10\text{ ms}$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n^3)$
  - Prefix sums of column segments are precomputed in $\mathcal{O}(n^2)$.
  - $n$ columns with $(n + 1) \times (n + 1)$ transitions per column: $100 \times 101 \times 101 \approx 1.02 \times 10^6$ iterations.
- **Auxiliary Space Complexity:** $\mathcal{O}(n^2)$
  - $\mathcal{O}(n^2)$ for the 2D prefix sums matrix `s[n][n + 1]`.
  - $\mathcal{O}(n)$ for DP state vectors `prevPick` and `prevSkip`.

---
