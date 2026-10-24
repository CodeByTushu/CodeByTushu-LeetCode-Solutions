# LeetCode 3453: Separate Squares I

- **Publication Date:** 13 January 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/separate-squares-I/](https://leetcode.com/problems/separate-squares-i/)
- **YouTube Solution:** *Coming Soon* ⏳

---

## Problem Summary

You are given a 2D integer array `squares`. Each `squares[i] = [xi, yi, li]` represents the coordinates of the bottom-left point and the side length of a square parallel to the x-axis.

Find the **minimum y-coordinate** value of a horizontal line such that the total area of the squares above the line **equals** the total area of the squares below the line.

Answers within $10^{-5}$ of the actual answer will be accepted.

> [!NOTE]
> Squares may overlap. Overlapping areas should be counted multiple times.

---

### Examples

#### Example 1:
- **Input:** `squares = [[0,0,1],[2,2,1]]`
- **Output:** `1.00000`
- **Explanation:**
  - Any horizontal line between $y = 1$ and $y = 2$ will have $1$ square unit above it and $1$ square unit below it.
  - The lowest (minimum) option is $y = 1$.

#### Example 2:
- **Input:** `squares = [[0,0,2],[1,1,1]]`
- **Output:** `1.16667`
- **Explanation:**
  - Area below line $y = 7/6$: $\frac{7}{6} \times 2 \text{ (Red)} + \frac{1}{6} \times 1 \text{ (Blue)} = \frac{15}{6} = 2.5$.
  - Area above line $y = 7/6$: $\frac{5}{6} \times 2 \text{ (Red)} + \frac{5}{6} \times 1 \text{ (Blue)} = \frac{15}{6} = 2.5$.
  - Since both areas are equal, the output is $7/6 \approx 1.16667$.

---

### Constraints

- $1 \le \text{squares.length} \le 5 \times 10^4$
- $\text{squares}[i] = [x_i, y_i, l_i]$
- $\text{squares}[i].\text{length} == 3$
- $0 \le x_i, y_i \le 10^9$
- $1 \le l_i \le 10^9$
- The total area of all the squares will not exceed $10^{12}$.

---

## Topics and Tags

- **Array**
- **Binary Search**
- **Geometry**

---

## Approach & Intuition

### 1. Monotonicity & Binary Search on the Answer

1. **Monotonic Area Function:**
   - As a horizontal line $y$ moves upwards from $0$ to $\max(y_i + l_i)$, the cumulative area of all squares lying below this line is strictly monotonically non-decreasing.
   - The total area of all squares is $\sum l_i^2$, so our target is to find a line $y$ where:
     $$\text{areaBelow}(y) \ge \frac{\text{totalArea}}{2}$$
   - Because the problem asks for the **minimum** $y$-coordinate when a range of $y$ achieves equal areas (as in Example 1), binary search will naturally converge to the smallest valid $y$ when we set `high = mid` whenever `areaBelow(mid) >= targetArea`.

2. **Calculating Area Below $y$:**
   For each square with bottom $y_i$ and side length $l_i$:
   - If $y \le y_i$: area contribution is $0$.
   - If $y \ge y_i + l_i$: the entire square is below, contributing $l_i^2$.
   - If $y_i < y < y_i + l_i$: the portion below has height $h = y - y_i$, contributing $h \times l_i$.
   - Notice the $x$-coordinate does not affect horizontal slice calculations.

3. **Precision & Convergence:**
   - Over a domain $[0, 2 \times 10^9]$, running 80 iterations reduces the search interval to $\frac{2 \times 10^9}{2^{80}} \approx 1.65 \times 10^{-15}$, vastly exceeding the required $10^{-5}$ precision.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(K \times N)$, where $N$ is the number of squares and $K = 80$ is the constant number of binary search iterations. Each iteration performs an $\mathcal{O}(N)$ scan over all squares, requiring $\approx 4 \times 10^6$ operations which runs well within standard runtime limits.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$ auxiliary space as calculations only require primitive floating-point variables.

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
