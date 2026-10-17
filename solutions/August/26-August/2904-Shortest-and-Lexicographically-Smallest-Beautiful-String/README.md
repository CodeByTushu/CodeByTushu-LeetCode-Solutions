# LeetCode 2904: Shortest and Lexicographically Smallest Beautiful String

- **Publication Date:** 26 August 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/shortest-and-lexicographically-smallest-beautiful-string/](https://leetcode.com/problems/shortest-and-lexicographically-smallest-beautiful-string/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/T8dxEI5b1MQ?si=qDMUWM2grTqI5DYy)

---

## Problem Summary

You are given a binary string `s` and a positive integer `k`.

A substring of `s` is called **beautiful** if the number of `'1'`s in it is **exactly** `k`.

Let `len` be the length of the **shortest** beautiful substring.

Return the **lexicographically smallest** beautiful substring of string `s` with length equal to `len`. If `s` does not contain any beautiful substring, return an empty string `""`.

A string `a` is lexicographically smaller than a string `b` of the same length if at the first position where they differ, character in `a` is strictly smaller than the corresponding character in `b`.

---

### Examples

#### Example 1:

- **Input:** `s = "100011001"`, `k = 3`
- **Output:** `"11001"`
- **Explanation:**
  - There are 7 beautiful substrings with $k = 3$ ones: `"100011"`, `"1000110"`, `"10001100"`, `"100011001"`, `"00011001"`, `"0011001"`, `"011001"`, and `"11001"`.
  - The shortest length among these is $5$.
  - The shortest beautiful substring is `"11001"`.

#### Example 2:

- **Input:** `s = "1011"`, `k = 2`
- **Output:** `"11"`
- **Explanation:**
  - Beautiful substrings: `"101"`, `"011"`, `"11"`.
  - The shortest length is $2$, and the substring is `"11"`.

#### Example 3:

- **Input:** `s = "000"`, `k = 1`
- **Output:** `""`
- **Explanation:**
  - There are no beautiful substrings because `s` contains no `'1'`s.

---

### Constraints

- $1 \le \text{s.length} \le 100$
- $1 \le k \le \text{s.length}$

---

## Topics and Tags

- **String**
- **Sliding Window**

---

## Intuition and Approach

### 1. Sliding Window Formulation
We seek substrings that contain exactly $k$ ones. To make the substring as short as possible:
- It must start with `'1'` and end with `'1'` (any leading or trailing `'0'` only extends the length without adding to the count of ones).
- As we expand the right boundary `right` from $0$ to $n - 1$, we increment our count of `'1'`s whenever `s[right] == '1'`.

### 2. Window Contraction
We shrink the window from the left boundary `left`:
- If `ones > k`: We must advance `left` until `ones <= k`.
- If `ones == k` but `s[left] == '0'`: Trimming leading zeros preserves the exact count of $k$ ones while strictly reducing the substring length.

### 3. Updating the Best Candidate
Whenever `ones == k`:
- The current candidate substring is `s[left ... right]`.
- Its length is $\text{len} = \text{right} - \text{left} + 1$.
- If $\text{len} < \text{minLen}$, we strictly prefer this shorter length and update `result = candidate`.
- If $\text{len} == \text{minLen}$, we compare lexicographically and update `result = candidate` if `candidate < result`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N^2)$
  - The sliding window pointers `left` and `right` each move across the string at most $N$ times.
  - At each valid window, extracting the substring of length $\le N$ and performing a lexicographical string comparison takes $\mathcal{O}(N)$ time.
  - With $N \le 100$, this executes in $< 1\text{ ms}$, which is well within competitive limits.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - Space needed to store the candidate and result strings.
