# LeetCode 3661: Maximum Walls Destroyed by Robots

- **Publication Date:** 03 April 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/maximum-walls-destroyed-by-robots/](https://leetcode.com/problems/maximum-walls-destroyed-by-robots/)
- **YouTube Solution:** [Watch Video](https://youtu.be/why-zcaBWGw?si=oDYqGZw2hQT25krx)

---

## Problem Summary

There is an endless straight line populated with some robots and walls. You are given integer arrays `robots`, `distance`, and `walls`:
- `robots[i]` is the position of the $i$-th robot.
- `distance[i]` is the maximum distance the $i$-th robot's bullet can travel.
- `walls[j]` is the position of the $j$-th wall.

Every robot has one bullet that can either fire to the **left** or the **right** at most `distance[i]` meters.

A bullet destroys every wall in its path that lies within its range. Robots are fixed obstacles: if a bullet hits another robot before reaching a wall, it immediately stops at that robot and cannot continue.

Return the **maximum number of unique walls** that can be destroyed by the robots.

**Notes:**
- A wall and a robot may share the same position; the wall can be destroyed by the robot at that position.
- Robots are not destroyed by bullets.

---

### Examples

#### Example 1:
- **Input:** `robots = [4], distance = [3], walls = [1, 10]`
- **Output:** `1`
- **Explanation:**
  - `robots[0] = 4` fires left with `distance[0] = 3`, covering $[1, 4]$ and destroys `walls[0] = 1`.
  - Thus, the answer is $1$.

#### Example 2:
- **Input:** `robots = [10, 2], distance = [5, 1], walls = [5, 2, 7]`
- **Output:** `3`
- **Explanation:**
  - `robots[0] = 10` fires left with `distance[0] = 5`, covering $[5, 10]$ and destroys `walls[0] = 5` and `walls[2] = 7`.
  - `robots[1] = 2` fires left with `distance[1] = 1`, covering $[1, 2]$ and destroys `walls[1] = 2`.
  - Thus, the answer is $3$.

#### Example 3:
- **Input:** `robots = [1, 2], distance = [100, 1], walls = [10]`
- **Output:** `0`
- **Explanation:**
  - In this example, only `robots[0]` can reach the wall, but its shot to the right is blocked by `robots[1]`; thus the answer is $0$.

---

### Constraints

- $1 \le \text{robots.length} == \text{distance.length} \le 10^5$
- $1 \le \text{walls.length} \le 10^5$
- $1 \le \text{robots}[i], \text{walls}[j] \le 10^9$
- $1 \le \text{distance}[i] \le 10^5$
- All values in `robots` are unique.
- All values in `walls` are unique.

---

## Topics and Tags

- **Primary Tags:** Dynamic Programming, Binary Search, Sorting, Array
- **Secondary Tags:** Greedy, Divide and Conquer

---

## Detailed Algorithm Walkthrough

### 1. Sorting and Modeling Obstacles
First, sort both the robots (paired with their firing distances) and the walls by their coordinates along the 1D number line:
- Sorted robots: $(r_0, d_0), (r_1, d_1), \dots, (r_{n-1}, d_{n-1})$ where $r_0 < r_1 < \dots < r_{n-1}$.
- Sorted walls array allows counting walls inside any closed interval $[A, B]$ in $\mathcal{O}(\log M)$ time using binary search (`lower_bound` / `upper_bound`).

### 2. Bullet Range Truncation
Because bullets are completely blocked by any other robot encountered along the line:
- **Firing Left for robot $i$:**
  - Range starts at $r_i$ and goes left up to $r_i - d_i$.
  - However, if $i > 0$, the shot is blocked by robot $i - 1$ located at $r_{i-1}$. Therefore, the bullet covers the interval:
    $$[\max(r_i - d_i, r_{i-1} + 1), r_i]$$
- **Firing Right for robot $i$:**
  - Range starts at $r_i$ and goes right up to $r_i + d_i$.
  - However, if $i < n - 1$, the shot is blocked by robot $i + 1$ located at $r_{i+1}$. Therefore, the bullet covers the interval:
    $$[r_i, \min(r_i + d_i, r_{i+1} - 1)]$$

### 3. Overlap Analysis Between Adjacent Robots
Because a robot cannot fire past its adjacent neighbors, only **immediately adjacent robots** ($i - 1$ and $i$) can potentially cover overlapping positions:
1. **Robot $i - 1$ fires Left, Robot $i$ fires Left:** Both intervals are strictly separated by $r_{i-1}$ (disjoint).
2. **Robot $i - 1$ fires Right, Robot $i$ fires Right:** Disjoint because robot $i - 1$ stops before $r_i$ and robot $i$ starts at $r_i$.
3. **Robot $i - 1$ fires Left, Robot $i$ fires Right:** Both fire outward away from the gap $[r_{i-1}, r_i]$ (disjoint).
4. **Robot $i - 1$ fires Right, Robot $i$ fires Left:**
   - Robot $i - 1$'s right shot: $[r_{i-1}, \text{rightBound}[i - 1]]$.
   - Robot $i$'s left shot: $[\text{leftBound}[i], r_i]$.
   - If $\text{rightBound}[i - 1] \ge \text{leftBound}[i]$, their spans overlap and together completely cover the entire segment $[r_{i-1}, r_i]$. The number of unique walls destroyed is simply $\text{countWalls}(r_{i-1}, r_i)$.
   - If $\text{rightBound}[i - 1] < \text{leftBound}[i]$, their spans do not overlap; the total unique walls destroyed is simply the sum: $W_{\text{right}}[i - 1] + W_{\text{left}}[i]$.

### 4. Dynamic Programming Formulation
Define:
- $\text{dp}[i][0]$: Maximum unique walls destroyed by robots $0 \dots i$ such that robot $i$ fires **Left**.
- $\text{dp}[i][1]$: Maximum unique walls destroyed by robots $0 \dots i$ such that robot $i$ fires **Right**.

**Base Case ($i = 0$):**
$$\text{dp}[0][0] = W_{\text{left}}[0]$$
$$\text{dp}[0][1] = W_{\text{right}}[0]$$

**Transitions for $i = 1 \dots n - 1$:**
- If robot $i$ fires **Left**:
  $$\text{dp}[i][0] = \max\Big(\text{dp}[i-1][0] + W_{\text{left}}[i], \; \text{dp}[i-1][1] - W_{\text{right}}[i-1] + W_{\text{both}}(i-1, i)\Big)$$
- If robot $i$ fires **Right**:
  $$\text{dp}[i][1] = \max(\text{dp}[i-1][0], \text{dp}[i-1][1]) + W_{\text{right}}[i]$$

The final answer is:
$$\max(\text{dp}[n - 1][0], \text{dp}[n - 1][1])$$

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N \log N + M \log M + N \log M)$
  - Sorting robots takes $\mathcal{O}(N \log N)$.
  - Sorting walls takes $\mathcal{O}(M \log M)$.
  - For each robot, we perform $\mathcal{O}(1)$ binary searches on the walls array, each taking $\mathcal{O}(\log M)$.
  - Total time is $\mathcal{O}((N + M) \log M + N \log N)$, which runs in under $50\text{ ms}$ for $N, M \le 10^5$.
- **Space Complexity:** $\mathcal{O}(N)$ auxiliary space for storing the sorted robot pairs and DP states.

---

## Solutions

### Java ☕
```java
/**
 * Problem: LeetCode 3661 - Maximum Walls Destroyed by Robots
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.Arrays;
import java.util.Comparator;

class Solution {
    public int maxWalls(int[] robots, int[] distance, int[] walls) {
        int n = robots.length;
        int[][] r = new int[n][2];
        for (int i = 0; i < n; i++) {
            r[i][0] = robots[i];
            r[i][1] = distance[i];
        }
        Arrays.sort(r, Comparator.comparingInt(a -> a[0]));
        Arrays.sort(walls);

        int[] leftBound = new int[n];
        int[] rightBound = new int[n];
        int[] wLeft = new int[n];
        int[] wRight = new int[n];

        for (int i = 0; i < n; i++) {
            int lLimit = (i > 0) ? r[i - 1][0] + 1 : Integer.MIN_VALUE;
            leftBound[i] = Math.max(r[i][0] - r[i][1], lLimit);
            wLeft[i] = countWalls(walls, leftBound[i], r[i][0]);

            int rLimit = (i < n - 1) ? r[i + 1][0] - 1 : Integer.MAX_VALUE;
            rightBound[i] = Math.min(r[i][0] + r[i][1], rLimit);
            wRight[i] = countWalls(walls, r[i][0], rightBound[i]);
        }

        // dp0: robot i fires Left
        // dp1: robot i fires Right
        int dp0 = wLeft[0];
        int dp1 = wRight[0];

        for (int i = 1; i < n; i++) {
            int wBoth;
            if (rightBound[i - 1] >= leftBound[i]) {
                wBoth = countWalls(walls, r[i - 1][0], r[i][0]);
            } else {
                wBoth = wRight[i - 1] + wLeft[i];
            }

            int nextDp0 = Math.max(dp0 + wLeft[i], dp1 - wRight[i - 1] + wBoth);
            int nextDp1 = Math.max(dp0, dp1) + wRight[i];

            dp0 = nextDp0;
            dp1 = nextDp1;
        }

        return Math.max(dp0, dp1);
    }

    private int countWalls(int[] walls, int low, int high) {
        if (low > high) {
            return 0;
        }
        int start = lowerBound(walls, low);
        int end = upperBound(walls, high);
        return Math.max(0, end - start);
    }

    private int lowerBound(int[] arr, int target) {
        int low = 0, high = arr.length;
        while (low < high) {
            int mid = (low + high) >>> 1;
            if (arr[mid] >= target) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return low;
    }

    private int upperBound(int[] arr, int target) {
        int low = 0, high = arr.length;
        while (low < high) {
            int mid = (low + high) >>> 1;
            if (arr[mid] > target) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return low;
    }
}
```

### Python 🐍
```python
"""
Problem: LeetCode 3661 - Maximum Walls Destroyed by Robots
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""
from bisect import bisect_left, bisect_right
from typing import List

class Solution:
    def maxWalls(self, robots: List[int], distance: List[int], walls: List[int]) -> int:
        """
        Calculates the maximum number of unique walls destroyed by robots.
        
        Time Complexity: O(N log N + M log M + N log M)
        Space Complexity: O(N)
        """
        n = len(robots)
        r = sorted(zip(robots, distance), key=lambda x: x[0])
        walls.sort()

        def count_walls(low: int, high: int) -> int:
            if low > high:
                return 0
            start = bisect_left(walls, low)
            end = bisect_right(walls, high)
            return max(0, end - start)

        left_bound = [0] * n
        right_bound = [0] * n
        w_left = [0] * n
        w_right = [0] * n

        for i in range(n):
            l_limit = r[i - 1][0] + 1 if i > 0 else -float("inf")
            left_bound[i] = max(r[i][0] - r[i][1], l_limit)
            w_left[i] = count_walls(left_bound[i], r[i][0])

            r_limit = r[i + 1][0] - 1 if i < n - 1 else float("inf")
            right_bound[i] = min(r[i][0] + r[i][1], r_limit)
            w_right[i] = count_walls(r[i][0], right_bound[i])

        # dp0: robot i fires Left
        # dp1: robot i fires Right
        dp0 = w_left[0]
        dp1 = w_right[0]

        for i in range(1, n):
            if right_bound[i - 1] >= left_bound[i]:
                w_both = count_walls(r[i - 1][0], r[i][0])
            else:
                w_both = w_right[i - 1] + w_left[i]

            next_dp0 = max(dp0 + w_left[i], dp1 - w_right[i - 1] + w_both)
            next_dp1 = max(dp0, dp1) + w_right[i]

            dp0, dp1 = next_dp0, next_dp1

        return max(dp0, dp1)
```

### C++ ⚡
```cpp
/**
 * Problem: LeetCode 3661 - Maximum Walls Destroyed by Robots
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maxWalls(vector<int>& robots, vector<int>& distance, vector<int>& walls) {
        int n = robots.size();
        vector<pair<int, int>> r(n);
        for (int i = 0; i < n; i++) {
            r[i] = {robots[i], distance[i]};
        }
        sort(r.begin(), r.end());
        sort(walls.begin(), walls.end());

        auto countWalls = [&](long long low, long long high) -> int {
            if (low > high) return 0;
            auto start = lower_bound(walls.begin(), walls.end(), low);
            auto end = upper_bound(walls.begin(), walls.end(), high);
            return max(0, (int)(end - start));
        };

        vector<long long> leftBound(n);
        vector<long long> rightBound(n);
        vector<int> wLeft(n);
        vector<int> wRight(n);

        for (int i = 0; i < n; i++) {
            long long lLimit = (i > 0) ? (long long)r[i - 1].first + 1 : -2e18;
            leftBound[i] = max((long long)r[i].first - r[i].second, lLimit);
            wLeft[i] = countWalls(leftBound[i], r[i].first);

            long long rLimit = (i < n - 1) ? (long long)r[i + 1].first - 1 : 2e18;
            rightBound[i] = min((long long)r[i].first + r[i].second, rLimit);
            wRight[i] = countWalls(r[i].first, rightBound[i]);
        }

        // dp0: robot i fires Left
        // dp1: robot i fires Right
        int dp0 = wLeft[0];
        int dp1 = wRight[0];

        for (int i = 1; i < n; i++) {
            int wBoth = 0;
            if (rightBound[i - 1] >= leftBound[i]) {
                wBoth = countWalls(r[i - 1].first, r[i].first);
            } else {
                wBoth = wRight[i - 1] + wLeft[i];
            }

            int nextDp0 = max(dp0 + wLeft[i], dp1 - wRight[i - 1] + wBoth);
            int nextDp1 = max(dp0, dp1) + wRight[i];

            dp0 = nextDp0;
            dp1 = nextDp1;
        }

        return max(dp0, dp1);
    }
};
```

### JavaScript 🌐
```javascript
/**
 * Problem: LeetCode 3661 - Maximum Walls Destroyed by Robots
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */
var maxWalls = function(robots, distance, walls) {
    const n = robots.length;
    const r = [];
    for (let i = 0; i < n; i++) {
        r.push({ pos: robots[i], dist: distance[i] });
    }
    r.sort((a, b) => a.pos - b.pos);
    walls.sort((a, b) => a - b);

    function countWalls(low, high) {
        if (low > high) return 0;
        let left = 0, right = walls.length;
        while (left < right) {
            const mid = (left + right) >> 1;
            if (walls[mid] >= low) right = mid;
            else left = mid + 1;
        }
        const start = left;

        left = 0; right = walls.length;
        while (left < right) {
            const mid = (left + right) >> 1;
            if (walls[mid] > high) right = mid;
            else left = mid + 1;
        }
        const end = left;
        return Math.max(0, end - start);
    }

    const leftBound = new Array(n);
    const rightBound = new Array(n);
    const wLeft = new Array(n);
    const wRight = new Array(n);

    for (let i = 0; i < n; i++) {
        const lLimit = (i > 0) ? r[i - 1].pos + 1 : -Infinity;
        leftBound[i] = Math.max(r[i].pos - r[i].dist, lLimit);
        wLeft[i] = countWalls(leftBound[i], r[i].pos);

        const rLimit = (i < n - 1) ? r[i + 1].pos - 1 : Infinity;
        rightBound[i] = Math.min(r[i].pos + r[i].dist, rLimit);
        wRight[i] = countWalls(r[i].pos, rightBound[i]);
    }

    // dp0: robot i fires Left
    // dp1: robot i fires Right
    let dp0 = wLeft[0];
    let dp1 = wRight[0];

    for (let i = 1; i < n; i++) {
        let wBoth = 0;
        if (rightBound[i - 1] >= leftBound[i]) {
            wBoth = countWalls(r[i - 1].pos, r[i].pos);
        } else {
            wBoth = wRight[i - 1] + wLeft[i];
        }

        const nextDp0 = Math.max(dp0 + wLeft[i], dp1 - wRight[i - 1] + wBoth);
        const nextDp1 = Math.max(dp0, dp1) + wRight[i];

        dp0 = nextDp0;
        dp1 = nextDp1;
    }

    return Math.max(dp0, dp1);
};
```
