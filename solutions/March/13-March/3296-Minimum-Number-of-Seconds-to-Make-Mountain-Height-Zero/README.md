# LeetCode 3296: Minimum Number of Seconds to Make Mountain Height Zero

- **Publication Date:** 13 March 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-number-of-seconds-to-make-mountain-height-zero/](https://leetcode.com/problems/minimum-number-of-seconds-to-make-mountain-height-zero/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/Ox-UkxSgQ2c?si=0jddr3GE0_HxBbJM)

---

## Problem Summary

You are given an integer `mountainHeight` denoting the height of a mountain.

You are also given an integer array `workerTimes` representing the work time of workers in **seconds**.

Each worker may reduce the mountain's height by any **non-negative integer** amount. If worker `i` reduces the height by `x`, then:
- Reducing the first unit takes `workerTimes[i]` seconds,
- Reducing the second unit takes `workerTimes[i] * 2` seconds,
- ...
- Reducing the `x`-th unit takes `workerTimes[i] * x` seconds.

The total time spent by worker `i` is the sum of times required for all `x` units:
$$\text{Time} = \text{workerTimes}[i] \times \sum_{j=1}^{x} j = \text{workerTimes}[i] \times \frac{x(x + 1)}{2}$$

As all workers operate **simultaneously**, the total time required is the **maximum time spent by any worker**.

Return an integer representing the **minimum number of seconds** required for the workers to make the height of the mountain $0$.

---

### Examples

#### Example 1:
- **Input:** `mountainHeight = 4, workerTimes = [2, 1, 1]`
- **Output:** `3`
- **Explanation:**
  - Worker 0 reduces the height by 1, taking `workerTimes[0] = 2` seconds.
  - Worker 1 reduces the height by 2, taking `workerTimes[1] + workerTimes[1] * 2 = 3` seconds.
  - Worker 2 reduces the height by 1, taking `workerTimes[2] = 1` second.
  - Since they work simultaneously, the minimum time needed is $\max(2, 3, 1) = 3$ seconds.

#### Example 2:
- **Input:** `mountainHeight = 10, workerTimes = [3, 2, 2, 4]`
- **Output:** `12`
- **Explanation:**
  - Worker 0 reduces the height by 2, taking `3 + 6 = 9` seconds.
  - Worker 1 reduces the height by 3, taking `2 + 4 + 6 = 12` seconds.
  - Worker 2 reduces the height by 3, taking `2 + 4 + 6 = 12` seconds.
  - Worker 3 reduces the height by 2, taking `4 + 8 = 12` seconds.
  - The number of seconds needed is $\max(9, 12, 12, 12) = 12$ seconds.

#### Example 3:
- **Input:** `mountainHeight = 5, workerTimes = [1]`
- **Output:** `15`
- **Explanation:**
  - The single worker takes $1 + 2 + 3 + 4 + 5 = 15$ seconds.

---

### Constraints

- `1 <= mountainHeight <= 10^5`
- `1 <= workerTimes.length <= 10^4`
- `1 <= workerTimes[i] <= 10^6`

---

## Topics and Tags

- **Primary Tags:** Binary Search, Math
- **Secondary Tags:** Greedy, Heap (Priority Queue)

---

## Detailed Algorithm Walkthrough

### 1. Monotonicity & Binary Search

If all workers are given $T$ seconds, each worker can independently contribute a certain number of units of reduction $x_i(T)$. As the allocated time $T$ increases, each worker can reduce an equal or greater amount of height. Therefore, the total reduction $\sum x_i(T)$ is a monotonically non-decreasing function of $T$.

This property allows us to find the minimum required time using **Binary Search on Answer**:
- **Search Range:**
  - Lower bound: $\text{low} = 1$ second.
  - Upper bound: $\text{high} = \min(\text{workerTimes}) \times \frac{H(H + 1)}{2}$ seconds, which corresponds to the fastest worker reducing the entire mountain alone. For $H = 10^5$ and $\min(W) \le 10^6$, $\text{high} \le 5 \times 10^{15}$, which comfortably fits inside a 64-bit integer (`long` in Java/C++).

### 2. Constant-Time Reduction per Worker via Quadratic Inversion

For worker $i$ with base cost $W = \text{workerTimes}[i]$, the condition that the worker works for at most $T$ seconds is:
$$W \times \frac{x(x + 1)}{2} \le T \iff \frac{x(x + 1)}{2} \le \left\lfloor \frac{T}{W} \right\rfloor$$

Letting $M = \lfloor T / W \rfloor$:
$$x^2 + x - 2M \le 0$$

Applying the quadratic formula:
$$x \le \frac{-1 + \sqrt{1 + 8M}}{2}$$

Since $x$ must be a non-negative integer:
$$x = \left\lfloor \frac{\sqrt{1 + 8M} - 1}{2} \right\rfloor$$

This allows computing the maximum height worker $i$ can reduce in $\mathcal{O}(1)$ closed-form time without loops or simulated step-by-step increments.

### 3. Binary Search Feasibility Check

In each iteration of the binary search with candidate time `mid`:
1. Loop over each worker in `workerTimes`.
2. Compute $M = \lfloor \text{mid} / W \rfloor$.
3. Compute $x = \lfloor (\sqrt{1 + 8M} - 1) / 2 \rfloor$ and accumulate into `totalHeight`.
4. Early exit: if `totalHeight >= mountainHeight`, candidate `mid` is feasible.
5. If feasible, save `mid` as answer and search lower (`high = mid - 1`); otherwise search higher (`low = mid + 1`).

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N \cdot \log(\text{high}))$, where $N$ is the number of workers ($N \le 10^4$) and $\text{high} \le 5 \times 10^{15}$. Binary search takes $\log_2(5 \times 10^{15}) \approx 53$ iterations, and each feasibility check runs in $\mathcal{O}(N)$ time. The total operations are $\approx 5.3 \times 10^5$, executing in under $15$ ms across all languages.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$ auxiliary memory as only scalar variables are used.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 3296 - Minimum Number of Seconds to Make Mountain Height Zero
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public long minNumberOfSeconds(int mountainHeight, int[] workerTimes) {
        int minW = workerTimes[0];
        for (int w : workerTimes) {
            minW = Math.min(minW, w);
        }

        long low = 1L;
        // Upper bound: fastest worker alone reduces the entire mountain
        long high = (long) minW * mountainHeight * (mountainHeight + 1L) / 2L;
        long ans = high;

        while (low <= high) {
            long mid = low + (high - low) / 2;
            if (canReduce(mid, mountainHeight, workerTimes)) {
                ans = mid;
                high = mid - 1; // Try smaller time
            } else {
                low = mid + 1;
            }
        }

        return ans;
    }

    private boolean canReduce(long time, int mountainHeight, int[] workerTimes) {
        long totalHeight = 0;
        for (int w : workerTimes) {
            long m = time / w;
            if (m > 0) {
                // Solve x * (x + 1) / 2 <= m for x
                long x = (long) ((Math.sqrt(1.0 + 8.0 * m) - 1.0) / 2.0);
                while (x * (x + 1) / 2 > m) {
                    x--;
                }
                while ((x + 1) * (x + 2) / 2 <= m) {
                    x++;
                }
                totalHeight += x;
                if (totalHeight >= mountainHeight) {
                    return true;
                }
            }
        }
        return totalHeight >= mountainHeight;
    }
}
```

### Python
```python
"""
Problem: LeetCode 3296 - Minimum Number of Seconds to Make Mountain Height Zero
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""

import math
from typing import List

class Solution:
    def minNumberOfSeconds(self, mountainHeight: int, workerTimes: List[int]) -> int:
        min_w = min(workerTimes)
        low = 1
        # Upper bound: fastest worker alone reduces the entire mountain
        high = min_w * mountainHeight * (mountainHeight + 1) // 2
        ans = high

        def can_reduce(t: int) -> bool:
            total_height = 0
            for w in workerTimes:
                m = t // w
                if m > 0:
                    # Solve x * (x + 1) // 2 <= m
                    x = int((math.isqrt(1 + 8 * m) - 1) // 2)
                    total_height += x
                    if total_height >= mountainHeight:
                        return True
            return total_height >= mountainHeight

        while low <= high:
            mid = (low + high) // 2
            if can_reduce(mid):
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        return ans
```

### C++
```cpp
/**
 * Problem: LeetCode 3296 - Minimum Number of Seconds to Make Mountain Height Zero
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>
#include <cmath>

using namespace std;

class Solution {
    bool canReduce(long long time, int mountainHeight, const vector<int>& workerTimes) {
        long long totalHeight = 0;
        for (int w : workerTimes) {
            long long m = time / w;
            if (m > 0) {
                // Solve x * (x + 1) / 2 <= m
                long long x = (sqrt(1.0 + 8.0 * m) - 1.0) / 2.0;
                while (x * (x + 1) / 2 > m) {
                    x--;
                }
                while ((x + 1) * (x + 2) / 2 <= m) {
                    x++;
                }
                totalHeight += x;
                if (totalHeight >= mountainHeight) {
                    return true;
                }
            }
        }
        return totalHeight >= mountainHeight;
    }

public:
    long long minNumberOfSeconds(int mountainHeight, vector<int>& workerTimes) {
        int minW = *min_element(workerTimes.begin(), workerTimes.end());

        long long low = 1;
        // Upper bound: fastest worker alone reduces the entire mountain
        long long high = (long long)minW * mountainHeight * (mountainHeight + 1LL) / 2LL;
        long long ans = high;

        while (low <= high) {
            long long mid = low + (high - low) / 2;
            if (canReduce(mid, mountainHeight, workerTimes)) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return ans;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 3296 - Minimum Number of Seconds to Make Mountain Height Zero
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number} mountainHeight
 * @param {number[]} workerTimes
 * @return {number}
 */
var minNumberOfSeconds = function(mountainHeight, workerTimes) {
    let minW = workerTimes[0];
    for (let i = 1; i < workerTimes.length; i++) {
        if (workerTimes[i] < minW) {
            minW = workerTimes[i];
        }
    }

    let low = 1n;
    // Upper bound: fastest worker alone reduces the entire mountain
    let high = (BigInt(minW) * BigInt(mountainHeight) * (BigInt(mountainHeight) + 1n)) / 2n;
    let ans = high;

    function sqrt(val) {
        if (val < 0n) return 0n;
        if (val < 2n) return val;
        let x0 = val / 2n;
        let x1 = (x0 + val / x0) / 2n;
        while (x1 < x0) {
            x0 = x1;
            x1 = (x0 + val / x0) / 2n;
        }
        return x0;
    }

    function canReduce(time) {
        let totalHeight = 0n;
        const targetHeight = BigInt(mountainHeight);

        for (let i = 0; i < workerTimes.length; i++) {
            const w = BigInt(workerTimes[i]);
            const m = time / w;
            if (m > 0n) {
                // Solve x * (x + 1) / 2 <= m  =>  x = (sqrt(1 + 8*m) - 1) / 2
                const s = sqrt(1n + 8n * m);
                const x = (s - 1n) / 2n;
                totalHeight += x;
                if (totalHeight >= targetHeight) {
                    return true;
                }
            }
        }
        return totalHeight >= targetHeight;
    }

    while (low <= high) {
        const mid = (low + high) / 2n;
        if (canReduce(mid)) {
            ans = mid;
            high = mid - 1n;
        } else {
            low = mid + 1n;
        }
    }

    return Number(ans);
};
```
