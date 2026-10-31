# LeetCode 3546: Equal Sum Grid Partition I

- **Publication Date:** 25 March 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/equal-sum-grid-partition-i/](https://leetcode.com/problems/equal-sum-grid-partition-i/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/fjDBb-2PJZM?si=3FBqVTeUVRcxgjoc)

---

## Problem Summary

You are given an $m \times n$ matrix `grid` of positive integers.

Your task is to determine if it is possible to make **either one horizontal or one vertical cut** on the grid such that:
- Each of the two resulting sections formed by the cut is **non-empty**.
- The sum of elements in both sections is **equal**.

Return `true` if such a partition exists; otherwise return `false`.

---

### Examples

#### Example 1:
- **Input:** `grid = [[1, 4], [2, 3]]`
- **Output:** `true`
- **Explanation:**
  A horizontal cut between row 0 and row 1 divides the grid into:
  - Top section (row 0): $1 + 4 = 5$
  - Bottom section (row 1): $2 + 3 = 5$
  Both sections have equal sum ($5$), so return `true`.

#### Example 2:
- **Input:** `grid = [[1, 3], [2, 4]]`
- **Output:** `false`
- **Explanation:**
  - Horizontal cut after row 0: top sum $= 4$, bottom sum $= 6$ (not equal).
  - Vertical cut after column 0: left sum $= 3$, right sum $= 7$ (not equal).
  No valid partition exists, so return `false`.

---

### Constraints

- $1 \le m == \text{grid.length} \le 10^5$
- $1 \le n == \text{grid}[i]\text{.length} \le 10^5$
- $2 \le m \cdot n \le 10^5$
- $1 \le \text{grid}[i][j] \le 10^5$

---

## Intuition & Algorithmic Approach

Let $S$ be the total sum of all elements in the entire grid.

For any valid partition into two sections with equal sums:
$$\text{Section}_1 + \text{Section}_2 = S \implies \text{Section}_1 = \text{Section}_2 = \frac{S}{2}$$

1. **Parity Check:**
   If $S$ is odd, it is impossible to partition the grid into two equal integer sums. In this case, return `false` immediately.

2. **Horizontal Cuts:**
   A horizontal cut after row $i$ ($0 \le i < m - 1$) divides the rows into $[0 \dots i]$ and $[i + 1 \dots m - 1]$. Both sections are guaranteed to be non-empty because $i < m - 1$.
   We compute the running prefix sum of row sums:
   $$\text{runningRowSum} = \sum_{r=0}^{i} \text{rowSum}[r]$$
   If $\text{runningRowSum} == S / 2$, a valid horizontal cut exists, so return `true`.

3. **Vertical Cuts:**
   Similarly, a vertical cut after column $j$ ($0 \le j < n - 1$) divides the columns into $[0 \dots j]$ and $[j + 1 \dots n - 1]$.
   We compute the running prefix sum of column sums:
   $$\text{runningColSum} = \sum_{c=0}^{j} \text{colSum}[c]$$
   If $\text{runningColSum} == S / 2$, a valid vertical cut exists, so return `true`.

4. **Return False:**
   If neither a horizontal nor a vertical partition satisfies the target sum, return `false`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(m \cdot n)$
  - Single pass to compute total sum, row sums, and column sums, followed by $\mathcal{O}(m)$ and $\mathcal{O}(n)$ checks.
- **Auxiliary Space Complexity:** $\mathcal{O}(m + n)$
  - Storing row sums and column sums takes linear space with respect to grid dimensions.
