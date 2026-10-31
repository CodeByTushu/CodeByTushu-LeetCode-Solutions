# LeetCode 3013: Divide an Array Into Subarrays With Minimum Cost II

- **Publication Date:** 02 February 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/divide-an-array-into-subarrays-with-minimum-cost-ii/](https://leetcode.com/problems/divide-an-array-into-subarrays-with-minimum-cost-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/hFWwaOrL5is?si=Z8XotQ-BuvflPYsM)

---

## Problem Summary

You are given a **0-indexed** array of integers `nums` of length `n`, and two positive integers `k` and `dist`.

The **cost** of an array is the value of its **first element**. For example, the cost of `[1, 2, 3]` is $1$, while the cost of `[3, 4, 1]` is $3$.

You need to divide `nums` into **`k` disjoint contiguous subarrays**, such that the difference between the starting index of the second subarray and the starting index of the $k^{\text{th}}$ subarray is **less than or equal to `dist`**.

In other words, if you divide `nums` into subarrays starting at indices $0 = i_0 < i_1 < i_2 < \dots < i_{k-1} \le n - 1$, then:
$$i_{k-1} - i_1 \le \text{dist}$$

Return the **minimum possible sum** of the cost of these subarrays.

---

### Examples

#### Example 1:
- **Input:** `nums = [1, 3, 2, 6, 4, 2], k = 3, dist = 3`
- **Output:** `5`
- **Explanation:** The best possible way to divide `nums` into 3 subarrays is: `[1, 3]`, `[2, 6, 4]`, and `[2]`.
  This choice is valid because $i_{k-1} - i_1$ is $5 - 2 = 3 \le \text{dist}$.
  The total cost is $\text{nums}[0] + \text{nums}[2] + \text{nums}[5] = 1 + 2 + 2 = 5$.
  No lower cost is achievable.

#### Example 2:
- **Input:** `nums = [10, 1, 2, 2, 2, 1], k = 4, dist = 3`
- **Output:** `15`
- **Explanation:** The best possible way to divide `nums` into 4 subarrays is: `[10]`, `[1]`, `[2]`, and `[2, 2, 1]`.
  This choice is valid because $i_{k-1} - i_1$ is $3 - 1 = 2 \le \text{dist}$.
  The total cost is $\text{nums}[0] + \text{nums}[1] + \text{nums}[2] + \text{nums}[3] = 10 + 1 + 2 + 2 = 15$.

#### Example 3:
- **Input:** `nums = [10, 8, 18, 9], k = 3, dist = 1`
- **Output:** `36`
- **Explanation:** The best possible way to divide `nums` into 3 subarrays is: `[10]`, `[8]`, and `[18, 9]`.
  This choice is valid because $i_{k-1} - i_1 = 2 - 1 = 1 \le \text{dist}$.
  The total cost is $\text{nums}[0] + \text{nums}[1] + \text{nums}[2] = 10 + 8 + 18 = 36$.

---

### Constraints

- $3 \le n \le 10^5$
- $1 \le \text{nums}[i] \le 10^9$
- $3 \le k \le n$
- $k - 2 \le \text{dist} \le n - 2$

---

## Topics and Tags

- **Array**
- **Sliding Window**
- **Heap / Priority Queue**
- **Data Structure**

---

## Approach & Intuition

### 1. Mathematical Reduction to Sliding Window Top-M Selection

1. **Fixed Starting Element:**
   - Any valid partition of `nums` into $k$ contiguous subarrays must have the first subarray begin at index $0$. Hence, $\text{nums}[0]$ is an unavoidable component of every valid partition sum.
   - We must select the remaining $m = k - 1$ starting indices $1 \le i_1 < i_2 < \dots < i_{k-1} \le n - 1$.

2. **Distance Constraint Analysis:**
   - The condition $i_{k-1} - i_1 \le \text{dist}$ states that the span between the first and last of these $k - 1$ starting indices cannot exceed `dist`.
   - Consequently, all $k - 1$ indices must reside entirely inside some window of length at most $\text{dist} + 1$.
   - Conversely, inside *any* contiguous window of indices $[L, R]$ with $R - L \le \text{dist}$, any selection of $k - 1$ distinct elements automatically satisfies the distance requirement.
   - Therefore, the problem reduces to: **Find the sliding window of size $\text{dist} + 1$ across `nums[1 ... n - 1]` that minimizes the sum of its $k - 1$ smallest elements.**

### 2. Dynamic Top-M Maintenance (Two Balanced Sets / Fenwick Tree)

To evaluate the sum of the $m = k - 1$ smallest elements in a sliding window of size $\text{dist} + 1$ in $\mathcal{O}(\log(\text{dist}))$ per step:
- We partition the window elements into two balanced containers:
  - **Left Container (`left`):** Holds exactly $m$ smallest elements. We track `sumL` dynamically.
  - **Right Container (`right`):** Holds the remaining elements in the active window.
- **Invariants:**
  - $|\text{left}| = m$ (once the window has at least $m$ elements).
  - Every element in `left` is $\le$ every element in `right` ($\max(\text{left}) \le \min(\text{right})$).
- **Window Sliding (Add & Remove):**
  - **Add `x`:** If $x < \max(\text{left})$, swap out $\max(\text{left})$ into `right` and insert $x$ into `left`, updating `sumL`. Otherwise, insert $x$ into `right`.
  - **Remove `y`:** If $y \in \text{left}$, remove it from `left`, subtract $y$ from `sumL`, and promote $\min(\text{right})$ into `left`. Otherwise, remove $y$ from `right`.
- **Alternative (Fenwick Tree with Coordinate Compression):**
  - Compress values of `nums[1 ... n - 1]`.
  - Maintain a frequency BIT and a prefix sum BIT.
  - Querying the sum of the $m$ smallest values takes $\mathcal{O}(\log n)$ via binary lifting.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n \log(\text{dist}))$ using two balanced sets, or $\mathcal{O}(n \log n)$ using coordinate compression with a Binary Indexed Tree (Fenwick Tree).
  - Each of the $n$ sliding window steps takes $\mathcal{O}(\log(\text{dist}))$ time to insert, delete, and rebalance.
- **Auxiliary Space Complexity:** $\mathcal{O}(\text{dist})$ auxiliary memory for the balanced sets (or $\mathcal{O}(n)$ for the Fenwick Tree coordinate compression arrays).

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [Watch Video on YouTube](https://youtu.be/hFWwaOrL5is?si=Z8XotQ-BuvflPYsM)
