# LeetCode 3875: Construct Uniform Parity Array I

- **Publication Date:** 02 September 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/construct-uniform-parity-array-i/](https://leetcode.com/problems/construct-uniform-parity-array-i/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/KHNY5calb70?si=IphvDkMDaBJKEtbw)

---

## Problem Summary

You are given an array `nums1` of `n` distinct integers.

You want to construct another array `nums2` of length `n` such that the elements in `nums2` are either **all odd** or **all even**.

For each index `i`, you must choose exactly one of the following (in any order):
- `nums2[i] = nums1[i]`
- `nums2[i] = nums1[i] - nums1[j]`, for an index $j \neq i$

Return `true` if it is possible to construct such an array, otherwise, return `false`.

---

### Examples

#### Example 1:
- **Input:** `nums1 = [2,3]`
- **Output:** `true`
- **Explanation:**
  - Choose `nums2[0] = nums1[0] - nums1[1] = 2 - 3 = -1`.
  - Choose `nums2[1] = nums1[1] = 3`.
  - `nums2 = [-1, 3]`, and both elements are odd. Thus, the answer is `true`.

#### Example 2:
- **Input:** `nums1 = [4,6]`
- **Output:** `true`
- **Explanation:**
  - Choose `nums2[0] = nums1[0] = 4`.
  - Choose `nums2[1] = nums1[1] = 6`.
  - `nums2 = [4, 6]`, and all elements are even. Thus, the answer is `true`.

---

### Constraints

- $1 \le n == \text{nums1.length} \le 100$
- $1 \le \text{nums1}[i] \le 100$
- `nums1` consists of distinct integers.

---

## Topics and Tags

- **Array**
- **Math**

---

## Approach & Intuition

1. **Parity Rules of Subtraction**:
   - $\text{Even} - \text{Even} = \text{Even}$
   - $\text{Odd} - \text{Odd} = \text{Even}$
   - $\text{Even} - \text{Odd} = \text{Odd}$
   - $\text{Odd} - \text{Even} = \text{Odd}$

2. **Making All Elements Even (`allEven`)**:
   - For an even number in `nums1`, we can simply keep it unchanged.
   - For an odd number in `nums1`, to make it even we must subtract another odd number ($\text{Odd} - \text{Odd} = \text{Even}$).
   - This is possible if there is at least one other odd number available ($j \neq i$), which means `oddCount >= 2` (or `oddCount == 0` if there were no odd numbers to begin with).
   - Thus: `allEven = (oddCount == 0 || oddCount >= 2)`.

3. **Making All Elements Odd (`allOdd`)**:
   - For an odd number in `nums1`, we can simply keep it unchanged.
   - For an even number in `nums1`, to make it odd we must subtract an odd number ($\text{Even} - \text{Odd} = \text{Odd}$).
   - This is possible if there is at least one odd number in `nums1` (`oddCount >= 1`), or if there are no even numbers at all (`evenCount == 0`).
   - Thus: `allOdd = (evenCount == 0 || oddCount >= 1)`.

4. **Conclusion**:
   - If either condition is met, return `true`: `return allEven || allOdd;`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - A single pass over array `nums1` to count odd and even elements.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Constant extra space using only two integer counters.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/KHNY5calb70?si=IphvDkMDaBJKEtbw](https://youtu.be/KHNY5calb70?si=IphvDkMDaBJKEtbw)

---

## Resources & Community

- 🌐 **Platform Website:** [https://codebytushu.com/](https://codebytushu.com/)
- 💻 **All LeetCode Solutions:** [https://codebytushu.com/Leetcode/](https://codebytushu.com/Leetcode/)
- 📂 **GitHub Repository:** [https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions](https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions)
