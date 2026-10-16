# LeetCode 1096: Brace Expansion II

- **Publication Date:** 25 September 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/brace-expansion-ii/](https://leetcode.com/problems/brace-expansion-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/S1EVtAF4wQ4?si=BzKLWkqRRRWOZnAX)

---

## Problem Summary

Under the grammar given below, strings can represent a set of lowercase words. Let $R(\text{expr})$ denote the set of words the expression represents.

The grammar can best be understood through simple examples:
- Single letters represent a singleton set containing that word:
  - $R(\text{"a"}) = \{\text{"a"}\}$
  - $R(\text{"w"}) = \{\text{"w"}\}$
- When we take a comma-delimited list of two or more expressions, we take the union of possibilities:
  - $R(\text{"\{a,b,c\}"}) = \{\text{"a"}, \text{"b"}, \text{"c"}\}$
  - $R(\text{"\{\{a,b\},\{b,c\}\}"}) = \{\text{"a"}, \text{"b"}, \text{"c"}\}$ (the final set contains each word at most once)
- When we concatenate two expressions, we take the set of possible concatenations between two words where the first word comes from the first expression and the second word comes from the second expression:
  - $R(\text{"\{a,b\}\{c,d\}"}) = \{\text{"ac"}, \text{"ad"}, \text{"bc"}, \text{"bd"}\}$
  - $R(\text{"a\{b,c\}\{d,e\}f\{g,h\}"}) = \{\text{"abdfg"}, \text{"abdfh"}, \text{"abefg"}, \text{"abefh"}, \text{"acdfg"}, \text{"acdfh"}, \text{"acefg"}, \text{"acefh"}\}$

Formally, the three rules for our grammar:
1. For every lowercase letter $x$, we have $R(x) = \{x\}$.
2. For expressions $e_1, e_2, \dots, e_k$ with $k \ge 2$, we have $R(\{e_1, e_2, \dots, e_k\}) = R(e_1) \cup R(e_2) \cup \dots \cup R(e_k)$.
3. For expressions $e_1$ and $e_2$, we have $R(e_1 \cdot e_2) = \{a + b \mid a \in R(e_1), b \in R(e_2)\}$ (Cartesian product).

Given an expression representing a set of words under the given grammar, return the **sorted list** of words that the expression represents.

---

### Examples

#### Example 1:
- **Input:** `expression = "{a,b}{c,{d,e}}"`
- **Output:** `["ac","ad","ae","bc","bd","be"]`

#### Example 2:
- **Input:** `expression = "{{a,z},a{b,c},{ab,z}}"`
- **Output:** `["a","ab","ac","z"]`
- **Explanation:** Each distinct word is written only once in the final answer.

---

### Constraints

- $1 \le \text{expression.length} \le 60$
- `expression[i]` consists of `'{'`, `'}'`, `','`, or lowercase English letters.
- The given `expression` represents a set of words based on the grammar given in the description.

---

## Topics and Tags

- **String**
- **Backtracking**
- **Stack**
- **Recursion**

---

## Intuition and Approach

The problem naturally models context-free grammar evaluation with two operations:
1. **Concatenation (Product / Multiplication):** Adjacent terms (e.g. `AB` or `a{b,c}`) produce a Cartesian product of strings: $\{a\} \times \{b, c\} = \{ab, ac\}$.
2. **Union (Addition / Sum):** Comma-separated expressions inside `{...}` produce a set union of strings: $\{a\} \cup \{b\} = \{a, b\}$.

### Recursive Descent Parser Design:
We can maintain a global index $i$ scanning through `expression`:
- **`parse()`**: Evaluates the product (concatenation) of consecutive factors until reaching a comma `,` or a closing brace `}` or the end of string.
  - Starts with an initial set containing the empty string: `result = {""}`.
  - In a loop, while `i < len(s)` and `s[i] != '}'` and `s[i] != ','`:
    - Calls `parseSingle()` to retrieve the factor set `nextSet`.
    - Updates `result` via Cartesian concatenation: `result = {a + b for a in result for b in nextSet}`.
  - Returns `result`.
- **`parseSingle()`**: Evaluates a single syntactic factor:
  - If `s[i] == '{'`: Skips `{`, repeatedly accumulates `parse()` sets while encountering commas `,`, then skips `}`, returning the union of all options.
  - Else (`s[i]` is a lowercase character): Consumes the character `ch` and returns the singleton set `{ch}`.

Finally, `braceExpansionII` calls `parse()`, converts the unique result set to a list, sorts it lexicographically, and returns it.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N \cdot M \log M)$
  - $N = \text{expression.length} \le 60$.
  - Recursive descent visits each character $O(1)$ times during parsing.
  - The number of generated distinct words $M$ is bounded by the constraints ($M \le 10^4$).
  - Sorting the final set of $M$ strings of length at most $L \le 60$ takes $\mathcal{O}(L \cdot M \log M)$, which comfortably executes within $2\text{--}5\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(M \cdot L)$
  - Recursion call stack depth is bounded by the maximum brace nesting depth ($O(N)$).
  - Storage for intermediate string sets generated across recursive frames takes $\mathcal{O}(M \cdot L)$ memory.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
