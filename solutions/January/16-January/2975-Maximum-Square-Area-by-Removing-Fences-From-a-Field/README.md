# LeetCode 2975: Maximum Square Area by Removing Fences From a Field

- **Publication Date:** 16 January 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/maximum-square-area-by-removing-fences-from-a-field/](https://leetcode.com/problems/maximum-square-area-by-removing-fences-from-a-field/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/IruczMQ2iAA?si=fpOyEtIdFgo8CY6o)

---

## Problem Summary

There is a large $(m - 1) \times (n - 1)$ rectangular field with corners at $(1, 1)$ and $(m, n)$ containing some horizontal and vertical fences given in integer arrays `hFences` and `vFences` respectively.

- Horizontal fences extend from coordinates $(hFences[i], 1)$ to $(hFences[i], n)$.
- Vertical fences extend from coordinates $(1, vFences[i])$ to $(m, vFences[i])$.
- The field is bounded by non-removable boundary horizontal fences at $y = 1$ and $y = m$, and non-removable boundary vertical fences at $x = 1$ and $x = n$.

You can remove any subset of the internal fences (possibly none).

Return the **maximum area of a square field** that can be formed by removing some fences, or `-1` if it is impossible to form any square field.

Since the answer may be large, return it **modulo** $10^9 + 7$.

---

### Examples

#### Example 1:
- **Input:** `m = 4, n = 3, hFences = [2,3], vFences = [2]`
- **Output:** `4`
- **Explanation:**
  - Removing horizontal fence $2$ and vertical fence $2$ leaves horizontal fences at $[1, 3]$ (or $[1, 4]$) and vertical fences at $[1, 3]$.
  - The remaining fences at $y \in \{1, 3\}$ and $x \in \{1, 3\}$ define a square field of side length $3 - 1 = 2$ and area $2 \times 2 = 4$.

#### Example 2:
- **Input:** `m = 6, n = 7, hFences = [2], vFences = [4]`
- **Output:** `-1`
- **Explanation:**
  - Horizontal fences: $\{1, 2, 6\}$. Possible horizontal side lengths: $\{2 - 1 = 1, 6 - 1 = 5, 6 - 2 = 4\}$.
  - Vertical fences: $\{1, 4, 7\}$. Possible vertical side lengths: $\{4 - 1 = 3, 7 - 1 = 6, 7 - 4 = 3\}$.
  - The intersection of horizontal and vertical side lengths is empty, so no square field can be formed.

---

### Constraints

- $3 \le m, n \le 10^9$
- $1 \le \text{hFences.length}, \text{vFences.length} \le 600$
- $1 < \text{hFences}[i] < m$
- $1 < \text{vFences}[i] < n$
- `hFences` and `vFences` contain unique elements.

---

## Topics and Tags

- **Array**
- **Hash Table**
- **Math**
- **Enumeration**
- **Geometry**

---

## Approach & Intuition

### 1. Understanding Valid Field Boundaries

1. **Independent Dimension Decomposition:**
   - Any contiguous field within the grid is formed by choosing two horizontal fence boundaries $y_1 < y_2$ and two vertical fence boundaries $x_1 < x_2$, then removing all intermediate fences lying strictly between them.
   - Any pair of horizontal fences from the full set $H = \{1, m\} \cup \text{hFences}$ can serve as the top and bottom edges, producing a height of $y_2 - y_1$.
   - Similarly, any pair of vertical fences from the full set $V = \{1, n\} \cup \text{vFences}$ can serve as the left and right edges, producing a width of $x_2 - x_1$.

2. **The Square Condition:**
   - For the resulting field to be square-shaped, its height must equal its width:
     $$y_2 - y_1 = x_2 - x_1 = d$$
   - Thus, a square field of side length $d$ exists if and only if $d$ is present in **both** the set of all pairwise horizontal fence differences and the set of all pairwise vertical fence differences.
   - To maximize the area, we want to find the largest common difference $d^* = \max(d)$.

### 2. Efficient Enumeration with Hash Set

- The number of horizontal fences is at most $600 + 2 = 602$, giving at most $\binom{602}{2} \approx 180,901$ pairs.
- Similarly, the vertical fence pairs number at most $\approx 180,901$.
- We can sort $H$ and insert all pairwise differences $y_j - y_i$ into a `HashSet`.
- Next, we sort $V$ and iterate through all pairwise differences $x_j - x_i$. If a difference exists in the hash set, we update our candidate maximum side length.
- If a valid $d^*$ is found, the answer is $(d^* \times d^*) \pmod{10^9 + 7}$. Otherwise, return `-1`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(H^2 + V^2)$, where $H = \text{hFences.length}$ and $V = \text{vFences.length}$.
  - Generating all horizontal differences takes $\mathcal{O}(H^2)$ insertions into a hash set ($\approx 1.8 \times 10^5$ operations).
  - Checking all vertical differences against the set takes $\mathcal{O}(V^2)$ lookups ($\approx 1.8 \times 10^5$ operations).
  - Total operations $\approx 3.6 \times 10^5$, executing in under $40\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(H^2)$ to store all unique horizontal differences in the hash set, requiring $\approx 2\text{ MB}$ of memory.

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
