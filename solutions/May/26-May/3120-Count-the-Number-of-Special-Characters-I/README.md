# LeetCode 3120: Count the Number of Special Characters I

- **Publication Date:** 26 May 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/count-the-number-of-special-characters-i/](https://leetcode.com/problems/count-the-number-of-special-characters-i/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/h7jRTqBlfA4)

---

## Problem Summary

You are given a string `word`. A letter is called **special** if it appears **both** in lowercase and uppercase in `word`.

Return the number of **special** letters in `word`.

---

### Examples

#### Example 1:
- **Input:** `word = "aaAbcBC"`
- **Output:** `3`
- **Explanation:**
  - The letter `'a'` appears in both lowercase (`'a'`) and uppercase (`'A'`).
  - The letter `'b'` appears in both lowercase (`'b'`) and uppercase (`'B'`).
  - The letter `'c'` appears in both lowercase (`'c'`) and uppercase (`'C'`).
  - Thus, there are 3 special characters.

#### Example 2:
- **Input:** `word = "abc"`
- **Output:** `0`
- **Explanation:**
  - No character in `word` appears in uppercase.

#### Example 3:
- **Input:** `word = "abBCab"`
- **Output:** `1`
- **Explanation:**
  - Only the character `'b'` appears in both lowercase and uppercase.

---

### Constraints

- $1 \le \text{word.length} \le 50$
- `word` consists of only lowercase and uppercase English letters.

---

## Topics and Tags

- **Hash Table**
- **String**
- **Bit Manipulation**

---

## Approach & Intuition

### 1. Bitmask State Tracking ($\mathcal{O}(1)$ Space)

The English alphabet has exactly $26$ letters. We can maintain two integer bitmasks:
1. `lowerMask`: The $k$-th bit is set if the $k$-th letter of the alphabet (`'a' + k`) has appeared in lowercase.
2. `upperMask`: The $k$-th bit is set if the $k$-th letter of the alphabet (`'A' + k`) has appeared in uppercase.

### 2. Counting Common Special Letters

- Iterate through `word`:
  - If character $c$ is lowercase: `lowerMask |= (1 << (c - 'a'))`
  - If character $c$ is uppercase: `upperMask |= (1 << (c - 'A'))`
- The letters that appear in both lowercase and uppercase correspond precisely to the bits set in both masks:
  $$\text{common} = \text{lowerMask} \ \& \ \text{upperMask}$$
- The answer is simply the number of set bits in $\text{common}$ (i.e. `popcount(common)`).

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - We scan the string `word` of length $N$ once, performing $\mathcal{O}(1)$ bitwise operations per character.
  - Computing the population count of the 26-bit mask runs in $\mathcal{O}(1)$ time.
  - Overall time complexity is $\mathcal{O}(N)$ (takes $< 1\text{ ms}$).

- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Only two 32-bit integers (`lowerMask` and `upperMask`) are used, requiring zero additional heap allocations.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/h7jRTqBlfA4](https://youtu.be/h7jRTqBlfA4)
