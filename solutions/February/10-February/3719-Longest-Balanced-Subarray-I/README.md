# LeetCode 3719: Longest Balanced Subarray I

- **Publication Date:** 10 February 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/longest-balanced-subarray-i/](https://leetcode.com/problems/longest-balanced-subarray-i/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

You are given an integer array `nums`.

A subarray is called **balanced** if the number of **distinct even numbers** in the subarray is equal to the number of **distinct odd numbers**.

Return the length of the **longest balanced subarray**.

---

### Examples

#### Example 1:
- **Input:** `nums = [2, 5, 4, 3]`
- **Output:** `4`
- **Explanation:**
  - The longest balanced subarray is `[2, 5, 4, 3]`.
  - It contains 2 distinct even numbers (`[2, 4]`) and 2 distinct odd numbers (`[5, 3]`).
  - Thus, the answer is 4.

#### Example 2:
- **Input:** `nums = [3, 2, 2, 5, 4]`
- **Output:** `5`
- **Explanation:**
  - The longest balanced subarray is `[3, 2, 2, 5, 4]`.
  - It contains 2 distinct even numbers (`[2, 4]`) and 2 distinct odd numbers (`[3, 5]`).
  - Thus, the answer is 5.

#### Example 3:
- **Input:** `nums = [1, 2, 3, 2]`
- **Output:** `3`
- **Explanation:**
  - The longest balanced subarray is `[2, 3, 2]`.
  - It contains 1 distinct even number (`[2]`) and 1 distinct odd number (`[3]`).
  - Thus, the answer is 3.

---

### Constraints

- $1 \le \text{nums.length} \le 1500$
- $1 \le \text{nums}[i] \le 10^5$

---

## Topics and Tags

- **Primary Tags:** Array, Hash Table, Counting
- **Secondary Tags:** Parity, Enumeration

---

## Detailed Algorithm Walkthrough

### 1. Distinct Parity Invariant

A subarray `nums[i...j]` is balanced if and only if:
$$\text{count}(\text{distinct evens in } nums[i...j]) = \text{count}(\text{distinct odds in } nums[i...j])$$

Because $n \le 1500$, an $\mathcal{O}(n^2)$ enumeration across all possible start points $i$ and end points $j$ comfortably executes well within runtime limits ($\approx \frac{1500^2}{2} \approx 1.12 \times 10^6$ inner iterations).

### 2. High-Performance Distinct Tracking via Timestamps

Instead of repeatedly allocating and clearing hash sets or boolean arrays inside the outer loop:
1. Maintain a single global array `lastSeen` of size $100001$.
2. For each outer iteration starting at index $i$, define a unique timestamp `currentIteration = i + 1`.
3. When extending the subarray to index $j$:
   - Check if `lastSeen[nums[j]] != currentIteration`.
   - If not seen in the current window:
     - Set `lastSeen[nums[j]] = currentIteration`.
     - If `(nums[j] & 1) == 0`, increment `distinctEven`.
     - Otherwise, increment `distinctOdd`.
   - If `distinctEven == distinctOdd`, update `maxLen = max(maxLen, j - i + 1)`.
4. Early exit pruning: If the remaining elements from $i$ to the end of the array cannot exceed `maxLen` ($n - i \le \text{maxLen}$), break early.

This timestamping optimization completely eliminates memory reallocations and hash map overhead, running in a few milliseconds.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n^2)$, where $n$ is the length of `nums`. There are $\mathcal{O}(n^2)$ subarray pairs $(i, j)$, and each element is processed in constant $\mathcal{O}(1)$ time using the timestamp array.
- **Auxiliary Space Complexity:** $\mathcal{O}(\max(\text{nums})) = \mathcal{O}(U)$, where $U \le 10^5$ is the maximum possible value of `nums[i]`, using a single fixed array of size $100001$.

---

## Source Code

### Java
```java
class Solution {
    public int longestBalanced(int[] nums) {
        int n = nums.length;
        int maxLen = 0;

        int[] lastSeen = new int[100001];

        for (int i = 0; i < n; i++) {
            if (n - i <= maxLen) {
                break;
            }

            int distinctEven = 0;
            int distinctOdd = 0;
            int currentIteration = i + 1;

            for (int j = i; j < n; j++) {
                int val = nums[j];
                if (lastSeen[val] != currentIteration) {
                    lastSeen[val] = currentIteration;
                    if ((val & 1) == 0) {
                        distinctEven++;
                    } else {
                        distinctOdd++;
                    }
                }

                if (distinctEven == distinctOdd) {
                    maxLen = Math.max(maxLen, j - i + 1);
                }
            }
        }

        return maxLen;
    }
}
```

### Python
```python
from typing import List

class Solution:
    def longestBalanced(self, nums: List[int]) -> int:
        n = len(nums)
        max_len = 0

        last_seen = [0] * 100001

        for i in range(n):
            if n - i <= max_len:
                break

            distinct_even = 0
            distinct_odd = 0
            iteration = i + 1

            for j in range(i, n):
                val = nums[j]
                if last_seen[val] != iteration:
                    last_seen[val] = iteration
                    if val % 2 == 0:
                        distinct_even += 1
                    else:
                        distinct_odd += 1

                if distinct_even == distinct_odd:
                    max_len = max(max_len, j - i + 1)

        return max_len
```

### C++
```cpp
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int longestBalanced(vector<int>& nums) {
        int n = nums.size();
        int maxLen = 0;

        vector<int> lastSeen(100001, 0);

        for (int i = 0; i < n; i++) {
            if (n - i <= maxLen) {
                break;
            }

            int distinctEven = 0;
            int distinctOdd = 0;
            int currentIteration = i + 1;

            for (int j = i; j < n; j++) {
                int val = nums[j];
                if (lastSeen[val] != currentIteration) {
                    lastSeen[val] = currentIteration;
                    if ((val & 1) == 0) {
                        distinctEven++;
                    } else {
                        distinctOdd++;
                    }
                }

                if (distinctEven == distinctOdd) {
                    maxLen = max(maxLen, j - i + 1);
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
 * @param {number[]} nums
 * @return {number}
 */
var longestBalanced = function(nums) {
    const n = nums.length;
    let maxLen = 0;

    const lastSeen = new Int32Array(100001);

    for (let i = 0; i < n; i++) {
        if (n - i <= maxLen) {
            break;
        }

        let distinctEven = 0;
        let distinctOdd = 0;
        const currentIteration = i + 1;

        for (let j = i; j < n; j++) {
            const val = nums[j];
            if (lastSeen[val] !== currentIteration) {
                lastSeen[val] = currentIteration;
                if ((val & 1) === 0) {
                    distinctEven++;
                } else {
                    distinctOdd++;
                }
            }

            if (distinctEven === distinctOdd) {
                maxLen = Math.max(maxLen, j - i + 1);
            }
        }
    }

    return maxLen;
};
```
