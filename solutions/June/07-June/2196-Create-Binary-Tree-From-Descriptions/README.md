# LeetCode 2196: Create Binary Tree From Descriptions

- **Publication Date:** 07 June 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/create-binary-tree-from-descriptions/](https://leetcode.com/problems/create-binary-tree-from-descriptions/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/UaDBQ6OUJIA?si=szg_mC4SdhJGXRDi)

---

## Problem Summary

You are given a 2D integer array `descriptions` where $\text{descriptions}[i] = [\text{parent}_i, \text{child}_i, \text{isLeft}_i]$ indicates that $\text{parent}_i$ is the parent of $\text{child}_i$ in a binary tree of **unique** values. Furthermore:
- If $\text{isLeft}_i == 1$, then $\text{child}_i$ is the left child of $\text{parent}_i$.
- If $\text{isLeft}_i == 0$, then $\text{child}_i$ is the right child of $\text{parent}_i$.

Construct the binary tree described by `descriptions` and return its **root**.

The test cases will be generated such that the binary tree is **valid**.

---

### Examples

#### Example 1:
```text
        50
       /  \
     20    80
    /  \   /
   15  17 19
```
- **Input:** `descriptions = [[20,15,1],[20,17,0],[50,20,1],[50,80,0],[80,19,1]]`
- **Output:** `[50,20,80,15,17,19]`
- **Explanation:** The root node is the node with value `50` since it has no parent.

#### Example 2:
```text
     1
    /
   2
    \
     3
    /
   4
```
- **Input:** `descriptions = [[1,2,1],[2,3,0],[3,4,1]]`
- **Output:** `[1,2,null,null,3,4]`
- **Explanation:** The root node is the node with value `1` since it has no parent.

---

### Constraints

- $1 \le \text{descriptions.length} \le 10^4$
- $\text{descriptions}[i]\text{.length} == 3$
- $1 \le \text{parent}_i, \text{child}_i \le 10^5$
- $0 \le \text{isLeft}_i \le 1$
- The binary tree described by `descriptions` is valid.

---

## Algorithmic Approach

### 1. Hash Map for Node Tracking & Hash Set for Child Identification
A binary tree structure requires two things:
1. Connecting each parent node to its appropriate child node (`left` or `right`).
2. Finding which node acts as the **root**.

#### Step-by-Step Construction:
1. **Node Registry (`map`):**
   - Since values are unique, we map each integer value to its instantiated `TreeNode` object (`val -> TreeNode(val)`).
   - For every entry $[\text{parent}, \text{child}, \text{isLeft}]$:
     - Instantiate or retrieve `TreeNode(parent)` and `TreeNode(child)`.
     - If $\text{isLeft} == 1$, link `parentNode.left = childNode`.
     - Otherwise, link `parentNode.right = childNode`.
2. **Child Tracking (`children` set):**
   - Insert every `child` value into a hash set `children`.
3. **Identifying the Tree Root:**
   - In any valid tree with $N$ relationships and $N + 1$ unique nodes, every node except the root has exactly one incoming directed edge (i.e., appears as a child).
   - The root is the unique node that is never designated as a child.
   - We scan the parent values of `descriptions` once more; the first parent not contained in `children` is our root node.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N)$ | We iterate through the $N$ description entries twice. Each hash map and hash set insertion/lookup operates in $\mathcal{O}(1)$ average time. |
| **Auxiliary Space** | $\mathcal{O}(N)$ | The hash map stores up to $N + 1$ node references and the hash set stores up to $N$ child values. |

---

## Multi-Language Implementations

### Java
```java
import java.util.*;

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
    public TreeNode createBinaryTree(int[][] descriptions) {
        Map<Integer, TreeNode> map = new HashMap<>();
        Set<Integer> children = new HashSet<>();

        for (int[] d : descriptions) {

            int parent = d[0];
            int child = d[1];
            int isLeft = d[2];

            map.putIfAbsent(parent, new TreeNode(parent));
            map.putIfAbsent(child, new TreeNode(child));

            TreeNode parentNode = map.get(parent);
            TreeNode childNode = map.get(child);

            if (isLeft == 1) {
                parentNode.left = childNode;
            } else {
                parentNode.right = childNode;
            }

            children.add(child);
        }

        for (int[] d : descriptions) {
            int parent = d[0];

            if (!children.contains(parent)) {
                return map.get(parent);
            }
        }

        return null;
    }
}
```

### Python
```python
from typing import List, Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def createBinaryTree(self, descriptions: List[List[int]]) -> Optional[TreeNode]:
        node_map = {}
        children = set()

        for parent, child, is_left in descriptions:
            if parent not in node_map:
                node_map[parent] = TreeNode(parent)
            if child not in node_map:
                node_map[child] = TreeNode(child)

            if is_left == 1:
                node_map[parent].left = node_map[child]
            else:
                node_map[parent].right = node_map[child]

            children.add(child)

        for parent, _, _ in descriptions:
            if parent not in children:
                return node_map[parent]

        return None
```

### C++
```cpp
#include <vector>
#include <unordered_map>
#include <unordered_set>

using namespace std;

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
    TreeNode* createBinaryTree(vector<vector<int>>& descriptions) {
        unordered_map<int, TreeNode*> nodeMap;
        unordered_set<int> children;

        for (const auto& d : descriptions) {
            int parent = d[0];
            int child = d[1];
            int isLeft = d[2];

            if (nodeMap.find(parent) == nodeMap.end()) {
                nodeMap[parent] = new TreeNode(parent);
            }
            if (nodeMap.find(child) == nodeMap.end()) {
                nodeMap[child] = new TreeNode(child);
            }

            if (isLeft == 1) {
                nodeMap[parent]->left = nodeMap[child];
            } else {
                nodeMap[parent]->right = nodeMap[child];
            }

            children.insert(child);
        }

        for (const auto& d : descriptions) {
            int parent = d[0];
            if (children.find(parent) == children.end()) {
                return nodeMap[parent];
            }
        }

        return nullptr;
    }
};
```

### JavaScript
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[][]} descriptions
 * @return {TreeNode}
 */
var createBinaryTree = function(descriptions) {
    const map = new Map();
    const children = new Set();

    for (const [parent, child, isLeft] of descriptions) {
        if (!map.has(parent)) {
            map.set(parent, new TreeNode(parent));
        }
        if (!map.has(child)) {
            map.set(child, new TreeNode(child));
        }

        const parentNode = map.get(parent);
        const childNode = map.get(child);

        if (isLeft === 1) {
            parentNode.left = childNode;
        } else {
            parentNode.right = childNode;
        }

        children.add(child);
    }

    for (const [parent] of descriptions) {
        if (!children.has(parent)) {
            return map.get(parent);
        }
    }

    return null;
};
```
