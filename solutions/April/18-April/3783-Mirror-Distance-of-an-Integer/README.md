# LeetCode 3783: Mirror Distance of an Integer

- **Publication Date:** 18 April 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/mirror-distance-of-an-integer/](https://leetcode.com/problems/mirror-distance-of-an-integer/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/aAbY96Dc3G4)

---

## Problem Summary

You are given an integer `n`.

Define its **mirror distance** as:
$$\text{mirrorDistance}(n) = |n - \text{reverse}(n)|$$

where $\text{reverse}(n)$ is the integer formed by reversing the digits of $n$. Leading zeros are omitted after reversing (for example, $\text{reverse}(10) = 1$, $\text{reverse}(120) = 21$).

Return an integer denoting the mirror distance of `n`.

---

### Examples

#### Example 1:
- **Input:** `n = 25`
- **Output:** `27`
- **Explanation:**
  - $\text{reverse}(25) = 52$.
  - Thus, the answer is $|25 - 52| = 27$.

#### Example 2:
- **Input:** `n = 10`
- **Output:** `9`
- **Explanation:**
  - $\text{reverse}(10) = 1$ (leading zeros omitted).
  - Thus, the answer is $|10 - 1| = 9$.

---

### Constraints

- $1 \le n \le 10^9$

---

## Topics and Tags

- **Math**
- **Simulation**

---

## Approach & Intuition

### 1. Mathematical Digit Reversal

To calculate $\text{reverse}(n)$ efficiently with $\mathcal{O}(1)$ auxiliary memory:
1. Initialize `reversed = 0` and `temp = n`.
2. Extract the least significant digit using `temp % 10`.
3. Append it to `reversed` by shifting existing digits left: `reversed = reversed * 10 + (temp % 10)`.
4. Truncate the least significant digit: `temp = temp / 10`.
5. Repeat until `temp == 0`.

### 2. Absolute Difference

Once $\text{reverse}(n)$ is computed, return $|n - \text{reverse}(n)|$.
Because $n \le 10^9$, both $n$ and $\text{reverse}(n)$ fit comfortably within standard 32-bit signed integers with zero risk of overflow.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(\log_{10} n)$
  - An integer $n \le 10^9$ has at most $10$ decimal digits.
  - The loop performs at most $10$ iterations, running in $< 1\text{ ms}$.

- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Only scalar integer variables are used.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/aAbY96Dc3G4](https://youtu.be/aAbY96Dc3G4)
