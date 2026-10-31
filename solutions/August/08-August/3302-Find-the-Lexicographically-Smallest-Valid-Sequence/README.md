# LeetCode 3302: Find the Lexicographically Smallest Valid Sequence

- **Publication Date:** 08 August 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/find-the-lexicographically-smallest-valid-sequence/](https://leetcode.com/problems/find-the-lexicographically-smallest-valid-sequence/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/WpnWTvKaMS0?si=DvjmzDqpXzATt8QD)

---

## Problem Summary

You are given two strings `word1` and `word2`.

A string `x` is called **almost equal** to `y` if you can change at most one character in `x` to make it identical to `y`.

A sequence of indices `seq` is called **valid** if:
- The indices are sorted in ascending order.
- Concatenating the characters at these indices in `word1` in the same order results in a string that is **almost equal** to `word2`.

Return an array of size `word2.length` representing the **lexicographically smallest valid sequence** of indices. If no such sequence of indices exists, return an empty array `[]`.

> **Note:** The answer must represent the lexicographically smallest array of *indices*, not the string formed by those indices.

---

### Examples

#### Example 1:

- **Input:** `word1 = "vbcca", word2 = "abc"`
- **Output:** `[0, 1, 2]`
- **Explanation:**
  - Index `0`: `word1[0]` is `'v'` (change to `'a'`).
  - Index `1`: `word1[1]` is `'b'`.
  - Index `2`: `word1[2]` is `'c'`.
  - Subsequence `"vbc"` is almost equal to `"abc"` with 1 change.
  - `[0, 1, 2]` is the lexicographically smallest index array.

#### Example 2:

- **Input:** `word1 = "bacdc", word2 = "abc"`
- **Output:** `[1, 2, 4]`
- **Explanation:**
  - Index `1`: `word1[1]` is `'a'`.
  - Index `2`: `word1[2]` is `'c'` (change to `'b'`).
  - Index `4`: `word1[4]` is `'c'`.
  - Subsequence `"acc"` is almost equal to `"abc"`.
  - Lexicographically smallest valid sequence is `[1, 2, 4]`.

#### Example 3:

- **Input:** `word1 = "aaaaaa", word2 = "aaabc"`
- **Output:** `[]`
- **Explanation:**
  - It is impossible to form a string almost equal to `"aaabc"` because at least two characters (`'b'` and `'c'`) would need to be changed.

#### Example 4:

- **Input:** `word1 = "abc", word2 = "ab"`
- **Output:** `[0, 1]`

---

### Constraints

- $1 \le \text{word2.length} < \text{word1.length} \le 3 \times 10^5$
- `word1` and `word2` consist only of lowercase English letters.

---

## Topics and Tags

- **Two Pointers**
- **String**
- **Greedy**
- **Dynamic Programming**

---

## Intuition and Approach

### 1. Suffix Precomputation (`last` array):
To know whether we can safely use a mismatch at any index without breaking the remainder of `word2`, we must know the latest possible positions in `word1` that can form the suffix `word2[j ... m-1]`.

- We scan backwards starting from $i = n - 1$ and $j = m - 1$.
- Whenever `word1[i] == word2[j]`, we record `last[j] = i` and decrement both pointers.
- Here, `last[j]` indicates the latest index in `word1` matching `word2[j]` such that `word2[j ... m-1]` is guaranteed to be a subsequence of `word1[last[j] ... n-1]`.

### 2. Forward Greedy Matching:
To make the index array lexicographically smallest, we want each chosen index to be as small (as early) as possible:
- Iterate $i$ from $0$ to $n - 1$:
  - **Exact Match:** If `word1[i] == word2[j]`, greedily take $i$: `ans[j++] = i`.
  - **Mismatch (Skip):** If `word1[i] != word2[j]` and we haven't skipped any character yet (`canSkip == true`):
    - Can we use our single allowed mutation here at index $i$?
    - Yes, as long as the rest of `word2` (`word2[j+1 ... m-1]`) can still be matched in the remainder of `word1` (`i < last[j+1]` or if $j = m - 1$).
    - If valid, greedily pick $i$: `ans[j++] = i`, and mark `canSkip = false`.
- If we successfully match all $m$ characters ($j = m$), return `ans`. Otherwise, return an empty array `[]`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(|word1| + |word2|)$
  - The backward pass takes $\mathcal{O}(|word1|)$ to compute `last`.
  - The forward greedy pass takes $\mathcal{O}(|word1|)$ to construct `ans`.
  - Total time complexity is strictly linear $\mathcal{O}(N + M)$, executing well within time limits for $N \le 3 \times 10^5$.
- **Auxiliary Space Complexity:** $\mathcal{O}(|word2|)$
  - `last` array of length $M = |word2|$.
  - `ans` output array of length $M$.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
