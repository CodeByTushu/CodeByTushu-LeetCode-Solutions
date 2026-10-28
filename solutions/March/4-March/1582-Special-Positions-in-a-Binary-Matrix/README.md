# LeetCode 1582: Special Positions in a Binary Matrix

- **Publication Date:** 04 March 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/special-positions-in-a-binary-matrix/](https://leetcode.com/problems/special-positions-in-a-binary-matrix/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

Given an `m x n` binary matrix `mat`, return the number of **special positions** in `mat`.

A position `(i, j)` is called **special** if:
- `mat[i][j] == 1`
- All other elements in row `i` and column `j` are `0` (rows and columns are 0-indexed).

---

### Examples

#### Example 1:
- **Input:** `mat = [[1,0,0],[0,0,1],[1,0,0]]`
- **Output:** `1`
- **Explanation:** `(1, 2)` is a special position because `mat[1][2] == 1` and all other elements in row 1 and column 2 are `0`.

#### Example 2:
- **Input:** `mat = [[1,0,0],[0,1,0],[0,0,1]]`
- **Output:** `3`
- **Explanation:** `(0, 0)`, `(1, 1)` and `(2, 2)` are special positions.

---

### Constraints

- `m == mat.length`
- `n == mat[i].length`
- `1 <= m, n <= 100`
- `mat[i][j]` is either `0` or `1`.

---

## Topics and Tags

- **Primary Tags:** Array, Matrix
- **Secondary Tags:** Simulation

---

## Detailed Algorithm Walkthrough

### 1. Mathematical Condition for a Special Position

A cell `(i, j)` is special if and only if three conditions hold simultaneously:
1. $\text{mat}[i][j] = 1$
2. $\sum_{c=0}^{n-1} \text{mat}[i][c] = 1$ (the total sum of 1s in row $i$ is exactly 1)
3. $\sum_{r=0}^{m-1} \text{mat}[r][j] = 1$ (the total sum of 1s in column $j$ is exactly 1)

Because the matrix consists strictly of binary values ($0$ and $1$), if the sum of all elements in row $i$ is $1$ and $\text{mat}[i][j] = 1$, then all other elements in row $i$ must necessarily be $0$. The same holds true for column $j$.

### 2. Precomputation of Row and Column Frequencies

Instead of checking the entire row and column for every `1` (which would take $\mathcal{O}(m + n)$ time per cell, leading to $\mathcal{O}(m \cdot n \cdot (m + n))$ in the worst case):
1. Precompute `rowSum[i]` as the sum of elements in row $i$ for all $0 \le i < m$.
2. Precompute `colSum[j]` as the sum of elements in column $j$ for all $0 \le j < n$.
3. This precomputation phase completes in a single linear pass over the matrix in $\mathcal{O}(m \cdot n)$ time.

### 3. Final Verification Pass

We iterate over each cell `(i, j)` in the grid:
- If `mat[i][j] == 1` and `rowSum[i] == 1` and `colSum[j] == 1`, we increment our answer counter.
- Return the final count.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(m \cdot n)$, where $m$ is the number of rows and $n$ is the number of columns.
  - Phase 1 (precomputing row and column sums): $\mathcal{O}(m \cdot n)$ time.
  - Phase 2 (counting valid special cells): $\mathcal{O}(m \cdot n)$ time.
  - With $m, n \le 100$, the algorithm performs at most $2 \times 10^4$ operations, executing in under $1$ ms.
- **Auxiliary Space Complexity:** $\mathcal{O}(m + n)$ to store the two 1D frequency arrays `rowSum` and `colSum`.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 1582 - Special Positions in a Binary Matrix
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int numSpecial(int[][] mat) {
        int m = mat.length;
        int n = mat[0].length;
        int[] rowSum = new int[m];
        int[] colSum = new int[n];

        // Step 1: Precompute the count of 1s in each row and column
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 1) {
                    rowSum[i]++;
                    colSum[j]++;
                }
            }
        }

        // Step 2: Identify special positions where mat[i][j] == 1 and rowSum == 1 and colSum == 1
        int specialCount = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 1 && rowSum[i] == 1 && colSum[j] == 1) {
                    specialCount++;
                }
            }
        }

        return specialCount;
    }
}
```

### Python
```python
"""
Problem: LeetCode 1582 - Special Positions in a Binary Matrix
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""

from typing import List

class Solution:
    def numSpecial(self, mat: List[List[int]]) -> int:
        m, n = len(mat), len(mat[0])
        row_sum = [sum(row) for row in mat]
        col_sum = [sum(mat[i][j] for i in range(m)) for j in range(n)]

        special_count = 0
        for i in range(m):
            if row_sum[i] == 1:
                for j in range(n):
                    if mat[i][j] == 1 and col_sum[j] == 1:
                        special_count += 1

        return special_count
```

### C++
```cpp
/**
 * Problem: LeetCode 1582 - Special Positions in a Binary Matrix
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>

using namespace std;

class Solution {
public:
    int numSpecial(vector<vector<int>>& mat) {
        int m = mat.size();
        int n = mat[0].size();
        vector<int> rowSum(m, 0);
        vector<int> colSum(n, 0);

        // Step 1: Compute row and column sums
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 1) {
                    rowSum[i]++;
                    colSum[j]++;
                }
            }
        }

        // Step 2: Count special positions
        int specialCount = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 1 && rowSum[i] == 1 && colSum[j] == 1) {
                    specialCount++;
                }
            }
        }

        return specialCount;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 1582 - Special Positions in a Binary Matrix
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[][]} mat
 * @return {number}
 */
var numSpecial = function(mat) {
    const m = mat.length;
    const n = mat[0].length;
    const rowSum = new Array(m).fill(0);
    const colSum = new Array(n).fill(0);

    // Step 1: Precompute frequency of 1s in each row and column
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (mat[i][j] === 1) {
                rowSum[i]++;
                colSum[j]++;
            }
        }
    }

    // Step 2: Count cells that uniquely hold the single 1 in both their row and column
    let specialCount = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (mat[i][j] === 1 && rowSum[i] === 1 && colSum[j] === 1) {
                specialCount++;
            }
        }
    }

    return specialCount;
};
```
