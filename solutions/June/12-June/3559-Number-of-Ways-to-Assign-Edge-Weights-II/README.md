# LeetCode 3559: Number of Ways to Assign Edge Weights II

- **Publication Date:** 12 June 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/number-of-ways-to-assign-edge-weights-ii/](https://leetcode.com/problems/number-of-ways-to-assign-edge-weights-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/7RiQJUbG1Kc?si=8h_nBxHlAQxRMdmN)

---

## Problem Summary

There is an undirected tree with `n` nodes labeled from `1` to `n`, rooted at node `1`. The tree is represented by a 2D integer array `edges` of length `n - 1`, where `edges[i] = [u_i, v_i]` indicates that there is an edge between nodes `u_i` and `v_i`.

Initially, all edges have a weight of `0`. You must assign each edge a weight of either **1 or 2**.

The **cost** of a path between any two nodes `u` and `v` is the total weight of all edges in the path connecting them.

You are given a 2D integer array `queries`. For each `queries[i] = [u_i, v_i]`, determine the number of ways to assign weights to edges **in the path** such that the cost of the path between `u_i` and `v_i` is **odd**.

Return an array `answer`, where `answer[i]` is the number of valid assignments for `queries[i]`.

Since the answer may be large, apply **modulo $10^9 + 7$** to each `answer[i]`.

*Note: For each query, disregard all edges not in the path between node $u_i$ and $v_i$.*

---

### Examples

#### Example 1:
- **Input:** `edges = [[1, 2]], queries = [[1, 1], [1, 2]]`
- **Output:** `[0, 1]`
- **Explanation:**
  - **Query `[1, 1]`:** The path from Node 1 to itself consists of no edges ($0$ edges), so the total cost is $0$ (even). Thus, there are $0$ valid assignments that produce an odd cost.
  - **Query `[1, 2]`:** The path consists of $1$ edge. Assigning weight $1$ gives cost $1$ (odd), while assigning weight $2$ gives cost $2$ (even). Thus, there is exactly $1$ valid assignment.

---

### Constraints

- $2 \le n == \text{edges.length} + 1 \le 10^5$
- $\text{edges}[i].\text{length} == 2$
- $1 \le u_i, v_i \le n$
- $u_i \ne v_i$
- The input is generated such that `edges` represents a valid tree.
- $1 \le \text{queries.length} \le 10^5$
- $\text{queries}[i].\text{length} == 2$
- $1 \le u_i, v_i \le n$

---

## Algorithmic Approach

### 1. Parity and Combinatorial Counting on Paths
For any query $(u, v)$, let $L$ denote the number of edges on the unique simple path between nodes $u$ and $v$.

- If $L = 0$ ($u = v$), there are no edges on the path. The sum of weights is $0$, which is even. Hence, the number of ways to achieve an odd sum is **$0$**.
- If $L \ge 1$:
  - Each of the $L$ edges must be assigned a weight $w_i \in \{1, 2\}$.
  - Notice that $1 \equiv 1 \pmod 2$ (odd) and $2 \equiv 0 \pmod 2$ (even).
  - The first $L - 1$ edges can each be assigned weights $1$ or $2$ completely independently, yielding $2^{L - 1}$ combinations.
  - Whatever the sum of the first $L - 1$ edges is, its parity is fixed. The final $L$-th edge has two choices:
    - If the sum of the first $L - 1$ edges is even, we must choose weight $1$ (odd) to make the total odd.
    - If the sum of the first $L - 1$ edges is odd, we must choose weight $2$ (even) to make the total odd.
  - Therefore, for every combination of the first $L - 1$ edges, there is **exactly one** valid choice for the $L$-th edge that produces an odd sum.
  - Thus, the total number of valid assignments is:
    $$\text{ans} = 2^{L - 1} \pmod{10^9 + 7}$$

### 2. Fast Path Length via Lowest Common Ancestor (LCA)
The distance (number of edges) between any two nodes $u$ and $v$ in a rooted tree can be computed using their depths and their Lowest Common Ancestor (LCA):
$$L = \text{depth}[u] + \text{depth}[v] - 2 \cdot \text{depth}[\text{LCA}(u, v)]$$

To answer up to $10^5$ queries efficiently:
1. **Tree Traversal (DFS / BFS):** Root the tree at node `1` and compute `depth[i]` and the direct parent `up[i][0]`.
2. **Binary Lifting Table:** Precompute $2^j$-th ancestors `up[i][j]` using:
   $$\text{up}[i][j] = \text{up}[\text{up}[i][j - 1]][j - 1]$$
   where $0 \le j \le 17$ (since $2^{17} = 131,072 > 10^5$).
3. **$\mathcal{O}(\log n)$ Query Processing:**
   - Bring the deeper node up to the same depth as the shallower node using powers of 2.
   - If they coincide, that node is the LCA.
   - Otherwise, lift both nodes together until their parent is the LCA.
4. **Precomputed Powers of 2:** Precompute `pow2[k] = (pow2[k - 1] * 2) % MOD` for $0 \le k \le n$ to answer in $\mathcal{O}(1)$ time after finding the LCA.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}((N + Q) \log N)$ | Precomputing the binary lifting table takes $\mathcal{O}(N \log N)$. Each of the $Q$ queries performs an LCA jump query in $\mathcal{O}(\log N)$ time. |
| **Auxiliary Space** | $\mathcal{O}(N \log N + Q)$ | The binary lifting table requires $\mathcal{O}(N \log N)$ memory, the graph adjacency list requires $\mathcal{O}(N)$, and the output array requires $\mathcal{O}(Q)$. |

