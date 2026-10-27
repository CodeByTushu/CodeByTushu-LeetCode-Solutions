# LeetCode 744: Find Smallest Letter Greater Than Target

- **Publication Date:** 31 January 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/find-smallest-letter-greater-than-target/](https://leetcode.com/problems/find-smallest-letter-greater-than-target/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/Pt4_8nhkxfk?si=0EU4e6m0PpcshgCZ)

---

## Problem Summary

You are given an array of characters `letters` that is sorted in **non-decreasing** order, and a character `target`. There are **at least two different characters** in `letters`.

Return the smallest character in `letters` that is lexicographically greater than `target`. If such a character does not exist, return the first character in `letters` (wrap-around behavior).

---

### Examples

#### Example 1:
- **Input:** `letters = ["c","f","j"], target = "a"`
- **Output:** `"c"`
- **Explanation:** The smallest character that is lexicographically greater than `'a'` in `letters` is `'c'`.

#### Example 2:
- **Input:** `letters = ["c","f","j"], target = "c"`
- **Output:** `"f"`
- **Explanation:** The smallest character that is lexicographically greater than `'c'` in `letters` is `'f'`.

#### Example 3:
- **Input:** `letters = ["x","x","y","y"], target = "z"`
- **Output:** `"x"`
- **Explanation:** There are no characters in `letters` that are lexicographically greater than `'z'`, so we wrap around and return `letters[0]`.

---

### Constraints

- $2 \le \text{letters.length} \le 10^4$
- `letters[i]` is a lowercase English letter.
- `letters` is sorted in **non-decreasing** order.
- `letters` contains at least two different characters.
- `target` is a lowercase English letter.

---

## Topics and Tags

- **Array**
- **Binary Search**

---

## Approach & Intuition

### Key Observations

1. **Sorted Array Structure:**
   - Because `letters` is sorted in non-decreasing order, the task directly corresponds to finding the **upper bound** of `target` — i.e., the first character strictly greater than `target`.
   
2. **Binary Search (Upper Bound):**
   - Initialize search range $[0, n)$ where $n = \text{letters.length}$.
   - For each midpoint $\text{mid}$:
     - If $\text{letters}[\text{mid}] \le \text{target}$, the desired character must lie to the right: $\text{left} = \text{mid} + 1$.
     - If $\text{letters}[\text{mid}] > \text{target}$, $\text{mid}$ could be our answer, but there might be an earlier candidate: $\text{right} = \text{mid}$.
   - Upon termination, `left` points to the index of the smallest character greater than `target`.

3. **Wrap-Around Logic:**
   - If no character is strictly greater than `target`, `left` will equal $n$.
   - Using modulo arithmetic, `letters[left % n]` cleanly returns `letters[0]` when `left == n`, eliminating the need for a separate conditional branch.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(\log N)$
  - Binary search halves the search space at each iteration over $N \le 10^4$ elements ($\le 14$ operations).
- **Space Complexity:** $\mathcal{O}(1)$ auxiliary space
  - Only a few scalar index pointers are maintained.

---

## Solutions

- [Java Solution](./Solution.java)
- [Python Solution](./solution.py)
- [C++ Solution](./solution.cpp)
- [JavaScript Solution](./solution.js)
