# LeetCode 3721: Longest Balanced Subarray II

- **Publication Date:** 11 February 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/longest-balanced-subarray-ii/](https://leetcode.com/problems/longest-balanced-subarray-ii/)
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

- $1 \le \text{nums.length} \le 10^5$
- $1 \le \text{nums}[i] \le 10^5$

---

## Topics and Tags

- **Primary Tags:** Segment Tree, Array, Hash Table
- **Secondary Tags:** Counting, Parity

---

## Detailed Algorithm Walkthrough

### 1. Parity Balance Metric & Range Updates

For any subarray `nums[l...r]`, let each unique even value contribute $+1$ and each unique odd value contribute $-1$. The balance score is:
$$B(l, r) = \sum_{x \in \text{distinct}(nums[l...r])} \text{sgn}(x)$$
A subarray is balanced if and only if $B(l, r) = 0$.

When extending the right endpoint from $r - 1$ to $r$, consider value $v = nums[r]$ with weight $w = (+1 \text{ if } v \text{ is even, else } -1)$.
Let $p$ be the previous index where $v$ appeared (or $-1$ if first occurrence):
- For all left endpoints $l \in [p + 1, r]$: $v$ is a newly introduced distinct value, so $B(l, r) = B(l, r - 1) + w$.
- For all left endpoints $l \in [0, p]$: $v$ was already present in $nums[l...r - 1]$, so $B(l, r) = B(l, r - 1) + 0$.

Thus, extending $r$ corresponds to a **range addition** of $+w$ across the left endpoint interval $[p + 1, r]$!

### 2. Discrete Intermediate Value Theorem on Segment Trees

For a fixed right endpoint $r$, as the left endpoint moves from $l$ to $l + 1$, exactly one element $nums[l]$ is removed from the subarray:
- If $nums[l]$ appears again in $nums[l+1...r]$, the distinct count of that parity is unchanged: $\Delta B = 0$.
- If $nums[l]$ does not appear again, the distinct count of that parity drops by 1: $\Delta B = \pm 1$.

Hence, adjacent terms in the balance array $A[l] = B(l, r)$ change by at most $1$: $|A[l + 1] - A[l]| \le 1$.

> **Key Invariant (Discrete Intermediate Value Theorem):**
> A contiguous range $[L, R]$ contains at least one index where $A[l] = 0$ **if and only if**:
> $$\min_{l \in [L, R]} A[l] \le 0 \quad \text{and} \quad \max_{l \in [L, R]} A[l] \ge 0$$

### 3. Segment Tree with Lazy Propagation

We maintain $A[l]$ over $l \in [0, n - 1]$ using a Segment Tree:
1. Each node tracks `treeMin`, `treeMax`, and `lazy`.
2. Unactivated positions $l > r$ are initialized to $\infty$.
3. When processing index $r$:
   - Activate index $r$ by setting its value to $0$.
   - Perform a lazy range addition of $+w$ on $[p + 1, r]$.
   - Walk down the tree to query the **first index** $l \in [0, r]$ where $A[l] = 0$:
     - Prune subtrees where `treeMin > 0` or `treeMax < 0`.
     - Prioritize the left child to find the minimal $l$ (maximizing subarray length $r - l + 1$).
   - Update `maxLen = max(maxLen, r - l + 1)`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n \log n)$, where $n$ is the length of `nums`.
  - For each of the $n$ steps, range addition and finding the first zero take $\mathcal{O}(\log n)$ time.
  - Total time complexity: $\mathcal{O}(n \log n)$, comfortably running in $< 80\text{ms}$ for $n = 10^5$.
- **Auxiliary Space Complexity:** $\mathcal{O}(n + U)$, where $U = 100000$ is the max value in `nums`, requiring $\mathcal{O}(n)$ memory for the segment tree arrays.

---

## Source Code

