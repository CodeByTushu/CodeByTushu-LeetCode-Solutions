# LeetCode 1161: Maximum Level Sum of a Binary Tree

- **Publication Date:** 06 January 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/](https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/)
- **YouTube Solution:** *Coming Soon* ⏳

---

## Problem Summary

Given the `root` of a binary tree, the level of its root is `1`, the level of its children is `2`, and so on.

Return the **smallest level** `x` such that the sum of all the values of nodes at level `x` is **maximal**.

---

### Examples

#### Example 1:
- **Input:** `root = [1, 7, 0, 7, -8, null, null]`
- **Output:** `2`
- **Explanation:**
  - Level 1 sum = $1$.
  - Level 2 sum = $7 + 0 = 7$.
  - Level 3 sum = $7 + (-8) = -1$.
  So we return the level with the maximum sum which is level $2$.

#### Example 2:
- **Input:** `root = [989, null, 10250, 98693, -89388, null, null, null, -32127]`
- **Output:** `2`

---

### Constraints

- The number of nodes in the tree is in the range $[1, 10^4]$.
- $-10^5 \le \text{Node.val} \le 10^5$

---

## Topics and Tags

- **Tree**
- **Depth-First Search**
- **Breadth-First Search**
- **Binary Tree**

---

## Approach & Intuition

### 1. Breadth-First Search (Level-Order Traversal)

- **Level-by-Level Accumulation:**
  We need to compute the sum of values at each individual level $x \ge 1$ of the binary tree. A Breadth-First Search (BFS) using a queue is the most natural fit for processing tree nodes level by level.
- **Handling Ties for Minimal Level Index:**
  The problem states that if multiple levels achieve the same maximal sum, we must return the **smallest level number**.
  By using a strict inequality (`levelSum > maxSum`), we update `maxLevel` only when a strictly higher sum is discovered. Any subsequent level that merely ties the existing maximum sum will not overwrite the earlier (smaller) level index.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$, where $N$ is the number of nodes in the binary tree. Every node is enqueued and dequeued exactly once.
- **Auxiliary Space Complexity:** $\mathcal{O}(W)$, where $W$ is the maximum width (maximum number of nodes at any level) of the binary tree. In the worst case (a full binary tree), $W = \mathcal{O}(N)$.

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
