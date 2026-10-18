# LeetCode 3518: Smallest Palindromic Rearrangement II

- **Publication Date:** 29 July 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/smallest-palindromic-rearrangement-ii/](https://leetcode.com/problems/smallest-palindromic-rearrangement-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/wNEHnZRr3Bo?si=J-MBJDlyfExhL3t_)

---

## Problem Summary

You are given a palindromic string `s` and an integer `k`.

Return the **$k$-th lexicographically smallest** distinct palindromic permutation of `s`. If there are fewer than $k$ distinct palindromic permutations, return an empty string `""`.

> **Note:** Different rearrangements that yield the same palindromic string are considered identical and are counted only once.

---

### Examples

#### Example 1:

- **Input:** `s = "abba", k = 2`
- **Output:** `"baab"`
- **Explanation:**
  - The two distinct palindromic rearrangements of `"abba"` are `"abba"` and `"baab"`.
  - Lexicographically, `"abba"` comes before `"baab"`. Since $k = 2$, the output is `"baab"`.

#### Example 2:

- **Input:** `s = "aa", k = 2`
- **Output:** `""`
- **Explanation:**
  - There is only one palindromic rearrangement: `"aa"`.
  - The output is an empty string since $k = 2$ exceeds the total number of possible distinct rearrangements.

#### Example 3:

- **Input:** `s = "bacab", k = 1`
- **Output:** `"abcba"`
- **Explanation:**
  - The two distinct palindromic rearrangements of `"bacab"` are `"abcba"` and `"bacab"`.
  - Lexicographically, `"abcba"` comes before `"bacab"`. Since $k = 1$, the output is `"abcba"`.

---

### Constraints

- $1 \le \text{s.length} \le 10^4$
- `s` consists of lowercase English letters.
- `s` is guaranteed to be palindromic.
- $1 \le k \le 10^6$

---

## Algorithmic Approach

### 1. Symmetrical Reduction to the First Half
- Any valid palindrome is uniquely and completely determined by its first half ($\lfloor n / 2 \rfloor$ characters), along with at most one central odd-count character (when $n$ is odd).
- Count the frequency of every letter in $s$. Because $s$ is already palindromic, at most one character has an odd frequency.
- The multiset of characters available for the first half is given by $\text{half}[c] = \lfloor \text{count}[c] / 2 \rfloor$. The problem directly reduces to finding the $k$-th lexicographical permutation of this multiset.

### 2. Multinomial Counting with Capped Arithmetic
- The total number of distinct arrangements of a multiset with character counts $c_0, c_1, \dots, c_{25}$ and total sum $L$ equals:
  $$\frac{L!}{\prod_{i=0}^{25} c_i!} = \prod_{i=0}^{25} \binom{\sum_{j=0}^i c_j}{c_i}$$
- Since $k \le 10^6$, any permutation count exceeding $k$ does not need infinite precision. We cap all intermediate combinations and products at $\text{CAP} = 2 \times 10^6$, completely preventing integer overflow while guaranteeing accurate decision-making.

### 3. Greedy Position-by-Position Construction
- First, check if the total number of distinct arrangements of the full half is strictly less than $k$. If so, return `""`.
- For each index $\text{pos}$ from $0$ to $\text{halfLen} - 1$:
  - Iterate candidate character $c$ from `'a'` to `'z'`:
    - If $\text{cur}[c] == 0$, continue.
    - Temporarily decrement $\text{cur}[c]$ and compute $\text{cnt}$, the number of arrangements achievable with the remaining multiset.
    - If $\text{cnt} \ge k$, the $k$-th permutation must start with character $c$ at this position. Append $c$ to our prefix, keep the decrement, and break to the next position.
    - Otherwise, subtract $\text{cnt}$ from $k$, restore $\text{cur}[c]$, and proceed to the next character.
- Mirror the constructed first half around the center character (if odd length) to produce the final palindromic string.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(|\Sigma| \cdot n + |\Sigma|^2)$ | Initial frequency pass is $\mathcal{O}(n)$. For each of the $n/2$ positions, at most $|\Sigma| = 26$ candidates are checked. Multinomial counting runs across at most 26 non-zero buckets with capped iterations $\mathcal{O}(|\Sigma|)$. Since $k \le 10^6$, execution is instantaneous. |
| **Auxiliary Space** | $\mathcal{O}(|\Sigma|)$ | Only fixed-size frequency and candidate arrays of size $26$ are stored. Auxiliary memory is $\mathcal{O}(1)$ beyond the reconstructed output string $\mathcal{O}(n)$. |

---

## Multi-Language Implementations

- [Java Solution](./Solution.java)
- [Python Solution](./solution.py)
- [C++ Solution](./solution.cpp)
- [JavaScript Solution](./solution.js)
