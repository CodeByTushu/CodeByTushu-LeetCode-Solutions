# LeetCode 3655: XOR After Range Multiplication Queries II

- **Publication Date:** 09 April 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/xor-after-range-multiplication-queries-ii/](https://leetcode.com/problems/xor-after-range-multiplication-queries-ii/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

You are given an integer array `nums` of length `n` and a 2D integer array `queries` of size `q`, where `queries[i] = [l_i, r_i, k_i, v_i]`.

For each query, you must apply the following operations in order:
1. Set `idx = l_i`.
2. While `idx <= r_i`:
   - Update: `nums[idx] = (nums[idx] * v_i) % (10^9 + 7)`
   - Set `idx += k_i`.

Return the **bitwise XOR** of all elements in `nums` after processing all queries.

---

### Examples

#### Example 1:
```text
Input: nums = [1,1,1], queries = [[0,2,1,4]]
Output: 4
Explanation:
- A single query [0, 2, 1, 4] multiplies every element from index 0 through index 2 by 4.
- The array changes from [1, 1, 1] to [4, 4, 4].
- The XOR of all elements is 4 ^ 4 ^ 4 = 4.
```

#### Example 2:
```text
Input: nums = [2,3,1,5,4], queries = [[1,4,2,3],[0,2,1,2]]
Output: 31
Explanation:
- The first query [1, 4, 2, 3] multiplies the elements at indices 1 and 3 by 3, transforming the array to [2, 9, 1, 15, 4].
- The second query [0, 2, 1, 2] multiplies the elements at indices 0, 1, and 2 by 2, resulting in [4, 18, 2, 15, 4].
- Finally, the XOR of all elements is 4 ^ 18 ^ 2 ^ 15 ^ 4 = 31.
```

---

### Constraints

- $1 \le n == \text{nums.length} \le 10^5$
- $1 \le \text{nums}[i] \le 10^9$
- $1 \le q == \text{queries.length} \le 10^5$
- $\text{queries}[i] = [l_i, r_i, k_i, v_i]$
- $0 \le l_i \le r_i < n$
- $1 \le k_i \le n$
- $1 \le v_i \le 10^5$

---

## Detailed Intuition & Approach

### 1. The Scaling Bottleneck
Unlike Part I where $n, q \le 10^3$, here $n, q \le 10^5$. A direct simulation per query runs in $\mathcal{O}(q \cdot \frac{n}{k})$, which degrades to $\mathcal{O}(q \cdot n) \approx 10^{10}$ operations when $k = 1$, leading directly to Time Limit Exceeded (TLE).

### 2. Square Root Decomposition Strategy
We partition queries based on their stride parameter $k$ relative to a threshold $B \approx \sqrt{n} \approx 316$:

1. **Large Steps ($k \ge B$):**
   - The number of visited indices per query is at most $\frac{n}{k} \le \frac{n}{B} \le \sqrt{n} \approx 316$.
   - Because the number of steps is strictly bounded, direct simulation for all large-$k$ queries takes at most $\mathcal{O}(q \cdot \sqrt{n})$ operations across the entire query set.

2. **Small Steps ($k < B$):**
   - For small $k$, individual queries can touch many elements. However, there are at most $B \approx \sqrt{n}$ distinct step sizes $k \in [1, B-1]$.
   - We group queries by their specific stride $k$.
   - For each fixed $k$, we build a **Multiplicative Difference Array**:
     - Standard difference arrays handle addition via $+v$ at $l$ and $-v$ at $r+1$.
     - For multiplicative updates modulo a prime $M = 10^9 + 7$, we multiply by $v$ at the start index $l$, and multiply by the modular multiplicative inverse $v^{-1} \pmod M$ at the first index past the end:
       $$\text{steps} = \left\lfloor\frac{r - l}{k}\right\rfloor, \quad \text{next} = l + (\text{steps} + 1) \cdot k$$
     - By Fermat's Little Theorem, since $M$ is prime and $1 \le v \le 10^5$, $v^{-1} \equiv v^{M - 2} \pmod M$, computed in $\mathcal{O}(\log M)$ time using binary exponentiation.
   - After registering all queries for step $k$, we sweep from index $0$ to $n-1$, computing prefix products along stride $k$:
     $$\text{diff}[i] = (\text{diff}[i] \times \text{diff}[i - k]) \pmod M$$
   - Each element $\text{nums}[i]$ is multiplied by $\text{diff}[i]$ modulo $M$.

### 3. Final Bitwise XOR Aggregation
After applying all large-$k$ queries and all small-$k$ batch passes, we iterate through the modified `nums` array and compute the cumulative bitwise XOR:
$$\text{ans} = \bigoplus_{i=0}^{n-1} \text{nums}[i]$$

---

## Complexity Analysis

- **Time Complexity:**
  - Large $k$ queries: $\mathcal{O}(q_{\text{large}} \cdot \frac{n}{B}) = \mathcal{O}(q \sqrt{n})$.
  - Small $k$ queries: $\mathcal{O}(q_{\text{small}} \cdot \log M + B \cdot n) = \mathcal{O}(q \log M + n \sqrt{n})$.
  - Total Time: $\mathcal{O}((n + q) \sqrt{n} + q \log M)$, which comfortably executes in $\approx 6 \times 10^7$ operations.
- **Auxiliary Space Complexity:** $\mathcal{O}(n + q)$ to store grouped query lists and the difference array of size $n + B$.

---

## Multi-Language Solutions

### Java ☕
```java
import java.util.*;

class Solution {
    private static final long MOD = 1_000_000_007L;

    public int xorAfterQueries(int[] nums, int[][] queries) {
        int n = nums.length;
        int B = Math.max(1, (int) Math.sqrt(n));

        @SuppressWarnings("unchecked")
        List<int[]>[] smallK = new ArrayList[B];

        for (int[] q : queries) {
            int l = q[0];
            int r = q[1];
            int k = q[2];
            int v = q[3];

            if (k >= B) {
                for (int idx = l; idx <= r; idx += k) {
                    nums[idx] = (int) (((long) nums[idx] * v) % MOD);
                }
            } else {
                if (smallK[k] == null) {
                    smallK[k] = new ArrayList<>();
                }
                smallK[k].add(q);
            }
        }

        for (int k = 1; k < B; k++) {
            if (smallK[k] == null) continue;

            long[] diff = new long[n + k];
            Arrays.fill(diff, 1L);

            for (int[] q : smallK[k]) {
                int l = q[0];
                int r = q[1];
                int v = q[3];

                diff[l] = (diff[l] * v) % MOD;
                int steps = (r - l) / k;
                int next = l + (steps + 1) * k;
                long inv = modInverse(v, MOD);
                diff[next] = (diff[next] * inv) % MOD;
            }

            for (int i = 0; i < n; i++) {
                if (i >= k) {
                    diff[i] = (diff[i] * diff[i - k]) % MOD;
                }
                nums[i] = (int) (((long) nums[i] * diff[i]) % MOD);
            }
        }

        int xorSum = 0;
        for (int val : nums) {
            xorSum ^= val;
        }

        return xorSum;
    }

    private long modInverse(long base, long mod) {
        return power(base, mod - 2, mod);
    }

    private long power(long base, long exp, long mod) {
        long res = 1;
        base %= mod;
        while (exp > 0) {
            if ((exp & 1) == 1) {
                res = (res * base) % mod;
            }
            base = (base * base) % mod;
            exp >>= 1;
        }
        return res;
    }
}
```

### Python 🐍
```python
import math
from collections import defaultdict

class Solution:
    def xorAfterQueries(self, nums: list[int], queries: list[list[int]]) -> int:
        MOD = 1_000_000_007
        n = len(nums)
        B = max(1, int(math.isqrt(n)))
        
        small_k = defaultdict(list)
        
        for l, r, k, v in queries:
            if k >= B:
                for idx in range(l, r + 1, k):
                    nums[idx] = (nums[idx] * v) % MOD
            else:
                small_k[k].append((l, r, v))
                
        for k, q_list in small_k.items():
            diff = [1] * (n + k)
            for l, r, v in q_list:
                diff[l] = (diff[l] * v) % MOD
                steps = (r - l) // k
                nxt = l + (steps + 1) * k
                diff[nxt] = (diff[nxt] * pow(v, MOD - 2, MOD)) % MOD
                
            for i in range(n):
                if i >= k:
                    diff[i] = (diff[i] * diff[i - k]) % MOD
                nums[i] = (nums[i] * diff[i]) % MOD
                
        xor_sum = 0
        for val in nums:
            xor_sum ^= val

        return xor_sum
```

### C++ ⚡
```cpp
#include <vector>
#include <cmath>
#include <algorithm>

using namespace std;

class Solution {
private:
    static constexpr long long MOD = 1000000007LL;

    long long power(long long base, long long exp) {
        long long res = 1;
        base %= MOD;
        while (exp > 0) {
            if (exp & 1) res = (res * base) % MOD;
            base = (base * base) % MOD;
            exp >>= 1;
        }
        return res;
    }

    long long modInverse(long long base) {
        return power(base, MOD - 2);
    }

public:
    int xorAfterQueries(vector<int>& nums, vector<vector<int>>& queries) {
        int n = nums.size();
        int B = max(1, (int)sqrt(n));

        vector<vector<vector<int>>> smallK(B);

        for (const auto& q : queries) {
            int l = q[0];
            int r = q[1];
            int k = q[2];
            int v = q[3];

            if (k >= B) {
                for (int idx = l; idx <= r; idx += k) {
                    nums[idx] = (int)((1LL * nums[idx] * v) % MOD);
                }
            } else {
                smallK[k].push_back(q);
            }
        }

        for (int k = 1; k < B; ++k) {
            if (smallK[k].empty()) continue;

            vector<long long> diff(n + k, 1);

            for (const auto& q : smallK[k]) {
                int l = q[0];
                int r = q[1];
                int v = q[3];

                diff[l] = (diff[l] * v) % MOD;
                int steps = (r - l) / k;
                int next = l + (steps + 1) * k;
                diff[next] = (diff[next] * modInverse(v)) % MOD;
            }

            for (int i = 0; i < n; ++i) {
                if (i >= k) {
                    diff[i] = (diff[i] * diff[i - k]) % MOD;
                }
                nums[i] = (int)((1LL * nums[i] * diff[i]) % MOD);
            }
        }

        int xorSum = 0;
        for (int val : nums) {
            xorSum ^= val;
        }

        return xorSum;
    }
};
```

### JavaScript 🌐
```javascript
/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */
var xorAfterQueries = function(nums, queries) {
    const MOD = 1000000007n;
    const n = nums.length;
    const B = Math.max(1, Math.floor(Math.sqrt(n)));

    const power = (base, exp) => {
        let res = 1n;
        let b = BigInt(base) % MOD;
        let e = BigInt(exp);
        while (e > 0n) {
            if (e & 1n) res = (res * b) % MOD;
            b = (b * b) % MOD;
            e >>= 1n;
        }
        return res;
    };

    const modInverse = (base) => power(base, MOD - 2n);

    const smallK = new Map();

    for (let i = 0; i < queries.length; i++) {
        const [l, r, k, v] = queries[i];
        if (k >= B) {
            const vBig = BigInt(v);
            for (let idx = l; idx <= r; idx += k) {
                nums[idx] = Number((BigInt(nums[idx]) * vBig) % MOD);
            }
        } else {
            if (!smallK.has(k)) smallK.set(k, []);
            smallK.get(k).push([l, r, v]);
        }
    }

    for (const [k, qList] of smallK.entries()) {
        const diff = new BigInt64Array(n + k);
        diff.fill(1n);

        for (let i = 0; i < qList.length; i++) {
            const [l, r, v] = qList[i];
            const vBig = BigInt(v);
            diff[l] = (diff[l] * vBig) % MOD;
            const steps = Math.floor((r - l) / k);
            const next = l + (steps + 1) * k;
            diff[next] = (diff[next] * modInverse(vBig)) % MOD;
        }

        for (let i = 0; i < n; i++) {
            if (i >= k) {
                diff[i] = (diff[i] * diff[i - k]) % MOD;
            }
            nums[i] = Number((BigInt(nums[i]) * diff[i]) % MOD);
        }
    }

    let xorSum = 0;
    for (let i = 0; i < n; i++) {
        xorSum ^= nums[i];
    }

    return xorSum;
};
```
