# LeetCode 3650: Minimum Cost Path with Edge Reversals

- **Publication Date:** 27 January 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-cost-path-with-edge-reversals/](https://leetcode.com/problems/minimum-cost-path-with-edge-reversals/)
- **YouTube Solution:** *Coming Soon* ⏳

---

## Problem Summary

You are given a directed, weighted graph with $n$ nodes labeled from $0$ to $n - 1$, and an array `edges` where `edges[i] = [u_i, v_i, w_i]` represents a directed edge from node $u_i$ to node $v_i$ with cost $w_i$.

Each node $u_i$ has a **switch** that can be used **at most once**:
- When you arrive at $u_i$ and have not yet used its switch, you may activate it on one of its incoming edges $v_i \to u_i$, reverse that edge to $u_i \to v_i$, and **immediately traverse it**.
- The reversal is only valid for that single move, and using a reversed edge costs $2 \cdot w_i$.

Return the **minimum total cost** to travel from node $0$ to node $n - 1$. If it is not possible, return `-1`.

---

### Examples

#### Example 1:
- **Input:** `n = 4, edges = [[0, 1, 3], [3, 1, 1], [2, 3, 4], [0, 2, 2]]`
- **Output:** `5`
- **Explanation:**
  - Traverse the path $0 \to 1$ with cost $3$.
  - At node $1$, activate its switch to reverse the incoming edge $3 \to 1$ (weight $1$) into $1 \to 3$ with cost $2 \cdot 1 = 2$.
  - Total cost is $3 + 2 = 5$.

#### Example 2:
- **Input:** `n = 4, edges = [[0, 2, 1], [2, 1, 1], [1, 3, 1], [2, 3, 3]]`
- **Output:** `3`
- **Explanation:**
  - No reversal is needed. Take the direct path $0 \to 2$ (cost $1$), then $2 \to 1$ (cost $1$), then $1 \to 3$ (cost $1$).
  - Total cost is $1 + 1 + 1 = 3$.

---

### Constraints

- $2 \le n \le 5 \cdot 10^4$
- $1 \le \text{edges.length} \le 10^5$
- $\text{edges}[i] = [u_i, v_i, w_i]$
- $0 \le u_i, v_i \le n - 1$
- $1 \le w_i \le 1000$

---

## Topics and Tags

- **Graph**
- **Shortest Path**
- **Heap (Priority Queue)**

---

## Approach & Intuition

### Modeling as an Augmented Shortest Path Problem:

1. **Understanding the Switch Mechanic:**
   - At any node $u$, we can either:
     1. Traverse any standard outgoing directed edge $u \to v$ with original cost $w_i$.
     2. Use $u$'s switch to reverse any incoming edge $v \to u$ (weight $w_i$) to become $u \to v$ and immediately traverse it at cost $2 \cdot w_i$.

2. **Why State Tracking Is Not Needed:**
   - Each node's switch can be activated at most once.
   - However, all original edge costs $w_i$ are strictly positive ($w_i \ge 1$), which means reversed traversal costs $2 \cdot w_i \ge 2$ are also strictly positive.
   - In a directed graph with all positive edge weights, the shortest path between two nodes is strictly **simple** (it never contains cycles).
   - Because a shortest path visits any vertex at most once, the restriction "at most once per node" is naturally and automatically satisfied!

3. **Graph Augmentation:**
   - For every directed edge $(u, v, w)$ in `edges`:
     - Add directed edge $u \to v$ with weight $w$.
     - Add reversed directed edge $v \to u$ with weight $2 \cdot w$ (representing using node $v$'s switch on the incoming edge $u \to v$).
   - Run standard **Dijkstra's Algorithm** from source node $0$ to destination node $n - 1$ using a Min-PriorityQueue.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}((V + E) \log V)$
  - Building the augmented graph takes $\mathcal{O}(V + E)$ time.
  - The augmented graph has $V = n \le 5 \cdot 10^4$ vertices and $2E \le 2 \cdot 10^5$ directed edges.
  - Dijkstra's algorithm with a binary min-heap runs in $\mathcal{O}((V + E) \log V)$ time.
  - Maximum operations $\approx 2 \cdot 10^5 \log_2(5 \cdot 10^4) \approx 3.2 \cdot 10^6$, running in under $60\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(V + E)$
  - Adjacency list requires $\mathcal{O}(V + E)$ space.
  - Distance array `dist` takes $\mathcal{O}(V)$ space.
  - Min-PriorityQueue stores at most $\mathcal{O}(V + E)$ entries during exploration.

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
