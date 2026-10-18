# LeetCode 3514: Number of Unique XOR Triplets II

- **Publication Date:** 24 July 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/number-of-unique-xor-triplets-ii/](https://leetcode.com/problems/number-of-unique-xor-triplets-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/o8OQ4-V2yDo?si=PW3P9gcL8GH71hWp)

---

## Problem Summary

You are given an integer array `nums`.

A **XOR triplet** is defined as the XOR of three elements `nums[i] XOR nums[j] XOR nums[k]` where $i \le j \le k$.

Return the number of **unique** XOR triplet values from all possible triplets `(i, j, k)`.

---

### Examples

#### Example 1:

- **Input:** `nums = [1, 3]`
- **Output:** `2`
- **Explanation:**
  The possible XOR triplet values are:
  - $(0, 0, 0) \rightarrow 1 \oplus 1 \oplus 1 = 1$
  - $(0, 0, 1) \rightarrow 1 \oplus 1 \oplus 3 = 3$
  - $(0, 1, 1) \rightarrow 1 \oplus 3 \oplus 3 = 1$
  - $(1, 1, 1) \rightarrow 3 \oplus 3 \oplus 3 = 3$
  The unique XOR values are $\{1, 3\}$. Thus, the output is `2`.

#### Example 2:

- **Input:** `nums = [6, 7, 8, 9]`
- **Output:** `4`
- **Explanation:**
  The possible XOR triplet values are $\{6, 7, 8, 9\}$. Thus, the output is `4`.

---

### Constraints

- $1 \le \text{nums.length} \le 1500$
- $1 \le \text{nums}[i] \le 1500$

---

## Algorithmic Approach

### 1. Understanding Index Repetition
The condition $i \le j \le k$ specifies that three indices are chosen in non-decreasing order:
- All three indices can be identical: $(i, i, i) \rightarrow \text{nums}[i] \oplus \text{nums}[i] \oplus \text{nums}[i] = \text{nums}[i]$.
- Two indices can be identical: $(i, i, k)$ or $(i, k, k) \rightarrow \text{nums}[k]$ or $\text{nums}[i]$.
- All three indices can be distinct: $(i, j, k)$ with $i < j < k \rightarrow \text{nums}[i] \oplus \text{nums}[j] \oplus \text{nums}[k]$.

This means any element in `nums` may be chosen $0, 1, 2,$ or $3$ times to form the multiset of 3 elements.

### 2. Bounded XOR Range
Since each element satisfies $1 \le \text{nums}[i] \le 1500 < 2048 = 2^{11}$, all numbers have bit representations that use at most $11$ bits (indices $0$ to $10$). The XOR sum of any 3 elements can never exceed $2047$. Therefore, the value domain is strictly bounded by $\text{MAX} = 2048$.

### 3. Dynamic Programming State
We maintain a DP table `dp[k][v]`:
- `k`: the number of elements chosen so far ($0 \le k \le 3$).
- `v`: the current XOR sum ($0 \le v < 2048$).
- `dp[k][v] = true` if a subset of $k$ items can produce a XOR sum of $v$.
- **Base Case:** `dp[0][0] = true`, all other values initialized to `false`.

### 4. Transitions
For each element $x \in \text{nums}$:
We allow using the current index up to $3$ times. For each repetition $t \in \{0, 1, 2\}$:
- Iterate $k$ backwards from $2$ down to $0$ (standard 0/1 knapsack technique to avoid using the same transition multiple times in the same step).
- For every value $v \in [0, \text{MAX}-1]$ where `next[k][v]` is reachable:
  $$\text{next}[k + 1][v \oplus x] = \text{true}$$
- After considering up to $3$ uses of $x$, update `dp = next`.

### 5. Final Result
The total number of unique XOR triplet values is simply the count of values $v$ where `dp[3][v] == true`.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(n \cdot \text{MAX})$ | For each of the $n$ elements, we run $3 \times 3$ passes over an array of size $\text{MAX} = 2048$. With $n \le 1500$, total operations are $\approx 2.7 \times 10^7$, running in $< 50\text{ ms}$. |
| **Auxiliary Space** | $\mathcal{O}(\text{MAX})$ | We maintain two $4 \times 2048$ boolean/bit matrices for `dp` and `next`. |

---

## Multi-Language Implementations

- [Java Solution](./Solution.java)
- [Python Solution](./solution.py)
- [C++ Solution](./solution.cpp)
- [JavaScript Solution](./solution.js)
