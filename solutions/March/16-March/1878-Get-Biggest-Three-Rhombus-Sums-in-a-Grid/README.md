# LeetCode 1878: Get Biggest Three Rhombus Sums in a Grid

- **Publication Date:** 16 March 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/get-biggest-three-rhombus-sums-in-a-grid/](https://leetcode.com/problems/get-biggest-three-rhombus-sums-in-a-grid/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

You are given an `m x n` integer matrix `grid`.

A **rhombus sum** is the sum of the elements that form the **border** of a regular rhombus shape in `grid`. The rhombus must have the shape of a square rotated 45 degrees with each of the corners centered in a grid cell.

Note that the rhombus can have an area of 0, which corresponds to a single individual cell.

Return the biggest three **distinct** rhombus sums in the grid in **descending order**. If there are less than three distinct values, return all of them.

---

### Examples

#### Example 1:
- **Input:**
  ```text
  grid = [
    [3, 4, 5, 1, 3],
    [3, 3, 4, 2, 3],
    [20, 30, 200, 40, 10],
    [1, 5, 5, 4, 1],
    [4, 3, 2, 2, 5]
  ]
  ```
- **Output:** `[228, 216, 211]`
- **Explanation:** The rhombus shapes for the three biggest distinct rhombus sums are:
  - Blue: $20 + 3 + 200 + 5 = 228$
  - Red: $200 + 2 + 10 + 4 = 216$
  - Green: $5 + 200 + 4 + 2 = 211$

#### Example 2:
- **Input:**
  ```text
  grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]
  ```
- **Output:** `[20, 9, 8]`
- **Explanation:**
  - Blue: $4 + 2 + 6 + 8 = 20$
  - Red: $9$ (area 0 rhombus in the bottom right corner)
  - Green: $8$ (area 0 rhombus in the bottom middle)

#### Example 3:
- **Input:** `grid = [[7, 7, 7]]`
- **Output:** `[7]`
- **Explanation:** All possible rhombus sums equal 7, so return `[7]`.

---

### Constraints

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 50`
- `1 <= grid[i][j] <= 10^5`

---

## Topics and Tags

- **Primary Tags:** Array, Math, Matrix, Sorting
- **Secondary Tags:** Heap (Priority Queue), Prefix Sum, Geometry

---

## Detailed Algorithm Walkthrough

### 1. Understanding the Rhombus Structure

A rhombus in the grid is defined by a center $(r, c)$ and an integer radius $L \ge 0$:
- **Area 0 Rhombus ($L = 0$):**
  A single cell at $(r, c)$ with sum equal to `grid[r][c]`.
- **Area $> 0$ Rhombus ($L \ge 1$):**
  The four corners are:
  - **Top:** $(r - L, c)$
  - **Right:** $(r, c + L)$
  - **Bottom:** $(r + L, c)$
  - **Left:** $(r, c - L)$

A valid rhombus must lie entirely within the matrix bounds:
$$r - L \ge 0 \quad \text{and} \quad r + L < m \quad \text{and} \quad c - L \ge 0 \quad \text{and} \quad c + L < n$$

### 2. Traversing the Four Perimeter Edges

When $L > 0$, the perimeter consists of exactly $4L$ cells. We can iterate over the 4 directed edges simultaneously using an index $i$ from $0$ to $L - 1$:
1. **Top to Right:** $(r - L + i, c + i)$
2. **Right to Bottom:** $(r + i, c + L - i)$
3. **Bottom to Left:** $(r + L - i, c - i)$
4. **Left to Top:** $(r - i, c - L + i)$

This 4-way decomposition guarantees that every perimeter cell is visited exactly once without double-counting corners.

### 3. Collecting and Sorting Distinct Sums

Because we require the top 3 **distinct** sums in descending order:
- Use a `TreeSet` (or hash set) to automatically eliminate duplicate sum values.
- Iterate through all possible centers $(r, c)$ and valid radii $L \ge 0$.
- Extract the largest up to 3 elements from the set.

Given $m, n \le 50$, the maximum radius is $L \le 25$. The total number of rhombuses evaluated across the entire grid is at most $\approx 2500 \times 25 / 3 \approx 20,000$, and each perimeter has $\le 100$ cells. This brute-force traversal executes in $< 10$ ms.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(m \cdot n \cdot \min(m, n)^2)$. There are $\mathcal{O}(m \cdot n)$ centers, $\mathcal{O}(\min(m, n))$ possible radii, and perimeter summation takes $\mathcal{O}(L) = \mathcal{O}(\min(m, n))$ steps. For $m, n \le 50$, total operations remain well under $3 \times 10^6$, running almost instantaneously.
- **Auxiliary Space Complexity:** $\mathcal{O}(m \cdot n \cdot \min(m, n))$ auxiliary memory to store unique sums in the balanced search tree / set.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 1878 - Get Biggest Three Rhombus Sums in a Grid
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.TreeSet;

class Solution {
    public int[] getBiggestThree(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        TreeSet<Integer> set = new TreeSet<>();

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                // Area 0 rhombus (single cell)
                set.add(grid[r][c]);

                // Area > 0 rhombuses with radius L
                for (int L = 1; r - L >= 0 && r + L < m && c - L >= 0 && c + L < n; L++) {
                    int sum = 0;
                    for (int i = 0; i < L; i++) {
                        sum += grid[r - L + i][c + i];     // top to right
                        sum += grid[r + i][c + L - i];     // right to bottom
                        sum += grid[r + L - i][c - i];     // bottom to left
                        sum += grid[r - i][c - L + i];     // left to top
                    }
                    set.add(sum);
                }
            }
        }

        int count = Math.min(3, set.size());
        int[] result = new int[count];
        for (int i = 0; i < count; i++) {
            result[i] = set.pollLast();
        }
        return result;
    }
}
```

### Python
```python
"""
Problem: LeetCode 1878 - Get Biggest Three Rhombus Sums in a Grid
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import List


class Solution:

    def getBiggestThree(self, grid: List[List[int]]) -> List[int]:
        m = len(grid)
        n = len(grid[0])
        sums = set()

        for r in range(m):
            for c in range(n):
                # Area 0 rhombus
                sums.add(grid[r][c])

                # Area > 0 rhombuses with radius L
                L = 1
                while r - L >= 0 and r + L < m and c - L >= 0 and c + L < n:
                    total = 0
                    for i in range(L):
                        total += grid[r - L + i][c + i]  # top to right
                        total += grid[r + i][c + L - i]  # right to bottom
                        total += grid[r + L - i][c - i]  # bottom to left
                        total += grid[r - i][c - L + i]  # left to top
                    sums.add(total)
                    L += 1

        return sorted(sums, reverse=True)[:3]
```

### C++
```cpp
/**
 * Problem: LeetCode 1878 - Get Biggest Three Rhombus Sums in a Grid
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <set>
#include <algorithm>

using namespace std;

class Solution {
public:
    vector<int> getBiggestThree(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        set<int> sums;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                // Area 0 rhombus
                sums.insert(grid[r][c]);

                // Area > 0 rhombuses with radius L
                for (int L = 1; r - L >= 0 && r + L < m && c - L >= 0 && c + L < n; L++) {
                    int sum = 0;
                    for (int i = 0; i < L; i++) {
                        sum += grid[r - L + i][c + i];     // top to right
                        sum += grid[r + i][c + L - i];     // right to bottom
                        sum += grid[r + L - i][c - i];     // bottom to left
                        sum += grid[r - i][c - L + i];     // left to top
                    }
                    sums.insert(sum);
                }
            }
        }

        vector<int> result;
        for (auto it = sums.rbegin(); it != sums.rend() && result.size() < 3; ++it) {
            result.push_back(*it);
        }
        return result;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 1878 - Get Biggest Three Rhombus Sums in a Grid
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var getBiggestThree = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const sums = new Set();

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            // Area 0 rhombus
            sums.add(grid[r][c]);

            // Area > 0 rhombuses with radius L
            for (let L = 1; r - L >= 0 && r + L < m && c - L >= 0 && c + L < n; L++) {
                let sum = 0;
                for (let i = 0; i < L; i++) {
                    sum += grid[r - L + i][c + i];     // top to right
                    sum += grid[r + i][c + L - i];     // right to bottom
                    sum += grid[r + L - i][c - i];     // bottom to left
                    sum += grid[r - i][c - L + i];     // left to top
                }
                sums.add(sum);
            }
        }
    }

    const sorted = Array.from(sums).sort((a, b) => b - a);
    return sorted.slice(0, 3);
};
```
