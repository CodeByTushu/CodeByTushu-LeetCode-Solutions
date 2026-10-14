# LeetCode 3723: Maximize Sum of Squares of Digits

- **Publication Date:** 14 October 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/maximize-sum-of-squares-of-digits/](https://leetcode.com/problems/maximize-sum-of-squares-of-digits/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/zMSnBgnabV8?si=1lOGAjzs3d52fN1o)

---

## Problem Summary

You are given two positive integers `num` and `sum`.

A positive integer `n` is **good** if it satisfies both of the following:
- The number of digits in `n` is exactly `num`.
- The sum of digits in `n` is exactly `sum`.

The **score** of a good integer `n` is the sum of the squares of digits in `n`.

Return a string denoting the **good integer `n`** that achieves the **maximum score**. If there are multiple possible integers, return the **maximum one**. If no such integer exists, return an empty string `""`.

---

### Examples

#### Example 1:
- **Input:** `num = 2, sum = 3`
- **Output:** `"30"`
- **Explanation:**
  There are 3 good integers: 12, 21, and 30.
  - The score of 12 is $1^2 + 2^2 = 5$.
  - The score of 21 is $2^2 + 1^2 = 5$.
  - The score of 30 is $3^2 + 0^2 = 9$.
  The maximum score is 9, achieved by 30.

#### Example 2:
- **Input:** `num = 2, sum = 17`
- **Output:** `"98"`
- **Explanation:**
  There are 2 good integers: 89 and 98.
  - The score of 89 is $8^2 + 9^2 = 145$.
  - The score of 98 is $9^2 + 8^2 = 145$.
  Both give the maximum score 145. The maximum good integer is 98.

#### Example 3:
- **Input:** `num = 1, sum = 10`
- **Output:** `""`
- **Explanation:**
  No single-digit integer can sum to 10 since the maximum single digit is 9. Hence, return `""`.

---

### Constraints

- $1 \le \text{num} \le 2 \times 10^5$
- $1 \le \text{sum} \le 2 \times 10^6$

---

## Topics and Tags

- **Math**
- **Greedy**
- **String**

---

## Approach & Intuition

1. **Feasibility Check**:
   - The maximum possible sum with `num` digits occurs when all digits are 9: $\text{max\_sum} = 9 \times \text{num}$.
   - If $\text{sum} > 9 \times \text{num}$, it is impossible to form any valid integer, so return `""`.

2. **Convexity of Squares & Greedy Assignment**:
   - Because $f(x) = x^2$ is strictly convex, distributing a fixed sum into extreme values always maximizes the sum of squares. For example:
     $$9^2 + 0^2 = 81 > 8^2 + 1^2 = 65 > 7^2 + 2^2 = 53 > \dots$$
   - To maximize $\sum d_i^2$, we must make as many digits equal to 9 as possible, followed by at most one remainder digit $r = \text{sum} \pmod 9$, with all remaining positions filled with 0.

3. **Tie-Breaking for Maximum Integer**:
   - When multiple arrangements have the exact same multiset of digits (and thus the exact same sum of squares), placing larger digits at higher place values (from left to right) produces the strictly larger integer.
   - Therefore, we greedily place all `9`s first, followed by the remainder digit $r$ (if $r > 0$), followed by all `0`s.

4. **No Leading Zero Guarantee**:
   - Since $\text{sum} \ge 1$, the first digit will always be at least $\min(9, \text{sum}) \ge 1$. Hence, the integer is always valid without any leading zero.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(\text{num})$
  - Constructing a string of length $\text{num}$ takes linear time.
  - With $\text{num} \le 2 \times 10^5$, this runs in $< 20\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(\text{num})$
  - Memory required to store and return the output string of length $\text{num}$.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/zMSnBgnabV8?si=1lOGAjzs3d52fN1o](https://youtu.be/zMSnBgnabV8?si=1lOGAjzs3d52fN1o)
