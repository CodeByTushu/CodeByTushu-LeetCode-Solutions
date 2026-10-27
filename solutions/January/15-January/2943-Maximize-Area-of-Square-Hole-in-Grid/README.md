# LeetCode 2943: Maximize Area of Square Hole in Grid

- **Publication Date:** 15 January 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/maximize-area-of-square-hole-in-grid/](https://leetcode.com/problems/maximize-area-of-square-hole-in-grid/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/iHOr80LJ1zM?si=hC-lb2QD-Z39iXfu)

---

## Problem Summary

You are given two integers `n` and `m`, and two integer arrays `hBars` and `vBars`. The grid has `n + 2` horizontal bars and `m + 2` vertical bars, creating $1 \times 1$ unit cells. The bars are indexed starting from $1$.

You can remove some of the bars in `hBars` from horizontal bars and some of the bars in `vBars` from vertical bars. Note that other bars are fixed and cannot be removed (specifically, boundary bars $1$ and $n + 2$ for horizontal, and $1$ and $m + 2$ for vertical).

Return an integer denoting the **maximum area of a square-shaped hole** in the grid after removing some bars (possibly none).

---

### Examples

#### Example 1:
- **Input:** `n = 2, m = 1, hBars = [2,3], vBars = [2]`
- **Output:** `4`
- **Explanation:**
  - The horizontal bars are `[1, 2, 3, 4]`, and the vertical bars are `[1, 2, 3]`.
  - Removing horizontal bar $2$ and vertical bar $2$ merges cells to form a $2 \times 2$ square hole of area $4$.

#### Example 2:
- **Input:** `n = 1, m = 1, hBars = [2], vBars = [2]`
- **Output:** `4`
- **Explanation:**
  - Removing horizontal bar $2$ and vertical bar $2$ leaves only boundary bars, forming a single $2 \times 2$ square hole of area $4$.

#### Example 3:
- **Input:** `n = 2, m = 3, hBars = [2,3], vBars = [2,4]`
- **Output:** `4`
- **Explanation:**
  - One way to get the maximum square-shaped hole is by removing horizontal bar $3$ and vertical bar $4$.

---

### Constraints

- $1 \le n \le 10^9$
- $1 \le m \le 10^9$
- $1 \le \text{hBars.length} \le 100$
- $2 \le \text{hBars}[i] \le n + 1$
- $1 \le \text{vBars.length} \le 100$
- $2 \le \text{vBars}[i] \le m + 1$
- All values in `hBars` are distinct.
- All values in `vBars` are distinct.

---

## Topics and Tags

- **Array**
- **Sorting**
- **Greedy**

---

## Approach & Intuition

### 1. Understanding Bar Removals & Openings

1. **Adjacent Bars Form $1 \times 1$ Cells:**
   - In the initial grid without removing any bars, adjacent bars are at distance $1$, creating $1 \times 1$ unit cells.
   - If we remove a single bar (e.g., bar $2$), the distance between bar $1$ and bar $3$ becomes $3 - 1 = 2$.
   - If we remove $k$ consecutive bars $x, x + 1, \dots, x + k - 1$, the gap created between bar $x - 1$ and bar $x + k$ has length $(x + k) - (x - 1) = k + 1$.

2. **Why Must Removed Bars Be Strictly Consecutive?**
   - If any bar between two positions is not removed, it remains as an internal partition inside the grid, dividing the space into separate smaller holes.
   - Therefore, to create a contiguous opening of length $L$, we **must** remove $L - 1$ consecutive bars.
   - The maximum continuous height opening we can achieve is $\text{maxConsecutive}(hBars) + 1$.
   - Similarly, the maximum continuous width opening we can achieve is $\text{maxConsecutive}(vBars) + 1$.

3. **Forming a Square Hole:**
   - A hole of dimensions $H \times W$ can accommodate a square of maximum side length:
     $$\text{side} = \min(H, W)$$
   - Since $H = \text{maxGap}_h$ and $W = \text{maxGap}_w$, the maximum possible square area is:
     $$\text{Area} = \text{side}^2 = \left(\min(\text{maxGap}_h, \text{maxGap}_w)\right)^2$$

### 2. Algorithmic Steps

1. Sort `hBars` in non-decreasing order.
2. Find the length of the longest contiguous sequence of numbers with step $1$ (`bars[i] == bars[i - 1] + 1`).
   - The maximum horizontal gap is $\text{maxConsecutive}(hBars) + 1$.
3. Repeat the exact same procedure for `vBars` to obtain $\text{maxConsecutive}(vBars) + 1$.
4. Take $\text{side} = \min(\text{maxGap}_h, \text{maxGap}_w)$ and return $\text{side} \times \text{side}$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(H \log H + V \log V)$, where $H = \text{hBars.length}$ and $V = \text{vBars.length}$.
  - Given $H, V \le 100$, sorting requires at most $\approx 100 \log_2(100) \approx 700$ operations, executing in under $1\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$ (or $\mathcal{O}(\log H + \log V)$ for the in-place sorting call stack), requiring no additional heap allocations.

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
