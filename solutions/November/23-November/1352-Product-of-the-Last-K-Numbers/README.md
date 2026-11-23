# LeetCode 1352: Product of the Last K Numbers

- **Publication Date:** 23 November 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/product-of-the-last-k-numbers/](https://leetcode.com/problems/product-of-the-last-k-numbers/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/AG3BZB3_gVc)

---

## 💡 Problem Summary

Design an algorithm that accepts a stream of integers and retrieves the product of the last $k$ integers of the stream.

Implement the `ProductOfNumbers` class:
- `ProductOfNumbers()`: Initializes the object with an empty stream.
- `void add(int num)`: Appends the integer `num` to the stream.
- `int getProduct(int k)`: Returns the product of the last $k$ numbers in the current list. You can assume that the current list always has at least $k$ numbers.

The test cases are generated such that, at any time, the product of any contiguous sequence of numbers will fit into a single 32-bit integer without overflowing.

---

### 🧪 Example Walkthrough

#### Input:
```text
["ProductOfNumbers","add","add","add","add","add","getProduct","getProduct","getProduct","add","getProduct"]
[[],[3],[0],[2],[5],[4],[2],[3],[4],[8],[2]]
```

#### Output:
```text
[null,null,null,null,null,null,20,40,0,null,32]
```

#### Explanation:
```java
ProductOfNumbers productOfNumbers = new ProductOfNumbers();
productOfNumbers.add(3);        // stream: [3]
productOfNumbers.add(0);        // stream: [3, 0] -> 0 resets prefix list to [1]
productOfNumbers.add(2);        // stream: [3, 0, 2], prefix: [1, 2]
productOfNumbers.add(5);        // stream: [3, 0, 2, 5], prefix: [1, 2, 10]
productOfNumbers.add(4);        // stream: [3, 0, 2, 5, 4], prefix: [1, 2, 10, 40]
productOfNumbers.getProduct(2); // last 2 numbers: 5 * 4 = 20 (40 / 2)
productOfNumbers.getProduct(3); // last 3 numbers: 2 * 5 * 4 = 40 (40 / 1)
productOfNumbers.getProduct(4); // spans over 0 -> returns 0
productOfNumbers.add(8);        // stream: [..., 4, 8], prefix: [1, 2, 10, 40, 320]
productOfNumbers.getProduct(2); // last 2 numbers: 4 * 8 = 32 (320 / 10)
```

---

### 🔒 Constraints

- $0 \le \text{num} \le 100$
- $1 \le k \le 4 \times 10^4$
- At most $4 \times 10^4$ calls will be made to `add` and `getProduct`.
- The product of the stream at any point in time will fit in a **32-bit** integer.

---

## 🧠 Algorithmic Approach & Key Observations

### 1. Cumulative Prefix Product & Division
In standard range queries, prefix sums allow range sum calculation via $S[R] - S[L-1]$ in $\mathcal{O}(1)$ time. Similarly, cumulative products allow computing contiguous subsegment products in constant time using division:
$$\text{Product}(L \dots R) = \frac{\text{Prefix}[R]}{\text{Prefix}[L-1]}$$
For the last $k$ numbers, this simplifies to:
$$\frac{\text{Prefix}[\text{size} - 1]}{\text{Prefix}[\text{size} - 1 - k]}$$

### 2. Handling Zero: The Prefix Reset Invariant
The standard prefix product fails when a zero is added because:
1. Multiplying by $0$ makes all future products $0$.
2. Division by zero is undefined.

**Crucial Observation:**
- Any query of length $k$ that extends back far enough to encompass a $0$ will inevitably evaluate to $0$.
- Any numbers added prior to the zero can never contribute to a non-zero product for any future query.
- Therefore, whenever `num == 0` is received, we can simply **clear the prefix list** and reset it with the neutral element `[1]`.

### 3. Constant Time Retrieval (`getProduct`)
- Let $\text{size}$ be the current length of the prefix list (which starts with $1$).
- If $k \ge \text{size}$, the requested window of size $k$ spans back to or past the most recent $0$, so we immediately return $0$.
- Otherwise, no zeros are present within the last $k$ numbers, and the product is computed directly as $\text{prefix}[\text{size} - 1] / \text{prefix}[\text{size} - 1 - k]$ in $\mathcal{O}(1)$ time.

---

## ⏱️ Complexity Analysis

| Metric | Complexity | Description |
| :--- | :---: | :--- |
| **add(num) Time** | $\mathcal{O}(1)$ | Appending to a dynamic array takes amortized $\mathcal{O}(1)$ time. Clearing the list on encountering $0$ takes $\mathcal{O}(1)$ operations. |
| **getProduct(k) Time** | $\mathcal{O}(1)$ | Requires a single size check and an integer division, fulfilling the follow-up requirement strictly in worst-case constant time. |
| **Auxiliary Space** | $\mathcal{O}(N)$ | Stores running prefix products of non-zero elements since the last zero. At most $4 \times 10^4$ integers are stored ($< 200\text{ KB}$ heap memory). |

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
/**
 * Problem: LeetCode 1352 - Product of the Last K Numbers
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.ArrayList;
import java.util.List;

class ProductOfNumbers {
    private List<Integer> prefix;

    public ProductOfNumbers() {
        prefix = new ArrayList<>();
        prefix.add(1); // empty product neutral element
    }

    public void add(int num) {
        if (num == 0) {
            // 0 ke aate hi pichhle saare products useless ho jate hain, prefix list reset karo
            prefix.clear();
            prefix.add(1);
        } else {
            prefix.add(prefix.get(prefix.size() - 1) * num);
        }
    }

    public int getProduct(int k) {
        int size = prefix.size();

        // Agar k >= size hai, toh last k numbers me 0 include ho chuka hai
        if (k >= size) return 0;

        return prefix.get(size - 1) / prefix.get(size - 1 - k);
    }
}
```

### 🐍 Python (Python 3)
```python
"""
Problem: LeetCode 1352 - Product of the Last K Numbers
Difficulty: Medium
Language: Python 3
Author: CodeByTushu
"""
class ProductOfNumbers:
    def __init__(self):
        # prefix[0] = 1 represents neutral multiplier for empty sequence
        self.prefix = [1]

    def add(self, num: int) -> None:
        if num == 0:
            # 0 encountered, previous elements will never form positive prefix products
            self.prefix = [1]
        else:
            self.prefix.append(self.prefix[-1] * num)

    def getProduct(self, k: int) -> int:
        # If k >= len(self.prefix), the window of last k elements includes a 0
        if k >= len(self.prefix):
            return 0
        return self.prefix[-1] // self.prefix[-1 - k]
```

### ⚡ C++ (C++20)
```cpp
/**
 * Problem: LeetCode 1352 - Product of the Last K Numbers
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>

using namespace std;

class ProductOfNumbers {
private:
    vector<int> prefix;

public:
    ProductOfNumbers() {
        prefix.push_back(1);
    }

    void add(int num) {
        if (num == 0) {
            // Reset prefix array on encountering 0
            prefix.clear();
            prefix.push_back(1);
        } else {
            prefix.push_back(prefix.back() * num);
        }
    }

    int getProduct(int k) {
        int n = prefix.size();
        if (k >= n) return 0;
        return prefix.back() / prefix[n - 1 - k];
    }
};
```

### 🌐 JavaScript (Node.js ES2022)
```javascript
/**
 * Problem: LeetCode 1352 - Product of the Last K Numbers
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */
var ProductOfNumbers = function() {
    this.prefix = [1];
};

/** 
 * @param {number} num
 * @return {void}
 */
ProductOfNumbers.prototype.add = function(num) {
    if (num === 0) {
        // Reset prefix array on encountering 0
        this.prefix = [1];
    } else {
        this.prefix.push(this.prefix[this.prefix.length - 1] * num);
    }
};

/** 
 * @param {number} k
 * @return {number}
 */
ProductOfNumbers.prototype.getProduct = function(k) {
    const size = this.prefix.length;
    if (k >= size) return 0;
    return Math.floor(this.prefix[size - 1] / this.prefix[size - 1 - k]);
};
```
