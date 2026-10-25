# LeetCode 1292: Maximum Side Length of a Square with Sum Less than or Equal to Threshold

- **Publication Date:** 19 January 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold/](https://leetcode.com/problems/maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold/)
- **YouTube Solution:** *Coming Soon* ⏳

---

## Problem Summary

Given an $m \times n$ matrix `mat` and an integer `threshold`, return the **maximum side-length** of a square with a sum less than or equal to `threshold` or return `0` if there is no such square.

---

### Examples

#### Example 1:
- **Input:** `mat = [[1,1,3,2,4,3,2],[1,1,3,2,4,3,2],[1,1,3,2,4,3,2]], threshold = 4`
- **Output:** `2`
- **Explanation:**
  - The maximum side-length of a square with sum less than or equal to $4$ is $2$ (e.g., the $2 \times 2$ square at the top-left corner has sum $1 + 1 + 1 + 1 = 4 \le 4$).

#### Example 2:
- **Input:** `mat = [[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2]], threshold = 1`
- **Output:** `0`
- **Explanation:**
  - Every single element is $2$, which is strictly greater than the threshold $1$. Hence, no square exists.

---

### Constraints

- $m == \text{mat.length}$
- $n == \text{mat}[i].\text{length}$
- $1 \le m, n \le 300$
- $0 \le \text{mat}[i][j] \le 10^4$
- $0 \le \text{threshold} \le 10^5$

---

## Topics and Tags

- **Array**
- **Binary Search**
- **Matrix**
- **Prefix Sum**

---

## Approach & Intuition

### Key Observations:
1. **Non-Negative Elements Property:**
   - Every element in `mat` satisfies $\text{mat}[i][j] \ge 0$.
   - Consequently, adding cells to a square never decreases its sum.
   - If there exists a square of size $k$ with $\text{sum} \le \text{threshold}$, any sub-square of size $k - 1$ within it is also guaranteed to satisfy $\text{sum} \le \text{threshold}$.

2. **2D Prefix Sum for $\mathcal{O}(1)$ Square Sum Queries:**
   - Define $\text{pref}[i][j]$ as the sum of elements in the subgrid from $(0, 0)$ to $(i - 1, j - 1)$.
   - Recurrence relation:
     $$\text{pref}[i + 1][j + 1] = \text{mat}[i][j] + \text{pref}[i][j + 1] + \text{pref}[i + 1][j] - \text{pref}[i][j]$$
   - Any square of side $k$ with bottom-right corner at $(i, j)$ (1-indexed) has sum:
     $$\text{sum} = \text{pref}[i][j] - \text{pref}[i - k][j] - \text{pref}[i][j - k] + \text{pref}[i - k][j - k]$$

3. **Optimal Greedy Sliding Expansion ($\mathcal{O}(m \cdot n)$):**
   - Instead of binary searching over the side length in $\mathcal{O}(m \cdot n \log(\min(m, n)))$, we can maintain a variable `maxLen` initialized to `0`.
   - As we scan each cell $(i, j)$ in row-major order:
     - We only check whether a square of size `maxLen + 1` ending at $(i, j)$ has a sum $\le \text{threshold}$.
     - If it does, we increment `maxLen++`.
   - **Why this is sufficient:** Because all matrix entries are non-negative, the maximum side length ending at $(i, j)$ cannot exceed the maximum side length found in previous cells by more than $1$. Therefore, we only ever need to test side length `maxLen + 1`.
   - Each cell does at most one sum lookup, yielding optimal $\mathcal{O}(m \cdot n)$ time!

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(m \cdot n)$
  - 2D Prefix Sum precomputation takes $\mathcal{O}(m \cdot n)$ time.
  - The greedy scan evaluates at most one square per cell $(i, j)$ in $\mathcal{O}(1)$ time.
  - Overall time is strictly linear in the number of elements: $\mathcal{O}(m \cdot n) \le 300 \times 300 = 9 \times 10^4$ operations ($\le 3\text{ ms}$).
- **Auxiliary Space Complexity:** $\mathcal{O}(m \cdot n)$ for the $(m + 1) \times (n + 1)$ prefix sum matrix.

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
