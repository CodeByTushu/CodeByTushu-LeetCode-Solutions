# LeetCode 401: Binary Watch

- **Publication Date:** 17 February 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/binary-watch/](https://leetcode.com/problems/binary-watch/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/MFMzkExKePo?si=0Oc9r8EaDZSt6Eq4)

---

## Problem Summary

A binary watch has 4 LEDs on the top representing the hours ($0$ to $11$), and 6 LEDs on the bottom representing the minutes ($0$ to $59$). Each LED represents a binary bit ($1$ or $0$).

Given an integer `turnedOn` representing the total number of LEDs currently lit, return all possible times the watch could display, in any order.

- The hour must not contain leading zeros (e.g., `"1:00"`, not `"01:00"`).
- The minute must contain two digits with a leading zero if needed (e.g., `"10:02"`, not `"10:2"`).

---

### Examples

#### Example 1:
- **Input:** `turnedOn = 1`
- **Output:** `["0:01","0:02","0:04","0:08","0:16","0:32","1:00","2:00","4:00","8:00"]`

#### Example 2:
- **Input:** `turnedOn = 9`
- **Output:** `[]`
- **Explanation:**
  - Hours can have at most $3$ set bits ($11 = 1011_2$).
  - Minutes can have at most $5$ set bits ($59 = 111011_2$).
  - The maximum possible LEDs lit simultaneously is $3 + 5 = 8$, so $9$ is impossible.

---

### Constraints

- $0 \le \text{turnedOn} \le 10$

---

## Topics and Tags

- **Primary Tags:** Backtracking, Bit Manipulation
- **Secondary Tags:** Enumeration

---

## Detailed Algorithm Walkthrough

### 1. Finite Search Space Observation

Rather than generating complex backtracking trees over all 10 LED choices, we observe that the total valid clock combinations are strictly finite:
- Hours $h \in [0, 11]$ (12 values)
- Minutes $m \in [0, 59]$ (60 values)
- Total possible clock states: $12 \times 60 = 720$ combinations.

Evaluating all 720 valid time states directly is constant-time $\mathcal{O}(1)$ and guarantees we never produce invalid hour or minute representations.

---

### 2. Population Count Matching

For each valid pair $(h, m)$:
1. Calculate the number of set bits in $h$: $\text{bitCount}(h)$.
2. Calculate the number of set bits in $m$: $\text{bitCount}(m)$.
3. If $\text{bitCount}(h) + \text{bitCount}(m) == \text{turnedOn}$, format the time string:
   - In Java: `String.format("%d:%02d", h, m)`
   - In Python: `f"{h}:{m:02d}"`
   - In C++: `to_string(h) + ":" + (m < 10 ? "0" : "") + to_string(m)`
   - In JavaScript: `${h}:${m < 10 ? '0' : ''}${m}`
4. Add the formatted string to the result list.

---

### 3. Early Exit Boundary Check

The maximum LEDs that can be turned on simultaneously is:
$$\max(\text{popcount}(h)) + \max(\text{popcount}(m)) = 3 + 5 = 8$$
If $\text{turnedOn} < 0$ or $\text{turnedOn} > 8$, we can immediately return an empty list `[]` without running the loops.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(1)$. The nested loop checks exactly $12 \times 60 = 720$ pairs, performing constant $\mathcal{O}(1)$ bit operations per pair.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$ (excluding output list storage).

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 401 - Binary Watch
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<String> readBinaryWatch(int turnedOn) {
        List<String> result = new ArrayList<>();
        if (turnedOn < 0 || turnedOn > 8) {
            return result;
        }

        for (int h = 0; h < 12; h++) {
            for (int m = 0; m < 60; m++) {
                if (Integer.bitCount(h) + Integer.bitCount(m) == turnedOn) {
                    result.add(String.format("%d:%02d", h, m));
                }
            }
        }

        return result;
    }
}
```

### Python
```python
"""
Problem: LeetCode 401 - Binary Watch
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""
from typing import List

class Solution:
    def readBinaryWatch(self, turnedOn: int) -> List[str]:
        if turnedOn < 0 or turnedOn > 8:
            return []

        result = []
        for h in range(12):
            for m in range(60):
                if (bin(h).count('1') + bin(m).count('1')) == turnedOn:
                    result.append(f"{h}:{m:02d}")

        return result
```

### C++
```cpp
/**
 * Problem: LeetCode 401 - Binary Watch
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    vector<string> readBinaryWatch(int turnedOn) {
        vector<string> result;
        if (turnedOn < 0 || turnedOn > 8) {
            return result;
        }

        for (int h = 0; h < 12; h++) {
            for (int m = 0; m < 60; m++) {
                if (__builtin_popcount(h) + __builtin_popcount(m) == turnedOn) {
                    string time = to_string(h) + ":" + (m < 10 ? "0" : "") + to_string(m);
                    result.push_back(time);
                }
            }
        }

        return result;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 401 - Binary Watch
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} turnedOn
 * @return {string[]}
 */
var readBinaryWatch = function(turnedOn) {
    if (turnedOn < 0 || turnedOn > 8) {
        return [];
    }

    const result = [];
    const countBits = (n) => {
        let count = 0;
        while (n > 0) {
            count += n & 1;
            n >>= 1;
        }
        return count;
    };

    for (let h = 0; h < 12; h++) {
        for (let m = 0; m < 60; m++) {
            if (countBits(h) + countBits(m) === turnedOn) {
                result.push(`${h}:${m < 10 ? '0' : ''}${m}`);
            }
        }
    }

    return result;
};
```
