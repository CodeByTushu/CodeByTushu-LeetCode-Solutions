# LeetCode 66: Plus One

- **Publication Date:** 01 January 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/plus-one/](https://leetcode.com/problems/plus-one/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/QaqpaMoCl3c)

---

## Problem Summary

You are given a **large integer** represented as an integer array `digits`, where each `digits[i]` is the $i^{\text{th}}$ digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading `0`'s.

Increment the large integer by one and return *the resulting array of digits*.

---

### Examples

#### Example 1:
- **Input:** `digits = [1, 2, 3]`
- **Output:** `[1, 2, 4]`
- **Explanation:** The array represents the integer 123. Incrementing by one gives $123 + 1 = 124$. Thus, the result should be `[1, 2, 4]`.

#### Example 2:
- **Input:** `digits = [4, 3, 2, 1]`
- **Output:** `[4, 3, 2, 2]`
- **Explanation:** The array represents the integer 4321. Incrementing by one gives $4321 + 1 = 4322$. Thus, the result should be `[4, 3, 2, 2]`.

#### Example 3:
- **Input:** `digits = [9]`
- **Output:** `[1, 0]`
- **Explanation:** The array represents the integer 9. Incrementing by one gives $9 + 1 = 10$. Thus, the result should be `[1, 0]`.

---

### Constraints

- $1 \le \text{digits.length} \le 100$
- $0 \le \text{digits}[i] \le 9$
- `digits` does not contain any leading `0`'s.

---

## Topics and Tags

- **Array**
- **Math**

---

## Approach & Intuition

### 1. Reverse Traversal & Carry Simulation

1. **Right-to-Left Traversal:**
   - Addition by one only affects the least significant digit first (at index $n - 1$).
   - If the digit is strictly less than $9$, incrementing it by $1$ does not produce a carry. We can immediately return the modified array.
   - If the digit is $9$, incrementing it causes an overflow for that place ($9 + 1 = 10$). The digit at that position becomes $0$, and a carry of $1$ propagates to the next position to the left (index $i - 1$).

2. **All 9's Corner Case:**
   - If all digits in the array were $9$ (e.g., `[9, 9, 9]`), the loop finishes and all positions will have been set to $0$.
   - A carry remains that requires a new most significant digit of $1$ followed by zeros (e.g., $999 + 1 = 1000$).
   - We allocate an array of size $n + 1$, set the first element to $1$ (defaulting all subsequent elements to $0$), and return it.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$, where $n$ is the number of digits in `digits`. In the worst-case scenario (all 9s), we inspect each digit once from right to left. In the average case, the algorithm terminates in $\mathcal{O}(1)$ time whenever the last digit is less than 9.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$ when modifying in-place, or $\mathcal{O}(n)$ only in the worst-case carry overflow where a new array of size $n + 1$ is returned.

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
