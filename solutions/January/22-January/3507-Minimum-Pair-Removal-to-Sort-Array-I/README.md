# LeetCode 3507: Minimum Pair Removal to Sort Array I

- **Publication Date:** 22 January 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/minimum-pair-removal-to-sort-array-i/](https://leetcode.com/problems/minimum-pair-removal-to-sort-array-i/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/3n4dbmCk_HA?si=_hT5GxjKerGMDwun)

---

## Problem Summary

Given an array `nums`, you can perform the following operation any number of times:
- Select the adjacent pair with the **minimum sum** in `nums`. If multiple such pairs exist, choose the **leftmost** one.
- Replace the pair with their sum.

Return the **minimum number of operations** needed to make the array **non-decreasing**.

An array is said to be non-decreasing if each element is greater than or equal to its previous element (if it exists).

---

### Examples

#### Example 1:
- **Input:** `nums = [5, 2, 3, 1]`
- **Output:** `2`
- **Explanation:**
  - The pair $(3, 1)$ has the minimum sum of $4$. After replacement, `nums = [5, 2, 4]`.
  - The pair $(2, 4)$ has the minimum sum of $6$. After replacement, `nums = [5, 6]`.
  - The array `nums` becomes non-decreasing in two operations.

#### Example 2:
- **Input:** `nums = [1, 2, 2]`
- **Output:** `0`
- **Explanation:**
  - The array `nums` is already non-decreasing, so $0$ operations are needed.

---

### Constraints

- $1 \le \text{nums.length} \le 50$
- $-1000 \le \text{nums}[i] \le 1000$

---

## Topics and Tags

- **Array**
- **Simulation**
- **Greedy**

---

## Approach & Intuition

### Step-by-Step Algorithm:

1. **Deterministic Rule Simulation:**
   - The problem rules specify a strictly deterministic procedure: at each step, if the array is not yet non-decreasing, we are forced to pick the adjacent pair $(i, i + 1)$ with the minimum sum $\text{nums}[i] + \text{nums}[i + 1]$ (breaking ties by picking the leftmost index $i$), replace the two elements by their sum, and increment our operation counter.
   - Because the rule leaves no choices or branches, the sequence of operations is unique.

2. **Termination Guarantee:**
   - Every replacement operation shrinks the array length by $1$.
   - Any array of size $1$ is trivially sorted (non-decreasing).
   - Therefore, the simulation terminates in at most $n - 1$ steps.

3. **Simulation Steps:**
   - Initialize `ops = 0`.
   - While `nums` is not non-decreasing:
     - Find the adjacent pair with the minimum sum. Tie-break with the leftmost index.
     - Replace `nums[minIdx]` and `nums[minIdx + 1]` with `nums[minIdx] + nums[minIdx + 1]`.
     - Increment `ops`.
   - Return `ops`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n^2)$
  - There are at most $n - 1 \le 49$ reduction operations.
  - In each iteration, checking if sorted and finding the minimum adjacent pair takes $\mathcal{O}(k)$ time, where $k$ is the current array size.
  - Total time: $\sum_{k=1}^n \mathcal{O}(k) = \mathcal{O}(n^2) \le 50^2 = 2500$ operations ($< 1\text{ ms}$).
- **Auxiliary Space Complexity:** $\mathcal{O}(n)$ to store the working list of array elements during simulation.

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
