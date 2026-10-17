# LeetCode 3090: Maximum Length Substring With Two Occurrences

- **Publication Date:** 14 August 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/maximum-length-substring-with-two-occurrences/](https://leetcode.com/problems/maximum-length-substring-with-two-occurrences/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/J8Y3UhpZ-H4?si=TujrIga45VUF_-12)

---

## Problem Summary

Given a string `s`, return the **maximum length** of a substring such that it contains **at most two occurrences** of each character.

A **substring** is a contiguous non-empty sequence of characters within a string.

---

### Examples

#### Example 1:

- **Input:** `s = "bcbbbcba"`
- **Output:** `4`
- **Explanation:** The following substring has a length of $4$ and contains at most two occurrences of each character: `"bcba"`.

#### Example 2:

- **Input:** `s = "aaaa"`
- **Output:** `2`
- **Explanation:** The following substring has a length of $2$ and contains at most two occurrences of each character: `"aa"`.

---

### Constraints

- $2 \le \text{s.length} \le 100$
- `s` consists only of lowercase English letters.

---

## Topics and Tags

- **Hash Table**
- **String**
- **Sliding Window**

---

## Intuition and Approach

### Two-Pointer Sliding Window:
Because we want to find the longest contiguous substring satisfying the frequency constraint ($\le 2$ of each letter), a variable-length **sliding window** is optimal:
1. Maintain a frequency table (an array `freq` of size 26) representing character counts within the active window $[left, right]$.
2. Iterate `right` across the string from index $0$ to $N - 1$:
   - Increment `freq[s[right] - 'a']`.
   - If the newly added character's frequency exceeds $2$, the window is violated.
   - Advance `left` while decrementing `freq[s[left] - 'a']` until `freq[s[right] - 'a'] <= 2`.
3. Compute the current window length $\text{right} - \text{left} + 1$ and update the maximum length found:
   $$\text{maxLen} = \max(\text{maxLen}, \text{right} - \text{left} + 1)$$

Because both `left` and `right` monotonically move forward from $0$ to $N$, the algorithm runs in linear $\mathcal{O}(N)$ time.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - `right` visits each of the $N$ characters once.
  - `left` increments at most $N$ times across the entire loop.
  - Array lookups and updates take $\mathcal{O}(1)$ time.
  - Overall time complexity is $\mathcal{O}(N)$, completing instantaneously ($\le 1\text{ ms}$).
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Only a fixed-size integer array of length $26$ is used for lowercase English letters.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
