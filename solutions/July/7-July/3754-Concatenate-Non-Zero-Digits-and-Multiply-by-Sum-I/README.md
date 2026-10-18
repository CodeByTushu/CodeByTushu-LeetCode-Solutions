# LeetCode 3754: Concatenate Non-Zero Digits and Multiply by Sum I

- **Publication Date:** 07 July 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/concatenate-non-zero-digits-and-multiply-by-sum-i/](https://leetcode.com/problems/concatenate-non-zero-digits-and-multiply-by-sum-i/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/GXzw2DnuScQ?si=9ZVaWQGkCqKTQqsM)

---

## Problem Summary

You are given an integer `n`.

1. Form a new integer `x` by concatenating all the **non-zero digits** of `n` in their original order. If there are no non-zero digits, set `x = 0`.
2. Let `sum` be the **sum of digits** in `x`.

Return an integer representing the value of `x * sum`.

---

### Examples

#### Example 1:

- **Input:** `n = 10203004`
- **Output:** `12340`
- **Explanation:**
  - The non-zero digits are `1`, `2`, `3`, and `4`. Thus, $x = 1234$.
  - The sum of digits is $\text{sum} = 1 + 2 + 3 + 4 = 10$.
  - Therefore, the answer is $x \times \text{sum} = 1234 \times 10 = 12340$.

#### Example 2:

- **Input:** `n = 1000`
- **Output:** `1`
- **Explanation:**
  - The non-zero digit is `1`, so $x = 1$ and $\text{sum} = 1$.
  - Therefore, the answer is $x \times \text{sum} = 1 \times 1 = 1$.

---

### Constraints

- $0 \le n \le 10^9$

---

## Topics and Tags

- **Math**
- **Simulation**

---

## Intuition and Approach

### 1. Direct Digit Processing
The problem requires extracting all non-zero digits from the decimal representation of `n`, preserving their order, and building:
- A concatenated number $x$.
- The digit sum $\text{sum} = \sum d$.

If $n = 0$, there are no non-zero digits, so $x = 0$ and the answer is $0$.

### 2. Algorithmic Steps
1. Convert `n` to its string representation (or extract digits mathematically).
2. Traverse each character:
   - If the character is `'0'`, ignore it.
   - If the character is a non-zero digit $d \in [1, 9]$:
     - Shift and append to $x$: $x = x \times 10 + d$.
     - Accumulate into the digit sum: $\text{sum} = \text{sum} + d$.
3. Compute and return $x \times \text{sum}$.

### 3. Overflow Consideration
- Since $n \le 10^9$, $n$ contains at most 10 digits.
- The maximum value of $x$ occurs when all digits are non-zero (e.g., $999,999,999$), with a digit sum of at most $9 \times 9 = 81$.
- The maximum product is $\approx 10^9 \times 81 \approx 8.1 \times 10^{10}$, which exceeds a signed 32-bit integer ($2.14 \times 10^9$) but comfortably fits inside a 64-bit integer (`long` in Java, `long long` in C++).

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(\log_{10} n)$
  - The number of digits in $n$ is at most $\lfloor \log_{10} n \rfloor + 1 \le 10$.
  - Scanning through at most 10 characters takes $\mathcal{O}(1)$ practical time.
- **Auxiliary Space Complexity:** $\mathcal{O}(\log_{10} n)$ for string conversion, or $\mathcal{O}(1)$ auxiliary space.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
