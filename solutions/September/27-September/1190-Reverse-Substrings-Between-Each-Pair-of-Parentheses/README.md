# LeetCode 1190: Reverse Substrings Between Each Pair of Parentheses

- **Publication Date:** 27 September 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/reverse-substrings-between-each-pair-of-parentheses/](https://leetcode.com/problems/reverse-substrings-between-each-pair-of-parentheses/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/KRjmJgO5_rA?si=9doCqEIX_7yX5f0-)

---

## Problem Summary

You are given a string `s` that consists of lower case English letters and brackets `()`.

Reverse the strings in each pair of matching parentheses, starting from the innermost one.

Your result should **not** contain any brackets.

---

### Examples

#### Example 1:
- **Input:** `s = "(abcd)"`
- **Output:** `"dcba"`

#### Example 2:
- **Input:** `s = "(u(love)i)"`
- **Output:** `"iloveu"`
- **Explanation:**
  - The innermost pair is `"(love)"`. Reversing it gives `"evol"`, transforming the expression to `"(uevoli)"`.
  - Reversing the outer pair gives `"iloveu"`.

#### Example 3:
- **Input:** `s = "(ed(et(oc))el)"`
- **Output:** `"leetcode"`
- **Explanation:**
  - First, reverse `"(oc)"` $\rightarrow$ `"co"`, yielding `"(ed(etco)el)"`.
  - Next, reverse `"(etco)"` $\rightarrow$ `"octe"`, yielding `"(edocteel)"`.
  - Finally, reverse the outermost string $\rightarrow$ `"leetcode"`.

---

### Constraints

- $1 \le \text{s.length} \le 2000$
- `s` only contains lowercase English characters and parentheses `'('` and `')'`.
- It is guaranteed that all parentheses are balanced.

---

## Topics and Tags

- **String**
- **Stack**

---

## Intuition and Approach

The problem requires resolving nested parenthesized expressions from the inside out, which is a classic **Last-In, First-Out (LIFO)** parsing pattern suited for a **Stack**.

### Stack-Based Scope Simulation:
1. Maintain a stack of string buffers (`Deque<StringBuilder>` in Java, or a list of character lists) representing outer enclosing contexts.
2. Maintain a `current` mutable buffer for the current nested level.
3. Iterate through characters `c` in `s`:
   - If `c == '('`:
     - An inner scope begins.
     - Push `current` onto the stack.
     - Reinitialize `current = new StringBuilder()`.
   - If `c == ')'`:
     - The innermost scope completes.
     - Reverse `current`.
     - Pop the parent buffer from the stack and append `current` onto it: `current = stack.pop().append(current)`.
   - Else (`c` is an English letter):
     - Append `c` to `current`.
4. When traversal finishes, `current.toString()` contains the final bracket-free string.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N^2)$ worst-case
  - Where $N = \text{s.length} \le 2000$.
  - Reversing a substring of length $L$ takes $\mathcal{O}(L)$. In the worst case of deeply nested parentheses (e.g. $(((\dots)))$), characters may be reversed multiple times, leading to at most $\mathcal{O}(N^2)$ operations.
  - Given $N \le 2000$, $\frac{N^2}{2} \le 2 \times 10^6$ operations, executing comfortably in $< 3\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - The stack depth and cumulative string buffers store at most $N$ characters simultaneously.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
