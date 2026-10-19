# LeetCode 3838: Weighted Word Mapping

- **Publication Date:** 13 June 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/weighted-word-mapping/](https://leetcode.com/problems/weighted-word-mapping/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/Sv0sgqKjSqk?si=mdSMVKp_x6Ryi1W10)

---

## Problem Summary

You are given an array of strings `words`, where each string represents a word containing lowercase English letters.

You are also given an integer array `weights` of length `26`, where `weights[i]` represents the weight of the $i$-th lowercase English letter (`'a'` corresponds to index `0`, `'b'` to index `1`, ..., `'z'` to index `25`).

The **weight of a word** is defined as the sum of the weights of its characters.

For each word, take its weight **modulo 26** and map the result to a lowercase English letter using **reverse alphabetical order**:
- `0 -> 'z'`
- `1 -> 'y'`
- `...`
- `25 -> 'a'`

Return a string formed by concatenating the mapped characters for all words in order.

---

### Examples

#### Example 1:
- **Input:**
  - `words = ["abcd", "def", "xyz"]`
  - `weights = [5, 3, 12, 14, 1, 2, 3, 2, 10, 6, 6, 9, 7, 8, 7, 10, 8, 9, 6, 9, 9, 8, 3, 7, 7, 2]`
- **Output:** `"rij"`
- **Explanation:**
  - The weight of `"abcd"` is $5 + 3 + 12 + 14 = 34$. The result modulo $26$ is $34 \bmod 26 = 8$, which maps to `'r'`.
  - The weight of `"def"` is $14 + 1 + 2 = 17$. The result modulo $26$ is $17 \bmod 26 = 17$, which maps to `'i'`.
  - The weight of `"xyz"` is $7 + 7 + 2 = 16$. The result modulo $26$ is $16 \bmod 26 = 16$, which maps to `'j'`.
  - Thus, the string formed by concatenating the mapped characters is `"rij"`.

---

### Constraints

- $1 \le \text{words.length} \le 10^5$
- $1 \le \text{words}[i].\text{length} \le 10^5$
- The total sum of $\text{words}[i].\text{length}$ does not exceed $10^5$.
- `words[i]` consists only of lowercase English letters.
- $\text{weights.length} == 26$
- $0 \le \text{weights}[i] \le 10^4$

---

## Algorithmic Approach

### 1. Direct Word Weight Computation
For each string `word` in `words`:
1. Initialize an accumulator `sum = 0`.
2. For each character `ch` in `word`, find its $0$-indexed alphabetical position `ch - 'a'` and add `weights[ch - 'a']` to `sum`.
3. Compute the modulo remainder:
   $$\text{rem} = \text{sum} \bmod 26$$

### 2. Reverse Alphabetical Mapping
The mapping rule specifies:
- Remainder $0 \implies \text{'z'}$
- Remainder $1 \implies \text{'y'}$
- ...
- Remainder $25 \implies \text{'a'}$

Mathematically, this corresponds directly to:
$$\text{mapped} = \text{'z'} - \text{rem}$$

Because ASCII codes for `'a'` through `'z'` are contiguous, subtracting `rem` from the ASCII code of `'z'` yields the exact target character in $\mathcal{O}(1)$ time without requiring auxiliary lookup tables or hash maps.

### 3. Result Construction
Append each mapped character to a string builder or character buffer. Once all words are processed, return the resulting string.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(L)$ | Where $L = \sum |\text{words}[i]|$ is the total number of characters across all words. Each character is visited once, with $\mathcal{O}(1)$ array lookup and addition. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Only a few primitive scalar variables (`sum`, `rem`, `mapped`) are allocated. The output buffer requires $\mathcal{O}(N)$ where $N = |\text{words}|$, which is the minimum space required to store the answer. |

---

## Multi-Language Implementations

### Java
```java
class Solution {
    public String mapWordWeights(String[] words, int[] weights) {

        StringBuilder ans = new StringBuilder();

        for (String word : words) {

            long sum = 0;

            for (char ch : word.toCharArray()) {
                sum += weights[ch - 'a'];
            }

            int rem = (int) (sum % 26);

            // Reverse alphabetical mapping:
            // 0 -> 'z', 1 -> 'y', ..., 25 -> 'a'
            char mapped = (char) ('z' - rem);

            ans.append(mapped);
        }

        return ans.toString();
    }
}
```

### Python
```python
from typing import List

class Solution:
    def mapWordWeights(self, words: List[str], weights: List[int]) -> str:
        ans = []
        for word in words:
            total_weight = sum(weights[ord(ch) - ord('a')] for ch in word)
            rem = total_weight % 26
            # Reverse alphabetical mapping: 0 -> 'z', 1 -> 'y', ..., 25 -> 'a'
            mapped_char = chr(ord('z') - rem)
            ans.append(mapped_char)
        return "".join(ans)
```

### C++
```cpp
#include <string>
#include <vector>

using namespace std;

class Solution {
public:
    string mapWordWeights(vector<string>& words, vector<int>& weights) {
        string ans = "";
        ans.reserve(words.size());

        for (const string& word : words) {
            long long sum = 0;
            for (char ch : word) {
                sum += weights[ch - 'a'];
            }

            int rem = sum % 26;
            // Reverse alphabetical mapping:
            // 0 -> 'z', 1 -> 'y', ..., 25 -> 'a'
            char mapped = 'z' - rem;
            ans += mapped;
        }

        return ans;
    }
};
```

### JavaScript
```javascript
/**
 * @param {string[]} words
 * @param {number[]} weights
 * @return {string}
 */
var mapWordWeights = function(words, weights) {
    let ans = '';

    for (const word of words) {
        let sum = 0;
        for (let i = 0; i < word.length; i++) {
            sum += weights[word.charCodeAt(i) - 97];
        }

        const rem = sum % 26;
        // Reverse alphabetical mapping: 0 -> 'z', 1 -> 'y', ..., 25 -> 'a'
        const mapped = String.fromCharCode(122 - rem);
        ans += mapped;
    }

    return ans;
};
```
