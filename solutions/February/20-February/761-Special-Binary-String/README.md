# LeetCode 761: Special Binary String

- **Publication Date:** 20 February 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/special-binary-string/](https://leetcode.com/problems/special-binary-string/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/ykWkEIT3ysk?si=4TBEcjDq59ys6r9X)

---

## Problem Summary

Special binary strings are binary strings with two defining properties:
1. The number of `0`'s is equal to the number of `1`'s.
2. Every prefix of the binary string has at least as many `1`'s as `0`'s.

You are given a special binary string `s`. A move consists of choosing two consecutive, non-empty, special substrings of `s` and swapping them. Two strings are consecutive if the last character of the first string is exactly one index before the first character of the second string.

Return the lexicographically largest resulting string possible after applying any number of valid operations.

---

### Examples

#### Example 1:
- **Input:** `s = "11011000"`
- **Output:** `"11100100"`
- **Explanation:**
  - The special substrings `"10"` (occurring at indices 1–2) and `"1100"` (at indices 3–6) can be swapped.
  - Swapping them yields `"11100100"`, which is the lexicographically largest possible string after valid operations.

#### Example 2:
- **Input:** `s = "10"`
- **Output:** `"10"`

---

### Constraints

- $1 \le s.\text{length} \le 50$
- `s[i]` is either `'0'` or `'1'`.
- `s` is guaranteed to be a valid special binary string.

---

## Topics and Tags

- **Primary Tags:** Recursion, String
- **Secondary Tags:** Sorting

---

## Detailed Algorithm Walkthrough

### 1. The Valid Parentheses Equivalence

The two defining conditions:
1. Equal count of `1`s and `0`s.
2. Every prefix contains $\ge$ `1`s than `0`s.

This is the exact mathematical definition of the **Dyck language** (valid parentheses strings), where:
- `'1'` corresponds to `'('` (an opening parenthesis)
- `'0'` corresponds to `')'` (a closing parenthesis)

A "swap of two consecutive special substrings" corresponds to reordering adjacent balanced parenthesized expressions. Since we can repeatedly swap adjacent elements, any set of independent consecutive balanced components can be rearranged into **any arbitrary permutation**!

### 2. Recursive Decomposition

Every special binary string can be uniquely decomposed into one or more primitive (irreducible) special substrings:
$$s = C_1 + C_2 + \dots + C_k$$
where each component $C_i$ has equal numbers of `1`s and `0`s and only balances its prefix count at its very end.

For each primitive component $C_i$:
- It must start with `'1'` and end with `'0'`.
- The inner substring $C_i[1 \dots |C_i| - 2]$ is itself a valid special binary string!
- Therefore, we can recursively optimize each inner substring:
  $$\text{optimized}(C_i) = \text{"1"} + \text{makeLargestSpecial}(C_i[1 \dots |C_i| - 2]) + \text{"0"}$$

### 3. Lexicographical Maximization via Greedy Sorting

To make the overall string as lexicographically large as possible:
1. Parse top-level primitive components by maintaining a balance counter (`+1` for `'1'`, `-1` for `'0'`). Whenever `count == 0`, a complete primitive block is identified.
2. Recursively optimize each inner block.
3. Sort all optimized top-level components in **descending order** (largest string first).
4. Concatenate the sorted components together.

Because any adjacent components can be swapped, sorting them in descending order is always achievable and provably optimal.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n^2 \log n)$ worst-case, where $n = s.\text{length} \le 50$. At each level of recursion, decomposing takes $\mathcal{O}(n)$ time and sorting string components takes $\mathcal{O}(n \log n)$ string comparisons of length up to $n$. With $n \le 50$, execution completes in less than 1 millisecond.
- **Auxiliary Space Complexity:** $\mathcal{O}(n)$, due to recursion stack depth and storage for partitioned substring components.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 761 - Special Binary String
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {
    public String makeLargestSpecial(String s) {
        if (s.length() <= 2) {
            return s;
        }

        List<String> list = new ArrayList<>();
        int count = 0;
        int start = 0;

        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '1') {
                count++;
            } else {
                count--;
            }

            if (count == 0) {
                // Primitive special substring found: s[start ... i]
                // The inner substring is s[start + 1 ... i - 1]
                String inner = makeLargestSpecial(s.substring(start + 1, i));
                list.add("1" + inner + "0");
                start = i + 1;
            }
        }

        Collections.sort(list, Collections.reverseOrder());

        StringBuilder sb = new StringBuilder();
        for (String sub : list) {
            sb.append(sub);
        }

        return sb.toString();
    }
}
```

### Python
```python
"""
Problem: LeetCode 761 - Special Binary String
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""

class Solution:
    def makeLargestSpecial(self, s: str) -> str:
        if len(s) <= 2:
            return s

        count = 0
        start = 0
        parts = []

        for i, ch in enumerate(s):
            if ch == '1':
                count += 1
            else:
                count -= 1

            if count == 0:
                inner = self.makeLargestSpecial(s[start + 1:i])
                parts.append("1" + inner + "0")
                start = i + 1

        parts.sort(reverse=True)
        return "".join(parts)
```

### C++
```cpp
/**
 * Problem: LeetCode 761 - Special Binary String
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    string makeLargestSpecial(string s) {
        if (s.length() <= 2) {
            return s;
        }

        vector<string> parts;
        int count = 0;
        int start = 0;

        for (int i = 0; i < (int)s.length(); i++) {
            if (s[i] == '1') {
                count++;
            } else {
                count--;
            }

            if (count == 0) {
                string inner = makeLargestSpecial(s.substr(start + 1, i - start - 1));
                parts.push_back("1" + inner + "0");
                start = i + 1;
            }
        }

        sort(parts.begin(), parts.end(), greater<string>());

        string result = "";
        for (const string& part : parts) {
            result += part;
        }

        return result;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 761 - Special Binary String
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} s
 * @return {string}
 */
var makeLargestSpecial = function(s) {
    if (s.length <= 2) {
        return s;
    }

    const parts = [];
    let count = 0;
    let start = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '1') {
            count++;
        } else {
            count--;
        }

        if (count === 0) {
            const inner = makeLargestSpecial(s.substring(start + 1, i));
            parts.push("1" + inner + "0");
            start = i + 1;
        }
    }

    parts.sort((a, b) => b.localeCompare(a));
    return parts.join("");
};
```
