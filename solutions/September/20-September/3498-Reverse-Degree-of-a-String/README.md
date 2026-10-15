# LeetCode 3498: Reverse Degree of a String

- **Publication Date:** 20 September 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/reverse-degree-of-a-string/](https://leetcode.com/problems/reverse-degree-of-a-string/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/OVJ_v_ACBXk?si=RWGC1Gh-sJ4g5xWH)

---

## Problem Summary

Given a string `s`, calculate its **reverse degree**.

The **reverse degree** is calculated as follows:
1. For each character, multiply its position in the *reversed alphabet* (`'a'` $\to 26$, `'b'` $\to 25$, ..., `'z'` $\to 1$) with its position in the string (**1-indexed**).
2. Sum these products for all characters in the string.

Return the **reverse degree** of `s`.

---

### Examples

#### Example 1:
- **Input:** `s = "abc"`
- **Output:** `148`
- **Explanation:**

  | Letter | Index in Reversed Alphabet | Index in String | Product |
  | :---: | :---: | :---: | :---: |
  | `'a'` | 26 | 1 | 26 |
  | `'b'` | 25 | 2 | 50 |
  | `'c'` | 24 | 3 | 72 |

  The reversed degree is $26 + 50 + 72 = 148$.

#### Example 2:
- **Input:** `s = "zaza"`
- **Output:** `160`
- **Explanation:**

  | Letter | Index in Reversed Alphabet | Index in String | Product |
  | :---: | :---: | :---: | :---: |
  | `'z'` | 1 | 1 | 1 |
  | `'a'` | 26 | 2 | 52 |
  | `'z'` | 1 | 3 | 3 |
  | `'a'` | 26 | 4 | 104 |

  The reversed degree is $1 + 52 + 3 + 104 = 160$.

---

### Constraints

- $1 \le \text{s.length} \le 1000$
- `s` contains only lowercase English letters.

---

## Topics and Tags

- **String**
- **Math**
- **Simulation**

---

## Approach & Intuition

### Key Mathematical Formula:

1. **Reversed Alphabet Position**:
   - In standard 0-indexed alphabet positions:
     $$\text{alphaPos} = s[i] - \text{'a'}$$
     where `'a'` is $0$, `'b'` is $1$, ..., `'z'` is $25$.
   - In the reversed alphabet where `'a'` is $26$ and `'z'` is $1$:
     $$\text{reversedAlphabetPos} = 26 - (s[i] - \text{'a'})$$

2. **1-Indexed String Position**:
   - The character at index $i$ (0-indexed) has string position:
     $$\text{stringPos} = i + 1$$

3. **Accumulation**:
   - The product for the $i$-th character is:
     $$\text{product}_i = \text{reversedAlphabetPos} \times \text{stringPos} = (26 - (s[i] - \text{'a'})) \times (i + 1)$$
   - Summing $\text{product}_i$ over all characters from $i = 0$ to $n - 1$ gives the final answer.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - A single linear scan through the string of length $N$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Constant auxiliary space used for loop variables and running sum.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
