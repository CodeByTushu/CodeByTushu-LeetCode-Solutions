# LeetCode 22: Generate Parentheses

- **Publication Date:** 02 October 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/generate-parentheses/](https://leetcode.com/problems/generate-parentheses/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/C76W89ZnU9o?si=1brTDBvYZVjXgXU9)

---

## Problem Summary

Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

---

## Topics and Tags

- **String**
- **Dynamic Programming**
- **Backtracking**

---

## Approach

1. **Backtracking Invariants**:
   - A sequence of parentheses is valid if and only if at every prefix, the number of closing parentheses never exceeds the number of opening parentheses, and the total count of both reaches `n`.
   - We track:
     - `open`: count of `'('` placed so far ($open \le n$).
     - `close`: count of `')'` placed so far ($close \le open$).

2. **Recursive Backtracking**:
   - Base Case: When `current.length == 2 * n`, all pairs are placed in valid order. Add the string to `result`.
   - Exploration Choices:
     - If `open < n`: We can place an opening parenthesis `'('`. Recurse with `open + 1`, then backtrack.
     - If `close < open`: We can place a closing parenthesis `')'`. Recurse with `close + 1`, then backtrack.
   - This ensures we never construct an invalid sequence, visiting only valid combinations.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}\left(\frac{4^n}{\sqrt{n}}\right)$
  - Bounded by the $n$-th Catalan number $C_n = \frac{1}{n+1}\binom{2n}{n}$. For $n \le 8$, $C_8 = 1430$ strings are generated, executing in under $1\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(n)$
  - Maximum depth of recursion call stack is $2n \le 16$.

---

## Solutions

- [â˜• Java Solution (`Solution.java`)](./Solution.java)
- [ðŸ Python Solution (`solution.py`)](./solution.py)
- [âš¡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [ðŸŒ JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- ðŸŽ¥ **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/C76W89ZnU9o?si=1brTDBvYZVjXgXU9](https://youtu.be/C76W89ZnU9o?si=1brTDBvYZVjXgXU9)
