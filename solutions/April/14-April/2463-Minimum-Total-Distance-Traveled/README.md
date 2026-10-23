# LeetCode 2463: Minimum Total Distance Traveled

- **Publication Date:** 14 April 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/minimum-total-distance-traveled/](https://leetcode.com/problems/minimum-total-distance-traveled/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/9sSTzYIWQ50)

---

## Problem Summary

There are robots and factories located on the X-axis. You are given:
- An integer array `robot` where `robot[i]` is the position of the $i^{\text{th}}$ robot.
- A 2D integer array `factory` where `factory[j] = [position_j, limit_j]` indicates that factory $j$ is at `position_j` and can repair at most `limit_j` robots.

All robots are broken and move in one direction (left or right). When a robot reaches a factory that has not yet reached its limit, the factory repairs the robot and it stops moving.

At any moment, you can choose the initial direction of movement for each robot to minimize the total distance traveled by all robots.

Return the **minimum total distance** traveled by all robots.

---

### Examples

#### Example 1:
- **Input:** `robot = [0, 4, 6]`, `factory = [[2, 2], [6, 2]]`
- **Output:** `4`
- **Explanation:**
  - Robot at position $0$ goes to factory at $2$: distance $|2 - 0| = 2$.
  - Robot at position $4$ goes to factory at $2$: distance $|2 - 4| = 2$.
  - Robot at position $6$ goes to factory at $6$: distance $|6 - 6| = 0$.
  - Total distance $= 2 + 2 + 0 = 4$.

#### Example 2:
- **Input:** `robot = [1, -1]`, `factory = [[-2, 1], [2, 1]]`
- **Output:** `2`
- **Explanation:**
  - Robot at position $-1$ goes to factory at $-2$: distance $|-2 - (-1)| = 1$.
  - Robot at position $1$ goes to factory at $2$: distance $|2 - 1| = 1$.
  - Total distance $= 1 + 1 = 2$.

---

### Constraints

- $1 \le \text{robot.length} \le 100$
- $1 \le \text{factory.length} \le 100$
- $\text{factory}[j]\text{.length} == 2$
- $-10^9 \le \text{robot}[i], \text{position}_j \le 10^9$
- $0 \le \text{limit}_j \le \text{robot.length}$
- The input is generated such that it is always possible to repair all robots.

---

## Topics and Tags

- **Array**
- **Dynamic Programming**
- **Sorting**

---

## Approach & Intuition

### 1. Non-Crossing Property & Sorting

A fundamental geometric property on a 1D line is that optimal assignment paths between robots and factories do not cross. Specifically, if robot $A$ is to the left of robot $B$, then the factory assigned to $A$ should be at or to the left of the factory assigned to $B$:
$$|x_A - F_1| + |x_B - F_2| \le |x_A - F_2| + |x_B - F_1| \quad \text{for } x_A < x_B \text{ and } F_1 < F_2$$

Therefore, we can sort both `robot` and `factory` in non-decreasing order of their positions. Under this sorted order, each factory repairs a **contiguous subarray** of robots.

### 2. Dynamic Programming Formulation

Let $\text{dp}[i]$ be the minimum total distance to repair the first $i$ robots:
- Base Case: $\text{dp}[0] = 0$, and $\text{dp}[i] = \infty$ for $i > 0$.
- For each factory $j$ at position $P$ with capacity $L$:
  - We can choose to repair $k$ robots with factory $j$, where $0 \le k \le \min(i, L)$.
  - These $k$ robots will be the suffix of the first $i$ robots (i.e. indices $i - k$ through $i - 1$).
  - Transition:
    $$\text{nextDp}[i] = \min_{0 \le k \le \min(i, L)} \left(\text{dp}[i - k] + \sum_{r = i - k}^{i - 1} |robot[r] - P|\right)$$

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N \log N + M \log M + N \cdot M \cdot \min(N, L))$
  - Sorting takes $\mathcal{O}(N \log N + M \log M)$ time.
  - The DP transitions iterate over $M$ factories, $N$ robots, and up to $N$ choices per state.
  - Overall operations $\le 100 \times 100 \times 100 = 10^6$, executing in $\approx 5\text{ ms}$.

- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - Using rolling 1D arrays of size $N + 1$ requires negligible memory ($\approx \text{a few KB}$).

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/9sSTzYIWQ50](https://youtu.be/9sSTzYIWQ50)
