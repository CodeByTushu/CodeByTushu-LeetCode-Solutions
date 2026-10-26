# LeetCode 1461: Check If a String Contains All Binary Codes of Size K

- **Publication Date:** 23 February 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/check-if-a-string-contains-all-binary-codes-of-size-k/](https://leetcode.com/problems/check-if-a-string-contains-all-binary-codes-of-size-k/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

Given a binary string `s` and an integer `k`, return `true` if every binary code of length `k` is a substring of `s`. Otherwise, return `false`.

---

### Examples

#### Example 1:
- **Input:** `s = "00110110", k = 2`
- **Output:** `true`
- **Explanation:**
  - The binary codes of length 2 are `"00"`, `"01"`, `"10"`, and `"11"`.
  - They can be found as substrings at indices 0, 1, 3, and 2 respectively.

#### Example 2:
- **Input:** `s = "0110", k = 1`
- **Output:** `true`
- **Explanation:**
  - The binary codes of length 1 are `"0"` and `"1"`, both of which are present in `s`.

#### Example 3:
- **Input:** `s = "0110", k = 2`
- **Output:** `false`
- **Explanation:**
  - The binary code `"00"` is of length 2 and does not exist in `s`.

---

### Constraints

- $1 \le s.\text{length} \le 5 \times 10^5$
- `s[i]` is either `'0'` or `'1'`.
- $1 \le k \le 20$

---

## Topics and Tags

- **Primary Tags:** Hash Table, String, Bit Manipulation
- **Secondary Tags:** Rolling Hash

---

## Detailed Algorithm Walkthrough

### 1. Pigeonhole Principle Early Pruning

There are exactly $2^k$ distinct binary codes of length $k$.
A string $s$ contains at most $s.\text{length} - k + 1$ overlapping substrings of length $k$.
If:
$$s.\text{length} - k + 1 < 2^k$$
then by the Pigeonhole Principle, $s$ cannot possibly contain all $2^k$ distinct codes, so we can immediately return `false`.

### 2. Rolling Bitmask Hash in $\mathcal{O}(1)$

Instead of substring slicing and allocating strings in a `HashSet<String>`:
- The maximum value of $k$ is $20$, which fits comfortably inside a standard 32-bit integer.
- A sliding window of length $k$ can be maintained using bitwise operations:
  $$\text{mask} = 2^k - 1 = (1 \ll k) - 1$$
- For each incoming character $c \in \{'0', '1'\}$:
  $$\text{hash} = ((\text{hash} \ll 1) \ \& \ \text{mask}) \ | \ (c - '0')$$
- This shifts the window left by 1 bit, discards the highest bit beyond position $k - 1$, and inserts the new bit at position 0 in $\mathcal{O}(1)$ time.

### 3. Boolean Frequency Array & Early Exit

We allocate a boolean array `seen` of size $2^k$ (at most $2^{20} \approx 10^6$ elements $\approx 1$ MB of memory):
- As we iterate through $s$ from index $0$ to $n - 1$:
  - Once $i \ge k - 1$, the rolling hash represents a complete valid binary substring of size $k$.
  - If `!seen[hash]`, set `seen[hash] = true` and increment `distinctCount`.
  - If `distinctCount == target`, return `true` immediately without scanning the rest of $s$!
- If the loop finishes and `distinctCount < target`, return `false`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$, where $n = s.\text{length} \le 5 \times 10^5$. We scan the string once; maintaining the rolling hash and updating the boolean array takes $\mathcal{O}(1)$ per character. Early exit halts as soon as all $2^k$ codes are matched.
- **Auxiliary Space Complexity:** $\mathcal{O}(2^k)$ for the boolean lookup table. For $k \le 20$, $2^{20} = 1,048,576$ booleans ($\approx 1$ MB), avoiding heavy heap allocation and garbage collection overhead.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 1461 - Check If a String Contains All Binary Codes of Size K
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public boolean hasAllCodes(String s, int k) {
        int target = 1 << k;
        if (s.length() - k + 1 < target) {
            return false;
        }

        boolean[] seen = new boolean[target];
        int count = 0;
        int hash = 0;
        int mask = target - 1;

        for (int i = 0; i < s.length(); i++) {
            hash = ((hash << 1) & mask) | (s.charAt(i) - '0');
            if (i >= k - 1) {
                if (!seen[hash]) {
                    seen[hash] = true;
                    count++;
                    if (count == target) {
                        return true;
                    }
                }
            }
        }

        return count == target;
    }
}
```

### Python
```python
"""
Problem: LeetCode 1461 - Check If a String Contains All Binary Codes of Size K
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

class Solution:
    def hasAllCodes(self, s: str, k: int) -> bool:
        target = 1 << k
        if len(s) - k + 1 < target:
            return False

        seen = bytearray(target)
        count = 0
        hash_val = 0
        mask = target - 1

        for i, ch in enumerate(s):
            hash_val = ((hash_val << 1) & mask) | (ord(ch) - 48)
            if i >= k - 1:
                if not seen[hash_val]:
                    seen[hash_val] = 1
                    count += 1
                    if count == target:
                        return True

        return count == target
```

### C++
```cpp
/**
 * Problem: LeetCode 1461 - Check If a String Contains All Binary Codes of Size K
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <vector>

using namespace std;

class Solution {
public:
    bool hasAllCodes(string s, int k) {
        int target = 1 << k;
        if ((int)s.length() - k + 1 < target) {
            return false;
        }

        vector<bool> seen(target, false);
        int count = 0;
        int hashVal = 0;
        int mask = target - 1;

        for (int i = 0; i < (int)s.length(); i++) {
            hashVal = ((hashVal << 1) & mask) | (s[i] - '0');
            if (i >= k - 1) {
                if (!seen[hashVal]) {
                    seen[hashVal] = true;
                    count++;
                    if (count == target) {
                        return true;
                    }
                }
            }
        }

        return count == target;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 1461 - Check If a String Contains All Binary Codes of Size K
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */
var hasAllCodes = function(s, k) {
    const target = 1 << k;
    if (s.length - k + 1 < target) {
        return false;
    }

    const seen = new Uint8Array(target);
    let count = 0;
    let hashVal = 0;
    const mask = target - 1;

    for (let i = 0; i < s.length; i++) {
        hashVal = ((hashVal << 1) & mask) | (s.charCodeAt(i) - 48);
        if (i >= k - 1) {
            if (seen[hashVal] === 0) {
                seen[hashVal] = 1;
                count++;
                if (count === target) {
                    return true;
                }
            }
        }
    }

    return count === target;
};
```
