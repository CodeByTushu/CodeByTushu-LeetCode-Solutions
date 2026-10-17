# LeetCode 2267: Check if There Is a Valid Parentheses String Path

- **Publication Date:** 29 September 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/check-if-there-is-a-valid-parentheses-string-path/](https://leetcode.com/problems/check-if-there-is-a-valid-parentheses-string-path/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/qJRuFpVRlNE?si=ghZkgQozXWSDUgw5)

---

## Problem Summary

A parentheses string is a **non-empty** string consisting only of `'('` and `')'`. It is **valid** if any of the following conditions is true:
- It is `()`.
- It can be written as `AB` (`A` concatenated with `B`), where `A` and `B` are valid parentheses strings.
- It can be written as `(A)`, where `A` is a valid parentheses string.

You are given an $m \times n$ matrix of parentheses `grid`. A **valid parentheses string path** in the grid is a path satisfying all of the following conditions:
- The path starts from the upper left cell `(0, 0)`.
- The path ends at the bottom-right cell `(m - 1, n - 1)`.
- The path only ever moves **down** or **right**.
- The resulting parentheses string formed by the path is **valid**.

Return `true` *if there exists a valid parentheses string path in the grid. Otherwise, return* `false`.

---

### Examples

#### Example 1:

- **Input:** `grid = [["(","(",")"],[")","(",")"],["(","(",")"],["(","(",")"]]`
- **Output:** `true`
- **Explanation:** The diagram shows two possible paths that form valid parentheses strings.
  - The first path shown results in the valid parentheses string `"()(())"`.
  - The second path shown results in the valid parentheses string `"((()))"`.
  - Note that there may be other valid parentheses string paths.

#### Example 2:

- **Input:** `grid = [[")",")"],["(","("]]`
- **Output:** `false`
- **Explanation:** The two possible paths form the parentheses strings `")("` and `")("`. Since neither of them are valid parentheses strings, we return `false`.

---

### Constraints

- $m == \text{grid.length}$
- $n == \text{grid}[i]\text{.length}$
- $1 \le m, n \le 100$
- `grid[i][j]` is either `'('` or `')'`.

---

## Topics and Tags

- **Array**
- **Dynamic Programming**
- **Matrix**

---

## Intuition and Approach

### Key Observations:
1. **Path Length:**
   Any path from `(0, 0)` to `(m - 1, n - 1)` moving only down and right visits exactly $m + n - 1$ cells.
   - For a parentheses string to be valid, its length must be **even**. If $m + n - 1$ is odd, return `false` immediately.
2. **Boundary Conditions:**
   - Any valid parentheses string must begin with `'('` and end with `')'`.
   - Therefore, if `grid[0][0] == ')'` or `grid[m - 1][n - 1] == '(' `, return `false` immediately.
3. **Maximum Balance:**
   - For the string to balance out to $0$ by cell `(m - 1, n - 1)`, the total number of `'('` along the path must equal $(m + n - 1) / 2$.
   - Thus, the running balance (number of open parentheses minus closed parentheses) can never exceed `maxBal = (m + n - 1) / 2`.
   - Furthermore, the running balance can never drop below $0$.

### 3D Dynamic Programming:
- **State Definition:**
  Let `dp[i][j][b]` be a boolean indicating whether it is possible to reach cell `(i, j)` with an open parenthesis balance of `b`.
- **Transitions:**
  At cell `(i, j)`, the delta contributed is:
  $$\Delta = \begin{cases} +1 & \text{if } grid[i][j] = \text{'('} \\ -1 & \text{if } grid[i][j] = \text{')'} \end{cases}$$
  To have balance `b` at `(i, j)`, the previous balance at `(i - 1, j)` or `(i, j - 1)` must have been `prev = b - delta`.
  $$\text{dp}[i][j][b] = (\text{dp}[i - 1][j][prev] \lor \text{dp}[i][j - 1][prev]) \quad \text{for } 0 \le prev \le maxBal$$
- **Base Case:**
  At starting cell `(0, 0)`, `grid[0][0] == '(' `, so `dp[0][0][1] = true`.
- **Final Result:**
  Return `dp[m - 1][n - 1][0]`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(m \times n \times \frac{m + n}{2})$
  - Grid size is $m \times n \le 10^4$.
  - Maximum balance $\frac{m + n - 1}{2} \le 100$.
  - Total operations bounded by $10^4 \times 100 \approx 10^6$, executing well within runtime limits ($< 25\text{ ms}$).
- **Auxiliary Space Complexity:** $\mathcal{O}(m \times n \times \frac{m + n}{2})$
  - 3D boolean array of dimensions $m \times n \times (maxBal + 2)$ occupying minimal contiguous memory.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
