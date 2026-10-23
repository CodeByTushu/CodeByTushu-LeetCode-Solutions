# LeetCode 2770: Maximum Number of Jumps to Reach the Last Index

- **Publication Date:** 10 May 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/maximum-number-of-jumps-to-reach-the-last-index/](https://leetcode.com/problems/maximum-number-of-jumps-to-reach-the-last-index/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/_yso5k7bkTs)

---

## Problem Summary

You are given a **0-indexed** integer array `nums` of $n$ integers and an integer `target`.

You are initially positioned at index $0$. In one step, you can jump from index $i$ to any index $j$ such that:
- $0 \le i < j < n$
- $-\text{target} \le \text{nums}[j] - \text{nums}[i] \le \text{target}$ (i.e. $|\text{nums}[j] - \text{nums}[i]| \le \text{target}$)

Return the **maximum number of jumps** you can make to reach index $n - 1$.

If there is no way to reach index $n - 1$, return `-1`.

---

### Examples

#### Example 1:
- **Input:** `nums = [1,3,6,4,1,2]`, `target = 2`
- **Output:** `3`
- **Explanation:** 
  To go from index $0$ to index $n - 1$ with the maximum number of jumps, perform the sequence:
  - Jump from index $0$ to index $1$ ($|\text{nums}[1] - \text{nums}[0]| = |3 - 1| = 2 \le 2$).
  - Jump from index $1$ to index $3$ ($|\text{nums}[3] - \text{nums}[1]| = |4 - 3| = 1 \le 2$).
  - Jump from index $3$ to index $5$ ($|\text{nums}[5] - \text{nums}[3]| = |2 - 4| = 2 \le 2$).
  It can be proven that no other jumping sequence reaches index $n - 1$ with more than $3$ jumps. Hence, the answer is $3$.

#### Example 2:
- **Input:** `nums = [1,3,6,4,1,2]`, `target = 3`
- **Output:** `5`
- **Explanation:** 
  One optimal sequence of jumps is $0 \to 1 \to 2 \to 3 \to 4 \to 5$.
  All pairwise differences satisfy $|\text{nums}[j] - \text{nums}[i]| \le 3$. Total jumps $= 5$.

#### Example 3:
- **Input:** `nums = [1,3,6,4,1,2]`, `target = 0`
- **Output:** `-1`
- **Explanation:** 
  With $\text{target} = 0$, you can only jump between indices having identical values. There is no sequence of identical values that connects index $0$ to index $5$. Thus, return `-1`.

---

### Constraints

- $2 \le n == \text{nums.length} \le 1000$
- $-10^9 \le \text{nums}[i] \le 10^9$
- $0 \le \text{target} \le 2 \cdot 10^9$

---

## Topics and Tags

- **Array**
- **Dynamic Programming**

---

## Approach & Intuition

### 1. Directed Acyclic Graph (DAG) Property

Notice the transition rules:
- Jumps can only move forward: $i < j$.
- There are no cycles, making this problem equivalent to finding the **longest path in a Directed Acyclic Graph (DAG)** from source $0$ to sink $n - 1$.
- Because of optimal substructure and overlapping subproblems, **Dynamic Programming** is the optimal approach.

### 2. State Definition & Base Case

Let $\text{dp}[i]$ represent the **maximum number of jumps** required to reach index $i$ starting from index $0$:
- **Base Case:** $\text{dp}[0] = 0$ (starting at index $0$ takes $0$ jumps).
- **Unreachable State:** Initialize $\text{dp}[i] = -1$ for all $1 \le i < n$.

### 3. Transition Function

To compute $\text{dp}[i]$, consider every possible predecessor index $j < i$:
- If index $j$ is reachable ($\text{dp}[j] \ne -1$) and the jump condition is satisfied:
  $$-\text{target} \le \text{nums}[i] - \text{nums}[j] \le \text{target}$$
- Then index $i$ can be reached from $j$ in $\text{dp}[j] + 1$ jumps:
  $$\text{dp}[i] = \max(\text{dp}[i], \text{dp}[j] + 1)$$

*(Note: To prevent integer overflow when taking differences with values up to $10^9$, compute differences using 64-bit integers in typed languages like Java and C++).*

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n^2)$
  - There are $n$ states.
  - Computing each state $\text{dp}[i]$ checks at most $i$ predecessors.
  - Total comparisons: $\frac{n(n - 1)}{2} \approx 5 \times 10^5$ operations for $n \le 1000$, executing in $< 5\text{ ms}$.

- **Auxiliary Space Complexity:** $\mathcal{O}(n)$
  - Stores a 1D DP table of size $n$.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/_yso5k7bkTs](https://youtu.be/_yso5k7bkTs)
