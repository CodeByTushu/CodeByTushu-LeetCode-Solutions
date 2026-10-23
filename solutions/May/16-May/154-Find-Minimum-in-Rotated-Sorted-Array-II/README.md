# LeetCode 154: Find Minimum in Rotated Sorted Array II

- **Publication Date:** 16 May 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/kL9Dr5e7P4k)

---

## Problem Summary

Suppose an array of length $n$ sorted in ascending order is rotated between $1$ and $n$ times. For example, the array `nums = [0, 1, 4, 4, 5, 6, 7]` might become:
- `[4, 5, 6, 7, 0, 1, 4]` if it was rotated 4 times.
- `[0, 1, 4, 4, 5, 6, 7]` if it was rotated 7 times.

Notice that rotating an array `[a[0], a[1], a[2], ..., a[n-1]]` 1 time results in `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]`.

Given the sorted rotated array `nums` that may contain **duplicates**, return the **minimum element** of this array.

You must decrease the overall operation steps as much as possible.

---

### Examples

#### Example 1:
- **Input:** `nums = [1, 3, 5]`
- **Output:** `1`

#### Example 2:
- **Input:** `nums = [2, 2, 2, 0, 1]`
- **Output:** `0`

---

### Constraints

- $n == \text{nums.length}$
- $1 \le n \le 5000$
- $-5000 \le \text{nums}[i] \le 5000$
- `nums` is sorted and rotated between $1$ and $n$ times.

---

## Topics and Tags

- **Array**
- **Binary Search**

---

## Approach & Intuition

### 1. Handling Duplicates in Rotated Sorted Arrays

When the array contains distinct elements (as in LeetCode 153), comparing `nums[mid]` with `nums[right]` strictly partitions the search space in half at every step.

However, when duplicates exist, we can encounter:
$$\text{nums}[\text{mid}] == \text{nums}[\text{right}]$$

In this case, the minimum could lie either to the left or to the right of `mid`:
- Example A: `[3, 3, 1, 3]` $\to$ `mid = 1` (`val = 3`), `right = 3` (`val = 3`). The minimum is in the right half.
- Example B: `[3, 1, 3, 3]` $\to$ `mid = 1` (`val = 1`), `right = 3` (`val = 3`). The minimum is at/left of `mid`.

Because `nums[mid] == nums[right]`, the value at `right` is already represented by `nums[mid]`. Even if `nums[right]` is the minimum, we will not lose it by decrementing `right` by 1 (`right--`).

### 2. Modified Binary Search Algorithm

1. Maintain search boundaries `left = 0` and `right = n - 1`.
2. While `left < right`:
   - Compute `mid = left + (right - left) / 2`.
   - **Case 1: `nums[mid] > nums[right]`**
     - The inflection point must lie strictly in the right half $\implies \text{left} = \text{mid} + 1$.
   - **Case 2: `nums[mid] < nums[right]`**
     - The right half is sorted; the minimum is at `mid` or to its left $\implies \text{right} = \text{mid}$.
   - **Case 3: `nums[mid] == nums[right]`**
     - Safely shrink the right boundary $\implies \text{right} = \text{right} - 1$.
3. When `left == right`, return `nums[left]`.

---

## Complexity Analysis

- **Time Complexity:**
  - **Average Case:** $\mathcal{O}(\log N)$, when duplicates are sparse and the search space is halved in most iterations.
  - **Worst Case:** $\mathcal{O}(N)$, when all or almost all elements are equal (e.g. `[1, 1, 1, 1, 1]`), where `right` decrements by 1 each step.

- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Constant extra space for pointers.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/kL9Dr5e7P4k](https://youtu.be/kL9Dr5e7P4k)
