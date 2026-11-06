# LeetCode 2747: Count Zero Request Servers

- **Publication Date:** 06 November 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/count-zero-request-servers/](https://leetcode.com/problems/count-zero-request-servers/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/pBklQPoNIEk?si=NpUFpPVj46qUlkci)

---

## 💡 Problem Summary

You are given an integer `n` denoting the total number of servers and a 2D 0-indexed integer array `logs`, where `logs[i] = [server_id, time]` denotes that the server with id `server_id` received a request at time `time`.

You are also given an integer `x` and a 0-indexed integer array `queries`.

Return a 0-indexed integer array `arr` of length `queries.length` where `arr[i]` represents the number of servers that **did not receive any requests** during the time interval `[queries[i] - x, queries[i]]`.

Note that the time intervals are inclusive.

---

### 🧪 Examples

#### Example 1:
- **Input:** `n = 3, logs = [[1,3],[2,6],[1,5]], x = 5, queries = [10,11]`
- **Output:** `[1,2]`
- **Explanation:**
  - For `queries[0] = 10`: The interval is $[10 - 5, 10] = [5, 10]$. Servers with IDs 1 and 2 received requests. Server 3 received zero requests $\implies$ `1`.
  - For `queries[1] = 11`: The interval is $[11 - 5, 11] = [6, 11]$. Only server 2 received a request in this duration. Servers 1 and 3 received zero requests $\implies$ `2`.

#### Example 2:
- **Input:** `n = 3, logs = [[2,4],[2,1],[1,2],[3,1]], x = 2, queries = [3,4]`
- **Output:** `[0,1]`
- **Explanation:**
  - For `queries[0] = 3`: The interval is $[3 - 2, 3] = [1, 3]$. Servers with IDs 1, 2, and 3 all received requests $\implies$ `0`.
  - For `queries[1] = 4`: The interval is $[4 - 2, 4] = [2, 4]$. Only servers 1 and 2 received requests. Server 3 received zero requests $\implies$ `1`.

---

### 🔒 Constraints

- `1 <= n <= 10^5`
- `1 <= logs.length <= 10^5`
- `1 <= queries.length <= 10^5`
- `logs[i].length == 2`
- `1 <= logs[i][0] <= n`
- `1 <= logs[i][1] <= 10^6`
- `1 <= x <= 10^5`
- `x < queries[i] <= 10^6`

---

## 🧠 Algorithmic Approach & Key Observations

### 1. Offline Query Processing
Each query independently requests the count of idle servers during a moving window of duration $x$:
$$\text{Window}_i = [queries[i] - x, queries[i]]$$
Instead of processing each query from scratch in $\mathcal{O}(M)$ time, we observe that as the query endpoint increases, both the left boundary $(queries[i] - x)$ and right boundary $(queries[i])$ move monotonically forward. This motivates an **offline processing** approach:
1. Sort `logs` ascending by timestamp.
2. Sort query indices based on their query timestamps, preserving their original index mapping.

### 2. Monotonic Two-Pointer Sliding Window
Using two pointers `l` and `r` over the sorted logs, we maintain an active count of unique servers:
- **Ingestion (Right Pointer `r`):** While `r < logs.length` and `logs[r][1] <= q`, we ingest `logs[r]`. If the server frequency `cnt[server]` was $0$, it transitions to active (`active++`). We then increment `cnt[server]`.
- **Eviction (Left Pointer `l`):** While `l < r` and `logs[l][1] < q - x`, we evict expired logs. We decrement `cnt[server]`. If the count drops to $0$, that server has no active requests in the current window (`active--`).
- **Answer Assignment:** The number of zero-request servers for this query is simply:
$$\text{ans}[idx] = n - \text{active}$$

Because both pointers `l` and `r` only advance forward, every log entry is ingested at most once and evicted at most once across all $Q$ queries, making the sliding window execution $\mathcal{O}(M + Q)$ amortized.

---

## 📊 Complexity Analysis

- **Time Complexity:** $\mathcal{O}(M \log M + Q \log Q)$
  - Sorting $M$ logs: $\mathcal{O}(M \log M)$
  - Sorting $Q$ queries via index order array: $\mathcal{O}(Q \log Q)$
  - Monotonic two-pointer sliding window: $\mathcal{O}(M + Q)$ linear amortized.
  - Overall time complexity is dominated by sorting, executing in 27 ms and beating 98.08% on LeetCode.
- **Space Complexity:** $\mathcal{O}(N + Q)$ auxiliary space
  - Server frequency array `cnt`: $\mathcal{O}(N)$ space.
  - Query index order and answer arrays: $\mathcal{O}(Q)$ space.

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
import java.util.*;

class Solution {
    public int[] countServers(int n, int[][] logs, int x, int[] queries) {
        // Sort logs by timestamp ascending
        Arrays.sort(logs, (a, b) -> Integer.compare(a[1], b[1]));

        int qn = queries.length;
        Integer[] order = new Integer[qn];
        for (int i = 0; i < qn; i++) order[i] = i;
        Arrays.sort(order, (a, b) -> Integer.compare(queries[a], queries[b]));

        int[] cnt = new int[n + 1];
        int[] ans = new int[qn];
        int active = 0;
        int l = 0, r = 0;
        int m = logs.length;

        for (int idx : order) {
            int q = queries[idx];

            // Ingest logs with timestamp <= q
            while (r < m && logs[r][1] <= q) {
                if (cnt[logs[r][0]]++ == 0) active++;
                r++;
            }

            // Evict expired logs with timestamp < q - x
            while (l < r && logs[l][1] < q - x) {
                if (--cnt[logs[l][0]] == 0) active--;
                l++;
            }

            ans[idx] = n - active;
        }

        return ans;
    }
}
```

### 🐍 Python (Python 3)
```python
class Solution:
    def countServers(self, n: int, logs: list[list[int]], x: int, queries: list[int]) -> list[int]:
        # Sort logs by timestamp
        logs.sort(key=lambda item: item[1])
        
        qn = len(queries)
        order = sorted(range(qn), key=lambda i: queries[i])
        
        cnt = [0] * (n + 1)
        ans = [0] * qn
        active = 0
        l = 0
        r = 0
        m = len(logs)
        
        for idx in order:
            q = queries[idx]
            
            # Add logs with time <= q
            while r < m and logs[r][1] <= q:
                server = logs[r][0]
                if cnt[server] == 0:
                    active += 1
                cnt[server] += 1
                r += 1
                
            # Remove logs with time < q - x
            while l < r and logs[l][1] < q - x:
                server = logs[l][0]
                cnt[server] -= 1
                if cnt[server] == 0:
                    active -= 1
                l += 1
                
            ans[idx] = n - active
            
        return ans
```

### ⚡ C++ (C++20)
```cpp
#include <vector>
#include <algorithm>
#include <numeric>

using namespace std;

class Solution {
public:
    vector<int> countServers(int n, vector<vector<int>>& logs, int x, vector<int>& queries) {
        // Sort logs by timestamp
        sort(logs.begin(), logs.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[1] < b[1];
        });

        int qn = queries.size();
        vector<int> order(qn);
        iota(order.begin(), order.end(), 0);
        sort(order.begin(), order.end(), [&](int a, int b) {
            return queries[a] < queries[b];
        });

        vector<int> cnt(n + 1, 0);
        vector<int> ans(qn, 0);
        int active = 0;
        int l = 0, r = 0;
        int m = logs.size();

        for (int idx : order) {
            int q = queries[idx];

            // Add logs with time <= q
            while (r < m && logs[r][1] <= q) {
                int server = logs[r][0];
                if (cnt[server]++ == 0) active++;
                r++;
            }

            // Remove logs with time < q - x
            while (l < r && logs[l][1] < q - x) {
                int server = logs[l][0];
                if (--cnt[server] == 0) active--;
                l++;
            }

            ans[idx] = n - active;
        }

        return ans;
    }
};
```

### 🌐 JavaScript (Node.js ES2022)
```javascript
/**
 * @param {number} n
 * @param {number[][]} logs
 * @param {number} x
 * @param {number[]} queries
 * @return {number[]}
 */
var countServers = function(n, logs, x, queries) {
    // Sort logs by timestamp ascending
    logs.sort((a, b) => a[1] - b[1]);

    const qn = queries.length;
    const order = Array.from({ length: qn }, (_, i) => i);
    order.sort((a, b) => queries[a] - queries[b]);

    const cnt = new Int32Array(n + 1);
    const ans = new Int32Array(qn);
    let active = 0;
    let l = 0, r = 0;
    const m = logs.length;

    for (let i = 0; i < qn; i++) {
        const idx = order[i];
        const q = queries[idx];

        // Add logs with time <= q
        while (r < m && logs[r][1] <= q) {
            const server = logs[r][0];
            if (cnt[server] === 0) active++;
            cnt[server]++;
            r++;
        }

        // Remove logs with time < q - x
        while (l < r && logs[l][1] < q - x) {
            const server = logs[l][0];
            cnt[server]--;
            if (cnt[server] === 0) active--;
            l++;
        }

        ans[idx] = n - active;
    }

    return Array.from(ans);
};
```

---

<p align="center">
  <a href="../../README.md"><strong>⬅️ Return to November Solutions</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="https://codebytushu.com/Leetcode/"><strong>🌐 Official Live Platform</strong></a>
</p>
