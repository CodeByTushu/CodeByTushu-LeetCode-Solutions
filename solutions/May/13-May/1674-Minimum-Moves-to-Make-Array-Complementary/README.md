# LeetCode 1674: Minimum Moves to Make Array Complementary

- **Publication Date:** 13 May 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-moves-to-make-array-complementary/](https://leetcode.com/problems/minimum-moves-to-make-array-complementary/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/iqqCz8AaulU)

---

## Problem Summary

You are given an integer array `nums` of **even length** $n$ and an integer `limit`. In one move, you can replace any integer from `nums` with another integer between $1$ and `limit`, inclusive.

The array `nums` is **complementary** if for all indices $i$ ($0$-indexed):
$$\text{nums}[i] + \text{nums}[n - 1 - i] = x$$
for some common target integer $x$.

Return the **minimum number of moves** required to make `nums` complementary.

---

### Examples

#### Example 1:
- **Input:** `nums = [1, 2, 4, 3]`, `limit = 4`
- **Output:** `1`
- **Explanation:**
  - In 1 move, we can change `nums` to `[1, 2, 2, 3]`.
  - $\text{nums}[0] + \text{nums}[3] = 1 + 3 = 4$.
  - $\text{nums}[1] + \text{nums}[2] = 2 + 2 = 4$.
  - The array is complementary with target sum $x = 4$.

#### Example 2:
- **Input:** `nums = [1, 2, 2, 1]`, `limit = 2`
- **Output:** `2`
- **Explanation:**
  - In 2 moves, we can change `nums` to `[2, 2, 2, 2]`. Each pair sums to 4. We cannot change any number to 3 since $3 > \text{limit}$.

#### Example 3:
- **Input:** `nums = [1, 2, 1, 2]`, `limit = 2`
- **Output:** `0`
- **Explanation:**
  - `nums` is already complementary: $\text{nums}[0] + \text{nums}[3] = 1 + 2 = 3$ and $\text{nums}[1] + \text{nums}[2] = 2 + 1 = 3$. Zero moves needed.

---

### Constraints

- $n == \text{nums.length}$
- $2 \le n \le 10^5$
- $n$ is even.
- $1 \le \text{nums}[i] \le \text{limit} \le 10^5$

---

## Topics and Tags

- **Array**
- **Hash Table**
- **Prefix Sum**

---

## Approach & Intuition

### 1. Range of Possible Target Sums

Since every replaced element must lie in the range $[1, \text{limit}]$, the sum $x$ of any complementary pair must satisfy:
$$2 \le x \le 2 \times \text{limit}$$

### 2. Move Classification for a Pair $(a, b)$

Let $A = \min(a, b)$ and $B = \max(a, b)$. For any candidate target sum $x$:
1. **0 moves:**
   - The current sum already equals $x$, so $x = A + B$.
2. **1 move:**
   - We replace only one number with a value in $[1, \text{limit}]$.
   - Replacing $B$ with $1$ gives the minimum 1-move sum: $A + 1$.
   - Replacing $A$ with $\text{limit}$ gives the maximum 1-move sum: $B + \text{limit}$.
   - Thus, any sum $x \in [A + 1, B + \text{limit}]$ (except $x = A + B$) requires **1 move**.
3. **2 moves:**
   - Replacing both elements allows any sum from $1 + 1 = 2$ to $\text{limit} + \text{limit} = 2 \times \text{limit}$.
   - Sums in $[2, A]$ and $[B + \text{limit} + 1, 2 \times \text{limit}]$ require **2 moves**.

### 3. Difference Array (Line Sweep) Optimization

Testing all possible sums $x \in [2, 2 \times \text{limit}]$ independently takes $\mathcal{O}(n \times \text{limit})$, which TLEs.

Instead, we initialize a **Difference Array** `diff` of size $2 \times \text{limit} + 2$:
- Assume by default that all $n/2$ pairs require **2 moves** (total default = $n$ moves).
- For each pair $(a, b)$:
  - Across $[A + 1, B + \text{limit}]$, the pair requires only 1 move instead of 2 (a saving of 1 move):
    $$\text{diff}[A + 1] \mathrel{-}= 1, \quad \text{diff}[B + \text{limit} + 1] \mathrel{+}= 1$$
  - At $x = A + B$, the pair requires 0 moves instead of 1 (an additional saving of 1 move):
    $$\text{diff}[A + B] \mathrel{-}= 1, \quad \text{diff}[A + B + 1] \mathrel{+}= 1$$

Finally, we run a single prefix sum sweep over $x \in [2, 2 \times \text{limit}]$, tracking the running moves and taking the minimum!

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n + \text{limit})$
  - Processing $n/2$ pairs takes $\mathcal{O}(n)$ time.
  - Prefix sum sweep from $2$ to $2 \times \text{limit}$ takes $\mathcal{O}(\text{limit})$ time.
  - Overall time complexity: $\mathcal{O}(n + \text{limit}) \approx 2 \times 10^5$ operations, running in $\approx 5\text{ ms}$.

- **Auxiliary Space Complexity:** $\mathcal{O}(\text{limit})$
  - A difference array of size $2 \times \text{limit} + 2$ takes $\approx 200\text{ KB}$ of memory.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/iqqCz8AaulU](https://youtu.be/iqqCz8AaulU)
