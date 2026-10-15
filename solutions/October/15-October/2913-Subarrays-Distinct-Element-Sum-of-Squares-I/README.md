# LeetCode 2913: Subarrays Distinct Element Sum of Squares I

- **Publication Date:** 15 October 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/subarrays-distinct-element-sum-of-squares-i/](https://leetcode.com/problems/subarrays-distinct-element-sum-of-squares-i/)

---

## Problem Summary

You are given a 0-indexed integer array `nums`.

The **distinct count** of a subarray of `nums` is defined as:
- Let `nums[i..j]` be a subarray of `nums` consisting of all indices from `i` to `j` such that `0 <= i <= j < nums.length`.
- The number of distinct values in `nums[i..j]` is called the distinct count of `nums[i..j]`.

Return the sum of the squares of distinct counts of all subarrays of `nums`.

A subarray is a contiguous non-empty sequence of elements within an array.

---

### Examples

#### Example 1:
- **Input:** `nums = [1,2,1]`
- **Output:** `15`
- **Explanation:**
  Six possible subarrays:
  - `[1]`: 1 distinct value $\to 1^2 = 1$
  - `[2]`: 1 distinct value $\to 1^2 = 1$
  - `[1]`: 1 distinct value $\to 1^2 = 1$
  - `[1, 2]`: 2 distinct values $\to 2^2 = 4$
  - `[2, 1]`: 2 distinct values $\to 2^2 = 4$
  - `[1, 2, 1]`: 2 distinct values $\to 2^2 = 4$
  The total sum of squares is $1 + 1 + 1 + 4 + 4 + 4 = 15$.

#### Example 2:
- **Input:** `nums = [1,1]`
- **Output:** `3`
- **Explanation:**
  Three possible subarrays:
  - `[1]`: 1 distinct value $\to 1^2 = 1$
  - `[1]`: 1 distinct value $\to 1^2 = 1$
  - `[1, 1]`: 1 distinct value $\to 1^2 = 1$
  The total sum of squares is $1 + 1 + 1 = 3$.

---

### Constraints

- $1 \le \text{nums.length} \le 100$
- $1 \le \text{nums}[i] \le 100$

---

## Topics and Tags

- **Array**
- **Hash Table**
- **Simulation**

---

## Approach & Intuition

1. **Subarray Generation**:
   - Given the constraints ($N \le 100$), the total number of subarrays is $\frac{N(N + 1)}{2} \le 5050$.
   - A nested loop over start index $i \in [0, N-1]$ and end index $j \in [i, N-1]$ can generate every subarray efficiently.

2. **Incremental Distinct Counting**:
   - For a fixed starting point $i$, maintain a hash set of distinct elements encountered so far.
   - As $j$ advances from $i$ to $N - 1$, insert $\text{nums}[j]$ into the set.
   - The size of the set at each step gives the distinct count of subarray $\text{nums}[i..j]$ in $\mathcal{O}(1)$ amortized time.
   - Add $\text{count}^2$ directly to the running sum.

3. **Optimality**:
   - Total time is $\mathcal{O}(N^2)$, which takes fewer than $10^4$ operations—running in $< 2\text{ ms}$ across all supported languages.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N^2)$
  - There are $\frac{N(N + 1)}{2}$ subarrays. For each starting index $i$, incrementally inserting elements into a hash set takes $\mathcal{O}(1)$ amortized time per step.
  - Overall operations $\le 5050$, well within standard time limits.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - The hash set holds at most $N$ unique elements for any single subarray window.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Resources & Community

- 🌐 **Platform Website:** [https://codebytushu.com/](https://codebytushu.com/)
- 💻 **All LeetCode Solutions:** [https://codebytushu.com/Leetcode/](https://codebytushu.com/Leetcode/)
- 📂 **GitHub Repository:** [https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions](https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions)
