# LeetCode 1200: Minimum Absolute Difference

- **Publication Date:** 26 January 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/minimum-absolute-difference/](https://leetcode.com/problems/minimum-absolute-difference/)
- **YouTube Solution:** *Coming Soon* ⏳

---

## Problem Summary

Given an array of **distinct** integers `arr`, find all pairs of elements with the minimum absolute difference of any two elements.

Return a list of pairs in ascending order (with respect to pairs), each pair `[a, b]` follows:
- `a, b` are from `arr`
- `a < b`
- `b - a` equals to the minimum absolute difference of any two elements in `arr`

---

### Examples

#### Example 1:
- **Input:** `arr = [4, 2, 1, 3]`
- **Output:** `[[1, 2], [2, 3], [3, 4]]`
- **Explanation:**
  - The minimum absolute difference is $1$.
  - Pairs with difference $1$ in ascending order are: $[[1, 2], [2, 3], [3, 4]]$.

#### Example 2:
- **Input:** `arr = [1, 3, 6, 10, 15]`
- **Output:** `[[1, 3]]`
- **Explanation:**
  - Differences between adjacent elements are: $3 - 1 = 2$, $6 - 3 = 3$, $10 - 6 = 4$, $15 - 10 = 5$.
  - The minimum absolute difference is $2$, occurring only for pair $[1, 3]$.

#### Example 3:
- **Input:** `arr = [3, 8, -10, 23, 19, -4, -14, 27]`
- **Output:** `[[-14, -10], [19, 23], [23, 27]]`
- **Explanation:**
  - Sorted array: $[-14, -10, -4, 3, 8, 19, 23, 27]$.
  - The minimum absolute difference is $4$.
  - Pairs with difference $4$ are: $[-14, -10]$, $[19, 23]$, and $[23, 27]$.

---

### Constraints

- $2 \le \text{arr.length} \le 10^5$
- $-10^6 \le \text{arr}[i] \le 10^6$

---

## Topics and Tags

- **Array**
- **Sorting**

---

## Approach & Intuition

### Key Mathematical Observation:

1. **Adjacent Elements in Sorted Order:**
   - In any sorted array $a_0 \le a_1 \le a_2 \le \dots \le a_{n - 1}$, for any three indices $i < j < k$:
     $$(a_k - a_i) = (a_k - a_j) + (a_j - a_i)$$
   - Since all elements are distinct, differences are strictly positive ($> 0$). Therefore:
     $$(a_k - a_i) > (a_k - a_j) \quad \text{and} \quad (a_k - a_i) > (a_j - a_i)$$
   - This proves that the minimum absolute difference between *any* two elements in the array must occur between **adjacent elements** in the sorted sequence.
   - We never need to check non-adjacent pairs!

2. **Algorithm Steps:**
   - **Step 1:** Sort `arr` in ascending order.
   - **Step 2:** Find the minimum difference `minDiff` by comparing each adjacent pair:
     $$\text{minDiff} = \min_{1 \le i < n} (\text{arr}[i] - \text{arr}[i - 1])$$
   - **Step 3:** Collect all adjacent pairs `[arr[i - 1], arr[i]]` where:
     $$\text{arr}[i] - \text{arr}[i - 1] == \text{minDiff}$$
   - Since the array is already sorted, the resulting pairs will automatically be ordered in ascending order with $a < b$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n \log n)$
  - Sorting the array of size $n$ takes $\mathcal{O}(n \log n)$ time.
  - Linear passes across adjacent elements take $\mathcal{O}(n)$ time.
  - Total time: $\mathcal{O}(n \log n) + \mathcal{O}(n) = \mathcal{O}(n \log n)$. With $n = 10^5$, this comfortably executes in $\approx 25\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$ or $\mathcal{O}(\log n)$
  - In-place sorting requires $\mathcal{O}(\log n)$ stack space.
  - Excluding the memory required for the output list, auxiliary space is $\mathcal{O}(1)$.

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
