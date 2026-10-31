# LeetCode 3532: Path Existence Queries in a Graph I

- **Publication Date:** 09 July 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/path-existence-queries-in-a-graph-i/](https://leetcode.com/problems/path-existence-queries-in-a-graph-i/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/wy-9brMdD5c?si=SfOpbq6DL7d9Xtku)

---

## Problem Summary

You are given an integer `n` representing the number of nodes in a graph, labeled from $0$ to $n - 1$.

You are also given an integer array `nums` of length `n` sorted in **non-decreasing order**, and an integer `maxDiff`.

An undirected edge exists between nodes `i` and `j` if the absolute difference between `nums[i]` and `nums[j]` is at most `maxDiff` (i.e., $|nums[i] - nums[j]| \le maxDiff$).

You are also given a 2D integer array `queries`. For each $\text{queries}[i] = [u_i, v_i]$, determine whether there exists a path between nodes $u_i$ and $v_i$.

Return a boolean array `answer`, where $\text{answer}[i]$ is `true` if there exists a path between $u_i$ and $v_i$ in the $i^{\text{th}}$ query and `false` otherwise.

---

### Examples

#### Example 1:

- **Input:** `n = 2`, `nums = [1, 3]`, `maxDiff = 1`, `queries = [[0, 0], [0, 1]]`
- **Output:** `[true, false]`
- **Explanation:**
  - Query `[0, 0]`: Node 0 has a trivial path to itself (`true`).
  - Query `[0, 1]`: There is no edge between Node 0 and Node 1 because $|nums[0] - nums[1]| = |1 - 3| = 2 > maxDiff$ (`false`).

#### Example 2:

- **Input:** `n = 4`, `nums = [2, 5, 6, 8]`, `maxDiff = 2`, `queries = [[0, 1], [0, 2], [1, 3], [2, 3]]`
- **Output:** `[false, false, true, true]`
- **Explanation:**
  - Query `[0, 1]`: No edge between 0 and 1 because $|2 - 5| = 3 > 2$.
  - Query `[0, 2]`: No edge between 0 and 2 because $|2 - 6| = 4 > 2$.
  - Query `[1, 3]`: Path between Node 1 and Node 3 exists through Node 2 since $|5 - 6| = 1 \le 2$ and $|6 - 8| = 2 \le 2$.
  - Query `[2, 3]`: Direct edge exists between Node 2 and Node 3 since $|6 - 8| = 2 \le 2$.

---

### Constraints

- $1 \le n == nums.\text{length} \le 10^5$
- $0 \le nums[i] \le 10^5$
- `nums` is sorted in non-decreasing order.
- $0 \le maxDiff \le 10^5$
- $1 \le queries.\text{length} \le 10^5$
- $\text{queries}[i] = [u_i, v_i]$
- $0 \le u_i, v_i < n$

---

## Topics and Tags

- **Array**
- **Graph**
- **Union Find**

---

## Intuition and Approach

### Key Insight: Contiguous Connected Components
The problem specifies that `nums` is already sorted in **non-decreasing order**:
$$nums[0] \le nums[1] \le \dots \le nums[n - 1]$$

Consider any two indices $i < j$:
- If there exists an edge between $i$ and $j$, then $nums[j] - nums[i] \le maxDiff$.
- Since all intermediate elements satisfy $nums[i] \le nums[k] \le nums[j]$ for all $i \le k \le j$, every consecutive pair must also satisfy $nums[k] - nums[k - 1] \le maxDiff$.
- Conversely, if ANY consecutive difference $nums[k] - nums[k - 1] > maxDiff$, then no node with index $< k$ can connect to any node with index $\ge k$, because $nums[b] - nums[a] \ge nums[k] - nums[k - 1] > maxDiff$ for all $a < k \le b$.

Therefore:
> **Connected components in this graph form contiguous intervals of indices in the array.**

### Algorithmic Steps
1. Initialize an array `component` of size $n$, with `component[0] = 0` and `id = 0`.
2. Iterate $i$ from $1$ to $n - 1$:
   - If $nums[i] - nums[i - 1] > maxDiff$, increment `id`.
   - Set `component[i] = id`.
3. For each query $[u, v]$, a path exists between $u$ and $v$ if and only if:
   $$\text{component}[u] == \text{component}[v]$$

This achieves $\mathcal{O}(1)$ query time and $\mathcal{O}(n + q)$ overall time without needing a full Disjoint Set Union (DSU) or graph traversal!

---

## Complexity Analysis

- **Time Complexity:**
  - Component assignment: $\mathcal{O}(n)$
  - Query answering: $\mathcal{O}(q)$
  - Total Time: $\mathcal{O}(n + q)$ — strictly optimal and linear.
- **Auxiliary Space Complexity:** $\mathcal{O}(n)$ to store component IDs for each node.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
