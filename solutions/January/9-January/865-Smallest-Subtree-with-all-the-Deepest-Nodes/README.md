# LeetCode 865: Smallest Subtree with all the Deepest Nodes

- **Publication Date:** 09 January 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/smallest-subtree-with-all-the-deepest-nodes/](https://leetcode.com/problems/smallest-subtree-with-all-the-deepest-nodes/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/8VJ7Lkl7FhA?si=TgQW3733d4rinTUq)

---

## Problem Summary

Given the `root` of a binary tree, the depth of each node is **the shortest distance to the root**.

Return *the smallest subtree such that it contains all the deepest nodes in the original tree*.

A node is called **the deepest** if it has the largest depth possible among any node in the entire tree.

The **subtree** of a node is a tree consisting of that node, plus the set of all descendants of that node.

---

### Examples

#### Example 1:
- **Input:** `root = [3,5,1,6,2,0,8,null,null,7,4]`
- **Output:** `[2,7,4]`
- **Explanation:**
  - The deepest nodes in the tree are `7` and `4` (both at depth 3).
  - The lowest common ancestor (smallest subtree root) containing both `7` and `4` is node `2`.

#### Example 2:
- **Input:** `root = [1]`
- **Output:** `[1]`
- **Explanation:** The root is the only and deepest node in the tree.

#### Example 3:
- **Input:** `root = [0,1,3,null,2]`
- **Output:** `[2]`
- **Explanation:** The deepest node in the tree is `2`. The subtree of node `2` is the smallest subtree containing it.

---

### Constraints

- The number of nodes in the tree will be in the range $[1, 500]$.
- $0 \le \text{Node.val} \le 500$
- The values of the nodes in the tree are **unique**.

> [!NOTE]
> This problem is identical to LeetCode 1123: *Lowest Common Ancestor of Deepest Leaves*.

---

## Topics and Tags

- **Hash Table**
- **Tree**
- **Depth-First Search**
- **Breadth-First Search**
- **Binary Tree**

---

## Approach & Intuition

### 1. Post-Order DFS / Lowest Common Ancestor (LCA) of Deepest Leaves

The problem asks for the lowest common ancestor of all nodes situated at the tree's maximum depth.

We can solve this in a single post-order Depth-First Search (DFS) traversal where each recursive call on a node $u$ returns a pair:
`{depth, lcaNode}`:
1. **Base Case:** If `node == null`, return depth `0` and `node = null`.
2. **Recursive Traversal:**
   - Recursively compute `{leftDepth, leftLCA} = dfs(node.left)`.
   - Recursively compute `{rightDepth, rightLCA} = dfs(node.right)`.
3. **Deciding the LCA:**
   - **`leftDepth == rightDepth`:** The deepest nodes are split across both left and right subtrees. Hence, the current `node` itself is their lowest common ancestor! Return `{leftDepth + 1, node}`.
   - **`leftDepth > rightDepth`:** All deepest nodes reside strictly in the left subtree. Return `{leftDepth + 1, leftLCA}`.
   - **`rightDepth > leftDepth`:** All deepest nodes reside strictly in the right subtree. Return `{rightDepth + 1, rightLCA}`.

At the end of the root call, the `lcaNode` returned represents the root of the smallest subtree containing all deepest nodes.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$, where $N$ is the number of nodes in the binary tree. Each node is visited once during post-order traversal.
- **Auxiliary Space Complexity:** $\mathcal{O}(H)$, where $H$ is the height of the tree ($\mathcal{O}(N)$ in the worst case for a skewed tree, $\mathcal{O}(\log N)$ for a balanced tree) to support the recursion stack.

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
