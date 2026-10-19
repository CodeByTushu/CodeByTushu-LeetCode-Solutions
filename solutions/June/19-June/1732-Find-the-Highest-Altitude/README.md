# LeetCode 1732: Find the Highest Altitude

- **Publication Date:** 19 June 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/find-the-highest-altitude/](https://leetcode.com/problems/find-the-highest-altitude/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/sOtYOSroows?si=coS-WYZe0fCy1XkI)

---

## Problem Summary

There is a biker going on a road trip. The road trip consists of $n + 1$ points at different altitudes. The biker starts his trip on point $0$ with altitude equal to $0$.

You are given an integer array `gain` of length $n$ where `gain[i]` is the **net gain in altitude** between points $i$ and $i + 1$ for all ($0 \le i < n$). Return the **highest altitude** of a point.

---

### Examples

#### Example 1:
- **Input:** `gain = [-5,1,5,0,-7]`
- **Output:** `1`
- **Explanation:**
  - Start at point 0: altitude = 0.
  - After gain `[-5]`: altitude = $0 + (-5) = -5$.
  - After gain `[1]`: altitude = $-5 + 1 = -4$.
  - After gain `[5]`: altitude = $-4 + 5 = 1$.
  - After gain `[0]`: altitude = $1 + 0 = 1$.
  - After gain `[-7]`: altitude = $1 + (-7) = -6$.
  - Altitudes visited: `[0, -5, -4, 1, 1, -6]`. The highest altitude reached is `1`.

#### Example 2:
- **Input:** `gain = [-4,-3,-2,-1,4,3,2]`
- **Output:** `0`
- **Explanation:**
  - Altitudes visited: `[0, -4, -7, -9, -10, -6, -3, -1]`. The highest altitude reached is `0`.

---

### Constraints

- $n == \text{gain.length}$
- $1 \le n \le 100$
- $-100 \le \text{gain}[i] \le 100$

---

## Algorithmic Approach

### Running Prefix Sum Accumulation

The problem asks for the maximum point value during a cumulative prefix sum trajectory starting at $0$:

1. **State Tracking:**
   - Maintain `altitude = 0` representing the biker's current altitude at point $0$.
   - Maintain `maxAltitude = 0` representing the highest peak observed so far (at minimum 0 since the trip begins at altitude 0).

2. **Single Pass:**
   - Iterate through each net gain `g` in `gain`:
     - Accumulate the current altitude: `altitude += g`.
     - Update the maximum peak: `maxAltitude = Math.max(maxAltitude, altitude)`.

3. **Return Result:**
   - After processing all segments, return `maxAltitude`.

This avoids allocating an auxiliary prefix sum array, requiring only $\mathcal{O}(1)$ extra memory.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N)$ | A single linear pass through the `gain` array of size $N$ performs constant-time additions and comparisons. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Only two primitive scalar integer variables (`altitude` and `maxAltitude`) are maintained. |

---

## Multi-Language Implementations

### Java
```java
class Solution {
    public int largestAltitude(int[] gain) {
        int altitude = 0;
        int maxAltitude = 0;
        for (int g : gain) {
            altitude += g;
            maxAltitude = Math.max(maxAltitude, altitude);
        }
        return maxAltitude;
    }
}
```

### Python
```python
from typing import List

class Solution:
    def largestAltitude(self, gain: List[int]) -> int:
        altitude = 0
        max_altitude = 0
        for g in gain:
            altitude += g
            max_altitude = max(max_altitude, altitude)
        return max_altitude
```

### C++
```cpp
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int largestAltitude(vector<int>& gain) {
        int altitude = 0;
        int maxAltitude = 0;
        for (int g : gain) {
            altitude += g;
            maxAltitude = max(maxAltitude, altitude);
        }
        return maxAltitude;
    }
};
```

### JavaScript
```javascript
/**
 * @param {number[]} gain
 * @return {number}
 */
var largestAltitude = function(gain) {
    let altitude = 0;
    let maxAltitude = 0;
    for (const g of gain) {
        altitude += g;
        maxAltitude = Math.max(maxAltitude, altitude);
    }
    return maxAltitude;
};
```

---

<p align="center">
  <a href="../18-June/1344-Angle-Between-Hands-of-a-Clock/"><strong>⬅️ Previous Problem (18 June: #1344)</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../README.md"><strong>🌊 June 2026 Archive</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../../README.md"><strong>🗂️ All Solutions Archive</strong></a>
</p>
