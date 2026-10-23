# LeetCode 3644: Maximum K to Sort a Permutation

- **Publication Date:** 23 October 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/maximum-k-to-sort-a-permutation/](https://leetcode.com/problems/maximum-k-to-sort-a-permutation/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/8qmQnPXusho?si=GfX8pbo2iogS5g8x)

---

## Problem Summary

You are given an integer array `nums` of length `n`, where `nums` is a permutation of the numbers in the range `[0..n - 1]`.

You may swap elements at indices `i` and `j` **only if** `nums[i] AND nums[j] == k`, where `AND` denotes the bitwise AND operation and `k` is a non-negative integer.

Return the **maximum value of** `k` such that the array can be sorted in **non-decreasing** order using any number of such swaps. If `nums` is already sorted, return `0`.

---

### Examples

#### Example 1:
- **Input:** `nums = [0, 3, 2, 1]`
- **Output:** `1`
- **Explanation:**
  - Choose $k = 1$. Swapping `nums[1] = 3` and `nums[3] = 1` is allowed since `3 AND 1 == 1`, resulting in a sorted permutation: `[0, 1, 2, 3]`.

#### Example 2:
- **Input:** `nums = [0, 1, 3, 2]`
- **Output:** `2`
- **Explanation:**
  - Choose $k = 2$. Swapping `nums[2] = 3` and `nums[3] = 2` is allowed since `3 AND 2 == 2`, resulting in a sorted permutation: `[0, 1, 2, 3]`.

#### Example 3:
- **Input:** `nums = [3, 2, 1, 0]`
- **Output:** `0`
- **Explanation:**
  - Only $k = 0$ allows sorting since no greater $k$ allows the required swaps where `nums[i] AND nums[j] == k`.

---

### Constraints

- $1 \le n == \text{nums.length} \le 10^5$
- $0 \le \text{nums}[i] \le n - 1$
- `nums` is a permutation of integers from $0$ to $n - 1$.

---

## Topics and Tags

- **Array**
- **Bit Manipulation**
- **Math**

---

## Approach & Intuition

### 1. Bitwise Invariant of Swapping Elements

1. **Swap Condition:**
   - Swapping elements $u$ and $v$ requires $u \text{ AND } v = k$.
   - By the definition of the bitwise AND operation, any bit that is set in $k$ ($k$'s $b$-th bit is $1$) **must be set** in both $u$ and $v$.
   - In other words, $k$ is a submask of every element involved in any swap.

2. **Misplaced Elements Must Move:**
   - In a sorted permutation of $[0, \dots, n - 1]$, every element must reside at index $i = \text{nums}[i]$.
   - Any element currently satisfying $\text{nums}[i] \ne i$ is misplaced and must be swapped at least once to reach its correct position.
   - Therefore, every misplaced element must participate in at least one swap, meaning all bits set in $k$ must be set in every misplaced element.

3. **Maximizing $k$:**
   - To make $k$ as large as possible while satisfying the condition for every misplaced number, $k$ must equal the cumulative bitwise AND of all elements for which $\text{nums}[i] \ne i$:
     $$k = \bigwedge_{\text{nums}[i] \ne i} \text{nums}[i]$$
   - If the permutation is already sorted, no swaps are needed, and the problem asks us to return `0`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - A single linear scan through the array computes the bitwise AND of all misplaced elements.

- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Uses only a single integer accumulator `ans`.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/8qmQnPXusho?si=GfX8pbo2iogS5g8x](https://youtu.be/8qmQnPXusho?si=GfX8pbo2iogS5g8x)

---

## Resources & Community

- 🌐 **Platform Website:** [https://codebytushu.com/](https://codebytushu.com/)
- 💻 **All LeetCode Solutions:** [https://codebytushu.com/Leetcode/](https://codebytushu.com/Leetcode/)
- 📂 **GitHub Repository:** [https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions](https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions)
