# LeetCode 3904: Smallest Stable Index II

- **Publication Date:** 05 September 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/smallest-stable-index-ii/](https://leetcode.com/problems/smallest-stable-index-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/tB7oX6In4vQ?si=gtkgXZRhkf2ur_gq)

---

## Problem Summary

You are given an integer array `nums` of length `n` and an integer `k`.

For each index `i`, define its **instability score** as $\max(\text{nums}[0..i]) - \min(\text{nums}[i..n - 1])$.

In other words:
- $\max(\text{nums}[0..i])$ is the largest value among the elements from index $0$ to index $i$.
- $\min(\text{nums}[i..n - 1])$ is the smallest value among the elements from index $i$ to index $n - 1$.

An index $i$ is called **stable** if its instability score is less than or equal to $k$.

Return the **smallest stable index**. If no such index exists, return `-1`.

---

### Examples

#### Example 1:
- **Input:** `nums = [5,0,1,4], k = 3`
- **Output:** `3`
- **Explanation:**
  - At index 0: The maximum in `[5]` is 5, and the minimum in `[5, 0, 1, 4]` is 0, so the instability score is $5 - 0 = 5$.
  - At index 1: The maximum in `[5, 0]` is 5, and the minimum in `[0, 1, 4]` is 0, so the instability score is $5 - 0 = 5$.
  - At index 2: The maximum in `[5, 0, 1]` is 5, and the minimum in `[1, 4]` is 1, so the instability score is $5 - 1 = 4$.
  - At index 3: The maximum in `[5, 0, 1, 4]` is 5, and the minimum in `[4]` is 4, so the instability score is $5 - 4 = 1$.
  - This is the first index with an instability score less than or equal to $k = 3$, thus the answer is `3`.

#### Example 2:
- **Input:** `nums = [3,2,1], k = 1`
- **Output:** `-1`
- **Explanation:**
  - At index 0: The instability score is $3 - 1 = 2$.
  - At index 1: The instability score is $3 - 1 = 2$.
  - At index 2: The instability score is $3 - 1 = 2$.
  - None of these values is less than or equal to $k = 1$, so the answer is `-1`.

#### Example 3:
- **Input:** `nums = [0], k = 0`
- **Output:** `0`
- **Explanation:**
  - At index 0: The instability score is $0 - 0 = 0$, which is $\le k = 0$. Therefore, the answer is `0`.

---

### Constraints

- $1 \le \text{nums.length} \le 10^5$
- $0 \le \text{nums}[i] \le 10^9$
- $0 \le k \le 10^9$

---

## Topics and Tags

- **Array**
- **Prefix / Suffix Precomputation**

---

## Approach & Intuition

1. **Scale & Requirements**:
   - Unlike Smallest Stable Index I where $N \le 100$, here $N \le 10^5$.
   - Any naive $\mathcal{O}(N^2)$ algorithm checking range extrema dynamically will result in Time Limit Exceeded (TLE).
   - We need an optimal $\mathcal{O}(N)$ single or double-pass linear solution.

2. **Prefix Maximum & Suffix Minimum Precomputation**:
   - For any index $i$, the instability score requires:
     - The maximum element from the start up to index $i$: $\text{prefixMax}[i] = \max(\text{prefixMax}[i-1], \text{nums}[i])$
     - The minimum element from index $i$ to the end of the array: $\text{suffixMin}[i] = \min(\text{suffixMin}[i+1], \text{nums}[i])$
   - We can precompute both arrays in linear time $\mathcal{O}(N)$.

3. **Finding the Smallest Stable Index**:
   - Scan from left to right ($i = 0$ to $n - 1$).
   - For each index $i$, evaluate $\text{instability} = \text{prefixMax}[i] - \text{suffixMin}[i]$.
   - As soon as $\text{instability} \le k$, return index $i$ immediately (this guarantees the smallest index).
   - If no index meets the threshold after scanning all elements, return `-1`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - 1 pass to construct the prefix maximum array: $\mathcal{O}(N)$.
  - 1 pass to construct the suffix minimum array: $\mathcal{O}(N)$.
  - 1 linear scan to identify the first stable index: $\mathcal{O}(N)$.
  - Overall time complexity is strictly $\mathcal{O}(N)$, running in under 20 ms for $N = 10^5$.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - $\mathcal{O}(N)$ memory used for `prefixMax` and `suffixMin` arrays.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/tB7oX6In4vQ?si=gtkgXZRhkf2ur_gq](https://youtu.be/tB7oX6In4vQ?si=gtkgXZRhkf2ur_gq)

---

## Resources & Community

- 🌐 **Platform Website:** [https://codebytushu.com/](https://codebytushu.com/)
- 💻 **All LeetCode Solutions:** [https://codebytushu.com/Leetcode/](https://codebytushu.com/Leetcode/)
- 📂 **GitHub Repository:** [https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions](https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions)
