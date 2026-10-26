# LeetCode 799: Champagne Tower

- **Publication Date:** 14 February 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/champagne-tower/](https://leetcode.com/problems/champagne-tower/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

We stack glasses in a pyramid, where the **first** row has 1 glass, the **second** row has 2 glasses, and so on until the $100^{\text{th}}$ row. Each glass holds **one cup** of champagne.

Some champagne is poured into the topmost glass $(0, 0)$. When any glass becomes full, excess liquid falls equally into the two glasses directly beneath it: glass $(r + 1, c)$ (left child) and glass $(r + 1, c + 1)$ (right child).

Given `poured` cups of champagne, return how full the $j^{\text{th}}$ glass in the $i^{\text{th}}$ row is (`query_row`, `query_glass`), clamped between $0.0$ and $1.0$.

---

### Examples

#### Example 1:
- **Input:** `poured = 1, query_row = 1, query_glass = 1`
- **Output:** `0.00000`
- **Explanation:**
  - 1 cup is poured into glass $(0, 0)$. It is filled completely with no overflow.
  - Thus, glass $(1, 1)$ remains empty ($0.0$).

#### Example 2:
- **Input:** `poured = 2, query_row = 1, query_glass = 1`
- **Output:** `0.50000`
- **Explanation:**
  - 2 cups are poured into glass $(0, 0)$. Glass $(0, 0)$ retains 1 cup, and 1 cup overflows.
  - Glasses $(1, 0)$ and $(1, 1)$ equally receive $\frac{1}{2} = 0.5$ cups each.

#### Example 3:
- **Input:** `poured = 100000009, query_row = 33, query_glass = 17`
- **Output:** `1.00000`

---

### Constraints

- $0 \le \text{poured} \le 10^9$
- $0 \le \text{query\_glass} \le \text{query\_row} < 100$

---

## Topics and Tags

- **Primary Tags:** Dynamic Programming, Simulation
- **Secondary Tags:** Math

---

## Detailed Algorithm Walkthrough

### 1. Pyramid Flow and State Representation

Let `tower[r][c]` represent the total amount of champagne that flows into the glass at row $r$, column $c$.

At the top glass $(0, 0)$, all `poured` liquid enters initially:
$$\text{tower}[0][0] = \text{poured}$$

### 2. Overflow Recurrence

For any glass $(r, c)$, its holding capacity is exactly $1$ cup:
1. If $\text{tower}[r][c] \le 1.0$, all liquid remains inside the glass and no liquid spills below.
2. If $\text{tower}[r][c] > 1.0$, the excess overflow is:
   $$\text{overflow} = \frac{\text{tower}[r][c] - 1.0}{2.0}$$
   This excess splits equally to:
   - Left child: $\text{tower}[r + 1][c] \leftarrow \text{tower}[r + 1][c] + \text{overflow}$
   - Right child: $\text{tower}[r + 1][c + 1] \leftarrow \text{tower}[r + 1][c + 1] + \text{overflow}$

### 3. Simulation Scope and Clamping

Since champagne only cascades downwards from row $r$ to row $r + 1$, we only need to simulate row by row from $r = 0$ up to `query_row`:
- After completing row `query_row`, the final liquid in the requested glass is:
  $$\text{result} = \min\big(1.0, \, \text{tower}[\text{query\_row}][\text{query\_glass}]\big)$$

Since $\text{query\_row} < 100$, the total number of evaluated glasses is at most $\frac{100 \times 101}{2} = 5050$, making the simulation run in under a fraction of a millisecond.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(R^2)$, where $R = \text{query\_row} < 100$. There are at most $\frac{R(R+1)}{2} \le 5050$ glass states simulated in constant $\mathcal{O}(1)$ time.
- **Auxiliary Space Complexity:** $\mathcal{O}(R^2)$ using a $(R + 2) \times (R + 2)$ grid (or $\mathcal{O}(R)$ if rolling 1D DP is used).

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 799 - Champagne Tower
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public double champagneTower(int poured, int query_row, int query_glass) {
        double[][] tower = new double[query_row + 2][query_row + 2];
        tower[0][0] = poured;

        for (int r = 0; r <= query_row; r++) {
            for (int c = 0; c <= r; c++) {
                if (tower[r][c] > 1.0) {
                    double overflow = (tower[r][c] - 1.0) / 2.0;
                    tower[r + 1][c] += overflow;
                    tower[r + 1][c + 1] += overflow;
                }
            }
        }

        return Math.min(1.0, tower[query_row][query_glass]);
    }
}
```

### Python
```python
"""
Problem: LeetCode 799 - Champagne Tower
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

class Solution:
    def champagneTower(self, poured: int, query_row: int, query_glass: int) -> float:
        tower = [[0.0] * (r + 1) for r in range(query_row + 2)]
        tower[0][0] = float(poured)

        for r in range(query_row + 1):
            for c in range(r + 1):
                if tower[r][c] > 1.0:
                    overflow = (tower[r][c] - 1.0) / 2.0
                    tower[r + 1][c] += overflow
                    tower[r + 1][c + 1] += overflow

        return min(1.0, tower[query_row][query_glass])
```

### C++
```cpp
/**
 * Problem: LeetCode 799 - Champagne Tower
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    double champagneTower(int poured, int query_row, int query_glass) {
        vector<vector<double>> tower(query_row + 2, vector<double>(query_row + 2, 0.0));
        tower[0][0] = poured;

        for (int r = 0; r <= query_row; r++) {
            for (int c = 0; c <= r; c++) {
                if (tower[r][c] > 1.0) {
                    double overflow = (tower[r][c] - 1.0) / 2.0;
                    tower[r + 1][c] += overflow;
                    tower[r + 1][c + 1] += overflow;
                }
            }
        }

        return min(1.0, tower[query_row][query_glass]);
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 799 - Champagne Tower
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} poured
 * @param {number} query_row
 * @param {number} query_glass
 * @return {number}
 */
var champagneTower = function(poured, query_row, query_glass) {
    const tower = Array.from({ length: query_row + 2 }, () => new Float64Array(query_row + 2));
    tower[0][0] = poured;

    for (let r = 0; r <= query_row; r++) {
        for (let c = 0; c <= r; c++) {
            if (tower[r][c] > 1.0) {
                const overflow = (tower[r][c] - 1.0) / 2.0;
                tower[r + 1][c] += overflow;
                tower[r + 1][c + 1] += overflow;
            }
        }
    }

    return Math.min(1.0, tower[query_row][query_glass]);
};
```
