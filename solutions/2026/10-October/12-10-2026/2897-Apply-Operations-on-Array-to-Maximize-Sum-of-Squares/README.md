# LeetCode 2897: Apply Operations on Array to Maximize Sum of Squares

- **Publication Date:** 12 October 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/apply-operations-on-array-to-maximize-sum-of-squares/](https://leetcode.com/problems/apply-operations-on-array-to-maximize-sum-of-squares/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/vLShc1gTSjY?si=Ci66M9FUKr5VFZ8f)

---

## Problem Summary

You are given a `0`-indexed integer array `nums` and a positive integer `k`.

You can perform the following operation any number of times:
- Choose two distinct indices `i` and `j`, and simultaneously set:
  $$\text{nums}[i] \gets (\text{nums}[i] \text{ AND } \text{nums}[j])$$
  $$\text{nums}[j] \gets (\text{nums}[i] \text{ OR } \text{nums}[j])$$

Choose `k` elements from the final array to maximize the sum of their squares. Return the maximum possible sum of squares modulo $10^9 + 7$.

---

## Topics and Tags

- **Array**
- **Hash Table**
- **Math**
- **Greedy**
- **Bit Manipulation**

---

## Approach

1. **Bit Conservation Invariant**:
   - For any bit position $b \in [0, 29]$:
     - If both numbers have a $1$, both still have $1$ after the operation.
     - If both numbers have a $0$, both still have $0$.
     - If one has $1$ and the other has $0$, the `OR` result receives the $1$ while the `AND` result receives the $0$.
   - Thus, the total count of set bits at each bit position across the entire array is invariant. The operation allows us to freely shift set bits from one number to another.

2. **Greedy Maximization of Squares**:
   - Because squaring is a convex function, for $a \ge b$ and positive $\Delta$:
     $$(a + \Delta)^2 + (b - \Delta)^2 = a^2 + b^2 + 2\Delta(a - b) + 2\Delta^2 > a^2 + b^2$$
   - To maximize the sum of squares, we should greedily concentrate set bits into the largest possible numbers.

3. **Algorithm**:
   - Count the frequency of set bits at each bit position $b \in [0, 29]$ across `nums`.
   - Greedily construct $k$ numbers:
     - For each of the $k$ numbers, include bit $b$ if `cnt[b] > 0`, then decrement `cnt[b]`.
     - Square the resulting number modulo $10^9 + 7$ and add it to `ans`.
   - Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(30 \times N + 30 \times K) = \mathcal{O}(N + K)$
  - Counting set bits takes $30 \times N$ operations.
  - Forming the $k$ greedy numbers takes $30 \times K$ operations.
  - With $N, K \le 10^5$, this executes in $< 40\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - A fixed-size array of 30 integers to store the bit counts.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/vLShc1gTSjY?si=Ci66M9FUKr5VFZ8f](https://youtu.be/vLShc1gTSjY?si=Ci66M9FUKr5VFZ8f)
