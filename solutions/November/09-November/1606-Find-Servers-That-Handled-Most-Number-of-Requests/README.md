# LeetCode 1606: Find Servers That Handled Most Number of Requests

- **Publication Date:** 09 November 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/find-servers-that-handled-most-number-of-requests/](https://leetcode.com/problems/find-servers-that-handled-most-number-of-requests/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/q-VCRrxXHfE)

---

## 💡 Problem Summary

You have `k` servers numbered from `0` to `k - 1` that are being used to handle multiple requests simultaneously. Each server has infinite computational capacity but **cannot handle more than one request at a time**. The requests are assigned to servers according to a specific algorithm:

- The $i^{\text{th}}$ (0-indexed) request arrives.
- If all servers are busy, the request is **dropped** (not handled at all).
- If the $(i \bmod k)^{\text{th}}$ server is available, assign the request to that server.
- Otherwise, assign the request to the **next available server** (wrapping around the list of servers and starting from `0` if necessary). For example, if the $i^{\text{th}}$ server is busy, try to assign the request to the $(i + 1)^{\text{th}}$ server, then the $(i + 2)^{\text{th}}$ server, and so on.

You are given a **strictly increasing** array `arrival` of positive integers, where `arrival[i]` represents the arrival time of the $i^{\text{th}}$ request, and another array `load`, where `load[i]` represents the load of the $i^{\text{th}}$ request (the time it takes to complete).

Your goal is to find the **busiest server(s)**. A server is considered busiest if it handled the most number of requests successfully among all the servers. Return a list containing the IDs (0-indexed) of the busiest server(s) in any order.

---

### 🧪 Examples

#### Example 1:
- **Input:** `k = 3, arrival = [1,2,3,4,5], load = [5,2,3,3,3]`
- **Output:** `[1]`
- **Explanation:**
  - Request 0 arrives at time 1 and is assigned to server 0 (busy until time 6).
  - Request 1 arrives at time 2 and is assigned to server 1 (busy until time 4).
  - Request 2 arrives at time 3 and is assigned to server 2 (busy until time 6).
  - Request 3 arrives at time 4. Server 0 is busy, but server 1 is now free. Assigned to server 1 (busy until time 7).
  - Request 4 arrives at time 5. All servers are busy, so request 4 is dropped.
  - Server 0 handled 1 request, server 1 handled 2 requests, server 2 handled 1 request. Server 1 is the busiest.

#### Example 2:
- **Input:** `k = 3, arrival = [1,2,3,4], load = [1,2,1,2]`
- **Output:** `[0]`
- **Explanation:**
  - The first 3 requests are handled by servers 0, 1, and 2.
  - Request 3 arrives at time 4. Server 0 finished at time 2 and is free. Server 0 handles request 3.
  - Server 0 handled 2 requests, while servers 1 and 2 handled 1 request each. Server 0 is the busiest.

#### Example 3:
- **Input:** `k = 3, arrival = [1,2,3], load = [10,12,11]`
- **Output:** `[0,1,2]`
- **Explanation:** Each server handles a single request, so all servers are considered the busiest.

---

### 🔒 Constraints

- $1 \le k \le 10^5$
- $1 \le \text{arrival.length}, \text{load.length} \le 10^5$
- $\text{arrival.length} == \text{load.length}$
- $1 \le \text{arrival}[i], \text{load}[i] \le 10^9$
- `arrival` is **strictly increasing**.

---

## 🧠 Algorithmic Approach & Key Observations

### 1. Dual-Structure Engine (TreeSet + Min-Heap)
Simulating $n$ requests naively by linearly scanning servers would take $\mathcal{O}(n \cdot k)$ time, which TLEs given $n, k \le 10^5$ ($10^{10}$ operations).

Instead, we maintain two core data structures:
1. **Available Servers Pool:**
   - In Java and C++, a **Self-Balancing BST** (`TreeSet<Integer>` in Java, `std::set<int>` in C++) tracks available server IDs, supporting logarithmic search and deletion in $\mathcal{O}(\log k)$ time.
   - In Python and JavaScript, where a standard BST is unavailable, we maintain **two Min-Heaps**:
     - `free_ge`: available servers with index $\ge (i \bmod k)$.
     - `free_lt`: available servers with index $< (i \bmod k)$ (wrapped pool).
2. **Busy Servers Min-Heap:**
   - A priority queue storing pairs/tuples `(completionTime, serverId)` ordered by `completionTime`.
   - When request $i$ arrives at time `arrival[i]`, any server with $\text{completionTime} \le \text{arrival}[i]$ has finished its execution and is returned to the available servers pool.

### 2. 5-Step Event-Driven Algorithm
For each incoming request $i$ with arrival time `start = arrival[i]` and duration `duration = load[i]`:
1. **Release Expired Servers:** Pop all entries from the busy heap where `completionTime <= start` and insert their IDs back into the free pool.
2. **Check Capacity:** If the free pool is empty, all servers are currently occupied; the request is dropped.
3. **Cyclic Server Selection:**
   - Search for the smallest available server ID $\ge (i \bmod k)$ using `free.ceiling(i % k)` (or `lower_bound`).
   - If no server ID satisfies this (i.e. all available servers have index $< i \bmod k$), wrap around to the first available server using `free.first()`.
4. **Dispatch & Schedule:**
   - Remove the chosen server from the free pool.
   - Increment `count[server]`.
   - Push `(start + duration, server)` into the busy min-heap.
5. **Post-Processing:**
   - Find $\max(\text{count})$.
   - Filter and collect all server IDs whose handled request count equals this maximum.

---

## ⏱️ Complexity Analysis

| Metric | Complexity | Description |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}((k + n) \log k)$ | Initializing the free set takes $\mathcal{O}(k \log k)$. For each of the $n$ requests, we perform at most one ceiling lookup and removal in $\mathcal{O}(\log k)$. Across the entire simulation, each server enters and leaves the busy heap at most once per processed request, taking $\mathcal{O}(\log k)$ amortized time. Finding the maximum takes $\mathcal{O}(k)$. With $n, k \le 10^5$, this requires $\approx 3.3 \times 10^6$ operations, executing in $\approx 129$ ms. |
| **Auxiliary Space** | $\mathcal{O}(k)$ | The request counter array takes $\mathcal{O}(k)$ space. The free set and busy priority queue partition the $k$ servers such that $|\text{free}| + |\text{busy}| \le k$ at all times. Memory consumption is strictly $\mathcal{O}(k)$, completely independent of $n$. |

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
import java.util.*;

