# LeetCode 3665: Twisted Mirror Path Count

- **Publication Date:** 31 October 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/twisted-mirror-path-count/](https://leetcode.com/problems/twisted-mirror-path-count/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/ForKZ-1fuRA?si=SdFMaL58qGeTZNgB)

---

## 💡 Problem Summary

You are given an `m x n` binary grid `grid` where:
- `grid[i][j] == 0` represents an empty cell, and
- `grid[i][j] == 1` represents a mirror.

A robot starts at the top-left corner of the grid `(0, 0)` and wants to reach the bottom-right corner `(m - 1, n - 1)`. It can move only **right** or **down**. If the robot attempts to move into a mirror cell, it is **reflected** before entering that cell:
- If it tries to move **right** into a mirror, it is turned **down** and moved into the cell directly below the mirror `(i + 1, j)`.
- If it tries to move **down** into a mirror, it is turned **right** and moved into the cell directly to the right of the mirror `(i, j + 1)`.

If this reflection causes the robot to move outside the `grid` boundaries, the path is considered invalid and should not be counted.

Return the **number of unique valid paths** from `(0, 0)` to `(m - 1, n - 1)`.  
Since the answer may be very large, return it modulo $10^9 + 7$.

> **Note:** If a reflection moves the robot into another mirror cell, the robot is immediately reflected again based on the direction it used to enter that mirror: if it entered while moving right, it will be turned down; if it entered while moving down, it will be turned right. This process will continue until either the destination cell is reached, the robot moves out of bounds, or the robot moves into a non-mirror cell.

---

### 🧪 Examples

#### Example 1:
- **Input:** `grid = [[0,1,0],[0,0,1],[1,0,0]]`
- **Output:** `5`
- **Explanation:**
  | Number | Full Path |
  | :---: | :--- |
  | 1 | `(0, 0) -> (0, 1) [M] -> (1, 1) -> (1, 2) [M] -> (2, 2)` |
  | 2 | `(0, 0) -> (0, 1) [M] -> (1, 1) -> (2, 1) -> (2, 2)` |
  | 3 | `(0, 0) -> (1, 0) -> (1, 1) -> (1, 2) [M] -> (2, 2)` |
  | 4 | `(0, 0) -> (1, 0) -> (1, 1) -> (2, 1) -> (2, 2)` |
  | 5 | `(0, 0) -> (1, 0) -> (2, 0) [M] -> (2, 1) -> (2, 2)` |

  *(where `[M]` indicates the robot attempted to enter a mirror cell and was reflected)*

#### Example 2:
- **Input:** `grid = [[0,0],[0,0]]`
- **Output:** `2`
- **Explanation:**
  | Number | Full Path |
  | :---: | :--- |
  | 1 | `(0, 0) -> (0, 1) -> (1, 1)` |
  | 2 | `(0, 0) -> (1, 0) -> (1, 1)` |

#### Example 3:
- **Input:** `grid = [[0,1,1],[1,1,0]]`
- **Output:** `1`
- **Explanation:**
  | Number | Full Path |
  | :---: | :--- |
  | 1 | `(0, 0) -> (0, 1) [M] -> (1, 1) [M] -> (1, 2)` |

  Path `(0, 0) -> (1, 0) [M] -> (1, 1) [M] -> (2, 1)` goes out of bounds ($2 \ge m$), so it is invalid.

---

### 🔒 Constraints

- `m == grid.length`
- `n == grid[i].length`
- `2 <= m, n <= 500`
- `grid[i][j]` is either `0` or `1`.
- `grid[0][0] == grid[m - 1][n - 1] == 0`

---

## 🧠 Algorithmic Approach: Directional Push-DP

### 1. State Definition
Because mirrors deflect the incoming velocity vector by $90^\circ$, we must track the **direction of movement** entering each grid cell:
- `f[i][j][0]`: Number of path ways attempting to enter cell `(i, j)` moving **Right** (horizontal entrance).
- `f[i][j][1]`: Number of path ways attempting to enter cell `(i, j)` moving **Down** (vertical entrance).

### 2. Base Case
We start at `(0, 0)` which is always empty (`grid[0][0] == 0`). We can model this as landing at `(0, 0)` horizontally:
$$\text{f}[0][0][0] = 1$$

### 3. Transition Logic (Push-DP)
Iterating through the grid in topological row-major order $(i, j)$ from $0$ to $m - 1$ and $0$ to $n - 1$:
- Retrieve incoming paths:
  $$\text{fromRight} = \text{f}[i][j][0], \quad \text{fromDown} = \text{f}[i][j][1]$$

- **Case 1: Empty Cell (`grid[i][j] == 0`)**
  The robot successfully arrives at `(i, j)`. It can freely decide to move either **Right** or **Down**:
  $$\text{total} = (\text{fromRight} + \text{fromDown}) \pmod{10^9 + 7}$$
  - Moving Right pushes into `(i, j + 1)` with direction Right ($0$):
    $$\text{f}[i][j + 1][0] = (\text{f}[i][j + 1][0] + \text{total}) \pmod{10^9 + 7}$$
  - Moving Down pushes into `(i + 1, j)` with direction Down ($1$):
    $$\text{f}[i + 1][j][1] = (\text{f}[i + 1][j][1] + \text{total}) \pmod{10^9 + 7}$$

- **Case 2: Mirror Cell (`grid[i][j] == 1`)**
  The cell acts as a mirror that deflects incoming traffic:
  - Paths attempting to enter moving **Right** are deflected **Down** into `(i + 1, j)`:
    $$\text{f}[i + 1][j][1] = (\text{f}[i + 1][j][1] + \text{fromRight}) \pmod{10^9 + 7}$$
  - Paths attempting to enter moving **Down** are deflected **Right** into `(i, j + 1)`:
    $$\text{f}[i][j + 1][0] = (\text{f}[i][j + 1][0] + \text{fromDown}) \pmod{10^9 + 7}$$

### 4. Final Answer
Since `grid[m - 1][n - 1] == 0`, valid paths reaching the destination arrive either from the left (Right move) or from above (Down move):
$$\text{ans} = (\text{f}[m - 1][n - 1][0] + \text{f}[m - 1][n - 1][1]) \pmod{10^9 + 7}$$

---

## ⏱️ Complexity Analysis

- **Time Complexity:** $\mathcal{O}(m \cdot n)$  
  Every cell `(i, j)` is visited once, and state transitions involve $\mathcal{O}(1)$ additions modulo $10^9 + 7$. For $m, n \le 500$, total iterations $\le 2.5 \times 10^5$, executing in under $160\text{ ms}$.
- **Space Complexity:** $\mathcal{O}(m \cdot n)$ auxiliary space  
  A 3D DP array of size $(m + 1) \times (n + 1) \times 2$ takes approximately $501 \times 501 \times 2 \times 4\text{ bytes} \approx 2\text{ MB}$, fitting comfortably within memory bounds.

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
import java.util.*;

class Solution {
    public int uniquePaths(int[][] grid) {
        final int MOD = 1_000_000_007;
        int m = grid.length, n = grid[0].length;

        // f[i][j][0] = attempt to enter (i, j) moving right
        // f[i][j][1] = attempt to enter (i, j) moving down
        int[][][] f = new int[m + 1][n + 1][2];
        f[0][0][0] = 1; // start cell is empty, so it just lands

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                int fromRight = f[i][j][0];
                int fromDown = f[i][j][1];

                if (grid[i][j] == 0) {
                    int total = (fromRight + fromDown) % MOD;
                    // move right
                    f[i][j + 1][0] = (f[i][j + 1][0] + total) % MOD;
                    // move down
                    f[i + 1][j][1] = (f[i + 1][j][1] + total) % MOD;
                } else {
                    // entered mirror moving right -> turned down, attempt (i+1, j) moving down
                    f[i + 1][j][1] = (f[i + 1][j][1] + fromRight) % MOD;
                    // entered mirror moving down -> turned right, attempt (i, j+1) moving right
                    f[i][j + 1][0] = (f[i][j + 1][0] + fromDown) % MOD;
                }
            }
        }

        return (f[m - 1][n - 1][0] + f[m - 1][n - 1][1]) % MOD;
    }
}
```

### 🐍 Python (Python 3)
```python
from typing import List

