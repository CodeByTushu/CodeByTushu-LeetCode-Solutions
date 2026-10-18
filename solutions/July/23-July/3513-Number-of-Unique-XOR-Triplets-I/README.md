# LeetCode 3513: Number of Unique XOR Triplets I

- **Publication Date:** 23 July 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/number-of-unique-xor-triplets-i/](https://leetcode.com/problems/number-of-unique-xor-triplets-i/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/4l7KYM-hVA8?si=txV_pVPo-KCtDqvv)

---

## Problem Summary

You are given an integer array `nums` of length `n`, where `nums` is a **permutation** of the numbers in the range `[1, n]`.

A **XOR triplet** is defined as the XOR of three elements `nums[i] XOR nums[j] XOR nums[k]` where $i \le j \le k$.

Return the number of **unique** XOR triplet values from all possible triplets `(i, j, k)`.

---

### Examples

#### Example 1:

- **Input:** `nums = [1, 2]`
- **Output:** `2`
- **Explanation:**
  The possible XOR triplet values are:
  - $(0, 0, 0) \rightarrow 1 \oplus 1 \oplus 1 = 1$
  - $(0, 0, 1) \rightarrow 1 \oplus 1 \oplus 2 = 2$
  - $(0, 1, 1) \rightarrow 1 \oplus 2 \oplus 2 = 1$
  - $(1, 1, 1) \rightarrow 2 \oplus 2 \oplus 2 = 2$
  The unique XOR values are $\{1, 2\}$, so the output is `2`.

#### Example 2:

- **Input:** `nums = [3, 1, 2]`
- **Output:** `4`
- **Explanation:**
  The possible XOR triplet values include:
  - $(0, 0, 0) \rightarrow 3 \oplus 3 \oplus 3 = 3$
  - $(0, 0, 1) \rightarrow 3 \oplus 3 \oplus 1 = 1$
  - $(0, 0, 2) \rightarrow 3 \oplus 3 \oplus 2 = 2$
  - $(0, 1, 2) \rightarrow 3 \oplus 1 \oplus 2 = 0$
  The unique XOR values are $\{0, 1, 2, 3\}$, so the output is `4`.

---

### Constraints

- $1 \le n == \text{nums.length} \le 10^5$
- $1 \le \text{nums}[i] \le n$
- `nums` is a permutation of integers from $1$ to $n$.

---

## Algorithmic Approach

### 1. Structure of XOR Triplets
Since the indices must satisfy $i \le j \le k$, we can choose any triplet of elements from `nums` where elements may be identical or distinct:
- If we choose $i = j$, then $\text{nums}[i] \oplus \text{nums}[i] \oplus \text{nums}[k] = 0 \oplus \text{nums}[k] = \text{nums}[k]$.
- Because `nums` is a permutation of $1$ through $n$, every integer $x \in \{1, 2, \dots, n\}$ is guaranteed to be achievable.

### 2. Base Cases
- **Case $n = 1$:** `nums = [1]`. The only triplet is $1 \oplus 1 \oplus 1 = 1$. The only unique value is $\{1\}$, so the answer is `1`.
- **Case $n = 2$:** `nums = [1, 2]`.
  - All possible triplets yield either $1$ or $2$.
  - To achieve $0$, we would need $a \oplus b \oplus c = 0 \implies a \oplus b = c$. With $a, b \in \{1, 2\}$, the XOR is $1 \oplus 2 = 3 \notin \{1, 2\}$.
  - Hence, neither $0$ nor $3$ can be formed. The unique XOR values are $\{1, 2\}$, so the answer is `2`.

### 3. General Case ($n \ge 3$)
- For any $n \ge 3$, $1 \oplus 2 = 3 \le n$, which means $1 \oplus 2 \oplus 3 = 0$ is always achievable. Thus $0$ is part of the reachable set.
- Let $M$ be the most significant bit (MSB) of $n$. All numbers in `nums` satisfy $1 \le \text{nums}[i] < 2^{\lfloor \log_2 n \rfloor + 1}$.
- XORing any 3 numbers whose bits are bounded by the MSB of $n$ can never set a bit higher than the MSB of $n$. Therefore, every achievable value must be strictly less than the smallest power of 2 that is strictly greater than $n$.
- Furthermore, for any $n \ge 3$, all values in the continuous range $[0, 2^{\lfloor \log_2 n \rfloor + 1} - 1]$ are achievable by combining 3 elements.
- Consequently, for $n \ge 3$, the answer is simply the **smallest power of 2 strictly greater than $n$**.

### 4. Direct Computation
- If $n == 1$, return `1`.
- If $n == 2$, return `2`.
- Otherwise, start with $\text{ans} = 1$ and repeatedly double $\text{ans} \leftarrow \text{ans} \ll 1$ until $\text{ans} > n$. Return $\text{ans}$.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(\log n)$ / $\mathcal{O}(1)$ | We double `ans` at most $\approx \log_2 n$ times (at most 17 iterations for $n \le 10^5$). |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Only a single integer variable `ans` is maintained. |

---

## Multi-Language Implementations

- [Java Solution](./Solution.java)
- [Python Solution](./solution.py)
- [C++ Solution](./solution.cpp)
- [JavaScript Solution](./solution.js)