class Solution {
    public List<Integer> busiestServers(int k, int[] arrival, int[] load) {
        int[] count = new int[k];

        // Self-balancing BST to track currently available server IDs
        TreeSet<Integer> free = new TreeSet<>();
        for (int i = 0; i < k; i++) free.add(i);

        // Min-heap tracking busy servers: {completionTime, serverId}
        PriorityQueue<long[]> busy = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));

        for (int i = 0; i < arrival.length; i++) {
            long start = arrival[i];

            // Free all servers that have finished before or at current arrival time
            while (!busy.isEmpty() && busy.peek()[0] <= start) {
                free.add((int) busy.poll()[1]);
            }

            // If all servers are occupied, request is dropped
            if (free.isEmpty()) continue;

            // Cyclic lookup: find smallest available server >= (i % k), wrapping to first()
            Integer server = free.ceiling(i % k);
            if (server == null) server = free.first();

            free.remove(server);
            count[server]++;
            busy.offer(new long[]{start + load[i], server});
        }

        // Find the maximum number of requests handled
        int max = 0;
        for (int c : count) max = Math.max(max, c);

        // Collect all server IDs achieving the maximum request count
        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < k; i++) {
            if (count[i] == max) result.add(i);
        }
        return result;
    }
}
```

### 🐍 Python (Python 3)
```python
import heapq


class Solution:
    def busiestServers(self, k: int, arrival: list[int], load: list[int]) -> list[int]:
        count = [0] * k
        free_ge = list(range(k))  # Available servers with ID >= (i % k)
        free_lt = []  # Available servers with ID < (i % k)
        busy = []  # Min-heap of (completion_timestamp, server_id)

        for i, (start, duration) in enumerate(zip(arrival, load)):
            target = i % k

            # When request index modulo resets to 0, flush wrapped servers back
            if target == 0:
                while free_lt:
                    heapq.heappush(free_ge, heapq.heappop(free_lt))

            # Release all servers whose task finishes on or before the current start time
            while busy and busy[0][0] <= start:
                _, s = heapq.heappop(busy)
                if s >= target:
                    heapq.heappush(free_ge, s)
                else:
                    heapq.heappush(free_lt, s)

            # Rebalance servers whose ID is strictly less than target
            while free_ge and free_ge[0] < target:
                heapq.heappush(free_lt, heapq.heappop(free_ge))

            # Pick the lowest available server >= target, or wrap around
            if free_ge:
                server = heapq.heappop(free_ge)
            elif free_lt:
                server = heapq.heappop(free_lt)
            else:
                continue  # All k servers busy -> request is dropped

            count[server] += 1
            heapq.heappush(busy, (start + duration, server))

        max_req = max(count)
        return [idx for idx, c in enumerate(count) if c == max_req]
```

### ⚡ C++ (C++20)
```cpp
#include <vector>
#include <set>
#include <queue>
#include <algorithm>

