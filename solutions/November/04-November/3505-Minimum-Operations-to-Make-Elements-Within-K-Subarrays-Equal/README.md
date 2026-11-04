# LeetCode 3505: Minimum Operations to Make Elements Within K Subarrays Equal

- **Publication Date:** 04 November 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/minimum-operations-to-make-elements-within-k-subarrays-equal/](https://leetcode.com/problems/minimum-operations-to-make-elements-within-k-subarrays-equal/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/E5c6Xpy7Zic?si=ayg-5Dri9BumKGop)

---

## 💡 Problem Summary

You are given an integer array `nums` and two integers, `x` and `k`. You can perform the following operation any number of times (including zero):
- **Increase or decrease any element of `nums` by `1`**.

Return the **minimum number of operations** needed to have at least `k` non-overlapping subarrays of size exactly `x` in `nums`, where all elements within each subarray are equal.

---

### 🧪 Examples

#### Example 1:
- **Input:** `nums = [5,-2,1,3,7,3,6,4,-1], x = 3, k = 2`
- **Output:** `8`
- **Explanation:**
  - Use 3 operations to add 3 to `nums[1]` and use 2 operations to subtract 2 from `nums[3]`. The resulting array is `[5, 1, 1, 1, 7, 3, 6, 4, -1]`.
  - Use 1 operation to add 1 to `nums[5]` and use 2 operations to subtract 2 from `nums[6]`. The resulting array is `[5, 1, 1, 1, 7, 4, 4, 4, -1]`.
  - Now, all elements within each subarray `[1, 1, 1]` (from indices 1 to 3) and `[4, 4, 4]` (from indices 5 to 7) are equal. Since 8 total operations were used, 8 is the output.

#### Example 2:
- **Input:** `nums = [9,-2,-2,-2,1,5], x = 2, k = 2`
- **Output:** `3`
- **Explanation:**
  - Use 3 operations to subtract 3 from `nums[4]`. The resulting array is `[9, -2, -2, -2, -2, 5]`.
  - Now, all elements within each subarray `[-2, -2]` (from indices 1 to 2) and `[-2, -2]` (from indices 3 to 4) are equal. Since 3 operations were used, 3 is the output.

---

### 🔒 Constraints

- `2 <= nums.length <= 10^5`
- `-10^6 <= nums[i] <= 10^6`
- `2 <= x <= nums.length`
- `1 <= k <= 15`
- `2 <= k * x <= nums.length`

---

## 🧠 Algorithmic Approach & Key Observations

### 1. Sliding Window Median ($L_1$ Norm Minimization)
For any fixed contiguous window of size $x$, the cost to equalize all elements to an integer $M$ is given by:
$$\sum_{i} |nums[i] - M|$$
From mathematical optimization ($L_1$ norm minimization), this sum is minimized when $M$ is chosen as the **median** of the window elements.
Specifically, if elements are sorted in non-decreasing order, the optimal median is at index $k_{\text{th}} = \lfloor x / 2 \rfloor + 1$.

### 2. Dual Fenwick Tree (Binary Indexed Tree) & Binary Lifting
To efficiently calculate the median and the equalization cost for every sliding window of size $x$ in $O(\log N)$ time:
1. **Coordinate Compression:** Sort unique numbers in `nums` to map values into compact ranks $1 \dots m$, where $m \le n$.
2. **Dual Fenwick Trees:**
   - `bc` (*Bit Count*): tracks element frequency in the active sliding window of size $x$.
   - `bs` (*Bit Sum*): tracks the prefix sum of element values in the active sliding window.
3. **Binary Lifting on BIT:**
   - Querying the median rank $k_{\text{th}}$ is done in $O(\log m)$ by inspecting powers of two (`pw = LOG` down to 1), advancing when `bc[np] < rem`.
4. **Cost Evaluation:**
   - Let `sumLow` be the sum of elements $\le \text{median}$, and `sumUp` be the sum of elements $> \text{median}$.
   - The cost for the window is:
     $$\text{cost} = \text{median} \times k_{\text{th}} - \text{sumLow} + \text{sumUp} - \text{median} \times (x - k_{\text{th}})$$

### 3. Dynamic Programming for $K$ Non-overlapping Subarrays
Once `cost[i]` is computed for all valid start indices $i \in [0, n - x]$:
- Let $dp[j][i]$ represent the minimum cost to pick $j$ non-overlapping subarrays of length $x$ ending at or before index $i$.
- State Transition:
  $$dp[j][i] = \min(dp[j][i - 1], dp[j - 1][i - x] + \text{cost}[i - x])$$
- Since $k \le 15$, we optimize auxiliary memory using two rolling 1D arrays (`prev` and `cur`) of length $n + 1$.

---

## 📊 Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N \log N + K \cdot N)$
  - Coordinate compression: $\mathcal{O}(N \log N)$
  - Sliding window across $N$ elements with Fenwick updates and binary lifting: $\mathcal{O}(N \log M)$ where $M \le N$.
  - Dynamic programming state transitions: $\mathcal{O}(K \cdot N)$ with $K \le 15$.
  - Overall time complexity is optimal and beats over 97% of submissions.
- **Space Complexity:** $\mathcal{O}(N)$
  - Dual Fenwick trees: $\mathcal{O}(M)$ where $M \le N$.
  - Coordinate compression mapping and cost array: $\mathcal{O}(N)$.
  - Rolling DP state arrays: $\mathcal{O}(N)$.

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
import java.util.*;

class Solution {
    int m;
    long[] bc, bs;

    private void upd(int i, int c, long v) {
        for (; i <= m; i += i & -i) {
            bc[i] += c;
            bs[i] += v;
        }
    }

    public long minOperations(int[] nums, int x, int k) {
        int n = nums.length;

        // Coordinate compression
        int[] sorted = nums.clone();
        Arrays.sort(sorted);
        int u = 0;
        for (int i = 0; i < n; i++) {
            if (i == 0 || sorted[i] != sorted[i - 1]) sorted[u++] = sorted[i];
        }
        int[] vals = Arrays.copyOf(sorted, u);
        m = u;
        bc = new long[m + 1];
        bs = new long[m + 1];

        int[] idx = new int[n];
        for (int i = 0; i < n; i++) {
            idx[i] = Arrays.binarySearch(vals, nums[i]) + 1; // 1-indexed
        }

        int LOG = Integer.highestOneBit(m);
        long[] cost = new long[n - x + 1];
        long total = 0;

        for (int i = 0; i < n; i++) {
            upd(idx[i], 1, nums[i]);
            total += nums[i];

            if (i >= x) {
                upd(idx[i - x], -1, -nums[i - x]);
                total -= nums[i - x];
            }

            if (i >= x - 1) {
                int kth = x / 2 + 1;
                int pos = 0;
                long accSum = 0;
                int rem = kth;
                for (int pw = LOG; pw > 0; pw >>= 1) {
                    int np = pos + pw;
                    if (np <= m && bc[np] < rem) {
                        pos = np;
                        rem -= (int) bc[np];
                        accSum += bs[np];
                    }
                }
                long median = vals[pos]; // pos+1 in 1-indexed
                long sumLow = accSum + (long) rem * median;
                long sumUp = total - sumLow;

                cost[i - x + 1] = median * kth - sumLow + sumUp - median * (x - kth);
            }
        }

        long INF = Long.MAX_VALUE / 4;
        long[] prev = new long[n + 1]; // j = 0: cost 0
        for (int j = 1; j <= k; j++) {
            long[] cur = new long[n + 1];
            cur[0] = INF;
            for (int i = 1; i <= n; i++) {
                cur[i] = cur[i - 1];
                if (i >= x && prev[i - x] < INF) {
                    cur[i] = Math.min(cur[i], prev[i - x] + cost[i - x]);
                }
            }
            prev = cur;
        }

        return prev[n];
    }
}
```

### 🐍 Python (Python 3)
```python
class Solution:
    def minOperations(self, nums: list[int], x: int, k: int) -> int:
        n = len(nums)
        
        # Coordinate compression
        vals = sorted(list(set(nums)))
        m = len(vals)
        val_to_idx = {v: i + 1 for i, v in enumerate(vals)}
        idx = [val_to_idx[num] for num in nums]
        
        bc = [0] * (m + 1)
        bs = [0] * (m + 1)
        
        def upd(i: int, c: int, v: int):
            while i <= m:
                bc[i] += c
                bs[i] += v
                i += i & -i
                
        LOG = 1
        while (LOG << 1) <= m:
            LOG <<= 1
            
        cost = [0] * (n - x + 1)
        total = 0
        kth = x // 2 + 1
        
        for i in range(n):
            upd(idx[i], 1, nums[i])
            total += nums[i]
            
            if i >= x:
                upd(idx[i - x], -1, -nums[i - x])
                total -= nums[i - x]
                
            if i >= x - 1:
                pos = 0
                acc_sum = 0
                rem = kth
                pw = LOG
                while pw > 0:
                    np = pos + pw
                    if np <= m and bc[np] < rem:
                        pos = np
                        rem -= bc[np]
                        acc_sum += bs[np]
                    pw >>= 1
                    
                median = vals[pos]
                sum_low = acc_sum + rem * median
                sum_up = total - sum_low
                
                cost[i - x + 1] = median * kth - sum_low + sum_up - median * (x - kth)
                
        INF = float('inf')
        prev = [0] * (n + 1)
        for j in range(1, k + 1):
            cur = [INF] * (n + 1)
            for i in range(1, n + 1):
                cur[i] = cur[i - 1]
                if i >= x and prev[i - x] < INF:
                    cur[i] = min(cur[i], prev[i - x] + cost[i - x])
            prev = cur
            
        return prev[n]
```

### ⚡ C++ (C++20)
```cpp
#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
    int m;
    vector<long long> bc, bs;

    void upd(int i, int c, long long v) {
        for (; i <= m; i += i & -i) {
            bc[i] += c;
            bs[i] += v;
        }
    }

public:
    long long minOperations(vector<int>& nums, int x, int k) {
        int n = nums.size();

        // Coordinate compression
        vector<int> vals = nums;
        sort(vals.begin(), vals.end());
        vals.erase(unique(vals.begin(), vals.end()), vals.end());
        m = vals.size();

        bc.assign(m + 1, 0);
        bs.assign(m + 1, 0);

        vector<int> idx(n);
        for (int i = 0; i < n; i++) {
            idx[i] = lower_bound(vals.begin(), vals.end(), nums[i]) - vals.begin() + 1;
        }

        int LOG = 1;
        while ((LOG << 1) <= m) LOG <<= 1;

        vector<long long> cost(n - x + 1, 0);
        long long total = 0;
        int kth = x / 2 + 1;

        for (int i = 0; i < n; i++) {
            upd(idx[i], 1, nums[i]);
            total += nums[i];

            if (i >= x) {
                upd(idx[i - x], -1, -nums[i - x]);
                total -= nums[i - x];
            }

            if (i >= x - 1) {
                int pos = 0;
                long long accSum = 0;
                int rem = kth;
                for (int pw = LOG; pw > 0; pw >>= 1) {
                    int np = pos + pw;
                    if (np <= m && bc[np] < rem) {
                        pos = np;
                        rem -= (int)bc[np];
                        accSum += bs[np];
                    }
                }
                long long median = vals[pos];
                long long sumLow = accSum + (long long)rem * median;
                long long sumUp = total - sumLow;

                cost[i - x + 1] = median * kth - sumLow + sumUp - median * (x - kth);
            }
        }

        long long INF = LLONG_MAX / 4;
        vector<long long> prev(n + 1, 0);
        for (int j = 1; j <= k; j++) {
            vector<long long> cur(n + 1, INF);
            for (int i = 1; i <= n; i++) {
                cur[i] = cur[i - 1];
                if (i >= x && prev[i - x] < INF) {
                    cur[i] = min(cur[i], prev[i - x] + cost[i - x]);
                }
            }
            prev = cur;
        }

        return prev[n];
    }
};
```

### 🌐 JavaScript (Node.js ES2022)
```javascript
/**
 * @param {number[]} nums
 * @param {number} x
 * @param {number} k
 * @return {number}
 */
