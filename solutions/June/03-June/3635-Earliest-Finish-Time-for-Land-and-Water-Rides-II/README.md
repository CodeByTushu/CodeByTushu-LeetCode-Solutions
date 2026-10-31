# LeetCode 3635: Earliest Finish Time for Land and Water Rides II

- **Publication Date:** 03 June 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/earliest-finish-time-for-land-and-water-rides-ii/](https://leetcode.com/problems/earliest-finish-time-for-land-and-water-rides-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/syRdhF0DdvI?si=2KpngkVoZ_3yoBAS)

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

Return the **earliest possible time** at which the tourist can finish both rides under large input constraints ($N, M \le 10^5$).

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
  - The earliest finish time across all combinations is $\min(9, 10) = 9$.

#### Example 2:
- **Input:** `landStartTime = [5]`, `landDuration = [3]`, `waterStartTime = [1]`, `waterDuration = [10]`
- **Output:** `14`
- **Explanation:**
  - Water ride $0$ finishes at $1 + 10 = 11$. Land ride $0$ then starts at $\max(11, 5) = 11$, finishing at $11 + 3 = 14$.

---

### Constraints

- $1 \le \text{landStartTime.length} = \text{landDuration.length} \le 10^5$
- $1 \le \text{waterStartTime.length} = \text{waterDuration.length} \le 10^5$
- $1 \le \text{landStartTime}[i], \text{landDuration}[i] \le 10^9$
- $1 \le \text{waterStartTime}[j], \text{waterDuration}[j] \le 10^9$

---

## Algorithmic Approach

### 1. Two Orderings
We evaluate both order sequences:
- **Land ride first $\rightarrow$ Water ride second**
- **Water ride first $\rightarrow$ Land ride second**

The optimal answer is $\min(\text{ans}_1, \text{ans}_2)$. Both directions can be handled by a generic helper function `solve(firstStart, firstDur, secondStart, secondDur)`.

### 2. Optimizing the Second Ride Selection
Suppose a first ride finishes at time $t = \text{firstStart}[i] + \text{firstDur}[i]$. For any second ride $j$, its completion time is:
$$\text{finish} = \max(t, \text{secondStart}[j]) + \text{secondDur}[j]$$

We divide the second rides based on whether $\text{secondStart}[j] \ge t$ or $\text{secondStart}[j] < t$:
1. **Case 1 ($\text{secondStart}[j] \ge t$):**
   - The tourist finishes the first ride before the second ride opens, so they must wait until $\text{secondStart}[j]$.
   - The finish time is $\text{secondStart}[j] + \text{secondDur}[j]$.
   - To minimize this over all rides with start $\ge t$, we precompute a **suffix minimum** of $(\text{secondStart}[j] + \text{secondDur}[j])$ on the sorted list of second rides.
2. **Case 2 ($\text{secondStart}[j] < t$):**
   - The second ride is already open when the first ride finishes at time $t$, so the tourist boards immediately.
   - The finish time is $t + \text{secondDur}[j]$.
   - To minimize this, we simply pick the ride with the smallest $\text{secondDur}[j]$ among those starting $< t$, which is maintained using a **prefix minimum** of durations.

### 3. Binary Search
By sorting the second rides by start time, we find the dividing index using **binary search** (`lowerBound`) in $\mathcal{O}(\log M)$ time for each first ride.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}((N + M) \log(\max(N, M)))$ | Sorting the second rides takes $\mathcal{O}(M \log M)$ (and $\mathcal{O}(N \log N)$ in the reverse order). For each of the $N$ candidate first rides, binary search takes $\mathcal{O}(\log M)$. Prefix and suffix table creation takes linear $\mathcal{O}(M)$ time. Well within the 1-second limit for $10^5$ items. |
| **Auxiliary Space** | $\mathcal{O}(N + M)$ | Storing sorted ride pairs, prefix minimums, and suffix minimums requires linear auxiliary space. |

---

## Multi-Language Implementations

