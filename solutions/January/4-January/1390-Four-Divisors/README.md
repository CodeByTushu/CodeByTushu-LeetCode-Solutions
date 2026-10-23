# LeetCode 1390: Four Divisors

- **Publication Date:** 04 January 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/four-divisors/](https://leetcode.com/problems/four-divisors/)
- **YouTube Solution:** *Coming Soon* ⏳

---

## Problem Summary

Given an integer array `nums`, return the sum of divisors of the integers in that array that have exactly four divisors. If there is no such integer in the array, return `0`.

---

### Examples

#### Example 1:
- **Input:** `nums = [21, 4, 7]`
- **Output:** `32`
- **Explanation:**
  - 21 has 4 divisors: 1, 3, 7, 21 (sum = $1 + 3 + 7 + 21 = 32$)
  - 4 has 3 divisors: 1, 2, 4
  - 7 has 2 divisors: 1, 7
  The answer is the sum of divisors of 21 only ($32$).

#### Example 2:
- **Input:** `nums = [21, 21]`
- **Output:** `64`

#### Example 3:
- **Input:** `nums = [1, 2, 3, 4, 5]`
- **Output:** `0`

---

### Constraints

- $1 \le \text{nums.length} \le 10^4$
- $1 \le \text{nums}[i] \le 10^5$

---

## Topics and Tags

- **Array**
- **Math**

---

## Approach & Intuition

### 1. Factorization up to Square Root ($\mathcal{O}(\sqrt{n})$)

- Divisors of an integer $n$ always appear in reciprocal pairs $(d, n / d)$.
- Therefore, we only need to iterate $d$ from $1$ up to $\lfloor\sqrt{n}\rfloor$:
  - If $d \mid n$:
    - If $d^2 = n$, $d$ is a single square root divisor (add $1$ to count, add $d$ to sum).
    - If $d^2 \neq n$, both $d$ and $n / d$ are distinct divisors (add $2$ to count, add $d + n / d$ to sum).
- **Early Pruning Optimization:**
  If the divisor count exceeds $4$ at any point during iteration, $n$ cannot have exactly four divisors. We immediately break out of the loop and skip adding its sum.
- **Valid 4-Divisor Patterns:**
  Mathematically, an integer has exactly four divisors if and only if it is of the form:
  1. $p \times q$ where $p$ and $q$ are distinct prime numbers (divisors: $1, p, q, pq$).
  2. $p^3$ where $p$ is a prime number (divisors: $1, p, p^2, p^3$).

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N \sqrt{M})$, where $N$ is the number of elements in `nums` ($N \le 10^4$) and $M$ is the maximum value in `nums` ($M \le 10^5$). Since $\sqrt{10^5} \approx 316$, the maximum number of operations is bounded by $\approx 3.16 \times 10^6$, running well within standard time limits.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$, as only a few scalar variables are maintained.

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
