# LeetCode 396: Rotate Function

- **Publication Date:** 01 May 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/rotate-function/](https://leetcode.com/problems/rotate-function/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/NMoBBr39jtI)

---

## Problem Summary

You are given an integer array `nums` of length `n`.

Assume $\text{arr}_k$ to be an array obtained by rotating `nums` by $k$ positions clockwise. We define the rotation function $F$ on `nums` as follows:

$$F(k) = 0 \times \text{arr}_k[0] + 1 \times \text{arr}_k[1] + \dots + (n - 1) \times \text{arr}_k[n - 1]$$

Return the **maximum value** of $F(0), F(1), \dots, F(n - 1)$.

The test cases are generated so that the answer fits in a **32-bit integer**.

---

### Examples

#### Example 1:
- **Input:** `nums = [4, 3, 2, 6]`
- **Output:** `26`
- **Explanation:**
  - $F(0) = (0 \times 4) + (1 \times 3) + (2 \times 2) + (3 \times 6) = 0 + 3 + 4 + 18 = 25$
  - $F(1) = (0 \times 6) + (1 \times 4) + (2 \times 3) + (3 \times 2) = 0 + 4 + 6 + 6 = 16$
  - $F(2) = (0 \times 2) + (1 \times 6) + (2 \times 4) + (3 \times 3) = 0 + 6 + 8 + 9 = 23$
  - $F(3) = (0 \times 3) + (1 \times 2) + (2 \times 6) + (3 \times 4) = 0 + 2 + 12 + 12 = 26$
  - So the maximum value of $F(0), F(1), F(2), F(3)$ is $F(3) = 26$.

#### Example 2:
- **Input:** `nums = [100]`
- **Output:** `0`
- **Explanation:**
  - $F(0) = (0 \times 100) = 0$.

---

### Constraints

- $n == \text{nums.length}$
- $1 \le n \le 10^5$
- $-100 \le \text{nums}[i] \le 100$

---

## Topics and Tags

- **Array**
- **Math**
- **Dynamic Programming**

---

## Approach & Intuition

### 1. Mathematical Transition Between Rotations

Calculating each $F(k)$ independently by simulating rotation would take $\mathcal{O}(n)$ time per rotation, leading to an overall time complexity of $\mathcal{O}(n^2)$, which is too slow for $n = 10^5$. We can optimize this by finding a mathematical relation between $F(k)$ and $F(k - 1)$.

Let $S$ denote the total sum of all elements in `nums`:
$$S = \sum_{i=0}^{n-1} \text{nums}[i]$$

Let's inspect the transition from $F(0)$ to $F(1)$ with $\text{nums} = [a_0, a_1, a_2, \dots, a_{n-1}]$:
- $F(0) = 0 \cdot a_0 + 1 \cdot a_1 + 2 \cdot a_2 + \dots + (n - 1) \cdot a_{n-1}$
- After 1 clockwise rotation, $a_{n-1}$ wraps around to index $0$:
  $$\text{arr}_1 = [a_{n-1}, a_0, a_1, \dots, a_{n-2}]$$
- $F(1) = 0 \cdot a_{n-1} + 1 \cdot a_0 + 2 \cdot a_1 + \dots + (n - 1) \cdot a_{n-2}$

Subtracting $F(0)$ from $F(1)$:
$$F(1) - F(0) = a_0 + a_1 + a_2 + \dots + a_{n-2} - (n - 1) \cdot a_{n-1}$$
Notice that $a_0 + a_1 + \dots + a_{n-2} = S - a_{n-1}$. Substituting this in:
$$F(1) - F(0) = (S - a_{n-1}) - (n - 1) \cdot a_{n-1} = S - n \cdot a_{n-1}$$
Therefore:
$$F(1) = F(0) + S - n \cdot a_{n-1}$$

### 2. General Recurrence Formula

For any step $k$ ($1 \le k < n$):
The element that was at the last position in step $k - 1$ is $\text{nums}[n - k]$. In step $k$, its coefficient drops from $(n - 1)$ to $0$, while every other element's coefficient increments by $1$:
$$F(k) = F(k - 1) + S - n \cdot \text{nums}[n - k]$$

Using this recurrence relation:
1. Compute the array sum $S$ and the base value $F(0)$ in a single $\mathcal{O}(n)$ pass.
2. Iterate $k$ from $1$ to $n - 1$, updating $F(k)$ from $F(k - 1)$ in $\mathcal{O}(1)$ time per step.
3. Track and return the maximum value encountered.

> [!NOTE]
> Even though the final answer fits inside a standard 32-bit signed integer, intermediate calculations of $F(k)$ and total sum $S$ can exceed $2^{31} - 1$ when $n = 10^5$ and numbers are up to $100$ ($\approx 5 \times 10^{11}$). Therefore, 64-bit integer types (`long` in Java, `long long` in C++) are used to prevent integer overflow.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - A single pass computes the total sum $S$ and $F(0)$.
  - A second linear loop of $n - 1$ iterations computes all $F(k)$ values in $\mathcal{O}(1)$ time each.
  - Overall time complexity is $\mathcal{O}(N)$.

- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Only uses a few 64-bit variables (`totalSum`, `currentF`, `maxF`) with no auxiliary arrays.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/NMoBBr39jtI](https://youtu.be/NMoBBr39jtI)