class Solution {
public:
    std::vector<int> busiestServers(int k, std::vector<int>& arrival, std::vector<int>& load) {
        std::vector<int> count(k, 0);

        // Balanced BST of available server indices (supports lower_bound in O(log k))
        std::set<int> free;
        for (int i = 0; i < k; ++i) {
            free.insert(i);
        }

        // Min-heap tracking busy servers: {completionTime, serverId}
        std::priority_queue<std::pair<long long, int>, 
                            std::vector<std::pair<long long, int>>, 
                            std::greater<std::pair<long long, int>>> busy;

        for (int i = 0; i < arrival.size(); ++i) {
            long long start = arrival[i];

            // Free all servers that have finished before or at current arrival time
            while (!busy.empty() && busy.top().first <= start) {
                free.insert(busy.top().second);
                busy.pop();
            }

            if (free.empty()) continue; // All servers busy -> request dropped

            // Find smallest server index >= (i % k), wrapping to begin() if needed
            auto it = free.lower_bound(i % k);
            if (it == free.end()) {
                it = free.begin();
            }

            int server = *it;
            free.erase(it);
            count[server]++;
            busy.push({start + load[i], server});
        }

        int max_val = *std::max_element(count.begin(), count.end());
        std::vector<int> result;
        for (int i = 0; i < k; ++i) {
            if (count[i] == max_val) {
                result.push_back(i);
            }
        }
        return result;
    }
};
```

### 🌐 JavaScript (Node.js ES2022)
```javascript
/**
 * MinHeap implementation for PriorityQueue operations
 */
class MinHeap {
    constructor(comparator = (a, b) => a - b) {
        this.heap = [];
        this.comp = comparator;
    }
    size() { return this.heap.length; }
    peek() { return this.heap[0]; }
    push(val) {
        this.heap.push(val);
        this._siftUp(this.heap.length - 1);
    }
    pop() {
        if (this.size() === 0) return null;
        const top = this.heap[0];
        const last = this.heap.pop();
        if (this.size() > 0) {
            this.heap[0] = last;
            this._siftDown(0);
        }
        return top;
    }
    _siftUp(i) {
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (this.comp(this.heap[i], this.heap[p]) < 0) {
                [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
                i = p;
            } else break;
        }
    }
    _siftDown(i) {
        const n = this.heap.length;
        while ((i << 1) + 1 < n) {
            let left = (i << 1) + 1;
            let right = left + 1;
            let best = i;
            if (this.comp(this.heap[left], this.heap[best]) < 0) best = left;
            if (right < n && this.comp(this.heap[right], this.heap[best]) < 0) best = right;
            if (best !== i) {
                [this.heap[i], this.heap[best]] = [this.heap[best], this.heap[i]];
                i = best;
            } else break;
        }
    }
}

/**
 * @param {number} k
 * @param {number[]} arrival
 * @param {number[]} load
 * @return {number[]}
 */
var busiestServers = function(k, arrival, load) {
    const count = new Array(k).fill(0);
    const freeGe = new MinHeap(); // Available servers with ID >= (i % k)
    for (let i = 0; i < k; i++) freeGe.push(i);
    const freeLt = new MinHeap(); // Available servers with ID < (i % k)
    const busy = new MinHeap((a, b) => a[0] - b[0]); // [completionTime, serverId]

    for (let i = 0; i < arrival.length; i++) {
        const start = arrival[i];
        const duration = load[i];
        const target = i % k;

        // Wrap around when target resets to 0
        if (target === 0) {
            while (freeLt.size() > 0) freeGe.push(freeLt.pop());
        }

        // Release servers that finish at or before current request's arrival
        while (busy.size() > 0 && busy.peek()[0] <= start) {
            const [, s] = busy.pop();
            if (s >= target) freeGe.push(s);
            else freeLt.push(s);
        }

        // Move servers with ID < target to the wrapped pool
        while (freeGe.size() > 0 && freeGe.peek() < target) {
            freeLt.push(freeGe.pop());
        }

        // Assign request to the next available server >= target or wrap around
        let server = null;
        if (freeGe.size() > 0) {
            server = freeGe.pop();
        } else if (freeLt.size() > 0) {
            server = freeLt.pop();
        } else {
            continue; // All k servers busy -> request is dropped
        }

        count[server]++;
        busy.push([start + duration, server]);
    }

    let maxReq = 0;
    for (let c of count) {
        if (c > maxReq) maxReq = c;
    }

    const result = [];
    for (let i = 0; i < k; i++) {
        if (count[i] === maxReq) result.push(i);
    }
    return result;
};
```

---

<p align="center">
  <a href="../../README.md"><strong>⬅️ Return to November Solutions</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="https://codebytushu.com/Leetcode/"><strong>🌐 Official Live Platform</strong></a>
</p>
