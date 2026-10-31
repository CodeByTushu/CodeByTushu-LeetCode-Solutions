# LeetCode 1848: Minimum Distance to the Target Element

- **Publication Date:** 13 April 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/minimum-distance-to-the-target-element/](https://leetcode.com/problems/minimum-distance-to-the-target-element/)
- **YouTube Solution:** [Watch Video](https://youtu.be/6MTGLJ7kADs?si=yLXfn9WVoNEgHZ9i)

---

## Problem Summary

Given an integer array `nums` ($0$-indexed) and two integers `target` and `start`, find an index $i$ such that `nums[i] == target` and $|i - \text{start}|$ is minimized.

Return $|i - \text{start}|$.

It is guaranteed that `target` exists in `nums`.

---

### Examples

#### Example 1:
```text
Input: nums = [1,2,3,4,5], target = 5, start = 3
Output: 1
Explanation: nums[4] = 5 is the only value equal to target, so the answer is abs(4 - 3) = 1.
```

#### Example 2:
```text
Input: nums = [1], target = 1, start = 0
Output: 0
Explanation: nums[0] = 1 is the only value equal to target, so the answer is abs(0 - 0) = 0.
```

#### Example 3:
```text
Input: nums = [1,1,1,1,1,1,1,1,1,1], target = 1, start = 0
Output: 0
Explanation: Every value of nums is 1, but nums[0] minimizes abs(i - start), which is abs(0 - 0) = 0.
```

---

### Constraints

- $1 \le \text{nums.length} \le 1000$
- $1 \le \text{nums}[i] \le 10^4$
- $0 \le \text{start} < \text{nums.length}$
- `target` is in `nums`.

---

## Detailed Intuition & Approach

### 1. Direct Linear Scan
The problem requires finding the minimum absolute difference $|i - \text{start}|$ for any valid index $i$ where $\text{nums}[i] == \text{target}$.

Since $N \le 1000$, a single linear traversal through the array easily runs well within execution limits (under $1$ ms).

1. Initialize `minDistance = Integer.MAX_VALUE`.
2. Iterate through each index $i$ from $0$ to $N - 1$:
   - If $\text{nums}[i] == \text{target}$, compute $|i - \text{start}|$.
   - Update `minDistance = min(minDistance, |i - start|)`.
   - **Early Exit Optimization:** If `minDistance == 0`, no distance can be smaller than $0$, so we can immediately return $0$.
3. Return `minDistance`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$ where $N$ is the number of elements in `nums`. In the worst case, we inspect each element once.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$ auxiliary space as only a single integer variable is used.

---

## Multi-Language Solutions

### Java ☕
```java
/**
 * Problem: LeetCode 1848 - Minimum Distance to the Target Element
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int getMinDistance(int[] nums, int target, int start) {
        int minDistance = Integer.MAX_VALUE;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) {
                minDistance = Math.min(minDistance, Math.abs(i - start));
                if (minDistance == 0) return 0;
            }
        }
        return minDistance;
    }
}
```

### Python 🐍
```python
"""
Problem: LeetCode 1848 - Minimum Distance to the Target Element
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""
class Solution:
    def getMinDistance(self, nums: list[int], target: int, start: int) -> int:
        min_dist = float('inf')
        for i, val in enumerate(nums):
            if val == target:
                min_dist = min(min_dist, abs(i - start))
                if min_dist == 0:
                    return 0
        return min_dist
```

### C++ ⚡
```cpp
/**
 * Problem: LeetCode 1848 - Minimum Distance to the Target Element
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <cmath>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
public:
    int getMinDistance(vector<int>& nums, int target, int start) {
        int minDistance = INT_MAX;
        for (int i = 0; i < (int)nums.size(); ++i) {
            if (nums[i] == target) {
                minDistance = min(minDistance, abs(i - start));
                if (minDistance == 0) return 0;
            }
        }
        return minDistance;
    }
};
```

### JavaScript 🌐
```javascript
/**
 * Problem: LeetCode 1848 - Minimum Distance to the Target Element
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @param {number} start
 * @return {number}
 */
var getMinDistance = function(nums, target, start) {
    let minDistance = Infinity;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) {
            minDistance = Math.min(minDistance, Math.abs(i - start));
            if (minDistance === 0) return 0;
        }
    }
    return minDistance;
};
```
