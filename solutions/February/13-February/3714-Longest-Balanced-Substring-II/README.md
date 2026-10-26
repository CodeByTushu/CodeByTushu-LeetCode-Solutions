# LeetCode 3714: Longest Balanced Substring II

- **Publication Date:** 13 February 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/longest-balanced-substring-ii/](https://leetcode.com/problems/longest-balanced-substring-ii/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

You are given a string `s` consisting only of the characters `'a'`, `'b'`, and `'c'`.

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
- **Input:** `s = "aabcc"`
- **Output:** `3`
- **Explanation:**
  - The longest balanced substring is `"abc"` because all distinct characters `'a'`, `'b'`, and `'c'` each appear exactly 1 time.
  - Thus, the answer is 3.

#### Example 3:
- **Input:** `s = "aba"`
- **Output:** `2`
- **Explanation:**
  - One of the longest balanced substrings is `"ab"` because both distinct characters `'a'` and `'b'` each appear exactly 1 time.
  - Another longest balanced substring is `"ba"`.
  - Thus, the answer is 2.

---

### Constraints

- $1 \le \text{s.length} \le 10^5$
- `s` contains only the characters `'a'`, `'b'`, and `'c'`.

---

## Topics and Tags

- **Primary Tags:** String, Hash Table, Prefix Sum
- **Secondary Tags:** Counting, Sliding Window

---

## Detailed Algorithm Walkthrough

### 1. Cardinality Decomposition

Because the alphabet contains only three characters $\{'a', 'b', 'c'\}$, any substring can contain either $1$, $2$, or $3$ distinct characters. We decompose the problem into three disjoint cases based on the number of distinct characters $|D|$:

$$\text{maxLen} = \max(\text{maxLen}_1, \text{maxLen}_2, \text{maxLen}_3)$$

---

### 2. Case 1: Exactly 1 Distinct Character ($|D| = 1$)

Any substring consisting of a single repeated character (e.g., `"aaaa"`) is balanced because all distinct characters (only one) appear the same number of times.
- The maximum length for this case is simply the longest contiguous run of identical characters in $s$.
- This is computed with a single linear scan in $\mathcal{O}(n)$ time.

---

### 3. Case 2: Exactly 2 Distinct Characters ($|D| = 2$)

There are three possible pairs of characters:
1. $\{'a', 'b'\}$ with `'c'` strictly absent.
2. $\{'b', 'c'\}$ with `'a'` strictly absent.
3. $\{'a', 'c'\}$ with `'b'` strictly absent.

For a chosen pair $(c_1, c_2)$ avoiding `avoid`:
1. The absent character `avoid` acts as a delimiter. We split $s$ into contiguous segments that do not contain `avoid`.
2. Within each segment, both characters $c_1$ and $c_2$ must appear the exact same number of times ($count(c_1) = count(c_2) > 0$).
3. We assign weight $+1$ to $c_1$ and $-1$ to $c_2$. Maintaining the running prefix difference:
   $$\Delta = count(c_1) - count(c_2)$$
   A substring between prefix $i$ and prefix $j$ has equal counts if and only if $\Delta_j == \Delta_i$.
4. We store the first occurrence of each difference in a hash map to maximize $j - i$.

---

### 4. Case 3: Exactly 3 Distinct Characters ($|D| = 3$)

All three characters `'a'`, `'b'`, and `'c'` must appear and satisfy:
$$count(a) = count(b) = count(c) > 0$$

Let $cnt[c][i]$ be the prefix frequency of character $c$ up to index $i$. For any range $(i, j]$:
$$cnt[a][j] - cnt[a][i] = cnt[b][j] - cnt[b][i] = cnt[c][j] - cnt[c][i]$$

Rearranging into invariants:
$$(cnt[a][j] - cnt[b][j]) = (cnt[a][i] - cnt[b][i]) \quad \text{and} \quad (cnt[b][j] - cnt[c][j]) = (cnt[b][i] - cnt[c][i])$$

We define the prefix state as a 2D difference tuple:
$$\text{state}(i) = \big(cnt[a][i] - cnt[b][i], \, cnt[b][i] - cnt[c][i]\big)$$

A range $(i, j]$ has all three character counts equal if and only if:
$$\text{state}(j) == \text{state}(i)$$

Whenever a state has been seen before at index $i$, the length is $j - i$. Because $j > i$ and all three counts are equal, each character must appear at least $\frac{j - i}{3} \ge 1$ times, guaranteeing that all three distinct characters are present.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$, where $n$ is the length of `s`.
  - Case 1 performs a single pass over $s$: $\mathcal{O}(n)$.
  - Case 2 evaluates 3 pairs of characters, each taking linear time: $3 \times \mathcal{O}(n) = \mathcal{O}(n)$.
  - Case 3 computes the prefix 2D difference state across $s$ with $\mathcal{O}(1)$ average hash map operations: $\mathcal{O}(n)$.
  - Total Time: $\mathcal{O}(n)$.
- **Auxiliary Space Complexity:** $\mathcal{O}(n)$, to store prefix differences and states in hash maps.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 3714 - Longest Balanced Substring II
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.HashMap;
import java.util.Map;

class Solution {
    public int longestBalanced(String s) {
        int n = s.length();
        int maxLen = 1;

        // Case 1: Substring contains exactly 1 distinct character
        // The longest balanced substring is the longest consecutive run of identical characters.
        int curRun = 1;
        for (int i = 1; i < n; i++) {
            if (s.charAt(i) == s.charAt(i - 1)) {
                curRun++;
            } else {
                curRun = 1;
            }
            if (curRun > maxLen) {
                maxLen = curRun;
            }
        }

        // Case 2: Substring contains exactly 2 distinct characters
        // Pairs: (a, b) avoiding c, (b, c) avoiding a, (a, c) avoiding b
        char[][] pairs = {
            {'a', 'b', 'c'},
            {'b', 'c', 'a'},
            {'a', 'c', 'b'}
        };

        for (char[] p : pairs) {
            char c1 = p[0], c2 = p[1], avoid = p[2];
            int start = 0;
            while (start < n) {
                while (start < n && s.charAt(start) == avoid) {
                    start++;
                }
                if (start >= n) {
                    break;
                }
                int end = start;
                while (end < n && s.charAt(end) != avoid) {
                    end++;
                }

                Map<Integer, Integer> map = new HashMap<>();
                map.put(0, start - 1);
                int diff = 0;
                for (int i = start; i < end; i++) {
                    char ch = s.charAt(i);
                    if (ch == c1) {
                        diff++;
                    } else if (ch == c2) {
                        diff--;
                    }

                    if (map.containsKey(diff)) {
                        int len = i - map.get(diff);
                        if (len > maxLen) {
                            maxLen = len;
                        }
                    } else {
                        map.put(diff, i);
                    }
                }
                start = end;
            }
        }

        // Case 3: Substring contains all 3 distinct characters
        // Equal frequencies: cnt[a] - cnt[b] == 0 and cnt[b] - cnt[c] == 0 relative to prefix.
        Map<Long, Integer> stateMap = new HashMap<>();
        stateMap.put(encode(0, 0), -1);
        int ca = 0, cb = 0, cc = 0;

        for (int i = 0; i < n; i++) {
            char ch = s.charAt(i);
            if (ch == 'a') {
                ca++;
            } else if (ch == 'b') {
                cb++;
            } else if (ch == 'c') {
                cc++;
            }

            long key = encode(ca - cb, cb - cc);
            if (stateMap.containsKey(key)) {
                int len = i - stateMap.get(key);
                if (len > maxLen) {
                    maxLen = len;
                }
            } else {
                stateMap.put(key, i);
            }
        }

        return maxLen;
    }

    private long encode(int d1, int d2) {
        return (((long) d1) << 32) | (d2 & 0xFFFFFFFFL);
    }
}
```

### Python
```python
"""
Problem: LeetCode 3714 - Longest Balanced Substring II
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

class Solution:
    def longestBalanced(self, s: str) -> int:
        n = len(s)
        max_len = 1

        # Case 1: Exactly 1 distinct character
        cur_run = 1
        for i in range(1, n):
            if s[i] == s[i - 1]:
                cur_run += 1
            else:
                cur_run = 1
            if cur_run > max_len:
                max_len = cur_run

        # Case 2: Exactly 2 distinct characters
        pairs = [
            ('a', 'b', 'c'),
            ('b', 'c', 'a'),
            ('a', 'c', 'b')
        ]

        for c1, c2, avoid in pairs:
            start = 0
            while start < n:
                while start < n and s[start] == avoid:
                    start += 1
                if start >= n:
                    break
                end = start
                while end < n and s[end] != avoid:
                    end += 1

                pos_map = {0: start - 1}
                diff = 0
                for i in range(start, end):
                    if s[i] == c1:
                        diff += 1
                    elif s[i] == c2:
                        diff -= 1

                    if diff in pos_map:
                        length = i - pos_map[diff]
                        if length > max_len:
                            max_len = length
                    else:
                        pos_map[diff] = i
                start = end

        # Case 3: Exactly 3 distinct characters
        state_map = {(0, 0): -1}
        ca = cb = cc = 0
        for i in range(n):
            if s[i] == 'a':
                ca += 1
            elif s[i] == 'b':
                cb += 1
            elif s[i] == 'c':
                cc += 1

            state = (ca - cb, cb - cc)
            if state in state_map:
                length = i - state_map[state]
                if length > max_len:
                    max_len = length
            else:
                state_map[state] = i

        return max_len
```

### C++
```cpp
/**
 * Problem: LeetCode 3714 - Longest Balanced Substring II
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <vector>
#include <algorithm>
#include <unordered_map>

using namespace std;

class Solution {
public:
    int longestBalanced(string s) {
        int n = s.length();
        int maxLen = 1;

        // Case 1: Exactly 1 distinct character
        int curRun = 1;
        for (int i = 1; i < n; i++) {
            if (s[i] == s[i - 1]) {
                curRun++;
            } else {
                curRun = 1;
            }
            if (curRun > maxLen) {
                maxLen = curRun;
            }
        }

        // Case 2: Exactly 2 distinct characters
        vector<vector<char>> pairs = {
            {'a', 'b', 'c'},
            {'b', 'c', 'a'},
            {'a', 'c', 'b'}
        };

        for (const auto& p : pairs) {
            char c1 = p[0], c2 = p[1], avoid = p[2];
            int start = 0;
            while (start < n) {
                while (start < n && s[start] == avoid) {
                    start++;
                }
                if (start >= n) {
                    break;
                }
                int end = start;
                while (end < n && s[end] != avoid) {
                    end++;
                }

                unordered_map<int, int> map;
                map[0] = start - 1;
                int diff = 0;
                for (int i = start; i < end; i++) {
                    if (s[i] == c1) {
                        diff++;
                    } else if (s[i] == c2) {
                        diff--;
                    }

                    auto it = map.find(diff);
                    if (it != map.end()) {
                        int len = i - it->second;
                        if (len > maxLen) {
                            maxLen = len;
                        }
                    } else {
                        map[diff] = i;
                    }
                }
                start = end;
            }
        }

        // Case 3: Exactly 3 distinct characters
        unordered_map<long long, int> stateMap;
        stateMap[encode(0, 0)] = -1;
        int ca = 0, cb = 0, cc = 0;

        for (int i = 0; i < n; i++) {
            if (s[i] == 'a') {
                ca++;
            } else if (s[i] == 'b') {
                cb++;
            } else if (s[i] == 'c') {
                cc++;
            }

            long long key = encode(ca - cb, cb - cc);
            auto it = stateMap.find(key);
            if (it != stateMap.end()) {
                int len = i - it->second;
                if (len > maxLen) {
                    maxLen = len;
                }
            } else {
                stateMap[key] = i;
            }
        }

        return maxLen;
    }

private:
    long long encode(int d1, int d2) {
        return (((long long)d1) << 32) | ((unsigned int)d2);
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 3714 - Longest Balanced Substring II
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
    let maxLen = 1;

    // Case 1: Exactly 1 distinct character
    let curRun = 1;
    for (let i = 1; i < n; i++) {
        if (s[i] === s[i - 1]) {
            curRun++;
        } else {
            curRun = 1;
        }
        if (curRun > maxLen) {
            maxLen = curRun;
        }
    }

    // Case 2: Exactly 2 distinct characters
    const pairs = [
        ['a', 'b', 'c'],
        ['b', 'c', 'a'],
        ['a', 'c', 'b']
    ];

    for (const [c1, c2, avoid] of pairs) {
        let start = 0;
        while (start < n) {
            while (start < n && s[start] === avoid) {
                start++;
            }
            if (start >= n) {
                break;
            }
            let end = start;
            while (end < n && s[end] !== avoid) {
                end++;
            }

            const map = new Map();
            map.set(0, start - 1);
            let diff = 0;
            for (let i = start; i < end; i++) {
                if (s[i] === c1) {
                    diff++;
                } else if (s[i] === c2) {
                    diff--;
                }

                if (map.has(diff)) {
                    const len = i - map.get(diff);
                    if (len > maxLen) {
                        maxLen = len;
                    }
                } else {
                    map.set(diff, i);
                }
            }
            start = end;
        }
    }

    // Case 3: Exactly 3 distinct characters
    const stateMap = new Map();
    stateMap.set('0,0', -1);
    let ca = 0, cb = 0, cc = 0;

    for (let i = 0; i < n; i++) {
        if (s[i] === 'a') {
            ca++;
        } else if (s[i] === 'b') {
            cb++;
        } else if (s[i] === 'c') {
            cc++;
        }

        const key = `${ca - cb},${cb - cc}`;
        if (stateMap.has(key)) {
            const len = i - stateMap.get(key);
            if (len > maxLen) {
                maxLen = len;
            }
        } else {
            stateMap.set(key, i);
        }
    }

    return maxLen;
};
```