---

## Multi-Language Implementations

### Java
```java
import java.util.*;

class Solution {

    static final int MOD = 1_000_000_007;
    static final int LOG = 17;

    List<Integer>[] graph;
    int[][] up;
    int[] depth;

    public int[] assignEdgeWeights(int[][] edges, int[][] queries) {

        int n = edges.length + 1;

        graph = new ArrayList[n + 1];
        for (int i = 1; i <= n; i++) {
            graph[i] = new ArrayList<>();
        }

        for (int[] e : edges) {
            graph[e[0]].add(e[1]);
            graph[e[1]].add(e[0]);
        }

        up = new int[n + 1][LOG + 1];
        depth = new int[n + 1];

        dfs(1, 0);

        for (int j = 1; j <= LOG; j++) {
            for (int i = 1; i <= n; i++) {
                up[i][j] = up[up[i][j - 1]][j - 1];
            }
        }

        int maxDepth = n;
        long[] pow2 = new long[maxDepth + 1];
        pow2[0] = 1;

        for (int i = 1; i <= maxDepth; i++) {
            pow2[i] = (pow2[i - 1] * 2) % MOD;
        }

        int[] ans = new int[queries.length];

        for (int i = 0; i < queries.length; i++) {

            int u = queries[i][0];
            int v = queries[i][1];

            int lca = getLCA(u, v);

            int len = depth[u] + depth[v] - 2 * depth[lca];

            if (len == 0) {
                ans[i] = 0;
            } else {
                ans[i] = (int) pow2[len - 1];
            }
        }

        return ans;
    }

    private void dfs(int node, int parent) {

        up[node][0] = parent;

        for (int nxt : graph[node]) {
            if (nxt == parent) continue;

            depth[nxt] = depth[node] + 1;
            dfs(nxt, node);
        }
    }

    private int getLCA(int u, int v) {

        if (depth[u] < depth[v]) {
            int temp = u;
            u = v;
            v = temp;
        }

        int diff = depth[u] - depth[v];

        for (int j = LOG; j >= 0; j--) {
            if (((diff >> j) & 1) == 1) {
                u = up[u][j];
            }
        }

        if (u == v) return u;

        for (int j = LOG; j >= 0; j--) {
            if (up[u][j] != up[v][j]) {
                u = up[u][j];
                v = up[v][j];
            }
        }

        return up[u][0];
    }
}
```

### Python
```python
from typing import List

class Solution:
    def assignEdgeWeights(self, edges: List[List[int]], queries: List[List[int]]) -> List[int]:
        MOD = 1_000_000_007
        LOG = 17
        n = len(edges) + 1

        graph = [[] for _ in range(n + 1)]
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)

        up = [[0] * (LOG + 1) for _ in range(n + 1)]
        depth = [0] * (n + 1)

        # Iterative BFS to prevent recursion depth exceeded on deep trees
        queue = [1]
        visited = [False] * (n + 1)
        visited[1] = True
        head = 0

        while head < len(queue):
            node = queue[head]
            head += 1
            for nxt in graph[node]:
                if not visited[nxt]:
                    visited[nxt] = True
                    depth[nxt] = depth[node] + 1
                    up[nxt][0] = node
                    queue.append(nxt)

        for j in range(1, LOG + 1):
            for i in range(1, n + 1):
                up[i][j] = up[up[i][j - 1]][j - 1]

        pow2 = [1] * (n + 1)
        for i in range(1, n + 1):
            pow2[i] = (pow2[i - 1] * 2) % MOD

        def get_lca(u: int, v: int) -> int:
            if depth[u] < depth[v]:
                u, v = v, u

            diff = depth[u] - depth[v]
            for j in range(LOG, -1, -1):
                if (diff >> j) & 1:
                    u = up[u][j]

            if u == v:
                return u

            for j in range(LOG, -1, -1):
                if up[u][j] != up[v][j]:
                    u = up[u][j]
                    v = up[v][j]

            return up[u][0]

        ans = []
        for u, v in queries:
            lca = get_lca(u, v)
            length = depth[u] + depth[v] - 2 * depth[lca]

            if length == 0:
                ans.append(0)
            else:
                ans.append(pow2[length - 1])

        return ans
```

