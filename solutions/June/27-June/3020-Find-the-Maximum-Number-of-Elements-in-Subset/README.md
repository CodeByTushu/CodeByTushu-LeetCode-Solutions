# LeetCode 3020: Find the Maximum Number of Elements in Subset

- **Publication Date:** 27 June 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/find-the-maximum-number-of-elements-in-subset/](https://leetcode.com/problems/find-the-maximum-number-of-elements-in-subset/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/m5DVJ6ZEbDk?si=Kt-sW7k2HPW1bm6U)

---

## Problem Summary

You are given an array of positive integers `nums`.

You need to select a **subset** of `nums` which satisfies the following condition:
- You can place the selected elements in a 0-indexed array such that it follows the pattern:
  $$[x, x^2, x^4, \dots, x^{k/2}, x^k, x^{k/2}, \dots, x^4, x^2, x]$$
  *(Note that $k$ can be any non-negative power of 2).*
  For example, $[2, 4, 16, 4, 2]$ and $[3, 9, 3]$ follow the pattern while $[2, 4, 8, 4, 2]$ does not.

Return the **maximum number of elements** in a subset that satisfies these conditions.

---

### Examples

#### Example 1:
- **Input:** `nums = [5, 4, 1, 2, 2]`
- **Output:** `3`
- **Explanation:** We can select the subset `{4, 2, 2}`, which can be placed in the array as `[2, 4, 2]` which follows the pattern and $2^2 == 4$. Hence the answer is `3`.

#### Example 2:
- **Input:** `nums = [1, 3, 2, 4]`
- **Output:** `1`
- **Explanation:** We can select the subset `{1}`, which can be placed in the array as `[1]` which follows the pattern. Hence the answer is `1`. Note that we could have also selected the subsets `{2}`, `{3}`, or `{4}`, which provide the same answer.

---

### Constraints

- $2 \le \text{nums.length} \le 10^5$
- $1 \le \text{nums}[i] \le 10^9$

---

## Algorithmic Approach

### Hash Map Frequency Counting + Repeated Squaring Traversal

1. **Pattern Structure & Symmetry:**
   - Any valid subset must be arranged as a symmetric "mountain" centered at some peak $x^k$:
     $$[x, x^2, x^4, \dots, x^k, \dots, x^4, x^2, x]$$
   - Notice that every element $x, x^2, \dots, x^{k/2}$ appears **at least twice** (once on the left wing and once on the right wing).
   - The peak element $x^k$ appears **at least once** in the center.
   - Therefore, the total length of any valid subset is always **odd**: $2m + 1$ (where $m$ is the number of squaring levels before the peak).

2. **Special Case: $x = 1$:**
   - Since $1^2 = 1$, repeated squaring of $1$ stays $1$.
   - A subset consisting solely of $1$s is valid as long as its length is odd: $[1, 1, \dots, 1]$.
   - If $1$ appears `cnt` times in `nums`, the maximum valid odd length we can form is:
     $$\text{ans}_1 = \begin{cases} \text{cnt}, & \text{if } \text{cnt} \text{ is odd} \\ \text{cnt} - 1, & \text{if } \text{cnt} \text{ is even} \end{cases}$$

3. **General Case: $x > 1$:**
   - For each unique starting base $x > 1$ in `freq`:
     - Maintain a running candidate value `cur = x` and length counter `len = 0`.
     - While `freq[cur] >= 2`, we can use two copies of `cur` on the outer wings:
       - Increment `len += 2`.
       - Check if `cur * cur > 10^9` (avoiding 64-bit integer overflow since `nums[i] <= 10^9`). If it exceeds, break.
       - Otherwise, advance `cur = cur * cur`.
     - After the loop:
       - If `freq[cur] == 1`: this element can serve as the unique peak element in the center, so `len++`.
       - If `freq[cur] == 0` (or the loop broke because `cur` could not be squared): the last squared element was missing or not eligible. The last element for which we added 2 copies can instead have 1 copy act as the peak element, so `len--`.
     - Update the global maximum `ans = Math.max(ans, len)`.

4. **Bounding Iterations:**
   - Since $x \ge 2$, repeated squaring grows quadratically:
     $$2 \to 4 \to 16 \to 256 \to 65536 \to 4294967296 > 10^9$$
   - Each chain has at most **5 squaring steps**!
   - Thus, the inner loop executes at most $\approx 5$ times per unique key, giving a blistering fast $\mathcal{O}(N)$ overall runtime.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N)$ | Building the frequency map takes $\mathcal{O}(N)$ time. For each unique number, repeated squaring occurs at most $\log_2(\log_2(10^9)) \le 5$ times. Hash map queries take $\mathcal{O}(1)$ average time, resulting in strict linear runtime. |
