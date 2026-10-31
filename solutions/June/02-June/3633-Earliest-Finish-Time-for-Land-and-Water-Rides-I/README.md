# LeetCode 3633: Earliest Finish Time for Land and Water Rides I

- **Publication Date:** 02 June 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/earliest-finish-time-for-land-and-water-rides-i/](https://leetcode.com/problems/earliest-finish-time-for-land-and-water-rides-i/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/AV8AV8ZijLQ?si=rO517E_kh05jDVvk)

---

## Problem Summary

You are given two categories of theme park attractions: **land rides** and **water rides**.

- **Land rides:**
  - `landStartTime[i]` – the earliest time the $i^{\text{th}}$ land ride can be boarded.
  - `landDuration[i]` – how long the $i^{\text{th}}$ land ride lasts.
- **Water rides:**
  - `waterStartTime[j]` – the earliest time the $j^{\text{th}}$ water ride can be boarded.
  - `waterDuration[j]` – how long the $j^{\text{th}}$ water ride lasts.

A tourist must experience **exactly one ride from each category, in either order**:
1. A ride may be started at its opening time or any later moment.
2. If a ride is started at time $t$, it finishes at time $t + \text{duration}$.
3. Immediately after finishing one ride, the tourist may board the other ride (if it is already open) or wait until it opens.

Return the **earliest possible time** at which the tourist can finish both rides.

---

### Examples

#### Example 1:
- **Input:** `landStartTime = [2, 8]`, `landDuration = [4, 1]`, `waterStartTime = [6]`, `waterDuration = [3]`
- **Output:** `9`
- **Explanation:**
  - **Option 1 (Land first, then Water):**
    - Board land ride $0$ at time $2$, finishes at $2 + 4 = 6$.
    - Board water ride $0$ at time $\max(6, 6) = 6$, finishes at $6 + 3 = 9$.
  - **Option 2 (Water first, then Land):**
    - Board water ride $0$ at time $6$, finishes at $6 + 3 = 9$.
    - Board land ride $1$ at time $\max(9, 8) = 9$, finishes at $9 + 1 = 10$.
  - The earliest finish time across all combinations is $\min(9, 10, \dots) = 9$.

#### Example 2:
- **Input:** `landStartTime = [5]`, `landDuration = [3]`, `waterStartTime = [1]`, `waterDuration = [10]`
- **Output:** `14`
- **Explanation:**
  - Water ride $0$ opens at $1$, finishes at $1 + 10 = 11$. Then land ride $0$ can start at $\max(11, 5) = 11$, finishing at $11 + 3 = 14$.
  - Land ride $0$ opens at $5$, finishes at $5 + 3 = 8$. Then water ride $0$ can start at $\max(8, 1) = 8$, finishing at $8 + 10 = 18$.
  - The minimum finish time is $14$.

---

### Constraints

- $1 \le \text{landStartTime.length} = \text{landDuration.length} \le 100$
- $1 \le \text{waterStartTime.length} = \text{waterDuration.length} \le 100$
- $1 \le \text{landStartTime}[i], \text{landDuration}[i] \le 10^5$
- $1 \le \text{waterStartTime}[j], \text{waterDuration}[j] \le 10^5$

---

## Algorithmic Approach

### 1. Order of Rides
The tourist must experience one ride from each category in either of two possible orders:
1. **Land ride $\rightarrow$ Water ride**:
   - For a chosen land ride $i$, completion time is $T_{\text{land}} = \text{landStartTime}[i] + \text{landDuration}[i]$.
   - Then for water ride $j$, the start time is $\max(T_{\text{land}}, \text{waterStartTime}[j])$, finishing at $\text{start} + \text{waterDuration}[j]$.
2. **Water ride $\rightarrow$ Land ride**:
   - For a chosen water ride $j$, completion time is $T_{\text{water}} = \text{waterStartTime}[j] + \text{waterDuration}[j]$.
   - Then for land ride $i$, the start time is $\max(T_{\text{water}}, \text{landStartTime}[i])$, finishing at $\text{start} + \text{landDuration}[i]$.

### 2. Full Pair Enumeration
Given $N, M \le 100$, the total number of ride pairs in each direction is $N \times M \le 10^4$. We can directly simulate every candidate pair $(i, j)$ in both directions and track the global minimum finish time.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N \times M)$ | Checking all combinations of land ride $i$ and water ride $j$ across both sequential orders takes $2 \times N \times M$ operations. For $N, M \le 100$, this executes within a few milliseconds. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Only scalar primitive variables (`answer`, `landFinish`, `waterStart`, etc.) are allocated during iteration. |