class Solution:
    def uniquePaths(self, grid: List[List[int]]) -> int:
        MOD = 1_000_000_007
        m, n = len(grid), len(grid[0])
        
        # f[i][j][0]: ways entering (i, j) moving Right
        # f[i][j][1]: ways entering (i, j) moving Down
        f = [[[0, 0] for _ in range(n + 1)] for _ in range(m + 1)]
        f[0][0][0] = 1
        
        for i in range(m):
            for j in range(n):
                from_right = f[i][j][0]
                from_down = f[i][j][1]
                
                if grid[i][j] == 0:
                    total = (from_right + from_down) % MOD
                    # move right -> enters (i, j + 1) horizontally
                    f[i][j + 1][0] = (f[i][j + 1][0] + total) % MOD
                    # move down -> enters (i + 1, j) vertically
                    f[i + 1][j][1] = (f[i + 1][j][1] + total) % MOD
                else:
                    # entered moving right -> reflected down into (i + 1, j)
                    f[i + 1][j][1] = (f[i + 1][j][1] + from_right) % MOD
                    # entered moving down -> reflected right into (i, j + 1)
                    f[i][j + 1][0] = (f[i][j + 1][0] + from_down) % MOD
                    
        return (f[m - 1][n - 1][0] + f[m - 1][n - 1][1]) % MOD
