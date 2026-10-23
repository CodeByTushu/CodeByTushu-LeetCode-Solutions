# LeetCode 153: Find Minimum in Rotated Sorted Array

- **Publication Date:** 15 May 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/kFmMM4LOyjc)

---

## Problem Summary

Suppose an array of length $n$ sorted in ascending order is rotated between $1$ and $n$ times. For example, the array `nums = [0, 1, 2, 4, 5, 6, 7]` might become:
- `[4, 5, 6, 7, 0, 1, 2]` if it was rotated 4 times.
- `[0, 1, 2, 4, 5, 6, 7]` if it was rotated 7 times.

Notice that rotating an array `[a[0], a[1], a[2], ..., a[n-1]]` 1 time results in `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]`.

Given the sorted rotated array `nums` of **unique** elements, return the **minimum element** of this array.

You must write an algorithm that runs in $\mathcal{O}(\log n)$ time.

---

### Examples

#### Example 1:
- **Input:** `nums = [3, 4, 5, 1, 2]`
- **Output:** `1`
- **Explanation:** The original array was `[1, 2, 3, 4, 5]` rotated 3 times.

#### Example 2:
- **Input:** `nums = [4, 5, 6, 7, 0, 1, 2]`
- **Output:** `0`
- **Explanation:** The original array was `[0, 1, 2, 4, 5, 6, 7]` and it was rotated 4 times.

#### Example 3:
- **Input:** `nums = [11, 13, 15, 17]`
- **Output:** `11`
- **Explanation:** The original array was `[11, 13, 15, 17]` and it was rotated 4 times.

---

### Constraints

- $n == \text{nums.length}$
- $1 \le n \le 5000$
- $-5000 \le \text{nums}[i] \le 5000$
- All the integers of `nums` are **unique**.
- `nums` is sorted and rotated between $1$ and $n$ times.

---

## Topics and Tags

- **Array**
- **Binary Search**

---

## Approach & Intuition

### 1. Structure of a Rotated Sorted Array

A rotated sorted array consists of two sorted subarrays:
- The left subarray: values strictly greater than the rightmost element.
- The right subarray: values containing the minimum element and ending at `nums[n - 1]`.

The transition between these two subarrays is the **inflection point** (where the value drops). The minimum element is located precisely at this inflection point.

### 2. Binary Search Decision Rules

We maintain two pointers `left = 0` and `right = n - 1`:
1. Calculate `mid = left + (right - left) / 2`.
2. Compare `nums[mid]` with `nums[right]`:
   - **Case 1: `nums[mid] > nums[right]`**
     - Since `nums[mid]` is strictly greater than the rightmost element, `mid` lies in the left subarray.
     - The inflection point (and thus the minimum) must lie strictly to the right:
       $$\text{left} = \text{mid} + 1$$
   - **Case 2: `nums[mid] <= nums[right]`**
     - Because all elements are unique, `nums[mid] < nums[right]`.
     - The subarray from `mid` to `right` is monotonically increasing.
     - Therefore, the minimum cannot be to the right of `mid`, but could be `nums[mid]` itself:
       $$\text{right} = \text{mid}$$
3. When `left == right`, the search space has converged to the single minimum element: return `nums[left]`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(\log N)$
  - With each iteration, the search interval is halved.
  - For $N \le 5000$, the algorithm terminates in at most $\lceil \log_2(5000) \rceil = 13$ comparisons ($0\text{ ms}$).

- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Only uses two pointer variables `left` and `right`.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/kFmMM4LOyjc](https://youtu.be/kFmMM4LOyjc)