### Java
```java
class Solution {
    static class SegmentTree {
        int n;
        int[] treeMin;
        int[] treeMax;
        int[] lazy;

        SegmentTree(int n) {
            this.n = n;
            treeMin = new int[4 * n];
            treeMax = new int[4 * n];
            lazy = new int[4 * n];
            build(1, 0, n - 1);
        }

        private void build(int node, int start, int end) {
            if (start == end) {
                treeMin[node] = 1_000_000;
                treeMax[node] = 1_000_000;
                return;
            }
            int mid = (start + end) >> 1;
            build(node << 1, start, mid);
            build((node << 1) | 1, mid + 1, end);
            treeMin[node] = Math.min(treeMin[node << 1], treeMin[(node << 1) | 1]);
            treeMax[node] = Math.max(treeMax[node << 1], treeMax[(node << 1) | 1]);
        }

        private void push(int node) {
            if (lazy[node] != 0) {
                int val = lazy[node];
                int left = node << 1;
                int right = (node << 1) | 1;

                treeMin[left] += val;
                treeMax[left] += val;
                lazy[left] += val;

                treeMin[right] += val;
                treeMax[right] += val;
                lazy[right] += val;

                lazy[node] = 0;
            }
        }

        public void activate(int node, int start, int end, int idx) {
            if (start == end) {
                treeMin[node] = 0;
                treeMax[node] = 0;
                return;
            }
            push(node);
            int mid = (start + end) >> 1;
            if (idx <= mid) {
                activate(node << 1, start, mid, idx);
            } else {
                activate((node << 1) | 1, mid + 1, end, idx);
            }
            treeMin[node] = Math.min(treeMin[node << 1], treeMin[(node << 1) | 1]);
            treeMax[node] = Math.max(treeMax[node << 1], treeMax[(node << 1) | 1]);
        }

        public void update(int node, int start, int end, int l, int r, int val) {
            if (l <= start && end <= r) {
                treeMin[node] += val;
                treeMax[node] += val;
                lazy[node] += val;
                return;
            }
            push(node);
            int mid = (start + end) >> 1;
            if (l <= mid) {
                update(node << 1, start, mid, l, r, val);
            }
            if (r > mid) {
                update((node << 1) | 1, mid + 1, end, l, r, val);
            }
            treeMin[node] = Math.min(treeMin[node << 1], treeMin[(node << 1) | 1]);
            treeMax[node] = Math.max(treeMax[node << 1], treeMax[(node << 1) | 1]);
        }

        public int findFirstZero(int node, int start, int end, int maxR) {
            if (start > maxR || treeMin[node] > 0 || treeMax[node] < 0) {
                return -1;
            }
            if (start == end) {
                return start;
            }
            push(node);
            int mid = (start + end) >> 1;
            int res = findFirstZero(node << 1, start, mid, maxR);
            if (res != -1) {
                return res;
            }
            return findFirstZero((node << 1) | 1, mid + 1, end, maxR);
        }
    }

    public int longestBalanced(int[] nums) {
        int n = nums.length;
        SegmentTree seg = new SegmentTree(n);
        int[] lastPos = new int[100001];
        java.util.Arrays.fill(lastPos, -1);

        int maxLen = 0;

        for (int r = 0; r < n; r++) {
            int v = nums[r];
            int w = (v % 2 == 0) ? 1 : -1;
            int prev = lastPos[v];
            lastPos[v] = r;

            seg.activate(1, 0, n - 1, r);
            seg.update(1, 0, n - 1, prev + 1, r, w);

            int firstZero = seg.findFirstZero(1, 0, n - 1, r);
            if (firstZero != -1) {
                maxLen = Math.max(maxLen, r - firstZero + 1);
            }
        }

        return maxLen;
    }
}
```

