# LeetCode 1411: Number of Ways to Paint N × 3 Grid

- **Publication Date:** 03 January 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/number-of-ways-to-paint-n-3-grid/](https://leetcode.com/problems/number-of-ways-to-paint-n-3-grid/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/IZyi08lZqrE?si=laJUkP2Ylz9ulm-6)

---

## Problem Summary

You have a `grid` of size `n x 3` and you want to paint each cell of the grid with exactly one of the three colors: **Red**, **Yellow**, or **Green** while making sure that no two adjacent cells have the same color (i.e., no two cells that share vertical or horizontal sides have the same color).

Given `n` the number of rows of the grid, return *the number of ways you can paint this `grid`*. As the answer may grow large, the answer **must be computed modulo $10^9 + 7$**.

---

### Examples

#### Example 1:
- **Input:** `n = 1`
- **Output:** `12`
- **Explanation:** There are 12 possible ways to paint the grid as shown (6 patterns using 2 colors, and 6 patterns using 3 colors).

#### Example 2:
- **Input:** `n = 5000`
- **Output:** `30228214`

---

### Constraints

- $n == \text{grid.length}$
- $1 \le n \le 5000$

---

## Topics and Tags

- **Dynamic Programming**
- **Math**

---

## Approach & Intuition

### 1. State Classification & Dynamic Programming

Each row has 3 cells $(c_1, c_2, c_3)$ with 3 available colors, subject to horizontal adjacency constraints ($c_1 \neq c_2$ and $c_2 \neq c_3$).

Valid single-row configurations naturally divide into two symmetric classes:
1. **Type A (2 distinct colors, e.g., $A-B-A$):**
   - Choose color $A$: 3 choices.
   - Choose color $B$: 2 choices.
   - Cell 3 must match $A$: 1 choice.
   - Total patterns = $3 \times 2 \times 1 = 6$.
2. **Type B (3 distinct colors, e.g., $A-B-C$):**
   - Choose color $A$: 3 choices.
   - Choose color $B$: 2 choices.
   - Choose color $C$: 1 choice.
   - Total patterns = $3 \times 2 \times 1 = 6$.

For $n = 1$, total ways = $6 + 6 = 12$.

### 2. Transition Matrix Between Rows

When placing a new row beneath an existing row, no two vertically aligned cells may share a color:
- **From Type A ($A-B-A$):**
  - Transitions to 3 new Type A rows (e.g., $B-A-B$, $B-C-B$, $C-A-C$).
  - Transitions to 2 new Type B rows (e.g., $B-A-C$, $C-A-B$).
- **From Type B ($A-B-C$):**
  - Transitions to 2 new Type A rows (e.g., $B-C-B$, $B-A-B$).
  - Transitions to 2 new Type B rows (e.g., $B-C-A$, $C-A-B$).

### 3. Recurrence Relations

For each row $i$ from $2$ to $n$:
$$\text{next\_color2} = (3 \times \text{color2} + 2 \times \text{color3}) \pmod{10^9 + 7}$$
$$\text{next\_color3} = (2 \times \text{color2} + 2 \times \text{color3}) \pmod{10^9 + 7}$$

Final result:
$$(\text{color2} + \text{color3}) \pmod{10^9 + 7}$$

This requires only $\mathcal{O}(n)$ time and $\mathcal{O}(1)$ auxiliary space.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$, performing a single constant-time arithmetic loop from row 2 up to $n$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$, maintaining only two scalar state counters across transitions.

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
