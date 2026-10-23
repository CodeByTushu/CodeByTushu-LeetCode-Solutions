# LeetCode 1391: Check if There is a Valid Path in a Grid

- **Publication Date:** 27 April 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/check-if-there-is-a-valid-path-in-a-grid/](https://leetcode.com/problems/check-if-there-is-a-valid-path-in-a-grid/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/ZfNnXv1mH4o)

---

## Problem Summary

You are given an $m \times n$ grid. Each cell of `grid` represents a street. The street of `grid[i][j]` can be:
- **1**: connects the left cell and the right cell.
- **2**: connects the upper cell and the lower cell.
- **3**: connects the left cell and the lower cell.
- **4**: connects the right cell and the lower cell.
- **5**: connects the left cell and the upper cell.
- **6**: connects the right cell and the upper cell.

You start at cell $(0, 0)$ and want to reach cell $(m - 1, n - 1)$. A valid path is a path that starts at $(0, 0)$ and ends at $(m - 1, n - 1)$ moving only along the street directions and connecting matching ports.

Return `true` if there is a valid path in the grid, or `false` otherwise.

---

### Examples

#### Example 1:
- **Input:** `grid = [[2,4,3],[6,5,2]]`
- **Output:** `true`
- **Explanation:** You can navigate from $(0, 0) \to (1, 0) \to (1, 1) \to (0, 1) \to (0, 2) \to (1, 2) == (m - 1, n - 1)$.

#### Example 2:
- **Input:** `grid = [[1,2,1],[1,2,1]]`
- **Output:** `false`
- **Explanation:** The start cell $(0, 0)$ has street type $1$ which cannot establish a valid connection with $(0, 1)$ or $(1, 0)$.

#### Example 3:
- **Input:** `grid = [[1,1,2]]`
- **Output:** `false`
- **Explanation:** You can move from $(0, 0)$ to $(0, 1)$, but you get stuck at $(0, 1)$ because street type $1$ cannot connect to street type $2$ at $(0, 2)$.

---

### Constraints

- $m == \text{grid.length}$
- $n == \text{grid}[i].\text{length}$
- $1 \le m, n \le 300$
- $1 \le \text{grid}[i][j] \le 6$

---

## Topics and Tags

- **Array**
- **Breadth-First Search / Depth-First Search**
- **Graph**
- **Union Find**
- **Matrix**

---

## Approach & Intuition

### 1. Port Matching & Bidirectional Connectivity

For two orthogonally adjacent cells to form an active street connection, both cells must possess open ports facing each other:
1. **Rightward Connection** between $(r, c)$ and $(r, c + 1)$:
   - Cell $(r, c)$ must have an opening to the **Right**: Street Types $\{1, 4, 6\}$.
   - Cell $(r, c + 1)$ must have an opening to the **Left**: Street Types $\{1, 3, 5\}$.
2. **Downward Connection** between $(r, c)$ and $(r + 1, c)$:
   - Cell $(r, c)$ must have an opening to **Down**: Street Types $\{2, 3, 4\}$.
   - Cell $(r + 1, c)$ must have an opening to **Up**: Street Types $\{2, 5, 6\}$.

Because an edge is established if and only if both endpoints connect mutually, every valid connection in the grid is an **undirected edge**.

### 2. Disjoint Set Union (DSU)

- To determine if $(0, 0)$ can reach $(m - 1, n - 1)$, we simply check if both cells belong to the same connected component.
- Using **Disjoint Set Union (DSU)**:
  - Initialize $m \times n$ sets (each cell $u = r \times n + c$).
  - For each cell $(r, c)$, check right and down neighbors. If ports match, perform `union(u, v)`.
  - Finally, check if $\text{find}(0) == \text{find}(m \cdot n - 1)$.
- DSU avoids any recursion stack depth limitations, requires no queue allocations, and executes in near-linear time $\mathcal{O}(m \cdot n \cdot \alpha(m \cdot n))$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(m \cdot n \cdot \alpha(m \cdot n))$
  - There are at most $2 \cdot m \cdot n$ edge evaluations.
  - Each union-find operation takes $\mathcal{O}(\alpha(V))$ amortized time.
  - Total runtime is $\approx 10\text{ ms}$, easily handling grids up to $300 \times 300$.

- **Auxiliary Space Complexity:** $\mathcal{O}(m \cdot n)$
  - A 1D integer array `parent` of size $m \times n$.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/ZfNnXv1mH4o](https://youtu.be/ZfNnXv1mH4o)
