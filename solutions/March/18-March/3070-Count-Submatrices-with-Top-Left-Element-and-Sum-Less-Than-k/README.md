# LeetCode 3070: Count Submatrices with Top-Left Element and Sum Less Than k

- **Publication Date:** 18 March 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/count-submatrices-with-top-left-element-and-sum-less-than-k/](https://leetcode.com/problems/count-submatrices-with-top-left-element-and-sum-less-than-k/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/qu8XnFGomTE?si=2OHYNvUI35kshvPf)

---

## Problem Summary

You are given a 0-indexed integer matrix `grid` and an integer `k`.

Return the number of submatrices that contain the **top-left element** of the `grid` (i.e. cell `(0, 0)`), and have a sum **less than or equal to** `k`.

---

### Examples

#### Example 1:
- **Input:** `grid = [[7, 6, 3], [6, 6, 1]], k = 18`
- **Output:** `4`
- **Explanation:**
  There are only 4 submatrices that contain `(0, 0)` and have a sum $\le 18$:
  - Submatrix from `(0, 0)` to `(0, 0)`: sum $= 7 \le 18$
  - Submatrix from `(0, 0)` to `(0, 1)`: sum $= 7 + 6 = 13 \le 18$
  - Submatrix from `(0, 0)` to `(0, 2)`: sum $= 7 + 6 + 3 = 16 \le 18$
  - Submatrix from `(0, 0)` to `(1, 0)`: sum $= 7 + 6 = 13 \le 18$

#### Example 2:
- **Input:**
  ```text
  grid = [
    [7, 2, 9],
    [1, 5, 0],
    [2, 6, 6]
  ], k = 20
  ```
- **Output:** `6`
- **Explanation:**
  There are 6 valid submatrices rooted at `(0, 0)` with sum $\le 20$.

---

### Constraints

- `m == grid.length`
- `n == grid[i].length`
- `1 <= n, m <= 1000`
- `0 <= grid[i][j] <= 1000`
- `1 <= k <= 10^9`

---

## Topics and Tags

- **Primary Tags:** Array, Matrix, Prefix Sum
- **Secondary Tags:** 2D Dynamic Programming, In-Place Computation

---

## Detailed Algorithm Walkthrough

### 1. Structure of Submatrices Containing (0, 0)

Every submatrix that starts at the top-left corner `(0, 0)` is uniquely defined by its bottom-right cell `(i, j)`.
Its sum is the sum of all cells in the rectangular region from `(0, 0)` to `(i, j)`:
$$\text{Sum}(i, j) = \sum_{r = 0}^{i} \sum_{c = 0}^{j} grid[r][c]$$

There are exactly $m \times n$ such submatrices in total.

### 2. 2D Prefix Sum Formulation

We can compute the 2D prefix sum $P[i][j]$ for all $(i, j)$ in $\mathcal{O}(m \cdot n)$ using the standard inclusion-exclusion principle:
$$P[i][j] = grid[i][j] + P[i - 1][j] + P[i][j - 1] - P[i - 1][j - 1]$$
where boundary terms outside the grid are treated as $0$.

### 3. In-Place Optimization with $\mathcal{O}(1)$ Auxiliary Space

Because $P[i][j]$ only depends on previously computed prefix sums in the same row ($j - 1$) and previous row ($i - 1$), we can update the input `grid` directly in-place:
```java
if (i > 0) grid[i][j] += grid[i - 1][j];
if (j > 0) grid[i][j] += grid[i][j - 1];
if (i > 0 && j > 0) grid[i][j] -= grid[i - 1][j - 1];
```

After updating `grid[i][j]`, if `grid[i][j] <= k`, we increment our answer counter `count`.

Given $m, n \le 1000$ and $grid[i][j] \le 1000$, the maximum possible sum is $1000 \times 1000 \times 1000 = 10^9$, which fits cleanly inside standard 32-bit signed integers.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(m \cdot n)$. Each of the $m \times n$ cells is visited exactly once, computing the prefix sum and evaluating the condition $\le k$ in $\mathcal{O}(1)$ constant time. For $m, n \le 1000$, this processes $10^6$ operations in $\approx 2$ ms.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$ auxiliary memory since the 2D prefix sums are accumulated directly in-place within the matrix.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 3070 - Count Submatrices with Top-Left Element and Sum Less Than k
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

class Solution {
    public int countSubmatrices(int[][] grid, int k) {
        int m = grid.length;
        int n = grid[0].length;
        int count = 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i > 0) {
                    grid[i][j] += grid[i - 1][j];
                }
                if (j > 0) {
                    grid[i][j] += grid[i][j - 1];
                }
                if (i > 0 && j > 0) {
                    grid[i][j] -= grid[i - 1][j - 1];
                }

                if (grid[i][j] <= k) {
                    count++;
                }
            }
        }

        return count;
    }
}
```

### Python
```python
"""
Problem: LeetCode 3070 - Count Submatrices with Top-Left Element and Sum Less Than k
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import List


class Solution:

    def countSubmatrices(self, grid: List[List[int]], k: int) -> int:
        m = len(grid)
        n = len(grid[0])
        count = 0

        for i in range(m):
            for j in range(n):
                if i > 0:
                    grid[i][j] += grid[i - 1][j]
                if j > 0:
                    grid[i][j] += grid[i][j - 1]
                if i > 0 and j > 0:
                    grid[i][j] -= grid[i - 1][j - 1]

                if grid[i][j] <= k:
                    count += 1

        return count
```

### C++
```cpp
/**
 * Problem: LeetCode 3070 - Count Submatrices with Top-Left Element and Sum Less Than k
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>

using namespace std;

class Solution {
public:
    int countSubmatrices(vector<vector<int>>& grid, int k) {
        int m = grid.size();
        int n = grid[0].size();
        int count = 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i > 0) {
                    grid[i][j] += grid[i - 1][j];
                }
                if (j > 0) {
                    grid[i][j] += grid[i][j - 1];
                }
                if (i > 0 && j > 0) {
                    grid[i][j] -= grid[i - 1][j - 1];
                }

                if (grid[i][j] <= k) {
                    count++;
                }
            }
        }

        return count;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 3070 - Count Submatrices with Top-Left Element and Sum Less Than k
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var countSubmatrices = function(grid, k) {
    const m = grid.length;
    const n = grid[0].length;
    let count = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i > 0) {
                grid[i][j] += grid[i - 1][j];
            }
            if (j > 0) {
                grid[i][j] += grid[i][j - 1];
            }
            if (i > 0 && j > 0) {
                grid[i][j] -= grid[i - 1][j - 1];
            }

            if (grid[i][j] <= k) {
                count++;
            }
        }
    }

    return count;
};
```
