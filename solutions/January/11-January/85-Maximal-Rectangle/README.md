# LeetCode 85: Maximal Rectangle

- **Publication Date:** 11 January 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/maximal-rectangle/](https://leetcode.com/problems/maximal-rectangle/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/OfV_jfrkgXQ?si=BbO1eLgvjoMJA5oD)

---

## Problem Summary

Given a `rows x cols` binary `matrix` filled with `'0'`s and `'1'`s, find the largest rectangle containing only `'1'`s and return its area.

---

### Examples

#### Example 1:
- **Input:** `matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]`
- **Output:** `6`
- **Explanation:** The maximal rectangle has an area of 6 (a 2 × 3 rectangle formed by rows 1 and 2, columns 2 to 4).

#### Example 2:
- **Input:** `matrix = [["0"]]`
- **Output:** `0`

#### Example 3:
- **Input:** `matrix = [["1"]]`
- **Output:** `1`

---

### Constraints

- $\text{rows} == \text{matrix.length}$
- $\text{cols} == \text{matrix}[i].\text{length}$
- $1 \le \text{rows}, \text{cols} \le 200$
- `matrix[i][j]` is `'0'` or `'1'`.

---

## Topics and Tags

- **Array**
- **Dynamic Programming**
- **Stack**
- **Matrix**
- **Monotonic Stack**

---

## Approach & Intuition

### 1. Histogram Reduction via Monotonic Stack

This problem can be elegantly converted into multiple instances of **LeetCode 84: Largest Rectangle in Histogram**.

1. **Histogram Heights per Row:**
   - Maintain a 1D array `heights` of length `cols`.
   - For each row $i$:
     - If `matrix[i][j] == '1'`, increment `heights[j]` by 1.
     - If `matrix[i][j] == '0'`, reset `heights[j]` to 0 (a rectangle cannot extend through a zero).
   - Now, the values in `heights` represent the heights of consecutive 1s ending at row $i$.

2. **Finding the Maximal Rectangle in the Histogram:**
   - For each row's histogram `heights`, we find the largest rectangle using a **monotonic increasing stack**.
   - As we scan each bar:
     - While the current bar is shorter than the bar at the top of the stack, we pop the top index, using its height as the bounding rectangle height.
     - The width is determined by the distance between the current index and the index now at the top of the stack.
     - Update the global maximum area.
   - Each column index is pushed and popped at most once per row, resulting in $\mathcal{O}(\text{cols})$ time per row.

Combining all rows gives an optimal $\mathcal{O}(\text{rows} \times \text{cols})$ total time complexity.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(M \times N)$, where $M = \text{rows}$ and $N = \text{cols}$. For each of the $M$ rows, updating heights takes $\mathcal{O}(N)$ time, and the monotonic stack processes the $N$ histogram bars in linear $\mathcal{O}(N)$ time.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$ to store the `heights` array and the monotonic stack.

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
