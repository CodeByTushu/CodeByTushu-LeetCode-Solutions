# LeetCode 3014: Minimum Number of Pushes to Type Word I

- **Publication Date:** 30 July 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/minimum-number-of-pushes-to-type-word-i/](https://leetcode.com/problems/minimum-number-of-pushes-to-type-word-i/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/-JUGKx9yLtI?si=y5iKS10uDS3SP_oD)

---

## Problem Summary

You are given a string `word` containing **distinct** lowercase English letters.

Telephone keypads have keys numbered $2$ to $9$ mapped with collections of lowercase English letters. Keys $1$, $*$, $\#$, and $0$ do not map to any letters.

It is allowed to remap the $8$ keys ($2$ to $9$) to distinct collections of letters. The keys can be remapped to any amount of letters, but each letter must be mapped to exactly one key.

Return the **minimum number of pushes** needed to type `word` after remapping the keys.

---

### Examples

#### Example 1:

- **Input:** `word = "abcde"`
- **Output:** `5`
- **Explanation:**
  - Map each of the 5 letters to the first position of keys $2, 3, 4, 5, 6$.
  - Each letter takes 1 push.
  - Total cost = $1 + 1 + 1 + 1 + 1 = 5$.

#### Example 2:

- **Input:** `word = "xycdefghij"`
- **Output:** `12`
- **Explanation:**
  - The first 8 letters are placed in the 1st position of the 8 available keys (1 push each = 8 pushes).
  - The remaining 2 letters are placed in the 2nd position of 2 keys (2 pushes each = 4 pushes).
  - Total cost = $8 + 4 = 12$.

---

### Constraints

- $1 \le \text{word.length} \le 26$
- `word` consists of lowercase English letters.
- All letters in `word` are **distinct**.

---

## Algorithmic Approach

### 1. Keypad Capacity & Greedy Mapping
- There are exactly $8$ remappable keys available on a telephone keypad ($2, 3, 4, 5, 6, 7, 8, 9$).
- To minimize pushes, we greedily place characters in the lowest press depth available across all $8$ keys:
  - 1st press depth: Can hold up to $8$ letters ($1$ push each).
  - 2nd press depth: Can hold up to $8$ letters ($2$ pushes each).
  - 3rd press depth: Can hold up to $8$ letters ($3$ pushes each).
  - 4th press depth: Can hold up to $8$ letters ($4$ pushes each).

### 2. Uniform Frequency Property
- Since all characters in `word` are guaranteed to be distinct, every letter appears with a frequency of exactly $1$.
- Any assignment of letters to press depths will produce the exact same total cost.
- For each letter at 0-indexed position $i$ ($0 \le i < n$):
  $$\text{pushes}(i) = \lfloor i / 8 \rfloor + 1$$
- Total pushes is simply:
  $$\text{Total Cost} = \sum_{i=0}^{n-1} \left(\lfloor i / 8 \rfloor + 1\right)$$

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(n)$ | Single linear pass of length $n \le 26$. Because $n$ is bounded by the alphabet size $26$, this is effectively $\mathcal{O}(1)$ time. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Only a few integer accumulators are maintained. Zero heap memory or dynamic data structures are allocated. |

---

## Multi-Language Implementations

- [Java Solution](./Solution.java)
- [Python Solution](./solution.py)
- [C++ Solution](./solution.cpp)
- [JavaScript Solution](./solution.js)
