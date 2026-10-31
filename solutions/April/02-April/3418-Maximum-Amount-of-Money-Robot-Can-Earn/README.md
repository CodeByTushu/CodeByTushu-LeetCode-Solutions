# LeetCode 3418: Maximum Amount of Money Robot Can Earn

- **Publication Date:** 02 April 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/maximum-amount-of-money-robot-can-earn/](https://leetcode.com/problems/maximum-amount-of-money-robot-can-earn/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

You are given an `m x n` grid. A robot starts at the top-left corner of the grid `(0, 0)` and wants to reach the bottom-right corner `(m - 1, n - 1)`. The robot can move either right or down at any point in time.

The grid contains a value `coins[i][j]` in each cell:
- If `coins[i][j] >= 0`, the robot gains that many coins.
- If `coins[i][j] < 0`, the robot encounters a robber, and the robber steals the absolute value of `coins[i][j]` coins.

The robot has a special ability to **neutralize robbers in at most 2 cells** on its path, preventing them from stealing coins in those cells.

**Note:** The robot's total coins can be negative.

Return the **maximum profit** the robot can gain on the route.

---

### Examples

#### Example 1:
- **Input:** `coins = [[0,1,-1],[1,-2,3],[2,-3,4]]`
- **Output:** `8`
- **Explanation:**
  An optimal path for maximum coins is:
  1. Start at `(0, 0)` with $0$ coins (total coins = $0$).
  2. Move to `(0, 1)`, gaining $1$ coin (total coins = $0 + 1 = 1$).
  3. Move to `(1, 1)`, where there's a robber stealing $2$ coins. The robot uses one neutralization here, avoiding the robbery (total coins = $1$).
  4. Move to `(1, 2)`, gaining $3$ coins (total coins = $1 + 3 = 4$).
  5. Move to `(2, 2)`, gaining $4$ coins (total coins = $4 + 4 = 8$).

#### Example 2:
- **Input:** `coins = [[10,10,10],[10,10,10]]`
- **Output:** `40`
- **Explanation:**
  An optimal path for maximum coins is:
  1. Start at `(0, 0)` with $10$ coins (total coins = $10$).
  2. Move to `(0, 1)`, gaining $10$ coins (total coins = $10 + 10 = 20$).
  3. Move to `(0, 2)`, gaining another $10$ coins (total coins = $20 + 10 = 30$).
  4. Move to `(1, 2)`, gaining the final $10$ coins (total coins = $30 + 10 = 40$).

---

### Constraints

- $m == \text{coins.length}$
- $n == \text{coins}[i]\text{.length}$
- $1 \le m, n \le 500$
- $-1000 \le \text{coins}[i][j] \le 1000$

---

## Topics and Tags

- **Primary Tags:** Dynamic Programming, Matrix, Array
- **Secondary Tags:** Simulation

---

## Detailed Algorithm Walkthrough

### 1. State Definition

We can model this optimization problem using 3D Dynamic Programming.
Let:
$$\text{dp}[i][j][k]$$
represent the **maximum coins** the robot can accumulate upon reaching cell $(i, j)$ having used exactly $k$ robber neutralizations, where $k \in \{0, 1, 2\}$.

Because the total path length is at most $m + n - 1 \le 999$ and coins are bounded between $-1000$ and $1000$, total profit cannot drop below $\approx -10^6$. We initialize all states to $-\infty$ (e.g. $-10^9$) to represent unvisited/unreachable configurations.

### 2. Base Case at `(0, 0)`

At the starting cell $(0, 0)$:
- $k = 0$: The robot cannot neutralize:
  $$\text{dp}[0][0][0] = \text{coins}[0][0]$$
- $k \in \{1, 2\}$:
  - If $\text{coins}[0][0] < 0$, the robot can neutralize the robber at $(0, 0)$, setting its profit to $0$:
    $$\text{dp}[0][0][1] = 0, \quad \text{dp}[0][0][2] = 0$$
  - If $\text{coins}[0][0] \ge 0$, no neutralization is needed:
    $$\text{dp}[0][0][1] = \text{coins}[0][0], \quad \text{dp}[0][0][2] = \text{coins}[0][0]$$

### 3. State Transitions

For each cell $(i, j)$, the robot can only arrive from either:
- The top cell $(i - 1, j)$, or
- The left cell $(i, j - 1)$.

For each valid previous cell $(pi, pj) \in \{(i - 1, j), (i, j - 1)\}$ and each $k \in \{0, 1, 2\}$:
1. **Option 1: Do not neutralize the current cell $(i, j)$:**
   $$\text{candidate} = \text{dp}[pi][pj][k] + \text{coins}[i][j]$$
2. **Option 2: Neutralize the robber at $(i, j)$ (if $k \ge 1$ and $\text{coins}[i][j] < 0$):**
   $$\text{candidate} = \text{dp}[pi][pj][k - 1] + 0 = \text{dp}[pi][pj][k - 1]$$

Taking the maximum across both arrival directions and both options determines the optimal value for $\text{dp}[i][j][k]$.

### 4. Final Result

The destination is cell $(m - 1, n - 1)$. The robot can finish with $0$, $1$, or $2$ neutralizations used:
$$\text{result} = \max\Big(\text{dp}[m - 1][n - 1][0], \; \text{dp}[m - 1][n - 1][1], \; \text{dp}[m - 1][n - 1][2]\Big)$$

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(m \cdot n \cdot 3) = \mathcal{O}(m \cdot n)$. For a grid of size up to $500 \times 500$, this performs roughly $7.5 \times 10^5$ basic operations, executing in under $10\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(m \cdot n \cdot 3) = \mathcal{O}(m \cdot n)$ to maintain the 3D dynamic programming table.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 3418 - Maximum Amount of Money Robot Can Earn
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.Arrays;

class Solution {
    public int maximumAmount(int[][] coins) {
        int m = coins.length;
        int n = coins[0].length;
        int NEG_INF = -1_000_000_000;

        // dp[i][j][k]: max profit at cell (i, j) with k neutralizations used (k in {0, 1, 2})
        int[][][] dp = new int[m][n][3];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                Arrays.fill(dp[i][j], NEG_INF);
            }
        }

        // Base case at (0, 0)
        dp[0][0][0] = coins[0][0];
        if (coins[0][0] < 0) {
            dp[0][0][1] = 0;
            dp[0][0][2] = 0;
        } else {
            dp[0][0][1] = coins[0][0];
            dp[0][0][2] = coins[0][0];
        }

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0) continue;

                for (int k = 0; k < 3; k++) {
                    int maxVal = NEG_INF;

                    // Transition from cell above (i - 1, j)
                    if (i > 0) {
                        if (dp[i - 1][j][k] != NEG_INF) {
                            maxVal = Math.max(maxVal, dp[i - 1][j][k] + coins[i][j]);
                        }
                        if (k > 0 && coins[i][j] < 0 && dp[i - 1][j][k - 1] != NEG_INF) {
                            maxVal = Math.max(maxVal, dp[i - 1][j][k - 1]);
                        }
                    }

                    // Transition from cell to the left (i, j - 1)
                    if (j > 0) {
                        if (dp[i][j - 1][k] != NEG_INF) {
                            maxVal = Math.max(maxVal, dp[i][j - 1][k] + coins[i][j]);
                        }
                        if (k > 0 && coins[i][j] < 0 && dp[i][j - 1][k - 1] != NEG_INF) {
                            maxVal = Math.max(maxVal, dp[i][j - 1][k - 1]);
                        }
                    }

                    dp[i][j][k] = maxVal;
                }
            }
        }

        return Math.max(dp[m - 1][n - 1][0], Math.max(dp[m - 1][n - 1][1], dp[m - 1][n - 1][2]));
    }
}
```

### Python
```python
"""
Problem: LeetCode 3418 - Maximum Amount of Money Robot Can Earn
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""
from typing import List


class Solution:
    def maximumAmount(self, coins: List[List[int]]) -> int:
        m, n = len(coins), len(coins[0])
        NEG_INF = -10**9

        # dp[i][j][k]: max profit reaching (i, j) with k neutralizations used (k in {0, 1, 2})
        dp = [[[NEG_INF] * 3 for _ in range(n)] for _ in range(m)]

        # Base case at (0, 0)
        dp[0][0][0] = coins[0][0]
        if coins[0][0] < 0:
            dp[0][0][1] = 0
            dp[0][0][2] = 0
        else:
            dp[0][0][1] = coins[0][0]
            dp[0][0][2] = coins[0][0]

        for i in range(m):
            for j in range(n):
                if i == 0 and j == 0:
                    continue

                for k in range(3):
                    max_val = NEG_INF

                    # From top (i - 1, j)
                    if i > 0:
                        if dp[i - 1][j][k] != NEG_INF:
                            max_val = max(max_val, dp[i - 1][j][k] + coins[i][j])
                        if k > 0 and coins[i][j] < 0 and dp[i - 1][j][k - 1] != NEG_INF:
                            max_val = max(max_val, dp[i - 1][j][k - 1])

                    # From left (i, j - 1)
                    if j > 0:
                        if dp[i][j - 1][k] != NEG_INF:
                            max_val = max(max_val, dp[i][j - 1][k] + coins[i][j])
                        if k > 0 and coins[i][j] < 0 and dp[i][j - 1][k - 1] != NEG_INF:
                            max_val = max(max_val, dp[i][j - 1][k - 1])

                    dp[i][j][k] = max_val

        return max(dp[m - 1][n - 1])
```

### C++
```cpp
/**
 * Problem: LeetCode 3418 - Maximum Amount of Money Robot Can Earn
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maximumAmount(vector<vector<int>>& coins) {
        int m = coins.size();
        int n = coins[0].size();
        const int NEG_INF = -1e9;

        // dp[i][j][k]: max profit reaching (i, j) with k neutralizations used (k in {0, 1, 2})
        vector<vector<vector<int>>> dp(m, vector<vector<int>>(n, vector<int>(3, NEG_INF)));

        // Base case at (0, 0)
        dp[0][0][0] = coins[0][0];
        if (coins[0][0] < 0) {
            dp[0][0][1] = 0;
            dp[0][0][2] = 0;
        } else {
            dp[0][0][1] = coins[0][0];
            dp[0][0][2] = coins[0][0];
        }

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0) continue;

                for (int k = 0; k < 3; k++) {
                    int maxVal = NEG_INF;

                    // From top (i - 1, j)
                    if (i > 0) {
                        if (dp[i - 1][j][k] != NEG_INF) {
                            maxVal = max(maxVal, dp[i - 1][j][k] + coins[i][j]);
                        }
                        if (k > 0 && coins[i][j] < 0 && dp[i - 1][j][k - 1] != NEG_INF) {
                            maxVal = max(maxVal, dp[i - 1][j][k - 1]);
                        }
                    }

                    // From left (i, j - 1)
                    if (j > 0) {
                        if (dp[i][j - 1][k] != NEG_INF) {
                            maxVal = max(maxVal, dp[i][j - 1][k] + coins[i][j]);
                        }
                        if (k > 0 && coins[i][j] < 0 && dp[i][j - 1][k - 1] != NEG_INF) {
                            maxVal = max(maxVal, dp[i][j - 1][k - 1]);
                        }
                    }

                    dp[i][j][k] = maxVal;
                }
            }
        }

        return max({dp[m - 1][n - 1][0], dp[m - 1][n - 1][1], dp[m - 1][n - 1][2]});
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 3418 - Maximum Amount of Money Robot Can Earn
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[][]} coins
 * @return {number}
 */
var maximumAmount = function(coins) {
    const m = coins.length;
    const n = coins[0].length;
    const NEG_INF = -1e9;

    // dp[i][j][k]: max profit reaching (i, j) with k neutralizations used (k in {0, 1, 2})
    const dp = Array.from({ length: m }, () =>
        Array.from({ length: n }, () => [NEG_INF, NEG_INF, NEG_INF])
    );

    // Base case at (0, 0)
    dp[0][0][0] = coins[0][0];
    if (coins[0][0] < 0) {
        dp[0][0][1] = 0;
        dp[0][0][2] = 0;
    } else {
        dp[0][0][1] = coins[0][0];
        dp[0][0][2] = coins[0][0];
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) continue;

            for (let k = 0; k < 3; k++) {
                let maxVal = NEG_INF;

                // From top (i - 1, j)
                if (i > 0) {
                    if (dp[i - 1][j][k] !== NEG_INF) {
                        maxVal = Math.max(maxVal, dp[i - 1][j][k] + coins[i][j]);
                    }
                    if (k > 0 && coins[i][j] < 0 && dp[i - 1][j][k - 1] !== NEG_INF) {
                        maxVal = Math.max(maxVal, dp[i - 1][j][k - 1]);
                    }
                }

                // From left (i, j - 1)
                if (j > 0) {
                    if (dp[i][j - 1][k] !== NEG_INF) {
                        maxVal = Math.max(maxVal, dp[i][j - 1][k] + coins[i][j]);
                    }
                    if (k > 0 && coins[i][j] < 0 && dp[i][j - 1][k - 1] !== NEG_INF) {
                        maxVal = Math.max(maxVal, dp[i][j - 1][k - 1]);
                    }
                }

                dp[i][j][k] = maxVal;
            }
        }
    }

    return Math.max(dp[m - 1][n - 1][0], dp[m - 1][n - 1][1], dp[m - 1][n - 1][2]);
};
```
