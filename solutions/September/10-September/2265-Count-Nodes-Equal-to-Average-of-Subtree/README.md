# LeetCode 2265: Count Nodes Equal to Average of Subtree

- **Publication Date:** 10 September 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/count-nodes-equal-to-average-of-subtree/](https://leetcode.com/problems/count-nodes-equal-to-average-of-subtree/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/zLxyNlF6FUs?si=YcvHdbwd0A0MGDao)

---

## Problem Summary

Given the `root` of a binary tree, return the number of nodes where the value of the node is equal to the **average** of the values in its **subtree**.

**Note:**
- The **average** of $n$ elements is the sum of the $n$ elements divided by $n$ and **rounded down** to the nearest integer (integer division).
- A **subtree** of `root` is a tree consisting of `root` and all of its descendants.

---

### Examples

#### Example 1:
```text
        4
      /   \
     8     5
    / \     \
   0   1     6
```
- **Input:** `root = [4,8,5,0,1,null,6]`
- **Output:** `5`
- **Explanation:**
  - For the node with value 4: The average of its subtree is $(4 + 8 + 5 + 0 + 1 + 6) / 6 = 24 / 6 = 4$. (Matches node value: count = 1)
  - For the node with value 5: The average of its subtree is $(5 + 6) / 2 = 11 / 2 = 5$. (Matches node value: count = 2)
  - For the node with value 0: The average of its subtree is $0 / 1 = 0$. (Matches node value: count = 3)
  - For the node with value 1: The average of its subtree is $1 / 1 = 1$. (Matches node value: count = 4)
  - For the node with value 6: The average of its subtree is $6 / 1 = 6$. (Matches node value: count = 5)
  - For the node with value 8: The average of its subtree is $(8 + 0 + 1) / 3 = 9 / 3 = 3 \ne 8$.

#### Example 2:
```text
  1
```
- **Input:** `root = [1]`
- **Output:** `1`
- **Explanation:** For the node with value 1: The average of its subtree is $1 / 1 = 1$.

---

### Constraints

- The number of nodes in the tree is in the range $[1, 1000]$.
- $0 \le \text{Node.val} \le 1000$

---

## Topics and Tags

- **Tree**
- **Binary Tree**
- **Depth-First Search**

---

## Approach & Intuition (Bottom-Up Post-Order DFS)

1. **Subtree Property Aggregation**:
   - To compute the average of any node's subtree, we need two pieces of information from its subtree:
     1. The **sum** of all node values in that subtree.
     2. The total **count** of nodes in that subtree.
   - If we traverse top-down, computing the subtree sum and count repeatedly for every node would result in an inefficient $\mathcal{O}(N^2)$ algorithm.
   - By adopting a **bottom-up post-order depth-first traversal (DFS)**, every node receives the aggregate `(sum, count)` from its left child and right child in $\mathcal{O}(1)$ time.

2. **Recursive Transition**:
   - Base Case: If `node == null`, return `(sum = 0, count = 0)`.
   - Recursively call DFS on the left subtree: `[leftSum, leftCount] = dfs(node.left)`.
   - Recursively call DFS on the right subtree: `[rightSum, rightCount] = dfs(node.right)`.
   - Current subtree metrics:
     $$\text{totalSum} = \text{leftSum} + \text{rightSum} + \text{node.val}$$
     $$\text{totalCount} = \text{leftCount} + \text{rightCount} + 1$$
   - Average: $\lfloor \text{totalSum} / \text{totalCount} \rfloor$.
   - If $\lfloor \text{totalSum} / \text{totalCount} \rfloor == \text{node.val}$, increment the global answer counter.
   - Return `(totalSum, totalCount)` to the parent caller.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - Every node in the binary tree is visited exactly once during the post-order DFS traversal.
- **Auxiliary Space Complexity:** $\mathcal{O}(H)$
  - Memory consumed by the recursion call stack is proportional to the tree height $H$.
  - In a balanced binary tree, $H = \mathcal{O}(\log N)$. In the worst-case (skewed tree), $H = \mathcal{O}(N)$.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/zLxyNlF6FUs?si=YcvHdbwd0A0MGDao](https://youtu.be/zLxyNlF6FUs?si=YcvHdbwd0A0MGDao)

---

## Resources & Community

- 🌐 **Platform Website:** [https://codebytushu.com/](https://codebytushu.com/)
- 💻 **All LeetCode Solutions:** [https://codebytushu.com/Leetcode/](https://codebytushu.com/Leetcode/)
- 📂 **GitHub Repository:** [https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions](https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions)
