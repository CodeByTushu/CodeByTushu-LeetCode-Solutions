# LeetCode 3702: Longest Subsequence With Non-Zero Bitwise XOR

- **Publication Date:** 15 August 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/longest-subsequence-with-non-zero-bitwise-xor/](https://leetcode.com/problems/longest-subsequence-with-non-zero-bitwise-xor/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/p_DGMnYCGL0?si=YmC1yz2kaeD-qKe8)

---

## Problem Summary

You are given an integer array `nums`.

Return the length of the **longest subsequence** in `nums` whose bitwise XOR is **non-zero**. If no such subsequence exists, return `0`.

A **subsequence** is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

---

### Examples

#### Example 1:

- **Input:** `nums = [1,2,3]`
- **Output:** `2`
- **Explanation:** One longest subsequence is `[2, 3]`. The bitwise XOR is computed as $2 \oplus 3 = 1$, which is non-zero.

#### Example 2:

- **Input:** `nums = [2,3,4]`
- **Output:** `3`
- **Explanation:** The longest subsequence is `[2, 3, 4]`. The bitwise XOR is computed as $2 \oplus 3 \oplus 4 = 5$, which is non-zero.

---

### Constraints

- $1 \le \text{nums.length} \le 10^5$
- $0 \le \text{nums}[i] \le 10^9$

---

## Topics and Tags

- **Array**
- **Math**
- **Bit Manipulation**

---

## Intuition and Approach

### Bitwise XOR Parity Analysis:
Let $N$ be the length of `nums` and let $X$ be the bitwise XOR sum of all elements in the entire array:
$$X = \bigoplus_{i=0}^{N-1} \text{nums}[i]$$

We evaluate the possible outcomes:
1. **Case 1: $X \ne 0$**
   - The entire array is already a subsequence of length $N$ whose XOR sum is non-zero.
   - The maximum possible length is therefore $N$.

2. **Case 2: $X = 0$**
   - If every element in `nums` is $0$, any non-empty subsequence only contains zeros, so its XOR sum will always be $0$. In this case, no valid subsequence exists, so we return $0$.
   - If there exists at least one element $x \in \text{nums}$ such that $x \ne 0$:
     - Removing $x$ from `nums` yields a subsequence of length $N - 1$.
     - The XOR sum of this remaining subsequence is:
       $$\text{XOR}_{\text{remaining}} = X \oplus x = 0 \oplus x = x \ne 0$$
     - Because $x \ne 0$, the remaining subsequence of length $N - 1$ has a non-zero XOR sum.
     - Since the maximum length $N$ was invalid ($X = 0$), the optimal answer must be $N - 1$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - We traverse the array of length $N$ in a single pass to compute the total XOR sum and check for any non-zero element.
  - Runs in $\approx 1\text{ ms}$ for $N = 10^5$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Requires only $\mathcal{O}(1)$ scalar variables (`totalXor`, `hasNonZero`).

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
