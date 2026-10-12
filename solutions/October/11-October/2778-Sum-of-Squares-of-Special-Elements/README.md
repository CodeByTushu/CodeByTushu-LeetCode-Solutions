# LeetCode 2778: Sum of Squares of Special Elements

- **Publication Date:** 11 October 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/sum-of-squares-of-special-elements/](https://leetcode.com/problems/sum-of-squares-of-special-elements/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/rkheEQ8QSDA?si=PmU4H8NbyDMNlBoQ)

---

## Problem Summary

You are given a `1`-indexed integer array `nums` of length `n`.

An element `nums[i]` of `nums` is called **special** if `i` divides `n`, i.e., `n % i == 0`.

Return the **sum of the squares of all special elements** of `nums`.

---

## Topics and Tags

- **Array**
- **Math**
- **Simulation**
- **Enumeration**

---

## Approach

1. **Definition of Special Element**:
   - The problem considers 1-indexed positions from `1` to `n`. An index `i` is special if `n` is divisible by `i` (`n % i == 0`).
   - In 0-indexed programming arrays, the $i$-th element corresponds to `nums[i - 1]`.

2. **Simulation Algorithm**:
   - Initialize a variable `sum = 0`.
   - Loop `i` from `1` to `n`:
     - If `n % i == 0`, square `nums[i - 1]` and add it to `sum`:
       $$\text{sum} \mathrel{+}= \text{nums}[i - 1] \times \text{nums}[i - 1]$$
   - Return the total `sum`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - A single linear loop from $1$ to $N$ with constant-time arithmetic operations. With $N \le 50$, execution time is optimal ($\approx 0\text{ ms}$).
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Only integer accumulator variables (`n`, `sum`, `i`) are used with zero extra memory overhead.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/rkheEQ8QSDA?si=PmU4H8NbyDMNlBoQ](https://youtu.be/rkheEQ8QSDA?si=PmU4H8NbyDMNlBoQ)
