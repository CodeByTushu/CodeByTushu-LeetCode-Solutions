# LeetCode 1882: Process Tasks Using Servers

- **Publication Date:** 07 November 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/process-tasks-using-servers/](https://leetcode.com/problems/process-tasks-using-servers/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/3Z9Ptd85Lfw?si=P7qI8_YKO6t0t9l5)

---

## 💡 Problem Summary

You are given two 0-indexed integer arrays `servers` and `tasks` of lengths `n` and `m` respectively:
- `servers[i]` is the **weight** of the $i^{\text{th}}$ server.
- `tasks[j]` is the **time needed to process** the $j^{\text{th}}$ task in seconds.

Tasks are assigned to the servers using a task queue. Initially, all servers are free, and the queue is empty.

At second `j`, the $j^{\text{th}}$ task is inserted into the queue (starting with the $0^{\text{th}}$ task at second $0$). As long as there are free servers and the queue is not empty, the task in the front of the queue will be assigned to a free server with the **smallest weight**, and in case of a tie, it is assigned to a free server with the **smallest index**.

If there are no free servers and the queue is not empty, we wait until a server becomes free and immediately assign the next task. If multiple servers become free at the same time, then multiple tasks from the queue will be assigned in order of insertion following the weight and index priorities above.

A server that is assigned task `j` at second `t` will be free again at second `t + tasks[j]`.

Build an array `ans` of length `m`, where `ans[j]` is the index of the server the $j^{\text{th}}$ task will be assigned to.

Return the array `ans`.

---

### 🧪 Examples

#### Example 1:
- **Input:** `servers = [3,3,2], tasks = [1,2,3,2,1,2]`
- **Output:** `[2,2,0,2,1,2]`
- **Explanation:**
  - **Second 0:** Task 0 (duration 1) is added and assigned to server 2 (weight 2) until second 1.
  - **Second 1:** Server 2 becomes free. Task 1 (duration 2) is added and assigned to server 2 until second 3.
  - **Second 2:** Task 2 (duration 3) is added and assigned to server 0 (weight 3, index 0) until second 5.
  - **Second 3:** Server 2 becomes free. Task 3 (duration 2) is added and assigned to server 2 until second 5.
  - **Second 4:** Task 4 (duration 1) is added and assigned to server 1 (weight 3, index 1) until second 5.
  - **Second 5:** All servers become free. Task 5 (duration 2) is added and assigned to server 2 until second 7.

#### Example 2:
- **Input:** `servers = [5,1,4,3,2], tasks = [2,1,2,4,5,2,1]`
- **Output:** `[1,4,1,4,1,3,2]`
- **Explanation:**
  - **Second 0:** Task 0 is assigned to server 1 until second 2.
  - **Second 1:** Task 1 is assigned to server 4 until second 2.
  - **Second 2:** Servers 1 and 4 become free. Task 2 is assigned to server 1 until second 4.
  - **Second 3:** Task 3 is assigned to server 4 until second 7.
  - **Second 4:** Server 1 becomes free. Task 4 is assigned to server 1 until second 9.
  - **Second 5:** Task 5 is assigned to server 3 until second 7.
  - **Second 6:** Task 6 is assigned to server 2 until second 7.

---

### 🔒 Constraints

- `servers.length == n`
- `tasks.length == m`
- `1 <= n, m <= 2 * 10^5`
- `1 <= servers[i], tasks[j] <= 2 * 10^5`

---

## 🧠 Algorithmic Approach & Key Observations

### 1. Dual Priority Queue (Min-Heap) Architecture
To track the state of the system efficiently across hundreds of thousands of events, we categorize servers into two distinct states:
1. **Free Servers (`free` Min-Heap):**
   - Stores pairs `(weight, index)`.
   - Priority order: Lowest `weight` first; upon ties, lowest `index` first.
2. **Busy Servers (`busy` Min-Heap):**
   - Stores tuples `(freeTime, weight, index)`.
   - Priority order: Earliest completion time `freeTime` first; ties broken by `weight`, then `index`.

### 2. Time Progression & Fast-Forwarding
- At task index $j$, the task arrives at second $j$. Hence, the current simulation clock must be at least $j$:
  $$t = \max(t, j)$$
- **Server Releases:** First, pop all servers from `busy` whose $\text{freeTime} \le t$ and push them back into `free`.
- **Fast-Forwarding (Crucial Optimization):** If all servers are currently busy (`free` is empty), incrementing time second-by-second would result in Time Limit Exceeded (TLE) because task completion times can jump far into the future (e.g., $t + 2 \cdot 10^5$). Instead, we immediately jump $t$ forward to the earliest completion time:
  $$t = \text{busy.peek().freeTime}$$
  We then release all servers becoming available at this new timestamp $t$.

### 3. Task Assignment
- Pop the top server from `free` (guaranteed lowest weight and index).
- Record its index in `ans[j]`.
- Re-insert this server into `busy` with new finish time:
  $$\text{newFreeTime} = t + \text{tasks}[j]$$

---

## ⏱️ Complexity Analysis

| Metric | Complexity | Description |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}((N + M) \log N)$ | Initializing $N$ servers in `free` takes $\mathcal{O}(N \log N)$ (or $\mathcal{O}(N)$ with heapify). Each of the $M$ tasks involves at most one push/pop into `free` and `busy`, each costing $\mathcal{O}(\log N)$. Fast-forwarding peeks take $\mathcal{O}(1)$. |
| **Auxiliary Space** | $\mathcal{O}(N + M)$ | `free` and `busy` together hold exactly $N$ server entries at any given point ($\le N$). The output array `ans` requires $\mathcal{O}(M)$ space. |

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
import java.util.*;