---

## Multi-Language Implementations

### Java
```java
class Solution {
    public int earliestFinishTime(int[] landStartTime, int[] landDuration, int[] waterStartTime, int[] waterDuration) {

        int answer = Integer.MAX_VALUE;

        // Land ride first, then Water ride
        for (int i = 0; i < landStartTime.length; i++) {
            int landFinish = landStartTime[i] + landDuration[i];

            for (int j = 0; j < waterStartTime.length; j++) {
                int waterStart = Math.max(landFinish, waterStartTime[j]);
                int totalFinish = waterStart + waterDuration[j];

                answer = Math.min(answer, totalFinish);
            }
        }

        // Water ride first, then Land ride
        for (int i = 0; i < waterStartTime.length; i++) {
            int waterFinish = waterStartTime[i] + waterDuration[i];

            for (int j = 0; j < landStartTime.length; j++) {
                int landStart = Math.max(waterFinish, landStartTime[j]);
                int totalFinish = landStart + landDuration[j];

                answer = Math.min(answer, totalFinish);
            }
        }

        return answer;
    }
}
```

### Python
```python
class Solution:
    def earliestFinishTime(
        self,
        landStartTime: list[int],
        landDuration: list[int],
        waterStartTime: list[int],
        waterDuration: list[int],
    ) -> int:
        answer = float('inf')

        # Land ride first, then Water ride
        for ls, ld in zip(landStartTime, landDuration):
            landFinish = ls + ld
            for ws, wd in zip(waterStartTime, waterDuration):
                waterStart = max(landFinish, ws)
                totalFinish = waterStart + wd
                answer = min(answer, totalFinish)

        # Water ride first, then Land ride
        for ws, wd in zip(waterStartTime, waterDuration):
            waterFinish = ws + wd
            for ls, ld in zip(landStartTime, landDuration):
                landStart = max(waterFinish, ls)
                totalFinish = landStart + ld
                answer = min(answer, totalFinish)

        return int(answer)
```

### C++
```cpp
#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
public:
    int earliestFinishTime(vector<int>& landStartTime, vector<int>& landDuration, vector<int>& waterStartTime, vector<int>& waterDuration) {
        int answer = INT_MAX;

        // Land ride first, then Water ride
        for (size_t i = 0; i < landStartTime.size(); ++i) {
            int landFinish = landStartTime[i] + landDuration[i];
            for (size_t j = 0; j < waterStartTime.size(); ++j) {
                int waterStart = max(landFinish, waterStartTime[j]);
                int totalFinish = waterStart + waterDuration[j];
                answer = min(answer, totalFinish);
            }
        }

        // Water ride first, then Land ride
        for (size_t i = 0; i < waterStartTime.size(); ++i) {
            int waterFinish = waterStartTime[i] + waterDuration[i];
            for (size_t j = 0; j < landStartTime.size(); ++j) {
                int landStart = max(waterFinish, landStartTime[j]);
                int totalFinish = landStart + landDuration[j];
                answer = min(answer, totalFinish);
            }
        }

        return answer;
    }
};
```

### JavaScript
```javascript
/**
 * @param {number[]} landStartTime
 * @param {number[]} landDuration
 * @param {number[]} waterStartTime
 * @param {number[]} waterDuration
 * @return {number}
 */
var earliestFinishTime = function(landStartTime, landDuration, waterStartTime, waterDuration) {
    let answer = Infinity;

    // Land ride first, then Water ride
    for (let i = 0; i < landStartTime.length; i++) {
        const landFinish = landStartTime[i] + landDuration[i];
        for (let j = 0; j < waterStartTime.length; j++) {
            const waterStart = Math.max(landFinish, waterStartTime[j]);
            const totalFinish = waterStart + waterDuration[j];
            answer = Math.min(answer, totalFinish);
        }
    }

    // Water ride first, then Land ride
    for (let i = 0; i < waterStartTime.length; i++) {
        const waterFinish = waterStartTime[i] + waterDuration[i];
        for (let j = 0; j < landStartTime.length; j++) {
            const landStart = Math.max(waterFinish, landStartTime[j]);
            const totalFinish = landStart + landDuration[j];
            answer = Math.min(answer, totalFinish);
        }
    }

    return answer;
};
```
