# LeetCode 3517: Smallest Palindromic Rearrangement I

- **Publication Date:** 28 July 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/smallest-palindromic-rearrangement-i/](https://leetcode.com/problems/smallest-palindromic-rearrangement-i/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/0Ubxy-GYdXo?si=53zyuP0Nrdx8Wsex)

---

## Problem Summary

You are given a palindromic string `s`.

Return the **lexicographically smallest** palindromic permutation of `s`.

---

### Examples

#### Example 1:

- **Input:** `s = "z"`
- **Output:** `"z"`
- **Explanation:** A string of only one character is already the lexicographically smallest palindrome.

#### Example 2:

- **Input:** `s = "babab"`
- **Output:** `"abbba"`
- **Explanation:** Rearranging `"babab"` $\to$ `"abbba"` gives the smallest lexicographic palindrome.

#### Example 3:

- **Input:** `s = "daccad"`
- **Output:** `"acddca"`
- **Explanation:** Rearranging `"daccad"` $\to$ `"acddca"` gives the smallest lexicographic palindrome.

---

### Constraints

- $1 \le \text{s.length} \le 10^5$
- `s` consists of lowercase English letters.
- `s` is guaranteed to be palindromic.

---

## Algorithmic Approach

### 1. Palindromic Symmetry & Lexicographical Priority
- In any palindrome, the prefix (first half) mirrors the suffix (second half), with at most one character having an odd frequency placed at the exact center (if string length is odd).
- To make the reconstructed palindrome **lexicographically smallest**, we must make its prefix as alphabetically small as possible. This means greedily placing smaller characters (`'a'`, `'b'`, ...) as early as possible.

### 2. Frequency Counting & Symmetrical Reassembly ($\mathcal{O}(n)$ Time)
Because `s` is already guaranteed to be palindromic:
1. Count the frequency of each lowercase letter using a fixed-size frequency array of length $26$.
2. Iterate through characters from `'a'` to `'z'`:
   - While `freq[i] >= 2`, append character `(char)('a' + i)` to `left` and decrement `freq[i]` by $2$.
   - If `freq[i] == 1`, assign that character to `middle`.
3. Construct `right` as the reverse of `left`.
4. Concatenate and return `left + middle + right`.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(n)$ | Counting frequencies takes $\mathcal{O}(n)$ time. Iterating through 26 characters and constructing the string of length $n$ takes $\mathcal{O}(n + |\Sigma|) = \mathcal{O}(n)$. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | The frequency array is fixed to size $26$ regardless of input length. Auxiliary space beyond the output string is $\mathcal{O}(1)$. |

---

## Multi-Language Implementations

- [Java Solution](./Solution.java)
- [Python Solution](./solution.py)
- [C++ Solution](./solution.cpp)
- [JavaScript Solution](./solution.js)
