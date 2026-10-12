# LeetCode 921: Minimum Add to Make Parentheses Valid

- **Publication Date:** 06 October 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/](https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/BZiljrRmbfE?si=4WTr8rXF-cxsNIf6)

---

## Problem Summary

A parentheses string is valid if and only if:
1. It is the empty string,
2. It can be written as `AB` (`A` concatenated with `B`), where `A` and `B` are valid strings, or
3. It can be written as `(A)`, where `A` is a valid string.

You are given a parentheses string `s`. In one move, you can insert a parenthesis at any position of the string.

Return the minimum number of moves required to make `s` valid.

---

## Topics and Tags

- **String**
- **Stack**
- **Greedy**

---

## Approach

1. **Unmatched Balance Tracking**:
   - An opening parenthesis `'('` requires a subsequent matching closing parenthesis `')'`.
   - A closing parenthesis `')'` requires a preceding unmatched opening parenthesis `'('`.
   - If a closing parenthesis appears without an available opening parenthesis before it, it can never be matched by future characters, so we must insert an opening parenthesis before it.

2. **Greedy Single-Pass Scan**:
   - Maintain two counters:
     - `open`: tracks currently unmatched `'('`.
     - `add`: tracks unmatched `')'` that need an inserted `'('`.
   - Iterate through each character `c` in `s`:
     - If `c == '('`: increment `open++`.
     - If `c == ')'`:
       - If `open > 0`: pair it with the most recent unmatched `'('` by decrementing `open--`.
       - If `open == 0`: no opening parenthesis exists to pair with this `')'`, so we must insert one: increment `add++`.
   - At the end of the string, each remaining unmatched `'('` in `open` needs an inserted `')'`.
   - Total insertions needed: `add + open`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - Single pass through string `s` of length $N \le 1000$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Uses only two primitive integer variables (`open`, `add`), requiring zero extra memory.

---

## Solutions

- [â˜• Java Solution (`Solution.java`)](./Solution.java)
- [ðŸ Python Solution (`solution.py`)](./solution.py)
- [âš¡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [ðŸŒ JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- ðŸŽ¥ **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/BZiljrRmbfE?si=4WTr8rXF-cxsNIf6](https://youtu.be/BZiljrRmbfE?si=4WTr8rXF-cxsNIf6)
