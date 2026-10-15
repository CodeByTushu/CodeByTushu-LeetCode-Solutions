# LeetCode 3903: Smallest Stable Index I

- **Publication Date:** 04 September 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/smallest-stable-index-i/](https://leetcode.com/problems/smallest-stable-index-i/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/zbkfS8-C1gY?si=BWfFKVbQWwGslKDH)

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

- $1 \le \text{nums.length} \le 100$
- $0 \le \text{nums}[i] \le 10^9$
- $0 \le k \le 10^9$

---

## Topics and Tags

- **Array**
- **Prefix / Suffix Precomputation**

---

## Approach & Intuition

1. **Understanding Instability Score**:
   - For every index $i$, the instability score requires the maximum element in the prefix subarray $\text{nums}[0..i]$ and the minimum element in the suffix subarray $\text{nums}[i..n-1]$.
   - A naive approach of finding the maximum and minimum on each iteration would take $\mathcal{O}(N)$ per index, leading to an $\mathcal{O}(N^2)$ overall runtime.

2. **Prefix Maximum & Suffix Minimum Precomputation**:
   - We can precompute the prefix maximum in a single forward pass:
     $$\text{prefixMax}[i] = \max(\text{prefixMax}[i - 1], \text{nums}[i])$$
   - Similarly, precompute the suffix minimum in a single backward pass:
     $$\text{suffixMin}[i] = \min(\text{suffixMin}[i + 1], \text{nums}[i])$$

3. **Finding Smallest Stable Index**:
   - Iterate from $i = 0$ to $n - 1$:
     - Check if $\text{prefixMax}[i] - \text{suffixMin}[i] \le k$.
     - The first index satisfying this condition is guaranteed to be the smallest stable index.
   - If the loop finishes without finding any stable index, return `-1`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - 1 forward pass to compute prefix maximums: $\mathcal{O}(N)$.
  - 1 backward pass to compute suffix minimums: $\mathcal{O}(N)$.
  - 1 pass to evaluate instability scores: $\mathcal{O}(N)$.
  - Total time complexity is strictly linear $\mathcal{O}(N)$.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - Storing `prefixMax` and `suffixMin` arrays of size $N$.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/zbkfS8-C1gY?si=BWfFKVbQWwGslKDH](https://youtu.be/zbkfS8-C1gY?si=BWfFKVbQWwGslKDH)

---

## Resources & Community

- 🌐 **Platform Website:** [https://codebytushu.com/](https://codebytushu.com/)
- 💻 **All LeetCode Solutions:** [https://codebytushu.com/Leetcode/](https://codebytushu.com/Leetcode/)
- 📂 **GitHub Repository:** [https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions](https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions)
