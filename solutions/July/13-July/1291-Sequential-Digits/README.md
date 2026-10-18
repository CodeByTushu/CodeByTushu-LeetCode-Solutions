# LeetCode 1291: Sequential Digits

- **Publication Date:** 13 July 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/sequential-digits/](https://leetcode.com/problems/sequential-digits/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/sYN1lfIinxw?si=9nQ2oLjfLTM3VMpd)

---

## Problem Summary

An integer has **sequential digits** if and only if each digit in the number is one more than the previous digit (e.g., $12$, $234$, $12345$).

Given two integers `low` and `high`, return a **sorted list** of all the integers in the range $[\text{low}, \text{high}]$ inclusive that have sequential digits.

---

### Examples

#### Example 1:

- **Input:** `low = 100`, `high = 300`
- **Output:** `[123, 234]`
- **Explanation:** The sequential digit numbers within $[100, 300]$ are $123$ and $234$.

#### Example 2:

- **Input:** `low = 1000`, `high = 13000`
- **Output:** `[1234, 2345, 3456, 4567, 5678, 6789, 12345]`
- **Explanation:** All 4-digit sequential numbers and the only 5-digit sequential number $\le 13000$ ($12345$) are included.

---

### Constraints

- $10 \le \text{low} \le \text{high} \le 10^9$

---

## Algorithmic Approach

### Breadth-First Search (BFS) / Queue-Based Generation

Instead of scanning all integers between `low` and `high` (which could be up to $10^9$), we generate **only the valid sequential digit numbers**:

1. **Seed Queue with Base Digits:**
   - Enqueue the single digits $1, 2, 3, 4, 5, 6, 7, 8, 9$.
2. **Iterative Digit Appending (BFS):**
   - Dequeue the current number `num`.
   - If $\text{low} \le \text{num} \le \text{high}$, add `num` to the answer list.
   - If $\text{num} > \text{high}$, continue without branching since any further appended digits will only produce larger numbers.
   - Extract the trailing digit: $\text{lastDigit} = \text{num} \pmod{10}$.
   - If $\text{lastDigit} < 9$, append the next consecutive digit $\text{lastDigit} + 1$:
     $$\text{nextNum} = \text{num} \times 10 + (\text{lastDigit} + 1)$$
     Enqueue $\text{nextNum}$.
3. **Sort and Return:**
   - Since BFS processes numbers by their magnitude and length, sorting the final list ensures elements are in strictly increasing order.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(1)$ | The maximum number of sequential digit numbers with lengths between $2$ and $9$ is strictly bounded by $\sum_{k=2}^9 (10 - k) = 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1 = 36$. Processing and sorting at most $36$ numbers executes in constant $\mathcal{O}(1)$ time. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | The queue and output list hold at most $36$ integers, consuming constant extra memory. |

---

## Multi-Language Implementations

- [Java Solution](./Solution.java)
- [Python Solution](./solution.py)
- [C++ Solution](./solution.cpp)
- [JavaScript Solution](./solution.js)
