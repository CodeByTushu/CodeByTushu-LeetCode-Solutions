# LeetCode 3934: Smallest Unique Subarray

- **Publication Date:** 25 November 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/smallest-unique-subarray/](https://leetcode.com/problems/smallest-unique-subarray/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/u9HXwxzWzgw)

---

## 💡 Problem Summary

You are given an integer array `nums`.

Find the **minimum length** of a subarray that is **not identical** to any other subarray in `nums`.

Return an integer denoting the minimum possible length of such a subarray.

Two subarrays are considered identical if they have the same length and the same elements in corresponding positions.

---

### 🧪 Example Walkthrough

#### Example 1:
- **Input:** `nums = [3, 3, 3]`
- **Output:** `3`
- **Explanation:**  
  - Subarrays of length $1$: `[3]` appears $3$ times.
  - Subarrays of length $2$: `[3, 3]` appears $2$ times.
  - Subarrays of length $3$: `[3, 3, 3]` appears once.  
  The subarray `[3, 3, 3]` is unique, so the smallest unique subarray length is $3$.

#### Example 2:
- **Input:** `nums = [2, 1, 2, 3, 3]`
- **Output:** `1`
- **Explanation:**  
  - Subarrays of length $1$: `[2]` appears twice, `[3]` appears twice, `[1]` appears once.  
  Since `[1]` is already unique, the smallest unique subarray length is $1$.

#### Example 3:
- **Input:** `nums = [1, 1, 2, 2, 1]`
- **Output:** `2`
- **Explanation:**  
  - Subarrays of length $1$: `[1]` appears $3$ times, `[2]` appears twice (none are unique).
  - Subarrays of length $2$: `[1, 1]`, `[1, 2]`, `[2, 2]`, `[2, 1]` all appear exactly once.  
  At least one subarray of length $2$ is unique, so the answer is $2$.

---

### 🔒 Constraints

- $1 \le \text{nums.length} \le 10^5$
- $1 \le \text{nums}[i] \le 10^5$

---

## 🧠 Algorithmic Approach & Key Observations

### 1. Monotonicity & Binary Search on Answer
- The entire array of length $N$ is always unique because no other subarray of length $N$ exists.
- Crucially, if there exists a unique subarray $nums[i \dots i+L-1]$ of length $L$, any supersegment containing it (for instance, extending it to length $L+1$) is also guaranteed to be unique. If the length $L+1$ supersegment repeated elsewhere, its embedded length $L$ prefix would also repeat elsewhere, contradicting that the length $L$ segment appeared only once.
- Hence, the predicate $\text{hasUnique}(L)$ exhibits monotonicity:
  $$\text{hasUnique}(L) \implies \text{hasUnique}(L+1)$$
- We can perform a **Binary Search on the Answer** for $L \in [1, N]$.

### 2. Rolling Hash (Rabin-Karp) with Mersenne Prime
- To check whether any subarray of length $L$ appears only once, we compute polynomial rolling hashes for all $M = N - L + 1$ contiguous subarrays of length $L$.
- We choose a large 61-bit Mersenne prime:
  $$\text{MOD} = 2^{61} - 1$$
  and a randomly generated base:
  $$\text{base} \in [10^6+3, 2 \times 10^6]$$
- With prefix hashes $h[i]$ and powers $pw[i]$, any length-$L$ substring hash starting at index $i$ is calculated in $\mathcal{O}(1)$ time:
  $$\text{Hash}(i, i+L) = (h[i+L] - h[i] \times pw[L]) \pmod{\text{MOD}}$$

### 3. Sorting & Adjacent Frequency Verification
- Instead of using hash maps (which risk hash collisions, high memory overhead, and Rehashing overhead on $10^5$ 64-bit entries), we collect all $M$ hashes into an array of size $M$.
- Sorting the hash array takes $\mathcal{O}(M \log M)$ time.
- A single linear scan through the sorted hashes verifies if any hash appears strictly once:
  $$\text{arr}[i] \ne \text{arr}[i-1] \quad \text{and} \quad \text{arr}[i] \ne \text{arr}[i+1]$$
- If any unique hash is found, $\text{hasUnique}(L)$ returns `true`.

---

## ⏱️ Complexity Analysis

| Metric | Complexity | Description |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N \log^2 N)$ | Binary search over $L \in [1, N]$ takes $\mathcal{O}(\log N)$ steps. In each step, extracting hashes takes $\mathcal{O}(N)$, sorting takes $\mathcal{O}(N \log N)$, and linear scan takes $\mathcal{O}(N)$. Total operations $\approx 2.8 \times 10^6$ for $N = 10^5$, executing in $\sim 317\text{ ms}$. |
| **Auxiliary Space** | $\mathcal{O}(N)$ | Storing prefix hash array $h$ and power array $pw$ of size $N+1$, plus a temporary hash buffer of size at most $N$. Strict $\mathcal{O}(N)$ auxiliary memory well within the LeetCode memory limit. |

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
/**
 * Problem: LeetCode 3934 - Smallest Unique Subarray
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    private static final long MOD = (1L << 61) - 1;
    private long[] h, pw;
    private int[] nums;
    private int n;

    public int smallestUniqueSubarray(int[] nums) {
        this.nums = nums;
        n = nums.length;

        long base = 1_000_003L + new java.util.Random().nextInt(1_000_000);
        h = new long[n + 1];
        pw = new long[n + 1];
        pw[0] = 1;
        for (int i = 0; i < n; i++) {
            h[i + 1] = (mul(h[i], base) + nums[i]) % MOD;
            pw[i + 1] = mul(pw[i], base);
        }

        // Length n ka subarray hamesha unique hota hai, isliye answer <= n
        int lo = 1, hi = n;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (hasUnique(mid)) hi = mid;
            else lo = mid + 1;
        }
        return lo;
    }

    // Kya length L ka koi subarray aisa hai jo sirf ek baar aata hai?
    private boolean hasUnique(int L) {
        int m = n - L + 1;
        long[] arr = new long[m];
        for (int i = 0; i < m; i++) {
            long v = (h[i + L] - mul(h[i], pw[L])) % MOD;
            if (v < 0) v += MOD;
            arr[i] = v;
        }
        java.util.Arrays.sort(arr);

        for (int i = 0; i < m; i++) {
            boolean sameLeft = i > 0 && arr[i] == arr[i - 1];
            boolean sameRight = i < m - 1 && arr[i] == arr[i + 1];
            if (!sameLeft && !sameRight) return true;
        }
        return false;
    }

    // (a * b) mod (2^61 - 1) using fast bitwise reduction
    private static long mul(long a, long b) {
        long hi = Math.multiplyHigh(a, b);
        long lo = a * b;
        long r = (lo & MOD) + ((lo >>> 61) | (hi << 3));
        r = (r & MOD) + (r >>> 61);
        if (r >= MOD) r -= MOD;
        return r;
    }
}
```

### 🐍 Python (Python 3)
```python
"""
Problem: LeetCode 3934 - Smallest Unique Subarray
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""
import random

class Solution:
    def smallestUniqueSubarray(self, nums: list[int]) -> int:
        n = len(nums)
        MOD = (1 << 61) - 1
        base = 1000003 + random.randint(1, 1000000)

        h = [0] * (n + 1)
        pw = [1] * (n + 1)
        for i in range(n):
            h[i + 1] = (h[i] * base + nums[i]) % MOD
            pw[i + 1] = (pw[i] * base) % MOD

        def has_unique(L: int) -> bool:
            m = n - L + 1
            pw_L = pw[L]
            arr = []
            for i in range(m):
                v = (h[i + L] - h[i] * pw_L) % MOD
                arr.append(v)
            arr.sort()

            for i in range(m):
                same_left = i > 0 and arr[i] == arr[i - 1]
                same_right = i < m - 1 and arr[i] == arr[i + 1]
                if not same_left and not same_right:
                    return True
            return False

        lo, hi = 1, n
        while lo < hi:
            mid = (lo + hi) // 2
            if has_unique(mid):
                hi = mid
            else:
                lo = mid + 1

        return lo
```

### ⚡ C++ (C++20)
```cpp
/**
 * Problem: LeetCode 3934 - Smallest Unique Subarray
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <random>
#include <algorithm>

using namespace std;

class Solution {
    using u64 = unsigned long long;
    using u128 = __uint128_t;
    const u64 MOD = (1ULL << 61) - 1;

    vector<u64> h, pw;
    int n;

    u64 mul(u64 a, u64 b) {
        u128 r = (u128)a * b;
        u64 res = (r & MOD) + (r >> 61);
        if (res >= MOD) res -= MOD;
        return res;
    }

    bool hasUnique(int L) {
        int m = n - L + 1;
        vector<u64> arr(m);
        u64 pwL = pw[L];
        for (int i = 0; i < m; i++) {
            u64 sub = mul(h[i], pwL);
            u64 v = (h[i + L] >= sub) ? (h[i + L] - sub) : (h[i + L] + MOD - sub);
            arr[i] = v;
        }
        sort(arr.begin(), arr.end());

        for (int i = 0; i < m; i++) {
            bool sameLeft = (i > 0 && arr[i] == arr[i - 1]);
            bool sameRight = (i < m - 1 && arr[i] == arr[i + 1]);
            if (!sameLeft && !sameRight) return true;
        }
        return false;
    }

public:
    int smallestUniqueSubarray(vector<int>& nums) {
        n = nums.size();
        mt19937_64 rng(1337);
        u64 base = 1000003ULL + (rng() % 1000000ULL);

        h.resize(n + 1, 0);
        pw.resize(n + 1, 1);
        for (int i = 0; i < n; i++) {
            h[i + 1] = (mul(h[i], base) + (u64)nums[i]) % MOD;
            pw[i + 1] = mul(pw[i], base);
        }

        int lo = 1, hi = n;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (hasUnique(mid)) hi = mid;
            else lo = mid + 1;
        }
        return lo;
    }
};
```

### 🌐 JavaScript (Node.js ES2022)
```javascript
/**
 * Problem: LeetCode 3934 - Smallest Unique Subarray
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var smallestUniqueSubarray = function(nums) {
    const n = nums.length;
    const MOD = (1n << 61n) - 1n;
    const base = 1000003n + BigInt(Math.floor(Math.random() * 1000000));

    const h = new BigUint64Array(n + 1);
    const pw = new BigUint64Array(n + 1);
    pw[0] = 1n;

    for (let i = 0; i < n; i++) {
        h[i + 1] = (h[i] * base + BigInt(nums[i])) % MOD;
        pw[i + 1] = (pw[i] * base) % MOD;
    }

    const hasUnique = (L) => {
        const m = n - L + 1;
        const pwL = pw[L];
        const arr = new BigUint64Array(m);
        for (let i = 0; i < m; i++) {
            let v = (h[i + L] - ((h[i] * pwL) % MOD)) % MOD;
            if (v < 0n) v += MOD;
            arr[i] = v;
        }
        arr.sort();

        for (let i = 0; i < m; i++) {
            const sameLeft = i > 0 && arr[i] === arr[i - 1];
            const sameRight = i < m - 1 && arr[i] === arr[i + 1];
            if (!sameLeft && !sameRight) return true;
        }
        return false;
    };

    let lo = 1, hi = n;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (hasUnique(mid)) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
};
```

---

## 🔗 Connected Solutions

- [☕ Java Solution](./Solution.java)
- [🐍 Python Solution](./solution.py)
- [⚡ C++ Solution](./solution.cpp)
- [🌐 JavaScript Solution](./solution.js)
- [🍁 November Daily Challenge Archive](../../)
- [📂 Root Repository Solutions](../../../)
