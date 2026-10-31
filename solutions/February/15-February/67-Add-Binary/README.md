# LeetCode 67: Add Binary

- **Publication Date:** 15 February 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/add-binary/](https://leetcode.com/problems/add-binary/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/wu_CZSIhVF8?si=ULwJ9TCNJCRmXTGR)

---

## Problem Summary

Given two binary strings `a` and `b`, return their sum as a binary string.

---

### Examples

#### Example 1:
- **Input:** `a = "11", b = "1"`
- **Output:** `"100"`
- **Explanation:**
  - In binary: $11_2 + 1_2 = 3_{10} + 1_{10} = 4_{10} = 100_2$.

#### Example 2:
- **Input:** `a = "1010", b = "1011"`
- **Output:** `"10101"`
- **Explanation:**
  - In binary: $1010_2 + 1011_2 = 10_{10} + 11_{10} = 21_{10} = 10101_2$.

---

### Constraints

- $1 \le a.\text{length}, b.\text{length} \le 10^4$
- `a` and `b` consist only of `'0'` or `'1'` characters.
- Each string does not contain leading zeros except for the zero itself.

---

## Topics and Tags

- **Primary Tags:** Math, String, Bit Manipulation
- **Secondary Tags:** Simulation

---

## Detailed Algorithm Walkthrough

### 1. Base-2 Column Addition & Carry

Addition of binary numbers follows standard grade-school right-to-left addition in base 2:
- At any bit position, the sum is composed of:
  $$\text{sum} = \text{bit}_a + \text{bit}_b + \text{carry}$$
- The resultant bit placed at the current position is:
  $$\text{current\_bit} = \text{sum} \pmod 2$$
- The carry forwarded to the next higher significant position is:
  $$\text{carry} = \lfloor \text{sum} / 2 \rfloor$$

### 2. Two-Pointer Reverse Traversal

1. Maintain two pointers:
   - $i$ starting at $a.\text{length}() - 1$.
   - $j$ starting at $b.\text{length}() - 1$.
   - A running integer `carry = 0`.
2. Continue iterating while $i \ge 0$, $j \ge 0$, or $\text{carry} > 0$:
   - Initialize `sum = carry`.
   - If $i \ge 0$, add $(a[i] - '0')$ to `sum` and decrement $i$.
   - If $j \ge 0$, add $(b[j] - '0')$ to `sum` and decrement $j$.
   - Append $(\text{sum} \pmod 2)$ to the output buffer.
   - Update $\text{carry} = \lfloor \text{sum} / 2 \rfloor$.
3. Since digits are collected from least-significant to most-significant, reverse the accumulated buffer to produce the final binary representation.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(\max(N, M))$, where $N$ and $M$ are the lengths of strings `a` and `b`. The loop runs at most $\max(N, M) + 1$ times, performing constant $\mathcal{O}(1)$ operations per bit.
- **Auxiliary Space Complexity:** $\mathcal{O}(\max(N, M))$ to store and reverse the result string.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 67 - Add Binary
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public String addBinary(String a, String b) {
        StringBuilder sb = new StringBuilder();
        int i = a.length() - 1;
        int j = b.length() - 1;
        int carry = 0;

        while (i >= 0 || j >= 0 || carry > 0) {
            int sum = carry;
            if (i >= 0) {
                sum += a.charAt(i--) - '0';
            }
            if (j >= 0) {
                sum += b.charAt(j--) - '0';
            }
            sb.append(sum % 2);
            carry = sum / 2;
        }

        return sb.reverse().toString();
    }
}
```

### Python
```python
"""
Problem: LeetCode 67 - Add Binary
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""

class Solution:
    def addBinary(self, a: str, b: str) -> str:
        res = []
        i, j = len(a) - 1, len(b) - 1
        carry = 0

        while i >= 0 or j >= 0 or carry:
            total = carry
            if i >= 0:
                total += int(a[i])
                i -= 1
            if j >= 0:
                total += int(b[j])
                j -= 1
            res.append(str(total % 2))
            carry = total // 2

        return "".join(reversed(res))
```

### C++
```cpp
/**
 * Problem: LeetCode 67 - Add Binary
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <algorithm>

using namespace std;

class Solution {
public:
    string addBinary(string a, string b) {
        string res = "";
        int i = a.length() - 1;
        int j = b.length() - 1;
        int carry = 0;

        while (i >= 0 || j >= 0 || carry > 0) {
            int sum = carry;
            if (i >= 0) {
                sum += a[i--] - '0';
            }
            if (j >= 0) {
                sum += b[j--] - '0';
            }
            res += to_string(sum % 2);
            carry = sum / 2;
        }

        reverse(res.begin(), res.end());
        return res;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 67 - Add Binary
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    let i = a.length - 1;
    let j = b.length - 1;
    let carry = 0;
    const res = [];

    while (i >= 0 || j >= 0 || carry > 0) {
        let sum = carry;
        if (i >= 0) {
            sum += a.charCodeAt(i--) - 48;
        }
        if (j >= 0) {
            sum += b.charCodeAt(j--) - 48;
        }
        res.push(sum % 2);
        carry = Math.floor(sum / 2);
    }

    return res.reverse().join('');
};
```
