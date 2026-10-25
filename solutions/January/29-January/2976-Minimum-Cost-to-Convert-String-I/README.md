# LeetCode 2976: Minimum Cost to Convert String I

- **Publication Date:** 29 January 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-cost-to-convert-string-i/](https://leetcode.com/problems/minimum-cost-to-convert-string-i/)
- **YouTube Solution:** *Coming Soon* ⏳

---

## Problem Summary

You are given two 0-indexed strings `source` and `target`, both of length $n$ and consisting of lowercase English letters. You are also given two 0-indexed character arrays `original` and `changed`, and an integer array `cost`, where `cost[i]` represents the cost of changing the character `original[i]` to the character `changed[i]`.

You start with the string `source`. In one operation, you can pick a character $x$ from the string and change it to the character $y$ at a cost of $z$ if there exists any index $j$ such that $\text{cost}[j] == z$, $\text{original}[j] == x$, and $\text{changed}[j] == y$.

Return the **minimum cost** to convert the string `source` to the string `target` using any number of operations. If it is impossible to convert `source` to `target`, return `-1`.

Note that there may exist indices $i, j$ such that $\text{original}[j] == \text{original}[i]$ and $\text{changed}[j] == \text{changed}[i]$.

---

### Examples

#### Example 1:
- **Input:** `source = "abcd", target = "acbe", original = ["a","b","c","c","e","d"], changed = ["b","c","b","e","b","e"], cost = [2,5,5,1,2,20]`
- **Output:** `28`
- **Explanation:**
  - Change index $1$ from `'b'` to `'c'` at cost $5$.
  - Change index $2$ from `'c'` to `'e'` at cost $1$.
  - Change index $2$ from `'e'` to `'b'` at cost $2$ (total cost for index $2$: $1 + 2 = 3$).
  - Change index $3$ from `'d'` to `'e'` at cost $20$.
  - Total cost: $5 + 1 + 2 + 20 = 28$.

#### Example 2:
- **Input:** `source = "aaaa", target = "bbbb", original = ["a","c"], changed = ["c","b"], cost = [1,2]`
- **Output:** `12`
- **Explanation:**
  - Change `'a'` to `'c'` (cost $1$) and then `'c'` to `'b'` (cost $2$), with a total conversion cost of $3$ per character.
  - Converting all $4$ occurrences incurs $4 \times 3 = 12$.

#### Example 3:
- **Input:** `source = "abcd", target = "abce", original = ["a"], changed = ["e"], cost = [10000]`
- **Output:** `-1`
- **Explanation:**
  - It is impossible to convert character `'d'` to `'e'`.

---

### Constraints

- $1 \le \text{source.length} == \text{target.length} \le 10^5$
- `source` and `target` consist of lowercase English letters.
- $1 \le \text{cost.length} == \text{original.length} == \text{changed.length} \le 2000$
- `original[i]`, `changed[i]` are lowercase English letters.
- $1 \le \text{cost}[i] \le 10^6$
- `original[i] != changed[i]`

---

## Topics and Tags

- **Array**
- **String**
- **Graph**
- **Shortest Path**

---

## Approach & Intuition

### Key Observations

1. **Independent Character Transformations:**
   - Changing character at index $i$ is completely independent from changing character at index $j$.
   - Thus, the minimum total cost is simply the sum of minimum conversion costs for each index where $\text{source}[i] \ne \text{target}[i]$.

2. **Fixed Alphabet Size (26 Nodes):**
   - The characters are strictly lowercase English letters (`'a'` to `'z'`), meaning our transformation graph has only $|\Sigma| = 26$ vertices.
   - Any character conversion can take multiple intermediate hops (e.g., $'a' \to 'c' \to 'b'$).
   - This directly maps to the **All-Pairs Shortest Path (APSP)** problem on a directed, weighted graph with 26 vertices.

3. **Floyd-Warshall Algorithm:**
   - With $|\Sigma| = 26$, Floyd-Warshall runs in $\mathcal{O}(|\Sigma|^3) = 26^3 = 17,576$ iterations, which executes virtually instantaneously ($< 1\text{ ms}$).
   - Initialize $\text{dist}[u][v] = \infty$, $\text{dist}[u][u] = 0$.
   - When populating edges, take the minimum weight if multiple operations transform the same character pair.
   - Apply the standard triple loop:
     $$\text{dist}[i][j] = \min(\text{dist}[i][j], \text{dist}[i][k] + \text{dist}[k][j])$$

4. **Linear String Conversion:**
   - Iterate through strings `source` and `target`.
   - If $\text{source}[i] \ne \text{target}[i]$:
     - If $\text{dist}[\text{source}[i]][\text{target}[i]] == \infty$, transformation is impossible, return `-1`.
     - Otherwise, add the distance to a 64-bit running sum `totalCost` (to prevent integer overflow).

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(|\Sigma|^3 + |E| + N)$
  - With $|\Sigma| = 26$, $|E| \le 2000$, and $N \le 10^5$, the graph precomputation takes $17,576$ operations and string traversal takes $10^5$ operations. Total execution time is $\approx 1$–$2\text{ ms}$.
- **Space Complexity:** $\mathcal{O}(|\Sigma|^2) = \mathcal{O}(1)$ auxiliary space
  - The $26 \times 26$ distance matrix occupies constant auxiliary space.

---

## Solutions

- [Java Solution](./Solution.java)
- [Python Solution](./solution.py)
- [C++ Solution](./solution.cpp)
- [JavaScript Solution](./solution.js)
