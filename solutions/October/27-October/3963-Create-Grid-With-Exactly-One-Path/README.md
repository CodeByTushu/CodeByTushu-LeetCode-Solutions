# LeetCode 3963: Create Grid With Exactly One Path

- **Publication Date:** 27 October 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/create-grid-with-exactly-one-path/](https://leetcode.com/problems/create-grid-with-exactly-one-path/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/J4p5P8kF-ew?si=sUChr_JXe0VqNVUB)

---

## Problem Summary

You are given two integers `m` and `n`, representing the number of rows and columns of a grid.

Construct **any** `m x n` grid consisting only of the characters `'.'` and `'#'`, where:
- `'.'` represents a free cell.
- `'#'` represents an obstacle cell.

A valid path is a sequence of free cells that:
- Starts at the top-left cell `(0, 0)`.
- Ends at the bottom-right cell `(m - 1, n - 1)`.
- Moves only:
  - **Right**, from `(i, j)` to `(i, j + 1)`, or
  - **Down**, from `(i, j)` to `(i + 1, j)`.

Return **any grid** such that there is **exactly one valid path** from the top-left cell to the bottom-right cell.

---

### Examples

#### Example 1:
- **Input:** `m = 2, n = 3`
- **Output:** `["...", "##."]`
- **Explanation:**
  - The top-left cell is `(0, 0)` and the bottom-right cell is `(1, 2)`.
  - The only valid path moves entirely right along row 0 and then down along column 2:
    `(0, 0) -> (0, 1) -> (0, 2) -> (1, 2)`
  - Moving down from `(0, 0)` or `(0, 1)` is blocked by obstacles `'#'` at `(1, 0)` and `(1, 1)`.

#### Example 2:
- **Input:** `m = 3, n = 3`
- **Output:** `["...", "##.", "##."]`
- **Explanation:**
  - The unique valid path moves along row 0 to `(0, 2)` and then straight down along column 2:
    `(0, 0) -> (0, 1) -> (0, 2) -> (1, 2) -> (2, 2)`
  - All other interior cells are obstacles `'#'`, ensuring no branch or alternative route exists.

#### Example 3:
- **Input:** `m = 1, n = 4`
- **Output:** `["...."]`
- **Explanation:**
  - The only valid path is moving horizontally: `(0, 0) -> (0, 1) -> (0, 2) -> (0, 3)`.

---

### Constraints

- $1 \le m, n \le 25$

---

## Topics and Tags

- **Array**
- **String**
- **Matrix**
- **Simulation**
- **Constructive Algorithm**

---

## Approach & Intuition

### 1. Deterministic Single-Path Construction (L-Shape Path)

1. **Problem Analysis:**
   - Any valid path from `(0, 0)` to `(m - 1, n - 1)` can only move **Right** or **Down**.
   - If multiple paths exist, a path branches whenever a cell has *both* its right neighbor `(i, j + 1)` and its down neighbor `(i + 1, j)` as free cells `'.'`.
   - To guarantee **exactly one valid path**, we can force a canonical single corridor with zero branching:
     - Move all the way right along row `0` from `(0, 0)` to `(0, n - 1)`.
     - Move all the way down along column `n - 1` from `(0, n - 1)` to `(m - 1, n - 1)`.

2. **Grid Layout Strategy:**
   - Set every cell in row `0` (`i == 0`) to `'.'`.
   - Set every cell in column `n - 1` (`j == n - 1`) to `'.'`.
   - Set all remaining cells (`i > 0` and `j < n - 1`) to obstacles `'#'`.

3. **Proof of Uniqueness:**
   - At cell `(0, j)` for any $j < n - 1$:
     - The down neighbor `(1, j)` is `'#'` (blocked).
     - Hence, the only allowable move is moving right to `(0, j + 1)`.
   - At cell `(0, n - 1)`:
     - The right direction is out of bounds.
     - The only allowable move is moving down to `(1, n - 1)`.
   - At cell `(i, n - 1)` for $i > 0$:
     - Moving right is out of bounds.
     - The cell is free, and we can only move down until reaching `(m - 1, n - 1)`.
   - No other free cells exist, meaning zero alternative paths can ever be formed.
   - Therefore, there exists **strictly and exactly one valid path**.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(M \times N)$
  - Generating $M$ strings of length $N$ takes direct linear time proportional to the total number of cells in the grid. Since $M, N \le 25$, this executes in $< 1\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(M \times N)$
  - Memory required to store the resulting grid strings.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/J4p5P8kF-ew?si=sUChr_JXe0VqNVUB](https://youtu.be/J4p5P8kF-ew?si=sUChr_JXe0VqNVUB)
