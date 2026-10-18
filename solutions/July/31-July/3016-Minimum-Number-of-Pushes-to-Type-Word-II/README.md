# LeetCode 3016: Minimum Number of Pushes to Type Word II

- **Publication Date:** 31 July 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-number-of-pushes-to-type-word-ii/](https://leetcode.com/problems/minimum-number-of-pushes-to-type-word-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/hvb1oRNYMbg?si=vCCz17Sq8kp5ftiN)

---

## Problem Summary

You are given a string `word` containing lowercase English letters.

Telephone keypads have keys mapped with **distinct** collections of lowercase English letters, which can be used to form words by pushing them. For example, if key $2$ is mapped with `["a", "b", "c"]`, we push key $2$ once to type `"a"`, twice to type `"b"`, and three times to type `"c"`.

It is allowed to remap the keys numbered $2$ to $9$ to distinct collections of letters. The keys can be remapped to **any amount** of letters, but each letter must be mapped to **exactly one key**.

Return the **minimum number of pushes** needed to type `word` after remapping the keys.

---

### Examples

#### Example 1:

- **Input:** `word = "abcde"`
- **Output:** `5`
- **Explanation:**
  - Map each of the 5 letters to the first position of keys $2, 3, 4, 5, 6$.
  - Each letter requires $1$ push.
  - Total cost = $1 + 1 + 1 + 1 + 1 = 5$.

#### Example 2:

- **Input:** `word = "xyzxyzxyzxyz"`
- **Output:** `12`
- **Explanation:**
  - Map letters `'x'`, `'y'`, and `'z'` to the first position of keys $2, 3, 4$.
  - Each letter occurs 4 times and takes 1 push per occurrence.
  - Total cost = $1 \times 4 + 1 \times 4 + 1 \times 4 = 12$.

#### Example 3:

- **Input:** `word = "aabbccddeeffgghhiiiiii"`
- **Output:** `24`
- **Explanation:**
  - The most frequent character `'i'` (frequency 6) is mapped to depth 1 (1 push).
  - The next 7 most frequent characters (`'a'`, `'b'`, `'c'`, `'d'`, `'e'`, `'f'`, `'g'`) each with frequency 2 are also mapped to depth 1 (1 push each).
  - The 9th distinct character `'h'` (frequency 2) must be placed at depth 2 (2 pushes).
  - Total pushes = $(6 \times 1) + (7 \times 2 \times 1) + (2 \times 2) = 6 + 14 + 4 = 24$.

---

### Constraints

- $1 \le \text{word.length} \le 10^5$
- `word` consists of lowercase English letters.

---

## Algorithmic Approach

### 1. Keypad Capacity & Greedy Strategy
- There are exactly $8$ remappable telephone keys numbered $2$ through $9$.
- Each key can store multiple letters at increasing push depths:
  - 1st position across the 8 keys: holds up to $8$ letters ($1$ push per letter).
  - 2nd position across the 8 keys: holds up to $8$ letters ($2$ pushes per letter).
  - 3rd position across the 8 keys: holds up to $8$ letters ($3$ pushes per letter).
  - 4th position across the 8 keys: holds the remaining $2$ letters ($4$ pushes per letter).
- To minimize the total number of key presses, we must place characters with the **highest frequencies** in the earliest possible press depths (Greedy Choice Property).

### 2. Frequency Counting & Sorting
1. Count the occurrences of each character from `'a'` to `'z'` across `word` using a frequency array of size $26$.
2. Sort the character frequencies in descending order.
3. For each character rank $i$ ($0 \le i < 26$):
   - The number of pushes needed per occurrence is $\lfloor i / 8 \rfloor + 1$.
   - Add $(\lfloor i / 8 \rfloor + 1) \times \text{freq}[i]$ to the total push count.
   - If $\text{freq}[i] == 0$, terminate early as remaining letters do not appear in `word`.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N + |\Sigma| \log |\Sigma|) = \mathcal{O}(N)$ | Counting frequencies takes $\mathcal{O}(N)$ time. Sorting the alphabet array of fixed size $|\Sigma| = 26$ takes $\mathcal{O}(26 \log 26) = \mathcal{O}(1)$ time. |
| **Auxiliary Space** | $\mathcal{O}(|\Sigma|) = \mathcal{O}(1)$ | Fixed frequency array of size $26$ regardless of input size $N \le 10^5$. |

---

## Multi-Language Implementations

### Java
```java
import java.util.*;

class Solution {
    public int minimumPushes(String word) {
        int[] freq = new int[26];
        for (char c : word.toCharArray()) {
            freq[c - 'a']++;
        }
        
        Integer[] idx = new Integer[26];
        for (int i = 0; i < 26; i++) idx[i] = i;
        Arrays.sort(idx, (a, b) -> freq[b] - freq[a]);
        
        int totalPushes = 0;
        for (int i = 0; i < 26; i++) {
            if (freq[idx[i]] == 0) break;
            int pushCount = (i / 8) + 1;
            totalPushes += pushCount * freq[idx[i]];
        }
        
        return totalPushes;
    }
}
```

### Python
```python
from collections import Counter


class Solution:
    def minimumPushes(self, word: str) -> int:
        freq = Counter(word)
        sorted_counts = sorted(freq.values(), reverse=True)
        
        total_pushes = 0
        for i, count in enumerate(sorted_counts):
            push_count = (i // 8) + 1
            total_pushes += push_count * count
            
        return total_pushes
```

### C++
```cpp
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minimumPushes(string word) {
        vector<int> freq(26, 0);
        for (char c : word) {
            freq[c - 'a']++;
        }

        sort(freq.rbegin(), freq.rend());

        int totalPushes = 0;
        for (int i = 0; i < 26; i++) {
            if (freq[i] == 0) break;
            int pushCount = (i / 8) + 1;
            totalPushes += pushCount * freq[i];
        }

        return totalPushes;
    }
};
```

### JavaScript
```javascript
/**
 * @param {string} word
 * @return {number}
 */
var minimumPushes = function(word) {
    const freq = new Array(26).fill(0);
    const codeA = 'a'.charCodeAt(0);

    for (let i = 0; i < word.length; i++) {
        freq[word.charCodeAt(i) - codeA]++;
    }

    freq.sort((a, b) => b - a);

    let totalPushes = 0;
    for (let i = 0; i < 26; i++) {
        if (freq[i] === 0) break;
        const pushCount = Math.floor(i / 8) + 1;
        totalPushes += pushCount * freq[i];
    }

    return totalPushes;
};
```
