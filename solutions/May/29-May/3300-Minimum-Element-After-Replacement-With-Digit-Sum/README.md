# LeetCode 3300: Minimum Element After Replacement With Digit Sum

- **Publication Date:** 29 May 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/minimum-element-after-replacement-with-digit-sum/](https://leetcode.com/problems/minimum-element-after-replacement-with-digit-sum/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/yquk5zDu8gM)

---

## Problem Summary

You are given an integer array `nums`.

You replace each element in `nums` with the **sum of its digits**.

Return the **minimum** element in `nums` after all replacements.

---

### Examples

#### Example 1:
- **Input:** `nums = [10, 12, 13, 14]`
- **Output:** `1`
- **Explanation:**
  - $10 \rightarrow 1 + 0 = 1$
  - $12 \rightarrow 1 + 2 = 3$
  - $13 \rightarrow 1 + 3 = 4$
  - $14 \rightarrow 1 + 4 = 5$
  - `nums` becomes `[1, 3, 4, 5]`, with minimum element $1$.

#### Example 2:
- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `1`
- **Explanation:**
  - `nums` remains `[1, 2, 3, 4]`, with minimum element $1$.

#### Example 3:
- **Input:** `nums = [999, 19, 199]`
- **Output:** `10`
- **Explanation:**
  - $999 \rightarrow 9 + 9 + 9 = 27$
  - $19 \rightarrow 1 + 9 = 10$
  - $199 \rightarrow 1 + 9 + 9 = 19$
  - `nums` becomes `[27, 10, 19]`, with minimum element $10$.

---

### Constraints

- $1 \le \text{nums.length} \le 100$
- $1 \le \text{nums}[i] \le 10^4$

---

## Topics and Tags

- **Array**
- **Math**
- **Simulation**

---

## Approach & Intuition

### 1. Direct Linear Scan with Digit Sum Extraction

For each integer `num` in `nums`:
- Extract each digit using modulo arithmetic (`temp % 10`) and division (`temp /= 10`).
- Maintain a running minimum `minVal` initialized to $\infty$.
- Update `minVal = min(minVal, digitSum)`.
- Return `minVal` after checking all elements.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N \cdot \log_{10}(\max(\text{nums})))$
  - With $\text{nums}[i] \le 10^4$, each number has at most 5 digits.
  - Overall time complexity is strictly $\mathcal{O}(N)$, running in $< 1\text{ ms}$.

- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Constant auxiliary variables without extra memory allocations.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/yquk5zDu8gM](https://youtu.be/yquk5zDu8gM)
