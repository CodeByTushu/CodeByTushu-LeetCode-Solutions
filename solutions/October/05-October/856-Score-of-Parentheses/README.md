# LeetCode 856: Score of Parentheses

- **Publication Date:** 05 October 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/score-of-parentheses/](https://leetcode.com/problems/score-of-parentheses/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/B1P1_QQIqsE?si=nEV9RpfDojlICfoT)

---

## Problem Summary

Given a balanced parentheses string `s`, return the score of the string.

The score of a balanced parentheses string is based on the following rule:
- `"()"` has score `1`.
- `AB` has score `A + B`, where `A` and `B` are balanced parentheses strings.
- `(A)` has score `2 * A`, where `A` is a balanced parentheses string.

---

## Topics and Tags

- **String**
- **Stack**
- **Bit Manipulation**
- **Math**

---

## Approach

1. **Mathematical Depth Insight**:
   - Notice the recursive structure: every time a pair `"()"` is enclosed inside outer parentheses, its value is multiplied by 2 for each level of nesting.
   - For example, in `"((()))"`, the core `"()"` is nested inside 2 other pairs, making its contribution $1 \times 2 \times 2 = 2^2$.
   - More generally, every immediate pair `"()"` at depth $d$ contributes exactly $2^d$ (using 0-indexed nesting depth) to the final score.

2. **Linear Depth Tracking (O(1) Space)**:
   - Instead of an explicit stack or recursion, track current nesting depth with an integer `depth = 0`.
   - Iterate through the string:
     - When encountering `'('`: increment `depth++`.
     - When encountering `')'`:
       - Decrement `depth--`.
       - Check if this `')'` directly closes the preceding `'('` (`s[i - 1] == '('`).
       - If yes, we found a primitive unit `"()"` at the current `depth`. Add $1 \ll \text{depth}$ ($2^{\text{depth}}$) to `score`.
   - Return the cumulative `score`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - Single pass through string `s` of length $N \le 50$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Uses only primitive integer variables (`score`, `depth`), requiring no stack allocations.

---

## Solutions

- [â˜• Java Solution (`Solution.java`)](./Solution.java)
- [ðŸ Python Solution (`solution.py`)](./solution.py)
- [âš¡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [ðŸŒ JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- ðŸŽ¥ **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/B1P1_QQIqsE?si=nEV9RpfDojlICfoT](https://youtu.be/B1P1_QQIqsE?si=nEV9RpfDojlICfoT)
