# LeetCode 1727: Largest Submatrix With Rearrangements

- **Publication Date:** 17 March 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/largest-submatrix-with-rearrangements/](https://leetcode.com/problems/largest-submatrix-with-rearrangements/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

You are given a binary matrix `matrix` of size `m x n`, and you are allowed to rearrange the **columns** of the `matrix` in any order.

Return the area of the largest submatrix within `matrix` where every element of the submatrix is `1` after reordering the columns optimally.

---

### Examples

#### Example 1:
- **Input:** `matrix = [[0, 0, 1], [1, 1, 1], [1, 0, 1]]`
- **Output:** `4`
- **Explanation:**
  You can rearrange the columns such that columns `[0, 1, 2]` are reordered to `[0, 2, 1]`.
  The largest submatrix of all 1s has height 2 and width 2, giving an area of 4.

#### Example 2:
- **Input:** `matrix = [[1, 0, 1, 0, 1]]`
- **Output:** `3`
- **Explanation:**
  Rearranging columns so that all 1s are adjacent yields `[1, 1, 1, 0, 0]`.
  The largest submatrix of all 1s has area $1 \times 3 = 3$.

#### Example 3:
- **Input:** `matrix = [[1, 1, 0], [1, 0, 1]]`
- **Output:** `2`
- **Explanation:**
  Notice that you must rearrange entire columns. The maximum achievable area of 1s is 2.

---

### Constraints

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m * n <= 10^5`
- `matrix[i][j]` is either `0` or `1`.

---

## Topics and Tags

- **Primary Tags:** Array, Greedy, Matrix, Sorting
- **Secondary Tags:** Dynamic Programming, Column Rearrangement

---

## Detailed Algorithm Walkthrough

### 1. Cumulative Column Heights

For any fixed bottom row $i$, a column $j$ contributes a vertical bar of consecutive 1s ending at $(i, j)$.
Let $height[i][j]$ represent the consecutive number of 1s in column $j$ ending at row $i$:
$$height[i][j] = \begin{cases} height[i - 1][j] + 1 & \text{if } matrix[i][j] == 1 \\ 0 & \text{if } matrix[i][j] == 0 \end{cases}$$

This can be computed in-place directly across `matrix` in $\mathcal{O}(m \cdot n)$ time:
For $i$ from $1$ to $m - 1$ and $j$ from $0$ to $n - 1$:
$$\text{if } matrix[i][j] == 1 \implies matrix[i][j] += matrix[i - 1][j]$$

### 2. Greedy Sorting per Row

Because we are allowed to arbitrarily rearrange columns, the relative horizontal position of columns does not restrict us. For any row $i$:
- We collect all heights in row $i$.
- To maximize the area of a rectangle of height $h$ and width $w$, we should greedily group columns with the largest heights together!
- Sorting the heights in descending order:
  - The first column has height $h_0$, yielding area $h_0 \times 1$.
  - The first two columns both have height at least $h_1$, yielding area $h_1 \times 2$.
  - In general, the first $k + 1$ columns all have height at least $h_k$, yielding area:
    $$\text{Area} = h_k \times (k + 1)$$
- Equivalently, when sorting in ascending order:
  $$\text{Area} = h_j \times (n - j)$$

By evaluating this candidate area across all columns $j$ for every row $i$, the global maximum across all rows yields the largest possible submatrix area.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(m \cdot n \log n)$. Computing cumulative heights takes $\mathcal{O}(m \cdot n)$ time. For each of the $m$ rows, sorting $n$ elements takes $\mathcal{O}(n \log n)$ time. Given $m \cdot n \le 10^5$, total operations are bounded by $\approx 1.7 \times 10^6$, executing in $< 15$ ms.
- **Auxiliary Space Complexity:** $\mathcal{O}(n)$ auxiliary space per row to store and sort the column heights.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 1727 - Largest Submatrix With Rearrangements
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.Arrays;

class Solution {
    public int largestSubmatrix(int[][] matrix) {
        int m = matrix.length;
        int n = matrix[0].length;
        int maxArea = 0;

        // Compute consecutive 1s height for each column
        for (int i = 1; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == 1) {
                    matrix[i][j] += matrix[i - 1][j];
                }
            }
        }

        // For each row, sort heights and find max rectangular area
        for (int i = 0; i < m; i++) {
            int[] row = matrix[i].clone();
            Arrays.sort(row);

            for (int j = 0; j < n; j++) {
                int height = row[j];
                int width = n - j;
                maxArea = Math.max(maxArea, height * width);
            }
        }

        return maxArea;
    }
}
```

### Python
```python
"""
Problem: LeetCode 1727 - Largest Submatrix With Rearrangements
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import List


class Solution:

    def largestSubmatrix(self, matrix: List[List[int]]) -> int:
        m = len(matrix)
        n = len(matrix[0])
        max_area = 0

        # Accumulate consecutive 1s for each column
        for i in range(1, m):
            for j in range(n):
                if matrix[i][j] == 1:
                    matrix[i][j] += matrix[i - 1][j]

        # For each row, sort heights in descending order to compute maximum rectangle
        for i in range(m):
            row = sorted(matrix[i], reverse=True)
            for k in range(n):
                height = row[k]
                width = k + 1
                max_area = max(max_area, height * width)

        return max_area
```

### C++
```cpp
/**
 * Problem: LeetCode 1727 - Largest Submatrix With Rearrangements
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int largestSubmatrix(vector<vector<int>>& matrix) {
        int m = matrix.size();
        int n = matrix[0].size();
        int maxArea = 0;

        // Compute consecutive 1s height for each column
        for (int i = 1; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == 1) {
                    matrix[i][j] += matrix[i - 1][j];
                }
            }
        }

        // For each row, sort heights and find maximum rectangular area
        for (int i = 0; i < m; i++) {
            vector<int> row = matrix[i];
            sort(row.begin(), row.end());

            for (int j = 0; j < n; j++) {
                int height = row[j];
                int width = n - j;
                maxArea = max(maxArea, height * width);
            }
        }

        return maxArea;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 1727 - Largest Submatrix With Rearrangements
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[][]} matrix
 * @return {number}
 */
var largestSubmatrix = function(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    let maxArea = 0;

    // Compute consecutive 1s height for each column
    for (let i = 1; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 1) {
                matrix[i][j] += matrix[i - 1][j];
            }
        }
    }

    // For each row, sort heights and find max rectangular area
    for (let i = 0; i < m; i++) {
        const row = matrix[i].slice().sort((a, b) => a - b);
        for (let j = 0; j < n; j++) {
            const height = row[j];
            const width = n - j;
            maxArea = Math.max(maxArea, height * width);
        }
    }

    return maxArea;
};
```
