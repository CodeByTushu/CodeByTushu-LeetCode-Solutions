# LeetCode 3093: Longest Common Suffix Queries

- **Publication Date:** 28 May 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/longest-common-suffix-queries/](https://leetcode.com/problems/longest-common-suffix-queries/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/nc0rpFK962Q)

---

## Problem Summary

You are given two arrays of strings `wordsContainer` and `wordsQuery`.

For each query `wordsQuery[i]`, you need to find a string from `wordsContainer` that shares the **longest common suffix** with `wordsQuery[i]`. If multiple strings in `wordsContainer` tie for the longest common suffix:
1. Choose the string with the **smallest length**.
2. If there is still a tie, choose the string that occurred **earliest** in `wordsContainer`.

Return an integer array `ans`, where `ans[i]` is the index of the string in `wordsContainer` that satisfies these criteria for `wordsQuery[i]`.

---

### Examples

#### Example 1:
- **Input:** `wordsContainer = ["abcd","bcd","xbcd"]`, `wordsQuery = ["cd","bcd","xyz"]`
- **Output:** `[1, 1, 1]`
- **Explanation:**
  - For `wordsQuery[0] = "cd"`: Strings sharing suffix `"cd"` are at indices `0, 1, 2`. String `1` (`"bcd"`) has length 3, which is the smallest.
  - For `wordsQuery[1] = "bcd"`: Strings sharing suffix `"bcd"` are at indices `0, 1, 2`. Index `1` has the smallest length (3).
  - For `wordsQuery[2] = "xyz"`: No string shares a common non-empty suffix (longest common suffix is `""`). Among all strings, index `1` has the minimum length.

#### Example 2:
- **Input:** `wordsContainer = ["abcdefgh","poiuygh","ghghgh"]`, `wordsQuery = ["gh","acbfgh","acbfegh"]`
- **Output:** `[2, 0, 2]`
- **Explanation:**
  - For `wordsQuery[0] = "gh"`: All three strings share suffix `"gh"`. Index `2` (`"ghghgh"`) has length 6, which is strictly shorter than lengths 8 and 7.
  - For `wordsQuery[1] = "acbfgh"`: The longest common suffix is `"fgh"`, which matches only index `0`.
  - For `wordsQuery[2] = "acbfegh"`: The longest common suffix is `"egh"`, which matches index `2`.

---

### Constraints

- $1 \le \text{wordsContainer.length}, \text{wordsQuery.length} \le 10^4$
- $1 \le \text{wordsContainer}[i]\text{.length}, \text{wordsQuery}[i]\text{.length} \le 5 \times 10^3$
- $\text{wordsContainer}[i]$ and $\text{wordsQuery}[i]$ consist only of lowercase English letters.
- The sum of $\text{wordsContainer}[i]\text{.length} \le 5 \times 10^5$.
- The sum of $\text{wordsQuery}[i]\text{.length} \le 5 \times 10^5$.

---

## Topics and Tags

- **Array**
- **String**
- **Trie**

---

## Approach & Intuition

### 1. Suffix Equivalence via Reversed Prefix Trie

A common suffix between two strings $A$ and $B$ is identical to a common prefix between their reversed strings $A^R$ and $B^R$. Therefore, we can insert all words from `wordsContainer` in **reverse order** into a Trie.

### 2. Precomputing Optimal Index at Every Trie Node

Every node in the Trie represents a specific suffix. To answer queries in $\mathcal{O}(\text{query.length})$ time:
- At each node (including the root node, which represents the empty suffix `""`), maintain `bestIdx`: the index of the best candidate word in `wordsContainer` sharing that suffix.
- When comparing two word indices $i$ and $j$, index $i$ is preferred over $j$ if:
  $$\text{length}(\text{wordsContainer}[i]) < \text{length}(\text{wordsContainer}[j]) \quad \lor \quad (\text{length}(\text{wordsContainer}[i]) == \text{length}(\text{wordsContainer}[j]) \land i < j)$$
- During insertion of `wordsContainer[i]`, update `curr.bestIdx` along the reversed path from root to the end of the word.

### 3. Querying the Longest Common Suffix

For each query `wordsQuery[k]`:
- Start at the root with `best = root.bestIdx`.
- Traverse characters of `wordsQuery[k]` in reverse:
  - If a child node exists for the current character, step into it and update `best = curr.bestIdx`.
  - If no child exists, we cannot match any longer suffix, so break immediately.
- The recorded `best` at the deepest matching node is our answer.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(\sum |W_C| + \sum |W_Q|)$
  - Building the Trie takes linear time with respect to the total length of all container strings: $\mathcal{O}(\sum |W_C| \le 5 \times 10^5)$.
  - Processing all queries takes linear time with respect to the total length of all query strings: $\mathcal{O}(\sum |W_Q| \le 5 \times 10^5)$.
  - Total time complexity is strictly linear, completing in $\approx 65\text{ ms}$.

- **Auxiliary Space Complexity:** $\mathcal{O}(\Sigma \cdot \sum |W_C|)$
  - The Trie contains at most $\sum |W_C| + 1$ nodes, each storing pointers for up to $26$ children and a single integer `bestIdx`.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/nc0rpFK962Q](https://youtu.be/nc0rpFK962Q)
