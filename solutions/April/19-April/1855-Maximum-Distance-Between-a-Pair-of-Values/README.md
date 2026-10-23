# LeetCode 1855: Maximum Distance Between a Pair of Values

- **Publication Date:** 19 April 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/maximum-distance-between-a-pair-of-values/](https://leetcode.com/problems/maximum-distance-between-a-pair-of-values/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/oNOsHV3pif4)

---

## Problem Summary

You are given two **non-increasing** 0-indexed integer arrays `nums1` and `nums2`.

A pair of indices `(i, j)`, where $0 \le i < \text{nums1.length}$ and $0 \le j < \text{nums2.length}$, is **valid** if:
1. $i \le j$, and
2. $\text{nums1}[i] \le \text{nums2}[j]$.

The **distance** of the pair is $j - i$.

Return the **maximum distance** of any valid pair `(i, j)`. If there are no valid pairs, return `0`.

An array `arr` is **non-increasing** if $\text{arr}[i-1] \ge \text{arr}[i]$ for every $1 \le i < \text{arr.length}$.

---

### Examples

#### Example 1:
- **Input:** `nums1 = [55,30,5,4,2]`, `nums2 = [100,20,10,10,5]`
- **Output:** `2`
- **Explanation:**
  - Valid pairs are $(0,0)$, $(2,2)$, $(2,3)$, $(2,4)$, $(3,3)$, $(3,4)$, and $(4,4)$.
  - The maximum distance is $2$ achieved by pair $(2, 4)$ where $2 \le 4$ and $5 \le 5$ with distance $4 - 2 = 2$.

#### Example 2:
- **Input:** `nums1 = [2,2,2]`, `nums2 = [10,10,1]`
- **Output:** `1`
- **Explanation:**
  - Valid pairs are $(0,0)$, $(0,1)$, and $(1,1)$.
  - The maximum distance is $1$ achieved by pair $(0, 1)$ where $0 \le 1$ and $2 \le 10$ with distance $1 - 0 = 1$.

#### Example 3:
- **Input:** `nums1 = [30,29,19,5]`, `nums2 = [25,25,25,25,25]`
- **Output:** `2`
- **Explanation:**
  - Valid pairs include $(2,2)$, $(2,3)$, $(2,4)$, $(3,3)$, and $(3,4)$.
  - The maximum distance is $2$ with pair $(2, 4)$.

---

### Constraints

- $1 \le \text{nums1.length}, \text{nums2.length} \le 10^5$
- $1 \le \text{nums1}[i], \text{nums2}[j] \le 10^5$
- Both `nums1` and `nums2` are **non-increasing**.

---

## Topics and Tags

- **Array**
- **Two Pointers**
- **Binary Search**

---

## Approach & Intuition

### 1. Monotonicity Invariant

Both input arrays are sorted in descending (non-increasing) order:
$$\text{nums1}[0] \ge \text{nums1}[1] \ge \dots \ge \text{nums1}[m-1]$$
$$\text{nums2}[0] \ge \text{nums2}[1] \ge \dots \ge \text{nums2}[n-1]$$

This monotonic structure enables a linear two-pointer scan:
1. If $\text{nums1}[i] \le \text{nums2}[j]$:
   - The pair $(i, j)$ is valid (whenever $i \le j$), yielding a distance $j - i$.
   - To maximize distance $j - i$ for this fixed $i$, we greedily advance $j$ (`j++`) to see if even larger index distances can satisfy $\text{nums1}[i] \le \text{nums2}[j']$.
2. If $\text{nums1}[i] > \text{nums2}[j]$:
   - Because `nums2` is non-increasing, every subsequent element $j' > j$ will have $\text{nums2}[j'] \le \text{nums2}[j] < \text{nums1}[i]$.
   - Hence, no future index $j' \ge j$ can ever satisfy $\text{nums1}[i] \le \text{nums2}[j']$.
   - Therefore, the current element $\text{nums1}[i]$ can never yield a larger distance, and we must increment $i$ (`i++`).

### 2. Implicit Synchronization

When $i$ overtakes $j$ ($i > j$), $j - i < 0 \le \text{maxDist}$, so $\max(\text{maxDist}, j - i)$ naturally ignores invalid negative distances, and $j$ catches up on subsequent steps.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(M + N)$
  - Pointer $i$ advances at most $M = \text{nums1.length}$ times.
  - Pointer $j$ advances at most $N = \text{nums2.length}$ times.
  - Total iterations $\le M + N \le 2 \times 10^5$, executing in $< 5\text{ ms}$.

- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Only two index pointers and a scalar tracking variable are maintained.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/oNOsHV3pif4](https://youtu.be/oNOsHV3pif4)
