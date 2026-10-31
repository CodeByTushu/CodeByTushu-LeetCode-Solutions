# LeetCode 3567: Minimum Absolute Difference in Sliding Submatrix

- **Publication Date:** 20 March 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-absolute-difference-in-sliding-submatrix/](https://leetcode.com/problems/minimum-absolute-difference-in-sliding-submatrix/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/bOQrKf_2RS4?si=udLQwDtKJaHeksa9)

---

## Problem Summary

You are given an $m \times n$ integer matrix `grid` and an integer `k`.

For every contiguous $k \times k$ submatrix of `grid`, compute the **minimum absolute difference between any two distinct values** within that submatrix.

Return a 2D array `ans` of size $(m - k + 1) \times (n - k + 1)$, where `ans[i][j]` is the minimum absolute difference in the submatrix whose top-left corner is `(i, j)` in `grid`.

> **Note:** If all elements in the submatrix have the same value (or if $k = 1$ such that there are no two distinct values), the answer is `0`.

---

### Examples

#### Example 1:
- **Input:** `grid = [[1, 8], [3, -2]], k = 2`
- **Output:** `[[2]]`
- **Explanation:**
  There is only one possible $k \times k$ submatrix: `[[1, 8], [3, -2]]`.
  Distinct values in the submatrix are `[-2, 1, 3, 8]`.
  The minimum absolute difference between any two distinct values is $|1 - 3| = 2$.
  Thus, the answer is `[[2]]`.

#### Example 2:
- **Input:** `grid = [[3, -1]], k = 1`
- **Output:** `[[0, 0]]`
- **Explanation:**
  Both $1 \times 1$ submatrices have only one element (hence no two distinct values).
  Thus, the answer is `[[0, 0]]`.

#### Example 3:
- **Input:** `grid = [[1, -2, 3], [2, 3, 5]], k = 2`
- **Output:** `[[1, 2]]`
- **Explanation:**
  There are two possible $k \times k$ submatrices:
  - Starting at `(0, 0)`: `[[1, -2], [2, 3]]`.
    Distinct values are `[-2, 1, 2, 3]`.
    Minimum absolute difference is $|1 - 2| = 1$.
  - Starting at `(0, 1)`: `[[-2, 3], [3, 5]]`.
    Distinct values are `[-2, 3, 5]`.
    Minimum absolute difference is $|3 - 5| = 2$.
  Thus, the answer is `[[1, 2]]`.

---

### Constraints

- $1 \le m = \text{grid.length} \le 30$
- $1 \le n = \text{grid}[i]\text{.length} \le 30$
- $-10^5 \le \text{grid}[i][j] \le 10^5$
- $1 \le k \le \min(m, n)$

---

## Intuition & Algorithmic Approach

Given the small matrix constraints ($m, n \le 30$), there are at most $(30 - k + 1) \times (30 - k + 1) \le 900$ submatrices, and each submatrix contains $k^2 \le 900$ elements.

### Optimal Traversal and Sorting Strategy:
1. Iterate over every possible top-left coordinate `(i, j)` where $0 \le i \le m - k$ and $0 \le j \le n - k$.
2. Collect all $k^2$ elements from `grid[i + r][j + c]` for $0 \le r < k$ and $0 \le c < k$ into a flat list or fixed buffer.
3. Sort the buffer in ascending order.
4. Scan adjacent elements `(p - 1, p)`:
   - If `buffer[p] != buffer[p - 1]`, compute the difference `buffer[p] - buffer[p - 1]`.
   - Update `minDiff = min(minDiff, diff)`.
5. If no two distinct values exist (or `minDiff` was never updated), set `ans[i][j] = 0`. Otherwise, set `ans[i][j] = minDiff`.

By sorting the elements, the minimum absolute difference between any two distinct numbers is guaranteed to appear between two adjacent distinct entries in the sorted array.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}((m - k + 1) \cdot (n - k + 1) \cdot k^2 \log k)$
  - With $m, n \le 30$, the total number of operations across all submatrices peaks at $k \approx 15$ with under $5 \times 10^5$ operations, executing in under $5\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(k^2)$
  - An auxiliary buffer of size $k^2$ is used to sort the elements of each sliding submatrix.
