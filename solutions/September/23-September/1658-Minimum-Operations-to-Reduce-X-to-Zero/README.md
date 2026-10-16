# LeetCode 1658: Minimum Operations to Reduce X to Zero

- **Publication Date:** 23 September 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/](https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/-x_tYLqL-_8?si=vNtxBiTInMGZ5ZrE)

---

## Problem Summary

You are given an integer array `nums` and an integer `x`. In one operation, you can either remove the leftmost or the rightmost element from the array `nums` and subtract its value from `x`. Note that this modifies the array for future operations.

Return the **minimum number of operations** to reduce `x` to **exactly** `0` if it is possible, otherwise, return `-1`.

---

### Examples

#### Example 1:
- **Input:** `nums = [1,1,4,2,3], x = 5`
- **Output:** `2`
- **Explanation:** The optimal solution is to remove the last two elements (`[2, 3]`, sum = $5$) to reduce `x` to zero in $2$ operations.

#### Example 2:
- **Input:** `nums = [5,6,7,8,9], x = 4`
- **Output:** `-1`
- **Explanation:** It is impossible to reduce `x` to zero because every element in `nums` is strictly greater than $4$.

#### Example 3:
- **Input:** `nums = [3,2,20,1,1,3], x = 10`
- **Output:** `5`
- **Explanation:** The optimal solution is to remove the last three elements (`[1, 1, 3]`) and the first two elements (`[3, 2]`) for a total of $5$ operations.

---

### Constraints

- $1 \le \text{nums.length} \le 10^5$
- $1 \le \text{nums}[i] \le 10^4$
- $1 \le x \le 10^9$

---

## Topics and Tags

- **Array**
- **Hash Table**
- **Sliding Window**
- **Prefix Sum**

---

## Approach & Intuition

### 1. Inverting the Problem: Longest Subarray with Sum $(\text{total} - x)$
Removing elements from the leftmost and rightmost ends that sum to $x$ leaves behind a **contiguous central subarray**.
- Let the total sum of all elements in `nums` be $\text{total} = \sum_{i=0}^{n-1} \text{nums}[i]$.
- If the removed prefix and suffix sum to $x$, then the remaining central contiguous subarray must sum to:
  $$\text{target} = \text{total} - x$$
- Minimizing the number of removed elements $(L + R)$ is mathematically identical to **maximizing the length of the contiguous subarray** that sums to $\text{target}$.

### 2. Edge Case Handling
1. If $\text{target} < 0$: The sum of the entire array is strictly less than $x$. It is impossible to reduce $x$ to $0$, so return `-1`.
2. If $\text{target} == 0$: The entire array must be removed, requiring exactly $n = \text{nums.length}$ operations.

### 3. Sliding Window (Two Pointers)
Because all elements in `nums` are strictly positive ($nums[i] \ge 1$):
- Adding elements strictly increases the window sum.
- Removing elements strictly decreases the window sum.
- This strict monotonicity allows us to find the longest subarray summing to `target` using a two-pointer sliding window in linear time $\mathcal{O}(N)$ without needing a hash map.

**Algorithm:**
1. Maintain `windowSum = 0`, `left = 0`, and `maxLen = -1`.
2. Iterate `right` from $0$ to $n - 1$:
   - Add `nums[right]` to `windowSum`.
   - While `windowSum > target` and `left <= right`:
     - Subtract `nums[left]` from `windowSum`.
     - Increment `left`.
   - If `windowSum == target`:
     - Update `maxLen = max(maxLen, right - left + 1)`.
3. If `maxLen == -1`, return `-1`. Otherwise, the minimum operations required is $n - \text{maxLen}$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - The `right` pointer moves from $0$ to $n - 1$, and the `left` pointer moves from $0$ to $n - 1$. Each element is added and removed from `windowSum` at most once.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Constant extra space is used for the window boundaries and summation variables.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
