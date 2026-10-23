# LeetCode 1339: Maximum Product of Splitted Binary Tree

- **Publication Date:** 07 January 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/maximum-product-of-splitted-binary-tree/](https://leetcode.com/problems/maximum-product-of-splitted-binary-tree/)
- **YouTube Solution:** *Coming Soon* ⏳

---

## Problem Summary

Given the `root` of a binary tree, split the binary tree into two subtrees by removing one edge such that the product of the sums of the subtrees is maximized.

Return *the maximum product of the sums of the two subtrees*. Since the answer may be too large, return it **modulo $10^9 + 7$**.

**Note** that you need to maximize the answer before taking the modulo and not after taking it.

---

### Examples

#### Example 1:
- **Input:** `root = [1, 2, 3, 4, 5, 6]`
- **Output:** `110`
- **Explanation:** Remove the edge between node 1 and node 2 to obtain two binary trees with sums $11$ and $10$. Their product is $11 \times 10 = 110$.

#### Example 2:
- **Input:** `root = [1, null, 2, 3, 4, null, null, 5, 6]`
- **Output:** `90`
- **Explanation:** Remove the edge between node 2 and node 4 to obtain two binary trees with sums $15$ and $6$. Their product is $15 \times 6 = 90$.

---

### Constraints

- The number of nodes in the tree is in the range $[2, 5 \times 10^4]$.
- $1 \le \text{Node.val} \le 10^4$

---

## Topics and Tags

- **Tree**
- **Depth-First Search**
- **Binary Tree**

---

## Approach & Intuition

### 1. Subtree Sum Separation Principle

- Cutting any edge above a node $u$ isolates the subtree rooted at $u$ as one component.
- If $S_{\text{total}}$ is the sum of all node values in the entire tree and $S(u)$ is the sum of all node values in the subtree rooted at $u$, then:
  - First component sum = $S(u)$
  - Second component sum = $S_{\text{total}} - S(u)$
- The resulting product is:
  $$\text{Product} = S(u) \times (S_{\text{total}} - S(u))$$
- We collect all subtree sums $S(u)$ using a post-order Depth-First Search (DFS) traversal.
- After calculating $S_{\text{total}}$, we iterate through all recorded subtree sums and track the maximum product $\max(S(u) \times (S_{\text{total}} - S(u)))$.
- Finally, the maximal product is returned modulo $10^9 + 7$.

### 2. 64-Bit Integer Arithmetic

- With up to $50,000$ nodes and node values up to $10^4$, $S_{\text{total}} \le 5 \times 10^8$.
- The maximum product can reach $(2.5 \times 10^8)^2 \approx 6.25 \times 10^{16}$, which fits within a standard 64-bit integer (`long` / `long long` / `BigInt`).

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$, where $N$ is the number of nodes in the binary tree. A single DFS visits each node once, followed by a linear pass over the $N$ subtree sums.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$, to store the recursive call stack and the array of subtree sums.

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
