# LeetCode 3691: Maximum Total Subarray Value II

- **Publication Date:** 10 June 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/maximum-total-subarray-value-ii/](https://leetcode.com/problems/maximum-total-subarray-value-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/i55hAAnD0Is?si=aS1uEZSA1wGjtwGX)

---

## Problem Summary

You are given an integer array `nums` of length `n` and an integer `k`.

You must select **exactly** `k` **distinct** non-empty subarrays `nums[l..r]` of `nums`. Subarrays may overlap, but the exact same subarray (same `l` and `r`) cannot be chosen more than once.

The **value** of a subarray `nums[l..r]` is defined as:
$$\text{value}(nums[l..r]) = \max(\text{nums}[l..r]) - \min(\text{nums}[l..r])$$

The **total value** is the sum of the values of all chosen subarrays.

Return the **maximum possible total value** you can achieve.

---

### Examples

#### Example 1:
- **Input:** `nums = [1, 3, 2]`, `k = 2`
- **Output:** `4`
- **Explanation:**
  - One optimal approach is:
    - Choose `nums[0..1] = [1, 3]`. The maximum is $3$ and the minimum is $1$, giving a value of $3 - 1 = 2$.
    - Choose `nums[0..2] = [1, 3, 2]`. The maximum is $3$ and the minimum is $1$, so the value is also $3 - 1 = 2$.
    - Adding these gives $2 + 2 = 4$.

---

### Constraints

- $1 \le n == \text{nums.length} \le 10^5$
- $1 \le \text{nums}[i] \le 10^9$
- $1 \le k \le \min\left(10^5, \frac{n(n + 1)}{2}\right)$

---

## Algorithmic Approach

### 1. Distinct Subarrays vs. Part I
In **Part I (LeetCode #3689)**, identical subarrays could be repeatedly chosen, making it trivial to simply repeat the single maximal subarray spanning the global minimum and global maximum $k$ times.

In **Part II (LeetCode #3691)**, each chosen subarray $(l, r)$ must be **distinct**. We need to find the top $k$ largest subarray values:
$$\Delta(l, r) = \max_{i=l}^r nums[i] - \min_{i=l}^r nums[i]$$

### 2. Static RMQ Precomputation (Sparse Table)
Because range maximum and range minimum queries are required frequently across arbitrary ranges $[l, r]$, a **Sparse Table** is ideal:
- **Precomputation:** Using powers of two, compute $f_{\max}[i][j] = \max(f_{\max}[i][j-1], f_{\max}[i + 2^{j-1}][j-1])$ and similarly for $f_{\min}$.
- **Query:** For any range $[l, r]$, let $len = r - l + 1$ and $k = \lfloor \log_2(len) \rfloor$. The range extremum is answered in $\mathcal{O}(1)$ time:
  $$\max(l, r) = \max(f_{\max}[l][k], f_{\max}[r - 2^k + 1][k])$$
  $$\min(l, r) = \min(f_{\min}[l][k], f_{\min}[r - 2^k + 1][k])$$

### 3. K-Way Merge with Max-Heap (Priority Queue)
- For every starting index $l \in [0, n - 1]$, initialize the priority queue with the longest subarray ending at index $n - 1$:
  $$\text{val} = \text{queryMax}(l, n - 1) - \text{queryMin}(l, n - 1)$$
  Push $(val, l, n - 1)$ into a max-heap.
- At each of the $k$ steps:
  1. Pop the top element $(val, l, r)$ from the max-heap.
  2. Add $val$ to our running sum $ans$.
  3. If $r > l$, compute the value of the next candidate for this starting index, $(l, r - 1)$, and push it into the heap:
     $$\text{nextVal} = \text{queryMax}(l, r - 1) - \text{queryMin}(l, r - 1)$$
- After $k$ extractions, $ans$ contains the maximum total value achievable from $k$ distinct subarrays.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}((N + k) \log N)$ | Sparse Table precomputation takes $\mathcal{O}(N \log N)$ time. Initializing the heap takes $\mathcal{O}(N \log N)$ time, and each of the $k$ heap extractions/insertions takes $\mathcal{O}(\log N)$ time with $\mathcal{O}(1)$ RMQ queries. |
| **Auxiliary Space** | $\mathcal{O}(N \log N)$ | The 2D Sparse Table structures (`fMax` and `fMin`) require $\mathcal{O}(N \log N)$ auxiliary space; the heap stores at most $N$ elements at any moment ($\mathcal{O}(N)$ space). |

---

## Multi-Language Implementations

### Java
```java
import java.util.*;

class SparseTableRMQ {
    int n;
    int maxLog;
    int[][] fMax;
    int[][] fMin;
    int[] lg;

    public SparseTableRMQ(int[] data) {
        n = data.length;
        maxLog = 32 - Integer.numberOfLeadingZeros(n) + 1;

        fMax = new int[n][maxLog];
        fMin = new int[n][maxLog];
        lg = new int[n + 1];

        for (int i = 2; i <= n; i++) {
            lg[i] = lg[i >> 1] + 1;
        }

        for (int i = 0; i < n; i++) {
            fMax[i][0] = data[i];
            fMin[i][0] = data[i];
        }

        for (int j = 1; j < maxLog; j++) {
            for (int i = 0; i <= n - (1 << j); i++) {
                fMax[i][j] = Math.max(
                        fMax[i][j - 1],
                        fMax[i + (1 << (j - 1))][j - 1]);

                fMin[i][j] = Math.min(
                        fMin[i][j - 1],
                        fMin[i + (1 << (j - 1))][j - 1]);
            }
        }
    }

    public int queryMax(int l, int r) {
        int k = lg[r - l + 1];
        return Math.max(
                fMax[l][k],
                fMax[r - (1 << k) + 1][k]);
    }

    public int queryMin(int l, int r) {
        int k = lg[r - l + 1];
        return Math.min(
                fMin[l][k],
                fMin[r - (1 << k) + 1][k]);
    }
}

class Solution {

    public long maxTotalValue(int[] nums, int k) {

        int n = nums.length;

        SparseTableRMQ st = new SparseTableRMQ(nums);

        PriorityQueue<long[]> pq =
                new PriorityQueue<>((a, b) -> Long.compare(b[0], a[0]));

        for (int l = 0; l < n; l++) {
            long val =
                    (long) st.queryMax(l, n - 1)
                            - st.queryMin(l, n - 1);

            pq.offer(new long[]{val, l, n - 1});
        }

        long ans = 0;

        for (int i = 0; i < k; i++) {

            long[] cur = pq.poll();

            long val = cur[0];
            int l = (int) cur[1];
            int r = (int) cur[2];

            ans += val;

            if (r > l) {

                long nextVal =
                        (long) st.queryMax(l, r - 1)
                                - st.queryMin(l, r - 1);

                pq.offer(new long[]{nextVal, l, r - 1});
            }
        }

        return ans;
    }
}
```

### Python
```python
import heapq
from typing import List


class SparseTableRMQ:
    def __init__(self, data: List[int]):
        self.n = len(data)
        self.max_log = self.n.bit_length() + 1
        self.f_max = [[0] * self.max_log for _ in range(self.n)]
        self.f_min = [[0] * self.max_log for _ in range(self.n)]
        self.lg = [0] * (self.n + 1)

        for i in range(2, self.n + 1):
            self.lg[i] = self.lg[i >> 1] + 1

        for i in range(self.n):
            self.f_max[i][0] = data[i]
            self.f_min[i][0] = data[i]

        for j in range(1, self.max_log):
            for i in range(self.n - (1 << j) + 1):
                self.f_max[i][j] = max(
                    self.f_max[i][j - 1],
                    self.f_max[i + (1 << (j - 1))][j - 1]
                )
                self.f_min[i][j] = min(
                    self.f_min[i][j - 1],
                    self.f_min[i + (1 << (j - 1))][j - 1]
                )

    def query_max(self, l: int, r: int) -> int:
        k = self.lg[r - l + 1]
        return max(self.f_max[l][k], self.f_max[r - (1 << k) + 1][k])

    def query_min(self, l: int, r: int) -> int:
        k = self.lg[r - l + 1]
        return min(self.f_min[l][k], self.f_min[r - (1 << k) + 1][k])


class Solution:
    def maxTotalValue(self, nums: List[int], k: int) -> int:
        n = len(nums)
        st = SparseTableRMQ(nums)

        # Max-heap storing (-val, l, r)
        pq = []
        for l in range(n):
            val = st.query_max(l, n - 1) - st.query_min(l, n - 1)
            heapq.heappush(pq, (-val, l, n - 1))

        ans = 0
        for _ in range(k):
            neg_val, l, r = heapq.heappop(pq)
            val = -neg_val
            ans += val

            if r > l:
                next_val = st.query_max(l, r - 1) - st.query_min(l, r - 1)
                heapq.heappush(pq, (-next_val, l, r - 1))

        return ans
```

### C++
```cpp
#include <vector>
#include <queue>
#include <tuple>
#include <algorithm>

using namespace std;

class SparseTableRMQ {
    int n;
    int maxLog;
    vector<vector<int>> fMax;
    vector<vector<int>> fMin;
    vector<int> lg;

public:
    SparseTableRMQ(const vector<int>& data) {
        n = data.size();
        maxLog = 32 - __builtin_clz(max(n, 1)) + 1;

        fMax.assign(n, vector<int>(maxLog, 0));
        fMin.assign(n, vector<int>(maxLog, 0));
        lg.assign(n + 1, 0);

        for (int i = 2; i <= n; i++) {
            lg[i] = lg[i >> 1] + 1;
        }

        for (int i = 0; i < n; i++) {
            fMax[i][0] = data[i];
            fMin[i][0] = data[i];
        }

        for (int j = 1; j < maxLog; j++) {
            for (int i = 0; i <= n - (1 << j); i++) {
                fMax[i][j] = max(
                    fMax[i][j - 1],
                    fMax[i + (1 << (j - 1))][j - 1]);

                fMin[i][j] = min(
                    fMin[i][j - 1],
                    fMin[i + (1 << (j - 1))][j - 1]);
            }
        }
    }

    int queryMax(int l, int r) const {
        int k = lg[r - l + 1];
        return max(fMax[l][k], fMax[r - (1 << k) + 1][k]);
    }

    int queryMin(int l, int r) const {
        int k = lg[r - l + 1];
        return min(fMin[l][k], fMin[r - (1 << k) + 1][k]);
    }
};

class Solution {
public:
    long long maxTotalValue(vector<int>& nums, int k) {
        int n = nums.size();
        SparseTableRMQ st(nums);

        // Max-heap storing {val, l, r}
        priority_queue<tuple<long long, int, int>> pq;

        for (int l = 0; l < n; l++) {
            long long val = (long long)st.queryMax(l, n - 1) - st.queryMin(l, n - 1);
            pq.push({val, l, n - 1});
        }

        long long ans = 0;

        for (int i = 0; i < k; i++) {
            auto [val, l, r] = pq.top();
            pq.pop();

            ans += val;

            if (r > l) {
                long long nextVal = (long long)st.queryMax(l, r - 1) - st.queryMin(l, r - 1);
                pq.push({nextVal, l, r - 1});
            }
        }

        return ans;
    }
};
```

### JavaScript
```javascript
class MaxHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    push(val) {
        this.heap.push(val);
        this._siftUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        const top = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this._siftDown(0);
        }
        return top;
    }

    _siftUp(idx) {
        while (idx > 0) {
            const parent = (idx - 1) >> 1;
            if (this.heap[idx][0] > this.heap[parent][0]) {
                [this.heap[idx], this.heap[parent]] = [this.heap[parent], this.heap[idx]];
                idx = parent;
            } else {
                break;
            }
        }
    }

    _siftDown(idx) {
        const length = this.heap.length;
        while (true) {
            let left = (idx << 1) + 1;
            let right = left + 1;
            let largest = idx;

            if (left < length && this.heap[left][0] > this.heap[largest][0]) {
                largest = left;
            }
            if (right < length && this.heap[right][0] > this.heap[largest][0]) {
                largest = right;
            }
            if (largest !== idx) {
                [this.heap[idx], this.heap[largest]] = [this.heap[largest], this.heap[idx]];
                idx = largest;
            } else {
                break;
            }
        }
    }
}

class SparseTableRMQ {
    constructor(data) {
        this.n = data.length;
        this.maxLog = Math.floor(Math.log2(Math.max(this.n, 1))) + 2;

        this.fMax = Array.from({ length: this.n }, () => new Int32Array(this.maxLog));
        this.fMin = Array.from({ length: this.n }, () => new Int32Array(this.maxLog));
        this.lg = new Int32Array(this.n + 1);

        for (let i = 2; i <= this.n; i++) {
            this.lg[i] = this.lg[i >> 1] + 1;
        }

        for (let i = 0; i < this.n; i++) {
            this.fMax[i][0] = data[i];
            this.fMin[i][0] = data[i];
        }

        for (let j = 1; j < this.maxLog; j++) {
            for (let i = 0; i <= this.n - (1 << j); i++) {
                this.fMax[i][j] = Math.max(
                    this.fMax[i][j - 1],
                    this.fMax[i + (1 << (j - 1))][j - 1]
                );
                this.fMin[i][j] = Math.min(
                    this.fMin[i][j - 1],
                    this.fMin[i + (1 << (j - 1))][j - 1]
                );
            }
        }
    }

    queryMax(l, r) {
        const k = this.lg[r - l + 1];
        return Math.max(this.fMax[l][k], this.fMax[r - (1 << k) + 1][k]);
    }

    queryMin(l, r) {
        const k = this.lg[r - l + 1];
        return Math.min(this.fMin[l][k], this.fMin[r - (1 << k) + 1][k]);
    }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxTotalValue = function(nums, k) {
    const n = nums.length;
    const st = new SparseTableRMQ(nums);
    const pq = new MaxHeap();

    for (let l = 0; l < n; l++) {
        const val = st.queryMax(l, n - 1) - st.queryMin(l, n - 1);
        pq.push([val, l, n - 1]);
    }

    let ans = 0;

    for (let i = 0; i < k; i++) {
        const cur = pq.pop();
        if (!cur) break;

        const [val, l, r] = cur;
        ans += val;

        if (r > l) {
            const nextVal = st.queryMax(l, r - 1) - st.queryMin(l, r - 1);
            pq.push([nextVal, l, r - 1]);
        }
    }

    return ans;
};
```
