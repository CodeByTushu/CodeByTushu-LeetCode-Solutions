# LeetCode 1301: Number of Paths with Max Score

- **Publication Date:** 05 July 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/number-of-paths-with-max-score/](https://leetcode.com/problems/number-of-paths-with-max-score/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/E9IDkU781ZM?si=vKUxb-fT4btuBGmZ)

---

## Problem Summary

You are given a square `board` of characters. You can move on the board starting at the bottom right square marked with the character `'S'`.

You need to reach the top left square marked with the character `'E'`. The rest of the squares are labeled either with a numeric character `1, 2, ..., 9` or with an obstacle `'X'`. In one move you can go **up**, **left**, or **up-left (diagonally)** only if there is no obstacle there.

Return a list of two integers:
1. The **maximum sum** of numeric characters you can collect.
2. The **number of such paths** that you can take to get that maximum sum, taken **modulo** $10^9 + 7$.

In case there is no path from `'S'` to `'E'`, return `[0, 0]`.

---

### Examples

#### Example 1:

- **Input:** `board = ["E23","2X2","12S"]`
- **Output:** `[7, 1]`
- **Explanation:**
  - One optimal path: $(2, 2) \to (2, 1) \to (1, 0) \to (0, 0)$
  - Collected values: $2 + 2 + 3 = 7$ (or via symmetric route).

#### Example 2:

- **Input:** `board = ["E12","1X1","21S"]`
- **Output:** `[4, 2]`
- **Explanation:**
  - Two distinct paths achieve the maximum score of 4:
    - Path 1: $(2, 2) \to (1, 2) \to (0, 1) \to (0, 0)$ with sum $1 + 1 + 2 = 4$
    - Path 2: $(2, 2) \to (2, 1) \to (1, 0) \to (0, 0)$ with sum $1 + 1 + 2 = 4$

#### Example 3:

- **Input:** `board = ["E11","XXX","11S"]`
- **Output:** `[0, 0]`
- **Explanation:**
  - There is a row of obstacles `'XXX'` completely blocking the way to `'E'`. No path exists.

---

### Constraints

- $2 \le \text{board.length} == \text{board}[i].\text{length} \le 100$

---

## Topics and Tags

- **Array**
- **Dynamic Programming**
- **Matrix**

---

## Intuition and Approach

### 1. Reverse Traversal DP State
The problem asks us to start from bottom-right `'S'` at $(n - 1, n - 1)$ and reach top-left `'E'` at $(0, 0)$ moving:
- Up: $(i - 1, j)$
- Left: $(i, j - 1)$
- Up-Left (diagonal): $(i - 1, j - 1)$

Looking at it from the perspective of cell $(i, j)$, it can be reached from:
- Down: $(i + 1, j)$
- Right: $(i, j + 1)$
- Down-Right: $(i + 1, j + 1)$

This naturally lends itself to a bottom-up Dynamic Programming approach starting from $(n - 1, n - 1)$ towards $(0, 0)$.

### 2. State Tracking: Maximum Score & Path Counts
For each cell $(i, j)$, we maintain two quantities:
1. `score[i][j]`: The maximum numeric sum obtainable from `'S'` up to cell $(i, j)$. If $(i, j)$ is unreachable, `score[i][j] = -1`.
2. `ways[i][j]`: The number of distinct paths that achieve `score[i][j]` from `'S'`, taken modulo $10^9 + 7$.

### 3. Transition Logic
- Base Case:
  - `score[n - 1][n - 1] = 0`
  - `ways[n - 1][n - 1] = 1`
  - All other cells initialized to `score = -1` and `ways = 0`.
- For each cell $(i, j)$ iterating backwards from $(n - 1, n - 1)$ to $(0, 0)$:
  - If `board[i][j] == 'X'`, skip the cell.
  - Inspect its 3 possible source directions: $(i + 1, j)$, $(i, j + 1)$, and $(i + 1, j + 1)$.
  - Find the highest score among reachable neighbors: `best = max(score[ni][nj])`.
  - If `best != -1`:
    - Sum the path counts from all neighbors that tied for `best`: `count = sum(ways[ni][nj]) % MOD`.
    - Add the cell's own numeric character value (if character is between `'1'` and `'9'`).
    - Store `score[i][j] = best + value` and `ways[i][j] = count`.

### 4. Final Answer
- Target cell is $(0, 0)$ (the cell `'E'`).
- If `ways[0][0] == 0`, no valid path reached `'E'`, so return `[0, 0]`.
- Otherwise, return `[score[0][0], ways[0][0]]`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N^2)$
  - The grid has $N \times N$ cells with $N \le 100$.
  - Each cell evaluates at most 3 adjacent predecessor cells in $\mathcal{O}(1)$ time.
  - Overall time operations $\le 3 \times 10^4$, executing in under $10\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(N^2)$
  - Storing the two $N \times N$ DP matrices `score` and `ways` consumes $\mathcal{O}(N^2)$ memory ($\approx 100 \times 100 \times 4\text{ bytes} \approx 40\text{ KB}$).

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
