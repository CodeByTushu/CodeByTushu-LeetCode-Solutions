# LeetCode 940: Distinct Subsequences II

- **Publication Date:** 07 September 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/distinct-subsequences-ii/](https://leetcode.com/problems/distinct-subsequences-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/rnUQe6R6vQ0?si=gUWPJ3r87lA3N-Va)

---

## Problem Summary

Given a string `s`, return the number of **distinct non-empty subsequences** of `s`. Since the answer may be very large, return it modulo $10^9 + 7$.

A **subsequence** of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters.

---

### Examples

#### Example 1:
- **Input:** `s = "abc"`
- **Output:** `7`
- **Explanation:** The 7 distinct subsequences are `"a", "b", "c", "ab", "ac", "bc", "abc"`.

#### Example 2:
- **Input:** `s = "aba"`
- **Output:** `6`
- **Explanation:** The 6 distinct subsequences are `"a", "b", "ab", "aa", "ba", "aba"`.

#### Example 3:
- **Input:** `s = "aaa"`
- **Output:** `3`
- **Explanation:** The 3 distinct subsequences are `"a", "aa", "aaa"`.

---

### Constraints

- $1 \le s.\text{length} \le 2000$
- `s` consists of lowercase English letters.

---

## Topics and Tags

- **String**
- **Dynamic Programming**

---

## Approach & Intuition

1. **State Definition**:
   - Let `dp[c]` represent the number of distinct non-empty subsequences ending with character `c` (where $0 \le c < 26$).
   - When we encounter character `ch` with index `c = ch - 'a'`:
     - We can append `ch` to **any** previously formed non-empty subsequence.
     - We can also form a brand new single-character subsequence consisting solely of `ch` (represented by $+1$).
     - Therefore:
       $$\text{new\_dp}[c] = \left(1 + \sum_{i=0}^{25} \text{dp}[i]\right) \pmod{10^9 + 7}$$
     - Overwriting `dp[c]` with `new_dp[c]` inherently eliminates duplicates, because any previous subsequence ending with character `c` is replaced by this latest extension.

2. **Final Sum**:
   - The total number of distinct non-empty subsequences is the sum of `dp[i]` across all 26 characters:
     $$\text{ans} = \left(\sum_{i=0}^{25} \text{dp}[i]\right) \pmod{10^9 + 7}$$

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(26 \times N) = \mathcal{O}(N)$
  - For each character in the string of length $N$, we iterate through the alphabet size ($26$ characters).
  - Given $N \le 2000$, total operations are around $5.2 \times 10^4$, executing in under 2 ms.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$ / $\mathcal{O}(|\Sigma|)$
  - Uses only a constant-sized array `dp` of length 26.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/rnUQe6R6vQ0?si=gUWPJ3r87lA3N-Va](https://youtu.be/rnUQe6R6vQ0?si=gUWPJ3r87lA3N-Va)

---

## Resources & Community

- 🌐 **Platform Website:** [https://codebytushu.com/](https://codebytushu.com/)
- 💻 **All LeetCode Solutions:** [https://codebytushu.com/Leetcode/](https://codebytushu.com/Leetcode/)
- 📂 **GitHub Repository:** [https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions](https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions)
