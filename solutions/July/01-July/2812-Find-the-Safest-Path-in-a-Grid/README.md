# LeetCode 2812: Find the Safest Path in a Grid

- **Publication Date:** 01 July 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/find-the-safest-path-in-a-grid/](https://leetcode.com/problems/find-the-safest-path-in-a-grid/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/NvG19Aj7__Q?si=9Jjox02w3nEN8WHc)

---

## Problem Summary

You are given a 0-indexed 2D matrix `grid` of size `n x n`, where `(r, c)` represents:
- A cell containing a thief if `grid[r][c] == 1`
- An empty cell if `grid[r][c] == 0`

You are initially positioned at cell `(0, 0)`. In one move, you can move to any adjacent cell in the grid, including cells containing thieves.

The **safeness factor** of a path on the grid is defined as the **minimum** Manhattan distance from any cell in the path to any thief in the grid.

Return *the **maximum safeness factor** of all paths leading to cell `(n - 1, n - 1)`*.

An adjacent cell of cell `(r, c)` is one of the cells `(r, c + 1)`, `(r, c - 1)`, `(r + 1, c)`, and `(r - 1, c)` if it exists.

The **Manhattan distance** between two cells `(a, b)` and `(x, y)` is equal to `|a - x| + |b - y|`.

---

### Examples

#### Example 1:

- **Input:** `grid = [[1,0,0],[0,0,0],[0,0,1]]`
- **Output:** `0`
- **Explanation:** All paths from `(0, 0)` to `(n - 1, n - 1)` go through the thieves in cells `(0, 0)` and `(n - 1, n - 1)`.

#### Example 2:

- **Input:** `grid = [[0,0,1],[0,0,0],[0,0,0]]`
- **Output:** `2`
- **Explanation:** The path `(0, 0) -> (1, 0) -> (2, 0) -> (2, 1) -> (2, 2)` has a safeness factor of `2` since:
  - The closest cell of the path to the thief at cell `(0, 2)` is cell `(0, 0)`. The distance between them is `|0 - 0| + |0 - 2| = 2`.
  - It can be shown that there are no other paths with a higher safeness factor.

#### Example 3:

- **Input:** `grid = [[0,0,0,1],[0,0,0,0],[0,0,0,0],[1,0,0,0]]`
- **Output:** `2`
- **Explanation:** The path `(0, 0) -> (0, 1) -> (1, 1) -> (2, 1) -> (3, 1) -> (3, 2) -> (3, 3)` has a safeness factor of `2` since:
  - The closest cell of the path to the thief at cell `(0, 3)` is cell `(1, 2)`. The distance between them is `|0 - 1| + |3 - 2| = 2`.
  - The closest cell of the path to the thief at cell `(3, 0)` is cell `(3, 2)`. The distance between them is `|3 - 3| + |0 - 2| = 2`.
  - It can be shown that there are no other paths with a higher safeness factor.

---

### Constraints

- $1 \le \text{grid.length} == n \le 400$
- $\text{grid}[i]\text{.length} == n$
- $\text{grid}[i][j]$ is either `0` or `1`.
- There is at least one thief in the grid.

---

## Topics and Tags

- **Array**
- **Binary Search**
- **Breadth-First Search**
- **Matrix**

---

## Intuition and Approach

### 1. Multi-Source BFS for Distance Map:
First, we compute the shortest Manhattan distance from every cell $(r, c)$ in the $n \times n$ grid to its nearest thief.
- We push all cells containing a thief (`grid[i][j] == 1`) into a BFS queue simultaneously with distance `0`.
- We initialize a distance matrix `dist` with `-1` (unvisited).
- Running multi-source BFS expands outwardly in concentric layers (4-directionally). Each cell visited receives its exact minimum Manhattan distance to any thief.
- Time complexity: $\mathcal{O}(N^2)$ because each cell is visited at most once.

### 2. Binary Search on the Answer + Feasibility Check:
We want to maximize the minimum distance encountered on a path from `(0, 0)` to `(n - 1, n - 1)`.
- The possible safeness factor ranges from `0` to `2 * n`.
- For any candidate safeness factor `mid`:
  - A path is valid if every cell on the path satisfies `dist[r][c] >= mid`.
  - Specifically, if `dist[0][0] < mid` or `dist[n - 1][n - 1] < mid`, reaching the target with safeness `mid` is impossible.
  - Otherwise, we perform a standard BFS starting at `(0, 0)` and only stepping onto unvisited cells where `dist[nr][nc] >= mid`.
  - If `(n - 1, n - 1)` is reachable, `canReach(mid)` returns `true`.
- Since safeness is monotonic (if a path with safeness $X$ exists, paths with safeness $< X$ also exist), binary search over $[0, 2n]$ finds the optimal maximum safeness factor in $\mathcal{O}(\log(2n))$ BFS trials.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N^2 \log N)$
  - Multi-source BFS takes $\mathcal{O}(N^2)$ time to populate `dist`.
  - Binary search tests $\mathcal{O}(\log(2N))$ values.
  - Each check runs a grid BFS in $\mathcal{O}(N^2)$ time.
  - Total time: $\mathcal{O}(N^2 + N^2 \log N) = \mathcal{O}(N^2 \log N)$. For $N = 400$, $N^2 = 1.6 \times 10^5$, which easily runs well within standard time limits.
- **Auxiliary Space Complexity:** $\mathcal{O}(N^2)$
  - $N \times N$ matrix for `dist` and visited arrays `vis`.
  - BFS queue holds at most $\mathcal{O}(N^2)$ states.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
