# LeetCode 3043: Find the Length of the Longest Common Prefix

- **Publication Date:** 21 May 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/find-the-length-of-the-longest-common-prefix/](https://leetcode.com/problems/find-the-length-of-the-longest-common-prefix/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/PYKXRx2E_fQ)

---

## Problem Summary

You are given two arrays with positive integers `arr1` and `arr2`.

A **prefix** of a positive integer is an integer formed by one or more of its digits, starting from its leftmost digit. For example, `123` is a prefix of the integer `12345`, while `234` is not.

A **common prefix** of two integers `a` and `b` is an integer `c`, such that `c` is a prefix of both `a` and `b`. For example, `5655359` and `56554` have common prefixes `565` and `5655`, while `1223` and `43456` do not have a common prefix.

You need to find the length of the **longest common prefix** between all pairs of integers `(x, y)` such that `x` belongs to `arr1` and `y` belongs to `arr2`.

Return the length of the **longest common prefix** among all pairs. If no common prefix exists among them, return `0`.

---

### Examples

#### Example 1:
- **Input:** `arr1 = [1, 10, 100]`, `arr2 = [1000]`
- **Output:** `3`
- **Explanation:**
  - There are 3 pairs `(arr1[i], arr2[j])`:
    - The longest common prefix of `(1, 1000)` is `1` (length 1).
    - The longest common prefix of `(10, 1000)` is `10` (length 2).
    - The longest common prefix of `(100, 1000)` is `100` (length 3).
  - The longest common prefix is `100` with length `3`.

#### Example 2:
- **Input:** `arr1 = [1, 2, 3]`, `arr2 = [4, 4, 4]`
- **Output:** `0`
- **Explanation:**
  - There exists no common prefix for any pair `(arr1[i], arr2[j])`, hence return `0`.

---

### Constraints

- $1 \le \text{arr1.length}, \text{arr2.length} \le 5 \times 10^4$
- $1 \le \text{arr1}[i], \text{arr2}[j] \le 10^8$

---

## Topics and Tags

- **Array**
- **Hash Table**
- **String**
- **Trie**

---

## Approach & Intuition

### 1. Numerical Prefix Generation

Rather than converting every number to strings or building a full digit Trie, we can extract numerical prefixes via simple arithmetic division by $10$:
- Any prefix of an integer $x$ is obtained by repeatedly calculating $\lfloor x / 10 \rfloor$ until $x = 0$.
- For example, if $x = 12345$, its numerical prefixes are $12345, 1234, 123, 12,$ and $1$.
- Since numbers are bounded by $10^8$, each integer has at most $8$ to $9$ prefixes.

### 2. Prefix Hash Set Lookup ($\mathcal{O}((N + M) \cdot D)$)

1. **Build Step:**
   - Iterate through every integer in `arr1`.
   - Repeatedly divide by $10$ and insert every prefix into a hash set `prefixes`.
2. **Query Step:**
   - Iterate through every integer in `arr2`.
   - Scan its prefixes from longest to shortest (`val = val / 10`).
   - If the current prefix is found in `prefixes`, update `maxLength = max(maxLength, length(val))` and `break` (since any subsequent prefix of this number will strictly have a smaller length).
3. Return `maxLength`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}((N + M) \cdot D)$
  - Let $N = \text{arr1.length}$, $M = \text{arr2.length}$, and $D = \lfloor\log_{10}(\max(\text{arr}))\rfloor + 1 \le 9$.
  - Generating prefixes for `arr1` takes $\mathcal{O}(N \cdot D)$ operations.
  - Querying prefixes for `arr2` takes $\mathcal{O}(M \cdot D)$ operations.
  - Overall time: $\approx 10^5 \times 9 \approx 9 \times 10^5$ operations ($\approx 40\text{ ms}$), well within the $2\text{ s}$ limit.

- **Auxiliary Space Complexity:** $\mathcal{O}(N \cdot D)$
  - The `prefixes` hash set holds at most $N \times 9$ integer elements.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/PYKXRx2E_fQ](https://youtu.be/PYKXRx2E_fQ)
