# LeetCode 33: Search in Rotated Sorted Array

- **Publication Date:** 22 May 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/search-in-rotated-sorted-array/](https://leetcode.com/problems/search-in-rotated-sorted-array/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/tOzKgWlmqTA)

---

## Problem Summary

There is an integer array `nums` sorted in ascending order with **distinct values**.

Prior to being passed to your function, `nums` is possibly left-rotated at an unknown pivot index $k$ ($1 \le k < \text{nums.length}$) such that the resulting array is:
$$[\text{nums}[k], \text{nums}[k+1], \dots, \text{nums}[n-1], \text{nums}[0], \text{nums}[1], \dots, \text{nums}[k-1]]$$

Given the array `nums` after the possible rotation and an integer `target`, return the **index of `target`** if it is in `nums`, or `-1` if it is not in `nums`.

You must write an algorithm with **$\mathcal{O}(\log n)$ runtime complexity**.

---

### Examples

#### Example 1:
- **Input:** `nums = [4, 5, 6, 7, 0, 1, 2]`, `target = 0`
- **Output:** `4`

#### Example 2:
- **Input:** `nums = [4, 5, 6, 7, 0, 1, 2]`, `target = 3`
- **Output:** `-1`

#### Example 3:
- **Input:** `nums = [1]`, `target = 0`
- **Output:** `-1`

---

### Constraints

- $1 \le \text{nums.length} \le 5000$
- $-10^4 \le \text{nums}[i] \le 10^4$
- All values of `nums` are **unique**.
- `nums` is an ascending array that is possibly rotated.
- $-10^4 \le \text{target} \le 10^4$

---

## Topics and Tags

- **Array**
- **Binary Search**

---

## Approach & Intuition

### 1. Rotated Sorted Array Invariant

Even though the array has been rotated, dividing the search space at any midpoint index `mid` splits the array into two halves, where **at least one half is always strictly sorted**:
- If `nums[left] <= nums[mid]`, the left half `[left...mid]` is sorted.
- Otherwise, the right half `[mid...right]` is sorted.

### 2. Modified Binary Search

At each step with pointers `left` and `right`:
1. Compute `mid = left + (right - left) / 2`.
2. If `nums[mid] == target`, we have found the target; return `mid`.
3. If the **left half is sorted** (`nums[left] <= nums[mid]`):
   - Check if `target` falls within the boundary `nums[left] <= target < nums[mid]`:
     - If yes, search the left half: `right = mid - 1`.
     - Otherwise, the target must be in the right half: `left = mid + 1`.
4. If the **right half is sorted** (`nums[left] > nums[mid]`):
   - Check if `target` falls within the boundary `nums[mid] < target <= nums[right]`:
     - If yes, search the right half: `left = mid + 1`.
     - Otherwise, the target must be in the left half: `right = mid - 1`.
5. If `left > right` without finding `target`, return `-1`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(\log N)$
  - With each iteration, the search interval is halved, exactly as in standard binary search.
  - At most $\lceil\log_2 5000\rceil \approx 13$ comparisons are performed.

- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Only constant extra space for pointers (`left`, `right`, `mid`).

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/tOzKgWlmqTA](https://youtu.be/tOzKgWlmqTA)
