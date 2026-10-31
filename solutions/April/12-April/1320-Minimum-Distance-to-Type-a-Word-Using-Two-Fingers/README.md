# LeetCode 1320: Minimum Distance to Type a Word Using Two Fingers

- **Publication Date:** 12 April 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/minimum-distance-to-type-a-word-using-two-fingers/](https://leetcode.com/problems/minimum-distance-to-type-a-word-using-two-fingers/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

You have a keyboard layout on an XY-plane with 6 columns, where each uppercase English letter is located at a specific coordinate:
- Letter `A` is at `(0, 0)`, `B` is at `(0, 1)`, ..., `F` is at `(0, 5)`.
- Letter `G` is at `(1, 0)`, ..., `L` is at `(1, 5)`.
- In general, letter index $c \in [0, 25]$ has coordinates:
  $$\text{row} = \lfloor c / 6 \rfloor, \quad \text{col} = c \pmod 6$$

The distance between coordinates $(x_1, y_1)$ and $(x_2, y_2)$ is Manhattan distance:
$$\text{dist} = |x_1 - x_2| + |y_1 - y_2|$$

Given a string `word`, return the **minimum total distance** required to type the string using only two fingers.
- The initial placement of both fingers is free (distance cost = $0$).
- Fingers do not have to start on the first two letters.

---

### Examples

#### Example 1:
```text
Input: word = "CAKE"
Output: 3
Explanation:
Using two fingers, one optimal way to type "CAKE" is:
- Finger 1 on letter 'C' -> cost = 0
- Finger 1 on letter 'A' -> cost = Distance from 'C' to 'A' = 2
- Finger 2 on letter 'K' -> cost = 0
- Finger 2 on letter 'E' -> cost = Distance from 'K' to 'E' = 1
Total distance = 3
```

#### Example 2:
```text
Input: word = "HAPPY"
Output: 6
Explanation:
Using two fingers, one optimal way to type "HAPPY" is:
- Finger 1 on letter 'H' -> cost = 0
- Finger 1 on letter 'A' -> cost = Distance from 'H' to 'A' = 2
- Finger 2 on letter 'P' -> cost = 0
- Finger 2 on letter 'P' -> cost = Distance from 'P' to 'P' = 0
- Finger 1 on letter 'Y' -> cost = Distance from 'A' to 'Y' = 4
Total distance = 6
```

---

### Constraints

- $2 \le \text{word.length} \le 300$
- `word` consists of uppercase English letters only.

---

## Detailed Intuition & Approach

### 1. Invariant: One Finger is Always at the Previous Letter
At any step $i$ ($1 \le i < N$), the letter $\text{word}[i - 1]$ was just typed by one of the two fingers.
Therefore, one finger is guaranteed to be currently positioned at $\text{word}[i - 1]$.

We do **not** need to track the positions of both fingers independently as $(f_1, f_2)$ across all $27 \times 27$ states.
Instead:
- One finger is fixed at $\text{prev} = \text{word}[i - 1] - 'A'$.
- The only free state variable is the position of the **other finger**, denoted $j \in [0, 26]$, where $26$ represents an unplaced (free) finger.

### 2. State Definition & Transitions
Let `dp[j]` be the minimum cost after typing prefix $\text{word}[0 \dots i - 1]$, with one finger at $\text{prev} = \text{word}[i - 1] - 'A'$ and the other finger at character $j$.

When typing the current letter $\text{curr} = \text{word}[i] - 'A'$:
1. **Option 1: The finger at `prev` moves to `curr`**
   - The other finger remains at $j$.
   - Transition:
     $$\text{nextDp}[j] = \min(\text{nextDp}[j], \text{dp}[j] + \text{dist}(\text{prev}, \text{curr}))$$

2. **Option 2: The other finger at $j$ moves to `curr`**
   - The finger that was at `prev` becomes the new "other finger"!
   - Cost added: $\text{dist}(j, \text{curr})$ (which is $0$ if $j = 26$).
   - Transition:
     $$\text{nextDp}[\text{prev}] = \min(\text{nextDp}[\text{prev}], \text{dp}[j] + \text{dist}(j, \text{curr}))$$

### 3. Base Case & Final Answer
- **Base Case:** At $i = 0$, place one finger on $\text{word}[0]$ for free. The other finger is at $26$ (unplaced).
  $$\text{dp}[26] = 0, \quad \text{dp}[j] = \infty \; (\forall j \ne 26)$$
- **Answer:** After processing the entire word, the result is:
  $$\min_{0 \le j \le 26} \text{dp}[j]$$

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(27 \cdot N) = \mathcal{O}(N)$ where $N$ is the length of `word`. Since $N \le 300$, this executes in $\approx 8100$ basic operations (under 1ms).
- **Auxiliary Space Complexity:** $\mathcal{O}(27) = \mathcal{O}(1)$ auxiliary space by storing only the previous and current DP arrays of size 27.

---

## Multi-Language Solutions

### Java ☕
```java
import java.util.Arrays;

class Solution {
    public int minimumDistance(String word) {
        int[] dp = new int[27];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[26] = 0;

        for (int i = 1; i < word.length(); i++) {
            int curr = word.charAt(i) - 'A';
            int prev = word.charAt(i - 1) - 'A';
            int[] nextDp = new int[27];
            Arrays.fill(nextDp, Integer.MAX_VALUE);

            for (int j = 0; j < 27; j++) {
                if (dp[j] == Integer.MAX_VALUE) continue;

                int cost1 = dp[j] + dist(prev, curr);
                nextDp[j] = Math.min(nextDp[j], cost1);

                int cost2 = dp[j] + dist(j, curr);
                nextDp[prev] = Math.min(nextDp[prev], cost2);
            }

            dp = nextDp;
        }

        int minCost = Integer.MAX_VALUE;
        for (int cost : dp) {
            minCost = Math.min(minCost, cost);
        }
        return minCost;
    }

    private int dist(int a, int b) {
        if (a == 26 || b == 26) return 0;
        int r1 = a / 6, c1 = a % 6;
        int r2 = b / 6, c2 = b % 6;
        return Math.abs(r1 - r2) + Math.abs(c1 - c2);
    }
}
```

### Python 🐍
```python
class Solution:
    def minimumDistance(self, word: str) -> int:
        def dist(a: int, b: int) -> int:
            if a == 26 or b == 26:
                return 0
            return abs(a // 6 - b // 6) + abs(a % 6 - b % 6)

        dp = [float('inf')] * 27
        dp[26] = 0

        for i in range(1, len(word)):
            curr = ord(word[i]) - ord('A')
            prev = ord(word[i - 1]) - ord('A')
            next_dp = [float('inf')] * 27

            for j in range(27):
                if dp[j] == float('inf'):
                    continue
                cost1 = dp[j] + dist(prev, curr)
                if cost1 < next_dp[j]:
                    next_dp[j] = cost1

                cost2 = dp[j] + dist(j, curr)
                if cost2 < next_dp[prev]:
                    next_dp[prev] = cost2

            dp = next_dp

        return min(dp)
```

### C++ ⚡
```cpp
#include <string>
#include <vector>
#include <cmath>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
private:
    int dist(int a, int b) {
        if (a == 26 || b == 26) return 0;
        int r1 = a / 6, c1 = a % 6;
        int r2 = b / 6, c2 = b % 6;
        return abs(r1 - r2) + abs(c1 - c2);
    }

public:
    int minimumDistance(string word) {
        vector<int> dp(27, INT_MAX);
        dp[26] = 0;

        for (int i = 1; i < (int)word.size(); ++i) {
            int curr = word[i] - 'A';
            int prev = word[i - 1] - 'A';
            vector<int> nextDp(27, INT_MAX);

            for (int j = 0; j < 27; ++j) {
                if (dp[j] == INT_MAX) continue;

                int cost1 = dp[j] + dist(prev, curr);
                nextDp[j] = min(nextDp[j], cost1);

                int cost2 = dp[j] + dist(j, curr);
                nextDp[prev] = min(nextDp[prev], cost2);
            }

            dp = move(nextDp);
        }

        int minCost = INT_MAX;
        for (int cost : dp) {
            minCost = min(minCost, cost);
        }
        return minCost;
    }
};
```

### JavaScript 🌐
```javascript
/**
 * @param {string} word
 * @return {number}
 */
var minimumDistance = function(word) {
    const dist = (a, b) => {
        if (a === 26 || b === 26) return 0;
        const r1 = Math.floor(a / 6), c1 = a % 6;
        const r2 = Math.floor(b / 6), c2 = b % 6;
        return Math.abs(r1 - r2) + Math.abs(c1 - c2);
    };

    let dp = new Array(27).fill(Infinity);
    dp[26] = 0;

    for (let i = 1; i < word.length; i++) {
        const curr = word.charCodeAt(i) - 65;
        const prev = word.charCodeAt(i - 1) - 65;
        const nextDp = new Array(27).fill(Infinity);

        for (let j = 0; j < 27; j++) {
            if (dp[j] === Infinity) continue;

            // Case 1: finger at prev moves to curr
            const cost1 = dp[j] + dist(prev, curr);
            if (cost1 < nextDp[j]) nextDp[j] = cost1;

            // Case 2: finger at j moves to curr
            const cost2 = dp[j] + dist(j, curr);
            if (cost2 < nextDp[prev]) nextDp[prev] = cost2;
        }

        dp = nextDp;
    }

    return Math.min(...dp);
};
```
