# LeetCode 3841: Palindromic Path Queries in a Tree

- **Publication Date:** 29 October 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/palindromic-path-queries-in-a-tree/](https://leetcode.com/problems/palindromic-path-queries-in-a-tree/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/bF5CQVRkXqA?si=klJQNDXfh3rcFwh-)

---

## Problem Summary

You are given an undirected tree with $n$ nodes labeled $0$ to $n - 1$, represented by a 2D array `edges` of length $n - 1$.

You are also given a string `s` of length $n$ consisting of lowercase English letters, where `s[i]` represents the character assigned to node $i$.

You are given an array `queries`, where each query is either:
- `"update ui c"`: Change the character at node $u_i$ to $c$ (formally, update $s[u_i] = c$).
- `"query ui vi"`: Determine whether the string formed by the characters on the unique path from $u_i$ to $v_i$ (inclusive) can be **rearranged into a palindrome**.

Return a boolean array `answer`, where `answer[j]` is `true` if the $j$-th query of type `"query ui vi"` can be rearranged into a palindrome, and `false` otherwise.

---

### Examples

#### Example 1:
- **Input:** `n = 3, edges = [[0,1],[1,2]], s = "aac", queries = ["query 0 2","update 1 b","query 0 2"]`
- **Output:** `[true, false]`
- **Explanation:**
  - `"query 0 2"`: Path $0 \to 1 \to 2$ gives `"aac"`, which can be rearranged to form `"aca"`, a palindrome. Thus, `answer[0] = true`.
  - `"update 1 b"`: Update node $1$ to `'b'`, now $s =$ `"abc"`.
  - `"query 0 2"`: Path characters are `"abc"`, which cannot be rearranged to form a palindrome. Thus, `answer[1] = false`.
  - Final result: `[true, false]`.

#### Example 2:
- **Input:** `n = 4, edges = [[0,1],[0,2],[0,3]], s = "abca", queries = ["query 1 2","update 0 b","query 2 3","update 3 a","query 1 3"]`
- **Output:** `[false, false, true]`
- **Explanation:**
  - `"query 1 2"`: Path $1 \to 0 \to 2$ gives `"bac"`, which cannot be rearranged to form a palindrome (`false`).
  - `"update 0 b"`: Update node $0$ to `'b'`, now $s =$ `"bbca"`.
  - `"query 2 3"`: Path $2 \to 0 \to 3$ gives `"cba"`, which cannot be rearranged to form a palindrome (`false`).
  - `"update 3 a"`: Update node $3$ to `'a'`, $s =$ `"bbca"`.
  - `"query 1 3"`: Path $1 \to 0 \to 3$ gives `"bba"`, which can be rearranged to form `"bab"`, a palindrome (`true`).
  - Final result: `[false, false, true]`.

---

### Constraints

- $1 \le n == s\text{.length} \le 5 \times 10^4$
- $\text{edges.length} == n - 1$
- $\text{edges}[i] = [u_i, v_i]$
- $0 \le u_i, v_i \le n - 1$
- $s$ consists of lowercase English letters.
- The input is generated such that `edges` represents a valid tree.
- $1 \le \text{queries.length} \le 5 \times 10^4$
- $\text{queries}[i] =$ `"update ui c"` or $\text{queries}[i] =$ `"query ui vi"`
- $0 \le u_i, v_i \le n - 1$
- $c$ is a lowercase English letter.

---

## Topics and Tags

- **Tree / Binary Lifting**
- **Lowest Common Ancestor (LCA)**
- **Binary Indexed Tree (Fenwick Tree)**
- **Euler Tour Technique (Flattening)**
- **Bit Manipulation**
- **String**

---

## Approach & Intuition

### 1. Palindrome Parity Bitmask
A set of characters can be rearranged to form a palindrome if and only if **at most one character has an odd frequency**.
Since there are 26 lowercase English letters (`'a'` to `'z'`), we represent character frequency parities as a 26-bit integer mask:
- Bit $k$ is $1$ if the $(k)$-th letter has odd parity, and $0$ if even.
- A mask represents a valid palindrome condition if and only if it has at most one bit set:
  $$(\text{mask} \ \& \ (\text{mask} - 1)) == 0$$

### 2. Path Parities on a Tree
Let $\text{path}(x)$ denote the cumulative XOR mask of node characters from root $0$ to node $x$.
For any path between $u$ and $v$ with Lowest Common Ancestor $\text{lca}(u, v)$:
$$\text{mask}(u, v) = \text{path}(u) \oplus \text{path}(v) \oplus (1 \ll (s[\text{lca}(u, v)] - 'a'))$$
The cumulative paths from root to $u$ and root to $v$ both include the path from root to $\text{lca}(u, v)$. Taking their XOR cancels all ancestors strictly above the LCA and cancels the LCA itself twice. XORing $(1 \ll (s[\text{lca}] - 'a'))$ restores the character at the LCA.

### 3. Dynamic Subtree Updates via Euler Tour & Fenwick Tree
- When a node $u$'s character changes from $c_{\text{old}}$ to $c_{\text{new}}$, the bitmask change is:
  $$d = (1 \ll (c_{\text{old}} - 'a')) \oplus (1 \ll (c_{\text{new}} - 'a'))$$
- This flip $d$ applies to all nodes in the subtree rooted at $u$.
- Under an **Euler Tour (DFS in-time and out-time)**, the entire subtree of $u$ corresponds to the contiguous interval:
  $$[\text{tin}[u], \text{tout}[u]]$$
- We perform range XOR updates efficiently using a **Binary Indexed Tree (Fenwick Tree)**:
  - Range XOR update on $[\text{tin}[u], \text{tout}[u]]$: `upd(tin[u], d)` and `upd(tout[u] + 1, d)`.
  - Point query at any node $x$: $\text{qry}(\text{tin}[x])$ gives the cumulative XOR difference applied to $x$.
  - Current cumulative root-to-node mask: $\text{base}[x] \oplus \text{qry}(\text{tin}[x])$.

### 4. Lowest Common Ancestor (LCA) via Binary Lifting
- Precompute $2^k$-th ancestors `up[k][v]` for $k \in [0, 16]$ during initialization in $\mathcal{O}(n \log n)$ time.
- Each LCA query is resolved in $\mathcal{O}(\log n)$ time.

---

## Complexity Analysis

- **Time Complexity:**
  - **Preprocessing:** $\mathcal{O}(n \log n)$ for Euler Tour DFS and Binary Lifting table construction.
  - **Updates:** $\mathcal{O}(\log n)$ per `"update"` query using the Fenwick tree.
  - **Queries:** $\mathcal{O}(\log n)$ per `"query"` query to compute LCA and query the Fenwick tree.
  - **Total Time Complexity:** $\mathcal{O}((n + q) \log n)$, which comfortably runs within $\sim 100\text{ ms}$ for $n, q \le 5 \times 10^4$.
- **Auxiliary Space Complexity:** $\mathcal{O}(n \log n)$
  - Binary lifting table `up[17][n]` and Euler tour arrays require $\mathcal{O}(n \log n)$ space.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/bF5CQVRkXqA?si=klJQNDXfh3rcFwh-](https://youtu.be/bF5CQVRkXqA?si=klJQNDXfh3rcFwh-)
