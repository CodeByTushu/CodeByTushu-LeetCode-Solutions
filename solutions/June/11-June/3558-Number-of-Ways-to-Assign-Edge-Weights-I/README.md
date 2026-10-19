# LeetCode 3558: Number of Ways to Assign Edge Weights I

- **Publication Date:** 11 June 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/number-of-ways-to-assign-edge-weights-i/](https://leetcode.com/problems/number-of-ways-to-assign-edge-weights-i/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/7RiQJUbG1Kc?si=8h_nBxHlAQxRMdmN)

---

## Problem Summary

There is an undirected tree with `n` nodes labeled from `1` to `n`, rooted at node `1`. The tree is represented by a 2D integer array `edges` of length `n - 1`, where `edges[i] = [u_i, v_i]` indicates that there is an edge between nodes `u_i` and `v_i`.

Initially, all edges have a weight of `0`. You must assign each edge a weight of either **1 or 2**.

The **cost** of a path between any two nodes `u` and `v` is the total weight of all edges in the path connecting them.

Select **any one node `x` at the maximum depth**. Return the number of ways to assign edge weights in the path from node `1` to `x` such that its total cost is **odd**.

Since the answer may be large, return it **modulo $10^9 + 7$**.

*Note: Ignore all edges not in the path from node 1 to $x$.*

---

### Examples

#### Example 1:
- **Input:** `edges = [[1, 2]]`
- **Output:** `1`
- **Explanation:**
  - The path from Node 1 to Node 2 consists of one edge $(1 - 2)$.
  - Assigning weight $1$ makes the cost odd ($1$), while assigning $2$ makes it even ($2$).
  - Thus, the number of valid assignments is $1$.

---

### Constraints

- $2 \le n == \text{edges.length} + 1 \le 10^5$
- $\text{edges}[i].\text{length} == 2$
- $1 \le u_i, v_i \le n$
- $u_i \ne v_i$
- The input is generated such that `edges` represents a valid tree.

---

## Algorithmic Approach

### 1. Identifying the Path Length
The problem asks for valid edge weight assignments **only** along the simple path from root (node `1`) to any node $x$ located at the **maximum depth**:
- Any tree has a unique simple path between the root and node $x$.
- The number of edges in this path equals the depth of node $x$, which we denote as $D = \text{maxDepth}$.
- A standard **Breadth-First Search (BFS)** or **Depth-First Search (DFS)** starting from node `1` finds $\text{maxDepth}$ in linear time $\mathcal{O}(N)$.

### 2. Parity & Combinatorial Counting
We need to assign weights $w_i \in \{1, 2\}$ to each of the $D$ edges such that:
$$\sum_{i=1}^{D} w_i \equiv 1 \pmod{2}$$

Notice the parity properties of the allowed edge weights:
- $1 \equiv 1 \pmod{2}$ (odd)
- $2 \equiv 0 \pmod{2}$ (even)

For any path with $D \ge 1$ edges:
1. We have **complete freedom** to assign either $1$ or $2$ to the first $D - 1$ edges:
   $$\text{Choices for first } D - 1 \text{ edges} = 2^{D - 1}$$
2. Regardless of the choices made for the first $D - 1$ edges, their sum will have some fixed parity (either even or odd).
3. The final $D$-th edge must make the overall sum odd:
   - If the sum of the first $D - 1$ edges is **even**, we must pick $w_D = 1$ (odd).
   - If the sum of the first $D - 1$ edges is **odd**, we must pick $w_D = 2$ (even).
4. In both scenarios, there is **exactly one** valid choice for the final edge!

Thus, the total number of valid assignments is strictly:
$$\text{ans} = 2^{D - 1} \pmod{10^9 + 7}$$

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N)$ | Building the adjacency list takes $\mathcal{O}(N)$ time. The BFS traversal visits every node and edge once in $\mathcal{O}(N)$, and computing $2^{D-1} \pmod{10^9 + 7}$ takes $\mathcal{O}(D) \subseteq \mathcal{O}(N)$ multiplications. |
| **Auxiliary Space** | $\mathcal{O}(N)$ | Graph adjacency list, queue, and visited array require $\mathcal{O}(N)$ auxiliary memory. |

---

