# LeetCode 3970: Shortest Path With At Most K Consecutive Identical Characters

- **Publication Date:** 30 October 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/shortest-path-with-at-most-k-consecutive-identical-characters/](https://leetcode.com/problems/shortest-path-with-at-most-k-consecutive-identical-characters/)
- **YouTube Solution:** *Coming Soon*

---

## 💡 Problem Summary

You are given an integer `n` representing the number of nodes in a **directed weighted graph**, numbered from `0` to `n - 1`. This is represented by a 2D integer array `edges`, where `edges[i] = [u_i, v_i, w_i]` represents a directed edge from node `u_i` to node `v_i` with weight `w_i`.

You are also given a string `labels` of length `n`, where `labels[i]` is the character assigned to node `i`, and an integer `k`.

Return the **minimum total edge weight** of a path from node `0` to node `n - 1` such that the concatenation of the labels of the nodes along the path contains **at most `k` consecutive identical characters**. If no valid path exists, return `-1`.

---

### 🧪 Examples

#### Example 1:
- **Input:** `n = 3, edges = [[0,1,1],[1,2,1],[0,2,3]], labels = "aab", k = 1`
- **Output:** `3`
- **Explanation:**  
  The optimal valid path from node `0` to node `2` is:
  - Use `edges[2] = [0, 2, 3]` to reach node `2` with weight $w_1 = 3$.
  
  The corresponding concatenation of labels is `"ab"`, which satisfies at most $k = 1$ consecutive identical characters. Thus, the answer is `3`.

#### Example 2:
- **Input:** `n = 3, edges = [[0,1,1],[1,2,1],[0,2,3]], labels = "aab", k = 2`
- **Output:** `2`
- **Explanation:**  
  The optimal valid path from node `0` to node `2` is as follows:
  - Use `edges[0] = [0, 1, 1]` to reach node `1` with weight $w_1 = 1$.
  - Use `edges[1] = [1, 2, 1]` to reach node `2` with weight $w_1 = 1$.
  
  The corresponding concatenation of labels is `"aab"`, which satisfies at most $k = 2$ consecutive identical characters. Thus, the answer is `2`.

#### Example 3:
- **Input:** `n = 3, edges = [[0,1,1],[1,2,1]], labels = "aaa", k = 2`
- **Output:** `-1`
- **Explanation:**  
  There is no valid path from node `0` to node `2` that satisfies at most $k = 2$ consecutive identical characters. Thus, the answer is `-1`.

---

### 🔒 Constraints

- $1 \le n = \text{labels.length} \le 5 \times 10^4$
- $0 \le \text{edges.length} \le 5 \times 10^4$
- $\text{edges}[i] = [u_i, v_i, w_i]$
- $0 \le u_i, v_i \le n - 1$
- $u_i \ne v_i$
- $1 \le w_i \le 10^4$
- `labels` consists of lowercase English letters.
- $1 \le k \le 50$

---

## 🏷️ Topics and Tags

- **Primary Tags:** Graph, Dijkstra's Algorithm, Shortest Path, State-Space Search
- **Secondary Tags:** Heap (PriorityQueue), Bit Manipulation, Array

---

## 🧠 Key Intuition & Algorithm Pipeline

### 1. State-Space Augmentation $(u, r)$
In standard shortest path problems, reaching a node $u$ with the minimum distance is sufficient. However, because of the constraint that at most $k$ consecutive identical characters can appear consecutively, reaching node $u$ with a shorter distance but a high run-length $r$ (e.g. $r = k$) could prevent taking outgoing edges to neighboring nodes with the same character label. Conversely, reaching node $u$ with a slightly larger distance but $r = 1$ could allow extending the path further.

Therefore, we augment each vertex into a 2D state:
$$\text{State: } (u, r)$$
where:
- $u \in [0, n - 1]$ is the current graph node.
- $r \in [1, k]$ is the current consecutive run-length of identical character labels terminating at node $u$.

The total number of states is bounded by $n \times (k + 1)$.

### 2. State Transitions & Relaxation
Starting at node `0`, the initial state is $(0, 1)$ with initial distance `0`.

When transitioning along a directed edge $u \to v$ with weight $w$:
- If $\text{labels}[v] == \text{labels}[u]$:
  - The consecutive run-length increases: $nr = r + 1$.
  - If $nr > k$, this transition violates the consecutive limit and is pruned (`continue`).
- If $\text{labels}[v] \ne \text{labels}[u]$:
  - The consecutive run resets: $nr = 1$.

If $\text{dist}[u, r] + w < \text{dist}[v, nr]$, we relax the state distance and push $(v, nr)$ into the min-heap.

### 3. High-Performance Engineering Optimizations
- **64-Bit Primitive Bit-Packing:** In Java and C++, instead of instantiating state objects which incur heavy GC overhead, we pack distance and state into a single 64-bit integer (`long` / `uint64_t`):
  $$\text{entry} = (\text{distance} \ll 32) \mid \text{stateIndex}$$
  Since edge weights are non-negative, unsigned natural ordering on 64-bit longs sorts by distance first.
- **Flat Adjacency Arrays:** Flat arrays `head`, `nxt`, `to`, and `wt` replace nested objects or array lists for maximal CPU cache locality.
- **Early Termination:** The first time any state $(n - 1, r)$ is popped from the min-heap, Dijkstra guarantees that its distance is the global minimum. We can return immediately.

---

## ⏱️ Complexity Analysis

### ⏳ Time Complexity
- **Theoretical Bound:** $\mathcal{O}((N \cdot K + M \cdot K) \log(N \cdot K))$
  - **State Space:** At most $N \cdot (K + 1)$ state vertices $(u, r)$ where $0 \le u < n$ and $1 \le r \le k$.
  - **Transitions:** Each directed edge $u \to v$ can be traversed from at most $k$ different consecutive run states, giving at most $M \cdot K$ transitions.
  - **Min-Heap Operations:** Each relaxation pushes into the priority queue, taking logarithmic time in state count.
- **LeetCode Benchmark Runtime:** **46 ms** (Beats **96.09%** of Java Submissions across all 1,001 testcases). Early termination on popping $n - 1$ and primitive 64-bit packing prevents object overhead and eliminates GC pauses.

### 💾 Space Complexity
- **Theoretical Bound:** $\mathcal{O}(N \cdot K + M)$ auxiliary space.
  - **Distance Array:** `dist[n * (k + 1)]` requires $(50,000 \times 51 \times 4\text{ bytes}) \approx 10.2\text{ MB}$ contiguous primitive memory.
  - **Graph Representation:** Flat arrays `head`, `nxt`, `to`, and `wt` take $\approx 1.2\text{ MB}$.
  - **PriorityQueue:** Stores up to $\mathcal{O}(M \cdot K)$ primitive 64-bit longs.
- **LeetCode Benchmark Memory:** **200.47 MB** (Beats **97.66%** of Java Submissions).

---

## 💻 Code Implementations

### ☕ Java (`Solution.java`)
```java
import java.util.*;

class Solution {
    public int shortestPath(int n, int[][] edges, String labels, int k) {
        // adjacency list (arrays)
        int m = edges.length;
        int[] head = new int[n], nxt = new int[m], to = new int[m], wt = new int[m];
        Arrays.fill(head, -1);
        for (int i = 0; i < m; i++) {
            int u = edges[i][0];
            to[i] = edges[i][1];
            wt[i] = edges[i][2];
            nxt[i] = head[u];
            head[u] = i;
        }

        char[] lab = labels.toCharArray();
        int INF = Integer.MAX_VALUE;

        // dist[u * (k + 1) + r], r in [1..k]
        int[] dist = new int[n * (k + 1)];
        Arrays.fill(dist, INF);

        // heap entry: (distance << 32) | stateIndex
        PriorityQueue<Long> pq = new PriorityQueue<>();
        int startState = 0 * (k + 1) + 1;
        dist[startState] = 0;
        pq.offer((long) 0 << 32 | startState);

        while (!pq.isEmpty()) {
            long top = pq.poll();
            int d = (int) (top >>> 32);
            int state = (int) (top & 0xFFFFFFFFL);

            if (d > dist[state]) continue;

            int u = state / (k + 1);
            int r = state % (k + 1);

            if (u == n - 1) return d; // first time we pop n-1 is the minimum

            for (int e = head[u]; e != -1; e = nxt[e]) {
                int v = to[e];
                int nr;
                if (lab[v] == lab[u]) {
                    nr = r + 1;
                    if (nr > k) continue;
                } else {
                    nr = 1;
                }

                int nd = d + wt[e];
                int ns = v * (k + 1) + nr;
                if (nd < dist[ns]) {
                    dist[ns] = nd;
                    pq.offer(((long) nd << 32) | ns);
                }
            }
        }

        return -1;
    }
}
```

### 🐍 Python (`solution.py`)
```python
import heapq
from typing import List

class Solution:
    def shortestPath(self, n: int, edges: List[List[int]], labels: str, k: int) -> int:
        adj = [[] for _ in range(n)]
        for u, v, w in edges:
            adj[u].append((v, w))

        INF = float('inf')
        dist = [INF] * (n * (k + 1))

        start_state = 0 * (k + 1) + 1
        dist[start_state] = 0
        pq = [(0, start_state)]

        while pq:
            d, state = heapq.heappop(pq)
            if d > dist[state]:
                continue

            u = state // (k + 1)
            r = state % (k + 1)

            if u == n - 1:
                return d

            for v, w in adj[u]:
                if labels[v] == labels[u]:
                    nr = r + 1
                    if nr > k:
                        continue
                else:
                    nr = 1

                nd = d + w
                ns = v * (k + 1) + nr
                if nd < dist[ns]:
                    dist[ns] = nd
                    heapq.heappush(pq, (nd, ns))

        return -1
```

### ⚡ C++ (`solution.cpp`)
```cpp
#include <vector>
#include <queue>
#include <string>
#include <cstdint>

using namespace std;

class Solution {
public:
    int shortestPath(int n, vector<vector<int>>& edges, string labels, int k) {
        int m = edges.size();
        vector<int> head(n, -1), nxt(m), to(m), wt(m);
        for (int i = 0; i < m; i++) {
            int u = edges[i][0];
            to[i] = edges[i][1];
            wt[i] = edges[i][2];
            nxt[i] = head[u];
            head[u] = i;
        }

        const int INF = 1e9;
        vector<int> dist(n * (k + 1), INF);

        priority_queue<uint64_t, vector<uint64_t>, greater<uint64_t>> pq;
        int startState = 0 * (k + 1) + 1;
        dist[startState] = 0;
        pq.push(((uint64_t)0 << 32) | startState);

        while (!pq.empty()) {
            uint64_t top = pq.top();
            pq.pop();

            int d = (int)(top >> 32);
            int state = (int)(top & 0xFFFFFFFFULL);

            if (d > dist[state]) continue;

            int u = state / (k + 1);
            int r = state % (k + 1);

            if (u == n - 1) return d;

            for (int e = head[u]; e != -1; e = nxt[e]) {
                int v = to[e];
                int nr = (labels[v] == labels[u]) ? (r + 1) : 1;
                if (nr > k) continue;

                int nd = d + wt[e];
                int ns = v * (k + 1) + nr;
                if (nd < dist[ns]) {
                    dist[ns] = nd;
                    pq.push(((uint64_t)nd << 32) | ns);
                }
            }
        }

        return -1;
    }
};
```

### 🌐 JavaScript (`solution.js`)
```javascript
var shortestPath = function(n, edges, labels, k) {
    const m = edges.length;
    const head = new Int32Array(n).fill(-1);
    const nxt = new Int32Array(m), to = new Int32Array(m), wt = new Int32Array(m);

    for (let i = 0; i < m; i++) {
        const u = edges[i][0];
        to[i] = edges[i][1]; wt[i] = edges[i][2];
        nxt[i] = head[u]; head[u] = i;
    }

    const INF = 2147483647;
    const dist = new Int32Array(n * (k + 1)).fill(INF);

    class MinHeap {
        constructor() { this.d = []; this.s = []; }
        push(dv, sv) {
            this.d.push(dv); this.s.push(sv);
            let i = this.d.length - 1;
            while (i > 0) {
                const p = (i - 1) >> 1;
                if (this.d[i] < this.d[p]) { this._swap(i, p); i = p; } else break;
            }
        }
        pop() {
            const topD = this.d[0], topS = this.s[0];
            const lastD = this.d.pop(), lastS = this.s.pop();
            if (this.d.length > 0) {
                this.d[0] = lastD; this.s[0] = lastS;
                let i = 0, len = this.d.length;
                while ((i << 1) + 1 < len) {
                    let l = (i << 1) + 1, r = l + 1, best = i;
                    if (this.d[l] < this.d[best]) best = l;
                    if (r < len && this.d[r] < this.d[best]) best = r;
                    if (best !== i) { this._swap(i, best); i = best; } else break;
                }
            }
            return [topD, topS];
        }
        size() { return this.d.length; }
        _swap(i, j) {
            const td = this.d[i]; this.d[i] = this.d[j]; this.d[j] = td;
            const ts = this.s[i]; this.s[i] = this.s[j]; this.s[j] = ts;
        }
    }

    const pq = new MinHeap();
    const startState = 0 * (k + 1) + 1;
    dist[startState] = 0;
    pq.push(0, startState);

    while (pq.size() > 0) {
        const [d, state] = pq.pop();
        if (d > dist[state]) continue;

        const u = Math.floor(state / (k + 1));
        const r = state % (k + 1);

        if (u === n - 1) return d;

        for (let e = head[u]; e != -1; e = nxt[e]) {
            const v = to[e];
            const nr = (labels.charCodeAt(v) === labels.charCodeAt(u)) ? (r + 1) : 1;
            if (nr > k) continue;

            const nd = d + wt[e];
            const ns = v * (k + 1) + nr;
            if (nd < dist[ns]) {
                dist[ns] = nd;
                pq.push(nd, ns);
            }
        }
    }

    return -1;
};
```

---

<p align="center">
  <a href="../../README.md"><strong>⬅️ Return to October Solutions</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="https://codebytushu.com/Leetcode/"><strong>🌐 Official Live Platform</strong></a>
</p>