### Java
```java
import java.util.Arrays;

class Solution {

    public int earliestFinishTime(int[] landStartTime, int[] landDuration,
                                  int[] waterStartTime, int[] waterDuration) {

        int ans1 = solve(landStartTime, landDuration,
                         waterStartTime, waterDuration);

        int ans2 = solve(waterStartTime, waterDuration,
                         landStartTime, landDuration);

        return Math.min(ans1, ans2);
    }

    private int solve(int[] firstStart, int[] firstDur,
                      int[] secondStart, int[] secondDur) {

        int m = secondStart.length;

        int[][] rides = new int[m][2];
        for (int i = 0; i < m; i++) {
            rides[i][0] = secondStart[i];
            rides[i][1] = secondDur[i];
        }

        Arrays.sort(rides, (a, b) -> Integer.compare(a[0], b[0]));

        int[] starts = new int[m];
        int[] prefixMinDur = new int[m];
        int[] suffixMinOpenFinish = new int[m];

        for (int i = 0; i < m; i++) {
            starts[i] = rides[i][0];
        }

        prefixMinDur[0] = rides[0][1];
        for (int i = 1; i < m; i++) {
            prefixMinDur[i] = Math.min(prefixMinDur[i - 1], rides[i][1]);
        }

        suffixMinOpenFinish[m - 1] = rides[m - 1][0] + rides[m - 1][1];
        for (int i = m - 2; i >= 0; i--) {
            suffixMinOpenFinish[i] = Math.min(
                suffixMinOpenFinish[i + 1],
                rides[i][0] + rides[i][1]
            );
        }

        int ans = Integer.MAX_VALUE;

        for (int i = 0; i < firstStart.length; i++) {

            int t = firstStart[i] + firstDur[i];

            int idx = lowerBound(starts, t);

            int best = Integer.MAX_VALUE;

            // rides with start >= t
            if (idx < m) {
                best = Math.min(best, suffixMinOpenFinish[idx]);
            }

            // rides with start < t
            if (idx > 0) {
                best = Math.min(best, t + prefixMinDur[idx - 1]);
            }

            ans = Math.min(ans, best);
        }

        return ans;
    }

    private int lowerBound(int[] arr, int target) {
        int l = 0, r = arr.length;

        while (l < r) {
            int mid = l + (r - l) / 2;

            if (arr[mid] < target) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }

        return l;
    }
}
```

### Python
```python
import bisect

class Solution:
    def earliestFinishTime(
        self,
        landStartTime: list[int],
        landDuration: list[int],
        waterStartTime: list[int],
        waterDuration: list[int],
    ) -> int:
        def solve(
            firstStart: list[int],
            firstDur: list[int],
            secondStart: list[int],
            secondDur: list[int],
        ) -> int:
            m = len(secondStart)
            rides = sorted(zip(secondStart, secondDur), key=lambda x: x[0])
            starts = [r[0] for r in rides]

            prefixMinDur = [0] * m
            prefixMinDur[0] = rides[0][1]
            for i in range(1, m):
                prefixMinDur[i] = min(prefixMinDur[i - 1], rides[i][1])

            suffixMinOpenFinish = [0] * m
            suffixMinOpenFinish[m - 1] = rides[m - 1][0] + rides[m - 1][1]
            for i in range(m - 2, -1, -1):
                suffixMinOpenFinish[i] = min(
                    suffixMinOpenFinish[i + 1],
                    rides[i][0] + rides[i][1],
                )

            ans = float('inf')
            for fs, fd in zip(firstStart, firstDur):
                t = fs + fd
                idx = bisect.bisect_left(starts, t)
                best = float('inf')

                # rides with start >= t
                if idx < m:
                    best = min(best, suffixMinOpenFinish[idx])

                # rides with start < t
                if idx > 0:
                    best = min(best, t + prefixMinDur[idx - 1])

                ans = min(ans, best)

            return int(ans)

        ans1 = solve(landStartTime, landDuration, waterStartTime, waterDuration)
        ans2 = solve(waterStartTime, waterDuration, landStartTime, landDuration)
        return min(ans1, ans2)
```

