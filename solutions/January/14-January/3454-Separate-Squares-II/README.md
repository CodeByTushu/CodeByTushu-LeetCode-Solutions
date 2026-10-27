# LeetCode 3454: Separate Squares II

- **Publication Date:** 14 January 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/separate-squares-ii/](https://leetcode.com/problems/separate-squares-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/JosGtgp4sv4?si=YG8Iz2-ZJbCs24qq)

---

## Problem Summary

You are given a 2D integer array `squares`. Each `squares[i] = [xi, yi, li]` represents the coordinates of the bottom-left point and the side length of a square parallel to the x-axis.

Find the **minimum y-coordinate** value of a horizontal line such that the total area of the squares above the line **equals** the total area of the squares below the line.

Answers within $10^{-5}$ of the actual answer will be accepted.

> [!NOTE]
> Squares may overlap. Overlapping areas should be counted **only once** (i.e., calculate the area of the union of all squares).

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
- **Output:** `1.00000`
- **Explanation:**
  - Since the blue square is completely contained inside the red square, the total area covered by both squares is $4$ square units.
  - The minimum $y$-coordinate that splits the area into two equal parts of $2$ square units is $y = 1$.

---

### Constraints

- $1 \le \text{squares.length} \le 5 \times 10^4$
- $\text{squares}[i] = [x_i, y_i, l_i]$
- $\text{squares}[i].\text{length} == 3$
- $0 \le x_i, y_i \le 10^9$
- $1 \le l_i \le 10^9$
- The total area of all the squares will not exceed $10^{15}$.

---

## Topics and Tags

- **Array**
- **Binary Search**
- **Geometry**
- **Line Sweep**
- **Segment Tree**

---

## Approach & Intuition

### 1. The Challenge vs. Separate Squares I
In **Separate Squares I**, squares could overlap and their overlapping areas were counted multiple times, allowing a straightforward binary search over $y$ in $\mathcal{O}(N)$ per probe. 

In **Separate Squares II**, overlapping areas must be counted **only once**. This is the classic problem of finding the **Area of the Union of Rectangles** (Klee's Measure Problem in 2D), combined with finding the horizontal splitting line.

### 2. 2D Line Sweep with Segment Tree

1. **Y-Axis Events:**
   - Each square $[x_i, y_i, l_i]$ creates two horizontal boundary events:
     - An **Enter Event** at $y = y_i$ with horizontal interval $[x_i, x_i + l_i]$ and delta $+1$.
     - An **Exit Event** at $y = y_i + l_i$ with horizontal interval $[x_i, x_i + l_i]$ and delta $-1$.
   - Sorting all events by $y$-coordinate slices the 2D plane into horizontal strips bounded by consecutive unique $y$-values: $[y_k, y_{k+1}]$.

2. **X-Coordinate Compression & Segment Tree:**
   - Since $x$-coordinates can be up to $2 \times 10^9$, we compress the unique $x$-endpoints into a sorted array $X$ of length $M \le 2N$.
   - We construct a Segment Tree over elementary intervals $[X[j], X[j+1]]$.
   - Each node maintains:
     - `count`: How many active squares fully cover this tree segment.
     - `len`: The total length of $X$-intervals actively covered within this subtree.
   - If `count[node] > 0`, `len[node] = X[end + 1] - X[start]`.
   - If `count[node] == 0`, `len[node] = (isLeaf) ? 0 : len[left] + len[right]`.
   - Because square activations and deactivations are symmetric, standard segment tree updates take $\mathcal{O}(\log M)$ without requiring lazy propagation tags.

3. **Computing Horizontal Strips:**
   - Between two consecutive event heights $y_k$ and $y_{k+1}$, the active horizontal width $W_k = \text{st.query()}$ remains strictly constant.
   - The area of this strip is $\Delta \text{Area}_k = W_k \times (y_{k+1} - y_k)$.
   - We accumulate the total union area:
     $$\text{totalArea} = \sum_{k} \Delta \text{Area}_k$$
   - The desired target area below our dividing line is:
     $$\text{targetArea} = \frac{\text{totalArea}}{2}$$

4. **Finding the Minimum Splitting Line $y$:**
   - We iterate linearly through the recorded strips $[y_k, y_{k+1}]$ while accumulating $\text{currentArea}$.
   - Once $\text{currentArea} + \Delta \text{Area}_k \ge \text{targetArea}$, the dividing line falls precisely within the current strip:
     $$y^* = y_k + \frac{\text{targetArea} - \text{currentArea}}{W_k}$$
   - This exact closed-form linear interpolation inside the strip guarantees $10^{-5}$ precision immediately without binary search iteration!

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N \log N)$
  - Sorting $2N$ events and coordinate compression takes $\mathcal{O}(N \log N)$.
  - Updating the segment tree for each of the $2N$ events takes $\mathcal{O}(\log N)$.
  - The two-pass strip calculation and linear scan take $\mathcal{O}(N)$.
  - Total time: $\mathcal{O}(N \log N)$, running in $\approx 100\text{ ms}$ for $N = 5 \times 10^4$.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - Storing events, compressed coordinates, segment tree arrays ($4M \approx 8N$), and horizontal strips takes $\mathcal{O}(N)$ auxiliary memory.

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