### C++
```cpp
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
    static const int MOD = 1000000007;
    static const int LOG = 17;

public:
    vector<int> assignEdgeWeights(vector<vector<int>>& edges, vector<vector<int>>& queries) {
        int n = edges.size() + 1;
        vector<vector<int>> graph(n + 1);
        for (const auto& e : edges) {
            graph[e[0]].push_back(e[1]);
            graph[e[1]].push_back(e[0]);
        }

        vector<vector<int>> up(n + 1, vector<int>(LOG + 1, 0));
        vector<int> depth(n + 1, 0);

        auto dfs = [&](auto& self, int node, int parent) -> void {
            up[node][0] = parent;
            for (int nxt : graph[node]) {
                if (nxt == parent) continue;
                depth[nxt] = depth[node] + 1;
                self(self, nxt, node);
            }
        };

        dfs(dfs, 1, 0);

        for (int j = 1; j <= LOG; j++) {
            for (int i = 1; i <= n; i++) {
                up[i][j] = up[up[i][j - 1]][j - 1];
            }
        }

        vector<long long> pow2(n + 1, 1);
        for (int i = 1; i <= n; i++) {
            pow2[i] = (pow2[i - 1] * 2) % MOD;
        }

        auto getLCA = [&](int u, int v) -> int {
            if (depth[u] < depth[v]) {
                swap(u, v);
            }

            int diff = depth[u] - depth[v];
            for (int j = LOG; j >= 0; j--) {
                if ((diff >> j) & 1) {
                    u = up[u][j];
                }
            }

            if (u == v) return u;

            for (int j = LOG; j >= 0; j--) {
                if (up[u][j] != up[v][j]) {
                    u = up[u][j];
                    v = up[v][j];
                }
            }

            return up[u][0];
        };

        int q = queries.size();
        vector<int> ans(q);
        for (int i = 0; i < q; i++) {
            int u = queries[i][0];
            int v = queries[i][1];
            int lca = getLCA(u, v);
            int len = depth[u] + depth[v] - 2 * depth[lca];

            if (len == 0) {
                ans[i] = 0;
            } else {
                ans[i] = pow2[len - 1];
            }
        }

        return ans;
    }
};
```

### JavaScript
```javascript
/**
 * @param {number[][]} edges
 * @param {number[][]} queries
 * @return {number[]}
 */
var assignEdgeWeights = function(edges, queries) {
    const MOD = 1000000007;
    const LOG = 17;
    const n = edges.length + 1;

    const graph = Array.from({ length: n + 1 }, () => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    const up = Array.from({ length: n + 1 }, () => new Int32Array(LOG + 1));
    const depth = new Int32Array(n + 1);

    // Iterative BFS to prevent call stack overflow on deep trees
    const queue = [1];
    const visited = new Uint8Array(n + 1);
    visited[1] = 1;
    let head = 0;

    while (head < queue.length) {
        const node = queue[head++];
        for (const nxt of graph[node]) {
            if (!visited[nxt]) {
                visited[nxt] = 1;
                depth[nxt] = depth[node] + 1;
                up[nxt][0] = node;
                queue.push(nxt);
            }
        }
    }

    for (let j = 1; j <= LOG; j++) {
        for (let i = 1; i <= n; i++) {
            up[i][j] = up[up[i][j - 1]][j - 1];
        }
    }

    const pow2 = new Int32Array(n + 1);
    pow2[0] = 1;
    for (let i = 1; i <= n; i++) {
        pow2[i] = (pow2[i - 1] * 2) % MOD;
    }

    const getLCA = (u, v) => {
        if (depth[u] < depth[v]) {
            let temp = u;
            u = v;
            v = temp;
        }

        const diff = depth[u] - depth[v];
        for (let j = LOG; j >= 0; j--) {
            if ((diff >> j) & 1) {
                u = up[u][j];
            }
        }

        if (u === v) return u;

        for (let j = LOG; j >= 0; j--) {
            if (up[u][j] !== up[v][j]) {
                u = up[u][j];
                v = up[v][j];
            }
        }

        return up[u][0];
    };

    const ans = new Array(queries.length);
    for (let i = 0; i < queries.length; i++) {
        const u = queries[i][0];
        const v = queries[i][1];
        const lca = getLCA(u, v);
        const len = depth[u] + depth[v] - 2 * depth[lca];

        if (len === 0) {
            ans[i] = 0;
        } else {
            ans[i] = pow2[len - 1];
        }
    }

    return ans;
};
```