class Solution {
    public int[] assignTasks(int[] servers, int[] tasks) {
        int n = servers.length, m = tasks.length;

        // free: {weight, index}
        PriorityQueue<int[]> free = new PriorityQueue<>((a, b) ->
            a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(a[1], b[1]));
        // busy: {freeTime, weight, index}
        PriorityQueue<long[]> busy = new PriorityQueue<>((a, b) -> {
            if (a[0] != b[0]) return Long.compare(a[0], b[0]);
            if (a[1] != b[1]) return Long.compare(a[1], b[1]);
            return Long.compare(a[2], b[2]);
        });

        for (int i = 0; i < n; i++) {
            free.offer(new int[]{servers[i], i});
        }

        int[] ans = new int[m];
        long t = 0;

        for (int j = 0; j < m; j++) {
            t = Math.max(t, j);

            // Release servers that are free by time t
            while (!busy.isEmpty() && busy.peek()[0] <= t) {
                long[] s = busy.poll();
                free.offer(new int[]{(int) s[1], (int) s[2]});
            }

            // No free server: jump to the earliest free time
            if (free.isEmpty()) {
                t = busy.peek()[0];
                while (!busy.isEmpty() && busy.peek()[0] <= t) {
                    long[] s = busy.poll();
                    free.offer(new int[]{(int) s[1], (int) s[2]});
                }
            }

            int[] best = free.poll();
            ans[j] = best[1];
            busy.offer(new long[]{t + tasks[j], best[0], best[1]});
        }

        return ans;
    }
}
```

### 🐍 Python (Python 3)
```python
from typing import List
import heapq

class Solution:
    def assignTasks(self, servers: List[int], tasks: List[int]) -> List[int]:
        n = len(servers)
        m = len(tasks)
        
        # free heap: (weight, index)
        free = [(servers[i], i) for i in range(n)]
        heapq.heapify(free)
        
        # busy heap: (free_time, weight, index)
        busy = []
        
        ans = [0] * m
        t = 0
        
        for j in range(m):
            t = max(t, j)
            
            # Release servers that are free by time t
            while busy and busy[0][0] <= t:
                free_time, weight, idx = heapq.heappop(busy)
                heapq.heappush(free, (weight, idx))
                
            # No free server: jump to the earliest free time
            if not free:
                t = busy[0][0]
                while busy and busy[0][0] <= t:
                    free_time, weight, idx = heapq.heappop(busy)
                    heapq.heappush(free, (weight, idx))
                    
            weight, idx = heapq.heappop(free)
            ans[j] = idx
            heapq.heappush(busy, (t + tasks[j], weight, idx))
            
        return ans
