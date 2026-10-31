# LeetCode 2492: Minimum Score of a Path Between Two Cities

- **Publication Date:** 04 July 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities/](https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/E9IDkU781ZM?si=V7EW90f_v8NOc9tW)

---

## Problem Summary

You are given a positive integer `n` representing `n` cities numbered from `1` to `n`. You are also given a 2D array `roads` where `roads[i] = [a_i, b_i, \text{distance}_i]` indicates that there is a bidirectional road between cities $a_i$ and $b_i$ with a distance equal to $\text{distance}_i$. The cities graph is not necessarily connected.

The **score** of a path between two cities is defined as the **minimum distance** of a road in this path.

Return the **minimum possible score** of a path between cities `1` and `n`.

> [!NOTE]
> - A path is a sequence of roads between two cities.
> - It is allowed for a path to contain the same road multiple times, and you can visit cities `1` and `n` multiple times along the path.
> - The test cases are generated such that there is at least one path between `1` and `n`.

---

### Examples

#### Example 1:

- **Input:** `n = 4, roads = [[1,2,9],[2,3,6],[2,4,5],[1,4,7]]`
- **Output:** `5`
- **Explanation:**
  - The path from city 1 to 4 with the minimum score is: $1 \to 2 \to 4$.
  - The score of this path is $\min(9, 5) = 5$.
  - It can be shown that no other path has a smaller score.

#### Example 2:

- **Input:** `n = 4, roads = [[1,2,2],[1,3,4],[3,4,7]]`
- **Output:** `2`
- **Explanation:**
  - The path from city 1 to 4 with the minimum score is: $1 \to 2 \to 1 \to 3 \to 4$.
  - The score of this path is $\min(2, 2, 4, 7) = 2$.

---

### Constraints

- $2 \le n \le 10^5$
- $1 \le \text{roads.length} \le 10^5$
- $\text{roads}[i].\text{length} == 3$
- $1 \le a_i, b_i \le n$
- $a_i \ne b_i$
- $1 \le \text{distance}_i \le 10^4$
- There are no repeated edges.
- There is at least one path between `1` and `n`.

---

## Topics and Tags

- **Graph**
- **Breadth-First Search**
- **Depth-First Search**
- **Union Find**

---

## Intuition and Approach

### 1. Connected Component Insight
A critical observation in this problem is that:
1. We can traverse any road and visit any city **multiple times**.
2. We are guaranteed that a path exists between city `1` and city `n`.

Because of these conditions, any road $(u, v)$ that lies in the **same connected component** as city `1` (and consequently city `n`) can be traversed! Even if an edge does not lie directly on the shortest simple path between `1` and `n`, we can always take a detour:
$$1 \to \dots \to u \to v \to u \to \dots \to n$$
and return to our main path without any penalty, because the score of the entire path is determined solely by the **minimum** edge distance encountered along the route.

### 2. Algorithmic Steps (BFS Traversal)
1. **Graph Construction:** Represent the cities and bidirectional roads using an adjacency list `graph`, where each node stores pairs of `(neighbor, distance)`.
2. **Breadth-First Search (BFS):**
   - Initialize a visited array `vis` of size $n + 1$ and a queue `q`.
   - Start the traversal from city `1`, marking `vis[1] = true`.
   - Track the minimum edge distance seen so far: `ans = INT_MAX`.
3. **Queue Processing:**
   - While the queue is not empty, pop the current city `u`.
   - For every incident road $(v, d)$ connected to `u`:
     - Update the global minimum: `ans = min(ans, d)`.
     - If neighbor `v` has not been visited yet, mark `vis[v] = true` and push `v` into the queue.
4. **Result:** Return `ans` once the entire connected component has been fully explored.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(V + E)$
  - Building the adjacency list takes $\mathcal{O}(E)$ time.
  - The BFS explores each reachable vertex and examines each incident edge at most twice (once from each endpoint), taking $\mathcal{O}(V + E)$ time, where $V = n \le 10^5$ and $E = \text{roads.length} \le 10^5$.
- **Auxiliary Space Complexity:** $\mathcal{O}(V + E)$
  - The adjacency list stores $2E$ directed edge entries, taking $\mathcal{O}(V + E)$ space.
  - The `vis` array and queue `q` store at most $V$ nodes, taking $\mathcal{O}(V)$ space.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
