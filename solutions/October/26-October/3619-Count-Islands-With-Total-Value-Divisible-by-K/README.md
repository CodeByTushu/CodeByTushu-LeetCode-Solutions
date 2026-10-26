# LeetCode 3619: Count Islands With Total Value Divisible by K

- **Publication Date:** 26 October 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/count-islands-with-total-value-divisible-by-k/](https://leetcode.com/problems/count-islands-with-total-value-divisible-by-k/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/KE5jOvt9ZLo?si=AOiRfurGqjv4F1pi)

---

## Problem Summary

You are given an `m x n` matrix `grid` and a positive integer `k`. An island is a group of positive integers (representing land) that are 4-directionally connected (horizontally or vertically).

The **total value** of an island is the sum of the values of all cells in the island.

Return the **number of islands** with a total value **divisible by `k`**.

---

### Examples

#### Example 1:
- **Input:** `grid = [[0,2,1,0,0],[0,5,0,0,5],[0,0,1,0,0],[0,1,4,7,0],[0,2,0,0,8]], k = 5`
- **Output:** `2`
- **Explanation:**
  - The grid contains four islands.
  - Island 1: Cells with values `[2, 1, 5]` have total sum $= 2 + 1 + 5 = 8$ (not divisible by 5).
  - Island 2: Cell with value `[5]` has total sum $= 5$ (divisible by 5: $5 \pmod 5 == 0$).
  - Island 3: Cells with values `[1, 1, 4, 7, 2]` have total sum $= 1 + 1 + 4 + 7 + 2 = 15$ (divisible by 5: $15 \pmod 5 == 0$).
  - Island 4: Cell with value `[8]` has total sum $= 8$ (not divisible by 5).
  - Hence, there are 2 islands with total value divisible by 5.

#### Example 2:
- **Input:** `grid = [[3,0,3,0],[0,3,0,3],[3,0,3,0]], k = 3`
- **Output:** `6`
- **Explanation:**
  - The grid contains six islands, each having a single cell with value `3`.
  - Since each island total sum $= 3$, and $3 \pmod 3 == 0$, all 6 islands are divisible by 3.

---

### Constraints

- $m == \text{grid.length}$
- $n == \text{grid}[i].length$
- $1 \le m, n \le 1000$
- $1 \le m \times n \le 10^5$
- $0 \le \text{grid}[i][j] \le 10^6$
- $1 \le k \le 10^6$

---

## Topics and Tags

- **Array**
- **Depth-First Search**
- **Breadth-First Search**
- **Matrix**
- **Math**

---

## Approach & Intuition

### 1. Connected Component Island Traversal

1. **Island Definition & Invariants:**
   - Any cell with `grid[i][j] > 0` represents land. Cells with `grid[i][j] == 0` represent water.
   - An island is a connected component formed by moving horizontally and vertically (4 directions) across adjacent land cells.
   - Each land cell belongs to exactly one island.

2. **Iterative Stack DFS (Flood Fill):**
   - We scan through every cell $(i, j)$ in the matrix.
   - Whenever an unvisited positive cell (`grid[i][j] > 0`) is discovered, it marks the entry point of a new island.
   - To avoid recursive call stack overflow on large grids ($m \times n \le 10^5$), we employ an iterative DFS with an explicit flat array stack `stack[m * n]`.
   - We maintain a 64-bit integer (`long` in Java/C++) for `sum` to prevent integer overflow, since the island sum can reach up to $10^5 \times 10^6 = 10^{11}$.

3. **In-Place Visited Marking & Accumulation:**
   - As each cell is pushed or popped from the stack, we add its value to `sum` and mutate `grid[r][c] = 0` to mark it visited in $\mathcal{O}(1)$ auxiliary space.
   - We explore all 4 adjacent neighbors $(nr, nc) \in \{(r+1, c), (r-1, c), (r, c+1), (r, c-1)\}$. If a neighbor is within grid bounds and is strictly positive (`grid[nr][nc] > 0`), we accumulate its value, set `grid[nr][nc] = 0`, and push its flattened index `nr * n + nc` onto the stack.

4. **Divisibility Check:**
   - After traversing all connected cells of the island, we check if `sum % k == 0`.
   - If true, we increment our island counter `count++`.
   - Continue until all cells in the matrix are processed.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(M \times N)$
  - Every cell in the grid is visited and processed at most a constant number of times across outer iterations and iterative DFS traversals.
- **Auxiliary Space Complexity:** $\mathcal{O}(M \times N)$
  - The stack array holds at most $M \times N$ cell indices in the worst case (when the entire grid is one giant connected island).

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/KE5jOvt9ZLo?si=AOiRfurGqjv4F1pi](https://youtu.be/KE5jOvt9ZLo?si=AOiRfurGqjv4F1pi)
