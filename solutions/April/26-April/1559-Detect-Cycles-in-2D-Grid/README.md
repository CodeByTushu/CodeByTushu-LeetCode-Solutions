# LeetCode 1559: Detect Cycles in 2D Grid

- **Publication Date:** 26 April 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/detect-cycles-in-2d-grid/](https://leetcode.com/problems/detect-cycles-in-2d-grid/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/ludY7iumbDI)

---

## Problem Summary

Given a 2D array of characters `grid` of size $m \times n$, you need to find if there exists any cycle consisting of the **same value** in `grid`.

A cycle is a path of **length 4 or more** in the grid that starts and ends at the same cell. From a given cell, you can move to one of the cells adjacent to it — in one of the four directions (up, down, left, or right), if it has the **same value** as the current cell.

Also, you cannot move to the cell that you visited in your last move (i.e. direct backtracking along the same edge is disallowed).

Return `true` if any cycle of the same value exists in `grid`, otherwise return `false`.

---

### Examples

#### Example 1:
- **Input:** `grid = [["a","a","a","a"],["a","b","b","a"],["a","b","b","a"],["a","a","a","a"]]`
- **Output:** `true`
- **Explanation:** There are two valid cycles:
  1. The outer perimeter formed by character `'a'`.
  2. The inner $2 \times 2$ block formed by character `'b'`.

#### Example 2:
- **Input:** `grid = [["c","c","c","a"],["c","d","c","c"],["c","c","e","c"],["f","c","c","c"]]`
- **Output:** `true`
- **Explanation:** There is a cycle of length $\ge 4$ formed by the character `'c'`.

#### Example 3:
- **Input:** `grid = [["a","b","b"],["b","z","b"],["b","b","a"]]`
- **Output:** `false`
- **Explanation:** No cycle of length 4 or more consisting of the same character exists without immediate backtracking.

---

### Constraints

- $m == \text{grid.length}$
- $n == \text{grid}[i].\text{length}$
- $1 \le m, n \le 500$
- `grid` consists only of lowercase English letters.

---

## Topics and Tags

- **Array**
- **Depth-First Search**
- **Breadth-First Search**
- **Union Find**
- **Matrix**

---

## Approach & Intuition

### 1. Graph Cycle Detection Model

- Treat each cell $(r, c)$ in the grid as a graph vertex $u = r \times n + c$.
- An undirected edge exists between adjacent cells $(r_1, c_1)$ and $(r_2, c_2)$ if and only if $\text{grid}[r_1][c_1] == \text{grid}[r_2][c_2]$.
- Since the grid graph is bipartite, any simple cycle must have an even length $\ge 4$. Thus, detecting any non-trivial undirected cycle is equivalent to finding a cycle of length $\ge 4$.

### 2. Disjoint Set Union (DSU / Kruskal-Style Edge Processing)

- To avoid deep recursion stack limits on large $500 \times 500$ grids (up to $250,000$ cells), we can detect cycles iteratively using **Disjoint Set Union (DSU)**:
  1. Initialize each of the $m \times n$ cells in its own independent set.
  2. Iterate through every cell $(r, c)$ and consider only its **unprocessed undirected edges**:
     - Right neighbor: $(r, c + 1)$
     - Down neighbor: $(r + 1, c)$
  3. If an adjacent neighbor shares the same character:
     - Check `find(u)` and `find(v)`:
       - If `find(u) == find(v)`, both endpoints already belong to the same connected component. Adding this new edge closes an independent loop, which is guaranteed to form a cycle of length $\ge 4$! Return `true` immediately.
       - Otherwise, merge the two components via `union(u, v)`.
  4. If all edges are processed without encountering an already-connected pair, return `false`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(m \cdot n \cdot \alpha(m \cdot n))$
  - There are at most $2 \cdot m \cdot n$ edges considered.
  - Each DSU operation with path compression and union by rank takes nearly constant $\mathcal{O}(\alpha(V))$ time.
  - Runs in $\approx 20\text{ ms}$ in Java/C++ and $\approx 80\text{ ms}$ in Python/JS.

- **Auxiliary Space Complexity:** $\mathcal{O}(m \cdot n)$
  - Flat 1D `parent` and `rank` arrays of size $m \times n$.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/ludY7iumbDI](https://youtu.be/ludY7iumbDI)
