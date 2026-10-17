# LeetCode 1111: Maximum Nesting Depth of Two Valid Parentheses Strings

- **Publication Date:** 30 September 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/maximum-nesting-depth-of-two-valid-parentheses-strings/](https://leetcode.com/problems/maximum-nesting-depth-of-two-valid-parentheses-strings/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/HH1W_e3mVg0?si=mkGpGXqxeu-Mih80)

---

## Problem Summary

A string is a **valid parentheses string** (denoted VPS) if and only if it consists of `"("` and `")"` characters only, and:
- It is the empty string, or
- It can be written as `AB` (`A` concatenated with `B`), where `A` and `B` are VPS's, or
- It can be written as `(A)`, where `A` is a VPS.

We can similarly define the *nesting depth* `depth(S)` of any VPS `S` as follows:
- `depth("") = 0`
- `depth(A + B) = max(depth(A), depth(B))`, where `A` and `B` are VPS's
- `depth("(" + A + ")") = 1 + depth(A)`, where `A` is a VPS.

Given a VPS `seq`, split it into two disjoint subsequences `A` and `B`, such that `A` and `B` are VPS's (and `A.length + B.length = seq.length`).

Now choose any such `A` and `B` such that `max(depth(A), depth(B))` is the minimum possible value.

Return an `answer` array (of length `seq.length`) that encodes such a choice of `A` and `B`: `answer[i] = 0` if `seq[i]` is part of `A`, else `answer[i] = 1`. Note that even though multiple answers may exist, you may return any of them.

---

### Examples

#### Example 1:

- **Input:** `seq = "(()())"`
- **Output:** `[0,1,1,1,1,0]` (or any valid optimal split such as `[1,0,0,0,0,1]`)

#### Example 2:

- **Input:** `seq = "()(())()"`
- **Output:** `[0,0,0,1,1,0,1,1]`

---

### Constraints

- $1 \le \text{seq.size} \le 10000$

---

## Topics and Tags

- **String**
- **Stack**
- **Greedy**

---

## Intuition and Approach

### Core Idea:
The total nesting depth of the string is distributed among nested parentheses. To minimize $\max(\text{depth}(A), \text{depth}(B))$, the optimal strategy is to divide the nesting layers evenly between subsequence $A$ and subsequence $B$.
Specifically:
- Parentheses at **odd** nesting depths can be assigned to one group (e.g., group 1).
- Parentheses at **even** nesting depths can be assigned to the other group (e.g., group 0).

### Algorithm:
1. Initialize an integer `depth = 0`.
2. Iterate through each character `seq[i]`:
   - If `seq[i] == '('`:
     - Increment `depth++` (entering a deeper nesting level).
     - Assign `ans[i] = depth % 2`.
   - If `seq[i] == ')'`:
     - Assign `ans[i] = depth % 2` (matching the depth level of its opening bracket).
     - Decrement `depth--` (exiting this nesting level).
3. Return `ans`.

Since matching pairs of parentheses share the exact same nesting level, both subsequence $A$ and subsequence $B$ are guaranteed to be valid parentheses strings (VPS), and the maximum depth is bounded by $\lceil \text{depth} / 2 \rceil$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - A single linear scan through the string of length $N \le 10000$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - No auxiliary data structures used; only a primitive integer variable `depth` is maintained (excluding the return array).

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
