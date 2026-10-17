# LeetCode 2213: Longest Substring of One Repeating Character

- **Publication Date:** 13 August 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/longest-substring-of-one-repeating-character/](https://leetcode.com/problems/longest-substring-of-one-repeating-character/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/VMxBZjdcTH4?si=mFM06zWGzYoH3T5p)

---

## Problem Summary

You are given a **0-indexed** string `s`. You are also given a **0-indexed** string `queryCharacters` of length `k` and a **0-indexed** array of integer indices `queryIndices` of length `k`, both of which are used to describe `k` queries.

The $i^{\text{th}}$ query updates the character in `s` at index `queryIndices[i]` to the character `queryCharacters[i]`.

Return an array `lengths` of length `k` where `lengths[i]` is the length of the **longest substring** of `s` consisting of **only one repeating character** after the $i^{\text{th}}$ query is performed.

---

### Examples

#### Example 1:

- **Input:** `s = "babacc", queryCharacters = "bcb", queryIndices = [1,3,3]`
- **Output:** `[3,3,4]`
- **Explanation:**
  - $1^{\text{st}}$ query updates `s = "bbbacc"`. The longest substring consisting of one repeating character is `"bbb"` with length $3$.
  - $2^{\text{nd}}$ query updates `s = "bbbccc"`. The longest substring consisting of one repeating character can be `"bbb"` or `"ccc"` with length $3$.
  - $3^{\text{rd}}$ query updates `s = "bbbbcc"`. The longest substring consisting of one repeating character is `"bbbb"` with length $4$.
  Thus, we return `[3,3,4]`.

#### Example 2:

- **Input:** `s = "abyzz", queryCharacters = "aa", queryIndices = [2,1]`
- **Output:** `[2,3]`
- **Explanation:**
  - $1^{\text{st}}$ query updates `s = "abazz"`. The longest substring consisting of one repeating character is `"zz"` with length $2$.
  - $2^{\text{nd}}$ query updates `s = "aaazz"`. The longest substring consisting of one repeating character is `"aaa"` with length $3$.
  Thus, we return `[2,3]`.

---

### Constraints

- $1 \le \text{s.length} \le 10^5$
- `s` consists of lowercase English letters.
- $k == \text{queryCharacters.length} == \text{queryIndices.length}$
- $1 \le k \le 10^5$
- `queryCharacters` consists of lowercase English letters.
- $0 \le \text{queryIndices}[i] < \text{s.length}$

---

## Topics and Tags

- **String**
- **Segment Tree**
- **Ordered Set**

---

## Intuition and Approach

### Segment Tree with Prefix/Suffix Maintenance:
Finding the maximum repeating substring across frequent point updates is a classic application for a **Segment Tree**.

Each node representing a substring interval $[l, r]$ maintains 5 properties:
1. `leftCh`: The character at the boundary `l`.
2. `rightCh`: The character at the boundary `r`.
3. `pre`: The length of the longest contiguous prefix of identical characters starting at `l`.
4. `suf`: The length of the longest contiguous suffix of identical characters ending at `r`.
5. `best`: The overall length of the longest repeating substring completely contained in $[l, r]$.

### Merging Left and Right Child Nodes (`pull`):
When merging left child $[l, \text{mid}]$ and right child $[\text{mid} + 1, r]$:
- The initial best answer is at least the maximum within either half:
  $$\text{best}[\text{node}] = \max(\text{best}[\text{leftNode}], \text{best}[\text{rightNode}])$$
- If the rightmost character of the left child matches the leftmost character of the right child (`rightCh[leftNode] == leftCh[rightNode]`), a repeating block spans across the midpoint:
  $$\text{best}[\text{node}] = \max(\text{best}[\text{node}], \text{suf}[\text{leftNode}] + \text{pre}[\text{rightNode}])$$
- If the left child is fully homogeneous ($\text{pre}[\text{leftNode}] == \text{leftLen}$) and matches `leftCh[rightNode]`, the prefix extends into the right child:
  $$\text{pre}[\text{node}] = \text{pre}[\text{leftNode}] + \text{pre}[\text{rightNode}]$$
- Similarly, if the right child is fully homogeneous ($\text{suf}[\text{rightNode}] == \text{rightLen}$) and matches `rightCh[leftNode]`, the suffix extends into the left child:
  $$\text{suf}[\text{node}] = \text{suf}[\text{rightNode}] + \text{suf}[\text{leftNode}]$$

### Query Handling:
- Point update takes $\mathcal{O}(\log N)$.
- After each update, the answer for the entire string is readily accessible at the root node: `best[1]`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N + K \log N)$
  - Building the segment tree takes $\mathcal{O}(N)$ time.
  - Each of the $K$ character updates traverses from leaf to root in $\mathcal{O}(\log N)$ time, performing $\mathcal{O}(1)$ work at each level.
  - Overall time complexity is $\mathcal{O}(N + K \log N)$, which runs efficiently within time limits for $N, K \le 10^5$.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - Storing 5 arrays of size $4N$ (`leftCh`, `rightCh`, `pre`, `suf`, `best`) consumes $\mathcal{O}(N)$ auxiliary space.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
