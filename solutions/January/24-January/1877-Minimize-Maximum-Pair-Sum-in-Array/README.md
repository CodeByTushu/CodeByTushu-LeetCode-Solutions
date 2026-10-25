# LeetCode 1877: Minimize Maximum Pair Sum in Array

- **Publication Date:** 24 January 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimize-maximum-pair-sum-in-array/](https://leetcode.com/problems/minimize-maximum-pair-sum-in-array/)
- **YouTube Solution:** *Coming Soon* ⏳

---

## Problem Summary

The **pair sum** of a pair $(a, b)$ is equal to $a + b$. The **maximum pair sum** is the largest pair sum in a list of pairs.

For example, if we have pairs $(1, 5)$, $(2, 3)$, and $(4, 4)$, the maximum pair sum would be:
$$\max(1 + 5, 2 + 3, 4 + 4) = \max(6, 5, 8) = 8$$

Given an array `nums` of **even** length $n$, pair up the elements of `nums` into $n / 2$ pairs such that:
- Each element of `nums` is in **exactly one** pair, and
- The **maximum pair sum** is **minimized**.

Return the minimized **maximum pair sum** after optimally pairing up the elements.

---

### Examples

#### Example 1:
- **Input:** `nums = [3, 5, 2, 3]`
- **Output:** `7`
- **Explanation:**
  - The elements can be paired up into pairs $(3, 3)$ and $(5, 2)$.
  - The pair sums are $3 + 3 = 6$ and $5 + 2 = 7$.
  - The maximum pair sum is $\max(6, 7) = 7$.

#### Example 2:
- **Input:** `nums = [3, 5, 4, 2, 4, 6]`
- **Output:** `8`
- **Explanation:**
  - The elements can be paired up into pairs $(3, 5)$, $(4, 4)$, and $(6, 2)$.
  - The pair sums are $3 + 5 = 8$, $4 + 4 = 8$, and $6 + 2 = 8$.
  - The maximum pair sum is $\max(8, 8, 8) = 8$.

---

### Constraints

- $n == \text{nums.length}$
- $2 \le n \le 10^5$
- $n$ is **even**.
- $1 \le \text{nums}[i] \le 10^5$

---

## Topics and Tags

- **Array**
- **Two Pointers**
- **Greedy**
- **Sorting**

---

## Approach & Intuition

### Greedy Choice & Rearrangement Inequality:

1. **Intuition:**
   - To minimize the maximum sum among all formed pairs, we want the pair sums to be as balanced as possible.
   - If we pair the largest element with another large element, their sum will be excessively large.
   - To counteract the largest element, we should pair it with the smallest available element.
   - Similarly, the second largest element should be paired with the second smallest available element, and so forth.

2. **Mathematical Justification:**
   - Suppose the sorted array is $x_1 \le x_2 \le \dots \le x_n$.
   - Any pairing where $x_n$ is paired with $x_k$ (where $k > 1$) leaves $x_1$ to be paired with some other element $x_j$.
   - If we swap partners so that $(x_1, x_n)$ and $(x_j, x_k)$ are paired instead, the maximum of the two pair sums $\max(x_1 + x_n, x_j + x_k)$ is strictly less than or equal to $\max(x_k + x_n, x_1 + x_j)$.
   - By induction, the optimal pairing that minimizes the maximum pair sum always pairs the $i$-th smallest element with the $i$-th largest element:
     $$\text{Pair}_i = (x_i, x_{n - 1 - i}) \quad \text{for } 0 \le i < n / 2$$

3. **Step-by-Step Algorithm:**
   - **Step 1:** Sort `nums` in ascending order.
   - **Step 2:** Initialize two pointers: `left = 0` and `right = n - 1`. Maintain a variable `maxPairSum = 0`.
   - **Step 3:** While `left < right`:
     - Calculate $\text{currentSum} = \text{nums}[left] + \text{nums}[right]$.
     - Update $\text{maxPairSum} = \max(\text{maxPairSum}, \text{currentSum})$.
     - Increment `left` and decrement `right`.
   - **Step 4:** Return `maxPairSum`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n \log n)$
  - Sorting the array of size $n$ takes $\mathcal{O}(n \log n)$ time.
  - The two-pointer scan computes $n / 2$ pair sums in linear time $\mathcal{O}(n)$.
  - Total time: $\mathcal{O}(n \log n) + \mathcal{O}(n) = \mathcal{O}(n \log n)$. With $n = 10^5$, this comfortably runs in under $30\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$ or $\mathcal{O}(\log n)$
  - In-place sorting requires $\mathcal{O}(\log n)$ auxiliary space for the quicksort/timsort recursion call stack.
  - No auxiliary data structures are allocated.

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
