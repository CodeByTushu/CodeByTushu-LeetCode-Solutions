# LeetCode 3942: Minimum Operations to Sort a Permutation

- **Publication Date:** 22 October 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-operations-to-sort-a-permutation/](https://leetcode.com/problems/minimum-operations-to-sort-a-permutation/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/1EZuD1aWSl8?si=t_rXtTI-pWbyXkAL)

---

## Problem Summary

You are given an integer array `nums` of length `n`, where `nums` is a permutation of the integers from `0` to `n - 1`.

You may perform **only** the following operations:
- **Reverse the entire array.**
- **Rotate Left by One:** Move the first element to the end of the array, and shift the rest of the elements left by one position.

Return an integer denoting the **minimum number of operations** required to sort the array in **increasing** order. If it is not possible to sort the array using only the given operations, return `-1`.

---

### Examples

#### Example 1:
- **Input:** `nums = [0, 2, 1]`
- **Output:** `2`
- **Explanation:**
  - Rotate Left by one: `[2, 1, 0]`
  - Reverse the array: `[0, 1, 2]`
  - The array becomes sorted in 2 operations, which is minimal.

#### Example 2:
- **Input:** `nums = [1, 0, 2]`
- **Output:** `2`
- **Explanation:**
  - Reverse the array: `[2, 0, 1]`
  - Rotate Left by one: `[0, 1, 2]`
  - The array becomes sorted in 2 operations, which is minimal.

#### Example 3:
- **Input:** `nums = [2, 0, 1, 3]`
- **Output:** `-1`
- **Explanation:**
  - It is impossible to sort `nums` using only the given operations. Thus, the answer is `-1`.

---

### Constraints

- $1 \le n == \text{nums.length} \le 10^5$
- $0 \le \text{nums}[i] \le n - 1$
- `nums` is a permutation of integers from `0` to `n - 1`.

---

## Topics and Tags

- **Array**
- **Math**
- **Simulation**

---

## Approach & Intuition

### 1. Cyclic Permutation & Invariant Analysis

1. **Permutation Invariant:**
   - Any number of left rotations preserves the cyclic order of elements without changing their relative circular arrangement.
   - Reversing the entire array inverts the cyclic direction (switching between cyclic ascending and cyclic descending).
   - Consequently, the array can **only** be sorted if it is already either:
     - **Cyclically Ascending:** `nums[i] == (i + s) % n`
     - **Cyclically Descending:** `nums[i] == ((c - i) % n + n) % n`
   - If neither condition holds, the array cannot be sorted by any combination of reversals and rotations $\implies$ return `-1`.

2. **Case 1: Cyclically Ascending (`s = nums[0]`):**
   - If `s == 0`, the array is already sorted $\implies$ `0` operations.
   - **Direct left rotations:** Shifting left until `0` reaches index `0` takes `n - s` operations.
   - **Reversal and rotation:** Reversing, rotating in the opposite direction, and reversing again takes `s + 2` operations.
   - Total operations: `min(n - s, s + 2)`.

3. **Case 2: Cyclically Descending (`c = nums[0]`):**
   - The array must be reversed at least once (taking `1` operation).
   - In addition to the reversal, shifting by `t = (c + 1) % n` either forwards or backwards takes `min(t, n - t)` operations.
   - Total operations: `min(t, n - t) + 1`.

4. **Optimal Choice:**
   - Take the minimum of all valid paths, or return `-1` if no valid pattern matches.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - A single linear scan checks the cyclic ascending and descending patterns across the permutation of length $N$.

- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Operates using only constant scalar variables (`s`, `c`, `t`, `best`, `asc`, `desc`).

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/1EZuD1aWSl8?si=t_rXtTI-pWbyXkAL](https://youtu.be/1EZuD1aWSl8?si=t_rXtTI-pWbyXkAL)

---

## Resources & Community

- 🌐 **Platform Website:** [https://codebytushu.com/](https://codebytushu.com/)
- 💻 **All LeetCode Solutions:** [https://codebytushu.com/Leetcode/](https://codebytushu.com/Leetcode/)
- 📂 **GitHub Repository:** [https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions](https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions)
