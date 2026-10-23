# LeetCode 3742: Maximum Path Score in a Grid

- **Publication Date:** 30 April 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/maximum-path-score-in-a-grid/](https://leetcode.com/problems/maximum-path-score-in-a-grid/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/4AXrIziCErg)

---

## Problem Summary

You are given an $m \times n$ grid where each cell contains one of the values `0`, `1`, or `2`. You are also given an integer `k`.

You start from the top-left corner $(0, 0)$ and want to reach the bottom-right corner $(m - 1, n - 1)$ by moving only **right** or **down**.

Each cell contributes a specific score and incurs an associated cost, according to their cell values:
- `0`: adds `0` to your score and costs `0`.
- `1`: adds `1` to your score and costs `1`.
- `2`: adds `2` to your score and costs `1`.

Return the **maximum score achievable without exceeding a total cost of $k$**, or `-1` if no valid path exists.

> **Note:** If you reach the last cell but the total cost exceeds $k$, the path is invalid.

---

### Examples

#### Example 1:
- **Input:** `grid = [[0, 1], [2, 0]], k = 1`
- **Output:** `2`
- **Explanation:**
  The optimal path is $(0, 0) \to (1, 0) \to (1, 1)$:
  - $(0, 0)$: value $0$, score $+0$, cost $+0$ (Total Score: $0$, Total Cost: $0$)
  - $(1, 0)$: value $2$, score $+2$, cost $+1$ (Total Score: $2$, Total Cost: $1$)
  - $(1, 1)$: value $0$, score $+0$, cost $+0$ (Total Score: $2$, Total Cost: $1$)
  Total cost $1 \le k$, and total score is $2$.

#### Example 2:
- **Input:** `grid = [[0, 1], [1, 2]], k = 1`
- **Output:** `-1`
- **Explanation:** Every path to $(1, 1)$ requires visiting cells whose total cost exceeds $k = 1$. Hence, return `-1`.

---

### Constraints

- $m == \text{grid.length}$
- $n == \text{grid}[i].\text{length}$
- $1 \le m, n \le 200$
- $0 \le k \le 10^3$
- $0 \le \text{grid}[i][j] \le 2$

---

## Topics and Tags

- **Array**
- **Dynamic Programming**
- **Matrix**

---

## Approach & Intuition

### 1. Cost Bound & Effective Horizon
- A path from $(0, 0)$ to $(m - 1, n - 1)$ consists of exactly $(m - 1) + (n - 1) + 1 = m + n - 1$ cells.
- Since each cell incurs a cost of at most $1$, the total cost along any path can never exceed $m + n - 1$.
- Thus, the effective budget is bounded by:
  $$K = \min(k, m + n - 1)$$
  For $m, n \le 200$, $K \le 399$, drastically reducing state space.

### 2. State Definition (2D Rolling DP)
- Let `dp[c][w]` represent the maximum score to reach column $c$ in the current row with total accumulated cost $w \in [0, K]$.
- For each cell $(r, c)$ with value $v = \text{grid}[r][c]$:
  - $\text{cost} = (v == 0 \ ? \ 0 : 1)$
  - $\text{score} = v$
- Transition:
  A cell $(r, c)$ can be reached either from the cell directly above $(r - 1, c)$ or from the cell directly to the left $(r, c - 1)$:
  $$\text{next\_dp}[c][w] = \max\Big(\text{dp}[c][w - \text{cost}], \ \text{next\_dp}[c - 1][w - \text{cost}]\Big) + \text{score}$$
  (for all $w \ge \text{cost}$ where incoming states are valid / $\ge 0$).

### 3. Space Optimization
- Instead of maintaining a 3D table of size $m \times n \times (K + 1)$, we roll the row dimension using two 2D arrays (`dp` and `next_dp`), cutting memory to $\mathcal{O}(n \cdot K) \approx 200 \times 400 \times 4\text{ bytes} \approx 320\text{ KB}$, enabling high L1/L2 cache locality.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(m \cdot n \cdot \min(k, m + n))$
  - $m \times n$ cells, each processing $\min(k, m + n)$ states.
  - Worst case: $200 \times 200 \times 400 \approx 1.6 \times 10^7$ basic operations, executing in under $30\text{ ms}$ in compiled languages.
- **Auxiliary Space Complexity:** $\mathcal{O}(n \cdot \min(k, m + n))$
  - Rolling DP buffer size $2 \times n \times (K + 1)$, well under $1\text{ MB}$.

---
