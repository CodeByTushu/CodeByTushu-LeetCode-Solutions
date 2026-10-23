# LeetCode 2078: Two Furthest Houses With Different Colors

- **Publication Date:** 20 April 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/two-furthest-houses-with-different-colors/](https://leetcode.com/problems/two-furthest-houses-with-different-colors/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/7-NOE1zaS0M)

---

## Problem Summary

There are `n` houses evenly lined up on the street, and each house is painted a certain color. You are given a 0-indexed integer array `colors` of length `n`, where `colors[i]` represents the color of the $i^{\text{th}}$ house.

Return the **maximum distance** between two houses with **different colors**.

The distance between the $i^{\text{th}}$ and $j^{\text{th}}$ houses is $|i - j|$.

---

### Examples

#### Example 1:
- **Input:** `colors = [1,1,1,6,1,1,1]`
- **Output:** `3`
- **Explanation:**
  - House $0$ has color $1$ and House $3$ has color $6$. The distance is $|0 - 3| = 3$.
  - Note that houses $3$ and $6$ also have different colors with distance $|3 - 6| = 3$.

#### Example 2:
- **Input:** `colors = [1,8,3,8,3]`
- **Output:** `4`
- **Explanation:**
  - House $0$ has color $1$ and House $4$ has color $3$. The distance is $|0 - 4| = 4$.

#### Example 3:
- **Input:** `colors = [0,1]`
- **Output:** `1`
- **Explanation:**
  - House $0$ has color $0$ and House $1$ has color $1$. The distance is $|0 - 1| = 1$.

---

### Constraints

- $n == \text{colors.length}$
- $2 \le n \le 100$
- $0 \le \text{colors}[i] \le 100$
- Test data are generated such that at least two houses have different colors.

---

## Topics and Tags

- **Array**
- **Two Pointers**
- **Greedy**

---

## Approach & Intuition

### 1. Greedy Boundary Invariant

To maximize the index distance $|i - j|$ between two houses of different colors:
- The optimal pair of houses must include either the **first house** (`colors[0]`) or the **last house** (`colors[n - 1]`).

**Why?**
- Suppose the optimal pair is $(i, j)$ with $i < j$.
- If $\text{colors}[i] \ne \text{colors}[n - 1]$, then pairing $i$ with $n - 1$ yields a distance of $n - 1 - i \ge j - i$.
- If $\text{colors}[i] == \text{colors}[n - 1]$, then because $\text{colors}[i] \ne \text{colors}[j]$, we must have $\text{colors}[j] \ne \text{colors}[n - 1]$. If $\text{colors}[j] \ne \text{colors}[0]$, pairing $0$ with $j$ gives $j \ge j - i$. If $\text{colors}[j] == \text{colors}[0]$, then $\text{colors}[0] \ne \text{colors}[n - 1]$, which allows pairing $(0, n - 1)$ for the maximum possible distance $n - 1$.

### 2. Single-Pass Evaluation

Iterate through every index $i \in [0, n - 1]$:
1. If $\text{colors}[i] \ne \text{colors}[0]$, record $\text{maxDist} = \max(\text{maxDist}, i)$.
2. If $\text{colors}[i] \ne \text{colors}[n - 1]$, record $\text{maxDist} = \max(\text{maxDist}, n - 1 - i)$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - A single pass of $N \le 100$ elements performs constant-time checks, running in $< 1\text{ ms}$.

- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Only scalar integers are used.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/7-NOE1zaS0M](https://youtu.be/7-NOE1zaS0M)
