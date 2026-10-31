# LeetCode 3876: Construct Uniform Parity Array II

- **Publication Date:** 03 September 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/construct-uniform-parity-array-ii/](https://leetcode.com/problems/construct-uniform-parity-array-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/31WSaoYfhjc?si=Wot4aNMPvr2nLo2L)

---

## Problem Summary

You are given an array `nums1` of `n` distinct integers.

You want to construct another array `nums2` of length `n` such that the elements in `nums2` are either **all odd** or **all even**.

For each index `i`, you must choose exactly one of the following (in any order):
- `nums2[i] = nums1[i]`
- `nums2[i] = nums1[i] - nums1[j]`, for an index $j \neq i$, such that $\text{nums1}[i] - \text{nums1}[j] \ge 1$

Return `true` if it is possible to construct such an array, otherwise return `false`.

---

### Examples

#### Example 1:
- **Input:** `nums1 = [1,4,7]`
- **Output:** `true`
- **Explanation:**
  - Set `nums2[0] = nums1[0] = 1`.
  - Set `nums2[1] = nums1[1] - nums1[0] = 4 - 1 = 3`.
  - Set `nums2[2] = nums1[2] = 7`.
  - `nums2 = [1, 3, 7]`, and all elements are odd. Thus, the answer is `true`.

#### Example 2:
- **Input:** `nums1 = [2,3]`
- **Output:** `false`
- **Explanation:**
  - It is not possible to construct `nums2` such that all elements have the same parity. Thus, the answer is `false`.

#### Example 3:
- **Input:** `nums1 = [4,6]`
- **Output:** `true`
- **Explanation:**
  - Set `nums2[0] = nums1[0] = 4`.
  - Set `nums2[1] = nums1[1] = 6`.
  - `nums2 = [4, 6]`, and all elements are even. Thus, the answer is `true`.

---

### Constraints

- $1 \le n == \text{nums1.length} \le 10^5$
- $1 \le \text{nums1}[i] \le 10^9$
- `nums1` consists of distinct integers.

---

## Topics and Tags

- **Array**
- **Math**
- **Greedy**

---

## Approach & Intuition

1. **Parity Subtraction Rules with Strict Lower Bound**:
   - The condition $\text{nums1}[i] - \text{nums1}[j] \ge 1$ means we can only subtract an element $\text{nums1}[j]$ if $\text{nums1}[j] < \text{nums1}[i]$.
   - If an element already matches the target parity (`targetParity`), we can leave it untouched.
   - If an element does not match `targetParity`, we must flip its parity:
     - $\text{Even} - \text{Odd} = \text{Odd}$
     - $\text{Odd} - \text{Odd} = \text{Even}$
   - In both cases, flipping parity requires subtracting an **odd** element $\text{nums1}[j]$.

2. **Optimal Candidate Selection**:
   - To maximize the chance of satisfying $\text{nums1}[j] < \text{nums1}[i]$, the greedy choice is to pick the **global minimum element** having the required parity (`neededJParity`).
   - If the minimum element of that parity is still $\ge \text{nums1}[i]$, then no strictly smaller element exists, making it impossible to convert $\text{nums1}[i]$.
   - Since all elements in `nums1` are distinct, if $\text{globalMin} < \text{nums1}[i]$, it is guaranteed that $j \neq i$.

3. **Algorithm**:
   - Check if we can make all elements even (`targetParity = 0`).
   - Check if we can make all elements odd (`targetParity = 1`).
   - Return `canMakeAll(0) || canMakeAll(1)`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - Computing the minimum odd and even elements takes $\mathcal{O}(N)$.
  - Verifying each element takes a single $\mathcal{O}(1)$ check.
  - Overall runtime is linear $\mathcal{O}(N)$, completing well within 15 ms for $N = 10^5$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Uses only constant auxiliary variables.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/31WSaoYfhjc?si=Wot4aNMPvr2nLo2L](https://youtu.be/31WSaoYfhjc?si=Wot4aNMPvr2nLo2L)

---

## Resources & Community

- 🌐 **Platform Website:** [https://codebytushu.com/](https://codebytushu.com/)
- 💻 **All LeetCode Solutions:** [https://codebytushu.com/Leetcode/](https://codebytushu.com/Leetcode/)
- 📂 **GitHub Repository:** [https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions](https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions)
