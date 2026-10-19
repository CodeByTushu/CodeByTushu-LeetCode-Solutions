# LeetCode 2089: Find Target Indices After Sorting Array

- **Publication Date:** 19 October 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/find-target-indices-after-sorting-array/](https://leetcode.com/problems/find-target-indices-after-sorting-array/)
- **YouTube Solution:** [Coming Soon](https://www.youtube.com/@codebytushu)

---

## Problem Summary

You are given a 0-indexed integer array `nums` and a target element `target`.

A **target index** is an index `i` such that `nums[i] == target`.

Return a list of the target indices of `nums` after sorting `nums` in **non-decreasing order**. If there are no target indices, return an empty list. The returned list must be sorted in **increasing order**.

---

### Examples

#### Example 1:
- **Input:** `nums = [1,2,5,2,3], target = 2`
- **Output:** `[1, 2]`
- **Explanation:**
  - After sorting, `nums` becomes `[1, 2, 2, 3, 5]`.
  - The indices where `nums[i] == 2` are `1` and `2`.

#### Example 2:
- **Input:** `nums = [1,2,5,2,3], target = 3`
- **Output:** `[3]`
- **Explanation:**
  - After sorting, `nums` becomes `[1, 2, 2, 3, 5]`.
  - The index where `nums[i] == 3` is `3`.

#### Example 3:
- **Input:** `nums = [1,2,5,2,3], target = 5`
- **Output:** `[4]`
- **Explanation:**
  - After sorting, `nums` becomes `[1, 2, 2, 3, 5]`.
  - The index where `nums[i] == 5` is `4`.

---

### Constraints

- $1 \le \text{nums.length} \le 100$
- $1 \le \text{nums}[i], \text{target} \le 100$

---

## Topics and Tags

- **Array**
- **Binary Search**
- **Counting**
- **Frequency Counting**
- **Sorting**

---

## Approach & Intuition

### 1. Optimal Linear Counting Approach — $\mathcal{O}(N)$ Time, $\mathcal{O}(1)$ Space

A standard brute-force approach would sort `nums` in $\mathcal{O}(N \log N)$ time and then find all occurrences of `target` (using linear scan or binary search).

However, we can do much better in linear $\mathcal{O}(N)$ time without actually sorting the array:

1. **Key Insight**:
   - In any sorted array, all elements strictly smaller than `target` must appear before `target`.
   - If there are `less` elements strictly smaller than `target`, then after sorting, the first occurrence of `target` will begin precisely at index `less`.
   - If there are `equal` elements equal to `target`, they will occupy contiguous indices from `less` up to `less + equal - 1`.

2. **Algorithm**:
   - Initialize two counters: `less = 0` and `equal = 0`.
   - Iterate through `nums`:
     - If `x < target`, increment `less`.
     - Else if `x == target`, increment `equal`.
   - Construct the result list by adding all indices from `less` to `less + equal - 1`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - A single pass over the array of size $N$ counts elements smaller than and equal to `target`.
  - Constructing the output takes $\mathcal{O}(\text{equal})$ time, which is at most $\mathcal{O}(N)$.
  - Total time: $\mathcal{O}(N)$.

- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Only two scalar counters (`less`, `equal`) are used beyond the returned result list.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [Coming Soon](https://www.youtube.com/@codebytushu)

---

## Resources & Community

- 🌐 **Platform Website:** [https://codebytushu.com/](https://codebytushu.com/)
- 💻 **All LeetCode Solutions:** [https://codebytushu.com/Leetcode/](https://codebytushu.com/Leetcode/)
- 📂 **GitHub Repository:** [https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions](https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions)
