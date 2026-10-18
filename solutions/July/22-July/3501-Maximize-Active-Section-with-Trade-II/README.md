# LeetCode 3501: Maximize Active Section with Trade II

- **Publication Date:** 22 July 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/maximize-active-section-with-trade-ii/](https://leetcode.com/problems/maximize-active-section-with-trade-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/9kIrRN4puCg?si=YbIMGvSScucVlfdu)

---

## Problem Summary

You are given a binary string `s` of length `n`, where:
- `'1'` represents an **active section**.
- `'0'` represents an **inactive section**.

You can perform **at most one trade** to maximize the number of active sections in `s`. In a trade, you:
1. Convert a contiguous block of `'1'`s that is surrounded by `'0'`s to all `'0'`s.
2. Afterward, convert a contiguous block of `'0'`s that is surrounded by `'1'`s to all `'1'`s.

Additionally, you are given a 2D array `queries`, where `queries[i] = [l_i, r_i]` represents a substring `s[l_i...r_i]`.

For each query, determine the **maximum possible number of active sections** in `s` after making the optimal trade on the substring `s[l_i...r_i]`.

Return an array `answer`, where `answer[i]` is the result for `queries[i]`.

> [!NOTE]
> - For each query, treat `s[l_i...r_i]` as if it is **augmented** with a `'1'` at both ends, forming $t = \text{'1'} + s[l_i...r_i] + \text{'1'}$. The augmented `'1'`s do not contribute to the final count.
> - The queries are independent of each other.

---

### Examples

#### Example 1:

- **Input:** `s = "01", queries = [[0,1]]`
- **Output:** `[1]`
- **Explanation:**
  - Because there is no block of `'1'`s surrounded by `'0'`s, no valid trade is possible.
  - The maximum number of active sections is `1`.

#### Example 2:

- **Input:** `s = "0100", queries = [[0,3],[0,2],[1,3],[2,3]]`
- **Output:** `[4,3,1,1]`
- **Explanation:**
  - `Query [0, 3]`: Substring `"0100"` $\rightarrow$ Augmented to `"101001"`. Convert `"010"` $\rightarrow$ `"000"` $\rightarrow$ `"1111"`. Result = `4`.
  - `Query [0, 2]`: Substring `"010"` $\rightarrow$ Augmented to `"10101"`. Convert `"010"` $\rightarrow$ `"000"` $\rightarrow$ `"1110"`. Result = `3`.
  - `Query [1, 3]`: Substring `"100"` $\rightarrow$ Augmented to `"11001"`. No block of `'1'`s surrounded by `'0'`s. Result = `1`.
  - `Query [2, 3]`: Substring `"00"` $\rightarrow$ Augmented to `"1001"`. No block of `'1'`s surrounded by `'0'`s. Result = `1`.

#### Example 3:

- **Input:** `s = "1000100", queries = [[1,5],[0,6],[0,4]]`
- **Output:** `[6,7,2]`

#### Example 4:

- **Input:** `s = "01010", queries = [[0,3],[1,4],[1,3]]`
- **Output:** `[4,4,2]`

---

### Constraints

- $1 \le n == \text{s.length} \le 10^5$
- $1 \le \text{queries.length} \le 10^5$
- `s[i]` is either `'0'` or `'1'`
- $\text{queries}[i] = [l_i, r_i]$
- $0 \le l_i \le r_i < n$

---

## Algorithmic Approach

### 1. The Core Insight
In Part I of this problem, flipping an interior block of `'1'`s that is sandwiched between two blocks of `'0'`s of sizes $L_1$ and $L_2$ yields a net gain of $L_1 + L_2$ active sections.

In this query-based version, each query specifies a range $[l, r]$. An interior candidate `'1'`-run at indices $[\text{start}, \text{end}]$ is valid for the query if and only if it is strictly surrounded by `'0'`s *within* the range $[l, r]$, meaning:
$$\text{start} > l \quad \text{and} \quad \text{end} < r$$

### 2. Candidate Representation & Classification
1. **Run-Length Encoding:** Compress $s$ into contiguous runs of `'0'`s and `'1'`s.
2. **Identify Candidate 1-Runs:** Every `'1'`-run not touching the global ends of $s$ has a preceding `'0'`-run of length $\text{fullZL}$ and a succeeding `'0'`-run of length $\text{fullZR}$. Its maximum unclipped gain is:
   $$\text{fullG} = \text{fullZL} + \text{fullZR}$$
3. For a query $[l, r]$:
   - Use binary search (`upper_bound` on $\text{candStart}$ and `lower_bound` on $\text{candEnd}$) to locate the range of candidate indices $[i_{\text{lo}}, i_{\text{hi}}]$ that strictly satisfy $\text{start} > l$ and $\text{end} < r$.
   - **Internal Candidates** in $[i_{\text{lo}} + 1, i_{\text{hi}} - 1]$ have their full left and right zero-runs completely within $[l, r]$. We can query the maximum $\text{fullG}$ in this range in $\mathcal{O}(1)$ time using a **Sparse Table**.
   - **Boundary Candidates** $i_{\text{lo}}$ and $i_{\text{hi}}$ may have their adjacent zero-runs partially clipped by $l$ or $r$:
     $$\text{clippedZL} = \min(\text{start} - l, \text{fullZL}), \quad \text{clippedZR} = \min(r - \text{end}, \text{fullZR})$$
     $$\text{Gain}_{\text{clipped}} = \text{clippedZL} + \text{clippedZR}$$

### 3. Answering Queries in $\mathcal{O}(1)$
- Compute $\text{gain} = \max(\text{internalRMQ}, \text{clipLo}, \text{clipHi})$.
- The query answer is $\text{totalOnes} + \text{gain}$.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(n \log n + q)$ | Precomputing runs and building the Sparse Table takes $\mathcal{O}(n \log n)$. Each query takes $\mathcal{O}(1)$ with binary search and Sparse Table lookup. |
| **Auxiliary Space** | $\mathcal{O}(n \log n)$ | The Sparse Table requires $\mathcal{O}(n \log n)$ space for the candidate array. |

---

## Multi-Language Implementations

- [Java Solution](./Solution.java)
- [Python Solution](./solution.py)
- [C++ Solution](./solution.cpp)
- [JavaScript Solution](./solution.js)
