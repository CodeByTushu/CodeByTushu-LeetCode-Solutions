# LeetCode 3740: Minimum Distance Between Three Equal Elements I

- **Publication Date:** 10 April 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/minimum-distance-between-three-equal-elements-i/](https://leetcode.com/problems/minimum-distance-between-three-equal-elements-i/)
- **YouTube Solution:** *Coming Soon*

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

- $1 \le n == \text{nums.length} \le 100$
- $1 \le \text{nums}[i] \le n$

---

## Detailed Intuition & Approach

### 1. Mathematical Simplification of Distance
For any three indices sorted such that $i < j < k$:
$$|i - j| + |j - k| + |k - i| = (j - i) + (k - j) + (k - i)$$
Notice that:
$$(j - i) + (k - j) = k - i$$
Therefore, the total distance simplifies directly to:
$$\text{distance} = (k - i) + (k - i) = 2 \cdot (k - i)$$

The intermediate index $j$ completely cancels out of the formula! The distance depends exclusively on the difference between the largest index $k$ and the smallest index $i$, multiplied by $2$.

### 2. Optimal Triplet Selection
To minimize $2 \cdot (k - i)$, we must minimize $k - i$.
For any element value that appears multiple times in the array, its occurrences appear at strictly increasing indices:
$$p_0, p_1, p_2, \dots, p_{m-1}$$

For any three indices $p_a < p_b < p_c$, the span $p_c - p_a$ is minimized when the three occurrences are **consecutive**:
$$c = a + 2$$
Any non-consecutive triplet $(p_a, p_b, p_c)$ with $c - a > 2$ would span a strictly larger or equal interval than the consecutive triplet $(p_a, p_{a+1}, p_{a+2})$.

### 3. Linear Scan with Hash Map
1. Maintain a hash map mapping each unique value in `nums` to its list of recorded indices.
2. Iterate through the array with index `i`.
3. Append `i` to the index list for `nums[i]`.
4. If the list has at least $3$ elements, consider the last $3$ occurrences:
   $$\text{dist} = 2 \cdot (\text{indices}[\text{last}] - \text{indices}[\text{last} - 2])$$
   Update our running minimum distance.
5. If no value appeared at least $3$ times, return `-1`. Otherwise, return the minimum distance found.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$ — We iterate through `nums` of length $n$ once. Hash map lookups and index insertions take $\mathcal{O}(1)$ average time.
- **Auxiliary Space Complexity:** $\mathcal{O}(n)$ — To store the indices of elements in the hash map.

---

## Multi-Language Solutions

### Java ☕
```java
import java.util.*;

class Solution {
    public int minimumDistance(int[] nums) {
        Map<Integer, List<Integer>> map = new HashMap<>();
        int minDistance = Integer.MAX_VALUE;

        for (int i = 0; i < nums.length; i++) {
            int val = nums[i];
            map.putIfAbsent(val, new ArrayList<>());
            List<Integer> indices = map.get(val);
            indices.add(i);

            int size = indices.size();
            if (size >= 3) {
                int first = indices.get(size - 3);
                int third = indices.get(size - 1);
                minDistance = Math.min(minDistance, 2 * (third - first));
            }
        }

        return minDistance == Integer.MAX_VALUE ? -1 : minDistance;
    }
}
```

### Python 🐍
```python
from collections import defaultdict

class Solution:
    def minimumDistance(self, nums: list[int]) -> int:
        indices = defaultdict(list)
        min_dist = float('inf')

        for i, val in enumerate(nums):
            indices[val].append(i)
            if len(indices[val]) >= 3:
                min_dist = min(min_dist, 2 * (indices[val][-1] - indices[val][-3]))

        return min_dist if min_dist != float('inf') else -1
```

### C++ ⚡
```cpp
#include <vector>
#include <unordered_map>
#include <algorithm>
#include <climits>

using namespace std;

class Solution {
public:
    int minimumDistance(vector<int>& nums) {
        unordered_map<int, vector<int>> indices;
        int minDistance = INT_MAX;

        for (int i = 0; i < (int)nums.size(); ++i) {
            int val = nums[i];
            indices[val].push_back(i);

            int sz = indices[val].size();
            if (sz >= 3) {
                int first = indices[val][sz - 3];
                int third = indices[val][sz - 1];
                minDistance = min(minDistance, 2 * (third - first));
            }
        }

        return minDistance == INT_MAX ? -1 : minDistance;
    }
};
```

### JavaScript 🌐
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumDistance = function(nums) {
    const map = new Map();
    let minDistance = Infinity;

    for (let i = 0; i < nums.length; i++) {
        const val = nums[i];
        if (!map.has(val)) {
            map.set(val, []);
        }
        const list = map.get(val);
        list.push(i);

        const len = list.length;
        if (len >= 3) {
            const first = list[len - 3];
            const third = list[len - 1];
            minDistance = Math.min(minDistance, 2 * (third - first));
        }
    }

    return minDistance === Infinity ? -1 : minDistance;
};
```
