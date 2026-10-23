# LeetCode 3161: Block Placement Queries

- **Publication Date:** 30 May 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/block-placement-queries/](https://leetcode.com/problems/block-placement-queries/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/VDU2vUoHUzE)

---

## Problem Summary

There exists an infinite number line with its origin at $0$, extending towards the positive x-axis.

You are given a 2D array `queries`, containing two types of queries:
1. `queries[i] = [1, x]`: Build an obstacle at distance $x$ from the origin. It is guaranteed that there is no obstacle at distance $x$ when asked.
2. `queries[i] = [2, x, sz]`: Check if it is possible to place a block of size $sz$ anywhere in the range $[0, x]$ on the line such that the block lies entirely within $[0, x]$. A block cannot intersect with any obstacle, but it may touch it. Queries are independent (the block is not actually placed).

Return a boolean array `results`, where `results[i]` is `true` if you can place the block for the $i^{\text{th}}$ query of type 2, and `false` otherwise.

---

### Examples

#### Example 1:
- **Input:** `queries = [[1,2],[2,3,3],[2,3,1],[2,2,2]]`
- **Output:** `[false, true, true]`
- **Explanation:**
  - Query 0: Place an obstacle at $x = 2$.
  - Query 1: Range $[0, 3]$ is broken by the obstacle at $2$ into intervals $[0, 2]$ (length 2) and $[2, 3]$ (length 1). Maximum continuous block size is $2 < 3$, so `false`.
  - Query 2: Range $[0, 3]$ has max continuous size $2 \ge 1$, so `true`.
  - Query 3: Range $[0, 2]$ has continuous size $2 \ge 2$, so `true`.

#### Example 2:
- **Input:** `queries = [[1,7],[2,7,6],[1,2],[2,7,5],[2,7,6]]`
- **Output:** `[true, true, false]`
- **Explanation:**
  - Place obstacle at $x = 7$. In $[0, 7]$, continuous interval is of length 7 ($7 \ge 6 \rightarrow$ `true`).
  - Place obstacle at $x = 2$. Intervals are $[0, 2]$ (length 2) and $[2, 7]$ (length 5).
  - Size 5 fits in $[2, 7]$ ($5 \ge 5 \rightarrow$ `true`).
  - Size 6 cannot fit because the maximum gap is now 5 ($5 < 6 \rightarrow$ `false`).

---

### Constraints

- $1 \le \text{queries.length} \le 1.5 \times 10^5$
- $2 \le \text{queries}[i]\text{.length} \le 3$
- $1 \le \text{queries}[i][0] \le 2$
- $1 \le x, sz \le \min(5 \times 10^4, 3 \times \text{queries.length})$
- For queries of type 1, no obstacle exists at distance $x$ when asked.
- There is at least one query of type 2.

---

## Topics and Tags

- **Array**
- **Binary Search**
- **Segment Tree**
- **Binary Indexed Tree**

---

## Approach & Intuition

### 1. Gap Decomposition & Segment Tree Formulation

Every obstacle placed at position $p$ terminates a contiguous gap of length:
$$\text{val}[p] = p - \text{prev}(p)$$
where $\text{prev}(p)$ is the immediate obstacle preceding $p$ (with $0$ acting as a permanent initial boundary obstacle).

When querying if a block of size $sz$ can fit in $[0, x]$:
- Let $p$ be the largest obstacle such that $p \le x$.
- Any gap completely to the left of $p$ has length $\text{val}[o_i]$ for some obstacle $o_i \le x$.
- The tail gap between $p$ and $x$ has length $x - p$.
- Thus, the maximum gap in $[0, x]$ is simply:
  $$\max\left(\max_{o_i \le x} \text{val}[o_i], \ x - p\right)$$

If this maximum gap $\ge sz$, the answer is `true`; otherwise `false`.

### 2. Segment Tree Dynamic Maintenance ($\mathcal{O}(\log M)$ per Query)

Since $\max(x) \le 50,000$, we can maintain a Segment Tree over coordinates $[0, M]$ where each node tracks:
1. `treeMax`: the maximum $\text{val}$ in the subtree's interval.
2. `treeHas`: whether the interval contains at least one obstacle.

Using the segment tree:
- **Predecessor / Successor queries:** Traversed directly on `treeHas` in $\mathcal{O}(\log M)$ time without any external libraries.
- **Insert obstacle at $x$ (Type 1):**
  - Find $\text{prev} = \text{findPrev}(0, x - 1)$ and $\text{next} = \text{findNext}(x + 1, M - 1)$.
  - Set $\text{val}[x] = x - \text{prev}$.
  - If $\text{next} \ne -1$, update $\text{val}[\text{next}] = \text{next} - x$.
- **Check range $[0, x]$ (Type 2):**
  - Find $\text{prev} = \text{findPrev}(0, x)$.
  - Query maximum interval $\text{maxBefore} = \text{queryMax}(0, x)$.
  - Result is $(\max(\text{maxBefore}, x - \text{prev}) \ge sz)$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(Q \log M)$
  - With $M \le 50,001$ and $Q \le 1.5 \times 10^5$, $\log_2(M) \approx 16$.
  - Each query performs at most two segment tree point updates or range queries, resulting in $\approx 32$ operations per query.
  - Total runtime is well under $80\text{ ms}$.

- **Auxiliary Space Complexity:** $\mathcal{O}(M)$
  - The Segment Tree requires $4 \times 50000 \approx 200,000$ elements, requiring $\approx 1\text{ MB}$ of memory.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/VDU2vUoHUzE](https://youtu.be/VDU2vUoHUzE)
