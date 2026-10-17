# LeetCode 3734: Lexicographically Smallest Palindromic Permutation Greater Than Target

- **Publication Date:** 28 August 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/lexicographically-smallest-palindromic-permutation-greater-than-target/](https://leetcode.com/problems/lexicographically-smallest-palindromic-permutation-greater-than-target/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/xl6HBWMH0p8?si=rIWpZrmgQAbI-5zo)

---

## Problem Summary

You are given two strings `s` and `target`, each of length `n`, consisting of lowercase English letters.

Return the **lexicographically smallest** string that is **both a palindromic permutation** of `s` and **strictly greater** than `target`. If no such permutation exists, return an empty string `""`.

---

### Examples

#### Example 1:

- **Input:** `s = "baba"`, `target = "abba"`
- **Output:** `"baab"`
- **Explanation:**
  - The palindromic permutations of `s` (in lexicographical order) are `"abba"` and `"baab"`.
  - The lexicographically smallest permutation that is strictly greater than `target` is `"baab"`.

#### Example 2:

- **Input:** `s = "baba"`, `target = "bbaa"`
- **Output:** `""`
- **Explanation:**
  - The palindromic permutations of `s` (in lexicographical order) are `"abba"` and `"baab"`.
  - None of them is lexicographically strictly greater than `target`. Therefore, the answer is `""`.

#### Example 3:

- **Input:** `s = "abc"`, `target = "abb"`
- **Output:** `""`
- **Explanation:**
  - `s` has no palindromic permutations. Therefore, the answer is `""`.

#### Example 4:

- **Input:** `s = "aac"`, `target = "abb"`
- **Output:** `"aca"`
- **Explanation:**
  - The only palindromic permutation of `s` is `"aca"`.
  - `"aca"` is strictly greater than `target`. Therefore, the answer is `"aca"`.

---

### Constraints

- $1 \le n == \text{s.length} == \text{target.length} \le 300$
- `s` and `target` consist of only lowercase English letters.

---

## Topics and Tags

- **String**
- **Greedy**
- **Two Pointers**
- **Hash Table**

---

## Intuition and Approach

### 1. Palindrome Feasibility
A string can be rearranged into a palindrome if and only if **at most one** character appears with an odd frequency:
- If `oddCount > 1`, no palindromic permutation exists $\rightarrow$ return `""`.
- If $n$ is odd, the unique character with odd frequency is designated as the center character `mid`.

### 2. Halving the Problem
Every palindrome of length $n$ is fully determined by its left half of length $\lfloor n / 2 \rfloor$:
$$\text{Palindrome} = \text{leftHalf} + (\text{mid if odd}) + \text{reverse}(\text{leftHalf})$$
We compute the pool of characters available for the left half:
$$\text{avail}[c] = \lfloor \text{freq}[c] / 2 \rfloor$$

### 3. Quick Global Check
The absolute smallest palindromic permutation is formed by placing all available characters in ascending order (`'a'` to `'z'`). If this smallest palindrome is already strictly greater than `target`, it is immediately returned.

### 4. Greedy Left-Half Exploration
We attempt to match `target`'s left half character by character up to `halfLen`:
1. **Branch Greater (Option A):** At each position `pos`, try placing the smallest character $c > \text{target}[pos]$ available in `avail`. If available:
   - Place $c$ at index `pos`.
   - Fill the remaining indices of the left half with all remaining characters in `avail` in sorted ascending order.
   - Reconstruct the full palindrome and update `bestCandidate` if this palindrome is smaller than previously recorded candidates.
2. **Greedy Prefix Match (Option B):** Consume $\text{target}[pos]$ from `avail`. If $\text{avail}[\text{target}[pos]] > 0$, decrement it and advance to `pos + 1`. If unavailable, the prefix cannot match further, and we terminate the loop.
3. **Exact Left-Half Match:** If the left half matches `target` completely:
   - If $n$ is odd and `mid > target[halfLen]`, this palindrome strictly exceeds `target`.
   - Even if the middle character doesn't exceed `target[halfLen]`, the mirrored right half might still make the palindrome strictly greater than `target`. We verify by comparing the full reconstructed palindrome against `target`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N^2)$
  - Generating and comparing full palindromes of length $N$ takes $\mathcal{O}(N)$ time.
  - At each of the $\lfloor N / 2 \rfloor$ positions, we test at most one candidate branching option.
  - Total time complexity is $\mathcal{O}(N \cdot \text{halfLen}) = \mathcal{O}(N^2)$, which takes $< 2\text{ ms}$ for $N \le 300$.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - Arrays of size $26$ for frequency counts and buffers of length $N$ for string construction.