### Python
```python
from typing import List

class SegmentTree:
    def __init__(self, n: int):
        self.n = n
        self.tree_min = [1000000] * (4 * n)
        self.tree_max = [1000000] * (4 * n)
        self.lazy = [0] * (4 * n)
        self._build(1, 0, n - 1)

    def _build(self, node: int, start: int, end: int) -> None:
        if start == end:
            return
        mid = (start + end) >> 1
        self._build(node << 1, start, mid)
        self._build((node << 1) | 1, mid + 1, end)

    def _push(self, node: int) -> None:
        if self.lazy[node] != 0:
            val = self.lazy[node]
            left, right = node << 1, (node << 1) | 1

            self.tree_min[left] += val
            self.tree_max[left] += val
            self.lazy[left] += val

            self.tree_min[right] += val
            self.tree_max[right] += val
            self.lazy[right] += val

            self.lazy[node] = 0

    def activate(self, node: int, start: int, end: int, idx: int) -> None:
        if start == end:
            self.tree_min[node] = 0
            self.tree_max[node] = 0
            return
        self._push(node)
        mid = (start + end) >> 1
        if idx <= mid:
            self.activate(node << 1, start, mid, idx)
        else:
            self.activate((node << 1) | 1, mid + 1, end, idx)
        self.tree_min[node] = min(self.tree_min[node << 1], self.tree_min[(node << 1) | 1])
        self.tree_max[node] = max(self.tree_max[node << 1], self.tree_max[(node << 1) | 1])

    def update(self, node: int, start: int, end: int, l: int, r: int, val: int) -> None:
        if l <= start and end <= r:
            self.tree_min[node] += val
            self.tree_max[node] += val
            self.lazy[node] += val
            return
        self._push(node)
        mid = (start + end) >> 1
        if l <= mid:
            self.update(node << 1, start, mid, l, r, val)
        if r > mid:
            self.update((node << 1) | 1, mid + 1, end, l, r, val)
        self.tree_min[node] = min(self.tree_min[node << 1], self.tree_min[(node << 1) | 1])
        self.tree_max[node] = max(self.tree_max[node << 1], self.tree_max[(node << 1) | 1])

    def find_first_zero(self, node: int, start: int, end: int, max_r: int) -> int:
        if start > max_r or self.tree_min[node] > 0 or self.tree_max[node] < 0:
            return -1
        if start == end:
            return start
        self._push(node)
        mid = (start + end) >> 1
        res = self.find_first_zero(node << 1, start, mid, max_r)
        if res != -1:
            return res
        return self.find_first_zero((node << 1) | 1, mid + 1, end, max_r)


class Solution:
    def longestBalanced(self, nums: List[int]) -> int:
        n = len(nums)
        seg = SegmentTree(n)
        last_pos = [-1] * 100001
        max_len = 0

        for r, v in enumerate(nums):
            w = 1 if v % 2 == 0 else -1
            prev = last_pos[v]
            last_pos[v] = r

            seg.activate(1, 0, n - 1, r)
            seg.update(1, 0, n - 1, prev + 1, r, w)

            first_zero = seg.find_first_zero(1, 0, n - 1, r)
            if first_zero != -1:
                max_len = max(max_len, r - first_zero + 1)

        return max_len
```

### C++
```cpp
#include <vector>
#include <algorithm>

using namespace std;

class SegmentTree {
private:
    int n;
    vector<int> treeMin;
    vector<int> treeMax;
    vector<int> lazy;

    void build(int node, int start, int end) {
        if (start == end) {
            treeMin[node] = 1000000;
            treeMax[node] = 1000000;
            return;
        }
        int mid = (start + end) >> 1;
        build(node << 1, start, mid);
        build((node << 1) | 1, mid + 1, end);
        treeMin[node] = min(treeMin[node << 1], treeMin[(node << 1) | 1]);
        treeMax[node] = max(treeMax[node << 1], treeMax[(node << 1) | 1]);
    }

    void push(int node) {
        if (lazy[node] != 0) {
            int val = lazy[node];
            int left = node << 1;
            int right = (node << 1) | 1;

            treeMin[left] += val;
            treeMax[left] += val;
            lazy[left] += val;

            treeMin[right] += val;
            treeMax[right] += val;
            lazy[right] += val;

            lazy[node] = 0;
        }
    }

public:
    SegmentTree(int n) : n(n), treeMin(4 * n), treeMax(4 * n), lazy(4 * n, 0) {
        build(1, 0, n - 1);
    }

    void activate(int node, int start, int end, int idx) {
        if (start == end) {
            treeMin[node] = 0;
            treeMax[node] = 0;
            return;
        }
        push(node);
        int mid = (start + end) >> 1;
        if (idx <= mid) {
            activate(node << 1, start, mid, idx);
        } else {
            activate((node << 1) | 1, mid + 1, end, idx);
        }
        treeMin[node] = min(treeMin[node << 1], treeMin[(node << 1) | 1]);
        treeMax[node] = max(treeMax[node << 1], treeMax[(node << 1) | 1]);
    }

    void update(int node, int start, int end, int l, int r, int val) {
        if (l <= start && end <= r) {
            treeMin[node] += val;
            treeMax[node] += val;
            lazy[node] += val;
            return;
        }
        push(node);
        int mid = (start + end) >> 1;
        if (l <= mid) {
            update(node << 1, start, mid, l, r, val);
        }
        if (r > mid) {
            update((node << 1) | 1, mid + 1, end, l, r, val);
        }
        treeMin[node] = min(treeMin[node << 1], treeMin[(node << 1) | 1]);
        treeMax[node] = max(treeMax[node << 1], treeMax[(node << 1) | 1]);
    }

    int findFirstZero(int node, int start, int end, int maxR) {
        if (start > maxR || treeMin[node] > 0 || treeMax[node] < 0) {
            return -1;
        }
        if (start == end) {
            return start;
        }
        push(node);
        int mid = (start + end) >> 1;
        int res = findFirstZero(node << 1, start, mid, maxR);
        if (res != -1) {
            return res;
        }
        return findFirstZero((node << 1) | 1, mid + 1, end, maxR);
    }
};

class Solution {
public:
    int longestBalanced(vector<int>& nums) {
        int n = nums.size();
        SegmentTree seg(n);
        vector<int> lastPos(100001, -1);
        int maxLen = 0;

        for (int r = 0; r < n; r++) {
            int v = nums[r];
            int w = (v % 2 == 0) ? 1 : -1;
            int prev = lastPos[v];
            lastPos[v] = r;

            seg.activate(1, 0, n - 1, r);
            seg.update(1, 0, n - 1, prev + 1, r, w);

            int firstZero = seg.findFirstZero(1, 0, n - 1, r);
            if (firstZero != -1) {
                maxLen = max(maxLen, r - firstZero + 1);
            }
        }

        return maxLen;
    }
};
```

