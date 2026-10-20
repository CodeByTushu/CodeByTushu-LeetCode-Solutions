# LeetCode 3886: Sum of Sortable Integers

- **Publication Date:** 20 October 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/sum-of-sortable-integers/](https://leetcode.com/problems/sum-of-sortable-integers/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/uAyI0xNQDNE?si=0AIImqPPWw3-AeD4)

---

## Problem Summary

You are given an integer array `nums` of length `n`.

An integer `k` is called **sortable** if `k` divides `n` and you can sort `nums` in non-decreasing order by sequentially performing the following operations:
- Partition `nums` into consecutive subarrays of length `k`.
- Cyclically rotate each subarray independently any number of times to the left or to the right.

Return an integer denoting the **sum of all possible sortable integers** `k`.

---

### Examples

#### Example 1:
- **Input:** `nums = [3, 1, 2]`
- **Output:** `3`
- **Explanation:**
  - For `n = 3`, possible divisors are `1` and `3`.
  - For `k = 1`: each subarray has one element. No rotation can sort the array.
  - For `k = 3`: the single subarray `[3, 1, 2]` can be rotated once to produce `[1, 2, 3]`, which is sorted.
  - Only `k = 3` is sortable. Hence, the answer is `3`.

#### Example 2:
- **Input:** `nums = [7, 6, 5]`
- **Output:** `0`
- **Explanation:**
  - For `n = 3`, possible divisors are `1` and `3`.
  - For `k = 1`: each subarray has one element. No rotation can sort the array.
  - For `k = 3`: the single subarray `[7, 6, 5]` cannot be rotated into non-decreasing order.
  - No `k` is sortable. Hence, the answer is `0`.

#### Example 3:
- **Input:** `nums = [5, 8]`
- **Output:** `3`
- **Explanation:**
  - For `n = 2`, possible divisors are `1` and `2`.
  - Since `[5, 8]` is already sorted, every divisor is sortable. Hence, the answer is `1 + 2 = 3`.

---

### Constraints

- $1 \le n == \text{nums.length} \le 10^5$
- $1 \le \text{nums}[i] \le 10^5$

---

## Topics and Tags

- **Array**
- **Math**
- **Number Theory**
- **Sorting**
- **Simulation**

---

## Approach & Intuition

### 1. Divisor Enumeration & Subarray Rotation Properties

1. **Divisor Requirement:**
   - Integer $k$ can only partition `nums` into equal consecutive subarrays if $n \pmod k == 0$. We iterate over all candidate $k \in [1, n]$.

2. **Rotatability of a Single Subarray:**
   - A sequence can be cyclically rotated into a non-decreasing sorted order if and only if the number of circular descending adjacent pairs (`nums[i] > nums[i + 1]`, with circular wrap-around from the end of the block back to the start) is **at most 1** (`desc <= 1`).
   - If `desc > 1`, the subarray contains multiple drops and cannot be rotated into sorted order.

3. **Global Monotonicity Across Subarrays:**
   - Once each block is rotated into its unique sorted form, its minimum element `mn` must not be smaller than the maximum element `prevMax` of the preceding block (`mn >= prevMax`).
   - If both conditions hold for every block of length $k$, then $k$ is sortable, and we add $k$ to our answer.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(d(n) \cdot n)$
  - For each valid divisor $k$ of $n$, we perform a single linear scan of size $n$.
  - The number of divisors $d(n) \le 128$ for $n \le 10^5$.
  - Total operations are at most $128 \times 10^5 \approx 1.28 \times 10^7$, running well within standard time limits (~40ms).

- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Only scalar variables (`prevMax`, `mn`, `mx`, `desc`) are used during the validation.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/uAyI0xNQDNE?si=0AIImqPPWw3-AeD4](https://youtu.be/uAyI0xNQDNE?si=0AIImqPPWw3-AeD4)

---

## Resources & Community

- 🌐 **Platform Website:** [https://codebytushu.com/](https://codebytushu.com/)
- 💻 **All LeetCode Solutions:** [https://codebytushu.com/Leetcode/](https://codebytushu.com/Leetcode/)
- 📂 **GitHub Repository:** [https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions](https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions)
