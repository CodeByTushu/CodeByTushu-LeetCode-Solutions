# LeetCode 1382: Balance a Binary Search Tree

- **Publication Date:** 09 February 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/balance-a-binary-search-tree/](https://leetcode.com/problems/balance-a-binary-search-tree/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/Ldfk-A3PtDY?si=7yOq7Ez0qjQvfbxY)

---

## Problem Summary

Given the `root` of a binary search tree, return a **balanced** binary search tree with the same node values. If there is more than one answer, return **any of them**.

A binary search tree is **balanced** if the depth of the two subtrees of every node never differs by more than 1.

---

### Examples

#### Example 1:
- **Input:** `root = [1, null, 2, null, 3, null, 4, null, null]`
- **Output:** `[2, 1, 3, null, null, null, 4]`
- **Explanation:**
  - The input tree is completely skewed like a linked list with depth 4.
  - The output tree is balanced with root 2, left child 1, and right child 3 (which has right child 4).
  - Another valid balanced BST representation is `[3, 1, 4, null, 2]`.

#### Example 2:
- **Input:** `root = [2, 1, 3]`
- **Output:** `[2, 1, 3]`
- **Explanation:**
  - The tree is already balanced, so returning it directly or reconstructing it is valid.

---

### Constraints

- The number of nodes in the tree is in the range $[1, 10^4]$.
- $1 \le \text{Node.val} \le 10^5$

---

## Topics and Tags

- **Primary Tags:** Tree, Binary Tree, DFS
- **Secondary Tags:** Recursion, Array

---

## Detailed Algorithm Walkthrough

### 1. In-Order Traversal Invariant

An **in-order traversal** (Left $\to$ Root $\to$ Right) of any valid Binary Search Tree visits nodes in strictly increasing sorted order.
- By traversing the input BST with in-order DFS, we collect all node values into an array/list `sortedVals` in $\mathcal{O}(n)$ time.
- The resulting list contains the exact set of elements in strictly sorted order.

### 2. Balanced BST Construction via Divide and Conquer

Given a sorted list of length $n$, we construct a height-balanced BST recursively using divide and conquer:
1. Identify the midpoint element `mid = left + (right - left) / 2`.
2. The midpoint element is chosen as the root of the current subtree. This guarantees that roughly half the remaining elements lie in the left subtree and the other half lie in the right subtree.
3. Recursively construct:
   - `node.left = buildBalancedBST(sortedVals, left, mid - 1)`
   - `node.right = buildBalancedBST(sortedVals, mid + 1, right)`
4. Base case: If `left > right`, return `null`.

Because subproblem sizes differ by at most 1 at each step, the resulting binary search tree is guaranteed to have minimal depth $\lceil \log_2(n + 1) \rceil$, strictly satisfying the height-balanced requirement.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$, where $n$ is the total number of nodes in the BST.
  - In-order traversal visits each of the $n$ nodes once: $\mathcal{O}(n)$.
  - Divide-and-conquer tree reconstruction creates each of the $n$ nodes once: $\mathcal{O}(n)$.
  - Total time complexity: $\mathcal{O}(n)$.
- **Auxiliary Space Complexity:** $\mathcal{O}(n)$ auxiliary space to store the $n$ elements in the sorted list, alongside $\mathcal{O}(\log n)$ call stack frames for the balanced recursive tree construction (or $\mathcal{O}(n)$ worst-case stack space during initial in-order traversal of a skewed tree).

---

## Source Code

### Java
```java
import java.util.ArrayList;
import java.util.List;

class Solution {
    public TreeNode balanceBST(TreeNode root) {
        List<Integer> sortedVals = new ArrayList<>();
        inorder(root, sortedVals);
        return buildBalancedBST(sortedVals, 0, sortedVals.size() - 1);
    }

    private void inorder(TreeNode node, List<Integer> sortedVals) {
        if (node == null) {
            return;
        }
        inorder(node.left, sortedVals);
        sortedVals.add(node.val);
        inorder(node.right, sortedVals);
    }

    private TreeNode buildBalancedBST(List<Integer> sortedVals, int left, int right) {
        if (left > right) {
            return null;
        }

        int mid = left + (right - left) / 2;
        TreeNode node = new TreeNode(sortedVals.get(mid));
        node.left = buildBalancedBST(sortedVals, left, mid - 1);
        node.right = buildBalancedBST(sortedVals, mid + 1, right);

        return node;
    }
}
```

### Python
```python
from typing import Optional, List

class Solution:
    def balanceBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        sorted_vals: List[int] = []

        def inorder(node: Optional[TreeNode]) -> None:
            if not node:
                return
            inorder(node.left)
            sorted_vals.append(node.val)
            inorder(node.right)

        inorder(root)

        def build_balanced_bst(left: int, right: int) -> Optional[TreeNode]:
            if left > right:
                return None
            mid = left + (right - left) // 2
            node = TreeNode(sorted_vals[mid])
            node.left = build_balanced_bst(left, mid - 1)
            node.right = build_balanced_bst(mid + 1, right)
            return node

        return build_balanced_bst(0, len(sorted_vals) - 1)
```

### C++
```cpp
#include <vector>

using namespace std;

class Solution {
public:
    TreeNode* balanceBST(TreeNode* root) {
        vector<int> sortedVals;
        inorder(root, sortedVals);
        return buildBalancedBST(sortedVals, 0, sortedVals.size() - 1);
    }

private:
    void inorder(TreeNode* node, vector<int>& sortedVals) {
        if (!node) {
            return;
        }
        inorder(node->left, sortedVals);
        sortedVals.push_back(node->val);
        inorder(node->right, sortedVals);
    }

    TreeNode* buildBalancedBST(const vector<int>& sortedVals, int left, int right) {
        if (left > right) {
            return nullptr;
        }

        int mid = left + (right - left) / 2;
        TreeNode* node = new TreeNode(sortedVals[mid]);
        node->left = buildBalancedBST(sortedVals, left, mid - 1);
        node->right = buildBalancedBST(sortedVals, mid + 1, right);

        return node;
    }
};
```

### JavaScript
```javascript
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var balanceBST = function(root) {
    const sortedVals = [];

    const inorder = function(node) {
        if (!node) return;
        inorder(node.left);
        sortedVals.push(node.val);
        inorder(node.right);
    };

    inorder(root);

    const buildBalancedBST = function(left, right) {
        if (left > right) return null;

        const mid = left + Math.floor((right - left) / 2);
        const node = new TreeNode(sortedVals[mid]);
        node.left = buildBalancedBST(left, mid - 1);
        node.right = buildBalancedBST(mid + 1, right);

        return node;
    };

    return buildBalancedBST(0, sortedVals.length - 1);
};
```