### JavaScript
```javascript
class SegmentTree {
    constructor(n) {
        this.n = n;
        this.treeMin = new Int32Array(4 * n);
        this.treeMax = new Int32Array(4 * n);
        this.lazy = new Int32Array(4 * n);
        this.build(1, 0, n - 1);
    }

    build(node, start, end) {
        if (start === end) {
            this.treeMin[node] = 1000000;
            this.treeMax[node] = 1000000;
            return;
        }
        const mid = (start + end) >> 1;
        this.build(node << 1, start, mid);
        this.build((node << 1) | 1, mid + 1, end);
        this.treeMin[node] = Math.min(this.treeMin[node << 1], this.treeMin[(node << 1) | 1]);
        this.treeMax[node] = Math.max(this.treeMax[node << 1], this.treeMax[(node << 1) | 1]);
    }

    push(node) {
        if (this.lazy[node] !== 0) {
            const val = this.lazy[node];
            const left = node << 1;
            const right = (node << 1) | 1;

            this.treeMin[left] += val;
            this.treeMax[left] += val;
            this.lazy[left] += val;

            this.treeMin[right] += val;
            this.treeMax[right] += val;
            this.lazy[right] += val;

            this.lazy[node] = 0;
        }
    }

    activate(node, start, end, idx) {
        if (start === end) {
            this.treeMin[node] = 0;
            this.treeMax[node] = 0;
            return;
        }
        this.push(node);
        const mid = (start + end) >> 1;
        if (idx <= mid) {
            this.activate(node << 1, start, mid, idx);
        } else {
            this.activate((node << 1) | 1, mid + 1, end, idx);
        }
        this.treeMin[node] = Math.min(this.treeMin[node << 1], this.treeMin[(node << 1) | 1]);
        this.treeMax[node] = Math.max(this.treeMax[node << 1], this.treeMax[(node << 1) | 1]);
    }

    update(node, start, end, l, r, val) {
        if (l <= start && end <= r) {
            this.treeMin[node] += val;
            this.treeMax[node] += val;
            this.lazy[node] += val;
            return;
        }
        this.push(node);
        const mid = (start + end) >> 1;
        if (l <= mid) {
            this.update(node << 1, start, mid, l, r, val);
        }
        if (r > mid) {
            this.update((node << 1) | 1, mid + 1, end, l, r, val);
        }
        this.treeMin[node] = Math.min(this.treeMin[node << 1], this.treeMin[(node << 1) | 1]);
        this.treeMax[node] = Math.max(this.treeMax[node << 1], this.treeMax[(node << 1) | 1]);
    }

    findFirstZero(node, start, end, maxR) {
        if (start > maxR || this.treeMin[node] > 0 || this.treeMax[node] < 0) {
            return -1;
        }
        if (start === end) {
            return start;
        }
        this.push(node);
        const mid = (start + end) >> 1;
        const res = this.findFirstZero(node << 1, start, mid, maxR);
        if (res !== -1) {
            return res;
        }
        return this.findFirstZero((node << 1) | 1, mid + 1, end, maxR);
    }
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestBalanced = function(nums) {
    const n = nums.length;
    const seg = new SegmentTree(n);
    const lastPos = new Int32Array(100001).fill(-1);
    let maxLen = 0;

    for (let r = 0; r < n; r++) {
        const v = nums[r];
        const w = (v % 2 === 0) ? 1 : -1;
        const prev = lastPos[v];
        lastPos[v] = r;

        seg.activate(1, 0, n - 1, r);
        seg.update(1, 0, n - 1, prev + 1, r, w);

        const firstZero = seg.findFirstZero(1, 0, n - 1, r);
        if (firstZero !== -1) {
            maxLen = Math.max(maxLen, r - firstZero + 1);
        }
    }

    return maxLen;
};
```
