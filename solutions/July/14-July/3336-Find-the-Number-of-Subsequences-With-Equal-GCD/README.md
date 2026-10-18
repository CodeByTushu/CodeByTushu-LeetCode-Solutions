# LeetCode 3336: Find the Number of Subsequences With Equal GCD

- **Publication Date:** 14 July 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/find-the-number-of-subsequences-with-equal-gcd/](https://leetcode.com/problems/find-the-number-of-subsequences-with-equal-gcd/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/weuau0mPpt4?si=4tD1xTtwud-elWdk)

---

## Problem Summary

You are given an integer array `nums`.

Your task is to find the number of pairs of **non-empty** subsequences $(\text{seq}_1, \text{seq}_2)$ of `nums` that satisfy the following conditions:
1. The subsequences $\text{seq}_1$ and $\text{seq}_2$ are **disjoint**, meaning no index of `nums` is common between them.
2. The **Greatest Common Divisor (GCD)** of the elements of $\text{seq}_1$ is equal to the GCD of the elements of $\text{seq}_2$.

Return the total number of such pairs modulo $10^9 + 7$.

---

### Examples

#### Example 1:

- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `10`
- **Explanation:** The subsequence pairs which have the GCD of their elements equal to $1$ are:
  - $([1, 2, 3, 4], [1, 2, 3, 4])$ pairings such as $([1], [2])$, $([1], [3])$, $([1], [4])$, $([2], [3])$, $([3], [4])$, $([1, 2], [3])$, $([1, 3], [2])$, $([1, 4], [3])$, $([2, 3], [4])$, $([2], [3, 4])$, etc.

#### Example 2:

- **Input:** `nums = [10, 20, 30]`
- **Output:** `2`
- **Explanation:** The subsequence pairs which have the GCD of their elements equal to $10$ are:
  - $([10], [20, 30])$
  - $([20], [10, 30])$

#### Example 3:

- **Input:** `nums = [1, 1, 1, 1]`
- **Output:** `50`

---

### Constraints

- $1 \le \text{nums.length} \le 200$
- $1 \le \text{nums}[i] \le 200$

---

## Algorithmic Approach

### Dynamic Programming with Dual-GCD State Space

Since $1 \le \text{nums}[i] \le 200$, the GCD of any non-empty subsequence cannot exceed $M = \max(\text{nums}) \le 200$. For each element in `nums`, we have three mutually exclusive choices for forming disjoint subsequences:
1. **Exclude** the element from both $\text{seq}_1$ and $\text{seq}_2$.
2. **Include** the element in $\text{seq}_1$, updating its running GCD.
3. **Include** the element in $\text{seq}_2$, updating its running GCD.

#### DP State Formulation
Let $\text{dp}[g_1][g_2]$ denote the number of valid pairs of disjoint subsequences formed so far such that:
- $g_1$ is the running GCD of $\text{seq}_1$ ($g_1 = 0$ denotes an empty subsequence).
- $g_2$ is the running GCD of $\text{seq}_2$ ($g_2 = 0$ denotes an empty subsequence).

- **Base State:**
  $$\text{dp}[0][0] = 1$$
  All other states initialize to $0$.

#### State Transitions
For each number $x \in \text{nums}$, we construct the next DP state $\text{next\_dp}$ initialized as a copy of $\text{dp}$ (representing the choice of skipping $x$):
For every reachable state $(g_1, g_2)$ where $\text{dp}[g_1][g_2] > 0$:
1. **Option 1 (Skip $x$):**
   Already accounted for by cloning $\text{dp}$.
2. **Option 2 (Add $x$ to $\text{seq}_1$):**
   $$\text{next\_g}_1 = \begin{cases} x & \text{if } g_1 = 0 \\ \gcd(g_1, x) & \text{if } g_1 > 0 \end{cases}$$
   $$\text{next\_dp}[\text{next\_g}_1][g_2] = (\text{next\_dp}[\text{next\_g}_1][g_2] + \text{dp}[g_1][g_2]) \pmod{10^9 + 7}$$
3. **Option 3 (Add $x$ to $\text{seq}_2$):**
   $$\text{next\_g}_2 = \begin{cases} x & \text{if } g_2 = 0 \\ \gcd(g_2, x) & \text{if } g_2 > 0 \end{cases}$$
   $$\text{next\_dp}[g_1][\text{next\_g}_2] = (\text{next\_dp}[g_1][\text{next\_g}_2] + \text{dp}[g_1][g_2]) \pmod{10^9 + 7}$$

#### Final Result
Both subsequences must be non-empty ($g_1 \ge 1$ and $g_2 \ge 1$) and have equal GCD ($g_1 = g_2$).
$$\text{Ans} = \sum_{g=1}^{M} \text{dp}[g][g] \pmod{10^9 + 7}$$

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N \cdot M^2 \log M)$ | $N \le 200$ array iterations across at most $(M + 1)^2$ states ($M \le 200$), with $\gcd$ calculation taking $\mathcal{O}(\log M)$ logarithmic operations. Skipping unreachable states ($\text{dp}[g_1][g_2] == 0$) ensures rapid execution well within $120\text{ ms}$. |
| **Auxiliary Space** | $\mathcal{O}(M^2)$ | The 2D DP array maintains $(M + 1) \times (M + 1) \le 201 \times 201 = 40,401$ elements, consuming minimal memory. |

---

## Multi-Language Implementations

- [Java Solution](./Solution.java)
- [Python Solution](./solution.py)
- [C++ Solution](./solution.cpp)
- [JavaScript Solution](./solution.js)
