# LeetCode 3870: Count Commas in Range

- **Publication Date:** 08 September 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/count-commas-in-range/](https://leetcode.com/problems/count-commas-in-range/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/hUH9riQvJPg?si=MQIlnQtNZd6CPESr)

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

- $1 \le n \le 10^5$

---

## Topics and Tags

- **Math**

---

## Approach & Intuition

1. **Threshold Contribution Logic**:
   - Instead of formatting every single integer as a string and counting commas (which takes $\mathcal{O}(N \log N)$ time), we count commas by their **threshold tiers**:
     - Every number $\ge 1,000$ receives at least 1 comma. The count of such numbers in $[1, n]$ is $(n - 1000 + 1)$.
     - Every number $\ge 1,000,000$ receives a 2nd comma. The count of such numbers is $(n - 1000000 + 1)$.
     - Every number $\ge 1,000,000,000$ receives a 3rd comma, and so on.
   - For each threshold $10^{3k} \le n$, the contribution added to the total commas is simply:
     $$\text{contribution} = n - \text{threshold} + 1$$

2. **Algorithm**:
   - Initialize `result = 0` and `threshold = 1000`.
   - While `threshold <= n`:
     - Add `n - threshold + 1` to `result`.
     - Multiply `threshold` by `1000`.
   - Return `result`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(\log_{1000} N) = \mathcal{O}(1)$
  - For $n \le 10^5$, the loop runs at most 1 time ($1000$).
  - Even for $n = 10^9$, it runs only 3 times.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Uses only constant auxiliary variables.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/hUH9riQvJPg?si=MQIlnQtNZd6CPESr](https://youtu.be/hUH9riQvJPg?si=MQIlnQtNZd6CPESr)

---

## Resources & Community

- 🌐 **Platform Website:** [https://codebytushu.com/](https://codebytushu.com/)
- 💻 **All LeetCode Solutions:** [https://codebytushu.com/Leetcode/](https://codebytushu.com/Leetcode/)
- 📂 **GitHub Repository:** [https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions](https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions)
