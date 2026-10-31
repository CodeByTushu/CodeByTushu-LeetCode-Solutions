# LeetCode 1622: Fancy Sequence

- **Publication Date:** 15 March 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/fancy-sequence/](https://leetcode.com/problems/fancy-sequence/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/19NAOdlMwLs?si=XxJ8wLFWJJjn7-Hh)

---

## Problem Summary

Write an API that generates fancy sequences using the `append`, `addAll`, and `multAll` operations.

Implement the `Fancy` class:
- `Fancy()` Initializes the object with an empty sequence.
- `void append(val)` Appends an integer `val` to the end of the sequence.
- `void addAll(inc)` Increments all existing values in the sequence by an integer `inc`.
- `void multAll(m)` Multiplies all existing values in the sequence by an integer `m`.
- `int getIndex(idx)` Gets the current value at index `idx` (0-indexed) of the sequence modulo $10^9 + 7$. If the index is greater than or equal to the length of the sequence, return `-1`.

---

### Examples

#### Example 1:
- **Input:**
  ```text
  ["Fancy", "append", "addAll", "append", "multAll", "getIndex", "addAll", "append", "multAll", "getIndex", "getIndex", "getIndex"]
  [[], [2], [3], [7], [2], [0], [3], [10], [2], [0], [1], [2]]
  ```
- **Output:**
  ```text
  [null, null, null, null, null, 10, null, null, null, 26, 34, 20]
  ```
- **Explanation:**
  ```text
  Fancy fancy = new Fancy();
  fancy.append(2);   // fancy sequence: [2]
  fancy.addAll(3);   // fancy sequence: [2+3] -> [5]
  fancy.append(7);   // fancy sequence: [5, 7]
  fancy.multAll(2);  // fancy sequence: [5*2, 7*2] -> [10, 14]
  fancy.getIndex(0); // return 10
  fancy.addAll(3);   // fancy sequence: [10+3, 14+3] -> [13, 17]
  fancy.append(10);  // fancy sequence: [13, 17, 10]
  fancy.multAll(2);  // fancy sequence: [13*2, 17*2, 10*2] -> [26, 34, 20]
  fancy.getIndex(0); // return 26
  fancy.getIndex(1); // return 34
  fancy.getIndex(2); // return 20
  ```

---

### Constraints

- $1 \le val, inc, m \le 100$
- $0 \le idx \le 10^5$
- At most $10^5$ calls total will be made to `append`, `addAll`, `multAll`, and `getIndex`.

---

## Topics and Tags

- **Primary Tags:** Math, Design, Segment Tree
- **Secondary Tags:** Modular Arithmetic, Fermat's Little Theorem, Affine Transformation

---

## Detailed Algorithm Walkthrough

### 1. The Bottleneck of Naive Updates

If we directly update all elements in the sequence on each `addAll` or `multAll` operation, every such operation requires $\mathcal{O}(N)$ time. With up to $10^5$ total operations, this yields an overall time complexity of $\mathcal{O}(N^2) \approx 10^{10}$ operations, which inevitably triggers a **Time Limit Exceeded (TLE)**.

### 2. Affine Transformation Invariant

Every sequence modification on all existing elements corresponds to an **affine transformation**:
$$f(x) = (a \cdot x + b) \pmod{MOD}$$
where $MOD = 10^9 + 7$.

We maintain two global state variables:
- $a = 1$: the global multiplicative scale factor.
- $b = 0$: the global additive offset.

Whenever global updates occur:
1. **`addAll(inc)`**:
   $$(a \cdot x + b) + inc = a \cdot x + (b + inc) \pmod{MOD}$$
   Update:
   $$b \leftarrow (b + inc) \pmod{MOD}$$

2. **`multAll(m)`**:
   $$m \cdot (a \cdot x + b) = (m \cdot a) \cdot x + (m \cdot b) \pmod{MOD}$$
   Update:
   $$a \leftarrow (a \cdot m) \pmod{MOD}$$
   $$b \leftarrow (b \cdot m) \pmod{MOD}$$

Both operations run in strict $\mathcal{O}(1)$ time.

### 3. Normalizing New Elements with Modular Inverse

When a new element `val` is appended, the current global transformation is $(a, b)$. If we simply store `val`, future transformations will distort it relative to elements added before it.

Instead, we store a **base normalized value** $x_0$ such that when the current transformation $(a, b)$ is applied to $x_0$, the result equals `val`:
$$a \cdot x_0 + b \equiv val \pmod{MOD}$$
$$a \cdot x_0 \equiv val - b \pmod{MOD}$$
$$x_0 \equiv (val - b) \cdot a^{-1} \pmod{MOD}$$

Because $MOD = 10^9 + 7$ is prime and $a \not\equiv 0 \pmod{MOD}$ (since $1 \le m \le 100$), the modular multiplicative inverse $a^{-1}$ exists and is unique.

By **Fermat's Little Theorem**:
$$a^{-1} \equiv a^{MOD - 2} \pmod{MOD}$$

We compute $a^{MOD - 2} \pmod{MOD}$ via binary exponentiation in $\mathcal{O}(\log MOD)$ time ($\approx 30$ multiplications).

### 4. Querying in $\mathcal{O}(1)$

To answer `getIndex(idx)`:
- If $idx \ge \text{size}$, return $-1$.
- Otherwise, retrieve the stored normalized value $x = values[idx]$ and apply the latest global transformation:
  $$\text{result} = (a \cdot x + b) \pmod{MOD}$$

This guarantees every `getIndex` query executes in instant $\mathcal{O}(1)$ time.

---

## Complexity Analysis

- **Time Complexity:**
  - `append(val)`: $\mathcal{O}(\log MOD) \approx 30$ operations for computing the modular multiplicative inverse.
  - `addAll(inc)`: $\mathcal{O}(1)$ arithmetic updates.
  - `multAll(m)`: $\mathcal{O}(1)$ arithmetic updates.
  - `getIndex(idx)`: $\mathcal{O}(1)$ direct lookup and modular evaluation.
  - Overall time for $Q = 10^5$ operations is bounded by $\mathcal{O}(Q \log MOD)$, finishing in less than $80$ ms.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$ auxiliary memory to store the normalized base values of $N$ appended elements.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 1622 - Fancy Sequence
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.ArrayList;
import java.util.List;

class Fancy {
    private static final long MOD = 1_000_000_007L;
    private final List<Long> values;
    private long a;
    private long b;

    public Fancy() {
        this.values = new ArrayList<>();
        this.a = 1L;
        this.b = 0L;
    }

    private long power(long base, long exp) {
        long res = 1L;
        base %= MOD;
        while (exp > 0) {
            if ((exp & 1) == 1) {
                res = (res * base) % MOD;
            }
            base = (base * base) % MOD;
            exp >>= 1;
        }
        return res;
    }

    private long modInverse(long n) {
        return power(n, MOD - 2);
    }

    public void append(int val) {
        // x = (val - b) * inv(a) % MOD
        long diff = (val - b) % MOD;
        if (diff < 0) {
            diff += MOD;
        }
        long invA = modInverse(a);
        long x = (diff * invA) % MOD;
        values.add(x);
    }

    public void addAll(int inc) {
        b = (b + inc) % MOD;
    }

    public void multAll(int m) {
        a = (a * m) % MOD;
        b = (b * m) % MOD;
    }

    public int getIndex(int idx) {
        if (idx >= values.size()) {
            return -1;
        }
        return (int) ((a * values.get(idx) + b) % MOD);
    }
}
```

### Python
```python
"""
Problem: LeetCode 1622 - Fancy Sequence
Difficulty: Hard
Language: Python
Author: CodeByTushu
"""

MOD = 1_000_000_007


class Fancy:

    def __init__(self):
        self.values = []
        self.a = 1
        self.b = 0

    def append(self, val: int) -> None:
        # x = (val - b) * inv(a) % MOD
        inv_a = pow(self.a, MOD - 2, MOD)
        x = ((val - self.b) % MOD * inv_a) % MOD
        self.values.append(x)

    def addAll(self, inc: int) -> None:
        self.b = (self.b + inc) % MOD

    def multAll(self, m: int) -> None:
        self.a = (self.a * m) % MOD
        self.b = (self.b * m) % MOD

    def getIndex(self, idx: int) -> int:
        if idx >= len(self.values):
            return -1
        return (self.a * self.values[idx] + self.b) % MOD
```

### C++
```cpp
/**
 * Problem: LeetCode 1622 - Fancy Sequence
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>

using namespace std;

class Fancy {
private:
    static constexpr long long MOD = 1'000'000'007LL;
    vector<long long> values;
    long long a;
    long long b;

    long long power(long long base, long long exp) {
        long long res = 1;
        base %= MOD;
        while (exp > 0) {
            if (exp & 1) {
                res = (res * base) % MOD;
            }
            base = (base * base) % MOD;
            exp >>= 1;
        }
        return res;
    }

    long long modInverse(long long n) {
        return power(n, MOD - 2);
    }

public:
    Fancy() : a(1), b(0) {
        values.reserve(100000);
    }

    void append(int val) {
        long long diff = (val - b) % MOD;
        if (diff < 0) {
            diff += MOD;
        }
        long long invA = modInverse(a);
        values.push_back((diff * invA) % MOD);
    }

    void addAll(int inc) {
        b = (b + inc) % MOD;
    }

    void multAll(int m) {
        a = (a * m) % MOD;
        b = (b * m) % MOD;
    }

    int getIndex(int idx) {
        if (idx >= values.size()) {
            return -1;
        }
        return (a * values[idx] + b) % MOD;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 1622 - Fancy Sequence
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */

const MOD = 1000000007n;

function power(base, exp) {
    let res = 1n;
    base = base % MOD;
    while (exp > 0n) {
        if (exp & 1n) {
            res = (res * base) % MOD;
        }
        base = (base * base) % MOD;
        exp >>= 1n;
    }
    return res;
}

function modInverse(n) {
    return power(n, MOD - 2n);
}

var Fancy = function() {
    this.values = [];
    this.a = 1n;
    this.b = 0n;
};

/** 
 * @param {number} val
 * @return {void}
 */
Fancy.prototype.append = function(val) {
    let diff = (BigInt(val) - this.b) % MOD;
    if (diff < 0n) {
        diff += MOD;
    }
    let invA = modInverse(this.a);
    this.values.push((diff * invA) % MOD);
};

/** 
 * @param {number} inc
 * @return {void}
 */
Fancy.prototype.addAll = function(inc) {
    this.b = (this.b + BigInt(inc)) % MOD;
};

/** 
 * @param {number} m
 * @return {void}
 */
Fancy.prototype.multAll = function(m) {
    this.a = (this.a * BigInt(m)) % MOD;
    this.b = (this.b * BigInt(m)) % MOD;
};

/** 
 * @param {number} idx
 * @return {number}
 */
Fancy.prototype.getIndex = function(idx) {
    if (idx >= this.values.length) {
        return -1;
    }
    return Number((this.a * this.values[idx] + this.b) % MOD);
};
```
