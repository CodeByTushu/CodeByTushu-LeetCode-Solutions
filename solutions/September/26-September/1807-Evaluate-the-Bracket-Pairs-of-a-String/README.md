# LeetCode 1807: Evaluate the Bracket Pairs of a String

- **Publication Date:** 26 September 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/evaluate-the-bracket-pairs-of-a-string/](https://leetcode.com/problems/evaluate-the-bracket-pairs-of-a-string/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/kyGkqOjhF5k?si=09TMHzctv23g4XlZ)

---

## Problem Summary

You are given a string `s` that contains some bracket pairs, with each pair containing a non-empty key.
- For example, in the string `"(name)is(age)yearsold"`, there are two bracket pairs that contain the keys `"name"` and `"age"`.

You know the values of a wide range of keys. This is represented by a 2D string array `knowledge` where each `knowledge[i] = [key_i, value_i]` indicates that key `key_i` has a value of `value_i`.

You are tasked to evaluate all of the bracket pairs. When you evaluate a bracket pair that contains some key `key_i`, you will:
- Replace `key_i` and the bracket pair with the key's corresponding `value_i`.
- If you do not know the value of the key, you will replace `key_i` and the bracket pair with a question mark `"?"` (without the quotation marks).

Each key will appear at most once in your `knowledge`. There will not be any nested brackets in `s`.

Return the resulting string after evaluating all of the bracket pairs.

---

### Examples

#### Example 1:
- **Input:** `s = "(name)is(age)yearsold"`, `knowledge = [["name","bob"],["age","two"]]`
- **Output:** `"bobistwoyearsold"`
- **Explanation:**
  - The key `"name"` has a value of `"bob"`, so replace `"(name)"` with `"bob"`.
  - The key `"age"` has a value of `"two"`, so replace `"(age)"` with `"two"`.

#### Example 2:
- **Input:** `s = "hi(name)"`, `knowledge = [["a","b"]]`
- **Output:** `"hi?"`
- **Explanation:** As you do not know the value of the key `"name"`, replace `"(name)"` with `"?"`.

#### Example 3:
- **Input:** `s = "(a)(a)(a)aaa"`, `knowledge = [["a","yes"]]`
- **Output:** `"yesyesyesaaa"`
- **Explanation:**
  - The same key can appear multiple times.
  - The key `"a"` has a value of `"yes"`, so replace all occurrences of `"(a)"` with `"yes"`.
  - Notice that the `"a"`s not in a bracket pair are not evaluated.

---

### Constraints

- $1 \le \text{s.length} \le 10^5$
- $0 \le \text{knowledge.length} \le 10^5$
- $\text{knowledge}[i].\text{length} == 2$
- $1 \le \text{key}_i.\text{length}, \text{value}_i.\text{length} \le 10$
- `s` consists of lowercase English letters and round brackets `'('` and `')'`.
- Every open bracket `'('` in `s` will have a corresponding close bracket `')'`.
- The key in each bracket pair of `s` will be non-empty.
- There will not be any nested bracket pairs in `s`.
- `key_i` and `value_i` consist of lowercase English letters.
- Each `key_i` in `knowledge` is unique.

---

## Topics and Tags

- **Array**
- **Hash Table**
- **String**

---

## Intuition and Approach

The problem requires substituting placeholder keys enclosed in brackets `(key)` with their mapped string values or `"?"` if missing.

### Step-by-Step Algorithm:
1. **Hash Table Lookup:**
   - Store all pairs from `knowledge` into a hash map (`Map<String, String>` or dictionary) for $\mathcal{O}(1)$ average-time key lookups.
2. **Two-Pointer / Linear Scan:**
   - Initialize an index `i = 0` and a `StringBuilder` / list to collect output characters.
   - Scan characters of `s`:
     - If `s[i] == '('`:
       - Find the matching closing bracket `')'` by advancing pointer `j` starting at `i + 1`.
       - Extract the substring `key = s[i + 1 ... j - 1]`.
       - Append `map.getOrDefault(key, "?")` to the result buffer.
       - Move pointer `i` past the closing bracket: `i = j + 1`.
     - Else:
       - Append `s[i]` directly to the buffer and increment `i++`.
3. **Return Result:**
   - Convert buffer to string and return.

Because brackets are guaranteed to be well-formed and non-nested, each character in `s` is examined at most twice.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(|s| + K \cdot L)$
  - Building the hash map from $K$ pairs of average length $L \le 10$ takes $\mathcal{O}(K \cdot L)$.
  - Scanning string `s` takes $\mathcal{O}(|s|)$, with each bracketed substring extraction taking time proportional to its length ($\le 10$).
  - Overall time is linear in the size of input: $\mathcal{O}(|s| + \sum (\text{len}(key) + \text{len}(val)))$.
- **Auxiliary Space Complexity:** $\mathcal{O}(K \cdot L + |s|)$
  - Hash map stores $K$ key-value pairs taking $\mathcal{O}(K \cdot L)$ memory.
  - The result buffer stores the output string of length $\mathcal{O}(|s| + K \cdot L)$.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
