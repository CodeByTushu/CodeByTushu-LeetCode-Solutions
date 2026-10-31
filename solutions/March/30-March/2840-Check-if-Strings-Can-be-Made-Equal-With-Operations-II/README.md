# LeetCode 2840: Check if Strings Can be Made Equal With Operations II

- **Publication Date:** 30 March 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/check-if-strings-can-be-made-equal-with-operations-ii/](https://leetcode.com/problems/check-if-strings-can-be-made-equal-with-operations-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/rhFnStErsaI?si=FZJmM3fsb0EysHcj)

---

## Problem Summary

You are given two strings `s1` and `s2`, both of length $n$, consisting of lowercase English letters.

You can apply the following operation on any of the two strings any number of times:
- Choose any two indices $i$ and $j$ such that $i < j$ and the difference $j - i$ is **even**, then swap the two characters at those indices in the string.

Return `true` if you can make the strings `s1` and `s2` equal, and `false` otherwise.

---

### Examples

#### Example 1:
- **Input:** `s1 = "abcdba", s2 = "cabdab"`
- **Output:** `true`
- **Explanation:**
  We can apply the following operations on `s1`:
  - Choose indices $i = 0, j = 2$: string becomes `"cbadba"`.
  - Choose indices $i = 2, j = 4$: string becomes `"cbbdaa"`.
  - Choose indices $i = 1, j = 5$: string becomes `"cabdab"`, which equals `s2`.

#### Example 2:
- **Input:** `s1 = "abe", s2 = "bea"`
- **Output:** `false`
- **Explanation:**
  It is not possible to make the two strings equal because characters at different parity positions cannot be exchanged.

---

### Constraints

- $n == \text{s1.length} == \text{s2.length}$
- $1 \le n \le 10^5$
- `s1` and `s2` consist only of lowercase English letters.

---

## Algorithmic Approach

The operation permits swapping characters at indices $i$ and $j$ whenever $j - i$ is even:
- This means any two **even indices** can be swapped. By transitivity of transpositions, the characters at even indices can be permuted arbitrarily into any desired permutation.
- Similarly, any two **odd indices** can be swapped, meaning characters at odd indices can also be permuted into any order.
- Crucially, characters at even indices can **never** move to odd indices, and vice versa.

Therefore, `s1` can be made equal to `s2` if and only if:
1. The multiset of characters at even indices in `s1` is identical to that in `s2`.
2. The multiset of characters at odd indices in `s1` is identical to that in `s2`.

We can count character occurrences in a single linear scan using two frequency arrays of size 26 (`countEven` and `countOdd`). In each iteration:
- For even indices, increment for `s1` and decrement for `s2`.
- For odd indices, increment for `s1` and decrement for `s2`.

Finally, we verify that all 26 entries in both frequency arrays are zero.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$
  - A single pass over the strings of length $n$, followed by a constant-time check over 26 lowercase English letters.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Two fixed-size arrays of 26 integers each, requiring constant auxiliary memory.
