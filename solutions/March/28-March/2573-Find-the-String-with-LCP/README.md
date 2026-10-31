# LeetCode 2573: Find the String with LCP

- **Publication Date:** 28 March 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/find-the-string-with-lcp/](https://leetcode.com/problems/find-the-string-with-lcp/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/IQqdMqcK1U8?si=4sxT_aNp543wvrT8)

---

## Problem Summary

We define the `lcp` matrix of any 0-indexed string `word` of $n$ lowercase English letters as an $n \times n$ grid such that:
- `lcp[i][j]` is equal to the length of the **longest common prefix** between the substrings `word[i, n-1]` and `word[j, n-1]`.

Given an $n \times n$ matrix `lcp`, return the **alphabetically smallest** string `word` that corresponds to `lcp`. If there is no such string, return an empty string `""`.

A string $a$ is lexicographically smaller than a string $b$ (of the same length) if in the first position where $a$ and $b$ differ, string $a$ has a letter that appears earlier in the alphabet than the corresponding letter in $b$.

---

### Examples

#### Example 1:
- **Input:** `lcp = [[4,0,2,0],[0,3,0,1],[2,0,2,0],[0,1,0,1]]`
- **Output:** `"abab"`
- **Explanation:**
  `lcp` corresponds to any 4-letter string with two alternating letters. The lexicographically smallest is `"abab"`.

#### Example 2:
- **Input:** `lcp = [[4,3,2,1],[3,3,2,1],[2,2,2,1],[1,1,1,1]]`
- **Output:** `"aaaa"`
- **Explanation:**
  `lcp` corresponds to any 4-letter string with a single distinct letter throughout. The lexicographically smallest is `"aaaa"`.

#### Example 3:
- **Input:** `lcp = [[4,3,2,1],[3,3,2,1],[2,2,2,1],[1,1,1,3]]`
- **Output:** `""`
- **Explanation:**
  `lcp[3][3]` cannot be equal to 3 since `word[3, ..., 3]` consists of only a single letter (so its maximum possible LCP is 1); Thus, no valid string exists.

---

### Constraints

- $1 \le n == \text{lcp.length} == \text{lcp}[i]\text{.length} \le 1000$
- $0 \le \text{lcp}[i][j] \le n$

---

## Algorithmic Approach

### 1. Greedy Character Assignment
For any valid string, the condition $\text{lcp}[i][j] > 0$ holds if and only if $\text{word}[i] == \text{word}[j]$.
To produce the **lexicographically smallest** string:
- We iterate $i$ from $0$ to $n - 1$.
- Whenever $\text{word}[i]$ has not been assigned yet, we assign the next available character ('a', 'b', ..., 'z').
- We propagate this character to all $j \ge i$ where $\text{lcp}[i][j] > 0$.
- If we ever require more than 26 distinct characters, it is impossible to represent the string with lowercase English letters, so we return `""`.

### 2. Validation via Dynamic Programming
An arbitrary matrix may contain invalid values that do not correspond to any real string (e.g., asymmetric values, out-of-bounds prefixes, or self-contradictions). We must verify that our constructed `word` generates the exact given matrix.

The recurrence for the longest common prefix between substrings starting at $i$ and $j$ is:
$$\text{expected} = \begin{cases} 1 + \text{lcp}[i + 1][j + 1] & \text{if } \text{word}[i] == \text{word}[j] \text{ and } i + 1 < n, j + 1 < n \\ 1 & \text{if } \text{word}[i] == \text{word}[j] \text{ and } (i + 1 == n \text{ or } j + 1 == n) \\ 0 & \text{if } \text{word}[i] \ne \text{word}[j] \end{cases}$$

We iterate backwards ($i, j$ from $n - 1$ down to $0$) and check if $\text{lcp}[i][j] == \text{expected}$. If any mismatch occurs, the matrix is invalid and we return `""`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n^2)$
  - Greedy construction takes $\mathcal{O}(n^2)$ iterations.
  - Dynamic programming verification checks every $(i, j)$ cell in $\mathcal{O}(1)$, requiring $\mathcal{O}(n^2)$ time.
  - For $n = 1000$, $n^2 = 10^6$ operations, which executes in a few milliseconds.
- **Auxiliary Space Complexity:** $\mathcal{O}(n)$
  - An array of size $n$ to hold the reconstructed characters.
