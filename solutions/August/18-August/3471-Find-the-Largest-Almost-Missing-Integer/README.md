# LeetCode 3471: Find the Largest Almost Missing Integer

- **Publication Date:** 18 August 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/find-the-largest-almost-missing-integer/](https://leetcode.com/problems/find-the-largest-almost-missing-integer/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/3dpjR5wKrZs?si=_vHmGj0wOPxzREqK)

---

## Problem Summary

You are given an integer array `nums` and an integer `k`.

An integer $x$ is **almost missing** from `nums` if $x$ appears in **exactly one subarray of size $k$** within `nums`.

Return the **largest almost missing integer** from `nums`. If no such integer exists, return `-1`.

A **subarray** is a contiguous sequence of elements within an array.

---

### Examples

#### Example 1:

- **Input:** `nums = [3,9,2,1,7], k = 3`
- **Output:** `7`
- **Explanation:**
  - $1$ appears in 2 subarrays of size 3: `[9, 2, 1]` and `[2, 1, 7]`.
  - $2$ appears in 3 subarrays of size 3: `[3, 9, 2]`, `[9, 2, 1]`, `[2, 1, 7]`.
  - $3$ appears in 1 subarray of size 3: `[3, 9, 2]`.
  - $7$ appears in 1 subarray of size 3: `[2, 1, 7]`.
  - $9$ appears in 2 subarrays of size 3: `[3, 9, 2]` and `[9, 2, 1]`.
  We return $7$ since it is the largest integer that appears in exactly one subarray of size 3.

#### Example 2:

- **Input:** `nums = [3,9,7,2,1,7], k = 4`
- **Output:** `3`
- **Explanation:**
  - $1$ appears in 2 subarrays of size 4: `[9, 7, 2, 1]`, `[7, 2, 1, 7]`.
  - $2$ appears in 3 subarrays of size 4: `[3, 9, 7, 2]`, `[9, 7, 2, 1]`, `[7, 2, 1, 7]`.
  - $3$ appears in 1 subarray of size 4: `[3, 9, 7, 2]`.
  - $7$ appears in 3 subarrays of size 4: `[3, 9, 7, 2]`, `[9, 7, 2, 1]`, `[7, 2, 1, 7]`.
  - $9$ appears in 2 subarrays of size 4: `[3, 9, 7, 2]`, `[9, 7, 2, 1]`.
  We return $3$ since it is the largest and only integer that appears in exactly one subarray of size 4.

#### Example 3:

- **Input:** `nums = [0,0], k = 1`
- **Output:** `-1`
- **Explanation:**
  There is no integer that appears in only one subarray of size 1.

---

### Constraints

- $1 \le \text{nums.length} \le 50$
- $0 \le \text{nums}[i] \le 50$
- $1 \le k \le \text{nums.length}$

---

## Topics and Tags

- **Array**
- **Hash Table**

---

## Intuition and Approach

### 1. Subarray Window Counting:
The problem asks for the maximum value that appears in **exactly one** contiguous subarray of size $k$.
Given the small constraints ($N \le 50$ and values $0 \le \text{nums}[i] \le 50$):
- There are $N - k + 1$ contiguous subarrays of size $k$.
- We maintain a frequency array `count[51]` where `count[v]` represents how many distinct size-$k$ subarrays contain the value $v$.

### 2. Window Traversal:
For each starting index `start` from $0$ up to $N - k$:
- Use a boolean array `seen[51]` to track distinct values in the current window `nums[start .. start + k - 1]`.
- For every value $v$ present in this window (`seen[v] == true`), increment `count[v]++`.

### 3. Finding the Largest Integer:
- Iterate through values $v \in [0, 50]$ in ascending order.
- If `count[v] == 1`, update `ans = v`.
- Since we iterate from smallest to largest, the last value updated will automatically be the largest almost missing integer.
- If no value has `count[v] == 1`, return `-1`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}((N - k + 1) \cdot (k + V))$
  - There are $N - k + 1 \le 50$ subarrays of length $k$.
  - Scanning each window takes $\mathcal{O}(k)$ time, and updating counts takes $\mathcal{O}(V)$ where $V = 51$.
  - With $N \le 50$, total operations are $\le 50 \times 101 \approx 5000$, executing in $< 1\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(V) = \mathcal{O}(1)$
  - Fixed-size arrays `count[51]` and `seen[51]` bounded by the maximum possible element value $50$.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
