# LeetCode 1861: Rotating the Box

- **Publication Date:** 06 May 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/rotating-the-box/](https://leetcode.com/problems/rotating-the-box/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/wPgQkJgUYIo)

---

## Problem Summary

You are given an $m \times n$ matrix of characters `boxGrid` representing a side-view of a box. Each cell of the box is one of the following:
- A stone `'#'`
- A stationary obstacle `'*'`
- Empty `'.'`

The box is rotated **90 degrees clockwise**, causing some of the stones to fall due to gravity. Each stone falls down until it lands on an obstacle, another stone, or the bottom of the box. Gravity does not affect the obstacles' positions, and inertia from rotation does not affect horizontal positions.

Return an $n \times m$ matrix representing the box after rotation.

---

### Examples

#### Example 1:
- **Input:** `boxGrid = [["#",".","#"]]`
- **Output:** `[["."],["#"],["#"]]`

#### Example 2:
- **Input:**
  ```text
  [["#",".","*","."],
   ["#","#","*","."]]
  ```
- **Output:**
  ```text
  [["#","."],
   ["#","#"],
   ["*","*"],
   [".","."]]
  ```

#### Example 3:
- **Input:**
  ```text
  [["#","#","*",".","*","."],
   ["#","#","#","*",".","."],
   ["#","#","#",".","#","."]]
  ```
- **Output:**
  ```text
  [[".","#","#"],
   [".","#","#"],
   ["#","#","*"],
   ["#","*","."],
   ["#",".","*"],
   ["#",".","."]]
  ```

---

### Constraints

- $m == \text{boxGrid.length}$
- $n == \text{boxGrid}[i]\text{.length}$
- $1 \le m, n \le 500$
- `boxGrid[i][j]` is either `'#'`, `'*'`, or `'.'`.

---

## Topics and Tags

- **Array**
- **Two Pointers**
- **Matrix**

---

## Approach & Intuition

### 1. Gravity Equivalence (Horizontal Falling)

When an $m \times n$ box is rotated $90^\circ$ clockwise:
- Downward gravity in the rotated box corresponds directly to stones falling **to the right** (towards index $n - 1$) along each row of the original box before rotation!
- Since obstacles `'*'` never move and gravity works independently within each row, we can simulate gravity row-by-row before performing rotation.

### 2. Two-Pointer Gravity Simulation per Row

For each row $i$:
1. Maintain an `emptySlot` pointer pointing to the rightmost available spot, initially set to $n - 1$.
2. Iterate $j$ from $n - 1$ down to $0$:
   - If `boxGrid[i][j] == '*'`:
     - An obstacle blocks all stones from falling further right.
     - Reset `emptySlot = j - 1`.
   - If `boxGrid[i][j] == '#'`:
     - Move the stone to `emptySlot`:
       - `boxGrid[i][j] = '.'`
       - `boxGrid[i][emptySlot] = '#'`
     - Decrement `emptySlot--`.
   - If `boxGrid[i][j] == '.'`:
     - The cell is empty, so `emptySlot` continues to point to this or a further right empty cell.

### 3. $90^\circ$ Clockwise Rotation

After settling all stones to the right:
- Allocate an $n \times m$ result matrix `res`.
- Map cell $(i, j)$ in `boxGrid` to $(j, m - 1 - i)$ in `res`:
  $$\text{res}[j][m - 1 - i] = \text{boxGrid}[i][j]$$

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(m \times n)$
  - A single right-to-left scan per row applies gravity: $\mathcal{O}(m \times n)$.
  - A second pass maps cells to the rotated result matrix: $\mathcal{O}(m \times n)$.
  - Total time complexity is strictly linear in terms of total grid cells $\mathcal{O}(m \times n)$.

- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Gravity simulation is performed in-place on `boxGrid`.
  - The $n \times m$ result matrix is required for output.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/wPgQkJgUYIo](https://youtu.be/wPgQkJgUYIo)
