# LeetCode 32: Longest Valid Parentheses

- **Publication Date:** 03 September 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/longest-valid-parentheses/](https://leetcode.com/problems/longest-valid-parentheses/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/XQtFaTGNjA4?si=m9ZC76Sf8T39UAdJ)

---

## Problem Summary

Given a string containing just the characters `'('` and `')'`, return the length of the longest valid (well-formed) parentheses substring.

---

## Topics and Tags

- **String**
- **Dynamic Programming**
- **Stack**

---

## Approach

1. **Stack Boundary Tracking**:
   - The fundamental challenge is finding the boundary of valid contiguous parentheses substrings.
   - We maintain a stack that stores indices of characters.
   - We initially push `-1` onto the stack to act as a virtual base boundary before the start of the string.

2. **Index-Based Linear Traversal**:
   - For each character `s[i]`:
     - If `s[i] == '('`:
       - Push the index `i` onto the stack.
     - If `s[i] == ')'`:
       - Pop the top index from the stack (pairing it with the latest `'('`).
       - If the stack is now empty:
         - No matching `'('` was available for this `')'`. This `')'` now acts as a new barrier/boundary for future substrings. Push `i` onto the stack.
       - If the stack is not empty:
         - The substring between the current index `i` and the current top of the stack (`stack[top]`) is guaranteed to be a valid parentheses substring.
         - The length is $i - \text{stack}[\text{top}]$.
         - Update `max = Math.max(max, i - stack[top])`.

3. **Array-Based Stack Optimization**:
   - Using a fixed primitive integer array `stack[n + 1]` with a pointer `top` gives superior cache locality and zero heap-allocation overhead compared to standard container classes.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - Single linear pass through string `s` of length $N \le 3 \times 10^4$. Each index is pushed and popped at most once.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - Array stack of size $N + 1$ integers.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/XQtFaTGNjA4?si=m9ZC76Sf8T39UAdJ](https://youtu.be/XQtFaTGNjA4?si=m9ZC76Sf8T39UAdJ)
