# LeetCode 3499: Maximize Active Section with Trade I

- **Publication Date:** 21 July 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/maximize-active-section-with-trade-i/](https://leetcode.com/problems/maximize-active-section-with-trade-i/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/djKnC0xMFRQ?si=crs-Mjx_887YYAw9)

---

## Problem Summary

You are given a binary string `s` of length `n`, where:
- `'1'` represents an **active section**.
- `'0'` represents an **inactive section**.

You can perform **at most one trade** to maximize the number of active sections in `s`. In a trade, you:
1. Convert a contiguous block of `'1'`s that is surrounded by `'0'`s to all `'0'`s.
2. Afterward, convert a contiguous block of `'0'`s that is surrounded by `'1'`s to all `'1'`s.

Return the **maximum number of active sections** in `s` after making the optimal trade.

> [!NOTE]
> Treat `s` as if it is **augmented** with a `'1'` at both ends, forming $t = \text{'1'} + s + \text{'1'}$. The augmented `'1'`s do not contribute to the final count.

---

### Examples

#### Example 1:

- **Input:** `s = "01"`
- **Output:** `1`
- **Explanation:**
  - Because there is no block of `'1'`s surrounded by `'0'`s, no valid trade is possible.
  - The maximum number of active sections is `1`.

#### Example 2:

- **Input:** `s = "0100"`
- **Output:** `4`
- **Explanation:**
  - String `"0100"` $\rightarrow$ Augmented to `"101001"`.
  - Choose `"0100"`, convert `"101001"` $\rightarrow$ `"100001"` $\rightarrow$ `"111111"`.
  - The final string without augmentation is `"1111"`. The maximum number of active sections is `4`.

#### Example 3:

- **Input:** `s = "1000100"`
- **Output:** `7`
- **Explanation:**
  - String `"1000100"` $\rightarrow$ Augmented to `"110001001"`.
  - Choose `"000100"`, convert `"110001001"` $\rightarrow$ `"110000001"` $\rightarrow$ `"111111111"`.
  - The final string without augmentation is `"1111111"`. The maximum number of active sections is `7`.

#### Example 4:

- **Input:** `s = "01010"`
- **Output:** `4`
- **Explanation:**
  - String `"01010"` $\rightarrow$ Augmented to `"1010101"`.
  - Choose `"010"`, convert `"1010101"` $\rightarrow$ `"1000101"` $\rightarrow$ `"1111101"`.
  - The final string without augmentation is `"11110"`. The maximum number of active sections is `4`.

---

### Constraints

- $1 \le n == \text{s.length} \le 10^5$
- `s[i]` is either `'0'` or `'1'`

---

## Algorithmic Approach

### 1. Understanding the Trade Operation
A valid trade consists of two parts:
1. Converting a contiguous block of `'1'`s surrounded by `'0'`s into `'0'`s.
   - Suppose the `'1'`-block has length $L_{\text{ones}}$, flanked by a `'0'`-block of length $L_1$ on the left and $L_2$ on the right.
   - Turning this block into `'0'`s merges the three parts into a single giant block of `'0'`s of size $L_1 + L_{\text{ones}} + L_2$.
2. Converting a contiguous block of `'0'`s surrounded by `'1'`s into `'1'`s.
   - Because $s$ is augmented with `'1'`s at both boundaries ($t = \text{'1'} + s + \text{'1'}$), our newly merged `'0'`-block is now strictly flanked by `'1'`s on both sides.
   - We can turn the entire merged block into `'1'`s.

### 2. Net Gain Calculation
- Initial total `'1'`s in $s$: $\text{ones}$.
- When we execute the trade on adjacent zero blocks of sizes $L_1$ and $L_2$ separated by a `'1'`-block:
  $$\text{Gain} = (L_1 + L_{\text{ones}} + L_2) - L_{\text{ones}} = L_1 + L_2$$
- Therefore, each trade on consecutive zero blocks separated by a run of `'1'`s yields a net addition of $L_1 + L_2$ active sections!

### 3. Linear Single-Pass Scan
- Traverse $s$ and group consecutive characters into alternating runs of `'1'`s and `'0'`s.
- Accumulate the lengths of all `'1'` blocks into `ones`.
- Whenever a `'0'` block of length $L_2$ is encountered after a previous `'0'` block of length $L_1$ (separated by a `'1'` block):
  $$\text{maxMerge} = \max(\text{maxMerge}, L_1 + L_2)$$
- Update $L_1 = L_2$ and proceed.
- The final answer is:
  $$\text{Result} = \text{ones} + \text{maxMerge}$$

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(n)$ | We scan through the string in a single linear pass grouping consecutive characters. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Only a few primitive integer counters are maintained during the traversal. |

---

## Multi-Language Implementations

- [Java Solution](./Solution.java)
- [Python Solution](./solution.py)
- [C++ Solution](./solution.cpp)
- [JavaScript Solution](./solution.js)
