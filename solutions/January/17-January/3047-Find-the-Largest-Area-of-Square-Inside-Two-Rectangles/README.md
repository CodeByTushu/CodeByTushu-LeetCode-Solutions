# LeetCode 3047: Find the Largest Area of Square Inside Two Rectangles

- **Publication Date:** 17 January 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/find-the-largest-area-of-square-inside-two-rectangles/](https://leetcode.com/problems/find-the-largest-area-of-square-inside-two-rectangles/)
- **YouTube Solution:** *Coming Soon* ⏳

---

## Problem Summary

There exist $n$ rectangles in a 2D plane with edges parallel to the x and y axes. You are given two 2D integer arrays `bottomLeft` and `topRight` where `bottomLeft[i] = [a_i, b_i]` and `topRight[i] = [c_i, d_i]` represent the bottom-left and top-right coordinates of the $i^{\text{th}}$ rectangle, respectively.

You need to find the **maximum area of a square** that can fit inside the intersecting region of **at least two rectangles**. Return `0` if such a square does not exist.

---

### Examples

#### Example 1:
- **Input:** `bottomLeft = [[1,1],[2,2],[3,1]], topRight = [[3,3],[4,4],[6,6]]`
- **Output:** `1`
- **Explanation:**
  - A square with side length $1$ can fit inside either the intersecting region of rectangles $0$ and $1$ (intersection $[2, 3] \times [2, 3]$) or rectangles $1$ and $2$ (intersection $[3, 4] \times [2, 4]$).
  - Hence, the maximum area is $1$.

#### Example 2:
- **Input:** `bottomLeft = [[1,1],[1,3],[1,5]], topRight = [[5,5],[5,7],[5,9]]`
- **Output:** `4`
- **Explanation:**
  - Rectangles $0$ and $1$ intersect at $[1, 5] \times [3, 5]$, which has width $4$ and height $2$. The maximum square fitting inside has side length $\min(4, 2) = 2$ and area $2 \times 2 = 4$.

#### Example 3:
- **Input:** `bottomLeft = [[1,1],[2,2],[1,2]], topRight = [[3,3],[4,4],[3,4]]`
- **Output:** `1`
- **Explanation:**
  - A square of side length $1$ fits inside any pair's intersection. No larger square can fit.

#### Example 4:
- **Input:** `bottomLeft = [[1,1],[3,3],[3,1]], topRight = [[2,2],[4,4],[4,2]]`
- **Output:** `0`
- **Explanation:**
  - No pair of rectangles intersect, so no square can fit inside the intersection of at least two rectangles.

---

### Constraints

- $n == \text{bottomLeft.length} == \text{topRight.length}$
- $2 \le n \le 10^3$
- $\text{bottomLeft}[i].\text{length} == \text{topRight}[i].\text{length} == 2$
- $1 \le \text{bottomLeft}[i][0], \text{bottomLeft}[i][1] \le 10^7$
- $1 \le \text{topRight}[i][0], \text{topRight}[i][1] \le 10^7$
- $\text{bottomLeft}[i][0] < \text{topRight}[i][0]$
- $\text{bottomLeft}[i][1] < \text{topRight}[i][1]$

---

## Topics and Tags

- **Array**
- **Math**
- **Geometry**

---

## Approach & Intuition

### 1. Pairwise Rectangle Intersection

1. **Intersection of Two Axis-Aligned Rectangles:**
   - Consider rectangle $i$ bounded by $[a_i, c_i] \times [b_i, d_i]$ and rectangle $j$ bounded by $[a_j, c_j] \times [b_j, d_j]$.
   - Their overlapping region along the x-axis is $[\max(a_i, a_j), \min(c_i, c_j)]$.
   - Their overlapping region along the y-axis is $[\max(b_i, b_j), \min(d_i, d_j)]$.
   - The width of intersection is:
     $$W = \max(a_i, a_j) < \min(c_i, c_j) \implies \min(c_i, c_j) - \max(a_i, a_j)$$
   - The height of intersection is:
     $$H = \max(b_i, b_j) < \min(d_i, d_j) \implies \min(d_i, d_j) - \max(b_i, b_j)$$
   - If either $W \le 0$ or $H \le 0$, the two rectangles do not intersect.

2. **Maximum Square Fitting Inside an Intersection:**
   - Any rectangle of dimensions $W \times H$ can accommodate an axis-aligned square of maximum side length:
     $$\text{side} = \min(W, H)$$
   - The resulting square area is $\text{side}^2$.

3. **Why Checking Pairs Suffices:**
   - Any square that fits inside the intersection of $k \ge 2$ rectangles also fits inside the intersection of any pair of them.
   - Therefore, the global maximum square area inside *at least two* rectangles is simply the maximum square area over all $\binom{n}{2}$ pairs.

### 2. Algorithmic Steps

1. Initialize `maxSide = 0`.
2. Iterate through all pairs $(i, j)$ with $0 \le i < j < n$:
   - Compute overlapping width $W = \min(\text{topRight}[i][0], \text{topRight}[j][0]) - \max(\text{bottomLeft}[i][0], \text{bottomLeft}[j][0])$.
   - Compute overlapping height $H = \min(\text{topRight}[i][1], \text{topRight}[j][1]) - \max(\text{bottomLeft}[i][1], \text{bottomLeft}[j][1])$.
   - If $W > 0$ and $H > 0$, candidate side is $\min(W, H)$.
   - Update `maxSide = max(maxSide, min(W, H))`.
3. Return `maxSide * maxSide` as a 64-bit integer (`long` in Java/C++).

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n^2)$
  - With $n \le 1000$, the number of pairs is $\frac{n(n - 1)}{2} \le 5 \times 10^5$.
  - Each pair check takes $\mathcal{O}(1)$ basic arithmetic operations.
  - Overall runtime is $\approx 10\text{ ms}$, effortlessly within limits.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$ auxiliary memory since we only track primitive coordinates and the running maximum.

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
