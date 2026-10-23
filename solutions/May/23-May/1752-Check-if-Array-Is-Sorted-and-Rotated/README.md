# LeetCode 1752: Check if Array Is Sorted and Rotated

- **Publication Date:** 23 May 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/](https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/H33FXQOpM7w)

---

## Problem Summary

Given an array `nums`, return `true` if the array was originally sorted in non-decreasing order, then rotated some number of positions (including zero). Otherwise, return `false`.

There may be duplicates in the original array.

**Note:** An array $A$ rotated by $x$ positions results in an array $B$ of the same length such that $B[i] == A[(i + x) \pmod{\text{length}}]$ for every valid index $i$.

---

### Examples

#### Example 1:
- **Input:** `nums = [3, 4, 5, 1, 2]`
- **Output:** `true`
- **Explanation:**
  - `[1, 2, 3, 4, 5]` is the original sorted array.
  - You can rotate the array by $x = 2$ positions to obtain `[3, 4, 5, 1, 2]`.

#### Example 2:
- **Input:** `nums = [2, 1, 3, 4]`
- **Output:** `false`
- **Explanation:**
  - There is no sorted array that once rotated results in `[2, 1, 3, 4]`.

#### Example 3:
- **Input:** `nums = [1, 2, 3]`
- **Output:** `true`
- **Explanation:**
  - `[1, 2, 3]` is already sorted ($x = 0$ positions rotated).

---

### Constraints

- $1 \le \text{nums.length} \le 100$
- $1 \le \text{nums}[i] \le 100$

---

## Topics and Tags

- **Array**

---

## Approach & Intuition

### 1. Cyclic Drop Count Invariant

If an array was originally sorted in non-decreasing order:
- When not rotated ($x = 0$), adjacent elements always satisfy `nums[i] <= nums[i + 1]` for all $0 \le i < n - 1$, and `nums[n - 1] <= nums[0]` may only be violated if the array is non-constant.
- When rotated by $x > 0$ positions, the largest element is rotated somewhere into the middle of the array, introducing exactly **one** point where an element is strictly greater than the next element: `nums[i] > nums[(i + 1) % n]`.
- All other pairs must satisfy `nums[i] <= nums[(i + 1) % n]`.

Therefore:
- A sorted array that has been rotated cyclically can have **at most one** drop point where `nums[i] > nums[(i + 1) % n]`.
- If there are $0$ drops (e.g. `[1, 1, 1]` or strictly non-decreasing `[1, 2, 3]`), it is valid.
- If there is $1$ drop (e.g. `[3, 4, 5, 1, 2]`), it is valid.
- If there are $\ge 2$ drops (e.g. `[2, 1, 3, 4]`), it is impossible to form by rotating a sorted array.

### 2. Linear Scan Algorithm

1. Initialize `count = 0`.
2. Iterate $i$ from $0$ to $n - 1$:
   - If `nums[i] > nums[(i + 1) % n]`, increment `count++`.
3. Return `count <= 1`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - Single pass through the array of length $N \le 100$.
  - At each index, one comparison is performed.
  - Runtime: $< 1\text{ ms}$.

- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Only a single counter variable `count` is used.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/H33FXQOpM7w](https://youtu.be/H33FXQOpM7w)
