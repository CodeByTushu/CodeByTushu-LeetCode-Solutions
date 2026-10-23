# LeetCode 2540: Minimum Common Value

- **Publication Date:** 19 May 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/minimum-common-value/](https://leetcode.com/problems/minimum-common-value/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/-GQ6yHMBlfc)

---

## Problem Summary

Given two integer arrays `nums1` and `nums2`, sorted in **non-decreasing order**, return the **minimum integer common to both arrays**. If there is no common integer amongst `nums1` and `nums2`, return `-1`.

Note that an integer is said to be common to `nums1` and `nums2` if both arrays have at least one occurrence of that integer.

---

### Examples

#### Example 1:
- **Input:** `nums1 = [1, 2, 3]`, `nums2 = [2, 4]`
- **Output:** `2`
- **Explanation:**
  - The smallest element common to both arrays is `2`, so we return `2`.

#### Example 2:
- **Input:** `nums1 = [1, 2, 3, 6]`, `nums2 = [2, 3, 4, 5]`
- **Output:** `2`
- **Explanation:**
  - There are two common elements in the array: `2` and `3`.
  - Out of these, `2` is the smallest, so `2` is returned.

---

### Constraints

- $1 \le \text{nums1.length}, \text{nums2.length} \le 10^5$
- $1 \le \text{nums1}[i], \text{nums2}[j] \le 10^9$
- Both `nums1` and `nums2` are sorted in non-decreasing order.

---

## Topics and Tags

- **Array**
- **Hash Table**
- **Two Pointers**
- **Binary Search**

---

## Approach & Intuition

### 1. Utilizing the Pre-Sorted Property

Both arrays `nums1` and `nums2` are already sorted in non-decreasing order. This crucial invariant eliminates the need for hash sets or sorting overhead and allows an optimal **Two Pointers** scan:
- Maintain pointer `i = 0` for `nums1` and `j = 0` for `nums2`.
- At each step, compare `nums1[i]` with `nums2[j]`:
  1. If `nums1[i] == nums2[j]`:
     - Since both arrays are scanned in increasing order from left to right, this first match is mathematically guaranteed to be the minimum common integer. Return `nums1[i]` immediately.
  2. If `nums1[i] < nums2[j]`:
     - `nums1[i]` is smaller than the current element of `nums2`, and since `nums2` is non-decreasing, `nums1[i]` cannot match any subsequent element in `nums2`. Advance pointer `i++`.
  3. If `nums1[i] > nums2[j]`:
     - Similarly, `nums2[j]` is smaller than `nums1[i]`. Advance pointer `j++`.
- If either array is exhausted without finding a common element, return `-1`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N + M)$
  - At each iteration of the `while` loop, at least one of the two pointers (`i` or `j`) is incremented.
  - In the worst case where no common element exists, at most $N + M$ comparisons are performed.
  - Strictly linear: $\mathcal{O}(N + M) \approx 2 \times 10^5$ operations ($\approx 1\text{ ms}$).

- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Only two index pointer variables are used, requiring no extra memory.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/-GQ6yHMBlfc](https://youtu.be/-GQ6yHMBlfc)
