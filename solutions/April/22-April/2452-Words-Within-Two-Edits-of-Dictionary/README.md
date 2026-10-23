# LeetCode 2452: Words Within Two Edits of Dictionary

- **Publication Date:** 22 April 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/words-within-two-edits-of-dictionary/](https://leetcode.com/problems/words-within-two-edits-of-dictionary/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/KlqGwazW-xE)

---

## Problem Summary

You are given two string arrays, `queries` and `dictionary`. All words in each array comprise of lowercase English letters and have the same length.

In one edit you can take a word from `queries`, and change any letter in it to any other letter. Find all words from `queries` that, after a maximum of **two edits**, equal some word from `dictionary`.

Return a list of all words from `queries`, that match with some word from `dictionary` after a maximum of two edits. Return the words in the **same order** they appear in `queries`.

---

### Examples

#### Example 1:
- **Input:** `queries = ["word","note","ants","wood"], dictionary = ["wood","joke","moat"]`
- **Output:** `["word","note","wood"]`
- **Explanation:**
  - Changing the `'r'` in `"word"` to `'o'` allows it to equal the dictionary word `"wood"`.
  - Changing the `'n'` to `'j'` and the `'t'` to `'k'` in `"note"` changes it to `"joke"`.
  - It would take more than 2 edits for `"ants"` to equal a dictionary word.
  - `"wood"` can remain unchanged (0 edits) and match the corresponding dictionary word.
  - Thus, we return `["word","note","wood"]`.

#### Example 2:
- **Input:** `queries = ["yes"], dictionary = ["not"]`
- **Output:** `[]`
- **Explanation:**
  - Applying any two edits to `"yes"` cannot make it equal to `"not"`. Thus, we return an empty array `[]`.

---

### Constraints

- $1 \le \text{queries.length}, \text{dictionary.length} \le 100$
- $n == \text{queries}[i].\text{length} == \text{dictionary}[j].\text{length}$
- $1 \le n \le 100$
- All $\text{queries}[i]$ and $\text{dictionary}[j]$ are composed of lowercase English letters.

---

## Topics and Tags

- **Array**
- **String**
- **Trie**

---

## Approach & Intuition

### 1. Hamming Distance Formulation

- Changing a letter in `query` to match `dictionary[j]` is equivalent to counting positional character differences (Hamming distance).
- A word `query` is valid if and only if there exists at least one word `word` in `dictionary` such that:
  $$\text{dist}(query, word) = \sum_{k=0}^{L-1} \mathbb{I}(query[k] \ne word[k]) \le 2$$

### 2. Pairwise Comparison with Early Pruning

- Given the problem constraints:
  - $|\text{queries}| \le 100$
  - $|\text{dictionary}| \le 100$
  - $L \le 100$
- Comparing every query word against dictionary words performs at most $100 \times 100 = 10^4$ pairwise checks.
- Inside the inner comparison loop, we iterate character by character. If the count of mismatches exceeds $2$, we immediately `break` out of the comparison (early pruning).
- The moment any dictionary word matches a query within $\le 2$ edits, we add the query to our result and proceed to the next query, avoiding redundant comparisons.
- Total worst-case character comparisons are bounded by $10^4 \times 100 = 10^6$ operations, which easily runs in $\approx 2\text{ ms}$ with zero auxiliary memory overhead.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(Q \cdot D \cdot L)$
  - Where $Q = \text{queries.length} \le 100$, $D = \text{dictionary.length} \le 100$, and $L = \text{word length} \le 100$.
  - In practice, early pruning terminates mismatched comparisons after encountering only 3 mismatches.
  - Worst case: $\le 10^6$ operations, executing in $< 5\text{ ms}$.

- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Excluding the output list, no additional memory structures or heap allocations are required.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/KlqGwazW-xE](https://youtu.be/KlqGwazW-xE)
