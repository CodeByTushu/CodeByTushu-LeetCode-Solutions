# LeetCode 1653: Minimum Deletions to Make String Balanced

- **Publication Date:** 07 February 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-deletions-to-make-string-balanced/](https://leetcode.com/problems/minimum-deletions-to-make-string-balanced/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/V-X5l_rWJe4?si=K2o8Ao3JKudyTgxd)

---

## Problem Summary

You are given a string `s` consisting only of characters `'a'` and `'b'`.

You can delete any number of characters in `s` to make `s` **balanced**. The string `s` is balanced if there is no pair of indices $(i, j)$ such that $i < j$ and $s[i] = \text{'b'}$ and $s[j] = \text{'a'}$.

Return the **minimum number of deletions** needed to make `s` balanced.

---

### Examples

#### Example 1:
- **Input:** `s = "aababbab"`
- **Output:** `2`
- **Explanation:**
  You can either:
  - Delete characters at 0-indexed positions 2 and 6 (`"aababbab"` $\to$ `"aaabbb"`), or
  - Delete characters at 0-indexed positions 3 and 6 (`"aababbab"` $\to$ `"aabbbb"`).

#### Example 2:
- **Input:** `s = "bbaaaaabb"`
- **Output:** `2`
- **Explanation:**
  The only optimal solution is to delete the first two `'b'` characters (`"bbaaaaabb"` $\to$ `"aaaaabb"`).

---

### Constraints

- $1 \le \text{s.length} \le 10^5$
- `s[i]` is `'a'` or `'b'`.

---

## Topics and Tags

- **Primary Tags:** String, Dynamic Programming, Stack
- **Secondary Tags:** Greedy, Prefix Sum

---

## Detailed Algorithm Walkthrough

### 1. Structural Insight

A string consisting of `'a'` and `'b'` is balanced if and only if no `'b'` precedes any `'a'`. This implies every valid balanced string has the structure:
$$\underbrace{\text{'a' \dots 'a}}_{k \text{ times}} \, \underbrace{\text{'b' \dots 'b}}_{n - k \text{ times}}$$
where all `'a'`s appear before all `'b'`s (with either block potentially empty).

### 2. Single-Pass Dynamic Programming / Greedy

As we iterate from left to right through the string `s`, we track:
- `bCount`: The total number of `'b'` characters encountered so far.
- `deletions`: The minimum deletions required to balance the prefix processed up to the current character.

When processing character `c`:
1. If $c = \text{'b'}$:
   - Appending a `'b'` to an already balanced string can never introduce an invalid `'ba'` pair!
   - Therefore, `bCount` increments by 1, while `deletions` remains unchanged.
2. If $c = \text{'a'}$:
   - Appending an `'a'` after earlier `'b'` characters creates an inversion.
   - We face two mutually exclusive decisions:
     1. **Delete the current `'a'`:** Keeps the previous balanced prefix as is, adding 1 deletion ($\text{deletions} + 1$).
     2. **Keep the current `'a'`:** Requires deleting all previous `'b'` characters encountered so far ($\text{bCount}$).
   - The optimal choice is:
     $$\text{deletions} = \min(\text{deletions} + 1, \, \text{bCount})$$

### 3. Alternative Viewpoint: Stack-Based Deletion

Alternatively, view this using a stack:
- Push characters onto a stack.
- Whenever we see `'a'` while `'b'` is on top of the stack, we found an invalid pair `'ba'`. We pop the `'b'`, increment our deletion count by 1, and discard the `'a'`.
- This greedy elimination produces the identical minimum deletion result.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$, where $n$ is the length of `s`. We make a single linear pass inspecting each character in constant $\mathcal{O}(1)$ time.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$ auxiliary space. Only two scalar integer counters (`bCount` and `deletions`) are maintained.

---

## Source Code

### Java
```java
class Solution {
    public int minimumDeletions(String s) {
        int bCount = 0;
        int deletions = 0;

        for (char c : s.toCharArray()) {
            if (c == 'b') {
                bCount++;
            } else {
                deletions = Math.min(deletions + 1, bCount);
            }
        }

        return deletions;
    }
}
```

### Python
```python
class Solution:
    def minimumDeletions(self, s: str) -> int:
        b_count = 0
        deletions = 0

        for ch in s:
            if ch == 'b':
                b_count += 1
            else:
                deletions = min(deletions + 1, b_count)

        return deletions
```

### C++
```cpp
#include <string>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minimumDeletions(string s) {
        int bCount = 0;
        int deletions = 0;

        for (char c : s) {
            if (c == 'b') {
                bCount++;
            } else {
                deletions = min(deletions + 1, bCount);
            }
        }

        return deletions;
    }
};
```

### JavaScript
```javascript
/**
 * @param {string} s
 * @return {number}
 */
var minimumDeletions = function(s) {
    let bCount = 0;
    let deletions = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === 'b') {
            bCount++;
        } else {
            deletions = Math.min(deletions + 1, bCount);
        }
    }

    return deletions;
};
```
