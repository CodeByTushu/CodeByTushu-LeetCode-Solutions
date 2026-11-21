# LeetCode 3331: Find Subtree Sizes After Changes

- **Publication Date:** 21 November 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/find-subtree-sizes-after-changes/](https://leetcode.com/problems/find-subtree-sizes-after-changes/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/rUtL-v8qYQA)

---

## 💡 Problem Summary

You are given a tree rooted at node $0$ that consists of $n$ nodes numbered from $0$ to $n - 1$. The tree is represented by an array `parent` of size $n$, where `parent[i]` is the parent of node $i$ (with `parent[0] == -1`).

You are also given a string $s$ of length $n$, where $s[i]$ is the character assigned to node $i$.

We make the following changes on the tree **one time simultaneously** for all nodes $x$ from $1$ to $n - 1$:
1. Find the **closest node** $y$ to node $x$ such that $y$ is an ancestor of $x$, and $s[x] == s[y]$.
2. If node $y$ does not exist, do nothing.
3. Otherwise, remove the edge between $x$ and its current parent, and make node $y$ the new parent of $x$ by adding an edge between them.

Return an array `answer` of size $n$ where `answer[i]` is the **size of the subtree** rooted at node $i$ in the final tree.

---

### 🧪 Examples

#### Example 1:
- **Input:** `parent = [-1,0,0,1,1,1], s = "abaabc"`
- **Output:** `[6,3,1,1,1,1]`
- **Explanation:**
  - Node $3$ has character `'a'`. The closest ancestor with character `'a'` is node $0$.
  - Therefore, the parent of node $3$ changes from node $1$ to node $0$.
  - Subtree sizes in the final tree:
    - Node $0$: $6$
    - Node $1$: $3$ (contains nodes $1, 4, 5$)
    - Nodes $2, 3, 4, 5$: $1$ each.

#### Example 2:
- **Input:** `parent = [-1,0,4,0,1], s = "abbba"`
- **Output:** `[5,2,1,1,1]`
- **Explanation:**
  - The changes happen simultaneously:
    - Node $4$ ($s[4] = \text{'a'}$): Closest ancestor with `'a'` is node $0$. Parent changes from $1$ to $0$.
    - Node $2$ ($s[2] = \text{'b'}$): Closest ancestor with `'b'` is node $1$. Parent changes from $4$ to $1$.
  - Final subtree sizes: `[5, 2, 1, 1, 1]`.

---

### 🔒 Constraints

- $n == \text{parent.length} == s.\text{length}$
- $1 \le n \le 10^5$
- $0 \le \text{parent}[i] \le n - 1$ for all $i \ge 1$
- $\text{parent}[0] == -1$
- `parent` represents a valid tree.
- $s$ consists only of lowercase English letters.

---

## 🧠 Algorithmic Approach & Key Observations

### 1. Simultaneous Changes Depend on Original Tree
All changes occur **simultaneously**, meaning new parent reassignments for all nodes depend exclusively on the **original** ancestor-descendant relationships and character values in the input tree.

### 2. Finding the Closest Same-Character Ancestor in $\mathcal{O}(1)$
While traversing the tree from root ($0$) using Depth First Search (DFS):
- Maintain an array `last[26]` initialized to `-1`, where `last[c]` stores the deepest node on the current root-to-node path carrying character `c`.
- When visiting node $u$ with character $c = s[u]$:
  - If `last[c] != -1`, then `last[c]` is the **closest ancestor** of $u$ with the identical character. Thus, `newParent[u] = last[c]`.
  - Otherwise, `newParent[u] = parent[u]`.
  - Update `last[c] = u` before traversing the children of $u$, and backtrack to restore the previous value of `last[c]` when leaving node $u$.

### 3. Iterative DFS Avoids Stack Overflow
Given $n \le 10^5$, a skewed tree (linked-list shape) can have recursion depth up to $10^5$, which causes `StackOverflowError` in Java/Python.
- We use an explicit iterative stack for the DFS traversal.
- During DFS, we also record the **preorder traversal order** of nodes.

### 4. Calculating Subtree Sizes in Reverse Preorder Traversal
Instead of explicitly rebuilding a new adjacency list and doing a second traversal:
- Initialize `size[i] = 1` for all nodes $0 \le i < n$.
- Iterate through the preorder array in **reverse order** (from leaves up to the root):
  $$\text{size}[\text{newParent}[u]] += \text{size}[u]$$
- Because reverse preorder processes descendants before their ancestors in any topological ordering, every node's full subtree size is completely accumulated before contributing to its parent.

---

## ⏱️ Complexity Analysis

| Metric | Complexity | Description |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(n)$ | Constructing adjacency lists takes $\mathcal{O}(n)$ time. Single DFS traversal takes $\mathcal{O}(n)$ time with $\mathcal{O}(1)$ ancestor lookups. Reverse preorder accumulation takes $\mathcal{O}(n)$ time. |
| **Auxiliary Space** | $\mathcal{O}(n)$ | Storing adjacency lists, stack, preorder order, and updated parents uses $\mathcal{O}(n)$ memory. The `last` lookup table requires constant $\mathcal{O}(1)$ auxiliary space ($26$ elements). |

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
/**
 * Problem: LeetCode 3331 - Find Subtree Sizes After Changes
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.Arrays;

class Solution {
    public int[] findSubtreeSizes(int[] parent, String s) {
        int n = parent.length;

        // Children ki adjacency list (linked-list style)
        int[] head = new int[n];
        int[] nxt = new int[n];
        Arrays.fill(head, -1);
        for (int i = 1; i < n; i++) {
            nxt[i] = head[parent[i]];
            head[parent[i]] = i;
        }

        int[] last = new int[26];          // last[c] = current path pe c character wala sabse nazdeeki ancestor
        Arrays.fill(last, -1);

        int[] newPar = parent.clone();     // changes ke baad parent
        int[] saved = new int[n];          // backtrack ke liye purani last[] value
        int[] order = new int[n];          // DFS preorder
        int cnt = 0;

        int[] it = head.clone();           // har node ka next child pointer
        int[] stack = new int[n];
        int sp = 0;

        // Root enter karo
        int c0 = s.charAt(0) - 'a';
        saved[0] = last[c0];
        last[c0] = 0;
        order[cnt++] = 0;
        stack[sp++] = 0;

        // Iterative DFS (n = 10^5 pe recursion se stack overflow ho sakta hai)
        while (sp > 0) {
            int x = stack[sp - 1];
            if (it[x] != -1) {
                int child = it[x];
                it[x] = nxt[child];

                int c = s.charAt(child) - 'a';
                saved[child] = last[c];
                if (last[c] != -1) newPar[child] = last[c]; // closest same-char ancestor mila

                last[c] = child;
                order[cnt++] = child;
                stack[sp++] = child;
            } else {
                sp--;
                last[s.charAt(x) - 'a'] = saved[x]; // backtrack
            }
        }

        // Subtree sizes: preorder ko reverse mein process karo (child pehle, parent baad mein)
        int[] size = new int[n];
        Arrays.fill(size, 1);
        for (int i = n - 1; i >= 1; i--) {
            int x = order[i];
            size[newPar[x]] += size[x];
        }

        return size;
    }
}
```

### 🐍 Python (Python 3)
```python
"""
Problem: LeetCode 3331 - Find Subtree Sizes After Changes
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""

from typing import List


class Solution:
    def findSubtreeSizes(self, parent: List[int], s: str) -> List[int]:
        n = len(parent)
        children = [[] for _ in range(n)]
        for i in range(1, n):
            children[parent[i]].append(i)

        new_parent = list(parent)
        last = [-1] * 26
        order = []

        # Iterative DFS to prevent recursion depth exceeded on deep trees (n <= 10^5)
        stack = [0]
        child_idx = [0] * n
        saved = [-1] * n

        c0 = ord(s[0]) - ord('a')
        saved[0] = last[c0]
        last[c0] = 0
        order.append(0)

        while stack:
            u = stack[-1]
            if child_idx[u] < len(children[u]):
                v = children[u][child_idx[u]]
                child_idx[u] += 1

                c = ord(s[v]) - ord('a')
                saved[v] = last[c]
                if last[c] != -1:
                    new_parent[v] = last[c]

                last[c] = v
                order.append(v)
                stack.append(v)
            else:
                stack.pop()
                last[ord(s[u]) - ord('a')] = saved[u]

        # Reverse preorder traversal to calculate subtree sizes from leaves to root
        size = [1] * n
        for i in range(n - 1, 0, -1):
            x = order[i]
            size[new_parent[x]] += size[x]

        return size
```

### ⚡ C++ (C++20)
```cpp
/**
 * Problem: LeetCode 3331 - Find Subtree Sizes After Changes
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    vector<int> findSubtreeSizes(vector<int>& parent, string s) {
        int n = parent.size();

        vector<vector<int>> children(n);
        for (int i = 1; i < n; i++) {
            children[parent[i]].push_back(i);
        }

        vector<int> newPar = parent;
        vector<int> last(26, -1);
        vector<int> saved(n, -1);
        vector<int> order;
        order.reserve(n);

        vector<int> it(n, 0);
        vector<int> stack;
        stack.reserve(n);

        int c0 = s[0] - 'a';
        saved[0] = last[c0];
        last[c0] = 0;
        order.push_back(0);
        stack.push_back(0);

        // Iterative DFS
        while (!stack.empty()) {
            int x = stack.back();
            if (it[x] < (int)children[x].size()) {
                int child = children[x][it[x]++];
                int c = s[child] - 'a';
                saved[child] = last[c];
                if (last[c] != -1) newPar[child] = last[c];

                last[c] = child;
                order.push_back(child);
                stack.push_back(child);
            } else {
                stack.pop();
                last[s[x] - 'a'] = saved[x];
            }
        }

        // Subtree sizes using reverse preorder traversal
        vector<int> size(n, 1);
        for (int i = n - 1; i >= 1; i--) {
            int x = order[i];
            size[newPar[x]] += size[x];
        }

        return size;
    }
};
```

### 🌐 JavaScript (Node.js ES2022)
```javascript
/**
 * Problem: LeetCode 3331 - Find Subtree Sizes After Changes
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} parent
 * @param {string} s
 * @return {number[]}
 */
var findSubtreeSizes = function(parent, s) {
    const n = parent.length;
    const head = new Int32Array(n).fill(-1);
    const nxt = new Int32Array(n).fill(-1);

    for (let i = 1; i < n; i++) {
        nxt[i] = head[parent[i]];
        head[parent[i]] = i;
    }

    const last = new Int32Array(26).fill(-1);
    const newPar = new Int32Array(parent);
    const saved = new Int32Array(n).fill(-1);
    const order = new Int32Array(n);
    let cnt = 0;

    const it = new Int32Array(head);
    const stack = new Int32Array(n);
    let sp = 0;

    const c0 = s.charCodeAt(0) - 97;
    saved[0] = last[c0];
    last[c0] = 0;
    order[cnt++] = 0;
    stack[sp++] = 0;

    while (sp > 0) {
        const x = stack[sp - 1];
        if (it[x] !== -1) {
            const child = it[x];
            it[x] = nxt[child];

            const c = s.charCodeAt(child) - 97;
            saved[child] = last[c];
            if (last[c] !== -1) newPar[child] = last[c];

            last[c] = child;
            order[cnt++] = child;
            stack[sp++] = child;
        } else {
            sp--;
            last[s.charCodeAt(x) - 97] = saved[x];
        }
    }

    const size = new Int32Array(n).fill(1);
    for (let i = n - 1; i >= 1; i--) {
        const x = order[i];
        size[newPar[x]] += size[x];
    }

    return Array.from(size);
};
```

---

## 🔗 Quick Navigation

- ⬅️ [Back to November 2026 Archive](../../README.md)
- 🏠 [Main Repository](../../../../README.md)
- 🌐 [Official Live Platform — CodeByTushu](https://codebytushu.com/Leetcode/)
