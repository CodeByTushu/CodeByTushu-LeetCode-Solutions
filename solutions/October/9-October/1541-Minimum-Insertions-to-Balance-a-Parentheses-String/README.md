# LeetCode 1541: Minimum Insertions to Balance a Parentheses String

- **Publication Date:** 09 October 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-insertions-to-balance-a-parentheses-string/](https://leetcode.com/problems/minimum-insertions-to-balance-a-parentheses-string/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/ln0satcFHX8?si=HxNayirF5m7BC8Gx)

---

## Problem Summary

Given a parentheses string `s` containing only the characters `'('` and `')'`. A parentheses string is balanced if:
1. Any left parenthesis `'('` must have a corresponding two consecutive right parenthesis `'))'`.
2. Left parenthesis `'('` must go before the corresponding two consecutive right parenthesis `'))'`.

In other words, we treat `'('` as an opening parenthesis and `'))'` as a closing parenthesis.
You can insert `'('` and `')'` at any position of the string to balance it.

Return the minimum number of insertions needed to make `s` balanced.

---

## Topics and Tags

- **String**
- **Stack**
- **Greedy**

---

## Approach

1. **Rule Representation**:
   - Each opening parenthesis `'('` requires exactly a pair of consecutive closing parentheses `'))'`.
   - We track unmatched opening parentheses using a counter `open` (acting as a lightweight stack counter).
   - We track the count of required insertions using `ans`.

2. **Linear Greedy Traversal**:
   - Iterate through the string using a pointer `i`:
     - If `s[i] == '('`:
       - Increment `open++` and advance `i` by 1.
     - If `s[i] == ')'`:
       - Check if the next character is also `')'` (`i + 1 < n && s[i + 1] == ')'`):
         - If yes, we found a complete closing pair `'))'`. Advance `i` by 2.
         - If no, we are missing a second `')'`. We greedily insert one `')'` (`ans++`) and advance `i` by 1.
       - Now that we have a full `'))'` pair:
         - If there is an existing unmatched opening parenthesis (`open > 0`), pair it up: decrement `open--`.
         - Otherwise, no `'('` is available to pair with this `'))'`, so we must insert a `'('` before it: `ans++`.

3. **Handling Remaining Unmatched Opening Parentheses**:
   - After traversing the entire string, each remaining unmatched `'('` in `open` requires two `')'` characters to be balanced.
   - Therefore, add `open * 2` to `ans`.
   - Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - Single pass through the string of length $N$ with constant-time operations per character.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Uses only primitive integer variables (`open`, `ans`, `i`, `n`), requiring no additional heap or stack allocations.

---

## Solutions

- [â˜• Java Solution (`Solution.java`)](./Solution.java)
- [ðŸ Python Solution (`solution.py`)](./solution.py)
- [âš¡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [ðŸŒ JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- ðŸŽ¥ **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/ln0satcFHX8?si=HxNayirF5m7BC8Gx](https://youtu.be/ln0satcFHX8?si=HxNayirF5m7BC8Gx)
