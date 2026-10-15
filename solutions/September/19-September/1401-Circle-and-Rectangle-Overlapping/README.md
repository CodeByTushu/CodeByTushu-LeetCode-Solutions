# LeetCode 1401: Circle and Rectangle Overlapping

- **Publication Date:** 19 September 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/circle-and-rectangle-overlapping/](https://leetcode.com/problems/circle-and-rectangle-overlapping/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/t1-1bEsleUw?si=s1gebZKnVh9SHB_r)

---

## Problem Summary

You are given a circle represented as `(radius, xCenter, yCenter)` and an axis-aligned rectangle represented as `(x1, y1, x2, y2)`, where `(x1, y1)` are the coordinates of the bottom-left corner, and `(x2, y2)` are the coordinates of the top-right corner of the rectangle.

Return `true` if the circle and rectangle are overlapped otherwise return `false`. In other words, check if there is **any** point $(x, y)$ that belongs to the circle and the rectangle at the same time.

---

### Examples

#### Example 1:
- **Input:** `radius = 1, xCenter = 0, yCenter = 0, x1 = 1, y1 = -1, x2 = 3, y2 = 1`
- **Output:** `true`
- **Explanation:**
  The circle and rectangle share the point $(1, 0)$.

#### Example 2:
- **Input:** `radius = 1, xCenter = 1, yCenter = 1, x1 = 1, y1 = -3, x2 = 2, y2 = -1`
- **Output:** `false`

#### Example 3:
- **Input:** `radius = 1, xCenter = 0, yCenter = 0, x1 = -1, y1 = 0, x2 = 0, y2 = 1`
- **Output:** `true`

---

### Constraints

- $1 \le \text{radius} \le 2000$
- $-10^4 \le \text{xCenter}, \text{yCenter} \le 10^4$
- $-10^4 \le x_1 < x_2 \le 10^4$
- $-10^4 \le y_1 < y_2 \le 10^4$

---

## Topics and Tags

- **Math**
- **Geometry**

---

## Approach & Intuition

### Key Mathematical Insight:

To determine whether a circle overlaps with an axis-aligned bounding box (AABB) $[x_1, x_2] \times [y_1, y_2]$, we find the point $(x, y)$ inside or on the boundary of the rectangle that is **closest** to the circle's center $(xCenter, yCenter)$.

1. **Clamping onto the Rectangle**:
   Since the rectangle is axis-aligned, the $x$-coordinate and $y$-coordinate of the closest point can be solved independently by clamping:
   $$\text{closestX} = \text{clamp}(xCenter, x_1, x_2) = \max(x_1, \min(x_2, xCenter))$$
   $$\text{closestY} = \text{clamp}(yCenter, y_1, y_2) = \max(y_1, \min(y_2, yCenter))$$

2. **Distance Comparison**:
   The minimum Euclidean distance between the center of the circle and the rectangle is:
   $$d = \sqrt{(xCenter - \text{closestX})^2 + (yCenter - \text{closestY})^2}$$
   
   The circle and rectangle overlap if and only if $d \le \text{radius}$, or equivalently without square roots:
   $$(xCenter - \text{closestX})^2 + (yCenter - \text{closestY})^2 \le \text{radius}^2$$

3. **Efficiency**:
   - Clamping takes constant $\mathcal{O}(1)$ time with no loops or search needed.
   - Using 64-bit integers prevents 32-bit signed overflow when computing squared distances.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(1)$
  - Constant arithmetic operations and clamping comparisons.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Only a few primitive scalar variables are allocated.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