var minOperations = function(nums, x, k) {
    const n = nums.length;

    // Coordinate compression
    const sorted = [...new Set(nums)].sort((a, b) => a - b);
    const m = sorted.length;
    const valMap = new Map();
    for (let i = 0; i < m; i++) valMap.set(sorted[i], i + 1);

    const idx = new Int32Array(n);
    for (let i = 0; i < n; i++) idx[i] = valMap.get(nums[i]);

    const bc = new Float64Array(m + 1);
    const bs = new Float64Array(m + 1);

    function upd(i, c, v) {
        for (; i <= m; i += i & -i) {
            bc[i] += c;
            bs[i] += v;
        }
    }

    let LOG = 1;
    while ((LOG << 1) <= m) LOG <<= 1;

    const cost = new Float64Array(n - x + 1);
    let total = 0;
    const kth = Math.floor(x / 2) + 1;

    for (let i = 0; i < n; i++) {
        upd(idx[i], 1, nums[i]);
        total += nums[i];

        if (i >= x) {
            upd(idx[i - x], -1, -nums[i - x]);
            total -= nums[i - x];
        }

        if (i >= x - 1) {
            let pos = 0;
            let accSum = 0;
            let rem = kth;
            for (let pw = LOG; pw > 0; pw >>= 1) {
                const np = pos + pw;
                if (np <= m && bc[np] < rem) {
                    pos = np;
                    rem -= bc[np];
                    accSum += bs[np];
                }
            }

            const median = sorted[pos];
            const sumLow = accSum + rem * median;
            const sumUp = total - sumLow;

            cost[i - x + 1] = median * kth - sumLow + sumUp - median * (x - kth);
        }
    }

    const INF = Number.MAX_SAFE_INTEGER / 4;
    let prev = new Float64Array(n + 1);
    for (let j = 1; j <= k; j++) {
        const cur = new Float64Array(n + 1);
        cur[0] = INF;
        for (let i = 1; i <= n; i++) {
            cur[i] = cur[i - 1];
            if (i >= x && prev[i - x] < INF) {
                cur[i] = Math.min(cur[i], prev[i - x] + cost[i - x]);
            }
        }
        prev = cur;
    }

    return prev[n];
};
```

---

<p align="center">
  <a href="../../README.md"><strong>⬅️ Return to November Solutions</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="https://codebytushu.com/Leetcode/"><strong>🌐 Official Live Platform</strong></a>
</p>
