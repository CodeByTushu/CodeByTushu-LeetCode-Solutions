# LeetCode 3620: Network Recovery Pathways

- **Publication Date:** 03 July 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/network-recovery-pathways/](https://leetcode.com/problems/network-recovery-pathways/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/hLHsId2w4sk?si=DAhHFwX3vn5i8N2y)

---

## Problem Summary

You are given a directed acyclic graph of `n` nodes numbered from `0` to `n - 1`. This is represented by a 2D array `edges` of length `m`, where `edges[i] = [u_i, v_i, cost_i]` indicates a one-way communication from node $u_i$ to node $v_i$ with a recovery cost of $\text{cost}_i$.

Some nodes may be offline. You are given a boolean array `online` where `online[i] = true` means node `i` is online. Nodes `0` and `n - 1` are always online.

A path from `0` to `n - 1` is valid if:
- All intermediate nodes on the path are online.
- The total recovery cost of all edges on the path does not exceed `k`.

For each valid path, define its **score** as the **minimum edge-cost** along that path.

Return the **maximum path score** (i.e., the largest minimum edge cost) among all valid paths. If no valid path exists, return `-1`.

---

### Examples

#### Example 1:

- **Input:** `edges = [[0,1,5],[1,3,10],[0,2,3],[2,3,4]], online = [true,true,true,true], k = 10`
- **Output:** `3`
- **Explanation:**
  - Route 1: $0 \to 1 \to 3$ with total cost $5 + 10 = 15 > k$ (invalid).
  - Route 2: $0 \to 2 \to 3$ with total cost $3 + 4 = 7 \le k$ (valid). Its score is $\min(3, 4) = 3$.
  - Therefore, the maximum path score is `3`.

#### Example 2:

- **Input:** `edges = [[0,1,7],[1,4,5],[0,2,6],[2,3,6],[3,4,2],[2,4,6]], online = [true,true,true,false,true], k = 12`
- **Output:** `6`
- **Explanation:**
  - Node 3 is offline, so any path passing through 3 is invalid ($0 \to 2 \to 3 \to 4$ is invalid).
  - Route 1: $0 \to 1 \to 4$ has total cost $7 + 5 = 12 \le k$, score is $\min(7, 5) = 5$.
  - Route 2: $0 \to 2 \to 4$ has total cost $6 + 6 = 12 \le k$, score is $\min(6, 6) = 6$.
  - Among valid routes, the maximum score is $\max(5, 6) = 6$.

---

### Constraints

- $n == \text{online.length}$
- $2 \le n \le 5 \times 10^4$
- $0 \le m == \text{edges.length} \le \min(10^5, n \times (n - 1) / 2)$
- $\text{edges}[i] = [u_i, v_i, \text{cost}_i]$
- $0 \le u_i, v_i < n$
- $u_i \ne v_i$
- $0 \le \text{cost}_i \le 10^9$
- $0 \le k \le 5 \times 10^{13}$
- `online[i]` is either `true` or `false`, and both `online[0]` and `online[n - 1]` are `true`.
- The given graph is a **directed acyclic graph (DAG)**.

---

## Topics and Tags

- **Binary Search**
- **Dynamic Programming**
- **Graph**
- **Topological Sort**
- **Shortest Path**

---

## Intuition and Approach

### 1. Monotonicity & Binary Search on the Answer:
We want to maximize the minimum edge weight along a valid path from `0` to `n - 1` whose total edge sum is $\le k$.
- If a score `mid` is achievable, any score $< mid$ is also achievable (since the same path only contains edges of weight $\ge mid > \text{score}'$).
- If a score `mid` is not achievable, no score $> mid$ can be achievable.
- Hence, the answer satisfies monotonicity, allowing us to binary search the optimal score in the range $[0, \max(\text{cost})]$.

### 2. Feasibility Check on a DAG with Topological Sort:
For a candidate threshold `limit`:
1. **Edge & Node Filtering:** Only keep an edge $(u, v, w)$ if:
   - $u$ and $v$ are online (or are the source `0` or target `n - 1`).
   - $w \ge \text{limit}$.
2. **DAG Shortest Path:**
   - Because the graph is guaranteed to be a DAG, the single-source shortest path can be found in linear time $\mathcal{O}(V + E)$ using **Topological Sorting** (Kahn's Algorithm).
   - Compute in-degrees of all valid nodes considering only the filtered edges.
   - Initialize `dist[0] = 0` and all other `dist[v] = \infty`.
   - Process nodes in topological order using a queue. For each edge $u \to v$ with weight $w$, relax `dist[v] = min(dist[v], dist[u] + w)`.
3. **Validation:**
   - If `dist[n - 1] <= k`, then node $n - 1$ is reachable under total cost $k$ while every edge has weight $\ge \text{limit}$. Thus, `canReach(limit)` is `true`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}((V + E) \log(\max(\text{cost})))$
  - Binary search takes $\mathcal{O}(\log(\max(\text{cost})))$ iterations ($\approx 30$ iterations for $\text{cost} \le 10^9$).
  - In each iteration, filtering edges and topological BFS traversal takes $\mathcal{O}(V + E)$ time, where $V \le 5 \times 10^4$ and $E \le 10^5$.
  - Total operations $\approx 30 \times 1.5 \times 10^5 \approx 4.5 \times 10^6$, running effortlessly in $\approx 40\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(V + E)$
  - Adjacency list representation $\mathcal{O}(V + E)$.
  - Distance array `dist`, in-degree array `indegree`, and BFS queue $\mathcal{O}(V)$.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
