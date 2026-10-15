# LeetCode 3483: Unique 3-Digit Even Numbers

- **Publication Date:** 11 September 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/unique-3-digit-even-numbers/](https://leetcode.com/problems/unique-3-digit-even-numbers/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/zd7LLk7yjsA?si=i5tTg5y5Lob96hS1)

---

## Problem Summary

You are given an integer array `digits`. Your task is to determine the number of **distinct** three-digit even numbers that can be formed using these digits.

**Note:**
- Each copy of a digit can only be used **once per number**.
- The number formed **must not have leading zeros** (it must lie in the range $[100, 998]$).
- The number formed **must be even** (its units digit must be even).

---

### Examples

#### Example 1:
- **Input:** `digits = [1,2,3,4]`
- **Output:** `12`
- **Explanation:**
  The 12 distinct 3-digit even numbers that can be formed are:
  `124, 132, 134, 142, 214, 234, 312, 314, 324, 342, 412, and 432`.
  Note that 222 cannot be formed because there is only 1 copy of the digit 2.

#### Example 2:
- **Input:** `digits = [0,2,2]`
- **Output:** `2`
- **Explanation:**
  The only 3-digit even numbers that can be formed are `202` and `220`.
  Note that digit 2 can be used twice because it appears twice in the array.

#### Example 3:
- **Input:** `digits = [6,6,6]`
- **Output:** `1`
- **Explanation:**
  Only `666` can be formed.

#### Example 4:
- **Input:** `digits = [1,3,5]`
- **Output:** `0`
- **Explanation:**
  No even 3-digit numbers can be formed.

---

### Constraints

- $3 \le \text{digits.length} \le 10$
- $0 \le \text{digits}[i] \le 9$

---

## Topics and Tags

- **Array**
- **Hash Table**
- **Enumeration**

---

## Approach & Intuition (Brute Force Permutation & Set Deduplication)

1. **Problem Properties**:
   - We must select 3 distinct indices $(i, j, k)$ from the given `digits` array such that:
     1. $i \ne j$, $j \ne k$, and $i \ne k$.
     2. $\text{digits}[i] \ne 0$ (no leading zero).
     3. $\text{digits}[k] \pmod 2 == 0$ (even number requirement).
   - Form the number:
     $$\text{num} = \text{digits}[i] \times 100 + \text{digits}[j] \times 10 + \text{digits}[k]$$
   - Insert `num` into a hash set to automatically filter out duplicate numbers arising from duplicate digits in the input.

2. **Feasibility Analysis**:
   - The length of `digits` is at most $10$ ($N \le 10$).
   - A 3-nested loop visits at most $10 \times 10 \times 10 = 1,000$ index triplets.
   - Validating the three conditions and inserting into the hash set takes $\mathcal{O}(1)$ time per triplet.
   - The size of the set at the end gives the exact count of unique 3-digit even numbers.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N^3)$ where $N = \text{digits.length}$
  - For $N \le 10$, the loop runs at most $10^3 = 1,000$ iterations, which executes in less than $1\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - The maximum number of 3-digit even numbers in the range $[100, 998]$ is $450$. The hash set stores at most $450$ integers, representing strictly bounded $\mathcal{O}(1)$ auxiliary space.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/zd7LLk7yjsA?si=i5tTg5y5Lob96hS1](https://youtu.be/zd7LLk7yjsA?si=i5tTg5y5Lob96hS1)

---

## Resources & Community

- 🌐 **Platform Website:** [https://codebytushu.com/](https://codebytushu.com/)
- 💻 **All LeetCode Solutions:** [https://codebytushu.com/Leetcode/](https://codebytushu.com/Leetcode/)
- 📂 **GitHub Repository:** [https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions](https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions)
