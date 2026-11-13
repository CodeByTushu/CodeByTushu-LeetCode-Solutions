# LeetCode 3420: Count Non-Decreasing Subarrays After K Operations

- **Publication Date:** 13 November 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/count-non-decreasing-subarrays-after-k-operations/](https://leetcode.com/problems/count-non-decreasing-subarrays-after-k-operations/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/aNiRJCEcYVw)

---

## 💡 Problem Summary

You are given an array `nums` of $n$ integers and an integer $k$.

For each subarray of `nums`, you can apply up to $k$ operations on it. In each operation, you can increment any element of the subarray by $1$.

Each subarray is considered independently, meaning changes made to one subarray do not persist to another.

Return the total number of subarrays that can be made **non-decreasing** after performing at most $k$ operations.

An array is said to be **non-decreasing** if each element is greater than or equal to its previous element, if it exists (i.e., $\text{arr}[i] \ge \text{arr}[i - 1]$ for all $i \ge 1$).

---

### 🧪 Examples

#### Example 1:
- **Input:** `nums = [6,3,1,2,4,4]`, `k = 7`
- **Output:** `17`
- **Explanation:**
  - Out of all $21$ possible subarrays of `nums`, only the subarrays `[6, 3, 1]`, `[6, 3, 1, 2]`, `[6, 3, 1, 2, 4]`, and `[6, 3, 1, 2, 4, 4]` cannot be made non-decreasing after applying up to $k = 7$ operations.
  - Thus, the number of non-decreasing subarrays is $21 - 4 = 17$.

#### Example 2:
- **Input:** `nums = [6,3,1,3,6]`, `k = 4`
- **Output:** `12`
- **Explanation:**
  - The subarray `[3, 1, 3, 6]` along with all subarrays of `nums` with three or fewer elements, except `[6, 3, 1]`, can be made non-decreasing after $k$ operations.
  - There are $5$ subarrays of a single element, $4$ subarrays of two elements, and $2$ subarrays of three elements except `[6, 3, 1]`, so there are $1 + 5 + 4 + 2 = 12$ subarrays that can be made non-decreasing.

---

### 🔒 Constraints

- $1 \le \text{nums.length} \le 10^5$
- $1 \le \text{nums}[i] \le 10^9$
- $1 \le k \le 10^9$

---

## 🧠 Algorithmic Approach & Key Observations

### 1. Minimal Operation Cost for a Subarray
To transform a subarray $\text{nums}[l..r]$ into a non-decreasing sequence using only increment operations, each element $\text{nums}[i]$ ($l \le i \le r$) must be raised to at least the maximum value seen in the subarray up to that index:
$$\text{target}[i] = \max_{l \le j \le i} \text{nums}[j]$$

The minimum operations required to achieve this is:
$$\text{cost}(l, r) = \sum_{i=l}^r \left(\max_{l \le j \le i} \text{nums}[j] - \text{nums}[i]\right) = \sum_{i=l}^r \text{prefixMax}(l, i) - \sum_{i=l}^r \text{nums}[i]$$

$\sum_{i=l}^r \text{nums}[i]$ is computed in $\mathcal{O}(1)$ time via a prefix sum array `pre`.

### 2. Reverse Two-Pointer Sliding Window
For any fixed left endpoint $l$, as right endpoint $r$ increases, $\text{cost}(l, r)$ is monotonically non-decreasing. 

If we traverse $l$ in reverse from $n - 1$ down to $0$, prepending $\text{nums}[l]$:
- $\text{nums}[l]$ becomes the initial prefix maximum.
- Any subsequent elements in the window that were previously smaller than $\text{nums}[l]$ are now dominated by $\text{nums}[l]$ up to the next strictly greater element.
- This creates step-wise plateau blocks of running maximums, which can be tracked cleanly using a **Monotonic Deque**.

### 3. Monotonic Deque Maintenance
We maintain a double-ended queue storing indices of active maximum steps within window $[l..r]$:
1. **Pushing $l$ (left expansion):**
   - Pop indices $f$ from the front where $\text{nums}[f] \le \text{nums}[l]$.
   - Deduct their previous contribution: $\text{nums}[f] \times (\text{end} - f)$.
   - Add $\text{nums}[l]$ spanning from $l$ to the next remaining index in the deque.
   - Push $l$ to the front of the deque.
2. **Checking Condition & Shrinking $r$ (right contraction):**
   - If $\text{cost}(l, r) = \text{total} - (\text{pre}[r + 1] - \text{pre}[l]) > k$, decrement $r$.
   - Deduct the value contributed to position $r$ (which equals $\text{nums}[\text{dq.peekLast()}]$).
   - If the last index in the deque equals $r$, pop it from the back.
3. **Counting Valid Subarrays:**
   - Once $\text{cost}(l, r) \le k$, all right endpoints from $l$ to $r$ are valid, contributing $(r - l + 1)$ to the answer.

---

## ⏱️ Complexity Analysis

| Metric | Complexity | Description |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(n)$ | Prefix sums are precomputed in $\mathcal{O}(n)$. In the reverse sliding window, both pointers $l$ and $r$ move strictly leftward at most $n$ times. Each index enters the monotonic deque at most once, and is popped from the front or back at most once, achieving amortized $\mathcal{O}(1)$ per step. |
| **Auxiliary Space** | $\mathcal{O}(n)$ | Prefix sum array `pre` requires $(n + 1)$ 64-bit entries. The monotonic deque stores at most $n$ indices. All other variables (`total`, `cost`, `ans`, `l`, `r`) use $\mathcal{O}(1)$ scalar space. |

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
import java.util.ArrayDeque;

class Solution {
    public long countNonDecreasingSubarrays(int[] nums, int k) {
        int n = nums.length;
        long[] pre = new long[n + 1];
        for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + nums[i];

        // Deque maintains indices of prefix max steps (front = left side)
        ArrayDeque<Integer> dq = new ArrayDeque<>();
        long total = 0; // window [l..r] sum of prefixMax
        int r = n - 1;
        long ans = 0;

        for (int l = n - 1; l >= 0; l--) {
            // Add nums[l] to the left, remove smaller/equal records
            while (!dq.isEmpty() && nums[dq.peekFirst()] <= nums[l]) {
                int f = dq.pollFirst();
                int end = dq.isEmpty() ? r + 1 : dq.peekFirst();
                total -= (long) nums[f] * (end - f);
            }
            int end = dq.isEmpty() ? r + 1 : dq.peekFirst();
            total += (long) nums[l] * (end - l);
            dq.offerFirst(l);

            // cost = sum(prefixMax) - sum(nums) in window [l..r]
            long cost = total - (pre[r + 1] - pre[l]);

            // If cost > k, shrink window from right side
            while (cost > k) {
                int last = dq.peekLast();
                total -= nums[last];
                if (last == r) dq.pollLast();
                r--;
                cost = total - (pre[r + 1] - pre[l]);
            }

            ans += (long) (r - l + 1);
        }

        return ans;
    }
}
```

### 🐍 Python (Python 3)
```python
from collections import deque
from typing import List


class Solution:
    def countNonDecreasingSubarrays(self, nums: List[int], k: int) -> int:
        n = len(nums)
        pre = [0] * (n + 1)
        for i in range(n):
            pre[i + 1] = pre[i] + nums[i]

        dq = deque()  # stores indices of prefix max steps (front = left side)
        total = 0     # sum of prefixMax in window [l..r]
        r = n - 1
        ans = 0

        for l in range(n - 1, -1, -1):
            # Add nums[l] to the left, pop smaller/equal records
            while dq and nums[dq[0]] <= nums[l]:
                f = dq.popleft()
                end = dq[0] if dq else r + 1
                total -= nums[f] * (end - f)

            end = dq[0] if dq else r + 1
            total += nums[l] * (end - l)
            dq.appendleft(l)

            # cost = sum(prefixMax) - sum(nums) in window [l..r]
            cost = total - (pre[r + 1] - pre[l])

            # If cost > k, shrink window from right side
            while cost > k:
                last = dq[-1]
                total -= nums[last]
                if last == r:
                    dq.pop()
                r -= 1
                cost = total - (pre[r + 1] - pre[l])

            ans += r - l + 1

        return ans
```

### ⚡ C++ (C++20)
```cpp
#include <vector>
#include <deque>

class Solution {
public:
    long long countNonDecreasingSubarrays(std::vector<int>& nums, int k) {
        int n = static_cast<int>(nums.size());
        std::vector<long long> pre(n + 1, 0);
        for (int i = 0; i < n; ++i) {
            pre[i + 1] = pre[i] + nums[i];
        }

        std::deque<int> dq; // front = left side
        long long total = 0;
        int r = n - 1;
        long long ans = 0;

        for (int l = n - 1; l >= 0; --l) {
            // Add nums[l] to the left, pop smaller/equal records
            while (!dq.empty() && nums[dq.front()] <= nums[l]) {
                int f = dq.front();
                dq.pop_front();
                int end = dq.empty() ? r + 1 : dq.front();
                total -= static_cast<long long>(nums[f]) * (end - f);
            }
            int end = dq.empty() ? r + 1 : dq.front();
            total += static_cast<long long>(nums[l]) * (end - l);
            dq.push_front(l);

            // cost = sum(prefixMax) - sum(nums) in window [l..r]
            long long cost = total - (pre[r + 1] - pre[l]);

            // If cost > k, shrink window from right side
            while (cost > k) {
                int last = dq.back();
                total -= nums[last];
                if (last == r) {
                    dq.pop_back();
                }
                --r;
                cost = total - (pre[r + 1] - pre[l]);
            }

            ans += (r - l + 1);
        }

        return ans;
    }
};
```

### 🌐 JavaScript (Node.js ES2022)
```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countNonDecreasingSubarrays = function(nums, k) {
    const n = nums.length;
    const pre = new Float64Array(n + 1);
    for (let i = 0; i < n; i++) {
        pre[i + 1] = pre[i] + nums[i];
    }

    // High performance array-backed deque (front push/pop and back pop)
    const buf = new Int32Array(n + 10);
    let head = n + 5;
    let tail = n + 5;

    let total = 0;
    let r = n - 1;
    let ans = 0;

    for (let l = n - 1; l >= 0; l--) {
        // Add nums[l] to the left, remove smaller/equal records
        while (head < tail && nums[buf[head]] <= nums[l]) {
            const f = buf[head++];
            const end = (head < tail) ? buf[head] : r + 1;
            total -= nums[f] * (end - f);
        }

        const end = (head < tail) ? buf[head] : r + 1;
        total += nums[l] * (end - l);
        buf[--head] = l;

        // cost = sum(prefixMax) - sum(nums) in window [l..r]
        let cost = total - (pre[r + 1] - pre[l]);

        // If cost exceeds k, shrink window from right side
        while (cost > k) {
            const last = buf[tail - 1];
            total -= nums[last];
            if (last === r) {
                tail--;
            }
            r--;
            cost = total - (pre[r + 1] - pre[l]);
        }

        ans += (r - l + 1);
    }

    return ans;
};
```

---

<p align="center">
  <a href="../../README.md"><strong>⬅️ Return to November Solutions</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="https://codebytushu.com/Leetcode/"><strong>🌐 Official Live Platform</strong></a>
</p>
