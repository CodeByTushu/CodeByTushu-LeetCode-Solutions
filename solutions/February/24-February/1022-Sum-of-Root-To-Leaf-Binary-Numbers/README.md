# LeetCode 1022: Sum of Root To Leaf Binary Numbers

- **Publication Date:** 24 February 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/sum-of-root-to-leaf-binary-numbers/](https://leetcode.com/problems/sum-of-root-to-leaf-binary-numbers/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/Hg9QT2_Jq30?si=kSLv23RshOsewNlS)

---

## Problem Summary

You are given the `root` of a binary tree where each node has a value `0` or `1`. Each root-to-leaf path represents a binary number starting with the most significant bit.

For example, if the path is $0 \to 1 \to 1 \to 0 \to 1$, this represents the binary number $01101_2 = 13$.

For all leaves in the tree, consider the numbers represented by the path from the root to that leaf. Return the sum of these numbers.

---

### Examples

#### Example 1:
- **Input:** `root = [1,0,1,0,1,0,1]`
- **Output:** `22`
- **Explanation:**
  - Path 1: $1 \to 0 \to 0 = 100_2 = 4$
  - Path 2: $1 \to 0 \to 1 = 101_2 = 5$
  - Path 3: $1 \to 1 \to 0 = 110_2 = 6$
  - Path 4: $1 \to 1 \to 1 = 111_2 = 7$
  - Total Sum = $4 + 5 + 6 + 7 = 22$.

#### Example 2:
- **Input:** `root = [0]`
- **Output:** `0`

---

### Constraints

- The number of nodes in the tree is in the range $[1, 1000]$.
- `Node.val` is either `0` or `1`.

---

## Topics and Tags

- **Primary Tags:** Tree / Binary Tree, Breadth-First Search / Depth-First Search
- **Secondary Tags:** Bit Manipulation

---

## Detailed Algorithm Walkthrough

### 1. Incremental Binary Number Construction

As we traverse down the tree from the root towards any leaf:
- Each step to a child shifts the binary number accumulated so far to the left by 1 bit (multiplying by 2).
- The current node's bit value is appended to the least significant bit:
  $$\text{current} = (\text{current} \ll 1) \ | \ \text{node.val}$$

### 2. Recursive Depth-First Search (DFS)

Using standard pre-order DFS:
1. **Base Case (Null Node):** If `node == null`, it contributes nothing to the sum, so return `0`.
2. **Update Value:** Compute $\text{current} = (\text{current} \ll 1) \ | \ \text{node.val}$.
3. **Leaf Node Check:** If `node.left == null` and `node.right == null`, we have reached a leaf! The accumulated binary value represents the complete root-to-leaf integer; return `current`.
4. **Internal Node:** Recursively calculate the sum from both left and right subtrees:
   $$\text{dfs}(\text{node.left}, \text{current}) + \text{dfs}(\text{node.right}, \text{current})$$

This clean recursive strategy visits each node exactly once with minimal overhead and zero auxiliary collections.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$, where $N$ is the number of nodes in the binary tree ($N \le 1000$). Every node is visited once and constant-time bitwise operations are performed.
- **Auxiliary Space Complexity:** $\mathcal{O}(H)$, where $H$ is the height of the tree, representing the maximum call stack depth. In the worst case (skewed tree), $H = \mathcal{O}(N)$; for a balanced tree, $H = \mathcal{O}(\log N)$.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 1022 - Sum of Root To Leaf Binary Numbers
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */

/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public int sumRootToLeaf(TreeNode root) {
        return dfs(root, 0);
    }

    private int dfs(TreeNode node, int current) {
        if (node == null) {
            return 0;
        }

        current = (current << 1) | node.val;

        // Leaf node reached
        if (node.left == null && node.right == null) {
            return current;
        }

        return dfs(node.left, current) + dfs(node.right, current);
    }
}
```

### Python
```python
"""
Problem: LeetCode 1022 - Sum of Root To Leaf Binary Numbers
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""

from typing import Optional

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def sumRootToLeaf(self, root: Optional[TreeNode]) -> int:
        def dfs(node: Optional[TreeNode], current: int) -> int:
            if not node:
                return 0

            current = (current << 1) | node.val

            if not node.left and not node.right:
                return current

            return dfs(node.left, current) + dfs(node.right, current)

        return dfs(root, 0)
```

### C++
```cpp
/**
 * Problem: LeetCode 1022 - Sum of Root To Leaf Binary Numbers
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */

/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int sumRootToLeaf(TreeNode* root) {
        return dfs(root, 0);
    }

private:
    int dfs(TreeNode* node, int current) {
        if (!node) {
            return 0;
        }

        current = (current << 1) | node->val;

        if (!node->left && !node->right) {
            return current;
        }

        return dfs(node->left, current) + dfs(node->right, current);
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 1022 - Sum of Root To Leaf Binary Numbers
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumRootToLeaf = function(root) {
    function dfs(node, current) {
        if (!node) {
            return 0;
        }

        current = (current << 1) | node.val;

        if (!node.left && !node.right) {
            return current;
        }

        return dfs(node.left, current) + dfs(node.right, current);
    }

    return dfs(root, 0);
};
```
