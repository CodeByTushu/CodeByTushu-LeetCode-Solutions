# LeetCode 3720: Lexicographically Smallest Permutation Greater Than Target

- **Publication Date:** 27 August 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/lexicographically-smallest-permutation-greater-than-target/](https://leetcode.com/problems/lexicographically-smallest-permutation-greater-than-target/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/G1tCTGT4XSk?si=EI0lM3tY5ATyaD_k)

---

## Problem Summary

You are given two strings `s` and `target`, both having length `n`, consisting of lowercase English letters.

Return the **lexicographically smallest permutation** of `s` that is **strictly greater** than `target`. If no permutation of `s` is lexicographically strictly greater than `target`, return an empty string `""`.

A string `a` is lexicographically strictly greater than a string `b` (of the same length) if in the first position where `a` and `b` differ, string `a` has a letter that appears later in the alphabet than the corresponding letter in `b`.

---

### Examples

#### Example 1:

- **Input:** `s = "abc"`, `target = "bba"`
- **Output:** `"bca"`
- **Explanation:**
  - The permutations of `s` (in lexicographical order) are `"abc"`, `"acb"`, `"bac"`, `"bca"`, `"cab"`, and `"cba"`.
  - The lexicographically smallest permutation that is strictly greater than `target` is `"bca"`.

#### Example 2:

- **Input:** `s = "leet"`, `target = "code"`
- **Output:** `"eelt"`
- **Explanation:**
  - The permutations of `s` (in lexicographical order) are `"eelt"`, `"eetl"`, `"elet"`, `"elte"`, `"etel"`, `"etle"`, `"leet"`, `"lete"`, `"ltee"`, `"teel"`, `"tele"`, and `"tlee"`.
  - The lexicographically smallest permutation that is strictly greater than `target` is `"eelt"`.

#### Example 3:

- **Input:** `s = "baba"`, `target = "bbaa"`
- **Output:** `""`
- **Explanation:**
  - The permutations of `s` (in lexicographical order) are `"aabb"`, `"abab"`, `"abba"`, `"baab"`, `"baba"`, and `"bbaa"`.
  - None of them is lexicographically strictly greater than `target`. Therefore, the answer is `""`.

---

### Constraints

- $1 \le \text{s.length} == \text{target.length} \le 300$
- `s` and `target` consist of only lowercase English letters.

---

## Topics and Tags

- **String**
- **Greedy**
- **Hash Table**

---

## Intuition and Approach

### 1. Maximizing the Common Prefix (Longest Match)
To make the permutation as small as possible while ensuring it is strictly greater than `target`:
- We want our result string to match `target` for as many initial characters as possible before diverging at index `breakIndex`.
- At `breakIndex`, our placed character must be strictly greater than `target[breakIndex]`.
- Any later breakpoint $j > i$ shares a longer prefix with `target` and will always be lexicographically smaller than diverging earlier at $i$ (since diverging at $i$ would require placing a character strictly larger than `target[i]`). Thus, we seek the **rightmost valid breakpoint**.

### 2. Identifying the Rightmost Valid Breakpoint
We count the frequencies of all characters in `s` using an integer array of size $26$:
1. As index $i$ advances from $0$ to $n - 1$:
   - Check if any character $c > \text{target}[i]$ is currently available in `cnt`. If yes, index $i$ is a candidate breakpoint. We update `breakIndex = i` and save a snapshot `breakCnt = cnt.clone()`.
   - Then, attempt to continue matching `target` by consuming `target[i]`. If `cnt[target[i]] > 0`, decrement it and continue. Otherwise, the prefix cannot be matched any further, and we terminate the loop.
2. If `breakIndex == -1`, no permutation of `s` can be strictly greater than `target`, so return `""`.

### 3. Suffix Construction
Using the saved state at the rightmost `breakIndex`:
1. Retain the matched prefix `target[0 ... breakIndex - 1]`.
2. At position `breakIndex`, select the **smallest available character strictly greater** than `target[breakIndex]`.
3. Append all remaining available characters in **ascending alphabetical order** (`'a'` through `'z'`), which guarantees the lexicographically smallest possible suffix.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(26 \cdot N) = \mathcal{O}(N)$
  - Scanning character counts takes $\mathcal{O}(26) = \mathcal{O}(1)$ time per position.
  - Across $N \le 300$ positions, the loop executes in $\mathcal{O}(N)$ time.
  - Suffix construction and string concatenation take $\mathcal{O}(N)$ time.
  - Overall time complexity is strictly linear $\mathcal{O}(N)$.
- **Auxiliary Space Complexity:** $\mathcal{O}(N + 26) = \mathcal{O}(N)$
  - Frequency count arrays take $\mathcal{O}(26) = \mathcal{O}(1)$ auxiliary space.
  - The output string buffer requires $\mathcal{O}(N)$ space.