### C++
```cpp
#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
public:
    int earliestFinishTime(vector<int>& landStartTime, vector<int>& landDuration,
                           vector<int>& waterStartTime, vector<int>& waterDuration) {
        int ans1 = solve(landStartTime, landDuration, waterStartTime, waterDuration);
        int ans2 = solve(waterStartTime, waterDuration, landStartTime, landDuration);
        return min(ans1, ans2);
    }

private:
    int solve(const vector<int>& firstStart, const vector<int>& firstDur,
              const vector<int>& secondStart, const vector<int>& secondDur) {
        int m = secondStart.size();
        vector<pair<int, int>> rides(m);
        for (int i = 0; i < m; ++i) {
            rides[i] = {secondStart[i], secondDur[i]};
        }

        sort(rides.begin(), rides.end(), [](const pair<int, int>& a, const pair<int, int>& b) {
            return a.first < b.first;
        });

        vector<int> starts(m);
        vector<int> prefixMinDur(m);
        vector<int> suffixMinOpenFinish(m);

        for (int i = 0; i < m; ++i) {
            starts[i] = rides[i].first;
        }

        prefixMinDur[0] = rides[0].second;
        for (int i = 1; i < m; ++i) {
            prefixMinDur[i] = min(prefixMinDur[i - 1], rides[i].second);
        }

        suffixMinOpenFinish[m - 1] = rides[m - 1].first + rides[m - 1].second;
        for (int i = m - 2; i >= 0; --i) {
            suffixMinOpenFinish[i] = min(suffixMinOpenFinish[i + 1], rides[i].first + rides[i].second);
        }

        int ans = INT_MAX;

        for (size_t i = 0; i < firstStart.size(); ++i) {
            int t = firstStart[i] + firstDur[i];
            int idx = lower_bound(starts.begin(), starts.end(), t) - starts.begin();

            int best = INT_MAX;

            // rides with start >= t
            if (idx < m) {
                best = min(best, suffixMinOpenFinish[idx]);
            }

            // rides with start < t
            if (idx > 0) {
                best = min(best, t + prefixMinDur[idx - 1]);
            }

            ans = min(ans, best);
        }

        return ans;
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
    function solve(firstStart, firstDur, secondStart, secondDur) {
        const m = secondStart.length;
        const rides = [];
        for (let i = 0; i < m; i++) {
            rides.push([secondStart[i], secondDur[i]]);
        }

        rides.sort((a, b) => a[0] - b[0]);

        const starts = new Int32Array(m);
        const prefixMinDur = new Int32Array(m);
        const suffixMinOpenFinish = new Int32Array(m);

        for (let i = 0; i < m; i++) {
            starts[i] = rides[i][0];
        }

        prefixMinDur[0] = rides[0][1];
        for (let i = 1; i < m; i++) {
            prefixMinDur[i] = Math.min(prefixMinDur[i - 1], rides[i][1]);
        }

        suffixMinOpenFinish[m - 1] = rides[m - 1][0] + rides[m - 1][1];
        for (let i = m - 2; i >= 0; i--) {
            suffixMinOpenFinish[i] = Math.min(
                suffixMinOpenFinish[i + 1],
                rides[i][0] + rides[i][1]
            );
        }

        function lowerBound(arr, target) {
            let l = 0, r = arr.length;
            while (l < r) {
                const mid = (l + r) >> 1;
                if (arr[mid] < target) {
                    l = mid + 1;
                } else {
                    r = mid;
                }
            }
            return l;
        }

        let ans = Infinity;

        for (let i = 0; i < firstStart.length; i++) {
            const t = firstStart[i] + firstDur[i];
            const idx = lowerBound(starts, t);

            let best = Infinity;

            // rides with start >= t
            if (idx < m) {
                best = Math.min(best, suffixMinOpenFinish[idx]);
            }

            // rides with start < t
            if (idx > 0) {
                best = Math.min(best, t + prefixMinDur[idx - 1]);
            }

            ans = Math.min(ans, best);
        }

        return ans;
    }

    const ans1 = solve(landStartTime, landDuration, waterStartTime, waterDuration);
    const ans2 = solve(waterStartTime, waterDuration, landStartTime, landDuration);

    return Math.min(ans1, ans2);
};
```
