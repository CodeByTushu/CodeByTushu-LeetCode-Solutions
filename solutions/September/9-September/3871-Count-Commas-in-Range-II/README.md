# LeetCode 3871: Count Commas in Range II

- **Publication Date:** 09 September 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/count-commas-in-range-ii/](https://leetcode.com/problems/count-commas-in-range-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/M_w6tgVlFuw?si=WnxejlFcVQEuvu3i)

---

## Problem Summary

You are given an integer `n`.

Return the total number of commas used when writing all integers from $[1, n]$ (inclusive) in standard number formatting.

In standard formatting:
- A comma is inserted after every three digits from the right.
- Numbers with fewer than 4 digits contain no commas.

---

### Examples

#### Example 1:
- **Input:** `n = 1002`
- **Output:** `3`
- **Explanation:**
  The numbers `"1,000"`, `"1,001"`, and `"1,002"` each contain one comma, giving a total of 3.

#### Example 2:
- **Input:** `n = 998`
- **Output:** `0`
- **Explanation:**
  All numbers from 1 to 998 have fewer than four digits. Therefore, no commas are used.

---

### Constraints

- $1 \le n \le 10^{15}$

---

## Topics and Tags

- **Math**

---

## Approach & Intuition

1. **Threshold Scaling Logic**:
   - In Count Commas in Range II, $n$ scales up to large 64-bit integer limits ($10^{15}$).
   - We calculate the contribution directly by tiers:
     - Tier 1: Numbers $\ge 1,000$ (each adds 1 comma): $(n - 1000 + 1)$
     - Tier 2: Numbers $\ge 1,000,000$ (each adds a second comma): $(n - 1000000 + 1)$
     - Tier 3: Numbers $\ge 1,000,000,000$ (each adds a third comma): $(n - 10^9 + 1)$
     - Tier 4: Numbers $\ge 10^{12}$ (each adds a fourth comma): $(n - 10^{12} + 1)$
     - And so on for each power of $1000$.

2. **Algorithm**:
   - Initialize `result = 0` and `threshold = 1000L`.
   - While `threshold <= n`:
     - Add `n - threshold + 1` to `result`.
     - Advance `threshold *= 1000L` with 64-bit precision to prevent overflow.
   - Return `result`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(\log_{1000} N) = \mathcal{O}(1)$
  - For $n \le 10^{15}$, the loop executes at most 5 iterations.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Constant memory used.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/M_w6tgVlFuw?si=WnxejlFcVQEuvu3i](https://youtu.be/M_w6tgVlFuw?si=WnxejlFcVQEuvu3i)

---

## Resources & Community

- 🌐 **Platform Website:** [https://codebytushu.com/](https://codebytushu.com/)
- 💻 **All LeetCode Solutions:** [https://codebytushu.com/Leetcode/](https://codebytushu.com/Leetcode/)
- 📂 **GitHub Repository:** [https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions](https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions)
