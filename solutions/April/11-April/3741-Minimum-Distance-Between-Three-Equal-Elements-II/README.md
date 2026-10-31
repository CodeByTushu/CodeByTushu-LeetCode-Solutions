# LeetCode 3741: Minimum Distance Between Three Equal Elements II

- **Publication Date:** 11 April 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-distance-between-three-equal-elements-ii/](https://leetcode.com/problems/minimum-distance-between-three-equal-elements-ii/)
- **YouTube Solution:** [Watch Video](https://youtu.be/8Wblh6M8244?si=zUCpgHM50EzrKPnk)

---

## Problem Summary

You are given an integer array `nums`.

A tuple `(i, j, k)` of $3$ distinct indices is **good** if `nums[i] == nums[j] == nums[k]`.

The **distance** of a good tuple is defined as:
$$\text{distance} = |i - j| + |j - k| + |k - i|$$

Return an integer denoting the **minimum possible distance** of a good tuple. If no good tuples exist, return `-1`.

---

### Examples

#### Example 1:
```text
Input: nums = [1,2,1,1,3]
Output: 6
Explanation:
The minimum distance is achieved by the good tuple (0, 2, 3).
(0, 2, 3) is a good tuple because nums[0] == nums[2] == nums[3] == 1.
Its distance is abs(0 - 2) + abs(2 - 3) + abs(3 - 0) = 2 + 1 + 3 = 6.
```

#### Example 2:
```text
Input: nums = [1,1,2,3,2,1,2]
Output: 8
Explanation:
The minimum distance is achieved by the good tuple (2, 4, 6).
(2, 4, 6) is a good tuple because nums[2] == nums[4] == nums[6] == 2.
Its distance is abs(2 - 4) + abs(4 - 6) + abs(6 - 2) = 2 + 2 + 4 = 8.
```

#### Example 3:
```text
Input: nums = [1]
Output: -1
Explanation:
There are no good tuples. Therefore, the answer is -1.
```

---

### Constraints

- $1 \le n == \text{nums.length} \le 10^5$
- $1 \le \text{nums}[i] \le n$

---

## Detailed Intuition & Approach

### 1. Scaling to $10^5$
In Part I, $n \le 100$. In Part II, $n \le 10^5$. Any quadratic $\mathcal{O}(n^2)$ or brute-force approach iterating over triplets $\mathcal{O}(n^3)$ will suffer severe Time Limit Exceeded (TLE). We need an optimal $\mathcal{O}(n)$ single-pass solution.

### 2. Distance Reduction Invariant
For any three indices sorted such that $i < j < k$:
$$|i - j| + |j - k| + |k - i| = (j - i) + (k - j) + (k - i)$$
Summing the first two terms:
$$(j - i) + (k - j) = k - i$$
Thus, the distance simplifies to:
$$\text{distance} = 2 \cdot (k - i)$$
The intermediate index $j$ does not impact the total distance. The distance depends solely on the span between the maximum index $k$ and minimum index $i$, scaled by $2$.

### 3. Tracking Two Previous Occurrences
To minimize $2 \cdot (k - i)$ for any value, we only need to compare **consecutive triplets** of its occurrences. Non-consecutive triplets will always span a strictly larger or equal interval.

Because $1 \le \text{nums}[i] \le n$, we do not even need dynamic hash tables or full index lists. We can track:
- `prev1[val]`: The most recent index where `val` appeared.
- `prev2[val]`: The second most recent index where `val` appeared.

Both arrays are initialized to `-1`. When scanning through index `i`:
1. If `prev2[nums[i]] != -1`, we have found a consecutive triplet of three equal elements ending at `i`. Its distance is:
   $$\text{dist} = 2 \cdot (i - \text{prev2}[\text{nums}[i]])$$
   Update `minDistance = min(minDistance, dist)`.
2. Shift the tracked history:
   $$\text{prev2}[\text{nums}[i]] = \text{prev1}[\text{nums}[i]]$$
   $$\text{prev1}[\text{nums}[i]] = i$$

If no element appeared $\ge 3$ times, `minDistance` remains unset, and we return `-1`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$ — Exactly one linear pass through `nums`, with $\mathcal{O}(1)$ array index operations per element.
- **Auxiliary Space Complexity:** $\mathcal{O}(n)$ — Two fixed-size integer arrays of size $n + 1$ to store previous occurrence positions.

---

## Multi-Language Solutions

### Java ☕
```java
/**
 * Problem: LeetCode 3741 - Minimum Distance Between Three Equal Elements II
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.*;

class Solution {
    public int minimumDistance(int[] nums) {
        int n = nums.length;
        int[] prev1 = new int[n + 1];
        int[] prev2 = new int[n + 1];
        Arrays.fill(prev1, -1);
        Arrays.fill(prev2, -1);

        int minDistance = Integer.MAX_VALUE;

        for (int i = 0; i < n; i++) {
            int val = nums[i];
            if (prev2[val] != -1) {
                minDistance = Math.min(minDistance, 2 * (i - prev2[val]));
            }
            prev2[val] = prev1[val];
            prev1[val] = i;
        }

        return minDistance == Integer.MAX_VALUE ? -1 : minDistance;
    }
}
```

### Python 🐍
```python
"""
Problem: LeetCode 3741 - Minimum Distance Between Three Equal Elements II
Difficulty: Medium
Language: Python
Author: CodeByTushu
"""
class Solution:
    def minimumDistance(self, nums: list[int]) -> int:
        n = len(nums)
        prev1 = [-1] * (n + 1)
        prev2 = [-1] * (n + 1)
        min_dist = float('inf')

        for i, val in enumerate(nums):
            if prev2[val] != -1:
                min_dist = min(min_dist, 2 * (i - prev2[val]))
            prev2[val] = prev1[val]
            prev1[val] = i

        return min_dist if min_dist != float('inf') else -1
```

### C++ ⚡
```cpp
/**
 * Problem: LeetCode 3741 - Minimum Distance Between Three Equal Elements II
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
public:
    int minimumDistance(vector<int>& nums) {
        int n = nums.size();
        vector<int> prev1(n + 1, -1);
        vector<int> prev2(n + 1, -1);
        int minDistance = INT_MAX;

        for (int i = 0; i < n; ++i) {
            int val = nums[i];
            if (prev2[val] != -1) {
                minDistance = min(minDistance, 2 * (i - prev2[val]));
            }
            prev2[val] = prev1[val];
            prev1[val] = i;
        }

        return minDistance == INT_MAX ? -1 : minDistance;
    }
};
```

### JavaScript 🌐
```javascript
/**
 * Problem: LeetCode 3741 - Minimum Distance Between Three Equal Elements II
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumDistance = function(nums) {
    const n = nums.length;
    const prev1 = new Int32Array(n + 1);
    const prev2 = new Int32Array(n + 1);
    prev1.fill(-1);
    prev2.fill(-1);

    let minDistance = Infinity;

    for (let i = 0; i < n; i++) {
        const val = nums[i];
        if (prev2[val] !== -1) {
            const dist = 2 * (i - prev2[val]);
            if (dist < minDistance) {
                minDistance = dist;
            }
        }
        prev2[val] = prev1[val];
        prev1[val] = i;
    }

    return minDistance === Infinity ? -1 : minDistance;
};
```
