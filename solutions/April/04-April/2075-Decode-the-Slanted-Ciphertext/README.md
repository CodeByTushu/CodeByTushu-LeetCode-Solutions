# LeetCode 2075: Decode the Slanted Ciphertext

- **Publication Date:** 04 April 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/decode-the-slanted-ciphertext/](https://leetcode.com/problems/decode-the-slanted-ciphertext/)
- **YouTube Solution:** [Watch Video](https://youtu.be/TZMO7VPnFhU?si=kmJFpe3iz2FIr7b_)

---

## Problem Summary

A string `originalText` is encoded using a slanted transposition cipher to a string `encodedText` with the help of a matrix having a fixed number of rows `rows`.

`originalText` is placed first in a top-left to bottom-right manner:
- The first diagonal (starting at column $0$) is filled, followed by the second diagonal (starting at column $1$), the third diagonal (starting at column $2$), and so on, until the end of `originalText` is reached.
- All empty cells are filled with spaces `' '`.
- The number of columns is chosen such that the rightmost column will not be empty after filling in `originalText`.

`encodedText` is then formed by appending all characters of the matrix in a row-wise fashion.

Given the encoded string `encodedText` and the number of rows `rows`, return the original string `originalText`.

**Note:**
- `originalText` does not have any trailing spaces `' '`.
- The test cases are generated such that there is only one possible `originalText`.

---

### Examples

#### Example 1:
- **Input:** `encodedText = "ch   ie   pr", rows = 3`
- **Output:** `"cipher"`
- **Explanation:**
  The matrix looks like:
  ```text
  c h _ _
  _ i e _
  _ _ p r
  ```
  Traversing slanted diagonals top-left to bottom-right:
  - Diagonal starting at $(0, 0)$: `c -> i -> p`
  - Diagonal starting at $(0, 1)$: `h -> e -> r`
  Combining them yields `"cipher"`.

#### Example 2:
- **Input:** `encodedText = "iveo    eed   l te   olc", rows = 4`
- **Output:** `"i love leetcode"`
- **Explanation:**
  The matrix has $4$ rows and $7$ columns:
  - Reading along the slanted diagonals reconstructs `"i love leetcode"`.

#### Example 3:
- **Input:** `encodedText = "coding", rows = 1`
- **Output:** `"coding"`
- **Explanation:**
  Since there is only $1$ row, both `originalText` and `encodedText` are identical.

---

### Constraints

- $0 \le \text{encodedText.length} \le 10^6$
- `encodedText` consists of lowercase English letters and `' '` only.
- `encodedText` is a valid encoding of some `originalText` that does not have trailing spaces.
- $1 \le \text{rows} \le 1000$
- The testcases are generated such that there is only one possible `originalText`.

---

## Topics and Tags

- **Primary Tags:** String, Matrix, Simulation
- **Secondary Tags:** Array

---

## Detailed Algorithm Walkthrough

### 1. Matrix Dimensions
Let $N$ be the length of `encodedText`.
Since `encodedText` is formed by reading the matrix row by row:
$$\text{cols} = \frac{N}{\text{rows}}$$
If $N == 0$ or $\text{rows} == 1$, `encodedText` is already the decoded string.

### 2. 1D to 2D Coordinate Mapping
A character at matrix coordinates $(r, c)$ corresponds to the 1D index in `encodedText`:
$$\text{index} = r \cdot \text{cols} + c$$

### 3. Slanted Diagonal Traversal
The encoding placed `originalText` sequentially along diagonal paths $(r, c) \to (r + 1, c + 1)$.
To reconstruct `originalText`, we iterate through each starting column $c \in [0, \text{cols} - 1]$ at row $0$:
- Move down and right by incrementing both the row $r$ from $0$ up to $\text{rows} - 1$ and the column index $c + r$.
- If $c + r \ge \text{cols}$, the diagonal exits the right boundary of the matrix, so we stop the inner loop.
- Append the character at index $r \cdot \text{cols} + (c + r)$ to our result buffer.

### 4. Trimming Trailing Spaces
The matrix was padded with `' '` to form a complete rectangular grid. In `originalText`, spaces between words are valid, but trailing spaces added due to matrix padding must be stripped. We trim only trailing spaces from the end of the constructed string.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - Each character of `encodedText` is visited at most once during the diagonal traversal.
  - Trimming trailing spaces takes $\mathcal{O}(N)$ in the worst case.
  - Overall runtime is strictly linear with respect to the input length $N \le 10^6$, finishing in $\approx 15\text{ ms}$.
- **Space Complexity:** $\mathcal{O}(N)$ auxiliary space for storing the reconstructed output string buffer.

---

## Solutions

### Java ☕
```java
/**
 * Problem: LeetCode 2075 - Decode the Slanted Ciphertext
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public String decodeCiphertext(String encodedText, int rows) {
        if (rows == 1 || encodedText == null || encodedText.isEmpty()) {
            return encodedText;
        }

        int n = encodedText.length();
        int cols = n / rows;
        StringBuilder sb = new StringBuilder(n);

        for (int c = 0; c < cols; c++) {
            for (int r = 0; r < rows && c + r < cols; r++) {
                sb.append(encodedText.charAt(r * cols + (c + r)));
            }
        }

        int len = sb.length();
        while (len > 0 && sb.charAt(len - 1) == ' ') {
            len--;
        }
        sb.setLength(len);

        return sb.toString();
    }
}
```

### Python 🐍
```python
"""
Problem: LeetCode 2075 - Decode the Slanted Ciphertext
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""
class Solution:
    def decodeCiphertext(self, encodedText: str, rows: int) -> str:
        """
        Decodes a slanted transposition ciphertext matrix back into originalText.
        
        Time Complexity: O(N)
        Space Complexity: O(N)
        """
        if rows == 1 or not encodedText:
            return encodedText

        n = len(encodedText)
        cols = n // rows
        res = []

        for c in range(cols):
            for r in range(rows):
                if c + r >= cols:
                    break
                res.append(encodedText[r * cols + (c + r)])

        return "".join(res).rstrip(" ")
```

### C++ ⚡
```cpp
/**
 * Problem: LeetCode 2075 - Decode the Slanted Ciphertext
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>

using namespace std;

class Solution {
public:
    string decodeCiphertext(string encodedText, int rows) {
        if (rows == 1 || encodedText.empty()) {
            return encodedText;
        }

        int n = encodedText.size();
        int cols = n / rows;
        string res = "";
        res.reserve(n);

        for (int c = 0; c < cols; c++) {
            for (int r = 0; r < rows && c + r < cols; r++) {
                res += encodedText[r * cols + (c + r)];
            }
        }

        while (!res.empty() && res.back() == ' ') {
            res.pop_back();
        }

        return res;
    }
};
```

### JavaScript 🌐
```javascript
/**
 * Problem: LeetCode 2075 - Decode the Slanted Ciphertext
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */
var decodeCiphertext = function(encodedText, rows) {
    if (rows === 1 || !encodedText) {
        return encodedText;
    }

    const n = encodedText.length;
    const cols = Math.floor(n / rows);
    const res = [];

    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows && c + r < cols; r++) {
            res.push(encodedText[r * cols + (c + r)]);
        }
    }

    while (res.length > 0 && res[res.length - 1] === ' ') {
        res.pop();
    }

    return res.join('');
};
```
