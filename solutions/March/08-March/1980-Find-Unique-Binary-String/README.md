# LeetCode 1980: Find Unique Binary String

- **Publication Date:** 08 March 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/find-unique-binary-string/](https://leetcode.com/problems/find-unique-binary-string/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/kBxycqLcwjs?si=K6TZ2i66lt-yQFa8)

---

## Problem Summary

Given an array of strings `nums` containing `n` unique binary strings each of length `n`, return a binary string of length `n` that **does not appear** in `nums`. If there are multiple answers, you may return any of them.

---

### Examples

#### Example 1:
- **Input:** `nums = ["01","10"]`
- **Output:** `"11"`
- **Explanation:** `"11"` does not appear in `nums`. `"00"` would also be correct.

#### Example 2:
- **Input:** `nums = ["00","01"]`
- **Output:** `"11"`
- **Explanation:** `"11"` does not appear in `nums`. `"10"` would also be correct.

#### Example 3:
- **Input:** `nums = ["111","011","001"]`
- **Output:** `"101"`
- **Explanation:** `"101"` does not appear in `nums`. `"000"`, `"010"`, `"100"`, and `"110"` would also be correct.

---

### Constraints

- `n == nums.length`
- `1 <= n <= 16`
- `nums[i].length == n`
- `nums[i]` is either `'0'` or `'1'`.
- All the strings of `nums` are unique.

---

## Topics and Tags

- **Primary Tags:** Array, String
- **Secondary Tags:** Backtracking, Math

---

## Detailed Algorithm Walkthrough

### 1. The Power of Cantor's Diagonal Argument

While this problem can be solved using backtracking, hash sets, or integer conversion, Georg Cantor's famous **Diagonal Argument** provides the most optimal, elegant $\mathcal{O}(n)$ constructive solution.

Given $n$ binary strings of length $n$:
$$\begin{matrix}
\text{nums}[0]: & \mathbf{b_{0,0}} & b_{0,1} & b_{0,2} & \dots & b_{0,n-1} \\
\text{nums}[1]: & b_{1,0} & \mathbf{b_{1,1}} & b_{1,2} & \dots & b_{1,n-1} \\
\text{nums}[2]: & b_{2,0} & b_{2,1} & \mathbf{b_{2,2}} & \dots & b_{2,n-1} \\
\vdots & & & \ddots & & \\
\text{nums}[n-1]: & b_{n-1,0} & b_{n-1,1} & b_{n-1,2} & \dots & \mathbf{b_{n-1,n-1}}
\end{matrix}$$

We can construct a new binary string $S$ of length $n$ by inverting each diagonal element:
$$S[i] = \begin{cases} '1' & \text{if } \text{nums}[i][i] = '0' \\ '0' & \text{if } \text{nums}[i][i] = '1' \end{cases}$$

### 2. Mathematical Proof of Uniqueness

- For any string $\text{nums}[i]$ ($0 \le i < n$), our constructed string $S$ explicitly differs from $\text{nums}[i]$ at position $i$ ($S[i] \ne \text{nums}[i][i]$).
- Since $S$ differs from $\text{nums}[0]$ at index $0$, $S \ne \text{nums}[0]$.
- Since $S$ differs from $\text{nums}[1]$ at index $1$, $S \ne \text{nums}[1]$.
- In general, $S$ differs from every $\text{nums}[i]$ at index $i$, which strictly guarantees that $S \ne \text{nums}[i]$ for all $0 \le i < n$.
- Therefore, $S$ is guaranteed not to exist in `nums`.

### 3. Step-by-Step Implementation

1. Initialize a string builder / empty string of length $n$.
2. Iterate through each index $i$ from $0$ to $n - 1$:
   - Inspect the character at $\text{nums}[i][i]$.
   - Append `'1'` if it is `'0'`, or `'0'` if it is `'1'`.
3. Return the resulting string.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$, where $n$ is the length of `nums`. We perform a single loop of $n$ iterations, extracting and flipping one character per string in $\mathcal{O}(1)$ time.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$ auxiliary space beyond the $\mathcal{O}(n)$ memory required to store and return the output string.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 1980 - Find Unique Binary String
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public String findDifferentBinaryString(String[] nums) {
        StringBuilder sb = new StringBuilder();
        int n = nums.length;

        // Cantor's Diagonalization:
        // Construct string such that char at index i differs from nums[i].charAt(i)
        for (int i = 0; i < n; i++) {
            sb.append(nums[i].charAt(i) == '0' ? '1' : '0');
        }

        return sb.toString();
    }
}
```

### Python
```python
"""
Problem: LeetCode 1980 - Find Unique Binary String
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

from typing import List

class Solution:
    def findDifferentBinaryString(self, nums: List[str]) -> str:
        # Cantor's Diagonal Argument:
        # Construct a string where the i-th character is inverted from nums[i][i]
        return "".join('1' if nums[i][i] == '0' else '0' for i in range(len(nums)))
```

### C++
```cpp
/**
 * Problem: LeetCode 1980 - Find Unique Binary String
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    string findDifferentBinaryString(vector<string>& nums) {
        string res = "";
        int n = nums.size();

        // Cantor's Diagonalization:
        // Flip the diagonal bit nums[i][i] so res differs from every nums[i]
        for (int i = 0; i < n; i++) {
            res += (nums[i][i] == '0' ? '1' : '0');
        }

        return res;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 1980 - Find Unique Binary String
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string[]} nums
 * @return {string}
 */
var findDifferentBinaryString = function(nums) {
    const n = nums.length;
    let res = "";

    // Cantor's Diagonalization:
    // Invert the i-th character of the i-th string
    for (let i = 0; i < n; i++) {
        res += nums[i][i] === '0' ? '1' : '0';
    }

    return res;
};
```
