# LeetCode 20: Valid Parentheses

- **Publication Date:** 01 September 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/valid-parentheses/](https://leetcode.com/problems/valid-parentheses/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/gBgfrrCf6BA?si=_dSZg_1Iw7OY6O2e)

---

## Problem Summary

Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

---

## Topics and Tags

- **String**
- **Stack**

---

## Approach

1. **Length Parity Check**:
   - If the length of `s` is odd (`(s.length() & 1) == 1`), it is impossible for all brackets to be matched in pairs; return `false` immediately.

2. **Stack Simulation**:
   - Maintain a Last-In-First-Out (LIFO) stack of unmatched opening brackets.
   - Using a primitive array (`char[] stack`) and pointer `top` avoids object allocation overhead for maximum performance.
   - For each character `c` in `s`:
     - If `c` is `'('`, `'{'`, or `'['`, push it onto the stack (`stack[++top] = c`).
     - If `c` is a closing bracket:
       - If the stack is empty (`top < 0`), return `false`.
       - Pop the top character `open = stack[top--]`.
       - Check if `open` matches `c` (e.g. `'('` with `')'`, `'{'` with `'}'`, `'['` with `']'`). If mismatched, return `false`.

3. **Final Validation**:
   - After traversing all characters, all opening brackets must have been matched (`top == -1`).

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - A single pass over the string of length $N$. Each character is pushed and popped at most once in $\mathcal{O}(1)$ time.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - In the worst case (e.g. all opening brackets `"((((("`), the stack holds up to $N$ characters.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/gBgfrrCf6BA?si=_dSZg_1Iw7OY6O2e](https://youtu.be/gBgfrrCf6BA?si=_dSZg_1Iw7OY6O2e)
