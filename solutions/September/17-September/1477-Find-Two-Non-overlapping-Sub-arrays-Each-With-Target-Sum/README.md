# LeetCode 1477: Find Two Non-overlapping Sub-arrays Each With Target Sum

- **Publication Date:** 17 September 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/find-two-non-overlapping-sub-arrays-each-with-target-sum/](https://leetcode.com/problems/find-two-non-overlapping-sub-arrays-each-with-target-sum/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/gvV8MrYsq1k?si=dp6dVewbmYYwNV0F)

---

## Problem Summary

You are given an array of integers `arr` and an integer `target`.

You have to find **two non-overlapping sub-arrays** of `arr` each with a sum equal to `target`. There can be multiple answers so you have to find an answer where the sum of the lengths of the two sub-arrays is **minimum**.

Return the *minimum sum of the lengths of the two required sub-arrays*, or return `-1` if you cannot find two such sub-arrays.

---

### Examples

#### Example 1:
- **Input:** `arr = [3,2,2,4,3], target = 3`
- **Output:** `2`
- **Explanation:**
  Only two sub-arrays have sum = 3: `[3]` at index 0 and `[3]` at index 4. The sum of their lengths is $1 + 1 = 2$.

#### Example 2:
- **Input:** `arr = [7,3,4,7], target = 7`
- **Output:** `2`
- **Explanation:**
  Although we have three valid sub-arrays with sum = 7 (`[7]`, `[3,4]`, and `[7]`), choosing the first `[7]` and third `[7]` yields a minimum total length of $1 + 1 = 2$.

#### Example 3:
- **Input:** `arr = [4,3,2,6,2,3,4], target = 6`
- **Output:** `-1`
- **Explanation:**
  We only have one sub-array with sum = 6 (`[6]`), so it is impossible to find two non-overlapping sub-arrays.

---

### Constraints

- $1 \le \text{arr.length} \le 10^5$
- $1 \le \text{arr}[i] \le 1000$
- $1 \le \text{target} \le 10^8$

---

## Topics and Tags

- **Array**
- **Hash Table**
- **Dynamic Programming**
- **Sliding Window**

---

## Approach & Intuition

### Key Idea:
To find two non-overlapping subarrays with sum equal to `target` whose combined length is minimized, we can process subarrays ending at index $i$ while maintaining the shortest valid subarray that ends strictly before the start of the current subarray.

1. **Prefix Sum & Hash Map**:
   - As we traverse the array, maintain the cumulative sum `sum`.
   - Store the latest index of each prefix sum in a hash map `map` initialized with `map[0] = -1`.
   - If `sum - target` exists in `map` at index $j$, then subarray `arr[j + 1 .. i]` has sum exactly equal to `target` and length:
     $$\text{len} = i - j$$

2. **Prefix Minimum Length Array (`best`)**:
   - Let `best[i]` denote the minimum length among all valid subarrays ending at or before index $i$.
   - When a valid subarray ending at $i$ is discovered (starting at $j + 1$):
     - Any non-overlapping preceding subarray must end at or before index $j$.
     - The optimal preceding subarray length is `best[j]`.
     - If $j \ge 0$ and `best[j] != ∞`, update the global answer:
       $$\text{ans} = \min(\text{ans}, \text{len} + \text{best}[j])$$
     - Update the running minimum length:
       $$\text{curBest} = \min(\text{curBest}, \text{len})$$
   - Set `best[i] = curBest`.

3. **Termination**:
   - If `ans` remains $\infty$, return `-1`; otherwise return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - A single pass over the array of size $N$ with constant-time hash map lookups and insertions.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - Stores up to $N$ entries in the prefix hash map and an array of size $N$ for `best`.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/gvV8MrYsq1k?si=dp6dVewbmYYwNV0F](https://youtu.be/gvV8MrYsq1k?si=dp6dVewbmYYwNV0F)

---

## Resources & Community

- 🌐 **Platform Website:** [https://codebytushu.com/](https://codebytushu.com/)
- 💻 **All LeetCode Solutions:** [https://codebytushu.com/Leetcode/](https://codebytushu.com/Leetcode/)
- 📂 **GitHub Repository:** [https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions](https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions)
