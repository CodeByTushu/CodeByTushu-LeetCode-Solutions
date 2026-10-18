# LeetCode 3286: Find a Safe Walk Through a Grid

- **Publication Date:** 02 July 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/find-a-safe-walk-through-a-grid/](https://leetcode.com/problems/find-a-safe-walk-through-a-grid/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/qwi9A01vQCM?si=ofSN8LxSltsQYN_t)

---

## Problem Summary

You are given an `m x n` binary matrix `grid` and an integer `health`.

You start on the upper left corner `(0, 0)` and would like to get to the lower right corner `(m - 1, n - 1)`.

You can move up, down, left, or right from one cell to another adjacent cell as long as your health remains positive.

Cells `(i, j)` with `grid[i][j] == 1` are considered unsafe and reduce your health by 1.

Return `true` if you can reach the final cell with a health value of 1 or more, and `false` otherwise.

---

### Examples

#### Example 1:

- **Input:** `grid = [[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]], health = 1`
- **Output:** `true`
- **Explanation:** The final cell can be reached safely by walking along the gray cells: `(0,0) -> (1,0) -> (2,0) -> (2,1) -> (2,2) -> (1,2) -> (0,2) -> (0,3) -> (0,4) -> (1,4) -> (2,4)`. The walk avoids all unsafe cells, preserving all initial health.

#### Example 2:

- **Input:** `grid = [[0,1,1,0,0,0],[1,0,1,0,0,0],[0,1,1,1,0,1],[0,0,1,0,1,0]], health = 3`
- **Output:** `false`
- **Explanation:** A minimum of 4 health points is needed to reach the final cell safely. Any path requires passing through at least 3 unsafe cells, dropping health to 0 or below before reaching the end.

#### Example 3:

- **Input:** `grid = [[1,1,1],[1,0,1],[1,1,1]], health = 5`
- **Output:** `true`
- **Explanation:** The walk requires navigating through unsafe cells, but initial health of 5 allows reaching `(m - 1, n - 1)` with positive health remaining (final health = 1).

---

### Constraints

- $m == \text{grid.length}$
- $n == \text{grid}[i]\text{.length}$
- $1 \le m, n \le 50$
- $2 \le m \times n$
- $1 \le \text{health} \le m + n$
- $\text{grid}[i][j]$ is either `0` or `1`.

---

## Topics and Tags

- **Array**
- **Breadth-First Search**
- **Graph**
- **Heap (Priority Queue)**
- **Matrix**
- **Shortest Path**

---

## Intuition and Approach

### 1. Modeling as a Shortest Path / Maximum Health Problem:
The goal is to determine if there exists any path from `(0, 0)` to `(m - 1, n - 1)` such that the accumulated health upon reaching each cell remains $\ge 1$.
- Stepping onto a cell `(nx, ny)` costs `grid[nx][ny]` health.
- At any cell `(x, y)`, we want to maximize the remaining health `h`.
- If we maximize the remaining health upon reaching every cell, we can determine whether reaching `(m - 1, n - 1)` with `h >= 1` is possible.

### 2. Modified Dijkstra's Algorithm (Max-Heap):
- We maintain a 2D array `best[m][n]` initialized to `-1`, where `best[x][y]` stores the maximum health with which we have reached cell `(x, y)`.
- Initial state:
  - `startHealth = health - grid[0][0]`
  - If `startHealth <= 0`, we cannot even start, so return `false`.
  - Otherwise, set `best[0][0] = startHealth` and push `(startHealth, 0, 0)` into a max-priority queue.
- While the priority queue is not empty:
  - Pop the state with the highest remaining health `(h, x, y)`.
  - If `h != best[x][y]`, discard it (stale state).
  - If `x == m - 1` and `y == n - 1`, we have reached the destination with positive health, return `true`.
  - For each of the 4 adjacent neighbors `(nx, ny)`:
    - Compute `nh = h - grid[nx][ny]`.
    - If `nh > 0` and `nh > best[nx][ny]`, update `best[nx][ny] = nh` and push `(nh, nx, ny)` into the priority queue.
- If the priority queue empties without reaching `(m - 1, n - 1)`, return `false`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(M \cdot N \log(M \cdot N))$
  - There are $M \cdot N$ grid cells. In the worst case, each cell can be pushed and popped from the priority queue $\mathcal{O}(1)$ times with monotonic updates.
  - With $M, N \le 50$, $M \cdot N \le 2500$, which executes in $< 10\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(M \cdot N)$
  - 2D array `best` of size $M \times N$.
  - Priority queue holding at most $\mathcal{O}(M \cdot N)$ elements.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
