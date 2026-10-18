# LeetCode 3756: Concatenate Non-Zero Digits and Multiply by Sum II

- **Publication Date:** 08 July 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/concatenate-non-zero-digits-and-multiply-by-sum-ii/](https://leetcode.com/problems/concatenate-non-zero-digits-and-multiply-by-sum-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/-vnZ4qg9DkQ?si=OIqqOmAPUoPdBJ3G)

---

## Problem Summary

You are given a string `s` of length `m` consisting of digits. You are also given a 2D integer array `queries`, where $\text{queries}[i] = [l_i, r_i]$.

For each $\text{queries}[i]$, extract the substring $s[l_i \dots r_i]$. Then, perform the following:
1. Form a new integer `x` by **concatenating all the non-zero digits** from the substring in their original order. If there are no non-zero digits, $x = 0$.
2. Let `sum` be the **sum of digits** in `x`. The answer is $x \times \text{sum}$.

Return an array of integers `answer` where $\text{answer}[i]$ is the answer to the $i^{\text{th}}$ query.

Since the answers may be very large, return them modulo $10^9 + 7$.

---

### Examples

#### Example 1:

- **Input:** `s = "10203004"`, `queries = [[0,7],[1,3],[4,6]]`
- **Output:** `[12340, 4, 9]`
- **Explanation:**
  - $s[0 \dots 7] = \text{"10203004"}$:
    - Non-zero digits form $x = 1234$.
    - $\text{sum} = 1 + 2 + 3 + 4 = 10$.
    - Answer: $1234 \times 10 = 12340$.
  - $s[1 \dots 3] = \text{"020"}$:
    - $x = 2$, $\text{sum} = 2$.
    - Answer: $2 \times 2 = 4$.
  - $s[4 \dots 6] = \text{"300"}$:
    - $x = 3$, $\text{sum} = 3$.
    - Answer: $3 \times 3 = 9$.

#### Example 2:

- **Input:** `s = "1000"`, `queries = [[0,3],[1,1]]`
- **Output:** `[1, 0]`
- **Explanation:**
  - $s[0 \dots 3] = \text{"1000"}$:
    - $x = 1$, $\text{sum} = 1$.
    - Answer: $1 \times 1 = 1$.
  - $s[1 \dots 1] = \text{"0"}$:
    - $x = 0$, $\text{sum} = 0$.
    - Answer: $0 \times 0 = 0$.

#### Example 3:

- **Input:** `s = "9876543210"`, `queries = [[0,9]]`
- **Output:** `[444444137]`
- **Explanation:**
  - $s[0 \dots 9] = \text{"9876543210"}$:
    - $x = 987654321$.
    - $\text{sum} = 9 + 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1 = 45$.
    - Product: $987654321 \times 45 = 4444444445$.
    - Result modulo $10^9 + 7$: $4444444445 \pmod{10^9 + 7} = 444444137$.

---

### Constraints

- $1 \le m == s.\text{length} \le 10^5$
- `s` consists of digits only.
- $1 \le \text{queries}.\text{length} \le 10^5$
- $\text{queries}[i] = [l_i, r_i]$
- $0 \le l_i \le r_i < m$

---

## Topics and Tags

- **Segment Tree**
- **Prefix Sum**
- **String**
- **Math**

---

## Intuition and Approach

The challenge lies in answering up to $10^5$ range queries over a digit string of length up to $10^5$. A naive simulation per query requires $\mathcal{O}(m)$ time, which would result in $\mathcal{O}(m \cdot q) \approx 10^{10}$ operations and **Time Limit Exceeded (TLE)**.

We can solve this problem efficiently using either **Segment Trees** or **Prefix Arrays**.

### Approach 1: Segment Tree

Each segment tree node maintains three properties for its corresponding interval:
1. `val`: The number formed by non-zero digits modulo $10^9 + 7$.
2. `len`: The total count of non-zero digits in the interval.
3. `sum`: The sum of all digits in the interval.

#### Merge Step:
When combining a left child $A$ and a right child $B$:
- $\text{len}_{\text{merged}} = A.\text{len} + B.\text{len}$
- $\text{sum}_{\text{merged}} = A.\text{sum} + B.\text{sum}$
- $\text{val}_{\text{merged}} = (A.\text{val} \times 10^{B.\text{len}} + B.\text{val}) \pmod{10^9 + 7}$

Building takes $\mathcal{O}(m)$ time and each query takes $\mathcal{O}(\log m)$ time.

### Approach 2: Prefix Arrays with Modular Arithmetic ($\mathcal{O}(1)$ Query)

We can precompute three prefix arrays of length $m + 1$:
1. `pref_cnt[i]`: Number of non-zero digits in $s[0 \dots i-1]$.
2. `pref_sum[i]`: Sum of digits in $s[0 \dots i-1]$.
3. `pref_val[i]`: Integer formed by all non-zero digits in $s[0 \dots i-1] \pmod{10^9 + 7}$.

For a query range $[l, r]$:
- $\text{cnt} = \text{pref\_cnt}[r+1] - \text{pref\_cnt}[l]$
- $\text{digit\_sum} = \text{pref\_sum}[r+1] - \text{pref\_sum}[l]$
- $x = (\text{pref\_val}[r+1] - \text{pref\_val}[l] \times 10^{\text{cnt}}) \pmod{10^9 + 7}$

The query answer is $(x \times \text{digit\_sum}) \pmod{10^9 + 7}$ in $\mathcal{O}(1)$ time.

---

## Complexity Analysis

| Approach | Preprocessing Time | Query Time | Overall Time | Space Complexity |
| :--- | :---: | :---: | :---: | :---: |
| **Segment Tree** | $\mathcal{O}(m)$ | $\mathcal{O}(\log m)$ | $\mathcal{O}(m + q \log m)$ | $\mathcal{O}(m)$ |
| **Prefix Arrays** | $\mathcal{O}(m)$ | $\mathcal{O}(1)$ | $\mathcal{O}(m + q)$ | $\mathcal{O}(m)$ |

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
