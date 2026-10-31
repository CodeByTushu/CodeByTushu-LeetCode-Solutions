# LeetCode 3637: Trionic Array I

- **Publication Date:** 03 February 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/trionic-array-i/](https://leetcode.com/problems/trionic-array-i/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/vY-MXcxkmME?si=gkg7UOpqrHuMgZmX)

---

## Problem Summary

You are given an integer array `nums` of length `n`.

An array is **trionic** if there exist indices $0 < p < q < n - 1$ such that:
- `nums[0...p]` is **strictly increasing**,
- `nums[p...q]` is **strictly decreasing**,
- `nums[q...n - 1]` is **strictly increasing**.

Return `true` if `nums` is trionic, otherwise return `false`.

---

### Examples

#### Example 1:
- **Input:** `nums = [1, 3, 5, 4, 2, 6]`
- **Output:** `true`
- **Explanation:**
  Pick $p = 2, q = 4$:
  - `nums[0...2] = [1, 3, 5]` is strictly increasing ($1 < 3 < 5$).
  - `nums[2...4] = [5, 4, 2]` is strictly decreasing ($5 > 4 > 2$).
  - `nums[4...5] = [2, 6]` is strictly increasing ($2 < 6$).

#### Example 2:
- **Input:** `nums = [2, 1, 3]`
- **Output:** `false`
- **Explanation:**
  There is no way to pick $p$ and $q$ to form the required three segments because $n = 3$, and we require $0 < p < q < n - 1$ (which implies $n \ge 4$).

---

### Constraints

- $3 \le n \le 100$
- $-1000 \le \text{nums}[i] \le 1000$

---

## Topics and Tags

- **Array**
- **Two Pointers**
- **Simulation**

---

## Approach & Intuition

### 1. Three-Phase Linear Scanning

1. **Size Requirement:**
   - To have valid integer indices satisfying $0 < p < q < n - 1$, the array must contain at least four elements ($n \ge 4$). If $n < 4$, return `false` immediately.

2. **Phase 1: Strictly Increasing Ascent (Finding Peak $p$):**
   - Starting from index $0$, advance pointer $i$ as long as $i + 1 < n$ and $\text{nums}[i] < \text{nums}[i + 1]$.
   - Let $p = i$ be the detected peak.
   - For a valid trionic array, $p$ must be strictly greater than $0$ (the increasing segment cannot be empty) and strictly less than $n - 2$ (at least two elements must remain to form the decreasing and subsequent increasing segments). If $p == 0$ or $p \ge n - 2$, return `false`.

3. **Phase 2: Strictly Decreasing Descent (Finding Valley $q$):**
   - From $p$, advance pointer $i$ as long as $i + 1 < n$ and $\text{nums}[i] > \text{nums}[i + 1]$.
   - Let $q = i$ be the detected valley.
   - For a valid descent, $q > p$ (at least one decreasing step) and $q < n - 1$ (at least one element must remain for the final ascent). If $q == p$ or $q \ge n - 1$, return `false`.

4. **Phase 3: Final Strictly Increasing Ascent:**
   - From $q$, advance pointer $i$ as long as $i + 1 < n$ and $\text{nums}[i] < \text{nums}[i + 1]$.
   - The array is trionic if and only if this final ascent reaches the last element ($i == n - 1$).

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$, where $n$ is the length of `nums`. The single pointer traverses the array from left to right exactly once, inspecting each adjacent pair in constant $\mathcal{O}(1)$ time.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$. Only a few scalar pointer variables are used, requiring strictly constant extra space.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [Watch Video on YouTube](https://youtu.be/vY-MXcxkmME?si=gkg7UOpqrHuMgZmX)
