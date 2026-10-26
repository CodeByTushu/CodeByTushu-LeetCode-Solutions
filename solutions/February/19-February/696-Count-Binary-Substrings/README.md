# LeetCode 696: Count Binary Substrings

- **Publication Date:** 19 February 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/count-binary-substrings/](https://leetcode.com/problems/count-binary-substrings/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

Given a binary string `s`, return the number of non-empty substrings that have the same number of `0`'s and `1`'s, and all the `0`'s and all the `1`'s in these substrings are grouped consecutively.

Substrings that occur multiple times are counted the number of times they occur.

---

### Examples

#### Example 1:
- **Input:** `s = "00110011"`
- **Output:** `6`
- **Explanation:**
  - There are 6 substrings that have equal number of consecutive 1's and 0's: `"0011"`, `"01"`, `"1100"`, `"10"`, `"0011"`, and `"01"`.
  - Notice that some of these substrings repeat and are counted each time they occur.
  - Furthermore, `"00110011"` is not valid because the 0's and 1's are not grouped together.

#### Example 2:
- **Input:** `s = "10101"`
- **Output:** `4`
- **Explanation:**
  - There are 4 substrings: `"10"`, `"01"`, `"10"`, and `"01"`.

---

### Constraints

- $1 \le s.\text{length} \le 10^5$
- `s[i]` is either `'0'` or `'1'`.

---

## Topics and Tags

- **Primary Tags:** Two Pointers, String
- **Secondary Tags:** Simulation

---

## Detailed Algorithm Walkthrough

### 1. Grouping Consecutive Characters

Consider how valid substrings are structured. A valid substring consists of $k$ consecutive `0`s followed by $k$ consecutive `1`s (e.g., `0011`), or $k$ consecutive `1`s followed by $k$ consecutive `0`s (e.g., `1100`).

If we group adjacent identical characters together:
- For `s = "00110011"`, the lengths of consecutive blocks are:
  $$\text{groups} = [2, 2, 2, 2]$$
- Between any two adjacent groups of lengths $A$ and $B$, the number of balanced substrings formed centered at that boundary is exactly:
  $$\min(A, B)$$
- For instance, adjacent groups of lengths $2$ and $2$ yield $\min(2, 2) = 2$ substrings (`"01"` and `"0011"`).

### 2. Space Optimization to $\mathcal{O}(1)$

Instead of building a `groups` list in memory:
- Keep track of `prevRun` (length of the previous contiguous character block) and `currRun` (length of the current contiguous character block).
- Iterate through the string from index $1$ to $n - 1$:
  - If $s[i] == s[i - 1]$, continue growing the current block: `currRun++`.
  - If $s[i] \ne s[i - 1]$, a boundary has been crossed:
    - Add $\min(prevRun, currRun)$ to total `count`.
    - Set `prevRun = currRun`.
    - Reset `currRun = 1`.
- After exiting the loop, remember to add $\min(prevRun, currRun)$ for the final boundary transition.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$, where $n$ is the length of string $s$. We perform a single linear scan through the string with constant work per character.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$. Only two scalar integer counters (`prevRun`, `currRun`) and an accumulator are maintained.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 696 - Count Binary Substrings
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int countBinarySubstrings(String s) {
        int prevRun = 0;
        int currRun = 1;
        int count = 0;

        for (int i = 1; i < s.length(); i++) {
            if (s.charAt(i) == s.charAt(i - 1)) {
                currRun++;
            } else {
                count += Math.min(prevRun, currRun);
                prevRun = currRun;
                currRun = 1;
            }
        }
        count += Math.min(prevRun, currRun);

        return count;
    }
}
```

### Python
```python
"""
Problem: LeetCode 696 - Count Binary Substrings
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""

class Solution:
    def countBinarySubstrings(self, s: str) -> int:
        prev_run = 0
        curr_run = 1
        count = 0

        for i in range(1, len(s)):
            if s[i] == s[i - 1]:
                curr_run += 1
            else:
                count += min(prev_run, curr_run)
                prev_run = curr_run
                curr_run = 1

        count += min(prev_run, curr_run)
        return count
```

### C++
```cpp
/**
 * Problem: LeetCode 696 - Count Binary Substrings
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <algorithm>

using namespace std;

class Solution {
public:
    int countBinarySubstrings(string s) {
        int prevRun = 0;
        int currRun = 1;
        int count = 0;

        for (int i = 1; i < (int)s.length(); i++) {
            if (s[i] == s[i - 1]) {
                currRun++;
            } else {
                count += min(prevRun, currRun);
                prevRun = currRun;
                currRun = 1;
            }
        }
        count += min(prevRun, currRun);

        return count;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 696 - Count Binary Substrings
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} s
 * @return {number}
 */
var countBinarySubstrings = function(s) {
    let prevRun = 0;
    let currRun = 1;
    let count = 0;

    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) {
            currRun++;
        } else {
            count += Math.min(prevRun, currRun);
            prevRun = currRun;
            currRun = 1;
        }
    }
    count += Math.min(prevRun, currRun);

    return count;
};
```
