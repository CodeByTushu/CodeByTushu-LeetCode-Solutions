# LeetCode 48: Rotate Image

- **Publication Date:** 04 May 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/rotate-image/](https://leetcode.com/problems/rotate-image/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/sWA5qAcFvZ8)

---

## Problem Summary

You are given an $n \times n$ 2D `matrix` representing an image. Rotate the image by **90 degrees (clockwise)**.

You have to rotate the image **in-place**, which means you have to modify the input 2D matrix directly. **DO NOT** allocate another 2D matrix and do the rotation.

---

### Examples

#### Example 1:
```text
1  2  3       7  4  1
4  5  6  ==>  8  5  2
7  8  9       9  6  3
```
- **Input:** `matrix = [[1,2,3],[4,5,6],[7,8,9]]`
- **Output:** `[[7,4,1],[8,5,2],[9,6,3]]`

#### Example 2:
```text
 5  1  9 11       15 13  2  5
 2  4  8 10  ==>  14  3  4  1
13  3  6  7       12  6  8  9
15 14 12 16       16  7 10 11
```
- **Input:** `matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]`
- **Output:** `[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]`

---

### Constraints

- $n == \text{matrix.length} == \text{matrix}[i]\text{.length}$
- $1 \le n \le 20$
- $-1000 \le \text{matrix}[i][j] \le 1000$

---

## Topics and Tags

- **Array**
- **Math**
- **Matrix**

---

## Approach & Intuition

### 1. Matrix Decomposition of Clockwise Rotation

A $90^\circ$ clockwise rotation maps the cell at coordinate $(i, j)$ to $(j, n - 1 - i)$.

This transformation can be decomposed cleanly into two standard in-place geometric operations:

1. **Transpose the Matrix (Reflection over the Main Diagonal):**
   - Swap `matrix[i][j]` with `matrix[j][i]` for all $j > i$.
   - Transforms $(i, j) \to (j, i)$.

2. **Reflect Horizontally (Reverse Each Row):**
   - Reverse the elements of each row: swap `matrix[i][j]` with `matrix[i][n - 1 - j]` for $0 \le j < n / 2$.
   - Transforms $(j, i) \to (j, n - 1 - i)$.

Combining these two steps yields the exact target mapping $(i, j) \to (j, n - 1 - i)$ entirely **in-place** without allocating any auxiliary matrix!

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N^2)$
  - Transposition iterates through $\frac{n(n - 1)}{2}$ pairs of cells.
  - Row reversal performs $\frac{n}{2}$ swaps across each of the $n$ rows.
  - Total cell swaps: $n^2$, which is strictly $\mathcal{O}(N^2)$ optimal since every element must be visited.

- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - The rotation is performed purely in-place using temporary variables for swapping, satisfying the $\mathcal{O}(1)$ extra space constraint.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/sWA5qAcFvZ8](https://youtu.be/sWA5qAcFvZ8)
