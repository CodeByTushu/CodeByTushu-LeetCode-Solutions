# LeetCode 3882: Minimum XOR Path in a Grid

- **Publication Date:** 28 October 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-xor-path-in-a-grid/](https://leetcode.com/problems/minimum-xor-path-in-a-grid/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/NrkY7VcxGE0?si=RBVHzfCjAHrfQfs-)

---

## Problem Summary

You are given a 2D integer array `grid` of size `m x n`.

You start at the top-left cell `(0, 0)` and want to reach the bottom-right cell `(m - 1, n - 1)`. At each step, you may move either **right** or **down**.

The cost of a path is defined as the bitwise XOR of all the values in the cells along that path, including the start and end cells.

Return the **minimum possible XOR value** among all valid paths from `(0, 0)` to `(m - 1, n - 1)`.

---

### Examples

#### Example 1:
- **Input:** `grid = [[1,2],[3,4]]`
- **Output:** `6`
- **Explanation:**
  - Path 1: `(0, 0) -> (0, 1) -> (1, 1)` with XOR: $1 \oplus 2 \oplus 4 = 7$
  - Path 2: `(0, 0) -> (1, 0) -> (1, 1)` with XOR: $1 \oplus 3 \oplus 4 = 6$
  - The minimum XOR value among all valid paths is `6`.

#### Example 2:
- **Input:** `grid = [[6,7],[5,8]]`
- **Output:** `9`
- **Explanation:**
  - Path 1: `(0, 0) -> (0, 1) -> (1, 1)` with XOR: $6 \oplus 7 \oplus 8 = 9$
  - Path 2: `(0, 0) -> (1, 0) -> (1, 1)` with XOR: $6 \oplus 5 \oplus 8 = 11$
  - The minimum XOR value among all valid paths is `9`.

#### Example 3:
- **Input:** `grid = [[2,7,5]]`
- **Output:** `0`
- **Explanation:**
  - There is only one valid path:
    `(0, 0) -> (0, 1) -> (0, 2)` with XOR: $2 \oplus 7 \oplus 5 = 0$
  - The XOR value of this path is `0`, which is the minimum possible.

---

### Constraints

- $1 \le m == \text{grid.length} \le 1000$
- $1 \le n == \text{grid}[i]\text{.length} \le 1000$
- $m \times n \le 1000$
- $0 \le \text{grid}[i][j] \le 1023$

---

## Topics and Tags

- **Array**
- **Dynamic Programming**
- **Bit Manipulation**
- **Matrix**

---

## Approach & Intuition

### 1. Dynamic Programming with Reachability States

1. **Key Invariants & Observations:**
   - At each cell `(i, j)`, we can only arrive from either the top neighbor `(i - 1, j)` or the left neighbor `(i, j - 1)`.
   - The cell values satisfy $0 \le \text{grid}[i][j] \le 1023 < 2^{10}$.
   - The bitwise XOR operation preserves the upper bound $2^{10} - 1 = 1023$. Thus, the XOR sum along any path can never exceed $1023$.
   - The total number of cells in the grid is at most $1000$ ($m \times n \le 1000$).
   - This small state space ($1024$ possible XOR values per cell) makes state-reachability Dynamic Programming ideal and blazing fast.

2. **DP State Representation:**
   - Define `dp[i][j][x]` as a boolean value indicating whether an XOR path sum of `x` ($0 \le x < 1024$) is achievable at cell `(i, j)`.

3. **Transitions:**
   - Base Case: At `(0, 0)`, the only achievable XOR sum is `grid[0][0]`:
     $$\text{dp}[0][0][\text{grid}[0][0]] = \text{true}$$
   - For any other cell `(i, j)`:
     - An XOR value `x` is reachable at `(i, j)` prior to incorporating `grid[i][j]` if:
       - $i > 0$ and $\text{dp}[i - 1][j][x] == \text{true}$, OR
       - $j > 0$ and $\text{dp}[i][j - 1][x] == \text{true}$.
     - When reachable, transition the new state:
       $$\text{dp}[i][j][x \oplus \text{grid}[i][j]] = \text{true}$$

4. **Extracting the Minimum XOR Value:**
   - Iterate $x$ from $0$ to $1023$.
   - The first $x$ for which $\text{dp}[m - 1][n - 1][x] == \text{true}$ is our answer.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(m \times n \times 1024)$
  - With $m \times n \le 1000$, the total number of state checks is at most $1000 \times 1024 \approx 1.024 \times 10^6$ basic operations, executing in under $15\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(m \times n \times 1024)$
  - A 3D boolean table of dimensions $m \times n \times 1024$ requires $\approx 1\text{ MB}$ of memory, well within standard LeetCode memory limits.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/NrkY7VcxGE0?si=RBVHzfCjAHrfQfs-](https://youtu.be/NrkY7VcxGE0?si=RBVHzfCjAHrfQfs-)
