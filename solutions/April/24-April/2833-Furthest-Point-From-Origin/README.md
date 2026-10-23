# LeetCode 2833: Furthest Point From Origin

- **Publication Date:** 24 April 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/furthest-point-from-origin/](https://leetcode.com/problems/furthest-point-from-origin/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/PO0y5ruMki8)

---

## Problem Summary

You are given a string `moves` of length `n` consisting only of characters `'L'`, `'R'`, and `'_'`. The string represents your movement on a number line starting from the origin `0`.

In the $i^{\text{th}}$ move, you can choose one of the following directions:
- move to the left if `moves[i] = 'L'` or `moves[i] = '_'`
- move to the right if `moves[i] = 'R'` or `moves[i] = '_'`

Return *the **distance from the origin** of the furthest point you can get to after `n` moves*.

---

### Examples

#### Example 1:
- **Input:** `moves = "L_RL__R"`
- **Output:** `3`
- **Explanation:**
  - The furthest point we can reach from the origin $0$ is point $-3$ through the following sequence of moves: `"LLRLLLR"`.
  - The absolute distance from $0$ is $|-3| = 3$.

#### Example 2:
- **Input:** `moves = "_R__LL_"`
- **Output:** `5`
- **Explanation:**
  - The furthest point we can reach from the origin $0$ is point $-5$ through the following sequence of moves: `"LRLLLLL"`.
  - The absolute distance from $0$ is $|-5| = 5$.

#### Example 3:
- **Input:** `moves = "_______"`
- **Output:** `7`
- **Explanation:**
  - Choosing to move left on every step gives point $-7$, and choosing right gives point $+7$. In both cases, the furthest distance is $7$.

---

### Constraints

- $1 \le \text{moves.length} == n \le 50$
- `moves` consists only of characters `'L'`, `'R'`, and `'_'`.

---

## Topics and Tags

- **String**
- **Counting**
- **Greedy**

---

## Approach & Intuition

### 1. Directional Displacements

- Every `'L'` forces a $-1$ step along the number line.
- Every `'R'` forces a $+1$ step along the number line.
- Every `'_'` provides a wildcard choice: we can choose either $-1$ (left) or $+1$ (right).

Let:
- $c_L$ = count of `'L'`
- $c_R$ = count of `'R'`
- $c_{\_}$ = count of `'_'`

Without the blanks, our net displacement is $c_R - c_L$.

### 2. Greedy Wildcard Assignment

To maximize our final distance from the origin $| \text{position} |$:
- If we choose to maximize our distance in the **positive** direction (right):
  $$\text{dist}_{\text{right}} = (c_R + c_{\_}) - c_L = (c_R - c_L) + c_{\_}$$
- If we choose to maximize our distance in the **negative** direction (left):
  $$\text{dist}_{\text{left}} = (c_L + c_{\_}) - c_R = (c_L - c_R) + c_{\_}$$
- Taking the maximum of both orientations:
  $$\max(\text{dist}_{\text{right}}, \text{dist}_{\text{left}}) = |c_L - c_R| + c_{\_}$$

Thus, a single pass counting occurrences of `'L'`, `'R'`, and `'_'` yields the answer immediately in $\mathcal{O}(N)$ time and $\mathcal{O}(1)$ space.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - A single linear scan over the string of length $N \le 50$ suffices. Runs in $< 1\text{ ms}$.

- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Only scalar counters are used.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/PO0y5ruMki8](https://youtu.be/PO0y5ruMki8)
