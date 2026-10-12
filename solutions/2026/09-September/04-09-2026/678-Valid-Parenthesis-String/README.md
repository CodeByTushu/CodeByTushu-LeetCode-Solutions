# LeetCode 678: Valid Parenthesis String

- **Publication Date:** 04 September 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/valid-parenthesis-string/](https://leetcode.com/problems/valid-parenthesis-string/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/0S7wxtnsuRw?si=b2BCOBwmrecN2GLw)

---

## Problem Summary

Given a string `s` containing only three types of characters: `'('`, `')'` and `'*'`, return `true` if `s` is valid.

The following rules define a valid string:
- Any left parenthesis `'('` must have a corresponding right parenthesis `')'`.
- Any right parenthesis `')'` must have a corresponding left parenthesis `'('`.
- Left parenthesis `'('` must go before the corresponding right parenthesis `')'`.
- `'*'` could be treated as a single right parenthesis `')'`, a single left parenthesis `'('`, or an empty string `""`.

---

## Topics and Tags

- **String**
- **Dynamic Programming**
- **Stack**
- **Greedy**

---

## Approach

1. **Range of Possible Open Parentheses**:
   - Because `'*'` can represent `'('`, `')'`, or empty string `""`, the number of open parentheses at any point is not a fixed integer but a continuous range `[lo, hi]`.
   - `lo`: the minimum possible count of open parentheses.
   - `hi`: the maximum possible count of open parentheses.

2. **Greedy Range Tracking**:
   - Initialize `lo = 0`, `hi = 0`.
   - Iterate through each character `c` of string `s`:
     - If `c == '('`: both minimum and maximum possible open counts increment: `lo++`, `hi++`.
     - If `c == ')'`: both decrement: `lo--`, `hi--`.
     - If `c == '*'`:
       - If treated as `')'`: open count decreases (`lo--`).
       - If treated as `'('`: open count increases (`hi++`).
       - If treated as `""`: open count remains within `[lo, hi]`.
   - **Pruning & Invariants**:
     - If `hi < 0`: even under the most optimistic scenario (all `'*'` treated as `'('`), we encountered too many `')'`. Return `false`.
     - If `lo < 0`: we cannot have negative open parentheses (an excess of `')'` can be absorbed by treating previous `'*'` as empty or `')'`), so reset `lo = 0`.

3. **Final Balance**:
   - After scanning the string, return `lo == 0` (meaning it is possible for all opening parentheses to be balanced).

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - Single pass through string `s` of length $N \le 100$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Uses only two primitive integer variables (`lo`, `hi`), requiring no stack allocations.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/0S7wxtnsuRw?si=b2BCOBwmrecN2GLw](https://youtu.be/0S7wxtnsuRw?si=b2BCOBwmrecN2GLw)