```

### ⚡ C++ (C++20)
```cpp
#include <vector>
#include <queue>
#include <tuple>
#include <algorithm>

using namespace std;

class Solution {
public:
    vector<int> assignTasks(vector<int>& servers, vector<int>& tasks) {
        int n = servers.size(), m = tasks.size();

        // free: (weight, index)
        using FreeServer = pair<int, int>;
        priority_queue<FreeServer, vector<FreeServer>, greater<FreeServer>> free;

        // busy: (freeTime, weight, index)
        using BusyServer = tuple<long long, int, int>;
        priority_queue<BusyServer, vector<BusyServer>, greater<BusyServer>> busy;

        for (int i = 0; i < n; i++) {
            free.emplace(servers[i], i);
        }

        vector<int> ans(m);
        long long t = 0;

        for (int j = 0; j < m; j++) {
            t = max(t, (long long)j);

            // Release servers that are free by time t
            while (!busy.empty() && get<0>(busy.top()) <= t) {
                auto [freeTime, weight, idx] = busy.top();
                busy.pop();
                free.emplace(weight, idx);
            }

            // No free server: jump to the earliest free time
            if (free.empty()) {
                t = get<0>(busy.top());
                while (!busy.empty() && get<0>(busy.top()) <= t) {
                    auto [freeTime, weight, idx] = busy.top();
                    busy.pop();
                    free.emplace(weight, idx);
                }
            }

            auto [bestWeight, bestIdx] = free.top();
            free.pop();
            ans[j] = bestIdx;
            busy.emplace(t + tasks[j], bestWeight, bestIdx);
        }

        return ans;
    }
};
```

### 🌐 JavaScript (Node.js ES2022)
```javascript
class MinHeap {
    constructor(compare) {
        this.heap = [];
        this.compare = compare;
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    peek() {
        return this.heap[0];
    }

    push(val) {
        this.heap.push(val);
        this._siftUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        const top = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this._siftDown(0);
        }
        return top;
    }

    _siftUp(idx) {
        while (idx > 0) {
            const parent = (idx - 1) >> 1;
            if (this.compare(this.heap[idx], this.heap[parent]) < 0) {
                [this.heap[idx], this.heap[parent]] = [this.heap[parent], this.heap[idx]];
                idx = parent;
            } else {
                break;
            }
        }
    }

    _siftDown(idx) {
        const len = this.heap.length;
        while (true) {
            let smallest = idx;
            const left = (idx << 1) + 1;
            const right = left + 1;

            if (left < len && this.compare(this.heap[left], this.heap[smallest]) < 0) {
                smallest = left;
            }
            if (right < len && this.compare(this.heap[right], this.heap[smallest]) < 0) {
                smallest = right;
            }
            if (smallest !== idx) {
                [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
                idx = smallest;
            } else {
                break;
            }
        }
    }
}

/**
 * @param {number[]} servers
 * @param {number[]} tasks
 * @return {number[]}
 */
var assignTasks = function(servers, tasks) {
    const n = servers.length;
    const m = tasks.length;

    // free: [weight, index]
    const free = new MinHeap((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return a[1] - b[1];
    });

    // busy: [freeTime, weight, index]
    const busy = new MinHeap((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        if (a[1] !== b[1]) return a[1] - b[1];
        return a[2] - b[2];
    });

    for (let i = 0; i < n; i++) {
        free.push([servers[i], i]);
    }

    const ans = new Int32Array(m);
    let t = 0;

    for (let j = 0; j < m; j++) {
        t = Math.max(t, j);

        // Release servers that are free by time t
        while (!busy.isEmpty() && busy.peek()[0] <= t) {
            const s = busy.pop();
            free.push([s[1], s[2]]);
        }

        // No free server: jump to the earliest free time
        if (free.isEmpty()) {
            t = busy.peek()[0];
            while (!busy.isEmpty() && busy.peek()[0] <= t) {
                const s = busy.pop();
                free.push([s[1], s[2]]);
            }
        }

        const best = free.pop();
        ans[j] = best[1];
        busy.push([t + tasks[j], best[0], best[1]]);
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
