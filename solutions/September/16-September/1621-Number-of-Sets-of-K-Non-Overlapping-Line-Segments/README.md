# LeetCode 1621: Number of Sets of K Non-Overlapping Line Segments

- **Publication Date:** 16 September 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/number-of-sets-of-k-non-overlapping-line-segments/](https://leetcode.com/problems/number-of-sets-of-k-non-overlapping-line-segments/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/r9DXMrihTso?si=UcojJ4yjGpvu2EMG)

---

## Problem Summary

Given `n` points on a 1-D plane, where the $i^{\text{th}}$ point (from $0$ to $n-1$) is at $x = i$, find the number of ways we can draw exactly `k` non-overlapping line segments such that each segment covers two or more points.

The endpoints of each segment must have integral coordinates. The `k` line segments do not have to cover all `n` points, and they are allowed to share endpoints.

Return the number of ways we can draw `k` non-overlapping line segments. Since this number can be huge, return it modulo $10^9 + 7$.

---

### Examples

#### Example 1:
- **Input:** `n = 4, k = 2`
- **Output:** `5`
- **Explanation:**
  The 5 different valid segment combinations are:
  - `{(0,2), (2,3)}`
  - `{(0,1), (1,3)}`
  - `{(0,1), (2,3)}`
  - `{(1,2), (2,3)}`
  - `{(0,1), (1,2)}`

#### Example 2:
- **Input:** `n = 3, k = 1`
- **Output:** `3`
- **Explanation:**
  The 3 ways are `{(0,1)}`, `{(0,2)}`, and `{(1,2)}`.

#### Example 3:
- **Input:** `n = 30, k = 7`
- **Output:** `796297179`
- **Explanation:**
  The total number of possible ways is $3,796,297,200$. Taking this modulo $10^9 + 7$ yields $796297179$.

---

### Constraints

- $2 \le n \le 1000$
- $1 \le k \le n - 1$

---

## Topics and Tags

- **Math**
- **Dynamic Programming**
- **Combinatorics**

---

## Approach & Intuition

### Combinatorial Bijection:
1. **Understanding Endpoint Constraints**:
   - We need to choose $k$ line segments defined by endpoints $(s_1, e_1), (s_2, e_2), \dots, (s_k, e_k)$ such that:
     $$0 \le s_1 < e_1 \le s_2 < e_2 \le \dots \le s_k < e_k \le n - 1$$
   - Notice:
     - Within a segment: $s_i < e_i$ (strict inequality, length $\ge 1$).
     - Between consecutive segments: $e_i \le s_{i+1}$ (equality is allowed because segments can share an endpoint).

2. **Coordinate Transformation (Stars and Bars)**:
   - Because adjacent segments are allowed to share endpoints ($e_i = s_{i+1}$), we can conceptually duplicate points that are shared.
   - Specifically, there are $k - 1$ boundaries between the $k$ segments. If we add $k - 1$ extra virtual points to the original $n$ points, we expand the coordinate space to:
     $$\text{Total Points} = n + k - 1$$
   - In this expanded space of $(n + k - 1)$ points, every segment start and end point can now be chosen to be **strictly distinct**!
   - Choosing any $2k$ distinct points from these $(n + k - 1)$ points uniquely forms $k$ non-overlapping segments:
     - Points $1$ and $2$ form segment 1,
     - Points $3$ and $4$ form segment 2,
     - ...,
     - Points $2k-1$ and $2k$ form segment $k$.
   - If in the expanded space two chosen points $2i$ and $2i+1$ are adjacent, they map to the exact same shared endpoint in the original space!

3. **Formula**:
   The problem reduces to computing the binomial coefficient:
   $$\text{Ways} = \binom{n + k - 1}{2k} \pmod{10^9 + 7}$$

4. **Implementation via DP**:
   We compute $\binom{N}{R} \pmod{10^9 + 7}$ using standard Pascal's triangle dynamic programming:
   $$dp[i][j] = (dp[i-1][j-1] + dp[i-1][j]) \pmod{10^9 + 7}$$
   with base case $dp[i][0] = 1$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}((n + k) \cdot k)$
  - Filling the 2D combination DP table of dimensions $(n + k) \times (2k + 1)$ requires $\mathcal{O}((n + k) \cdot k)$ operations.
  - For $n \le 1000$ and $k \le 1000$, this executes in under $25 \text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}((n + k) \cdot k)$
  - Stores the 2D Pascal combination matrix up to $dp[n + k - 1][2k]$.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/r9DXMrihTso?si=UcojJ4yjGpvu2EMG](https://youtu.be/r9DXMrihTso?si=UcojJ4yjGpvu2EMG)

---

## Resources & Community

- 🌐 **Platform Website:** [https://codebytushu.com/](https://codebytushu.com/)
- 💻 **All LeetCode Solutions:** [https://codebytushu.com/Leetcode/](https://codebytushu.com/Leetcode/)
- 📂 **GitHub Repository:** [https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions](https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions)
