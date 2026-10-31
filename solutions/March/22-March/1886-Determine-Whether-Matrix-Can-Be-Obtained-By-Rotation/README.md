# LeetCode 1886: Determine Whether Matrix Can Be Obtained By Rotation

- **Publication Date:** 22 March 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/determine-whether-matrix-can-be-obtained-by-rotation/](https://leetcode.com/problems/determine-whether-matrix-can-be-obtained-by-rotation/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/KSfTlM9VgtQ?si=wbU6LVYQz06IWVom)

---

## Problem Summary

Given two $n \times n$ binary matrices `mat` and `target`, return `true` if it is possible to make `mat` equal to `target` by rotating `mat` in **90-degree increments**, or `false` otherwise.

---

### Examples

#### Example 1:
- **Input:** `mat = [[0, 1], [1, 0]], target = [[1, 0], [0, 1]]`
- **Output:** `true`
- **Explanation:**
  We can rotate `mat` 90 degrees clockwise to make `mat` equal `target`.

#### Example 2:
- **Input:** `mat = [[0, 1], [1, 1]], target = [[1, 0], [0, 1]]`
- **Output:** `false`
- **Explanation:**
  It is impossible to make `mat` equal to `target` by rotating `mat`.

#### Example 3:
- **Input:** `mat = [[0, 0, 0], [0, 1, 0], [1, 1, 1]], target = [[1, 1, 1], [0, 1, 0], [0, 0, 0]]`
- **Output:** `true`
- **Explanation:**
  We can rotate `mat` 90 degrees clockwise two times (180 degrees) to make `mat` equal `target`.

---

### Constraints

- $n == \text{mat.length} == \text{target.length}$
- $n == \text{mat}[i]\text{.length} == \text{target}[i]\text{.length}$
- $1 \le n \le 10$
- `mat[i][j]` and `target[i][j]` are either `0` or `1`.

---

## Intuition & Algorithmic Approach

A square matrix rotated in 90-degree increments can achieve at most 4 distinct orientations:
1. **$0^\circ$ (No rotation):** $(i, j) \to (i, j)$
2. **$90^\circ$ (Clockwise):** $(i, j) \to (j, n - 1 - i)$
3. **$180^\circ$ (Clockwise):** $(i, j) \to (n - 1 - i, n - 1 - j)$
4. **$270^\circ$ (Clockwise):** $(i, j) \to (n - 1 - j, i)$

### Single-Pass 4-Flag Check:
Instead of physically transforming and allocating intermediate matrices up to 4 times, we maintain four boolean flags (`r0`, `r90`, `r180`, `r270`), all initially `true`.

We iterate through each cell $(i, j)$ in the $n \times n$ matrix:
- If `mat[i][j] != target[i][j]`, invalidate `r0 = false`.
- If `mat[i][j] != target[j][n - 1 - i]`, invalidate `r90 = false`.
- If `mat[i][j] != target[n - 1 - i][n - 1 - j]`, invalidate `r180 = false`.
- If `mat[i][j] != target[n - 1 - j][i]`, invalidate `r270 = false`.

Finally, return `r0 || r90 || r180 || r270`. If any rotation matches every corresponding element in `target`, the answer is `true`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n^2)$
  - We inspect each cell of the $n \times n$ matrix exactly once, doing $\mathcal{O}(1)$ comparisons per cell.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Only four boolean variables are used; no additional matrix memory is allocated.
