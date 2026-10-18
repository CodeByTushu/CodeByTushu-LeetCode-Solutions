# LeetCode 3534: Path Existence Queries in a Graph II

- **Publication Date:** 10 July 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/path-existence-queries-in-a-graph-ii/](https://leetcode.com/problems/path-existence-queries-in-a-graph-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/lS5OVEtbv_I?si=l4X3ZeapEzLQ_uWs)

---

## Problem Summary

You are given an integer `n` representing the number of nodes in an unweighted, undirected graph, labeled from $0$ to $n - 1$.

You are also given an integer array `nums` of length `n` and an integer `maxDiff`.

An undirected edge exists between nodes `i` and `j` if the absolute difference between `nums[i]` and `nums[j]` is at most `maxDiff` (i.e., $|nums[i] - nums[j]| \le maxDiff$).

You are also given a 2D integer array `queries`. For each $\text{queries}[i] = [u_i, v_i]$, find the **minimum distance** (shortest path length) between nodes $u_i$ and $v_i$. If no path exists between the two nodes, return `-1` for that query.

Return an array `answer`, where $\text{answer}[i]$ is the result of the $i^{\text{th}}$ query.

---

### Examples

#### Example 1:

- **Input:** `n = 5`, `nums = [1, 8, 3, 4, 2]`, `maxDiff = 3`, `queries = [[0, 3], [2, 4]]`
- **Output:** `[1, 1]`
- **Explanation:**
  - Query `[0, 3]`: $|nums[0] - nums[3]| = |1 - 4| = 3 \le 3$, direct edge exists $\implies 1$.
  - Query `[2, 4]`: $|nums[2] - nums[4]| = |3 - 2| = 1 \le 3$, direct edge exists $\implies 1$.

#### Example 2:

- **Input:** `n = 5`, `nums = [5, 3, 1, 9, 10]`, `maxDiff = 2`, `queries = [[0, 1], [0, 2], [2, 3], [4, 3]]`
- **Output:** `[1, 2, -1, 1]`
- **Explanation:**
  - Query `[0, 1]`: $0 \to 1$ with $|5 - 3| = 2 \le 2 \implies 1$.
  - Query `[0, 2]`: $0 \to 1 \to 2$ with $|5 - 3| = 2$ and $|3 - 1| = 2 \implies 2$.
  - Query `[2, 3]`: No valid sequence of edges connects $2$ ($nums[2]=1$) and $3$ ($nums[3]=9$) $\implies -1$.
  - Query `[4, 3]`: $3 \to 4$ with $|9 - 10| = 1 \le 2 \implies 1$.

#### Example 3:

- **Input:** `n = 3`, `nums = [3, 6, 1]`, `maxDiff = 1`, `queries = [[0, 0], [0, 1], [1, 2]]`
- **Output:** `[0, -1, -1]`
- **Explanation:**
  - Query `[0, 0]`: Node to itself $\implies 0$.
  - Query `[0, 1]`: $|3 - 6| = 3 > 1 \implies -1$.
  - Query `[1, 2]`: $|6 - 1| = 5 > 1 \implies -1$.

---

### Constraints

- $1 \le n == nums.\text{length} \le 10^5$
- $0 \le nums[i] \le 10^5$
- $0 \le maxDiff \le 10^5$
- $1 \le queries.\text{length} \le 10^5$
- $\text{queries}[i] = [u_i, v_i]$
- $0 \le u_i, v_i < n$

---

## Topics and Tags

- **Array**
- **Binary Search**
- **Bit Manipulation**
- **Dynamic Programming**
- **Sorting**
- **Graph**
- **Two Pointers**

---

## Intuition and Approach

### 1. Optimal Greedy Strategy on Sorted Values
Because edge weights are unweighted and depends solely on $|nums[i] - nums[j]| \le maxDiff$, distance between any pair $u$ and $v$ (assuming $nums[u] \le nums[v]$) corresponds to making the fewest steps moving upwards in value space.

To advance as far towards $nums[v]$ as possible in a single step from node $i$, the best greedy move is to jump to a node $j$ with the **maximum possible value** such that:
$$nums[j] - nums[i] \le maxDiff$$

Jumping to the maximum value preserves reachability to all nodes reachable from smaller values and strictly expands future reachability.

### 2. Precomputing Furthest Jumps via Two Pointers
1. Sort all nodes by their `nums` values: `pairs[i] = (nums[i], i)`.
2. Using a two-pointer sliding window from right to left:
   - For each node at sorted position $l$, find the largest index $r$ such that $pairs[r].val - pairs[l].val \le maxDiff$.
   - Record `jump[from][0] = to`.

### 3. Binary Lifting ($\mathcal{O}(\log n)$ Query)
To answer distance queries quickly, build a binary lifting table:
$$\text{jump}[u][k] = \text{jump}[\text{jump}[u][k - 1]][k - 1]$$
where $\text{jump}[u][k]$ represents the furthest reachable node from $u$ in $2^k$ steps.

For each query $(u, v)$ where $nums[u] \le nums[v]$:
- If $u == v$, distance is $0$.
- If $nums[u] == nums[v]$, distance is $1$.
- Iterate $k$ from $\text{LOG} - 1$ down to $0$:
  - If $nums[\text{jump}[u][k]] < nums[v]$, jump $u = \text{jump}[u][k]$ and add $2^k$ to the distance.
- After all jumps, if a single remaining jump reaches or exceeds $nums[v]$ ($nums[\text{jump}[u][0]] \ge nums[v]$), return $\text{dist} + 1$.
- Otherwise, $v$ cannot be reached from $u$, return $-1$.

---

## Complexity Analysis

- **Time Complexity:**
  - Sorting: $\mathcal{O}(n \log n)$
  - Two-Pointer & Binary Lifting Precomputation: $\mathcal{O}(n \log n)$ with $\text{LOG} \approx 20$
  - Each Query: $\mathcal{O}(\log n)$
  - Total Time: $\mathcal{O}((n + q) \log n)$ — comfortably executes within 100 ms in C++ / Java.
- **Auxiliary Space Complexity:** $\mathcal{O}(n \log n)$ to store the binary lifting table $\text{jump}[n][20]$.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
