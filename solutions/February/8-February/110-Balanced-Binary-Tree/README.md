# LeetCode 110: Balanced Binary Tree

- **Publication Date:** 08 February 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/balanced-binary-tree/](https://leetcode.com/problems/balanced-binary-tree/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

Given a binary tree, determine if it is **height-balanced**.

A **height-balanced** binary tree is defined as a binary tree in which the depth/height of the two subtrees of every node never differs by more than one:
$$|\text{height}(\text{left}) - \text{height}(\text{right})| \le 1$$

---

### Examples

#### Example 1:
- **Input:** `root = [3, 9, 20, null, null, 15, 7]`
- **Output:** `true`
- **Explanation:**
  - Left subtree of 3 has height 1 (node 9).
  - Right subtree of 3 has height 2 (node 20 with children 15, 7).
  - Height difference $|1 - 2| = 1 \le 1$.
  - Node 20 has subtrees of height 1 and 1 ($|1 - 1| = 0 \le 1$).
  - Every node satisfies the height-balanced condition, so return `true`.

#### Example 2:
- **Input:** `root = [1, 2, 2, 3, 3, null, null, 4, 4]`
- **Output:** `false`
- **Explanation:**
  - The left subtree of node 1 has height 3 (nodes 2 $\to$ 3 $\to$ 4).
  - The right subtree of node 1 has height 1 (node 2).
  - Height difference is $|3 - 1| = 2 > 1$, which is not balanced. Return `false`.

#### Example 3:
- **Input:** `root = []`
- **Output:** `true`
- **Explanation:**
  - An empty tree has height 0 and is vacuously height-balanced.

---

### Constraints

- The number of nodes in the tree is in the range $[0, 5000]$.
- $-10^4 \le \text{Node.val} \le 10^4$

---

## Topics and Tags

- **Primary Tags:** Tree, Binary Tree, DFS
- **Secondary Tags:** Recursion

---

## Detailed Algorithm Walkthrough

### 1. Naive Top-Down vs. Optimal Bottom-Up

- **Top-Down Approach ($\mathcal{O}(n^2)$):**
  Calculating tree height at every node separately causes repeated traversals of subtrees. In a skewed tree, this degrades performance to quadratic time $\mathcal{O}(n^2)$.
- **Bottom-Up Post-Order DFS ($\mathcal{O}(n)$):**
  We traverse from leaves to the root (post-order traversal: left, right, root). Each node returns its height to its parent. If any subtree is found to be unbalanced, we immediately propagate a sentinel value `-1` up the call stack, short-circuiting unnecessary computation.

### 2. Recursive Invariant & Sentinel Return

Define a recursive helper `checkHeight(node)`:
1. **Base Case:** If `node == null`, return `0`.
2. **Left Subtree:** Recursively compute `leftHeight = checkHeight(node.left)`.
   - If `leftHeight == -1`, propagate `-1` immediately.
3. **Right Subtree:** Recursively compute `rightHeight = checkHeight(node.right)`.
   - If `rightHeight == -1`, propagate `-1` immediately.
4. **Balance Check:**
   - If $|leftHeight - rightHeight| > 1$, the current subtree is unbalanced $\to$ return `-1`.
   - Otherwise, return the current node's height:
     $$1 + \max(leftHeight, rightHeight)$$

Finally, `isBalanced(root)` returns `true` if and only if `checkHeight(root) != -1`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$, where $n$ is the total number of nodes in the binary tree. Every node is visited at most once during the bottom-up post-order traversal.
- **Auxiliary Space Complexity:** $\mathcal{O}(h)$, where $h$ is the height of the tree, representing the recursion stack depth. In the best/balanced case $h = \mathcal{O}(\log n)$, and in the worst case (completely skewed tree) $h = \mathcal{O}(n)$.

---

## Source Code

### Java
```java
class Solution {
    public boolean isBalanced(TreeNode root) {
        return checkHeight(root) != -1;
    }

    private int checkHeight(TreeNode node) {
        if (node == null) {
            return 0;
        }

        int leftHeight = checkHeight(node.left);
        if (leftHeight == -1) {
            return -1;
        }

        int rightHeight = checkHeight(node.right);
        if (rightHeight == -1) {
            return -1;
        }

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1;
        }

        return 1 + Math.max(leftHeight, rightHeight);
    }
}
```

### Python
```python
from typing import Optional

class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        def check_height(node: Optional[TreeNode]) -> int:
            if not node:
                return 0

            left_height = check_height(node.left)
            if left_height == -1:
                return -1

            right_height = check_height(node.right)
            if right_height == -1:
                return -1

            if abs(left_height - right_height) > 1:
                return -1

            return 1 + max(left_height, right_height)

        return check_height(root) != -1
```

### C++
```cpp
class Solution {
public:
    bool isBalanced(TreeNode* root) {
        return checkHeight(root) != -1;
    }

private:
    int checkHeight(TreeNode* node) {
        if (!node) {
            return 0;
        }

        int leftHeight = checkHeight(node->left);
        if (leftHeight == -1) {
            return -1;
        }

        int rightHeight = checkHeight(node->right);
        if (rightHeight == -1) {
            return -1;
        }

        if (abs(leftHeight - rightHeight) > 1) {
            return -1;
        }

        return 1 + max(leftHeight, rightHeight);
    }
};
```

### JavaScript
```javascript
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
    const checkHeight = function(node) {
        if (node === null) {
            return 0;
        }

        const leftHeight = checkHeight(node.left);
        if (leftHeight === -1) {
            return -1;
        }

        const rightHeight = checkHeight(node.right);
        if (rightHeight === -1) {
            return -1;
        }

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1;
        }

        return 1 + Math.max(leftHeight, rightHeight);
    };

    return checkHeight(root) !== -1;
};
```
