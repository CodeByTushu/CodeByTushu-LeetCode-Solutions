# LeetCode 712: Minimum ASCII Delete Sum for Two Strings

- **Publication Date:** 10 January 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/](https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/STApi2wCyiA?si=1zZa_F3bHBtby3mr)

---

## Problem Summary

Given two strings `s1` and `s2`, return *the lowest ASCII sum of deleted characters to make two strings equal*.

---

### Examples

#### Example 1:
- **Input:** `s1 = "sea", s2 = "eat"`
- **Output:** `231`
- **Explanation:**
  - Deleting `"s"` from `"sea"` adds the ASCII value of `"s"` (`115`) to the sum.
  - Deleting `"t"` from `"eat"` adds `116` to the sum.
  - At the end, both strings are equal to `"ea"`, and `115 + 116 = 231` is the minimum sum possible to achieve this.

#### Example 2:
- **Input:** `s1 = "delete", s2 = "leet"`
- **Output:** `403`
- **Explanation:**
  - Deleting `"dee"` from `"delete"` to turn the string into `"let"`, adds `100[d] + 101[e] + 101[e]` to the sum.
  - Deleting `"e"` from `"leet"` adds `101[e]` to the sum.
  - At the end, both strings are equal to `"let"`, and the answer is `100 + 101 + 101 + 101 = 403`.
  - If instead we turned both strings into `"lee"` or `"eet"`, we would get answers of `433` or `417`, which are higher.

---

### Constraints

- $1 \le \text{s1.length}, \text{s2.length} \le 1000$
- `s1` and `s2` consist of lowercase English letters.

---

## Topics and Tags

- **String**
- **Dynamic Programming**

---

## Approach & Intuition

### 1. 2D Dynamic Programming (Prefix Matching)

The problem is a variant of the classic **Longest Common Subsequence (LCS)** / **Edit Distance** problem, weighted by character ASCII values.

We define `dp[i][j]` as the minimum ASCII delete sum needed to make the prefixes `s1[0..i-1]` and `s2[0..j-1]` equal.

#### Base Cases:
- `dp[0][0] = 0`: Two empty strings require 0 deletions.
- `dp[i][0] = dp[i-1][0] + ASCII(s1[i-1])`: Matching prefix `s1[0..i-1]` against an empty string means all characters in `s1[0..i-1]` must be deleted.
- `dp[0][j] = dp[0][j-1] + ASCII(s2[j-1])`: Matching an empty string against `s2[0..j-1]` means all characters in `s2[0..j-1]` must be deleted.

#### Transitions:
For any $1 \le i \le m$ and $1 \le j \le n$:
1. If characters match (`s1[i-1] == s2[j-1]`):
   - No character deletion is needed for this character.
   - `dp[i][j] = dp[i-1][j-1]`.
2. If characters differ (`s1[i-1] != s2[j-1]`):
   - We have two choices:
     - Delete `s1[i-1]`: cost is `dp[i-1][j] + ASCII(s1[i-1])`.
     - Delete `s2[j-1]`: cost is `dp[i][j-1] + ASCII(s2[j-1])`.
   - Take the minimum of both choices:
     $$\text{dp}[i][j] = \min(\text{dp}[i-1][j] + \text{ASCII}(s_1[i-1]),\; \text{dp}[i][j-1] + \text{ASCII}(s_2[j-1]))$$

Finally, `dp[m][n]` yields the minimum ASCII delete sum for the full strings.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(M \times N)$, where $M = \text{s1.length}$ and $N = \text{s2.length}$. We iterate through a 2D table of size $(M+1) \times (N+1)$ where each cell transition is computed in $\mathcal{O}(1)$ time.
- **Auxiliary Space Complexity:** $\mathcal{O}(M \times N)$ using standard 2D table (or $\mathcal{O}(\min(M, N))$ when using row-wise space optimization).

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
