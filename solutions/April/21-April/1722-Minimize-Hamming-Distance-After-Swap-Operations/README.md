# LeetCode 1722: Minimize Hamming Distance After Swap Operations

- **Publication Date:** 21 April 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimize-hamming-distance-after-swap-operations/](https://leetcode.com/problems/minimize-hamming-distance-after-swap-operations/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/ETnUAa-Gm8o)

---

## Problem Summary

You are given two integer arrays, `source` and `target`, both of length `n`. You are also given an array `allowedSwaps` where each `allowedSwaps[i] = [ai, bi]` indicates that you are allowed to swap the elements at index `ai` and index `bi`.

The **Hamming distance** between two arrays of the same length, `source` and `target`, is the number of positions where the elements are different.

You can apply the swap operations any number of times on `source`.

Return *the **minimum Hamming distance** of `source` and `target` after applying any number of swap operations on `source`*.

---

### Examples

#### Example 1:
- **Input:** `source = [1,2,3,4], target = [2,1,4,5], allowedSwaps = [[0,1],[2,3]]`
- **Output:** `1`
- **Explanation:** `source` can be transformed the following way:
  - Swap index 0 and 1: `source = [2,1,3,4]`
  - Swap index 2 and 3: `source = [2,1,4,3]`
  The Hamming distance of `source` and `target` is 1 as they differ at index 3 (`target[3] = 5` and `source[3] = 3`).

#### Example 2:
- **Input:** `source = [1,2,3,4], target = [1,3,2,4], allowedSwaps = []`
- **Output:** `2`
- **Explanation:** There are no allowed swaps.
  The Hamming distance of `source` and `target` is 2 as they differ at index 1 and 2.

#### Example 3:
- **Input:** `source = [5,1,2,4,3], target = [1,5,4,2,3], allowedSwaps = [[0,4],[4,2],[1,3],[1,4]]`
- **Output:** `0`
- **Explanation:** `source` can be transformed the following way:
  - Swap index 0 and 4: `source = [3,1,2,4,5]`
  - Swap index 4 and 2: `source = [3,1,5,4,2]`
  - Swap index 1 and 3: `source = [3,4,5,1,2]`
  - Swap index 1 and 4: `source = [3,2,5,1,4]`
  - Swap index 0 and 4: `source = [4,2,5,1,3]`
  - Swap index 0 and 1: `source = [2,4,5,1,3]`
  - Swap index 0 and 2: `source = [5,4,2,1,3]`
  - Swap index 1 and 3: `source = [5,1,2,4,3]`
  - Swap index 0 and 1: `source = [1,5,2,4,3]`
  - Swap index 2 and 3: `source = [1,5,4,2,3]`
  The Hamming distance of `source` and `target` is 0.

---

### Constraints

- $n == \text{source.length} == \text{target.length}$
- $1 \le n \le 10^5$
- $1 \le \text{source}[i], \text{target}[i] \le 10^5$
- $0 \le \text{allowedSwaps.length} \le 10^5$
- $\text{allowedSwaps}[i].\text{length} == 2$
- $0 \le a_i, b_i \le n - 1$
- $a_i \ne b_i$

---

## Topics and Tags

- **Array**
- **Depth-First Search**
- **Union Find**

---

## Approach & Intuition

### 1. Connected Components via Disjoint Set Union (DSU)

- Swapping elements between two indices $a$ and $b$ is symmetric and transitive: if we can swap index $a$ with index $b$, and index $b$ with index $c$, we can arbitrarily permute elements across all indices in the connected component $\{a, b, c\}$.
- Hence, the indices partition into **independent connected components**. Any multiset of values in `source` within a component can be rearranged in any arbitrary permutation among the indices belonging to that same component.

### 2. Multiset Frequency Matching

For each connected component:
1. Collect the multiset of values of `source` residing at the component's indices (using a frequency hash map keyed by component root).
2. For each index $i$ in the component:
   - Check if $\text{target}[i]$ is present in the component's frequency map with count $> 0$.
   - If present, we greedily assign that matching value to index $i$ and decrement its count.
   - If not present, that position cannot match $\text{target}[i]$, so it contributes $+1$ to the Hamming distance.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N + M \cdot \alpha(N))$
  - Building the DSU takes $\mathcal{O}(M \cdot \alpha(N))$ where $M$ is the number of swap pairs and $\alpha$ is the Inverse Ackermann function.
  - Grouping values and matching with `target` requires $\mathcal{O}(N)$ hash map operations on average.
  - Overall time complexity is nearly linear $\mathcal{O}(N + M)$, easily finishing within $\approx 40\text{ ms}$.

- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - Storing parent and rank arrays for $N$ elements in DSU.
  - Component frequency hash maps store at most $N$ elements across all components combined.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/ETnUAa-Gm8o](https://youtu.be/ETnUAa-Gm8o)
