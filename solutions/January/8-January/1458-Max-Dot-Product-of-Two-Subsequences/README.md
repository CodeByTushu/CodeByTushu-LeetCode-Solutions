# LeetCode 1458: Max Dot Product of Two Subsequences

- **Publication Date:** 08 January 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/max-dot-product-of-two-subsequences/](https://leetcode.com/problems/max-dot-product-of-two-subsequences/)
- **YouTube Solution:** *Coming Soon* ⏳

---

## Problem Summary

Given two arrays `nums1` and `nums2`.

Return the maximum dot product between **non-empty** subsequences of `nums1` and `nums2` with the same length.

A subsequence of an array is a new array which is formed from the original array by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, `[2,3,5]` is a subsequence of `[1,2,3,4,5]` while `[1,5,3]` is not).

---

### Examples

#### Example 1:
- **Input:** `nums1 = [2,1,-2,5], nums2 = [3,0,-6]`
- **Output:** `18`
- **Explanation:** Take subsequence `[2,-2]` from `nums1` and subsequence `[3,-6]` from `nums2`. Their dot product is $(2 \times 3 + (-2) \times (-6)) = 18$.

#### Example 2:
- **Input:** `nums1 = [3,-2], nums2 = [2,-6,7]`
- **Output:** `21`
- **Explanation:** Take subsequence `[3]` from `nums1` and subsequence `[7]` from `nums2`. Their dot product is $(3 \times 7) = 21$.

#### Example 3:
- **Input:** `nums1 = [-1,-1], nums2 = [1,1]`
- **Output:** `-1`
- **Explanation:** Take subsequence `[-1]` from `nums1` and subsequence `[1]` from `nums2`. Their dot product is $-1$.

---

### Constraints

- $1 \le \text{nums1.length}, \text{nums2.length} \le 500$
- $-1000 \le \text{nums1}[i], \text{nums2}[i] \le 1000$

---

## Topics and Tags

- **Array**
- **Dynamic Programming**

---

## Approach & Intuition

### 1. 2D Dynamic Programming (Longest Common Subsequence Variant)

Let $dp[i][j]$ represent the maximum dot product of non-empty subsequences chosen from prefixes `nums1[0..i-1]` and `nums2[0..j-1]`.

For each pair of indices $(i, j)$:
1. **Take Both Elements:**
   - Pair `nums1[i-1]` and `nums2[j-1]` together.
   - Product is $P = \text{nums1}[i-1] \times \text{nums2}[j-1]$.
   - We can either start a new subsequence of length $1$ ($P$), or chain onto an existing non-empty subsequence ($P + dp[i-1][j-1]$) only if $dp[i-1][j-1] > 0$:
     $$\text{takeBoth} = P + \max(0, dp[i-1][j-1])$$
2. **Skip Element from `nums1`:**
   $$dp[i-1][j]$$
3. **Skip Element from `nums2`:**
   $$dp[i][j-1]$$

Combining all choices:
$$dp[i][j] = \max(\text{takeBoth}, dp[i-1][j], dp[i][j-1])$$

### 2. Base Cases and Negative Values

Because the problem requires **non-empty** subsequences, if all numbers in `nums1` are negative and all in `nums2` are positive (e.g. `[-1]`, `[1]`), the answer will be negative ($-1$).
Initializing all $dp[i][j]$ with $-\infty$ ensures that we only transition through valid non-empty subsequences while gracefully handling strictly negative optimal dot products.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n \times m)$, where $n$ and $m$ are lengths of `nums1` and `nums2`. For $n, m \le 500$, $500 \times 500 = 250,000$ constant-time operations execute in $< 10$ ms.
- **Auxiliary Space Complexity:** $\mathcal{O}(n \times m)$ for the 2D DP matrix.

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
