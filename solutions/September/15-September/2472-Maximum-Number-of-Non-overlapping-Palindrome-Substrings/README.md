# LeetCode 2472: Maximum Number of Non-overlapping Palindrome Substrings

- **Publication Date:** 15 September 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/maximum-number-of-non-overlapping-palindrome-substrings/](https://leetcode.com/problems/maximum-number-of-non-overlapping-palindrome-substrings/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/JeveqUyRSPo?si=T6jg7y3n6m5aD70T)

---

## Problem Summary

You are given a string `s` and a positive integer `k`.

Select a set of **non-overlapping** substrings from the string `s` that satisfy the following conditions:
- The length of each substring is at least `k`.
- Each substring is a palindrome.

Return the **maximum** number of substrings in an optimal selection.

A **substring** is a contiguous sequence of characters within a string.

---

### Examples

#### Example 1:
- **Input:** `s = "abaccdbbd", k = 3`
- **Output:** `2`
- **Explanation:**
  We can select the substrings `"aba"` and `"dbbd"` from `"abaccdbbd"`. Both `"aba"` and `"dbbd"` are palindromes and have a length of at least $k = 3$. It can be shown that we cannot find a selection with more than two valid substrings.

#### Example 2:
- **Input:** `s = "adbcda", k = 2`
- **Output:** `0`
- **Explanation:**
  There is no palindrome substring of length at least 2 in the string.

---

### Constraints

- $1 \le k \le s.\text{length} \le 2000$
- `s` consists of lowercase English letters.

---

## Topics and Tags

- **String**
- **Dynamic Programming**
- **Greedy**

---

## Approach & Intuition

### Key Mathematical Insight (Minimal Palindromes):
1. **Concentric Palindromes Property**:
   - Any palindrome of length $L \ge k + 2$ contains a smaller concentric palindrome substring of length $L - 2 \ge k$ obtained by removing its outermost characters.
   - Consequently, any valid palindrome substring of length $\ge k$ contains a valid palindrome substring of length either **$k$** or **$k + 1$**.
2. **Greedy Interval Scheduling**:
   - To maximize the number of non-overlapping intervals, choosing the earliest ending valid substring is always globally optimal.
   - Because smaller substrings end earlier than or at the same position as larger enclosing ones, we only need to test for palindromes of length $k$ and $k + 1$!

### Algorithm:
1. **Palindrome DP Table**:
   - Create a 2D boolean table `isPalin[i][j]` where `isPalin[i][j]` denotes whether substring `s[i..j]` is a palindrome:
     - Base case: Single characters `isPalin[i][i] = true`.
     - Base case: Adjacent pairs `isPalin[i][i+1] = (s[i] == s[i+1])`.
     - Transition: For length $\ge 3$, `isPalin[i][j] = (s[i] == s[j]) && isPalin[i+1][j-1]`.
2. **Greedy Two-Pointer Traversal**:
   - Initialize `count = 0` and index `i = 0`.
   - While $i \le n - k$:
     - Check lengths $len = k$ and $len = k + 1$ starting at $i$.
     - If `isPalin[i][i + len - 1]` is true:
       - Found a valid substring! Increment `count++`.
       - Fast-forward $i$ to $(i + len)$ to prevent any overlapping.
     - If neither length is a palindrome starting at $i$, simply increment `i++`.
3. Return `count`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N^2)$
  - Filling the 2D DP table `isPalin` of size $N \times N$ takes $\mathcal{O}(N^2)$ time.
  - The greedy scan checks at most 2 lengths per starting index, running in $\mathcal{O}(N)$ time.
  - Overall Time Complexity: $\mathcal{O}(N^2)$, which comfortably runs within the limit for $N \le 2000$.
- **Auxiliary Space Complexity:** $\mathcal{O}(N^2)$
  - Requires an $N \times N$ boolean matrix to store palindrome states.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/JeveqUyRSPo?si=T6jg7y3n6m5aD70T](https://youtu.be/JeveqUyRSPo?si=T6jg7y3n6m5aD70T)

---

## Resources & Community

- 🌐 **Platform Website:** [https://codebytushu.com/](https://codebytushu.com/)
- 💻 **All LeetCode Solutions:** [https://codebytushu.com/Leetcode/](https://codebytushu.com/Leetcode/)
- 📂 **GitHub Repository:** [https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions](https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions)
