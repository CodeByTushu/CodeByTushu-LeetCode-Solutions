# LeetCode 2948: Make Lexicographically Smallest Array by Swapping Elements

- **Publication Date:** 29 August 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/make-lexicographically-smallest-array-by-swapping-elements/](https://leetcode.com/problems/make-lexicographically-smallest-array-by-swapping-elements/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/e-WYxZqwgXU?si=0vyxh1TrRNA_HXJ_)

---

## Problem Summary

You are given a **0-indexed** array of positive integers `nums` and a positive integer `limit`.

In one operation, you can choose any two indices `i` and `j` and swap `nums[i]` and `nums[j]` if `|nums[i] - nums[j]| <= limit`.

Return the **lexicographically smallest array** that can be obtained by performing the operation any number of times.

An array `a` is lexicographically smaller than an array `b` if in the first position where `a` and `b` differ, array `a` has an element that is less than the corresponding element in `b`.

---

### Examples

#### Example 1:

- **Input:** `nums = [1,5,3,9,8]`, `limit = 2`
- **Output:** `[1,3,5,8,9]`
- **Explanation:**
  - Apply the operation 2 times:
    - Swap `nums[1]` with `nums[2]`. The array becomes `[1,3,5,9,8]`.
    - Swap `nums[3]` with `nums[4]`. The array becomes `[1,3,5,8,9]`.
  - We cannot obtain a lexicographically smaller array by applying any more operations.

#### Example 2:

- **Input:** `nums = [1,7,6,18,2,1]`, `limit = 3`
- **Output:** `[1,6,7,18,1,2]`
- **Explanation:**
  - Apply the operation 3 times:
    - Swap `nums[1]` with `nums[2]`. The array becomes `[1,6,7,18,2,1]`.
    - Swap `nums[0]` with `nums[4]`. The array becomes `[2,6,7,18,1,1]`.
    - Swap `nums[0]` with `nums[5]`. The array becomes `[1,6,7,18,1,2]`.
  - We cannot obtain a lexicographically smaller array by applying any more operations.

#### Example 3:

- **Input:** `nums = [1,7,28,19,10]`, `limit = 3`
- **Output:** `[1,7,28,19,10]`
- **Explanation:**
  - `[1,7,28,19,10]` is the lexicographically smallest array we can obtain because we cannot apply the operation on any two indices.

---

### Constraints

- $1 \le \text{nums.length} \le 10^5$
- $1 \le \text{nums}[i] \le 10^9$
- $1 \le \text{limit} \le 10^9$

---

## Topics and Tags

- **Array**
- **Sorting**
- **Two Pointers**
- **Union Find**

---

## Intuition and Approach

### 1. Transitivity of Swaps (Connected Components)
The condition $|nums[i] - nums[j]| \le limit$ defines an equivalence relation over connected components. If index $A$ can swap with $B$, and $B$ can swap with $C$, we can arbitrarily permute the elements across the union of their positions.

### 2. Grouping by Sorted Differences
If we sort all pairs $(nums[i], i)$ in ascending order of their numerical values:
- Any two adjacent elements in this sorted order whose difference is $\le limit$ belong to the same connected component.
- If $nums[idx[j]] - nums[idx[j - 1]] > limit$, no element in the prefix can ever swap with any element in the suffix, creating a natural group boundary.
- Thus, each connected component forms a contiguous slice $[i \dots j-1]$ in the value-sorted array.

### 3. Greedy Optimal Assignment
For each connected group:
1. Extract all original index positions corresponding to the group's elements.
2. Sort these indices in ascending numerical order.
3. Place the sorted values sequentially into the sorted index positions. This greedily ensures that the smallest values appear at the earliest positions in the resulting array.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N \log N)$
  - Sorting the array of $N$ indices by value takes $\mathcal{O}(N \log N)$ time.
  - Linear scan partitions the elements into disjoint groups. Sorting the indices for each group of size $K$ takes $\mathcal{O}(K \log K)$ time.
  - Since $\sum K = N$, $\sum \mathcal{O}(K \log K) \le \mathcal{O}(N \log N)$.
  - Total time complexity is strictly $\mathcal{O}(N \log N)$, easily executing within $10^5$ limits.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - Storing the index array `idx`, group index buffers, and the `result` array takes $\mathcal{O}(N)$ auxiliary space.
