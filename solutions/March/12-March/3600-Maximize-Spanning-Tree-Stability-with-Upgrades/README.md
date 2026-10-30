# LeetCode 3600: Maximize Spanning Tree Stability with Upgrades

- **Publication Date:** 12 March 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/maximize-spanning-tree-stability-with-upgrades/](https://leetcode.com/problems/maximize-spanning-tree-stability-with-Upgrades/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

You are given an integer `n`, representing `n` nodes numbered from `0` to `n - 1` and a list of `edges`, where `edges[i] = [u_i, v_i, s_i, must_i]`:
- `u_i` and `v_i` indicates an undirected edge between nodes `u_i` and `v_i`.
- `s_i` is the strength of the edge.
- `must_i` is an integer (`0` or `1`). If `must_i == 1`, the edge **must** be included in the spanning tree. These edges **cannot** be upgraded.

You are also given an integer `k`, the **maximum number of upgrades** you can perform. Each upgrade **doubles** the strength of an edge, and each eligible edge (with `must_i == 0`) can be upgraded at most once.

The **stability** of a spanning tree is defined as the **minimum strength score** among all edges included in it.

Return the **maximum possible stability** of any valid spanning tree. If it is impossible to connect all nodes, return `-1`.

> **Note:** A spanning tree of a graph with `n` nodes is a subset of the edges that connects all nodes together without forming any cycles, and uses exactly `n - 1` edges.

---

### Examples

#### Example 1:
- **Input:** `n = 3, edges = [[0,1,2,1],[1,2,3,0]], k = 1`
- **Output:** `2`
- **Explanation:**
  - Edge `[0,1]` with strength `2` must be included in the spanning tree.
  - Edge `[1,2]` is optional and can be upgraded from `3` to `6` using one upgrade.
  - The resulting spanning tree includes these two edges with strengths `2` and `6`.
  - The minimum strength in the spanning tree is `2`, which is the maximum possible stability.

#### Example 2:
- **Input:** `n = 3, edges = [[0,1,4,0],[1,2,3,0],[0,2,1,0]], k = 2`
- **Output:** `6`
- **Explanation:**
  - Since all edges are optional and up to `k = 2` upgrades are allowed:
  - Upgrade edges `[0,1]` from `4` to `8` and `[1,2]` from `3` to `6`.
  - The resulting spanning tree includes these two edges with strengths `8` and `6`.
  - The minimum strength in the tree is `6`, which is the maximum possible stability.

#### Example 3:
- **Input:** `n = 3, edges = [[0,1,1,1],[1,2,1,1],[2,0,1,1]], k = 0`
- **Output:** `-1`
- **Explanation:**
  - All edges are mandatory and form a cycle, which violates the spanning tree property of acyclicity. Thus, the answer is `-1`.

---

### Constraints

- `2 <= n <= 10^5`
- `1 <= edges.length <= 10^5`
- `edges[i] = [u_i, v_i, s_i, must_i]`
- `0 <= u_i, v_i < n`
- `u_i != v_i`
- `1 <= s_i <= 10^5`
- `must_i` is either `0` or `1`.
- `0 <= k <= n`
- There are no duplicate edges.

---

## Topics and Tags

- **Primary Tags:** Graph, Minimum Spanning Tree
- **Secondary Tags:** Binary Search, Union Find

---

## Detailed Algorithm Walkthrough

### 1. Invalidation Check & Structural Constraints

Before searching for stability, two conditions immediately invalidate the existence of any spanning tree:
1. **Mandatory Cycles:** The mandatory edges (`must == 1`) cannot form any cycle. If taking the union of mandatory edges reveals an edge connecting already connected nodes, return `-1`.
2. **Global Disconnection:** Even when considering all available edges (both mandatory and optional), the entire graph must form a single connected component. If it does not, return `-1`.

### 2. Binary Search on the Answer

The problem asks to **maximize the minimum** strength among edges in the spanning tree. This monotonic property naturally lends itself to **Binary Search on the Answer**:
- Let $X$ be the target minimum edge strength.
- Can we construct a valid spanning tree where every edge has strength $\ge X$ using at most $k$ upgrades?

Because edge strength $s_i \le 10^5$ and doubling gives at most $2 \times 10^5$, our search space is $X \in [1, 200000]$. Furthermore, if there is at least one mandatory edge, the maximum stability cannot exceed the minimum strength among all mandatory edges:
$$\text{high} = \min(200000, \min_{e \in \text{mandatory}} s_e)$$

### 3. Feasibility Check (`canFormTree(X)`)

To determine if stability $X$ is achievable:
1. **Mandatory Edges:**
   - Every mandatory edge must satisfy $s_i \ge X$ because mandatory edges cannot be upgraded or omitted. If any $s_i < X$, stability $X$ is immediately impossible.
   - Add all mandatory edges to a new Disjoint Set Union (DSU) structure.
2. **Cost-Free Optional Edges:**
   - Any optional edge with $s_i \ge X$ already meets the threshold without consuming an upgrade (Cost = 0).
   - Greedily unite components using these edges.
3. **Upgrade-Eligible Optional Edges:**
   - Optional edges with $s_i < X \le 2 \times s_i$ can satisfy the threshold if upgraded (Cost = 1).
   - If an edge connects two currently disjoint components and we haven't exceeded $k$ upgrades, greedily upgrade and unite them.
4. **Final Connectivity:**
   - If the number of connected components reaches `1`, then stability $X$ is achievable!

Because edges are categorized into cost $0$ and cost $1$, prioritizing cost $0$ edges before cost $1$ edges guarantees the minimum number of upgrades required to connect the graph (by the matroid greedy property of spanning forests).

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}((N + M) \cdot \alpha(N) \cdot \log(\max S))$, where $N$ is the number of nodes, $M$ is the number of edges, $\alpha$ is the inverse Ackermann function, and $\max S \le 2 \times 10^5$. Binary search takes $\approx 18$ iterations, each performing a linear scan over edges with near constant-time DSU operations. The total runtime is well under $150$ ms.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$ to store the DSU parent and rank arrays.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 3600 - Maximize Spanning Tree Stability with Upgrades
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    static class DSU {
        int[] parent;
        int[] rank;
        int components;

        DSU(int n) {
            parent = new int[n];
            rank = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
            }
            components = n;
        }

        int find(int i) {
            int root = i;
            while (root != parent[root]) {
                root = parent[root];
            }
            int curr = i;
            while (curr != root) {
                int next = parent[curr];
                parent[curr] = root;
                curr = next;
            }
            return root;
        }

        boolean union(int i, int j) {
            int rootI = find(i);
            int rootJ = find(j);
            if (rootI != rootJ) {
                if (rank[rootI] < rank[rootJ]) {
                    parent[rootI] = rootJ;
                } else if (rank[rootI] > rank[rootJ]) {
                    parent[rootJ] = rootI;
                } else {
                    parent[rootJ] = rootI;
                    rank[rootI]++;
                }
                components--;
                return true;
            }
            return false;
        }
    }

    public int maxStability(int n, int[][] edges, int k) {
        DSU mandatoryDsu = new DSU(n);
        int mandatoryCount = 0;
        int minMandatory = Integer.MAX_VALUE;

        // Validate mandatory edges
        for (int[] e : edges) {
            if (e[3] == 1) {
                if (!mandatoryDsu.union(e[0], e[1])) {
                    return -1; // Cycle in mandatory edges
                }
                mandatoryCount++;
                minMandatory = Math.min(minMandatory, e[2]);
            }
        }

        // Validate whole graph connectivity
        DSU totalDsu = new DSU(n);
        for (int[] e : edges) {
            totalDsu.union(e[0], e[1]);
        }
        if (totalDsu.components > 1) {
            return -1;
        }

        int low = 1;
        int high = mandatoryCount > 0 ? Math.min(200000, minMandatory) : 200000;
        int ans = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (canFormTree(n, edges, k, mid)) {
                ans = mid;
                low = mid + 1; // Search for higher stability
            } else {
                high = mid - 1;
            }
        }

        return ans;
    }

    private boolean canFormTree(int n, int[][] edges, int k, int target) {
        DSU dsu = new DSU(n);

        // 1. Mandatory edges must satisfy strength >= target
        for (int[] e : edges) {
            if (e[3] == 1) {
                if (e[2] < target) {
                    return false;
                }
                dsu.union(e[0], e[1]);
            }
        }

        // 2. Add cost 0 optional edges (strength >= target)
        for (int[] e : edges) {
            if (e[3] == 0 && e[2] >= target) {
                dsu.union(e[0], e[1]);
            }
        }

        // 3. Add cost 1 optional edges (strength < target and 2 * strength >= target)
        int upgradesUsed = 0;
        for (int[] e : edges) {
            if (e[3] == 0 && e[2] < target && 2 * e[2] >= target) {
                if (dsu.find(e[0]) != dsu.find(e[1])) {
                    if (upgradesUsed < k) {
                        dsu.union(e[0], e[1]);
                        upgradesUsed++;
                    }
                }
            }
        }

        return dsu.components == 1;
    }
}
```

### Python
```python
"""
Problem: LeetCode 3600 - Maximize Spanning Tree Stability with Upgrades
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""

from typing import List

class DSU:
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.components = n

    def find(self, i: int) -> int:
        root = i
        while root != self.parent[root]:
            root = self.parent[root]
        curr = i
        while curr != root:
            nxt = self.parent[curr]
            self.parent[curr] = root
            curr = nxt
        return root

    def union(self, i: int, j: int) -> bool:
        root_i = self.find(i)
        root_j = self.find(j)
        if root_i != root_j:
            if self.rank[root_i] < self.rank[root_j]:
                self.parent[root_i] = root_j
            elif self.rank[root_i] > self.rank[root_j]:
                self.parent[root_j] = root_i
            else:
                self.parent[root_j] = root_i
                self.rank[root_i] += 1
            self.components -= 1
            return True
        return False

class Solution:
    def maxStability(self, n: int, edges: List[List[int]], k: int) -> int:
        mandatory_dsu = DSU(n)
        mandatory_count = 0
        min_mandatory = float('inf')

        # Check mandatory edges for cycles
        for u, v, s, must in edges:
            if must == 1:
                if not mandatory_dsu.union(u, v):
                    return -1
                mandatory_count += 1
                min_mandatory = min(min_mandatory, s)

        # Check overall graph connectivity
        total_dsu = DSU(n)
        for u, v, s, must in edges:
            total_dsu.union(u, v)
        if total_dsu.components > 1:
            return -1

        low = 1
        high = min(200000, min_mandatory) if mandatory_count > 0 else 200000
        ans = -1

        def can_form_tree(target: int) -> bool:
            dsu = DSU(n)

            # 1. Mandatory edges must have strength >= target
            for u, v, s, must in edges:
                if must == 1:
                    if s < target:
                        return False
                    dsu.union(u, v)

            # 2. Cost 0 optional edges
            for u, v, s, must in edges:
                if must == 0 and s >= target:
                    dsu.union(u, v)

            # 3. Cost 1 optional edges (up to k)
            upgrades_used = 0
            for u, v, s, must in edges:
                if must == 0 and s < target <= 2 * s:
                    if dsu.find(u) != dsu.find(v):
                        if upgrades_used < k:
                            dsu.union(u, v)
                            upgrades_used += 1

            return dsu.components == 1

        while low <= high:
            mid = (low + high) // 2
            if can_form_tree(mid):
                ans = mid
                low = mid + 1
            else:
                high = mid - 1

        return ans
```

### C++
```cpp
/**
 * Problem: LeetCode 3600 - Maximize Spanning Tree Stability with Upgrades
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
    struct DSU {
        vector<int> parent;
        vector<int> rank;
        int components;

        DSU(int n) : parent(n), rank(n, 0), components(n) {
            for (int i = 0; i < n; i++) parent[i] = i;
        }

        int find(int i) {
            int root = i;
            while (root != parent[root]) root = parent[root];
            int curr = i;
            while (curr != root) {
                int next = parent[curr];
                parent[curr] = root;
                curr = next;
            }
            return root;
        }

        bool unite(int i, int j) {
            int rootI = find(i);
            int rootJ = find(j);
            if (rootI != rootJ) {
                if (rank[rootI] < rank[rootJ]) {
                    parent[rootI] = rootJ;
                } else if (rank[rootI] > rank[rootJ]) {
                    parent[rootJ] = rootI;
                } else {
                    parent[rootJ] = rootI;
                    rank[rootI]++;
                }
                components--;
                return true;
            }
            return false;
        }
    };

    bool canFormTree(int n, const vector<vector<int>>& edges, int k, int target) {
        DSU dsu(n);

        // 1. Mandatory edges
        for (const auto& e : edges) {
            if (e[3] == 1) {
                if (e[2] < target) return false;
                dsu.unite(e[0], e[1]);
            }
        }

        // 2. Cost 0 optional edges (strength >= target)
        for (const auto& e : edges) {
            if (e[3] == 0 && e[2] >= target) {
                dsu.unite(e[0], e[1]);
            }
        }

        // 3. Cost 1 optional edges (strength < target and 2 * strength >= target)
        int upgradesUsed = 0;
        for (const auto& e : edges) {
            if (e[3] == 0 && e[2] < target && 2 * e[2] >= target) {
                if (dsu.find(e[0]) != dsu.find(e[1])) {
                    if (upgradesUsed < k) {
                        dsu.unite(e[0], e[1]);
                        upgradesUsed++;
                    }
                }
            }
        }

        return dsu.components == 1;
    }

public:
    int maxStability(int n, vector<vector<int>>& edges, int k) {
        DSU mandatoryDsu(n);
        int mandatoryCount = 0;
        int minMandatory = INT_MAX;

        for (const auto& e : edges) {
            if (e[3] == 1) {
                if (!mandatoryDsu.unite(e[0], e[1])) {
                    return -1; // Cycle in mandatory edges
                }
                mandatoryCount++;
                minMandatory = min(minMandatory, e[2]);
            }
        }

        DSU totalDsu(n);
        for (const auto& e : edges) {
            totalDsu.unite(e[0], e[1]);
        }
        if (totalDsu.components > 1) return -1;

        int low = 1;
        int high = mandatoryCount > 0 ? min(200000, minMandatory) : 200000;
        int ans = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (canFormTree(n, edges, k, mid)) {
                ans = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return ans;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 3600 - Maximize Spanning Tree Stability with Upgrades
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */

class DSU {
    /**
     * @param {number} n
     */
    constructor(n) {
        this.parent = new Int32Array(n);
        this.rank = new Int8Array(n);
        for (let i = 0; i < n; i++) {
            this.parent[i] = i;
        }
        this.components = n;
    }

    /**
     * @param {number} i
     * @return {number}
     */
    find(i) {
        let root = i;
        while (root !== this.parent[root]) {
            root = this.parent[root];
        }
        let curr = i;
        while (curr !== root) {
            let next = this.parent[curr];
            this.parent[curr] = root;
            curr = next;
        }
        return root;
    }

    /**
     * @param {number} i
     * @param {number} j
     * @return {boolean}
     */
    union(i, j) {
        let rootI = this.find(i);
        let rootJ = this.find(j);
        if (rootI !== rootJ) {
            if (this.rank[rootI] < this.rank[rootJ]) {
                this.parent[rootI] = rootJ;
            } else if (this.rank[rootI] > this.rank[rootJ]) {
                this.parent[rootJ] = rootI;
            } else {
                this.parent[rootJ] = rootI;
                this.rank[rootI]++;
            }
            this.components--;
            return true;
        }
        return false;
    }
}

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} k
 * @return {number}
 */
var maxStability = function(n, edges, k) {
    const mandatoryDsu = new DSU(n);
    let mandatoryCount = 0;
    let minMandatory = Infinity;

    // Validate mandatory edges
    for (let i = 0; i < edges.length; i++) {
        const [u, v, s, must] = edges[i];
        if (must === 1) {
            if (!mandatoryDsu.union(u, v)) {
                return -1; // Cycle detected in mandatory edges
            }
            mandatoryCount++;
            if (s < minMandatory) {
                minMandatory = s;
            }
        }
    }

    // Validate overall graph connectivity
    const totalDsu = new DSU(n);
    for (let i = 0; i < edges.length; i++) {
        totalDsu.union(edges[i][0], edges[i][1]);
    }
    if (totalDsu.components > 1) {
        return -1;
    }

    let low = 1;
    let high = mandatoryCount > 0 ? Math.min(200000, minMandatory) : 200000;
    let ans = -1;

    function canFormTree(target) {
        const dsu = new DSU(n);

        // 1. Mandatory edges
        for (let i = 0; i < edges.length; i++) {
            const [u, v, s, must] = edges[i];
            if (must === 1) {
                if (s < target) return false;
                dsu.union(u, v);
            }
        }

        // 2. Cost 0 optional edges
        for (let i = 0; i < edges.length; i++) {
            const [u, v, s, must] = edges[i];
            if (must === 0 && s >= target) {
                dsu.union(u, v);
            }
        }

        // 3. Cost 1 optional edges (up to k)
        let upgradesUsed = 0;
        for (let i = 0; i < edges.length; i++) {
            const [u, v, s, must] = edges[i];
            if (must === 0 && s < target && 2 * s >= target) {
                if (dsu.find(u) !== dsu.find(v)) {
                    if (upgradesUsed < k) {
                        dsu.union(u, v);
                        upgradesUsed++;
                    }
                }
            }
        }

        return dsu.components === 1;
    }

    while (low <= high) {
        const mid = (low + high) >> 1;
        if (canFormTree(mid)) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return ans;
};
```
