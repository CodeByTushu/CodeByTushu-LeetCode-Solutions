# LeetCode 1984: Minimum Difference Between Highest and Lowest of K Scores

- **Publication Date:** 25 January 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/minimum-difference-between-highest-and-lowest-of-k-scores/](https://leetcode.com/problems/minimum-difference-between-highest-and-lowest-of-k-scores/)
- **YouTube Solution:** *Coming Soon* ⏳

---

## Problem Summary

You are given a 0-indexed integer array `nums`, where `nums[i]` represents the score of the $i^{\text{th}}$ student. You are also given an integer `k`.

Pick the scores of any `k` students from the array so that the difference between the **highest** and the **lowest** of the `k` scores is **minimized**.

Return the **minimum possible difference**.

---

### Examples

#### Example 1:
- **Input:** `nums = [90], k = 1`
- **Output:** `0`
- **Explanation:**
  - There is one way to pick score(s) of one student: $[90]$.
  - The difference between the highest and lowest score is $90 - 90 = 0$.
  - The minimum possible difference is $0$.

#### Example 2:
- **Input:** `nums = [9, 4, 1, 7], k = 2`
- **Output:** `2`
- **Explanation:**
  - There are six ways to pick scores of two students:
    - $[9, 4] \implies 9 - 4 = 5$
    - $[9, 1] \implies 9 - 1 = 8$
    - $[9, 7] \implies 9 - 7 = 2$
    - $[4, 1] \implies 4 - 1 = 3$
    - $[4, 7] \implies 7 - 4 = 3$
    - $[1, 7] \implies 7 - 1 = 6$
  - The minimum possible difference is $2$.

---

### Constraints

- $1 \le k \le \text{nums.length} \le 1000$
- $0 \le \text{nums}[i] \le 10^5$

---

## Topics and Tags

- **Array**
- **Sorting**
- **Sliding Window**

---

## Approach & Intuition

### Step-by-Step Algorithm:

1. **Base Case:**
   - When $k = 1$, we pick only $1$ score, whose difference with itself is always $0$.

2. **Sorting Principle:**
   - To minimize the spread (difference between the maximum and minimum elements) of any chosen subset of size $k$, the elements must be as close to each other as possible.
   - If we sort the array in ascending order:
     $$\text{nums}[0] \le \text{nums}[1] \le \dots \le \text{nums}[n - 1]$$
   - Any optimal subset of size $k$ will appear as a **contiguous subarray (window)** of size $k$.
   - Why? If we picked non-contiguous elements with minimum $x$ and maximum $y$, replacing intermediate gaps with actual elements within that range cannot increase the difference $y - x$. Thus, the tightest cluster of $k$ elements is always contiguous in sorted order.

3. **Fixed-Size Sliding Window:**
   - After sorting `nums`, every contiguous window of length $k$ starting at index $i$ has:
     - Lowest score: $\text{nums}[i]$
     - Highest score: $\text{nums}[i + k - 1]$
     - Difference: $\text{nums}[i + k - 1] - \text{nums}[i]$
   - We slide this window of length $k$ across all valid start indices $0 \le i \le n - k$, updating our global minimum difference:
     $$\text{minDiff} = \min_{0 \le i \le n - k} (\text{nums}[i + k - 1] - \text{nums}[i])$$

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n \log n)$
  - Sorting an array of length $n$ takes $\mathcal{O}(n \log n)$ time.
  - The sliding window loop executes $n - k + 1$ iterations, performing $\mathcal{O}(1)$ work per iteration.
  - Overall time: $\mathcal{O}(n \log n) + \mathcal{O}(n) = \mathcal{O}(n \log n)$. Given $n \le 1000$, this requires $< 10^4$ operations and executes in $< 1\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$ or $\mathcal{O}(\log n)$
  - In-place sorting uses $\mathcal{O}(\log n)$ recursion stack space.
  - No auxiliary data structures are required.

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
