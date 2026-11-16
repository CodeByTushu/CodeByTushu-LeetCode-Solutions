# LeetCode 2243: Calculate Digit Sum of a String

- **Publication Date:** 16 November 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/calculate-digit-sum-of-a-string/](https://leetcode.com/problems/calculate-digit-sum-of-a-string/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/Twz9Dts_JBI)

---

## 💡 Problem Summary

You are given a string `s` consisting of digits and an integer `k`.

A round can be completed if the length of `s` is greater than `k`. In one round, do the following:
1. **Divide** `s` into consecutive groups of size `k` such that the first `k` characters are in the first group, the next `k` characters are in the second group, and so on. Note that the size of the last group can be smaller than `k`.
2. **Replace** each group of `s` with a string representing the sum of all its digits. For example, `"346"` is replaced with `"13"` because $3 + 4 + 6 = 13$.
3. **Merge** consecutive groups together to form a new string. If the length of the string is greater than `k`, repeat from step 1.

Return `s` after all rounds have been completed.

---

### 🧪 Examples

#### Example 1:
- **Input:** `s = "11111222223"`, `k = 3`
- **Output:** `"135"`
- **Explanation:**
  - **Round 1:** Divide `s` into groups of size 3: `"111"`, `"112"`, `"222"`, and `"23"`.
    - Digit sums: $1 + 1 + 1 = 3$, $1 + 1 + 2 = 4$, $2 + 2 + 2 = 6$, $2 + 3 = 5$.
    - String becomes `"3" + "4" + "6" + "5" = "3465"`.
  - **Round 2:** Divide `s` into `"346"` and `"5"`.
    - Digit sums: $3 + 4 + 6 = 13$, $5 = 5$.
    - String becomes `"13" + "5" = "135"`.
  - Now, `s.length <= k` ($3 \le 3$), so the simulation halts and we return `"135"`.

#### Example 2:
- **Input:** `s = "00000000"`, `k = 3`
- **Output:** `"000"`
- **Explanation:**
  - Divide `s` into `"000"`, `"000"`, and `"00"`.
  - Digit sums: $0 + 0 + 0 = 0$, $0 + 0 + 0 = 0$, and $0 + 0 = 0$.
  - `s` becomes `"0" + "0" + "0" = "000"`.
  - Since length $3 \le k$, we return `"000"`.

---

### 🔒 Constraints

- $1 \le \text{s.length} \le 100$
- $2 \le k \le 100$
- `s` consists of digits only.

---

## 🧠 Algorithmic Approach & Key Observations

### 1. Simulation & Chunk Partitioning
The problem requires repeatedly chunking string `s` into blocks of length $k$ (with the final block having size at most $k$), computing the digit sum of each chunk, and concatenating these sums into a new string until $|s| \le k$.

### 2. Fast Convergence & Geometric Decay
Because $k \ge 2$, every block of $k$ digits has a maximum digit sum of $9k$. Converting this sum into a decimal string produces at most $\lfloor \log_{10}(9k) \rfloor + 1$ characters:
- For $k = 3$, chunk sum $\le 27$ ($\le 2$ digits instead of $3$).
- For large $k$, each chunk of length $k$ compresses down drastically to $1$ or $2$ digits.

Thus, the length of $s$ shrinks geometrically each round ($L_0 + L_1 + L_2 + \dots \le \mathcal{O}(N)$), guaranteeing the simulation terminates in at most 3 to 5 rounds.

### 3. Step-by-Step Implementation Strategy
1. While `s.length() > k`:
   - Initialize a new dynamic string container (`StringBuilder` in Java, list of strings in Python, string in C++/JS).
   - Iterate through index `i = 0` to `s.length()` in steps of `k`.
   - Calculate chunk boundaries: `end = Math.min(i + k, s.length())`.
   - Sum the numeric values of characters in `s[i ... end - 1]`.
   - Append the string representation of this sum to the builder.
   - Reassign `s` to the newly formed string.
2. Return `s`.

---

## ⏱️ Complexity Analysis

| Metric | Complexity | Description |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N)$ | In each round $r$ of length $L_r$, scanning each digit takes $\mathcal{O}(L_r)$ operations. Because each chunk of size $k \ge 2$ shrinks geometrically, the total work across all rounds is bounded by $\sum L_r = \mathcal{O}(N)$. For $N \le 100$, executes in under $1\text{ ms}$. |
| **Auxiliary Space** | $\mathcal{O}(N)$ | In each round, a new string of length strictly less than the current string is allocated to store intermediate chunk sums. No recursion or persistent data structures are needed. |

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
/**
 * Problem: LeetCode 2243 - Calculate Digit Sum of a String
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */

class Solution {
    public String digitSum(String s, int k) {
        while (s.length() > k) {
            StringBuilder next = new StringBuilder();

            for (int i = 0; i < s.length(); i += k) {
                int sum = 0;
                int end = Math.min(i + k, s.length());

                for (int j = i; j < end; j++) {
                    sum += s.charAt(j) - '0';
                }

                next.append(sum);
            }

            s = next.toString();
        }

        return s;
    }
}
```

### 🐍 Python (Python 3)
```python
"""
Problem: LeetCode 2243 - Calculate Digit Sum of a String
Difficulty: Easy
Language: Python 3
Author: CodeByTushu
"""


class Solution:
    def digitSum(self, s: str, k: int) -> str:
        while len(s) > k:
            next_chunks = []

            for i in range(0, len(s), k):
                chunk = s[i:i + k]
                digit_sum = sum(int(ch) for ch in chunk)
                next_chunks.append(str(digit_sum))

            s = "".join(next_chunks)

        return s
```

### ⚡ C++ (C++20)
```cpp
/**
 * Problem: LeetCode 2243 - Calculate Digit Sum of a String
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */

#include <string>
#include <algorithm>

class Solution {
public:
    std::string digitSum(std::string s, int k) {
        while (static_cast<int>(s.length()) > k) {
            std::string next = "";
            int n = static_cast<int>(s.length());

            for (int i = 0; i < n; i += k) {
                int sum = 0;
                int end = std::min(i + k, n);

                for (int j = i; j < end; ++j) {
                    sum += s[j] - '0';
                }

                next += std::to_string(sum);
            }

            s = next;
        }

        return s;
    }
};
```

### 🌐 JavaScript (Node.js ES2022)
```javascript
/**
 * Problem: LeetCode 2243 - Calculate Digit Sum of a String
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} arr
 * @return {number}
 */
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var digitSum = function(s, k) {
    while (s.length > k) {
        let next = "";

        for (let i = 0; i < s.length; i += k) {
            let sum = 0;
            const end = Math.min(i + k, s.length);

            for (let j = i; j < end; j++) {
                sum += Number(s[j]);
            }

            next += sum;
        }

        s = next;
    }

    return s;
};
```
