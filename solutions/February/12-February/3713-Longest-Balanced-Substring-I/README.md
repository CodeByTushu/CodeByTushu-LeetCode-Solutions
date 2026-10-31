# LeetCode 3713: Longest Balanced Substring I

- **Publication Date:** 12 February 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/longest-balanced-substring-i/](https://leetcode.com/problems/longest-balanced-substring-i/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/3uAy3heh2cc?si=aK8CtRg36hPUi_t_)

---

## Problem Summary

You are given a string `s` consisting of lowercase English letters.

A substring of `s` is called **balanced** if all **distinct** characters in the substring appear the **same number of times**.

Return the length of the **longest balanced substring** of `s`.

---

### Examples

#### Example 1:
- **Input:** `s = "abbac"`
- **Output:** `4`
- **Explanation:**
  - The longest balanced substring is `"abba"` because both distinct characters `'a'` and `'b'` each appear exactly 2 times.
  - Thus, the answer is 4.

#### Example 2:
- **Input:** `s = "zzabccy"`
- **Output:** `4`
- **Explanation:**
  - The longest balanced substring is `"zabc"` because the distinct characters `'z'`, `'a'`, `'b'`, and `'c'` each appear exactly 1 time.
  - Thus, the answer is 4.

#### Example 3:
- **Input:** `s = "aba"`
- **Output:** `2`
- **Explanation:**
  - One of the longest balanced substrings is `"ab"` because both distinct characters `'a'` and `'b'` each appear exactly 1 time.
  - Another longest balanced substring is `"ba"`.
  - Thus, the answer is 2.

---

### Constraints

- $1 \le \text{s.length} \le 1000$
- `s` consists of lowercase English letters.

---

## Topics and Tags

- **Primary Tags:** String, Hash Table, Counting
- **Secondary Tags:** Sliding Window, Enumeration

---

## Detailed Algorithm Walkthrough

### 1. Balanced Frequency Invariant

A substring $s[i \dots j]$ of length $L = j - i + 1$ is balanced if every distinct character present in the substring has the identical frequency $c \ge 1$.

If there are $k$ distinct characters in the substring, the total length must be:
$$L = \sum_{char} \text{freq}[char] = k \times c$$

### 2. The $\mathcal{O}(1)$ Equivalence: $L = k \times \text{maxFreq}$

Let $k$ be the number of distinct characters in the substring, and let $\text{maxFreq} = \max_{char} \text{freq}[char]$.

For any set of $k$ distinct positive frequencies $f_1, f_2, \dots, f_k$:
1. By definition, $f_r \le \text{maxFreq}$ for all $1 \le r \le k$.
2. Summing over all $k$ characters:
   $$\sum_{r=1}^k f_r \le k \times \text{maxFreq}$$
3. Therefore:
   $$k \times \text{maxFreq} - \sum_{r=1}^k f_r = \sum_{r=1}^k (\text{maxFreq} - f_r) = 0 \iff f_r = \text{maxFreq} \quad (\forall r)$$

> **Key Invariant:**
> A substring has all distinct character frequencies equal **if and only if** its total length equals the number of distinct characters multiplied by the maximum character frequency:
> $$L = k \times \text{maxFreq}$$

This observation allows us to verify whether any substring is balanced in **$\mathcal{O}(1)$ time** without iterating over the alphabet!

### 3. Window Enumeration with Pruning

Given $n \le 1000$:
1. For each candidate start index $i \in [0, n - 1]$:
   - If the remaining suffix length $n - i \le \text{maxLen}$, break immediately because no longer substring can be found.
   - Reset the frequency array of size $26$ and initialize `distinct = 0` and `maxFreq = 0`.
2. As the end index $j$ expands from $i$ to $n - 1$:
   - Increment the frequency of character $s[j]$.
   - If this character was not previously present (`freq[c] == 1`), increment `distinct`.
   - Update $\text{maxFreq} = \max(\text{maxFreq}, \text{freq}[c])$.
   - If $(j - i + 1) == \text{distinct} \times \text{maxFreq}$, update $\text{maxLen} = \max(\text{maxLen}, j - i + 1)$.

Total inner loop steps across the entire string is at most $\frac{n(n+1)}{2} \approx 5 \times 10^5$, executing in under $2\text{ ms}$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n^2)$, where $n$ is the length of `s`. There are $\frac{n(n+1)}{2}$ substring windows, and each update and balance validation check runs in strict $\mathcal{O}(1)$ time.
- **Auxiliary Space Complexity:** $\mathcal{O}(\Sigma) = \mathcal{O}(1)$, where $\Sigma = 26$ represents the lowercase English alphabet, using a fixed-size frequency table.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 3713 - Longest Balanced Substring I
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.Arrays;

