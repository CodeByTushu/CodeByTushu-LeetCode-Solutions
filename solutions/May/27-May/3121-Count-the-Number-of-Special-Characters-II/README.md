# LeetCode 3121: Count the Number of Special Characters II

- **Publication Date:** 27 May 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/count-the-number-of-special-characters-ii/](https://leetcode.com/problems/count-the-number-of-special-characters-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/1ubiAfa1yU0)

---

## Problem Summary

You are given a string `word`. A letter `c` is called **special** if it appears **both** in lowercase and uppercase in `word`, and **every** lowercase occurrence of `c` appears **before** the **first** uppercase occurrence of `c`.

Return the number of **special** letters in `word`.

---

### Examples

#### Example 1:
- **Input:** `word = "aaAbcBC"`
- **Output:** `3`
- **Explanation:**
  - The special characters are `'a'`, `'b'`, and `'c'`.
  - For `'a'`: lowercase occurrences are at indices `0, 1` and the first uppercase `'A'` is at index `2`. Every lowercase occurrence comes before the first uppercase occurrence.
  - For `'b'`: lowercase at index `3` and first uppercase `'B'` at index `5`.
  - For `'c'`: lowercase at index `4` and first uppercase `'C'` at index `6`.

#### Example 2:
- **Input:** `word = "abc"`
- **Output:** `0`
- **Explanation:**
  - There are no special characters in `word` as no uppercase letters exist.

#### Example 3:
- **Input:** `word = "AbBCab"`
- **Output:** `0`
- **Explanation:**
  - For `'a'`: the first uppercase `'A'` is at index `0`, but lowercase `'a'` appears later at index `4`.
  - For `'b'`: uppercase `'B'` is at index `2`, but lowercase `'b'` appears later at index `5`.
  - For `'c'`: only uppercase `'C'` is present.
  - Hence, no character meets the special criteria.

---

### Constraints

- $1 \le \text{word.length} \le 2 \times 10^5$
- `word` consists only of lowercase and uppercase English letters.

---

## Topics and Tags

- **Hash Table**
- **String**

---

## Approach & Intuition

### 1. Key Invariant Formulation

To satisfy the conditions:
1. Character `c` must appear in lowercase.
2. Character `c` must appear in uppercase.
3. **Every** lowercase occurrence of `c` must appear **before** the **first** uppercase occurrence of `c`.

Because the maximum index among all lowercase occurrences of `c` is its **last** lowercase index (`lastLower[c]`), condition (3) holds if and only if:
$$\text{lastLower}[c] < \text{firstUpper}[c]$$

If this inequality holds, all lowercase occurrences (which by definition have indices $\le \text{lastLower}[c]$) strictly precede the very first uppercase occurrence (`firstUpper[c]`).

### 2. Single-Pass Tracking ($\mathcal{O}(N)$ Time, $\mathcal{O}(1)$ Space)

- Maintain two arrays of size $26$, initialized to $-1$:
  - `lastLower`: records the last seen index for each lowercase letter.
  - `firstUpper`: records the first seen index for each uppercase letter.
- Scan through `word`:
  - If character is lowercase: update `lastLower[c - 'a'] = i`.
  - If character is uppercase and `firstUpper[c - 'A'] == -1`: set `firstUpper[c - 'A'] = i`.
- Iterate through all $26$ letters:
  - If `lastLower[k] != -1 && firstUpper[k] != -1 && lastLower[k] < firstUpper[k]`, increment `specialCount`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - Single pass through the string `word` of length $N$ up to $2 \times 10^5$.
  - Secondary check runs through a fixed alphabet size of $26$, taking $\mathcal{O}(1)$ time.
  - Overall time complexity is $\mathcal{O}(N)$ ($\approx 5\text{ ms}$).

- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Constant extra space: two arrays of size $26$ regardless of string length.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/1ubiAfa1yU0](https://youtu.be/1ubiAfa1yU0)