## Multi-Language Implementations

### Java
```java
import java.util.*;

class Solution {
    private static final int MOD = 1_000_000_007;

    public int assignEdgeWeights(int[][] edges) {
        int n = edges.length + 1;

        List<Integer>[] graph = new ArrayList[n + 1];
        for (int i = 1; i <= n; i++) {
            graph[i] = new ArrayList<>();
        }

        for (int[] e : edges) {
            graph[e[0]].add(e[1]);
            graph[e[1]].add(e[0]);
        }

        // Find maximum depth from root (node 1)
        int maxDepth = 0;
        boolean[] vis = new boolean[n + 1];

        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{1, 0});
        vis[1] = true;

        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int node = cur[0];
            int depth = cur[1];

            maxDepth = Math.max(maxDepth, depth);

            for (int nxt : graph[node]) {
                if (!vis[nxt]) {
                    vis[nxt] = true;
                    q.offer(new int[]{nxt, depth + 1});
                }
            }
        }

        // Number of odd-sum assignments on a path of length maxDepth
        long ans = 1;
        for (int i = 1; i < maxDepth; i++) {
            ans = (ans * 2) % MOD;
        }

        return (int) ans;
    }
}
```

### Python
```python
from collections import deque
from typing import List


class Solution:
    def assignEdgeWeights(self, edges: List[List[int]]) -> int:
        MOD = 1_000_000_007
        n = len(edges) + 1

        graph = [[] for _ in range(n + 1)]
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)

        # Find maximum depth from root (node 1)
        max_depth = 0
        vis = [False] * (n + 1)
        vis[1] = True

        q = deque([(1, 0)])

        while q:
            node, depth = q.popleft()
            max_depth = max(max_depth, depth)

            for nxt in graph[node]:
                if not vis[nxt]:
                    vis[nxt] = True
                    q.append((nxt, depth + 1))

        # Number of odd-sum assignments on a path of length maxDepth
        # Equal to 2^(max_depth - 1) % MOD
        ans = 1
        for _ in range(1, max_depth):
            ans = (ans * 2) % MOD

        return ans
```

### C++
```cpp
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

class Solution {
private:
    static const int MOD = 1000000007;

public:
    int assignEdgeWeights(vector<vector<int>>& edges) {
        int n = edges.size() + 1;

        vector<vector<int>> graph(n + 1);
        for (const auto& e : edges) {
            graph[e[0]].push_back(e[1]);
            graph[e[1]].push_back(e[0]);
        }

        // Find maximum depth from root (node 1)
        int maxDepth = 0;
        vector<bool> vis(n + 1, false);

        queue<pair<int, int>> q;
        q.push({1, 0});
        vis[1] = true;

        while (!q.empty()) {
            auto [node, depth] = q.front();
            q.pop();

            maxDepth = max(maxDepth, depth);

            for (int nxt : graph[node]) {
                if (!vis[nxt]) {
                    vis[nxt] = true;
                    q.push({nxt, depth + 1});
                }
            }
        }

        // Number of odd-sum assignments on a path of length maxDepth
        long long ans = 1;
        for (int i = 1; i < maxDepth; i++) {
            ans = (ans * 2) % MOD;
        }

        return static_cast<int>(ans);
    }
};
```

### JavaScript
```javascript
/**
 * @param {number[][]} edges
 * @return {number}
 */
var assignEdgeWeights = function(edges) {
    const MOD = 1000000007;
    const n = edges.length + 1;

    const graph = Array.from({ length: n + 1 }, () => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    // Find maximum depth from root (node 1)
    let maxDepth = 0;
    const vis = new Uint8Array(n + 1);

    const q = [[1, 0]];
    vis[1] = 1;
    let head = 0;

    while (head < q.length) {
        const [node, depth] = q[head++];
        maxDepth = Math.max(maxDepth, depth);

        for (const nxt of graph[node]) {
            if (!vis[nxt]) {
                vis[nxt] = 1;
                q.push([nxt, depth + 1]);
            }
        }
    }

    // Number of odd-sum assignments on a path of length maxDepth
    let ans = 1;
    for (let i = 1; i < maxDepth; i++) {
        ans = (ans * 2) % MOD;
    }

    return ans;
};
```
