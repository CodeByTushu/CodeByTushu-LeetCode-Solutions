# LeetCode 1614: Maximum Nesting Depth of the Parentheses

- **Publication Date:** 28 September 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/](https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/eBkkcXZRTbw?si=Ti1tucS3wUKj69dl)

---

## Problem Summary

Given a valid parentheses string `s`, return the **nesting depth** of `s`. The nesting depth is the maximum number of nested parentheses.

---

### Examples

#### Example 1:
- **Input:** `s = "(1+(2*3)+((8)/4))+1"`
- **Output:** `3`
- **Explanation:** Digit 8 is inside of 3 nested parentheses in the string.

#### Example 2:
- **Input:** `s = "(1)+((2))+(((3)))"`
- **Output:** `3`
- **Explanation:** Digit 3 is inside of 3 nested parentheses in the string.

#### Example 3:
- **Input:** `s = "()(())((()))"`
- **Output:** `3`

---

### Constraints

- $1 \le \text{s.length} \le 100$
- `s` consists of digits `0-9` and characters `'+'`, `'-'`, `'*'`, `'/'`, `'('`, and `')'`.
- It is guaranteed that parentheses expression `s` is a **VPS** (valid parentheses string).

---

## Topics and Tags

- **String**
- **Stack**
- **Simulation**

---

## Intuition and Approach

The problem asks for the maximum depth of balanced parentheses in a string. Since the input is guaranteed to be a valid parentheses string (VPS), we do not need to store the characters in an actual stack data structure. Instead, an integer counter simulating the stack height is sufficient.

### Step-by-Step Algorithm:
1. Initialize two counters:
   - `depth = 0`: tracks current nesting depth level.
   - `maxDepth = 0`: tracks the peak nesting depth encountered.
2. Iterate through each character `c` in `s`:
   - If `c == '('`:
     - Increment `depth++`.
     - Update `maxDepth = max(maxDepth, depth)`.
   - If `c == ')'`:
     - Decrement `depth--`.
   - All other characters (digits and arithmetic operators) are ignored.
3. Return `maxDepth`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - A single linear scan through string `s` of length $N \le 100$. Runs in $< 1\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Only uses two primitive integer variables (`depth` and `maxDepth`).

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
