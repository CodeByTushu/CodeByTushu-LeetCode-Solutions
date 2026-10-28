# LeetCode 1758: Minimum Changes To Make Alternating Binary String

- **Publication Date:** 05 March 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/minimum-changes-to-make-alternating-binary-string/](https://leetcode.com/problems/minimum-changes-to-make-alternating-binary-string/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

You are given a string `s` consisting only of the characters `'0'` and `'1'`. In one operation, you can change any `'0'` to `'1'` or vice versa.

The string is called **alternating** if no two adjacent characters are equal. For example, the string `"010"` is alternating, while the string `"0100"` is not.

Return the **minimum number of operations** needed to make `s` alternating.

---

### Examples

#### Example 1:
- **Input:** `s = "0100"`
- **Output:** `1`
- **Explanation:** If you change the last character to `'1'`, `s` will be `"0101"`, which is alternating.

#### Example 2:
- **Input:** `s = "10"`
- **Output:** `0`
- **Explanation:** `s` is already alternating.

#### Example 3:
- **Input:** `s = "1111"`
- **Output:** `2`
- **Explanation:** You need two operations to reach `"0101"` or `"1010"`.

---

### Constraints

- `1 <= s.length <= 10^4`
- `s[i]` is either `'0'` or `'1'`.

---

## Topics and Tags

- **Primary Tags:** String
- **Secondary Tags:** Simulation

---

## Detailed Algorithm Walkthrough

### 1. The Two Alternating Patterns

For any binary string of length $n$, there exist strictly **two** valid alternating configurations:
1. **Pattern 0:** Starts with `'0'` $\to$ `"010101..."`
   - Even indices ($i \equiv 0 \pmod 2$) must be `'0'`.
   - Odd indices ($i \equiv 1 \pmod 2$) must be `'1'`.
2. **Pattern 1:** Starts with `'1'` $\to$ `"101010..."`
   - Even indices ($i \equiv 0 \pmod 2$) must be `'1'`.
   - Odd indices ($i \equiv 1 \pmod 2$) must be `'0'`.

### 2. The Complementary Parity Invariant

Notice that Pattern 0 and Pattern 1 are exact bitwise complements at every single position:
$$\text{Pattern 1}[i] \ne \text{Pattern 0}[i] \quad \text{for all } 0 \le i < n$$

Consequently, whenever a character in `s` mismatches with Pattern 0, it **matches** Pattern 1. Whenever a character matches Pattern 0, it **mismatches** Pattern 1.

Therefore, if `diff0` represents the total number of operations needed to transform `s` into Pattern 0:
$$\text{diff1} = n - \text{diff0}$$

We only need to calculate `diff0` using a single pass, and the cost for the other pattern is immediately obtained for free!

### 3. Step-by-Step Algorithm Execution

1. Initialize `diff0 = 0` and `n = s.length()`.
2. Traverse through `s` with index $i$ from $0$ to $n - 1$:
   - The expected character for Pattern 0 is `(i % 2 == 0) ? '0' : '1'`.
   - If `s[i] != expected`, increment `diff0`.
3. The minimum operations needed between both patterns is simply:
   $$\min(\text{diff0}, n - \text{diff0})$$
4. Return this minimum value.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$, where $n$ is the length of string `s`. We perform a single linear scan from index $0$ to $n - 1$, checking parity with constant-time operations $\mathcal{O}(1)$ at each step.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$, as only a few primitive integer counters are maintained.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 1758 - Minimum Changes To Make Alternating Binary String
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int minOperations(String s) {
        int diff0 = 0;
        int n = s.length();

        for (int i = 0; i < n; i++) {
            // Pattern 1: index 0 is '0', index 1 is '1', index 2 is '0', etc.
            char expected = (i % 2 == 0) ? '0' : '1';
            if (s.charAt(i) != expected) {
                diff0++;
            }
        }

        // Pattern 2 is the exact complement of Pattern 1 at every index,
        // so operations for Pattern 2 = n - diff0.
        return Math.min(diff0, n - diff0);
    }
}
```

### Python
```python
"""
Problem: LeetCode 1758 - Minimum Changes To Make Alternating Binary String
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""

class Solution:
    def minOperations(self, s: str) -> int:
        n = len(s)
        # Count operations needed to match pattern "010101..."
        diff0 = sum(1 for i, ch in enumerate(s) if ch != ('0' if i % 2 == 0 else '1'))
        # Pattern starting with '1' requires exactly (n - diff0) changes
        return min(diff0, n - diff0)
```

### C++
```cpp
/**
 * Problem: LeetCode 1758 - Minimum Changes To Make Alternating Binary String
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minOperations(string s) {
        int diff0 = 0;
        int n = s.length();

        for (int i = 0; i < n; i++) {
            char expected = (i % 2 == 0) ? '0' : '1';
            if (s[i] != expected) {
                diff0++;
            }
        }

        return min(diff0, n - diff0);
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 1758 - Minimum Changes To Make Alternating Binary String
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} s
 * @return {number}
 */
var minOperations = function(s) {
    let diff0 = 0;
    const n = s.length;

    for (let i = 0; i < n; i++) {
        const expected = (i % 2 === 0) ? '0' : '1';
        if (s[i] !== expected) {
            diff0++;
        }
    }

    return Math.min(diff0, n - diff0);
};
```
