# LeetCode 2615: Sum of Distances

- **Publication Date:** 23 April 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/sum-of-distances/](https://leetcode.com/problems/sum-of-distances/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/-qxO82UPJH4)

---

## Problem Summary

You are given a 0-indexed integer array `nums`. There exists an array `arr` of length `nums.length`, where `arr[i]` is the sum of $|i - j|$ over all $j$ such that `nums[j] == nums[i]` and $j \ne i$. If there is no such $j$, set `arr[i]` to be `0`.

Return the array `arr`.

---

### Examples

#### Example 1:
- **Input:** `nums = [1,3,1,1,2]`
- **Output:** `[5,0,3,4,0]`
- **Explanation:**
  - When $i = 0$, $\text{nums}[0] == \text{nums}[2]$ and $\text{nums}[0] == \text{nums}[3]$. Therefore, $\text{arr}[0] = |0 - 2| + |0 - 3| = 5$.
  - When $i = 1$, $\text{arr}[1] = 0$ because there is no other index with value $3$.
  - When $i = 2$, $\text{nums}[2] == \text{nums}[0]$ and $\text{nums}[2] == \text{nums}[3]$. Therefore, $\text{arr}[2] = |2 - 0| + |2 - 3| = 3$.
  - When $i = 3$, $\text{nums}[3] == \text{nums}[0]$ and $\text{nums}[3] == \text{nums}[2]$. Therefore, $\text{arr}[3] = |3 - 0| + |3 - 2| = 4$.
  - When $i = 4$, $\text{arr}[4] = 0$ because there is no other index with value $2$.

#### Example 2:
- **Input:** `nums = [0,5,3]`
- **Output:** `[0,0,0]`
- **Explanation:** Since each element in `nums` is distinct, $\text{arr}[i] = 0$ for all $i$.

---

### Constraints

- $1 \le \text{nums.length} \le 10^5$
- $0 \le \text{nums}[i] \le 10^9$

---

## Topics and Tags

- **Array**
- **Hash Table**
- **Prefix Sum**

---

## Approach & Intuition

### 1. Grouping Indices by Value

- For identical numbers, the problem asks for the sum of absolute index differences.
- Because numbers with different values never interact, we can collect the 0-indexed positions of every unique value into sorted lists using a hash map:
  $$\text{posMap}[\text{val}] = [p_0, p_1, p_2, \dots, p_{m-1}]$$
- Because we traverse `nums` from left to right, each index list is naturally sorted in ascending order ($p_0 < p_1 < \dots < p_{m-1}$).

### 2. Prefix and Suffix Sum Decomposition

For an index $p_k$ (the $k^{\text{th}}$ occurrence of the value, with $0 \le k < m$):
- All occurrences to its left ($j < k$) have indices $p_j < p_k$. The sum of distances to left elements is:
  $$\sum_{j=0}^{k-1} (p_k - p_j) = k \cdot p_k - \sum_{j=0}^{k-1} p_j = k \cdot p_k - \text{leftSum}$$
- All occurrences to its right ($j > k$) have indices $p_j > p_k$. The sum of distances to right elements is:
  $$\sum_{j=k+1}^{m-1} (p_j - p_k) = \sum_{j=k+1}^{m-1} p_j - (m - 1 - k) \cdot p_k = \text{rightSum} - (m - 1 - k) \cdot p_k$$
- Where:
  $$\text{rightSum} = \text{totalSum} - \text{leftSum} - p_k$$
- Thus, the total sum of distances for index $p_k$ is computed in $\mathcal{O}(1)$ time:
  $$\text{arr}[p_k] = (k \cdot p_k - \text{leftSum}) + (\text{rightSum} - (m - 1 - k) \cdot p_k)$$

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - Grouping all $N$ indices into hash map lists takes $\mathcal{O}(N)$ time.
  - Iterating over each index list and updating running prefix sums takes $\mathcal{O}(N)$ time across all unique values.
  - Total time complexity is strictly linear $\mathcal{O}(N)$, running in $\approx 35\text{ ms}$.

- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - The hash map stores exactly $N$ total indices across all value lists.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/-qxO82UPJH4](https://youtu.be/-qxO82UPJH4)
