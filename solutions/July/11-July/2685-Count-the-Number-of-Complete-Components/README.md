# LeetCode 2685: Count the Number of Complete Components

- **Publication Date:** 11 July 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/count-the-number-of-complete-components/](https://leetcode.com/problems/count-the-number-of-complete-components/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/_g8uFFU5Mtk?si=khRMqI7MY97PJcXl)

---

## Problem Summary

You are given an integer `n`. There is an **undirected graph** with `n` vertices, numbered from $0$ to $n - 1$. You are given a 2D integer array `edges` where $\text{edges}[i] = [a_i, b_i]$ denotes that there exists an undirected edge connecting vertices $a_i$ and $b_i$.

Return the **number of complete connected components** of the graph.

- A **connected component** is a subgraph of a graph in which there exists a path between any two vertices, and no vertex of the subgraph shares an edge with a vertex outside of the subgraph.
- A connected component is said to be **complete** if there exists an edge between every pair of its vertices (i.e., a clique).

---

### Examples

#### Example 1:

- **Input:** `n = 6`, `edges = [[0,1],[0,2],[1,2],[3,4]]`
- **Output:** `3`
- **Explanation:**
  - Component $\{0, 1, 2\}$ has 3 vertices and every vertex has degree $2$ (edges between $(0,1), (0,2), (1,2)$). It is complete.
  - Component $\{3, 4\}$ has 2 vertices and each has degree $1$. It is complete.
  - Component $\{5\}$ has 1 vertex and degree $0$. It is complete.
  - Total complete components = $3$.

#### Example 2:

- **Input:** `n = 6`, `edges = [[0,1],[0,2],[1,2],[3,4],[3,5]]`
- **Output:** `1`
- **Explanation:**
  - Component $\{0, 1, 2\}$ is complete.
  - Component $\{3, 4, 5\}$ has 3 vertices, but vertices $4$ and $5$ are not directly connected (degrees are: node $3$ has degree $2$, while nodes $4$ and $5$ have degree $1 \ne 2$). Hence, this component is not complete.
  - Total complete components = $1$.

---

### Constraints

- $1 \le n \le 50$
- $0 \le \text{edges.length} \le \frac{n \times (n - 1)}{2}$
- $\text{edges}[i].\text{length} == 2$
- $0 \le a_i, b_i \le n - 1$
- $a_i \ne b_i$
- There are no repeated edges.

---

## Algorithmic Approach

### 1. Connected Component Identification via BFS

We represent the undirected graph using an adjacency list. For every vertex from $0$ to $n - 1$ that has not yet been marked as visited:
1. We start a **Breadth-First Search (BFS)** (or Depth-First Search) queue from that vertex.
2. We traverse all reachable vertices, marking them visited and collecting them into a list `component`.

### 2. Complete Component (Clique) Verification

Let $k = |\text{component}|$ be the number of vertices in this connected component:
- In any complete graph $K_k$, every vertex must be directly adjacent to all other $k - 1$ vertices in the component.
- Since it is a maximal connected component, no vertex has any edges outside this component.
- Thus, the component is complete if and only if **every vertex in the component has an adjacency list size (degree) equal to $k - 1$**.
- Alternatively, we could count the total number of unique edges in the component and check if it equals $\frac{k \times (k - 1)}{2}$. Checking the degree of each node takes $\mathcal{O}(k)$ time and is simple and direct.

If every vertex in `component` satisfies $\text{degree}(v) == k - 1$, we increment our count of complete components.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(V + E)$ | Graph construction takes $\mathcal{O}(E)$. BFS visits each vertex and traverses each undirected edge twice, taking $\mathcal{O}(V + E)$. Verifying degrees takes $\sum |C_i| = \mathcal{O}(V)$. |
| **Auxiliary Space** | $\mathcal{O}(V + E)$ | Adjacency list requires $\mathcal{O}(V + E)$ space. The `visited` array, BFS queue, and component vertex list take $\mathcal{O}(V)$ memory. |

---

## Multi-Language Implementations

- [Java Solution](./Solution.java)
- [Python Solution](./solution.py)
- [C++ Solution](./solution.cpp)
- [JavaScript Solution](./solution.js)
