# LeetCode 1266: Minimum Time Visiting All Points

- **Publication Date:** 12 January 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/minimum-time-visiting-all-points/](https://leetcode.com/problems/minimum-time-visiting-all-points/)
- **YouTube Solution:** *Coming Soon* ⏳

---

## Problem Summary

On a 2D plane, there are $n$ points with integer coordinates `points[i] = [xi, yi]`. Return *the **minimum time** in seconds to visit all the points in the order given by `points`*.

You can move according to these rules:
- In 1 second, you can either:
  - move vertically by one unit,
  - move horizontally by one unit, or
  - move diagonally $\sqrt{2}$ units (in other words, move one unit vertically then one unit horizontally in 1 second).
- You have to visit the points in the same order as they appear in the array.
- You are allowed to pass through points that appear later in the order, but these do not count as visits.

---

### Examples

#### Example 1:
- **Input:** `points = [[1,1],[3,4],[-1,0]]`
- **Output:** `7`
- **Explanation:**
  - One optimal path is: `[1,1] -> [2,2] -> [3,3] -> [3,4] -> [2,3] -> [1,2] -> [0,1] -> [-1,0]`
  - Time from `[1,1]` to `[3,4]` = 3 seconds
  - Time from `[3,4]` to `[-1,0]` = 4 seconds
  - Total time = `3 + 4 = 7` seconds

#### Example 2:
- **Input:** `points = [[3,2],[-2,2]]`
- **Output:** `5`

---

### Constraints

- $\text{points.length} == n$
- $1 \le n \le 100$
- $\text{points}[i].\text{length} == 2$
- $-1000 \le \text{points}[i][0], \text{points}[i][1] \le 1000$

---

## Topics and Tags

- **Array**
- **Math**
- **Geometry**

---

## Approach & Intuition

### 1. Chebyshev Distance ($L_\infty$ Metric)

To move between any two consecutive points $(x_1, y_1)$ and $(x_2, y_2)$:
- Let $\Delta x = |x_2 - x_1|$ and $\Delta y = |y_2 - y_1|$.
- Since diagonal moves reduce both horizontal and vertical distances simultaneously by 1 in just 1 second, we should move diagonally as much as possible:
  $$\text{Diagonal moves} = \min(\Delta x, \Delta y)$$
- After matching the shorter component, the remaining distance along the longer component is:
  $$\max(\Delta x, \Delta y) - \min(\Delta x, \Delta y)$$
- Summing these moves together:
  $$\text{Time} = \min(\Delta x, \Delta y) + (\max(\Delta x, \Delta y) - \min(\Delta x, \Delta y)) = \max(\Delta x, \Delta y)$$

This metric is precisely the **Chebyshev distance** ($L_\infty$ distance) between two 2D points.

We simply iterate through the array from $i = 1$ to $n - 1$ and accumulate $\max(|x_i - x_{i-1}|, |y_i - y_{i-1}|)$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$, where $N$ is the number of points in the array. We make a single linear pass over the array of coordinates.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$, as only a few primitive variables are used for distance computation.

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
