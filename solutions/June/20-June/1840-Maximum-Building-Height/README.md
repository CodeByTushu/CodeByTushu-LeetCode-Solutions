# LeetCode 1840: Maximum Building Height

- **Publication Date:** 20 June 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/maximum-building-height/](https://leetcode.com/problems/maximum-building-height/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/WJUIHRNH65s?si=nlY6thDe_hTxC11A)

---

## Problem Summary

You want to build $n$ new buildings in a city. The new buildings will be built in a line and are labeled from $1$ to $n$.

However, there are city restrictions on the heights of the new buildings:
- The height of each building must be a non-negative integer.
- The height of the first building must be `0`.
- The height difference between any two adjacent buildings cannot exceed `1` (i.e., $|h_i - h_{i+1}| \le 1$).

Additionally, there are city restrictions on the maximum height of specific buildings. These restrictions are given as a 2D integer array `restrictions` where `restrictions[i] = [id_i, maxHeight_i]` indicates that building $id_i$ must have a height **less than or equal to** $maxHeight_i$.

It is guaranteed that each building will appear **at most once** in `restrictions`, and building `1` will **not** be in `restrictions`.

Return *the **maximum possible height** of the tallest building*.

---

### Examples

#### Example 1:
- **Input:** `n = 5, restrictions = [[2,1],[4,1]]`
- **Output:** `2`
- **Explanation:**
  - One optimal way to build the buildings is `[0, 1, 2, 1, 2]`.
  - The maximum height achieved is `2`.

#### Example 2:
- **Input:** `n = 6, restrictions = []`
- **Output:** `5`
- **Explanation:**
  - One optimal way to build the buildings is `[0, 1, 2, 3, 4, 5]`.
  - The maximum height achieved is `5`.

#### Example 3:
- **Input:** `n = 10, restrictions = [[5,3],[2,5],[7,4],[10,3]]`
- **Output:** `5`
- **Explanation:**
  - One optimal way to build the buildings is `[0, 1, 2, 3, 3, 3, 4, 4, 5, 3]`.
  - The maximum height achieved is `5`.

---

### Constraints

- $2 \le n \le 10^9$
- $0 \le \text{restrictions.length} \le \min(n - 1, 10^5)$
- $2 \le id_i \le n$
- $id_i$ is **unique**.
- $0 \le maxHeight_i \le 10^9$

---

## Algorithmic Approach

### Two-Pass Constraint Propagation & Peak Calculation (Greedy)

1. **Boundary Conditions & Setup:**
   - Building $1$ must always have height $0$, so we add the restriction $[1, 0]$.
   - If building $n$ is not explicitly restricted, we can add a dummy restriction $[n, n - 1]$ since the height cannot exceed $(n - 1)$ starting from building $1$ with height $0$.
   - Sort all restrictions by building index $id$ in ascending order.

2. **Left-to-Right Pass (Forward Relaxation):**
   - For every restriction $i$ from $1$ to $m - 1$:
     - The height at building $x_i$ cannot exceed the height at $x_{i-1}$ plus the distance between them:
       $$\text{limit}[i] = \min(\text{limit}[i], \text{limit}[i-1] + (x_i - x_{i-1}))$$

3. **Right-to-Left Pass (Backward Relaxation):**
   - For every restriction $i$ from $m - 2$ down to $0$:
     - Symmetrically, the height at building $x_i$ cannot exceed the height at $x_{i+1}$ plus the distance between them:
       $$\text{limit}[i] = \min(\text{limit}[i], \text{limit}[i+1] + (x_{i+1} - x_i))$$

4. **Maximum Peak Between Adjacent Restrictions:**
   - Between any two consecutive restricted buildings $(x_1, h_1)$ and $(x_2, h_2)$ with distance $\Delta x = x_2 - x_1$:
     - The heights can climb up from $h_1$ and down to $h_2$, meeting at a peak in between.
     - The maximum possible peak height is:
       $$\text{peak} = \left\lfloor \frac{h_1 + h_2 + \Delta x}{2} \right\rfloor$$
   - The global maximum height is the maximum $\text{peak}$ across all adjacent restriction intervals.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(M \log M)$ | Sorting $M$ restrictions takes $\mathcal{O}(M \log M)$ time where $M = |\text{restrictions}| + 2$. The two relaxation passes and the final peak calculation take linear time $\mathcal{O}(M)$. |
| **Auxiliary Space** | $\mathcal{O}(M)$ | We store the augmented restrictions list of size $M \le 10^5 + 2$. |

---

## Multi-Language Implementations

### Java
```java
import java.util.*;

class Solution {
    public int maxBuilding(int n, int[][] restrictions) {
        List<int[]> list = new ArrayList<>();

        // Building 1 always has height 0
        list.add(new int[]{1, 0});

        for (int[] r : restrictions) {
            list.add(new int[]{r[0], r[1]});
        }

        // Add building n if not already present
        boolean hasN = false;
        for (int[] r : list) {
            if (r[0] == n) {
                hasN = true;
                break;
            }
        }
        if (!hasN) {
            list.add(new int[]{n, n - 1});
        }

        // Sort by building index
        Collections.sort(list, (a, b) -> Integer.compare(a[0], b[0]));

        int m = list.size();

        // Left to right pass
        for (int i = 1; i < m; i++) {
            int dist = list.get(i)[0] - list.get(i - 1)[0];
            list.get(i)[1] = Math.min(list.get(i)[1],
                    list.get(i - 1)[1] + dist);
        }

        // Right to left pass
        for (int i = m - 2; i >= 0; i--) {
            int dist = list.get(i + 1)[0] - list.get(i)[0];
            list.get(i)[1] = Math.min(list.get(i)[1],
                    list.get(i + 1)[1] + dist);
        }

        int ans = 0;

        // Compute maximum possible peak between adjacent restrictions
        for (int i = 1; i < m; i++) {

            int x1 = list.get(i - 1)[0];
            int h1 = list.get(i - 1)[1];

            int x2 = list.get(i)[0];
            int h2 = list.get(i)[1];

            int dist = x2 - x1;

            int peak = (h1 + h2 + dist) / 2;

            ans = Math.max(ans, peak);
        }

        return ans;
    }
}
```

### Python
```python
from typing import List

class Solution:
    def maxBuilding(self, n: int, restrictions: List[List[int]]) -> int:
        r = [[1, 0]]
        for item in restrictions:
            r.append([item[0], item[1]])
        
        has_n = any(item[0] == n for item in r)
        if not has_n:
            r.append([n, n - 1])
            
        r.sort(key=lambda x: x[0])
        m = len(r)
        
        # Left to right pass
        for i in range(1, m):
            dist = r[i][0] - r[i - 1][0]
            r[i][1] = min(r[i][1], r[i - 1][1] + dist)
            
        # Right to left pass
        for i in range(m - 2, -1, -1):
            dist = r[i + 1][0] - r[i][0]
            r[i][1] = min(r[i][1], r[i + 1][1] + dist)
            
        ans = 0
        for i in range(1, m):
            x1, h1 = r[i - 1]
            x2, h2 = r[i]
            dist = x2 - x1
            peak = (h1 + h2 + dist) // 2
            ans = max(ans, peak)
            
        return ans
```

### C++
```cpp
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maxBuilding(int n, vector<vector<int>>& restrictions) {
        vector<vector<int>> list;
        list.push_back({1, 0});
        for (const auto& r : restrictions) {
            list.push_back(r);
        }

        bool hasN = false;
        for (const auto& r : list) {
            if (r[0] == n) {
                hasN = true;
                break;
            }
        }
        if (!hasN) {
            list.push_back({n, n - 1});
        }

        sort(list.begin(), list.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[0] < b[0];
        });

        int m = list.size();

        // Left to right pass
        for (int i = 1; i < m; i++) {
            int dist = list[i][0] - list[i - 1][0];
            list[i][1] = min(list[i][1], list[i - 1][1] + dist);
        }

        // Right to left pass
        for (int i = m - 2; i >= 0; i--) {
            int dist = list[i + 1][0] - list[i][0];
            list[i][1] = min(list[i][1], list[i + 1][1] + dist);
        }

        int ans = 0;
        for (int i = 1; i < m; i++) {
            int x1 = list[i - 1][0];
            int h1 = list[i - 1][1];
            int x2 = list[i][0];
            int h2 = list[i][1];
            int dist = x2 - x1;
            int peak = (h1 + h2 + dist) / 2;
            ans = max(ans, peak);
        }

        return ans;
    }
};
```

### JavaScript
```javascript
/**
 * @param {number} n
 * @param {number[][]} restrictions
 * @return {number}
 */
var maxBuilding = function(n, restrictions) {
    const list = [[1, 0]];
    for (const r of restrictions) {
        list.push([r[0], r[1]]);
    }

    let hasN = false;
    for (const r of list) {
        if (r[0] === n) {
            hasN = true;
            break;
        }
    }
    if (!hasN) {
        list.push([n, n - 1]);
    }

    list.sort((a, b) => a[0] - b[0]);

    const m = list.length;

    // Left to right pass
    for (let i = 1; i < m; i++) {
        const dist = list[i][0] - list[i - 1][0];
        list[i][1] = Math.min(list[i][1], list[i - 1][1] + dist);
    }

    // Right to left pass
    for (let i = m - 2; i >= 0; i--) {
        const dist = list[i + 1][0] - list[i][0];
        list[i][1] = Math.min(list[i][1], list[i + 1][1] + dist);
    }

    let ans = 0;
    for (let i = 1; i < m; i++) {
        const x1 = list[i - 1][0];
        const h1 = list[i - 1][1];
        const x2 = list[i][0];
        const h2 = list[i][1];
        const dist = x2 - x1;
        const peak = Math.floor((h1 + h2 + dist) / 2);
        ans = Math.max(ans, peak);
    }

    return ans;
};
```

---

<p align="center">
  <a href="../19-June/1732-Find-the-Highest-Altitude/"><strong>⬅️ Previous Problem (19 June: #1732)</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../README.md"><strong>🌊 June 2026 Archive</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../../README.md"><strong>🗂️ All Solutions Archive</strong></a>
</p>
