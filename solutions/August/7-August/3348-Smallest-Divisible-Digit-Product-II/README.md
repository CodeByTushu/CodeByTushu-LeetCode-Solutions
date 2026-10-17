# LeetCode 3348: Smallest Divisible Digit Product II

- **Publication Date:** 07 August 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/smallest-divisible-digit-product-ii/](https://leetcode.com/problems/smallest-divisible-digit-product-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/PaAX31HX3kw?si=hmbUMET4sm4Apbwm)

---

## Problem Summary

You are given a string `num` which represents a positive integer, and an integer `t`.

A number is called **zero-free** if none of its digits are `0`.

Return a string representing the **smallest zero-free number** greater than or equal to `num` such that the **product of its digits** is divisible by `t`. If no such number exists, return `"-1"`.

---

### Examples

#### Example 1:

- **Input:** `num = "1234", t = 256`
- **Output:** `"1488"`
- **Explanation:**
  - The smallest zero-free number that is greater than `1234` and has the product of its digits divisible by `256` is `1488`.
  - Digit product: $1 \times 4 \times 8 \times 8 = 256$, which is divisible by `256`.

#### Example 2:

- **Input:** `num = "12355", t = 50`
- **Output:** `"12355"`
- **Explanation:**
  - `12355` is already zero-free.
  - Digit product: $1 \times 2 \times 3 \times 5 \times 5 = 150$.
  - $150 \pmod{50} == 0$, so `12355` is itself the answer.

#### Example 3:

- **Input:** `num = "11111", t = 26`
- **Output:** `"-1"`
- **Explanation:**
  - $26 = 2 \times 13$. The prime factor $13$ cannot be formed by the product of any single digits ($1$ through $9$).
  - Hence, no such number can ever exist.

---

### Constraints

- $2 \le \text{num.length} \le 2 \times 10^5$
- `num` consists only of digits in the range `['0', '9']`.
- `num` does not contain leading zeros.
- $1 \le t \le 10^{14}$

---

## Topics and Tags

- **Math**
- **String**
- **Greedy**
- **Number Theory**

---

## Intuition and Approach

### 1. Prime Factorization of $t$:
Every non-zero decimal digit $d \in [1, 9]$ only contains prime factors $2, 3, 5$, and $7$:
- $2 = 2^1$, $3 = 3^1$, $4 = 2^2$, $5 = 5^1$, $6 = 2^1 \times 3^1$, $7 = 7^1$, $8 = 2^3$, $9 = 3^2$.
- If $t$ contains any prime factor strictly greater than $7$ (e.g., $11, 13, 17, \dots$), no combination of digits can ever produce a product divisible by $t$. In this case, immediately return `"-1"`.

Factorize $t = 2^{c_2} \cdot 3^{c_3} \cdot 5^{c_5} \cdot 7^{c_7}$.

### 2. Optimal Greedy Digit Packing:
To represent required prime factor counts $(c_2, c_3, c_5, c_7)$ using the **minimum number of digits**:
- Greedily group three $2$'s into an $8$.
- Greedily group two $3$'s into a $9$.
- Greedily group remaining two $2$'s into a $4$.
- If one $2$ and one $3$ remain, combine them into a $6$.
- If one $3$ and one $4$ remain ($3 \times 4 = 12 = 2 \times 6$), convert them into one $2$ and one $6$ to minimize the digit values.
- $5$'s and $7$'s cannot be combined and are placed directly.
- The minimum number of required non-one digits is the sum of these grouped counts.

### 3. Finding the Smallest Number:
1. **Direct Match:**
   - If `num` has no `'0'` and its prefix digit products already contain all required prime factors of $t$, then `num` is already optimal; return `num`.
2. **Same Length Check (Right-to-Left Search):**
   - We search from right to left (`i = n - 1` down to `0`). We can only keep a valid prefix if indices $0 \dots i-1$ contain no `'0'`.
   - At index $i$, try each replacement digit `bigger` from `num[i] + 1` up to `9`.
   - Compute remaining prime factors needed.
   - If the minimum required digits for the remaining factors fit within the remaining slots (`spaceAfter = n - 1 - i`), we can form a valid number of the same length!
   - Pad the excess slots with `'1'`s and append the required digits in ascending sorted order (`2` through `9`).
3. **Length Extension:**
   - If no valid number of length $n$ exists, we must extend to length $\max(n + 1, \text{minDigits})$.
   - Pad the prefix with `'1'`s and append the greedily packed factors in ascending sorted order.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(|\text{num}|)$
  - Factoring $t$ takes $\mathcal{O}(\log t)$ arithmetic operations ($\le 50$ operations for $t \le 10^{14}$).
  - Calculating the initial prefix prime factor counts takes $\mathcal{O}(|\text{num}|)$.
  - The right-to-left scan iterates at most $|\text{num}|$ times, each trying at most $8$ digits with $\mathcal{O}(1)$ prime-count arithmetic.
  - Overall time is strictly linear $\mathcal{O}(|\text{num}|)$, running comfortably within $50\text{ ms}$ for $|\text{num}| = 2 \times 10^5$.
- **Auxiliary Space Complexity:** $\mathcal{O}(|\text{num}|)$
  - Memory required to construct and store the result string of length $\approx |\text{num}|$.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
