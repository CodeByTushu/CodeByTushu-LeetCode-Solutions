# LeetCode 3464: Maximize the Distance Between Points on a Square

- **Publication Date:** 25 April 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/maximize-the-distance-between-points-on-a-square/](https://leetcode.com/problems/maximize-the-distance-between-points-on-a-square/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/r3W_ocFnzxw)

---

## Problem Summary

You are given an integer `side`, representing the edge length of a square with corners at `(0, 0)`, `(0, side)`, `(side, 0)`, and `(side, side)` on a Cartesian plane.

You are also given a positive integer `k` and a 2D integer array `points`, where `points[i] = [xi, yi]` represents the coordinate of a point lying on the **boundary** of the square.

You need to select `k` elements among `points` such that the **minimum Manhattan distance** between any two selected points is **maximized**.

Return *the **maximum possible minimum Manhattan distance** between the selected `k` points*.

The **Manhattan Distance** between two cells $(x_i, y_i)$ and $(x_j, y_j)$ is $|x_i - x_j| + |y_i - y_j|$.

---

### Examples

#### Example 1:
- **Input:** `side = 2, points = [[0,2],[2,0],[2,2],[0,0]], k = 4`
- **Output:** `2`
- **Explanation:**
  - Selecting all four corner points `(0, 2)`, `(2, 0)`, `(2, 2)`, and `(0, 0)` gives pairwise Manhattan distances of at least $2$.

#### Example 2:
- **Input:** `side = 2, points = [[0,0],[1,2],[2,0],[2,2],[2,1]], k = 4`
- **Output:** `1`
- **Explanation:**
  - We can select `(0, 0)`, `(2, 0)`, `(2, 2)`, and `(2, 1)`. The minimum Manhattan distance among them is $1$.

#### Example 3:
- **Input:** `side = 2, points = [[0,0],[0,1],[0,2],[1,2],[2,0],[2,2],[2,1]], k = 5`
- **Output:** `1`

---

### Constraints

- $1 \le \text{side} \le 10^9$
- $4 \le \text{points.length} \le \min(4 \times \text{side}, 1.5 \times 10^4)$
- $\text{points}[i] = [x_i, y_i]$
- $4 \le k \le \min(25, \text{points.length})$
- Points are guaranteed to lie on the boundary of the square.
- All points are pairwise distinct.

---

## Topics and Tags

- **Array**
- **Binary Search**
- **Geometry**
- **Greedy**

---

## Approach & Intuition

### 1. Perimeter Unrolling (1D Transformation)

All points lie strictly on the boundary of a square of side length `side`. The boundary is a closed 1D loop of perimeter $P = 4 \times \text{side}$.
We can map each 2D point $(x, y)$ onto a continuous 1D coordinate along the perimeter starting at $(0, 0)$:
- **Left Edge** ($x = 0$): $\text{dist} = y$
- **Top Edge** ($y = \text{side}$): $\text{dist} = \text{side} + x$
- **Right Edge** ($x = \text{side}$): $\text{dist} = 3 \times \text{side} - y$
- **Bottom Edge** ($y = 0$): $\text{dist} = 4 \times \text{side} - x$

### 2. Manhattan Distance on Square Boundary

Because $k \ge 4$, the maximum possible minimum distance between any $k$ points on the square cannot exceed $\text{side}$.
Crucially:
- For points on the **same edge** or **adjacent edges**, the Manhattan distance is exactly identical to the arc distance along the perimeter.
- For points on **opposite edges**, the Manhattan distance is at least $\text{side} \ge d$, automatically satisfying any distance threshold $d \le \text{side}$.

Therefore, enforcing a perimeter distance $\ge d$ between consecutive points along the circular order is **necessary and sufficient** to guarantee all pairwise Manhattan distances are $\ge d$.

### 3. Binary Search on Answer + Greedy Circle Check

1. **Binary Search Range:** Since $k \ge 4$, the optimal answer $d \in [1, \text{side}]$.
2. **Circular Wrapping:** Duplicate the sorted 1D array into `arrExt` of length $2N$ where $\text{arrExt}[i + N] = \text{arr}[i] + P$.
3. **Greedy Check:** For each candidate distance $d$:
   - For each potential starting point $i \in [0, N - 1]$, greedily jump $k - 1$ times to the earliest next point with coordinate $\ge \text{curr} + d$ using binary search (`lower_bound`).
   - If $k$ points can be selected such that the wrap-around distance from the $k^{\text{th}}$ point back to the $1^{\text{st}}$ point is also $\ge d$ (i.e. $\text{arr}[i] + P - \text{curr} \ge d$), then distance $d$ is achievable.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N \log N + N \cdot k \log N \cdot \log(\text{side}))$
  - Sorting $N$ points takes $\mathcal{O}(N \log N)$.
  - Binary search performs $\log_2(\text{side}) \approx 30$ iterations.
  - In each iteration, testing $N$ starting points with $k$ binary searches takes $\mathcal{O}(N \cdot k \log N)$.
  - Given $N \le 1.5 \times 10^4$ and $k \le 25$, it runs in $\approx 25\text{ ms}$ (C++/Java) and $\approx 160\text{ ms}$ (JS/Python).

- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - To store the 1D perimeter coordinates and the doubled circular array of length $2N$.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/r3W_ocFnzxw](https://youtu.be/r3W_ocFnzxw)
