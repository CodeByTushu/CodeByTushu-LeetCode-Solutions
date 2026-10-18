# LeetCode 1081: Smallest Subsequence of Distinct Characters

- **Publication Date:** 19 July 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/](https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/mIf0IhC4LQc?si=T1JVw42oyY5TyS56)

> [!NOTE]
> This problem is identical to [LeetCode 316: Remove Duplicate Letters](https://leetcode.com/problems/remove-duplicate-letters/).

---

## Problem Summary

Given a string `s`, return the **lexicographically smallest subsequence** of `s` that contains all the distinct characters of `s` **exactly once**.

---

### Examples

#### Example 1:

- **Input:** `s = "bcabc"`
- **Output:** `"abc"`
- **Explanation:**
  - Distinct characters are `'a'`, `'b'`, `'c'`.
  - Possible subsequences containing all distinct characters include `"bca"`, `"bac"`, `"cab"`, `"abc"`.
  - Among these, `"abc"` is the lexicographically smallest.

#### Example 2:

- **Input:** `s = "cbacdcbc"`
- **Output:** `"acdb"`
- **Explanation:**
  - The distinct characters are `'a'`, `'b'`, `'c'`, `'d'`.
  - The lexicographically smallest valid subsequence is `"acdb"`.

---

### Constraints

- $1 \le \text{s.length} \le 1000$
- `s` consists of lowercase English letters.

---

## Algorithmic Approach

To make the result lexicographically smallest, earlier positions in the string should contain smaller characters whenever possible. We achieve this greedily using a **monotonic stack**.

### 1. Precomputing Last Occurrence Indices
- Store the last index at which each character appears in `s`:
  $$\text{last}[c] = \max \{ i \mid s[i] = c \}$$
- This lookup tells us in $\mathcal{O}(1)$ time whether a character can safely be discarded from the top of the stack and picked up again later.

### 2. Monotonic Stack with Greedy Pruning
- Traverse `s` from left to right:
  - If character $c = s[i]$ is already present in our result (`used[c] == true`), ignore it because duplicate characters are not allowed.
  - While the stack is not empty, the top element is strictly greater than $c$ ($\text{top} > c$), and the top element appears again later ($\text{last}[\text{top}] > i$):
    - Pop $\text{top}$ from the stack.
    - Mark $\text{used}[\text{top}] = \text{false}$ since it will be included later in a more favorable position.
  - Push $c$ onto the stack and set $\text{used}[c] = \text{true}$.

### 3. Assembling the Final Subsequence
- Construct the final string by reading the stack from bottom to top.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(n)$ | Precomputing the last indices takes $\mathcal{O}(n)$. In the main loop, each character is pushed and popped from the stack at most once, leading to amortized $\mathcal{O}(1)$ work per character. |
| **Auxiliary Space** | $\mathcal{O}(\Sigma)$ | The stack, frequency array, and boolean tracking arrays require $\mathcal{O}(\Sigma)$ space where $\Sigma = 26$ is the fixed alphabet size ($\mathcal{O}(1)$ extra space). |

---

## Multi-Language Implementations

- [Java Solution](./Solution.java)
- [Python Solution](./solution.py)
- [C++ Solution](./solution.cpp)
- [JavaScript Solution](./solution.js)
