# LeetCode 1267: Count Servers that Communicate

- **Publication Date:** 08 November 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/count-servers-that-communicate/](https://leetcode.com/problems/count-servers-that-communicate/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/tgLVIPhbSfg)

---

## 💡 Problem Summary

You are given a map of a server center, represented as an `m * n` integer matrix `grid`, where `1` means that on that cell there is a server and `0` means that it is no server. Two servers are said to **communicate** if they are on the **same row** or on the **same column**.

Return the number of servers that communicate with at least one other server.

---

### 🧪 Examples

#### Example 1:
- **Input:** `grid = [[1,0],[0,1]]`
- **Output:** `0`
- **Explanation:** No servers can communicate with others.

#### Example 2:
- **Input:** `grid = [[1,0],[1,1]]`
- **Output:** `3`
- **Explanation:** All three servers can communicate with at least one other server. The two servers in column 0 communicate, and the two servers in row 1 communicate.

#### Example 3:
- **Input:** `grid = [[1,1,0,0],[0,0,1,0],[0,0,1,0],[0,0,0,1]]`
- **Output:** `4`
- **Explanation:** The two servers in row 0 communicate with each other. The two servers in column 2 communicate with each other. The server at right bottom corner `(3, 3)` cannot communicate with any other server.

---

### 🔒 Constraints

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m <= 250`
- `1 <= n <= 250`
- `grid[i][j] == 0 or 1`

---

## 🧠 Algorithmic Approach & Key Observations

### 1. 1D Projection / Frequency Arrays
Two servers at $(r_1, c_1)$ and $(r_2, c_2)$ communicate if and only if $r_1 = r_2$ or $c_1 = c_2$.
Therefore, a server at cell $(i, j)$ can communicate if and only if:
$$\text{rowCount}[i] > 1 \quad \text{or} \quad \text{colCount}[j] > 1$$
where $\text{rowCount}[i]$ is the total number of servers in row $i$, and $\text{colCount}[j]$ is the total number of servers in column $j$.

### 2. Two-Pass Linear Matrix Scan Strategy
Instead of checking all pairs or running graph traversals (e.g. BFS/DFS/Union-Find) with complex overhead:
1. **Pass 1 (Precomputation):**
   - Traverse the matrix to count the number of servers present in each row and column.
   - Maintain `rowCount[m]` and `colCount[n]`.
2. **Pass 2 (Validation):**
   - Traverse the matrix again.
   - For every cell $(i, j)$ where `grid[i][j] == 1`, check if $\text{rowCount}[i] > 1$ or $\text{colCount}[j] > 1$.
   - If true, increment the result counter.

This decouples server detection from server verification, yielding a clean, cache-friendly $\mathcal{O}(m \times n)$ solution.

---

## ⏱️ Complexity Analysis

| Metric | Complexity | Description |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(m \times n)$ | Pass 1 traverses all $m \times n$ cells to populate `rowCount` and `colCount`. Pass 2 traverses all $m \times n$ cells to evaluate the condition in $\mathcal{O}(1)$ time per cell. Total time: $\mathcal{O}(m \times n)$ ($\le 62{,}500$ operations). |
| **Auxiliary Space** | $\mathcal{O}(m + n)$ | Requires two 1D integer arrays of lengths $m$ and $n$ for frequency counting, using less than 2 KB of memory. |

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
class Solution {
    public int countServers(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int[] rowCount = new int[m];
        int[] colCount = new int[n];

        // First pass: count servers in each row and column
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    rowCount[i]++;
                    colCount[j]++;
                }
            }
        }

        // Second pass: count servers that can communicate
        int result = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1 && (rowCount[i] > 1 || colCount[j] > 1)) {
                    result++;
                }
            }
        }

        return result;
    }
}
```

### 🐍 Python (Python 3)
```python
from typing import List

class Solution:
    def countServers(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        row_count = [0] * m
        col_count = [0] * n

        # First pass: precompute server frequencies per row and column
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 1:
                    row_count[i] += 1
                    col_count[j] += 1

        # Second pass: count servers with at least one communication partner
        result = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 1 and (row_count[i] > 1 or col_count[j] > 1):
                    result += 1

        return result
```

### ⚡ C++ (C++20)
```cpp
#include <vector>

using namespace std;

class Solution {
public:
    int countServers(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        vector<int> rowCount(m, 0);
        vector<int> colCount(n, 0);

        // First pass: tally server counts per row and column
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (grid[i][j] == 1) {
                    rowCount[i]++;
                    colCount[j]++;
                }
            }
        }

        // Second pass: count communicating servers
        int result = 0;
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (grid[i][j] == 1 && (rowCount[i] > 1 || colCount[j] > 1)) {
                    result++;
                }
            }
        }

        return result;
    }
};
```

### 🌐 JavaScript (Node.js ES2022)
```javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
var countServers = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const rowCount = new Array(m).fill(0);
    const colCount = new Array(n).fill(0);

    // First pass: count servers in each row and column
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                rowCount[i]++;
                colCount[j]++;
            }
        }
    }

    // Second pass: count communicating servers
    let result = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1 && (rowCount[i] > 1 || colCount[j] > 1)) {
                result++;
            }
        }
    }

    return result;
};
```

---

<p align="center">
  <a href="../../README.md"><strong>⬅️ Return to November Solutions</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="https://codebytushu.com/Leetcode/"><strong>🌐 Official Live Platform</strong></a>
</p>
