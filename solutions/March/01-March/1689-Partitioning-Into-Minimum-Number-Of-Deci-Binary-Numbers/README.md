# LeetCode 1689: Partitioning Into Minimum Number Of Deci-Binary Numbers

- **Publication Date:** 01 March 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/partitioning-into-minimum-number-of-deci-binary-numbers/](https://leetcode.com/problems/partitioning-into-minimum-number-of-deci-binary-numbers/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/3DiNiDlYOrQ?si=w4X-w63V9R8Sx51n)

---

## Problem Summary

A decimal number is called **deci-binary** if each of its digits is either `0` or `1` without any leading zeros. For example, `101` and `1100` are deci-binary, while `112` and `3001` are not.

Given a string `n` that represents a positive decimal integer, return the **minimum number** of positive deci-binary numbers needed so that they sum up to `n`.

---

### Examples

#### Example 1:
- **Input:** `n = "32"`
- **Output:** `3`
- **Explanation:** `10 + 11 + 11 = 32`.

#### Example 2:
- **Input:** `n = "82734"`
- **Output:** `8`

#### Example 3:
- **Input:** `n = "27346209830709182346"`
- **Output:** `9`

---

### Constraints

- $1 \le n.\text{length} \le 10^5$
- `n` consists of only digits.
- `n` does not contain any leading zeros and represents a positive integer.

---

## Topics and Tags

- **Primary Tags:** String, Greedy
- **Secondary Tags:** Math

---

## Detailed Algorithm Walkthrough

### 1. Core Mathematical Observation

A deci-binary number consists strictly of digits from $\{0, 1\}$. 

Suppose we add $k$ deci-binary numbers together:
- At any specific decimal place, each of the $k$ numbers can contribute at most a value of $1$.
- Without carry, the sum of digits at any column position can be at most $k \times 1 = k$.
- Even if carries were allowed from lower place values, a carry from a lower position can never reduce the minimum number of deci-binary numbers needed for higher positions, because every place value column itself can only produce at most $1$ unit per deci-binary number.
- Therefore, if a string $n$ contains a digit $d$, we must have at least $d$ deci-binary numbers that contribute a $1$ at that specific column position.
- This establishes a rigorous lower bound:
  $$\text{minPartitions}(n) \ge \max_{c \in n} (c - \text{'0'})$$

### 2. Constructive Proof of Sufficiency

Can we always construct exactly $M = \max_{c \in n} (c - \text{'0'})$ deci-binary numbers that sum to $n$?
Yes, constructively:
- For each digit position $j$ in $n$ with value $d = n[j] - \text{'0'}$:
  - Set the $j$-th digit of the first $d$ deci-binary numbers to $1$.
  - Set the $j$-th digit of the remaining $M - d$ deci-binary numbers to $0$.
- Because $n$ has no leading zeros, the highest place value has a digit $\ge 1$, which ensures that at least one deci-binary number has a non-zero leading digit (and we can distribute non-zero digits so that every chosen deci-binary number is positive and free of invalid leading zeros).
- Adding these $M$ numbers column by column produces each digit $d$ with exactly $0$ carries!
- Hence, the minimum number of deci-binary numbers required is **strictly equal to the maximum digit present in the string $n$**.

### 3. Early-Exit Optimization

Since decimal digits only range from $0$ to $9$:
- If during iteration we encounter the digit `'9'`, we can terminate immediately and return $9$, since no single decimal digit can ever exceed $9$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(|n|)$, where $|n| \le 10^5$. We scan the characters of $n$ at most once with an immediate exit upon encountering `'9'`.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$. Requires only a single primitive variable to maintain the running maximum digit.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 1689 - Partitioning Into Minimum Number Of Deci-Binary Numbers
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int minPartitions(String n) {
        int maxDigit = 0;
        int len = n.length();
        for (int i = 0; i < len; i++) {
            int digit = n.charAt(i) - '0';
            if (digit > maxDigit) {
                maxDigit = digit;
                if (maxDigit == 9) {
                    return 9; // Early exit since no decimal digit can exceed 9
                }
            }
        }
        return maxDigit;
    }
}
```

### Python
```python
"""
Problem: LeetCode 1689 - Partitioning Into Minimum Number Of Deci-Binary Numbers
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

class Solution:
    def minPartitions(self, n: str) -> int:
        for d in "987654321":
            if d in n:
                return int(d)
        return 0
```

### C++
```cpp
/**
 * Problem: LeetCode 1689 - Partitioning Into Minimum Number Of Deci-Binary Numbers
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minPartitions(string n) {
        int maxDigit = 0;
        for (char ch : n) {
            int digit = ch - '0';
            if (digit > maxDigit) {
                maxDigit = digit;
                if (maxDigit == 9) {
                    return 9; // Early exit optimization
                }
            }
        }
        return maxDigit;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 1689 - Partitioning Into Minimum Number Of Deci-Binary Numbers
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} n
 * @return {number}
 */
var minPartitions = function(n) {
    let maxDigit = 0;
    for (let i = 0; i < n.length; i++) {
        const digit = n.charCodeAt(i) - 48;
        if (digit > maxDigit) {
            maxDigit = digit;
            if (maxDigit === 9) {
                return 9;
            }
        }
    }
    return maxDigit;
};
```
