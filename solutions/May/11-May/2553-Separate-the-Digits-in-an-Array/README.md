# LeetCode 2553: Separate the Digits in an Array

- **Publication Date:** 11 May 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/separate-the-digits-in-an-array/](https://leetcode.com/problems/separate-the-digits-in-an-array/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/AqO7kwZyiA0)

---

## Problem Summary

Given an array of positive integers `nums`, return an array `answer` that consists of the digits of each integer in `nums` after separating them in the **same order** they appear in `nums`.

To separate the digits of an integer is to get all the digits it has in the same order.
- For example, for the integer `10921`, the separation of its digits is `[1, 0, 9, 2, 1]`.

---

### Examples

#### Example 1:
- **Input:** `nums = [13, 25, 83, 77]`
- **Output:** `[1, 3, 2, 5, 8, 3, 7, 7]`
- **Explanation:** 
  - The separation of 13 is `[1, 3]`.
  - The separation of 25 is `[2, 5]`.
  - The separation of 83 is `[8, 3]`.
  - The separation of 77 is `[7, 7]`.
  - `answer = [1, 3, 2, 5, 8, 3, 7, 7]`.

#### Example 2:
- **Input:** `nums = [7, 1, 3, 9]`
- **Output:** `[7, 1, 3, 9]`
- **Explanation:** 
  - The separation of each integer in `nums` is itself.
  - `answer = [7, 1, 3, 9]`.

---

### Constraints

- $1 \le \text{nums.length} \le 1000$
- $1 \le \text{nums}[i] \le 10^5$

---

## Topics and Tags

- **Array**
- **Simulation**
- **Math**

---

## Approach & Intuition

### 1. Mathematical Digit Extraction

To preserve the sequential order of digits for each integer $x$:
1. Repeatedly extract the least significant digit using modulo:
   $$\text{digit} = x \pmod{10}$$
2. Remove the least significant digit using integer division:
   $$x = \lfloor x / 10 \rfloor$$
3. Because digits are extracted from right to left (least significant to most significant), reversing the extracted list restores the original left-to-right order.
4. Append each restored digit sequence into the global result array.

This avoids string conversions and allocations, running in optimal $\mathcal{O}(N \log_{10} M)$ time.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N \times \log_{10}(\max(\text{nums})))$
  - For each number in `nums`, extracting its digits takes $\mathcal{O}(\log_{10}(\text{num}))$ steps.
  - Since $\text{nums}[i] \le 10^5$, each number has at most 6 digits.
  - For $N \le 1000$, total operations are $\le 6000$, executing in $< 1\text{ ms}$.

- **Auxiliary Space Complexity:** $\mathcal{O}(\log_{10}(\max(\text{nums})))$
  - A temporary buffer holds at most 6 digits per integer during reversal before appending to the output array.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/AqO7kwZyiA0](https://youtu.be/AqO7kwZyiA0)
