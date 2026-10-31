# LeetCode 3731: Find Missing Elements

- **Publication Date:** 04 August 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/find-missing-elements/](https://leetcode.com/problems/find-missing-elements/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/DFShzZTuOvY?si=P5R1yv417pDQPPx0)

---

## Problem Summary

You are given an integer array `nums` consisting of unique integers.

Originally, `nums` contained every integer within a certain range. However, some integers might have gone missing from the array.

The smallest and largest integers of the original range are still present in `nums`.

Return a sorted list of all the missing integers in this range. If no integers are missing, return an empty list.

---

### Examples

#### Example 1:

- **Input:** `nums = [1,4,2,5]`
- **Output:** `[3]`
- **Explanation:**
  - The smallest integer is `1` and the largest is `5`, so the full range should be `[1,2,3,4,5]`.
  - Among these, only `3` is missing.

#### Example 2:

- **Input:** `nums = [7,8,6,9]`
- **Output:** `[]`
- **Explanation:**
  - The smallest integer is `6` and the largest is `9`, so the full range is `[6,7,8,9]`.
  - All integers are already present, so no integer is missing.

#### Example 3:

- **Input:** `nums = [5,1]`
- **Output:** `[2,3,4]`
- **Explanation:**
  - The smallest integer is `1` and the largest is `5`, so the full range should be `[1,2,3,4,5]`.
  - The missing integers are `2`, `3`, and `4`.

---

### Constraints

- $2 \le \text{nums.length} \le 100$
- $1 \le \text{nums}[i] \le 100$

---

## Topics and Tags

- **Array**
- **Hash Table**
- **Sorting**

---

## Intuition and Approach

1. **Find Range Bounds:**
   - Scan the array to find the minimum element `min` and maximum element `max`.
2. **Fast Membership Lookup:**
   - Store all numbers present in `nums` into a hash set for $\mathcal{O}(1)$ average-time lookups.
3. **Scan Missing Elements:**
   - Iterate sequentially through each integer $i$ from `min` to `max`.
   - If $i$ is not found in the set, append $i$ to our result list.
   - Because $i$ increases monotonically from `min` to `max`, the collected missing elements are automatically in ascending sorted order.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N + (M - m))$
  - Finding the minimum and maximum and building the hash set takes $\mathcal{O}(N)$ time.
  - The loop runs $M - m + 1$ times with $\mathcal{O}(1)$ set lookups.
  - With $N \le 100$ and $1 \le \text{nums}[i] \le 100$, operations are $\le 200$, completing in $< 1\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - To store elements of `nums` in the hash set.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
