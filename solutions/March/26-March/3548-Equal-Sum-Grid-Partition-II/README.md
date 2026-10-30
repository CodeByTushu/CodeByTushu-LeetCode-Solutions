# LeetCode 3548: Equal Sum Grid Partition II

- **Publication Date:** 26 March 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/equal-sum-grid-partition-ii/](https://leetcode.com/problems/equal-sum-grid-partition-ii/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

You are given an $m \times n$ matrix `grid` of positive integers.

Your task is to determine if it is possible to make **either one horizontal or one vertical cut** on the grid such that:
- Each of the two resulting sections formed by the cut is **non-empty**.
- The sum of elements in both sections is **equal**, or can be made equal by discounting **at most one single cell** in total (from either section).
- If a cell is discounted, the rest of that section must **remain connected**.

> **Note:** A section is *connected* if every cell in it can be reached from any other cell by moving up, down, left, or right through other remaining cells in the section.

Return `true` if such a partition exists; otherwise return `false`.

---

### Examples

#### Example 1:
- **Input:** `grid = [[1, 4], [2, 3]]`
- **Output:** `true`
- **Explanation:**
  A horizontal cut between row 0 and row 1 divides the grid into:
  - Top section: $1 + 4 = 5$
  - Bottom section: $2 + 3 = 5$
  Both sections already have equal sums ($5 = 5$) without discounting any cell. Thus, return `true`.

#### Example 2:
- **Input:** `grid = [[1, 2], [3, 4]]`
- **Output:** `true`
- **Explanation:**
  A horizontal cut between row 0 and row 1 divides the grid into:
  - Top section: $1 + 2 = 3$
  - Bottom section: $3 + 4 = 7$
  Discounting the cell with value $4$ from the bottom section yields a remaining sum of $3$. The remaining bottom section has cell $[3]$, which remains connected. Both section sums are now equal ($3 = 3$), so return `true`.

#### Example 3:
- **Input:** `grid = [[1, 2, 4], [2, 3, 5]]`
- **Output:** `false`
- **Explanation:**
  - Cut after row 0: top sum $= 7$, bottom sum $= 10$. The difference is $3$. While the bottom row contains $3$, removing cell $(1, 1)$ with value $3$ splits row 1 into $[2]$ and $[5]$, disconnecting the bottom section.
  - No vertical cut or other horizontal cut can balance the sums while keeping the discounted section connected. Thus, return `false`.

#### Example 4:
- **Input:** `grid = [[4, 1, 8], [3, 2, 6]]`
- **Output:** `false`
- **Explanation:**
  No valid horizontal or vertical cut satisfies the criteria. Return `false`.

---

### Constraints

- $1 \le m == \text{grid.length} \le 10^5$
- $1 \le n == \text{grid}[i]\text{.length} \le 10^5$
- $2 \le m \cdot n \le 10^5$
- $1 \le \text{grid}[i][j] \le 10^5$

---

## Key Observations & Graph Connectivity

Every straight cut (horizontal or vertical) divides the grid into two rectangular sections. When we remove a cell from a section of dimensions $R \times C$:

1. **2D Block ($R \ge 2$ and $C \ge 2$):**
   - Any 2D grid graph with $R \ge 2$ and $C \ge 2$ is **2-vertex-connected (biconnected)**.
   - Removing **any single cell** leaves the remaining $(R \times C - 1)$ cells fully connected via adjacent rows/columns.
   - Therefore, any cell matching the required difference `diff` can be discounted safely.

2. **Single Row ($R = 1$ and $C > 1$):**
   - Removing any interior cell $0 < c < C - 1$ breaks the row into two disconnected subsegments: $[0 \dots c-1]$ and $[c+1 \dots C-1]$.
   - Only the two boundary endpoints `grid[0][0]` and `grid[0][C - 1]` can be removed while preserving connectivity.

3. **Single Column ($C = 1$ and $R > 1$):**
   - Removing any interior cell $0 < r < R - 1$ breaks the column into two disconnected subsegments.
   - Only the two boundary endpoints `grid[0][0]` and `grid[R - 1][0]` can be removed while preserving connectivity.

---

## Algorithmic Approach

Instead of writing four distinct routines for cuts (top, bottom, left, right), we implement a single core check function `canPartition(grid, totalSum)` that evaluates:
- **Horizontal cuts** after each row $i$ ($0 \le i < m - 1$).
- **Discounts taken exclusively from the top section** ($diff = topSum - botSum$).

We then test the four possible orientations:
1. `grid`: Horizontal cut, discount from top section.
2. `reverseRows(grid)`: Horizontal cut, discount from bottom section.
3. `transpose(grid)`: Vertical cut, discount from left section.
4. `reverseRows(transpose(grid))`: Vertical cut, discount from right section.

### Core Partition Function Steps:
1. Iterate $i$ from $0$ to $R - 2$ (representing the cut after row $i$).
2. Add elements of row $i$ to `topSum` and to a hash set `seen`.
3. Compute $botSum = totalSum - topSum$ and $diff = topSum - botSum$.
4. If $diff == 0$: Partition is already balanced, return `true`.
5. If $diff > 0$:
   - If height is 1 ($i == 0$): Valid if $C > 1$ and ($diff == \text{grid}[0][0]$ or $diff == \text{grid}[0][C - 1]$).
   - If width is 1 ($C == 1$): Valid if $diff == \text{grid}[0][0]$ or $diff == \text{grid}[i][0]$.
   - If height $\ge 2$ and width $\ge 2$: Valid if `seen.contains(diff)`.
6. If no valid partition is found across all 4 orientations, return `false`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(m \cdot n)$
  - Computing the total sum takes $\mathcal{O}(m \cdot n)$.
  - Transposition and row reversal take $\mathcal{O}(m \cdot n)$.
  - Each scan checks each cell at most once with $\mathcal{O}(1)$ average hash set lookups.
  - Overall time is $4 \times \mathcal{O}(m \cdot n) = \mathcal{O}(m \cdot n)$, optimal for $m \cdot n \le 10^5$.
- **Auxiliary Space Complexity:** $\mathcal{O}(m \cdot n)$
  - The hash set and matrix transformations store $\mathcal{O}(m \cdot n)$ integers.