class Solution {
    public int longestBalanced(String s) {
        int n = s.length();
        int maxLen = 0;
        char[] arr = s.toCharArray();
        int[] freq = new int[26];

        for (int i = 0; i < n; i++) {
            if (n - i <= maxLen) {
                break;
            }
            Arrays.fill(freq, 0);
            int distinct = 0;
            int maxFreq = 0;

            for (int j = i; j < n; j++) {
                int c = arr[j] - 'a';
                if (freq[c] == 0) {
                    distinct++;
                }
                freq[c]++;
                if (freq[c] > maxFreq) {
                    maxFreq = freq[c];
                }

                int len = j - i + 1;
                if (len == distinct * maxFreq) {
                    if (len > maxLen) {
                        maxLen = len;
                    }
                }
            }
        }

        return maxLen;
    }
}
```

### Python
```python
"""
Problem: LeetCode 3713 - Longest Balanced Substring I
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

class Solution:
    def longestBalanced(self, s: str) -> int:
        n = len(s)
        max_len = 0

        for i in range(n):
            if n - i <= max_len:
                break
            freq = [0] * 26
            distinct = 0
            max_freq = 0

            for j in range(i, n):
                c = ord(s[j]) - ord('a')
                if freq[c] == 0:
                    distinct += 1
                freq[c] += 1
                if freq[c] > max_freq:
                    max_freq = freq[c]

                length = j - i + 1
                if length == distinct * max_freq:
                    if length > max_len:
                        max_len = length

        return max_len
```

### C++
```cpp
/**
 * Problem: LeetCode 3713 - Longest Balanced Substring I
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int longestBalanced(string s) {
        int n = s.length();
        int maxLen = 0;
        int freq[26];

        for (int i = 0; i < n; i++) {
            if (n - i <= maxLen) {
                break;
            }
            fill(begin(freq), end(freq), 0);
            int distinct = 0;
            int maxFreq = 0;

            for (int j = i; j < n; j++) {
                int c = s[j] - 'a';
                if (freq[c] == 0) {
                    distinct++;
                }
                freq[c]++;
                if (freq[c] > maxFreq) {
                    maxFreq = freq[c];
                }

                int len = j - i + 1;
                if (len == distinct * maxFreq) {
                    if (len > maxLen) {
                        maxLen = len;
                    }
                }
            }
        }

        return maxLen;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 3713 - Longest Balanced Substring I
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {string} s
 * @return {number}
 */
var longestBalanced = function(s) {
    const n = s.length;
    let maxLen = 0;
    const freq = new Int32Array(26);

    for (let i = 0; i < n; i++) {
        if (n - i <= maxLen) {
            break;
        }
        freq.fill(0);
        let distinct = 0;
        let maxFreq = 0;

        for (let j = i; j < n; j++) {
            const c = s.charCodeAt(j) - 97;
            if (freq[c] === 0) {
                distinct++;
            }
            freq[c]++;
            if (freq[c] > maxFreq) {
                maxFreq = freq[c];
            }

            const len = j - i + 1;
            if (len === distinct * maxFreq) {
                if (len > maxLen) {
                    maxLen = len;
                }
            }
        }
    }

    return maxLen;
};
```
