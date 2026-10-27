# LeetCode 2977: Minimum Cost to Convert String II

- **Publication Date:** 30 January 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/minimum-cost-to-convert-string-ii/](https://leetcode.com/problems/minimum-cost-to-convert-string-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/7otHCCy-CWY?si=pmS_lWwePqxklBER)

---

## Problem Summary

You are given two 0-indexed strings `source` and `target`, both of length $n$ and consisting of lowercase English characters. You are also given two 0-indexed string arrays `original` and `changed`, and an integer array `cost`, where `cost[i]` represents the cost of converting the string `original[i]` to the string `changed[i]`.

You start with the string `source`. In one operation, you can pick a substring $x$ from the string, and change it to $y$ at a cost of $z$ if there exists any index $j$ such that $\text{cost}[j] == z$, $\text{original}[j] == x$, and $\text{changed}[j] == y$. You are allowed to do any number of operations, but any pair of operations must satisfy either of these two conditions:
- **Disjoint:** The substrings picked in the operations are `source[a..b]` and `source[c..d]` with either $b < c$ or $d < a$.
- **Identical:** The substrings picked in the operations are `source[a..b]` and `source[c..d]` with $a == c$ and $b == d$.

Return the **minimum cost** to convert the string `source` to the string `target` using any number of operations. If it is impossible to convert `source` to `target`, return `-1`.

Note that there may exist indices $i, j$ such that $\text{original}[j] == \text{original}[i]$ and $\text{changed}[j] == \text{changed}[i]$.

---

### Examples

#### Example 1:
- **Input:** `source = "abcd", target = "acbe", original = ["a","b","c","c","e","d"], changed = ["b","c","b","e","b","e"], cost = [2,5,5,1,2,20]`
- **Output:** `28`
- **Explanation:**
  - Change substring `source[1..1]` from `"b"` to `"c"` at a cost of $5$.
  - Change substring `source[2..2]` from `"c"` to `"e"` at a cost of $1$.
  - Change substring `source[2..2]` from `"e"` to `"b"` at a cost of $2$.
  - Change substring `source[3..3]` from `"d"` to `"e"` at a cost of $20$.
  - Total cost: $5 + 1 + 2 + 20 = 28$.

#### Example 2:
- **Input:** `source = "abcdefgh", target = "acdeeghh", original = ["bcd","fgh","thh"], changed = ["cde","thh","ghh"], cost = [1,3,5]`
- **Output:** `9`
- **Explanation:**
  - Change substring `source[1..3]` from `"bcd"` to `"cde"` at a cost of $1$.
  - Change substring `source[5..7]` from `"fgh"` to `"thh"` at a cost of $3$. (Disjoint from `[1, 3]`).
  - Change substring `source[5..7]` from `"thh"` to `"ghh"` at a cost of $5$. (Identical to `[5, 7]`).
  - Total cost: $1 + 3 + 5 = 9$.

#### Example 3:
- **Input:** `source = "abcdefgh", target = "addddddd", original = ["bcd","defgh"], changed = ["ddd","ddddd"], cost = [100,1578]`
- **Output:** `-1`
- **Explanation:**
  - Substrings `"bcd"` (`[1..3]`) and `"defgh"` (`[3..7]`) share common index $3$. They are neither disjoint nor identical, making conversion impossible.

---

### Constraints

- $1 \le \text{source.length} == \text{target.length} \le 1000$
- `source` and `target` consist only of lowercase English characters.
- $1 \le \text{cost.length} == \text{original.length} == \text{changed.length} \le 100$
- $1 \le \text{original}[i].\text{length} == \text{changed}[i].\text{length} \le \text{source.length}$
- `original[i]`, `changed[i]` consist only of lowercase English characters.
- `original[i] != changed[i]`
- $1 \le \text{cost}[i] \le 10^6$

---

## Topics and Tags

- **Graph**
- **Shortest Path**
- **Dynamic Programming**
- **String**

---

## Approach & Intuition

### Key Observations

1. **Partitioning Into Non-Overlapping Intervals:**
   - Any two operations must have either disjoint indices or identical indices.
   - If two operations have identical indices $[j, i-1]$, they chain together as intermediate transformations on the exact same substring:
     $$\text{source}[j..i-1] \to W_1 \to W_2 \to \dots \to \text{target}[j..i-1]$$
   - If two operations affect different regions, their index ranges must be completely disjoint.
   - Therefore, the problem reduces to partitioning $\text{source}$ into a sequence of disjoint segments, where each segment is either unchanged (cost $0$) or transformed into the corresponding segment in $\text{target}$ via a shortest path of substring operations.

2. **Graph of Unique Substrings:**
   - Notice that $\text{cost.length} \le 100$. Thus, there are at most $200$ unique strings across `original` and `changed` combined ($V \le 200$).
   - We assign an integer ID $0 \le \text{id} < V$ to each unique string.
   - For all edges $(u, v)$ with weight $\text{cost}[i]$, we compute all-pairs shortest paths using **Floyd-Warshall Algorithm**.
   - With $V \le 200$ and $E \le 100$, pruning unreachable intermediate vertices (`dist[i][k] < INF`) enables Floyd-Warshall to finish in just a few milliseconds.

3. **1D Dynamic Programming:**
   - Define $\text{dp}[i]$ as the minimum cost to convert prefix $\text{source}[0..i-1]$ to $\text{target}[0..i-1]$.
   - Base case: $\text{dp}[0] = 0$.
   - Transitions for $\text{dp}[i]$:
     - **Match without operation:** If $\text{source}[i-1] == \text{target}[i-1]$, $\text{dp}[i] = \min(\text{dp}[i], \text{dp}[i-1])$.
     - **Substring transformation:** For every distinct length $L$ present in `original`, check if $\text{source}[i-L..i-1]$ can be converted to $\text{target}[i-L..i-1]$:
       $$\text{dp}[i] = \min(\text{dp}[i], \text{dp}[i-L] + \text{dist}[u][v])$$

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(V^3 + N \cdot |lengths| \cdot L_{\max})$
  - Number of unique strings $V \le 200$, Floyd-Warshall takes $\mathcal{O}(V^3)$ operations ($< 10\text{ ms}$).
  - String length $N \le 1000$ and number of distinct lengths $|lengths| \le 100$, leading to at most $10^5$ substring lookups.
  - Overall time is $\approx 10\text{–}15\text{ ms}$.
- **Space Complexity:** $\mathcal{O}(V^2 + N)$
  - $200 \times 200$ distance matrix and $N + 1$ DP table require minimal auxiliary memory.

---

## Solutions

- [Java Solution](./Solution.java)
- [Python Solution](./solution.py)
- [C++ Solution](./solution.cpp)
- [JavaScript Solution](./solution.js)
