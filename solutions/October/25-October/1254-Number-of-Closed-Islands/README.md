# LeetCode 1254: Number of Closed Islands

- **Publication Date:** 25 October 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/number-of-closed-islands/](https://leetcode.com/problems/number-of-closed-islands/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/VsC1e6-CwG8?si=RMKS-b7NqlJXmOwI)

---

## Problem Summary

Given a 2D `grid` consists of `0`s (land) and `1`s (water). An island is a maximal 4-directionally connected group of `0`s and a closed island is an island totally (all left, top, right, bottom) surrounded by `1`s.

Return the **number of closed islands**.

---

### Examples

#### Example 1:
- **Input:** `grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]`
- **Output:** `2`
- **Explanation:**
  - Islands completely enclosed by water (`1`s) are closed islands.
  - Land connected to the boundaries of the grid cannot be surrounded by water on all four sides.

#### Example 2:
- **Input:** `grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]`
- **Output:** `1`

#### Example 3:
- **Input:** `grid = [[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],[1,0,1,0,1,0,1],[1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1]]`
- **Output:** `2`

---

### Constraints

- $1 \le \text{grid.length}, \text{grid}[0].length \le 100$
- $0 \le \text{grid}[i][j] \le 1$

---

## Topics and Tags

- **Array**
- **Depth-First Search**
- **Breadth-First Search**
- **Union Find**
- **Matrix**

---

## Approach & Intuition

### 1. Eliminating Boundary-Connected Land

1. **Definition of a Closed Island:**
   - A closed island must be strictly surrounded by water (`1`s) on all 4 directions (left, right, top, bottom).
   - If any cell in a connected land component touches the boundary of the grid ($i = 0$, $i = m - 1$, $j = 0$, or $j = n - 1$), that component can **never** be a closed island because it extends to the perimeter without water shielding that edge.

2. **Step 1 — Flood Fill All Boundary Land:**
   - Scan the first row, last row, first column, and last column.
   - For every land cell (`grid[i][j] == 0`), initiate a Depth-First Search (DFS) / flood-fill to turn all connected land cells into water (`1`).
   - By eliminating all boundary-connected land upfront, every remaining land cell in the grid is guaranteed to belong to a completely enclosed, closed island.

3. **Step 2 — Count Internal Islands:**
   - Iterate through the interior cells ($1 \le i < m - 1$, $1 \le j < n - 1$).
   - When an unvisited land cell (`grid[i][j] == 0`) is discovered:
     - Increment `count` by $1$.
     - Run DFS to mark the entire closed island as visited (converting `0`s to `1`s).

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(M \times N)$
  - Each cell is visited at most a constant number of times during the boundary elimination and internal counting phases.
- **Auxiliary Space Complexity:** $\mathcal{O}(M \times N)$
  - In the worst case (e.g., a grid full of land), recursion call stack depth reaches $\mathcal{O}(M \times N)$. In-place modification uses $\mathcal{O}(1)$ additional memory.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/VsC1e6-CwG8?si=RMKS-b7NqlJXmOwI](https://youtu.be/VsC1e6-CwG8?si=RMKS-b7NqlJXmOwI)
