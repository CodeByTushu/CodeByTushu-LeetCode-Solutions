# LeetCode 3010: Divide an Array Into Subarrays With Minimum Cost I

- **Publication Date:** 01 February 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/divide-an-array-into-subarrays-with-minimum-cost-i/](https://leetcode.com/problems/divide-an-array-into-subarrays-with-minimum-cost-i/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/f50mXOXajLI?si=Su6nVcR0QtGRDKhf)

---

## Problem Summary

You are given an array of integers `nums` of length `n`.

The **cost** of an array is the value of its **first element**. For example, the cost of `[1, 2, 3]` is $1$, while the cost of `[3, 4, 1]` is $3$.

You need to divide `nums` into **$3$ disjoint contiguous subarrays**.

Return the **minimum possible sum** of the cost of these subarrays.

---

### Examples

#### Example 1:
- **Input:** `nums = [1, 2, 3, 12]`
- **Output:** `6`
- **Explanation:** The best possible way to form 3 subarrays is: `[1]`, `[2]`, and `[3, 12]` at a total cost of $1 + 2 + 3 = 6$.
  Other possible partitionings include:
  - `[1]`, `[2, 3]`, and `[12]` at a cost of $1 + 2 + 12 = 15$.
  - `[1, 2]`, `[3]`, and `[12]` at a cost of $1 + 3 + 12 = 16$.

#### Example 2:
- **Input:** `nums = [5, 4, 3]`
- **Output:** `12`
- **Explanation:** The best possible way to form 3 subarrays is: `[5]`, `[4]`, and `[3]` at a total cost of $5 + 4 + 3 = 12$. It can be shown that 12 is the minimum cost achievable.

#### Example 3:
- **Input:** `nums = [10, 3, 1, 1]`
- **Output:** `12`
- **Explanation:** The best possible way to form 3 subarrays is: `[10, 3]`, `[1]`, and `[1]` at a total cost of $10 + 1 + 1 = 12$.

---

### Constraints

- $3 \le n \le 50$
- $1 \le \text{nums}[i] \le 50$

---

## Topics and Tags

- **Array**
- **Greedy**
- **Sorting**

---

## Approach & Intuition

### 1. Fixed First Element & Greedy Selection

1. **Subarray Structure & Fixed Cost:**
   - Any valid division of `nums` into three contiguous non-empty subarrays partitions the array into three segments:
     - Subarray 1: `nums[0 ... i - 1]`
     - Subarray 2: `nums[i ... j - 1]`
     - Subarray 3: `nums[j ... n - 1]`
     where the boundary indices satisfy $1 \le i < j \le n - 1$.
   - The cost of Subarray 1 is always `nums[0]`, regardless of where $i$ and $j$ are chosen.
   - The cost of Subarray 2 is `nums[i]`.
   - The cost of Subarray 3 is `nums[j]`.
   - Therefore, the total sum of costs is:
     $$\text{Total Cost} = \text{nums}[0] + \text{nums}[i] + \text{nums}[j]$$

2. **Selecting Optimal Starting Indices:**
   - To minimize the total cost, we must minimize $\text{nums}[i] + \text{nums}[j]$ subject to $1 \le i < j \le n - 1$.
   - Since any pair of distinct indices $i$ and $j$ ($1 \le i < j < n$) defines valid non-empty contiguous subarrays, this problem reduces directly to finding the **two smallest elements** in the subarray `nums[1 ... n - 1]`.

3. **Optimal $\mathcal{O}(n)$ Single-Pass Search:**
   - While sorting `nums[1 ... n - 1]` would yield $\mathcal{O}(n \log n)$ time, we can track the two smallest values `min1` and `min2` in a single linear scan from index $1$ to $n - 1$:
     - If `nums[k] < min1`: update `min2 = min1`, then `min1 = nums[k]`.
     - Else if `nums[k] < min2`: update `min2 = nums[k]`.
   - The minimal answer is simply `nums[0] + min1 + min2`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$, where $n$ is the length of `nums`. We perform a single linear traversal of the elements from index $1$ to $n - 1$, examining each element in constant $\mathcal{O}(1)$ time.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$. Only two scalar variables (`min1` and `min2`) are maintained, requiring strictly constant extra memory.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [Watch Video on YouTube](https://youtu.be/f50mXOXajLI?si=Su6nVcR0QtGRDKhf)
