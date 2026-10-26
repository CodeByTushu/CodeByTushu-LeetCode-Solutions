# LeetCode 1404: Number of Steps to Reduce a Number in Binary Representation to One

- **Publication Date:** 26 February 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/number-of-steps-to-reduce-a-number-in-binary-representation-to-one/](https://leetcode.com/problems/number-of-steps-to-reduce-a-number-in-binary-representation-to-one/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

Given the binary representation of an integer as a string `s`, return the number of steps to reduce it to `1` under the following rules:
- If the current number is even, divide it by 2.
- If the current number is odd, add 1 to it.

It is guaranteed that you can always reach 1 for all test cases.

---

### Examples

#### Example 1:
- **Input:** `s = "1101"`
- **Output:** `6`
- **Explanation:**
  - `"1101"` corresponds to decimal $13$.
  - Step 1) $13$ is odd, add $1 \to 14$
  - Step 2) $14$ is even, divide by $2 \to 7$
  - Step 3) $7$ is odd, add $1 \to 8$
  - Step 4) $8$ is even, divide by $2 \to 4$
  - Step 5) $4$ is even, divide by $2 \to 2$
  - Step 6) $2$ is even, divide by $2 \to 1$

#### Example 2:
- **Input:** `s = "10"`
- **Output:** `1`
- **Explanation:**
  - `"10"` corresponds to $2$.
  - Step 1) $2$ is even, divide by $2 \to 1$.

#### Example 3:
- **Input:** `s = "1"`
- **Output:** `0`

---

### Constraints

- $1 \le s.\text{length} \le 500$
- `s` consists of characters `'0'` or `'1'`.
- `s[0] == '1'`

---

## Topics and Tags

- **Primary Tags:** Bit Manipulation, String
- **Secondary Tags:** Simulation

---

## Detailed Algorithm Walkthrough

### 1. Operations in Binary Arithmetic

Notice how division by 2 and addition of 1 affect binary digits:
- **Division by 2:** Drops the lowest bit (equivalent to a right shift `>> 1`). This is only valid when the lowest bit is `0` (even) and takes **1 step**.
- **Adding 1:** When the lowest bit is `1` (odd), adding 1 turns this bit into `0` and generates a `carry = 1`. The number is now even, meaning the very next operation is guaranteed to divide by 2 (dropping that newly created `0`). Thus, encountering an odd bit requires **2 steps** (1 for addition + 1 for division) and propagates a carry forward.

### 2. Single-Pass Right-to-Left Traversal

We can simulate the entire process in $\mathcal{O}(n)$ time without explicitly mutating the string or using big integer arithmetic:
1. Initialize `steps = 0` and `carry = 0`.
2. Iterate from the least significant bit ($i = s.\text{length} - 1$) down to $i = 1$:
   - Current effective bit value: $\text{bit} = (s[i] - \text{'0'}) + \text{carry}$.
   - If $\text{bit} \pmod 2 == 1$ (odd):
     - Requires 2 operations (add 1, then divide by 2): `steps += 2`.
     - Sets `carry = 1`.
   - If $\text{bit} \pmod 2 == 0$ (even):
     - Requires 1 operation (divide by 2): `steps += 1`.
     - `carry` remains whatever it was previously (note: if `bit == 2`, `carry` remains 1; if `bit == 0`, `carry` remains 0).
3. At the most significant bit ($i = 0$), $s[0]$ was initially `'1'`.
   - If `carry == 1`, the number became $1 + 1 = 2 = 10_2$, requiring 1 additional division step to reach $1$.
   - If `carry == 0`, the number has already reached $1$.
   - Therefore, return `steps + carry`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$, where $n = s.\text{length} \le 500$. We perform a single linear scan from right to left with constant-time arithmetic per bit.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$. Requires only two integer variables (`steps` and `carry`), completely avoiding string allocations or large integer libraries.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 1404 - Number of Steps to Reduce a Number in Binary Representation to One
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int numSteps(String s) {
        int steps = 0;
        int carry = 0;

        for (int i = s.length() - 1; i > 0; i--) {
            int bit = (s.charAt(i) - '0') + carry;
            if (bit % 2 == 1) {
                // Odd: add 1 (1 step) making it even, then divide by 2 (1 step) -> 2 steps total
                steps += 2;
                carry = 1;
            } else {
                // Even: divide by 2 (1 step)
                steps += 1;
            }
        }

        // At index 0, value is 1 + carry. If carry is 1, it became 2, requiring 1 more step to reduce to 1.
        return steps + carry;
    }
}
```

### Python
```python
"""
Problem: LeetCode 1404 - Number of Steps to Reduce a Number in Binary Representation to One
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

class Solution:
    def numSteps(self, s: str) -> int:
        steps = 0
        carry = 0

        for i in range(len(s) - 1, 0, -1):
            bit = (ord(s[i]) - 48) + carry
            if bit % 2 == 1:
                steps += 2
                carry = 1
            else:
                steps += 1

        return steps + carry
```

### C++
```cpp
/**
 * Problem: LeetCode 1404 - Number of Steps to Reduce a Number in Binary Representation to One
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>

using namespace std;

class Solution {
public:
    int numSteps(string s) {
        int steps = 0;
        int carry = 0;

        for (int i = (int)s.length() - 1; i > 0; i--) {
            int bit = (s[i] - '0') + carry;
            if (bit % 2 == 1) {
                steps += 2;
                carry = 1;
            } else {
                steps += 1;
            }
        }

        return steps + carry;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 1404 - Number of Steps to Reduce a Number in Binary Representation to One
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} s
 * @return {number}
 */
var numSteps = function(s) {
    let steps = 0;
    let carry = 0;

    for (let i = s.length - 1; i > 0; i--) {
        const bit = (s.charCodeAt(i) - 48) + carry;
        if (bit % 2 === 1) {
            steps += 2;
            carry = 1;
        } else {
            steps += 1;
        }
    }

    return steps + carry;
};
```
