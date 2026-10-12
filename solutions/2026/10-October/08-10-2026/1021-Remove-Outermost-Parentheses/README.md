# LeetCode 1021: Remove Outermost Parentheses

- **Publication Date:** 08 October 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/remove-outermost-parentheses/](https://leetcode.com/problems/remove-outermost-parentheses/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/IiCJD07FtWQ?si=hII9yMy6olSN8TSn)

---

## Problem Summary

A valid parentheses string is either empty `""`, `"(" + A + ")"`, or `A + B`, where `A` and `B` are valid parentheses strings, and `+` represents string concatenation.

A valid parentheses string `s` is **primitive** if it is nonempty, and there does not exist a way to split it into `s = A + B`, with `A` and `B` nonempty valid parentheses strings.

Given a valid parentheses string `s`, consider its primitive decomposition: `s = P1 + P2 + ... + Pk`, where `Pi` are primitive valid parentheses strings.

Return `s` after removing the outermost parentheses of every primitive string in the primitive decomposition of `s`.

---

## Topics and Tags

- **String**
- **Stack**

---

## Approach

1. **Primitive Parentheses & Nesting Depth**:
   - Each primitive valid parentheses string starts with an opening parenthesis `'('` at depth 0 and closes with a matching `')'` that brings the depth back down to 0.
   - The outermost parentheses of each primitive block are precisely:
     - The first `'('` (where depth transition is $0 \to 1$).
     - The corresponding final `')'` (where depth transition is $1 \to 0$).

2. **Linear Depth Tracking (O(1) Auxiliary Space)**:
   - Instead of maintaining an explicit stack, track the current nesting depth with an integer `depth = 0`.
   - Traverse each character `c` of string `s`:
     - If `c == '('`:
       - If `depth > 0`, this `'('` is an inner parenthesis (not outermost), so append it to our result.
       - Increment `depth++`.
     - If `c == ')'`:
       - Decrement `depth--`.
       - If `depth > 0`, this `')'` is an inner parenthesis (not outermost), so append it to our result.
   - This cleanly strips away the outermost pair of every primitive block while retaining all inner structure.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - Single linear pass through string `s` of length $N \le 10^5$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Only uses a single integer variable `depth` for depth counting. Auxiliary memory beyond the output string is $\mathcal{O}(1)$.

---

## Solutions

- [â˜• Java Solution (`Solution.java`)](./Solution.java)
- [ðŸ Python Solution (`solution.py`)](./solution.py)
- [âš¡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [ðŸŒ JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- ðŸŽ¥ **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/IiCJD07FtWQ?si=hII9yMy6olSN8TSn](https://youtu.be/IiCJD07FtWQ?si=hII9yMy6olSN8TSn)
