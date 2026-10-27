# LeetCode 3651: Minimum Cost Path with Teleportations

- **Publication Date:** 28 January 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/minimum-cost-path-with-teleportations/](https://leetcode.com/problems/minimum-cost-path-with-teleportations/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/D12eRxYPy34?si=sCN3PniLe7ztQshW)

---

## Problem Summary

You are given an $m \times n$ 2D integer array `grid` and an integer $k$. You start at the top-left cell $(0, 0)$ and your goal is to reach the bottom-right cell $(m - 1, n - 1)$.

There are two types of moves available:
1. **Normal move:** You can move right or down from your current cell $(i, j)$, i.e., you can move to $(i, j + 1)$ (right) or $(i + 1, j)$ (down). The cost is the value of the destination cell.
2. **Teleportation:** You can teleport from any cell $(i, j)$ to any cell $(x, y)$ such that $\text{grid}[x][y] \le \text{grid}[i][j]$. The cost of this move is $0$. You may teleport at most $k$ times.

Return the **minimum total cost** to reach cell $(m - 1, n - 1)$ from $(0, 0)$. The starting cell $(0, 0)$ initially incurs $0$ cost.

---

### Examples

#### Example 1:
- **Input:** `grid = [[1,3,3],[2,5,4],[4,3,5]], k = 2`
- **Output:** `7`
- **Explanation:**
  - Initially we are at $(0, 0)$ with cost $0$.
  - Move Down to $(1, 0)$: Total cost = $0 + 2 = 2$.
  - Move Right to $(1, 1)$: Total cost = $2 + 5 = 7$.
  - Teleport to $(2, 2)$: Since $\text{grid}[2][2] \le \text{grid}[1][1]$ ($5 \le 5$), cost is $7 + 0 = 7$.
  - The minimum cost to reach the bottom-right cell is $7$.

#### Example 2:
- **Input:** `grid = [[1,2],[2,3],[3,4]], k = 1`
- **Output:** `9`
- **Explanation:**
  - Initially we are at $(0, 0)$ with cost $0$.
  - Move Down to $(1, 0)$: Total cost = $0 + 2 = 2$.
  - Move Right to $(1, 1)$: Total cost = $2 + 3 = 5$.
  - Move Down to $(2, 1)$: Total cost = $5 + 4 = 9$.
  - The minimum cost to reach the bottom-right cell is $9$.

---

### Constraints

- $2 \le m, n \le 80$
- $m == \text{grid.length}$
- $n == \text{grid}[i].\text{length}$
- $0 \le \text{grid}[i][j] \le 10^4$
- $0 \le k \le 10$

---

## Topics and Tags

- **Array**
- **Dynamic Programming**
- **Matrix**
- **Suffix Minimum Optimization**

---

## Approach & Intuition

### Key Observations

1. **DAG Structure of Normal Moves:**
   - Normal moves only proceed rightward $(i, j + 1)$ and downward $(i + 1, j)$. This defines a Directed Acyclic Graph (DAG) over the grid.
   - On a DAG, shortest paths can be found via standard Dynamic Programming in topological order (row by row, column by column) in $\mathcal{O}(m \cdot n)$ time.

2. **Teleportation Invariance:**
   - A teleportation from any cell $(u, v)$ to $(x, y)$ requires $\text{grid}[x][y] \le \text{grid}[u][v]$ and adds $0$ cost.
   - Notice that consecutive teleports $(u, v) \to (a, b) \to (x, y)$ can always be replaced by a single teleport $(u, v) \to (x, y)$ because $\text{grid}[x][y] \le \text{grid}[a][b] \le \text{grid}[u][v] \implies \text{grid}[x][y] \le \text{grid}[u][v]$.
   - Hence, every optimal path alternates between normal moves and at most $k$ teleportations:
     $$\text{Start} \xrightarrow{\text{normal}} \text{Cell}_1 \xrightarrow{\text{teleport}} \text{Cell}_2 \xrightarrow{\text{normal}} \dots \xrightarrow{\text{teleport}} \text{Destination}$$

3. **Layered Dynamic Programming:**
   - Let $\text{dp}[t][r][c]$ denote the minimum cost to reach cell $(r, c)$ using at most $t$ teleportations ($0 \le t \le k$).
   - **Base Layer ($t = 0$):**
     Compute normal path cost with $0$ teleports using standard grid DP starting from $\text{dp}[0][0] = 0$.
   - **Transition from $t - 1$ to $t$:**
     - To teleport to cell $(r, c)$ with value $V = \text{grid}[r][c]$, we can jump from any cell $(u, v)$ visited in layer $t - 1$ where $\text{grid}[u][v] \ge V$ with cost $\text{dp}[t-1][u][v]$.
     - The minimal cost to jump to $(r, c)$ is therefore:
       $$\min_{\text{grid}[u][v] \ge \text{grid}[r][c]} \text{dp}[t-1][u][v]$$
     - Because this value depends solely on $\text{grid}[r][c]$, we can compute a suffix minimum array over all cell values $V \in [0, \max(\text{grid})]$ in $\mathcal{O}(\max(\text{grid}))$ time.
     - After computing teleport transitions into each cell, we perform normal moves relaxation in $\mathcal{O}(m \cdot n)$ time.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(k \cdot (m \cdot n + \max(\text{grid})))$
  - With $m, n \le 80$, $m \cdot n \le 6400$, $\max(\text{grid}) \le 10^4$, and $k \le 10$, the total number of operations is around $\approx 1.6 \times 10^5$, executing in well under $10\text{ ms}$.
- **Space Complexity:** $\mathcal{O}(m \cdot n + \max(\text{grid}))$
  - We maintain two grid layers of size $m \times n$ and auxiliary frequency/suffix arrays of size $\max(\text{grid}) + 1$.

---

## Solutions

- [Java Solution](./Solution.java)
- [Python Solution](./solution.py)
- [C++ Solution](./solution.cpp)
- [JavaScript Solution](./solution.js)
