# LeetCode 788: Rotated Digits

- **Publication Date:** 02 May 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/rotated-digits/](https://leetcode.com/problems/rotated-digits/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/SRcawCxl-V8)

---

## Problem Summary

An integer `x` is **good** if after rotating each digit individually by $180^\circ$, we get a valid number that is **different** from `x`. Each digit must be rotated — we cannot choose to leave it alone.

A number is **valid** if each digit remains a digit after rotation. Specifically:
- `0`, `1`, and `8` rotate to themselves (`0 -> 0`, `1 -> 1`, `8 -> 8`).
- `2` and `5` rotate to each other (`2 <-> 5`).
- `6` and `9` rotate to each other (`6 <-> 9`).
- `3`, `4`, and `7` do **not** rotate to any valid digit and become invalid.

Given an integer `n`, return the **number of good integers** in the range `[1, n]`.

---

### Examples

#### Example 1:
- **Input:** `n = 10`
- **Output:** `4`
- **Explanation:**
  - There are four good numbers in the range `[1, 10]`: `2`, `5`, `6`, `9`.
  - Note that `1` and `10` are not good numbers since they remain unchanged after rotating (`1 -> 1`, `10 -> 10`).

#### Example 2:
- **Input:** `n = 1`
- **Output:** `0`
- **Explanation:** `1` rotates to `1`, so it is not different from itself.

#### Example 3:
- **Input:** `n = 2`
- **Output:** `1`
- **Explanation:** `2` rotates to `5`, which is valid and different from `2`.

---

### Constraints

- $1 \le n \le 10^4$

---

## Topics and Tags

- **Math**
- **Dynamic Programming**

---

## Approach & Intuition

### 1. Digit Classification

Every decimal digit $d \in [0, 9]$ falls into one of three distinct categories when rotated by $180^\circ$:

1. **Invalid Digits (`3, 4, 7`):**
   - Cannot be rotated into a valid number.
   - If a number contains **any** of these digits, the entire number becomes invalid.

2. **Self-Symmetric Digits (`0, 1, 8`):**
   - Rotate to themselves.
   - They remain valid, but if a number contains **only** these digits, the rotated number will be identical to the original number (hence **not good**).

3. **Inverting / Shifted Digits (`2, 5, 6, 9`):**
   - Rotate to a different valid digit: $2 \leftrightarrow 5$ and $6 \leftrightarrow 9$.
   - A number is **good** if and only if:
     - It contains **no** invalid digits (`3, 4, 7`).
     - It contains **at least one** inverting digit (`2, 5, 6, 9`).

### 2. Dynamic Programming State Definition

Rather than performing division/modulo operations repeatedly for each number, we can use a bottom-up Dynamic Programming array `dp` of size $n + 1$:

- `dp[i] = 0`: The number $i$ is **invalid** (contains $3, 4, \text{ or } 7$).
- `dp[i] = 1`: The number $i$ is **valid but identical** to itself when rotated (contains only $0, 1, 8$).
- `dp[i] = 2`: The number $i$ is **good** (valid and different from itself; contains at least one of $2, 5, 6, 9$ and no invalid digits).

#### Base Cases ($i < 10$):
- `dp[0] = dp[1] = dp[8] = 1`
- `dp[2] = dp[5] = dp[6] = dp[9] = 2`
- `dp[3] = dp[4] = dp[7] = 0`

#### Transitions ($i \ge 10$):
For any multi-digit number $i$, we can decompose it into its prefix $a = \lfloor i / 10 \rfloor$ and its last digit $b = i \pmod{10}$:
- If $a == 1$ and $b == 1$:
  - Neither part contains an inverting digit, and neither contains an invalid digit $\implies \text{dp}[i] = 1$.
- If $a \ge 1$ and $b \ge 1$:
  - Neither part is invalid ($a \ne 0$ and $b \ne 0$), and at least one part has $\text{dp} == 2 \implies \text{dp}[i] = 2$ (increment answer count).
- Otherwise:
  - At least one part is invalid $\implies \text{dp}[i] = 0$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - A single pass from $0$ to $n$ evaluates each number in $\mathcal{O}(1)$ time using previously computed subproblems.

- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - Uses an integer array of size $n + 1$ ($\le 10^4$ elements, taking under $40\text{ KB}$ of memory).

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/SRcawCxl-V8](https://youtu.be/SRcawCxl-V8)
