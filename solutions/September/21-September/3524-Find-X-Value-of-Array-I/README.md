# LeetCode 3524: Find X Value of Array I

- **Publication Date:** 21 September 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/find-x-value-of-array-i/](https://leetcode.com/problems/find-x-value-of-array-i/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/FCwbXVDanq0?si=T8qaMp3EAPfIc-iw)

---

## Problem Summary

You are given an array of positive integers `nums`, and a positive integer `k`.

You are allowed to perform an operation **once** on `nums`, where in each operation you can remove any non-overlapping prefix and suffix from `nums` such that `nums` remains **non-empty**.

You need to find the **x-value** of `nums`, which is the number of ways to perform this operation so that the **product** of the remaining elements leaves a remainder of `x` when divided by `k`.

Return an array `result` of size `k` where `result[x]` is the **x-value** of `nums` for $0 \le x \le k - 1$.

A **prefix** of an array is a subarray that starts from the beginning of the array and extends to any point within it.  
A **suffix** of an array is a subarray that starts at any point within the array and extends to the end of the array.  
Note that the prefix and suffix to be chosen for the operation can be **empty**.

---

### Examples

#### Example 1:
- **Input:** `nums = [1,2,3,4,5], k = 3`
- **Output:** `[9,2,4]`
- **Explanation:**
  - For $x = 0$, the possible operations include all possible ways to remove non-overlapping prefix/suffix that do not remove `nums[2] = 3`.
  - For $x = 1$, the possible operations are:
    - Remove the empty prefix and the suffix `[2, 3, 4, 5]`. `nums` becomes `[1]`.
    - Remove the prefix `[1, 2, 3]` and the suffix `[5]`. `nums` becomes `[4]`.
  - For $x = 2$, the possible operations are:
    - Remove the empty prefix and the suffix `[3, 4, 5]`. `nums` becomes `[1, 2]`.
    - Remove the prefix `[1]` and the suffix `[3, 4, 5]`. `nums` becomes `[2]`.
    - Remove the prefix `[1, 2, 3]` and the empty suffix. `nums` becomes `[4, 5]`.
    - Remove the prefix `[1, 2, 3, 4]` and the empty suffix. `nums` becomes `[5]`.

#### Example 2:
- **Input:** `nums = [1,2,4,8,16,32], k = 4`
- **Output:** `[18,1,2,0]`

#### Example 3:
- **Input:** `nums = [1,1,2,1,1], k = 2`
- **Output:** `[9,6]`

---

### Constraints

- $1 \le \text{nums}[i] \le 10^9$
- $1 \le \text{nums.length} \le 10^5$
- $1 \le k \le 5$

---

## Topics and Tags

- **Array**
- **Dynamic Programming**
- **Math**

---

## Approach & Intuition

### 1. Equivalence to Subarray Product Modulo $k$
Removing any non-overlapping prefix and suffix from `nums` such that the remaining elements form a non-empty array is identical to choosing a **contiguous non-empty subarray** $nums[l..r]$ (where $0 \le l \le r < n$).
- Everything before index $l$ is removed as prefix (length $l$).
- Everything after index $r$ is removed as suffix (length $n - 1 - r$).
- Both prefix and suffix can be empty.
- Therefore, the question asks: **For each remainder $x \in \{0, 1, \dots, k-1\}$, how many contiguous subarrays have product modulo $k$ equal to $x$?**

### 2. Dynamic Programming over Endpoints
Let $dp[\text{rem}]$ represent the number of subarrays ending at index $r - 1$ whose elements multiply to $\text{rem} \pmod k$.

When we extend to index $r$ with element $nums[r]$:
1. An existing subarray with remainder $\text{rem}$ becomes a subarray ending at $r$ with new remainder:
   $$\text{newRem} = (\text{rem} \times (nums[r] \bmod k)) \bmod k$$
2. A single-element subarray consisting solely of $[nums[r]]$ starts at $r$, contributing $+1$ to remainder:
   $$nums[r] \bmod k$$
3. We add the count of subarrays ending at $r$ with remainder $x$ to our total tally `result[x]`.
4. We update $dp$ with the new counts.

Since $k \le 5$, the inner transitions take only $\mathcal{O}(k)$ operations per element.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N \times k)$
  - With $N \le 10^5$ and $k \le 5$, the loop runs in at most $5 \times 10^5$ operations, which executes in well under 20ms.
- **Auxiliary Space Complexity:** $\mathcal{O}(k)$
  - We only store state arrays of size $k \le 5$, which requires $\mathcal{O}(1)$ extra memory beyond the output array.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
