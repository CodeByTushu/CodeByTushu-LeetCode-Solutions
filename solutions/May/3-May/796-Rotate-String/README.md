# LeetCode 796: Rotate String

- **Publication Date:** 03 May 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/rotate-string/](https://leetcode.com/problems/rotate-string/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/ppNAV1CisvI)

---

## Problem Summary

Given two strings `s` and `goal`, return `true` *if and only if* `s` *can become* `goal` *after some number of shifts on* `s`.

A **shift** on `s` consists of moving the leftmost character of `s` to the rightmost position.
- For example, if `s = "abcde"`, then after one shift it becomes `"bcdea"`.

---

### Examples

#### Example 1:
- **Input:** `s = "abcde"`, `goal = "cdeab"`
- **Output:** `true`
- **Explanation:**
  - Shift 1: `"abcde"` $\to$ `"bcdea"`
  - Shift 2: `"bcdea"` $\to$ `"cdeab"` (matches `goal`)

#### Example 2:
- **Input:** `s = "abcde"`, `goal = "abced"`
- **Output:** `false`
- **Explanation:** No series of shifts can produce `"abced"` because the order of `'d'` and `'e'` is swapped.

---

### Constraints

- $1 \le \text{s.length}, \text{goal.length} \le 100$
- `s` and `goal` consist of lowercase English letters.

---

## Topics and Tags

- **String**
- **String Matching**

---

## Approach & Intuition

### 1. Invariant of String Rotations

When a string `s` of length $n$ is shifted left repeatedly:
- All possible cyclic shifts of `s` are substrings of length $n$ contained within the doubled string $s + s$.
- For example, if $s = \text{"abcde"}$:
  $$s + s = \text{"abcdeabcde"}$$
  The substrings of length $5$ are:
  - Offset 0: `"abcde"`
  - Offset 1: `"bcdea"`
  - Offset 2: `"cdeab"`
  - Offset 3: `"deabc"`
  - Offset 4: `"eabcd"`

### 2. Necessary & Sufficient Conditions

`s` can become `goal` after some number of shifts if and only if:
1. `s.length == goal.length` (both strings must have the exact same length).
2. `(s + s).contains(goal)` (`goal` must appear as a contiguous substring of $s + s$).

This allows solving the problem in a single line of code with optimal performance.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - Generating $s + s$ takes $\mathcal{O}(N)$ time.
  - Substring search on a string of length $2N$ takes $\mathcal{O}(N)$ time using standard library string matching algorithms (KMP / Boyer-Moore / Two-Way algorithm).
  - Since $N \le 100$, execution completes in microseconds.

- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - Creating the concatenated string $s + s$ of length $2N$ takes $\mathcal{O}(N)$ auxiliary memory.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/ppNAV1CisvI](https://youtu.be/ppNAV1CisvI)