| **Auxiliary Space** | $\mathcal{O}(N)$ | The hash map stores frequencies for at most $N$ distinct numbers from `nums`. |

---

## Multi-Language Implementations

### Java
```java
import java.util.*;

class Solution {
    public int maximumLength(int[] nums) {
        Map<Long, Integer> freq = new HashMap<>();

        for (int x : nums) {
            freq.put((long) x, freq.getOrDefault((long) x, 0) + 1);
        }

        int ans = 1;

        if (freq.containsKey(1L)) {
            int cnt = freq.get(1L);
            ans = Math.max(ans, cnt % 2 == 0 ? cnt - 1 : cnt);
        }

        for (long x : freq.keySet()) {
            if (x == 1) continue;

            long cur = x;
            int len = 0;

            while (freq.getOrDefault(cur, 0) >= 2) {
                len += 2;

                if (cur > 1000000000L / cur) {
                    break;
                }

                cur *= cur;
            }

            if (freq.getOrDefault(cur, 0) == 1) {
                len++;
            } else {
                len--;
            }

            ans = Math.max(ans, len);
        }

        return ans;
    }
}
```

### Python
```python
from collections import Counter
from typing import List

class Solution:
    def maximumLength(self, nums: List[int]) -> int:
        freq = Counter(nums)

        ans = 1

        if 1 in freq:
            cnt = freq[1]
            ans = max(ans, cnt - 1 if cnt % 2 == 0 else cnt)

        for x in freq:
            if x == 1:
                continue

            cur = x
            length = 0

            while freq.get(cur, 0) >= 2:
                length += 2

                if cur > 10**9 // cur:
                    break

                cur *= cur

            if freq.get(cur, 0) == 1:
                length += 1
            else:
                length -= 1

            ans = max(ans, length)

        return ans
```

### C++
```cpp
#include <vector>
#include <unordered_map>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maximumLength(vector<int>& nums) {
        unordered_map<long long, int> freq;

        for (int x : nums) {
            freq[x]++;
        }

        int ans = 1;

        if (freq.find(1LL) != freq.end()) {
            int cnt = freq[1LL];
            ans = max(ans, cnt % 2 == 0 ? cnt - 1 : cnt);
        }

        for (const auto& [x, _] : freq) {
            if (x == 1LL) continue;

            long long cur = x;
            int len = 0;

            while (freq.count(cur) && freq[cur] >= 2) {
                len += 2;

                if (cur > 1000000000LL / cur) {
                    break;
                }

                cur *= cur;
            }

            if (freq.count(cur) && freq[cur] == 1) {
                len++;
            } else {
                len--;
            }

            ans = max(ans, len);
        }

        return ans;
    }
};
```

### JavaScript
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumLength = function(nums) {
    const freq = new Map();

    for (let i = 0; i < nums.length; i++) {
        const x = nums[i];
        freq.set(x, (freq.get(x) || 0) + 1);
    }

    let ans = 1;

    if (freq.has(1)) {
        const cnt = freq.get(1);
        ans = Math.max(ans, cnt % 2 === 0 ? cnt - 1 : cnt);
    }

    for (const x of freq.keys()) {
        if (x === 1) continue;

        let cur = x;
        let len = 0;

        while ((freq.get(cur) || 0) >= 2) {
            len += 2;

            if (cur > Math.floor(1000000000 / cur)) {
                break;
            }

            cur *= cur;
        }

        if ((freq.get(cur) || 0) === 1) {
            len++;
        } else {
            len--;
        }

        ans = Math.max(ans, len);
    }

    return ans;
};
```

---

<p align="center">
  <a href="../26-June/3739-Count-Subarrays-With-Majority-Element-II/"><strong>⬅️ Previous Problem (26 June: #3739)</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../README.md"><strong>🌊 June 2026 Archive</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../../README.md"><strong>🗂️ All Solutions Archive</strong></a>
</p>
