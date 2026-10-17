# LeetCode 3310: Remove Methods From Project

- **Publication Date:** 05 August 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/remove-methods-from-project/](https://leetcode.com/problems/remove-methods-from-project/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/L3ArLvS-Zak?si=oroVfsGiL7zFKSjJ)

---

## Problem Summary

You are maintaining a project that has `n` methods numbered from `0` to `n - 1`.

You are given two integers `n` and `k`, and a 2D integer array `invocations`, where `invocations[i] = [a_i, b_i]` indicates that method $a_i$ invokes method $b_i$.

There is a known bug in method `k`. Method `k`, along with any method invoked by it, either directly or indirectly, are considered **suspicious** and we aim to remove them.

A group of methods can only be removed if **no method outside the group invokes any methods within it**.

Return an array containing all the remaining methods after removing all the suspicious methods. You may return the answer in any order. If it is not possible to remove all the suspicious methods, none should be removed (return all `0` to `n - 1`).

---

### Examples

#### Example 1:

- **Input:** `n = 4, k = 1, invocations = [[1,2],[0,1],[3,2]]`
- **Output:** `[0,1,2,3]`
- **Explanation:**
  - Method `1` invokes method `2`, so methods `1` and `2` are suspicious.
  - However, method `0` invokes `1` (and method `3` invokes `2`), and neither `0` nor `3` are suspicious.
  - Since methods outside the suspicious set invoke methods within it, no methods can be removed. Return all methods `[0,1,2,3]`.

#### Example 2:

- **Input:** `n = 5, k = 0, invocations = [[1,2],[0,2],[0,1],[3,4]]`
- **Output:** `[3,4]`
- **Explanation:**
  - Method `0` invokes `1` and `2`. Thus, `{0, 1, 2}` forms the suspicious group.
  - No methods outside this group (`3` or `4`) invoke any method in `{0, 1, 2}`.
  - All suspicious methods can be removed. Return `[3, 4]`.

#### Example 3:

- **Input:** `n = 3, k = 2, invocations = [[1,2],[0,1],[2,0]]`
- **Output:** `[]`
- **Explanation:**
  - All methods are directly or indirectly invoked starting from `2`, so all methods are suspicious and removed. Return an empty array `[]`.

---

### Constraints

- $1 \le n \le 10^5$
- $0 \le k \le n - 1$
- $0 \le \text{invocations.length} \le 2 \times 10^5$
- $\text{invocations}[i] = [a_i, b_i]$
- $0 \le a_i, b_i \le n - 1$
- $a_i \ne b_i$
- All invocation pairs are unique.

---

## Topics and Tags

- **Array**
- **Graph**
- **Breadth-First Search**
- **Depth-First Search**

---

## Intuition and Approach

### 1. Reachability & Finding the Suspicious Component:
The problem defines suspicious methods as method `k` and any method reachable from `k` following directed invocation edges ($u \to v$).
- Build an adjacency list `graph` from the `invocations` array.
- Run a standard **Breadth-First Search (BFS)** or **Depth-First Search (DFS)** starting from node `k`.
- Maintain a boolean array `suspicious[n]`. Mark all visited vertices as suspicious.

### 2. Validating Removal Condition (Isolation Check):
A group of methods can only be deleted if no external method invokes any method inside the group.
- Iterate through each invocation edge $(a, b)$ in `invocations`:
  - If `!suspicious[a] && suspicious[b]`:
    - Method `a` is **not suspicious**, but it calls method `b` which is **suspicious**.
    - This violates the removal safety rule!
    - We must abort removal and return all original methods `[0, 1, ..., n - 1]`.

### 3. Collecting the Remaining Methods:
- If all edges pass the verification check without any external incoming calls into the suspicious set, it is completely safe to delete all suspicious methods.
- Collect and return all vertices $i$ where `!suspicious[i]`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(V + E) = \mathcal{O}(n + m)$
  - Building the adjacency list takes $\mathcal{O}(m)$ time.
  - BFS traverses each reachable vertex and edge at most once $\implies \mathcal{O}(n + m)$ time.
  - The validation loop scans all $m$ edges in $\mathcal{O}(m)$ time.
  - With $n \le 10^5$ and $m \le 2 \times 10^5$, total operations $\le 3 \times 10^5$, executing in $< 35\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(n + m)$
  - The adjacency list representation stores $n$ vertices and $m$ directed edges.
  - The BFS queue and `suspicious` boolean array require $\mathcal{O}(n)$ additional memory.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
