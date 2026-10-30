# LeetCode 2839: Check if Strings Can be Made Equal With Operations I

- **Publication Date:** 29 March 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/check-if-strings-can-be-made-equal-with-operations-i/](https://leetcode.com/problems/check-if-strings-can-be-made-equal-with-operations-i/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

You are given two strings `s1` and `s2`, both of length 4, consisting of lowercase English letters.

You can apply the following operation on any of the two strings any number of times:
- Choose any two indices $i$ and $j$ such that $j - i = 2$, then swap the two characters at those indices in the string.

Return `true` if you can make the strings `s1` and `s2` equal, and `false` otherwise.

---

### Examples

#### Example 1:
- **Input:** `s1 = "abcd", s2 = "cdab"`
- **Output:** `true`
- **Explanation:**
  We can do the following operations on `s1`:
  - Choose indices $i = 0, j = 2$: string becomes `"cbad"`.
  - Choose indices $i = 1, j = 3$: string becomes `"cdab"`, which equals `s2`.

#### Example 2:
- **Input:** `s1 = "abcd", s2 = "dacb"`
- **Output:** `false`
- **Explanation:**
  Characters at even indices in `s1` are `{'a', 'c'}`, while in `s2` they are `{'d', 'c'}`. They cannot be made equal through index-distance-2 swaps.

---

### Constraints

- `s1.length == s2.length == 4`
- `s1` and `s2` consist only of lowercase English letters.

---

## Algorithmic Approach

Since both strings have a fixed length of 4, the only valid pairs $(i, j)$ satisfying $j - i = 2$ are:
- $(0, 2)$: swapping the two **even-indexed** characters.
- $(1, 3)$: swapping the two **odd-indexed** characters.

Notice that parity is invariant: characters at even positions can never move to odd positions, and characters at odd positions can never move to even positions.

Thus, `s1` can be transformed into `s2` if and only if:
1. The multiset of even-positioned characters $\{s_1[0], s_1[2]\}$ equals $\{s_2[0], s_2[2]\}$.
2. The multiset of odd-positioned characters $\{s_1[1], s_1[3]\}$ equals $\{s_2[1], s_2[3]\}$.

Both conditions can be checked directly in $\mathcal{O}(1)$ time.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(1)$
  - Constant number of character equality comparisons.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - No auxiliary data structures are used.
