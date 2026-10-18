# LeetCode 3867: Sum of GCD of Formed Pairs

- **Publication Date:** 16 July 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/sum-of-gcd-of-formed-pairs/](https://leetcode.com/problems/sum-of-gcd-of-formed-pairs/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/ssruc2PL15k?si=OIgm_0ia1aabagPM)

---

## Problem Summary

You are given an integer array `nums` of length $n$.

Construct an array `prefixGcd` where for each index $i$:
- Let $mx_i = \max(\text{nums}[0], \text{nums}[1], \dots, \text{nums}[i])$.
- $\text{prefixGcd}[i] = \gcd(\text{nums}[i], mx_i)$.

After constructing `prefixGcd`:
1. Sort `prefixGcd` in non-decreasing order.
2. Form pairs by taking the smallest unpaired element and the largest unpaired element.
3. Repeat this process until no more pairs can be formed.
4. For each formed pair, compute the GCD of the two elements.
5. If $n$ is odd, the middle element in the `prefixGcd` array remains unpaired and should be ignored.

Return an integer denoting the **sum of the GCD values** of all formed pairs.

---

### Examples

#### Example 1:

- **Input:** `nums = [2, 6, 4]`
- **Output:** `2`
- **Explanation:**
  - $i = 0$: $\text{nums}[0] = 2, mx_0 = 2 \implies \text{prefixGcd}[0] = \gcd(2, 2) = 2$
  - $i = 1$: $\text{nums}[1] = 6, mx_1 = 6 \implies \text{prefixGcd}[1] = \gcd(6, 6) = 6$
  - $i = 2$: $\text{nums}[2] = 4, mx_2 = 6 \implies \text{prefixGcd}[2] = \gcd(4, 6) = 2$
  - $\text{prefixGcd} = [2, 6, 2]$. After sorting: $[2, 2, 6]$.
  - Pair the smallest and largest elements: $\gcd(2, 6) = 2$.
  - The middle element $2$ remains unpaired and is ignored.
  - Total sum $= 2$.

#### Example 2:

- **Input:** `nums = [3, 6, 2, 8]`
- **Output:** `5`
- **Explanation:**
  - $\text{prefixGcd} = [3, 6, 2, 8]$. After sorting: $[2, 3, 6, 8]$.
  - Form pairs:
    - $\gcd(2, 8) = 2$
    - $\gcd(3, 6) = 3$
  - Total sum $= 2 + 3 = 5$.

---

### Constraints

- $1 \le n == \text{nums.length} \le 10^5$
- $1 \le \text{nums}[i] \le 10^9$

---

## Algorithmic Approach

### 1. Prefix Maximum and Running GCD Generation
- Maintain a running maximum variable `mx = 0`.
- In a single linear scan from $i = 0$ to $n - 1$:
  - Update $mx = \max(mx, \text{nums}[i])$.
  - Compute $\text{prefixGcd}[i] = \gcd(\text{nums}[i], mx)$ using the Euclidean algorithm.

### 2. Sorting
- Sort `prefixGcd` in non-decreasing order using an efficient comparison sort ($\mathcal{O}(n \log n)$).

### 3. Symmetric Two Pointers Pairing
- Initialize two pointers: $l = 0$ at the start and $r = n - 1$ at the end.
- While $l < r$:
  - Pair $\text{prefixGcd}[l]$ and $\text{prefixGcd}[r]$.
  - Add $\gcd(\text{prefixGcd}[l], \text{prefixGcd}[r])$ to a 64-bit sum accumulator (`ans`).
  - Advance the pointers: $l \leftarrow l + 1$ and $r \leftarrow r - 1$.
- If $n$ is odd, the middle element at index $n // 2$ is naturally excluded when $l = r$ breaks the loop.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(n \log n + n \log(\max A))$ | Generating prefix GCD values takes $\mathcal{O}(n \log(\max A))$. Sorting takes $\mathcal{O}(n \log n)$. Two-pointer pairing takes $\mathcal{O}(n \log(\max A))$. The overall time complexity is $\mathcal{O}(n \log n)$. |
| **Auxiliary Space** | $\mathcal{O}(n)$ | An auxiliary array of length $n$ is allocated to store `prefixGcd`. |

---

## Multi-Language Implementations

- [Java Solution](./Solution.java)
- [Python Solution](./solution.py)
- [C++ Solution](./solution.cpp)
- [JavaScript Solution](./solution.js)
