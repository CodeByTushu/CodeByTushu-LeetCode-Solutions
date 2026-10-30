# LeetCode 1415: The k-th Lexicographical String of All Happy Strings of Length n

- **Publication Date:** 14 March 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/the-k-th-lexicographical-string-of-all-happy-strings-of-length-n/](https://leetcode.com/problems/the-k-th-lexicographical-string-of-all-happy-strings-of-length-n/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

A **happy string** is a string that:
- Consists only of letters from the set `['a', 'b', 'c']`.
- Satisfies `s[i] != s[i + 1]` for all values of `i` from `1` to `s.length - 1` (no two adjacent characters are identical).

Given two integers `n` and `k`, consider a list of all happy strings of length `n` sorted in **lexicographical order**.

Return the **$k$-th string** of this list or return an **empty string** `""` if there are less than `k` happy strings of length `n`.

---

### Examples

#### Example 1:
- **Input:** `n = 1, k = 3`
- **Output:** `"c"`
- **Explanation:** The list `["a", "b", "c"]` contains all happy strings of length 1. The 3rd string is `"c"`.

#### Example 2:
- **Input:** `n = 1, k = 4`
- **Output:** `""`
- **Explanation:** There are only 3 happy strings of length 1, so the 4th string does not exist.

#### Example 3:
- **Input:** `n = 3, k = 9`
- **Output:** `"cab"`
- **Explanation:** There are 12 different happy strings of length 3: `["aba", "abc", "aca", "acb", "bab", "bac", "bca", "bcb", "cab", "cac", "cba", "cbc"]`. The 9th string is `"cab"`.

---

### Constraints

- `1 <= n <= 10`
- `1 <= k <= 100`

---

## Topics and Tags

- **Primary Tags:** String, Backtracking
- **Secondary Tags:** Combinatorics, Math

---

## Detailed Algorithm Walkthrough

### 1. Counting Total Happy Strings

To construct a happy string of length $n$:
- **Position 1 (First Character):** We can pick any of the 3 letters (`'a'`, `'b'`, `'c'`).
- **Positions 2 to $n$:** At each subsequent step, the character must differ from the immediately preceding character, giving exactly 2 choices.

Thus, the total number of happy strings of length $n$ is:
$$\text{Total} = 3 \times 2^{n - 1}$$

If $k > \text{Total}$, it is impossible to find the $k$-th string, so we immediately return `""`.

### 2. Direct Combinatorial Digit Selection ($\mathcal{O}(n)$ Time)

Because the list of strings is sorted in lexicographical order, the set of strings forms a balanced trie structure:
- Strings starting with `'a'` span indices $0$ to $2^{n - 1} - 1$.
- Strings starting with `'b'` span indices $2^{n - 1}$ to $2 \times 2^{n - 1} - 1$.
- Strings starting with `'c'` span indices $2 \times 2^{n - 1}$ to $3 \times 2^{n - 1} - 1$.

Converting $k$ to a 0-based index ($k \leftarrow k - 1$):
1. **First Character:**
   - Block size is $B = 2^{n - 1}$.
   - The first character choice index is $\lfloor k / B \rfloor$.
   - The character is `['a', 'b', 'c'][index]`.
   - Update $k \leftarrow k \pmod B$.
2. **Subsequent Characters:**
   - At position $i$ with $L = n - 1 - i$ remaining characters, the block size is $2^L$.
   - The available choices are the 2 characters in `['a', 'b', 'c']` different from `s[i - 1]`.
   - The choice index is $\lfloor k / 2^L \rfloor$.
   - Pick the corresponding choice in alphabetical order, append to the string, and update $k \leftarrow k \pmod{2^L}$.

This directly constructs the $k$-th string in pure $\mathcal{O}(n)$ time without generating or exploring any invalid branches.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$. The algorithm determines each character in $\mathcal{O}(1)$ time through $n$ iterations, requiring no full recursion tree generation. For $n \le 10$, this executes in $\approx 0$ ms.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$ beyond the $\mathcal{O}(n)$ string builder used to store the output.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 1415 - The k-th Lexicographical String of All Happy Strings of Length n
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public String getHappyString(int n, int k) {
        int total = 3 * (1 << (n - 1));
        if (k > total) {
            return "";
        }

        k--; // 0-indexed
        StringBuilder sb = new StringBuilder();
        char[] chars = {'a', 'b', 'c'};

        // First character
        int blockSize = 1 << (n - 1);
        int firstIdx = k / blockSize;
        sb.append(chars[firstIdx]);
        k %= blockSize;

        // Subsequent characters
        for (int step = n - 2; step >= 0; step--) {
            blockSize = 1 << step;
            int idx = k / blockSize;
            char prev = sb.charAt(sb.length() - 1);

            int count = 0;
            for (char c : chars) {
                if (c != prev) {
                    if (count == idx) {
                        sb.append(c);
                        break;
                    }
                    count++;
                }
            }

            k %= blockSize;
        }

        return sb.toString();
    }
}
```

### Python
```python
"""
Problem: LeetCode 1415 - The k-th Lexicographical String of All Happy Strings of Length n
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

class Solution:
    def getHappyString(self, n: int, k: int) -> str:
        total = 3 * (1 << (n - 1))
        if k > total:
            return ""

        k -= 1
        res = []
        chars = ['a', 'b', 'c']

        # First character
        block_size = 1 << (n - 1)
        idx = k // block_size
        res.append(chars[idx])
        k %= block_size

        # Subsequent characters
        for step in range(n - 2, -1, -1):
            block_size = 1 << step
            idx = k // block_size
            prev = res[-1]
            available = [c for c in chars if c != prev]
            res.append(available[idx])
            k %= block_size

        return "".join(res)
```

### C++
```cpp
/**
 * Problem: LeetCode 1415 - The k-th Lexicographical String of All Happy Strings of Length n
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <vector>

using namespace std;

class Solution {
public:
    string getHappyString(int n, int k) {
        int total = 3 * (1 << (n - 1));
        if (k > total) {
            return "";
        }

        k--; // 0-indexed
        string result = "";
        char chars[] = {'a', 'b', 'c'};

        // First character
        int blockSize = 1 << (n - 1);
        int firstIdx = k / blockSize;
        result += chars[firstIdx];
        k %= blockSize;

        // Subsequent characters
        for (int step = n - 2; step >= 0; step--) {
            blockSize = 1 << step;
            int idx = k / blockSize;
            char prev = result.back();

            int count = 0;
            for (char c : chars) {
                if (c != prev) {
                    if (count == idx) {
                        result += c;
                        break;
                    }
                    count++;
                }
            }

            k %= blockSize;
        }

        return result;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 1415 - The k-th Lexicographical String of All Happy Strings of Length n
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getHappyString = function(n, k) {
    const total = 3 * (1 << (n - 1));
    if (k > total) {
        return "";
    }

    k--; // 0-indexed
    const res = [];
    const chars = ['a', 'b', 'c'];

    // First character
    let blockSize = 1 << (n - 1);
    let idx = Math.floor(k / blockSize);
    res.push(chars[idx]);
    k %= blockSize;

    // Subsequent characters
    for (let step = n - 2; step >= 0; step--) {
        blockSize = 1 << step;
        idx = Math.floor(k / blockSize);
        const prev = res[res.length - 1];
        const available = chars.filter(c => c !== prev);
        res.push(available[idx]);
        k %= blockSize;
    }

    return res.join("");
};
```