```

### ⚡ C++ (C++20)
```cpp
#include <vector>

using namespace std;

class Solution {
public:
    int uniquePaths(vector<vector<int>>& grid) {
        const int MOD = 1'000'000'007;
        int m = grid.size();
        int n = grid[0].size();

        // f[i][j][0] = ways entering (i, j) moving Right
        // f[i][j][1] = ways entering (i, j) moving Down
        vector<vector<vector<int>>> f(m + 1, vector<vector<int>>(n + 1, vector<int>(2, 0)));
        f[0][0][0] = 1;

        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                int fromRight = f[i][j][0];
                int fromDown = f[i][j][1];

                if (grid[i][j] == 0) {
                    int total = (fromRight + fromDown) % MOD;
                    // move right
                    f[i][j + 1][0] = (f[i][j + 1][0] + total) % MOD;
                    // move down
                    f[i + 1][j][1] = (f[i + 1][j][1] + total) % MOD;
                } else {
                    // entered mirror moving right -> deflected down
                    f[i + 1][j][1] = (f[i + 1][j][1] + fromRight) % MOD;
                    // entered mirror moving down -> deflected right
                    f[i][j + 1][0] = (f[i][j + 1][0] + fromDown) % MOD;
                }
            }
        }

        return (f[m - 1][n - 1][0] + f[m - 1][n - 1][1]) % MOD;
    }
};
```

### 🌐 JavaScript (Node.js ES2022)
```javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
var uniquePaths = function(grid) {
    const MOD = 1000000007;
    const m = grid.length;
    const n = grid[0].length;

    // f[i][j][0] = entering (i, j) moving Right
    // f[i][j][1] = entering (i, j) moving Down
    const f = Array.from({ length: m + 1 }, () =>
        Array.from({ length: n + 1 }, () => new Int32Array(2))
    );

    f[0][0][0] = 1;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const fromRight = f[i][j][0];
            const fromDown = f[i][j][1];

            if (grid[i][j] === 0) {
                const total = (fromRight + fromDown) % MOD;
                // move right
                f[i][j + 1][0] = (f[i][j + 1][0] + total) % MOD;
                // move down
                f[i + 1][j][1] = (f[i + 1][j][1] + total) % MOD;
            } else {
                // entered mirror moving right -> deflected down
                f[i + 1][j][1] = (f[i + 1][j][1] + fromRight) % MOD;
                // entered mirror moving down -> deflected right
                f[i][j + 1][0] = (f[i][j + 1][0] + fromDown) % MOD;
            }
        }
    }

    return (f[m - 1][n - 1][0] + f[m - 1][n - 1][1]) % MOD;
};
```

---

<p align="center">
  <a href="../../README.md"><strong>⬅️ Return to October Solutions</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="https://codebytushu.com/Leetcode/"><strong>🌐 Official Live Platform</strong></a>
</p>
