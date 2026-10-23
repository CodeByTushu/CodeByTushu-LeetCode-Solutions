# LeetCode 1871: Jump Game VII

- **Publication Date:** 25 May 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/jump-game-vii/](https://leetcode.com/problems/jump-game-vii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/0yW-QLH0Lhs)

---

## Problem Summary

You are given a 0-indexed binary string `s` and two integers `minJump` and `maxJump`. In the beginning, you are standing at index `0`, which is equal to `'0'`. You can move from index `i` to index `j` if the following conditions are fulfilled:
- $i + \text{minJump} \le j \le \min(i + \text{maxJump}, s.\text{length} - 1)$, and
- $s[j] == \text{'0'}$.

Return `true` if you can reach index $s.\text{length} - 1$ in `s`, or `false` otherwise.

---

### Examples

#### Example 1:
- **Input:** `s = "011010"`, `minJump = 2`, `maxJump = 3`
- **Output:** `true`
- **Explanation:**
  - In the first step, move from index 0 to index 3 ($0 + 3 = 3$).
  - In the second step, move from index 3 to index 5 ($3 + 2 = 5$).

#### Example 2:
- **Input:** `s = "01101110"`, `minJump = 2`, `maxJump = 3`
- **Output:** `false`
- **Explanation:**
  - All reachable indices in subsequent steps contain `'1'` or are blocked from landing on the last index.

---

### Constraints

- $2 \le s.\text{length} \le 10^5$
- $s[i]$ is either `'0'` or `'1'`
- $s[0] == \text{'0'}$
- $1 \le \text{minJump} \le \text{maxJump} < s.\text{length}$

---

## Topics and Tags

- **String**
- **Dynamic Programming**
- **Sliding Window**
- **Prefix Sum**

---

## Approach & Intuition

### 1. Dynamic Programming Formulation

Let $\text{dp}[i]$ be `true` if index $i$ is reachable from $0$, and `false` otherwise:
- Base case: $\text{dp}[0] = \text{true}$.
- For any index $i \ge 1$ where $s[i] == \text{'0'}$, index $i$ is reachable if and only if there exists some reachable index $j$ such that:
  $$i - \text{maxJump} \le j \le i - \text{minJump} \quad \text{and} \quad \text{dp}[j] == \text{true}$$

A naive check of this range for every $i$ takes $\mathcal{O}((\text{maxJump} - \text{minJump}) \cdot N) = \mathcal{O}(N^2)$ time, which will result in Time Limit Exceeded (TLE) for $N = 10^5$.

### 2. Sliding Window / Prefix Count Optimization ($\mathcal{O}(N)$)

Notice that as $i$ increments by $1$, the valid source range $[i - \text{maxJump}, i - \text{minJump}]$ shifts to the right by $1$. This is a canonical **sliding window**:
- Maintain `reachableInWindow`: the count of indices $j$ currently in $[i - \text{maxJump}, i - \text{minJump}]$ where $\text{dp}[j] == \text{true}$.
- As $i$ increases:
  - The new candidate index entering the right boundary of the window is $i - \text{minJump}$. If $i - \text{minJump} \ge 0$ and $\text{dp}[i - \text{minJump}] == \text{true}$, increment `reachableInWindow++`.
  - The obsolete index exiting the left boundary is $i - \text{maxJump} - 1$. If $i - \text{maxJump} - 1 \ge 0$ and $\text{dp}[i - \text{maxJump} - 1] == \text{true}$, decrement `reachableInWindow--`.
- If $s[i] == \text{'0'}$ and `reachableInWindow > 0`, then $\text{dp}[i] = \text{true}$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - We iterate through the string of length $N = 10^5$ exactly once.
  - At each index $i$, window updates and checks run in $\mathcal{O}(1)$ time.
  - Overall time: $\approx 10^5$ operations ($\approx 4\text{ ms}$).

- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - A boolean array `dp` of size $N$ to store reachability state.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/0yW-QLH0Lhs](https://youtu.be/0yW-QLH0Lhs)
