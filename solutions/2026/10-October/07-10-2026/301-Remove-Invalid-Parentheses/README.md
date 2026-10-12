# LeetCode 301: Remove Invalid Parentheses

- **Publication Date:** 07 October 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/remove-invalid-parentheses/](https://leetcode.com/problems/remove-invalid-parentheses/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/TukqIpezH1Q?si=pxo2hmt0K1zlbU_p)

---

## Problem Summary

Given a string `s` that contains parentheses and letters, remove the minimum number of invalid parentheses to make the input string valid.

Return a list of **unique strings** that are valid with the minimum number of removals. You may return the answer in **any order**.

---

## Topics and Tags

- **String**
- **Backtracking**
- **Breadth-First Search**
- **Depth-First Search**
- **Recursion**

---

## Approach

1. **Calculate Minimum Required Removals**:
   - In a preliminary pass, count the exact number of misplaced left parentheses (`leftRem`) and right parentheses (`rightRem`):
     - Scan through `s`:
       - If `c == '('`: increment `leftRem++`.
       - If `c == ')'`: if `leftRem > 0`, pair it by decrementing `leftRem--`; else increment `rightRem++`.
   - This provides the exact number of parentheses that MUST be removed, bounding our search depth to only valid minimal removals.

2. **DFS / Backtracking with Duplicate Pruning**:
   - Use recursive backtracking (`dfs(s, start, leftRem, rightRem)`):
     - Base Case: When `leftRem == 0` and `rightRem == 0`, verify if the remaining string is valid using `isValid(s)`. If valid, add it to the result set.
     - Exploration Step:
       - Iterate from `start` to `s.length() - 1`.
       - **Duplicate Elimination**: If consecutive characters are identical (`s[i] == s[i - 1]`), skip removing the duplicate to eliminate redundant branches.
       - If `s[i] == '('` and `leftRem > 0`: recurse with `leftRem - 1`.
       - If `s[i] == ')'` and `rightRem > 0`: recurse with `rightRem - 1`.

3. **Validation Check**:
   - `isValid(s)` verifies if parentheses are balanced in linear time by ensuring the count of open parentheses never drops below zero and ends at zero.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(2^N)$ in the theoretical worst-case, but effectively bounded by $\mathcal{O}(\binom{N}{rem} \times N)$ where $rem = leftRem + rightRem \le 20$ and $N \le 25$. Pre-calculating exact removals and duplicate pruning ensures fast execution.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - Maximum recursion call stack depth is bounded by $rem \le N \le 25$.

---

## Solutions

- [â˜• Java Solution (`Solution.java`)](./Solution.java)
- [ðŸ Python Solution (`solution.py`)](./solution.py)
- [âš¡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [ðŸŒ JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- ðŸŽ¥ **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/TukqIpezH1Q?si=pxo2hmt0K1zlbU_p](https://youtu.be/TukqIpezH1Q?si=pxo2hmt0K1zlbU_p)
