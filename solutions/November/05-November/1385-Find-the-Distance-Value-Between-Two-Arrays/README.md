# LeetCode 1385: Find the Distance Value Between Two Arrays

- **Publication Date:** 05 November 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/find-the-distance-value-between-two-arrays/](https://leetcode.com/problems/find-the-distance-value-between-two-arrays/)
- **YouTube Solution:** [Watch Full Walkthrough on YouTube](https://youtu.be/EnEvmrJEwbU?si=5r5MGOWMA3xdMqrM)

---

## 💡 Problem Summary

Given two integer arrays `arr1` and `arr2`, and the integer `d`, return the *distance value* between the two arrays.

The **distance value** is defined as the number of elements `arr1[i]` such that there is **not any** element `arr2[j]` where `|arr1[i] - arr2[j]| <= d`.

---

### 🧪 Examples

#### Example 1:
- **Input:** `arr1 = [4,5,8], arr2 = [10,9,1,8], d = 2`
- **Output:** `2`
- **Explanation:**
  - For `arr1[0] = 4`:
    - $|4 - 10| = 6 > 2$
    - $|4 - 9| = 5 > 2$
    - $|4 - 1| = 3 > 2$
    - $|4 - 8| = 4 > 2$
    - No element in `arr2` is within distance 2 $\implies$ Valid!
  - For `arr1[1] = 5`:
    - $|5 - 10| = 5 > 2$
    - $|5 - 9| = 4 > 2$
    - $|5 - 1| = 4 > 2$
    - $|5 - 8| = 3 > 2$
    - No element in `arr2` is within distance 2 $\implies$ Valid!
  - For `arr1[2] = 8`:
    - $|8 - 10| = 2 \le 2$ (Violates distance threshold! Stop checking).
  - Total valid elements = **2**.

#### Example 2:
- **Input:** `arr1 = [1,4,2,3], arr2 = [-4,-3,6,10,20,30], d = 3`
- **Output:** `2`

#### Example 3:
- **Input:** `arr1 = [2,1,100,3], arr2 = [-5,-2,10,-3,7], d = 6`
- **Output:** `1`

---

### 🔒 Constraints

- `1 <= arr1.length, arr2.length <= 500`
- `-1000 <= arr1[i], arr2[j] <= 1000`
- `0 <= d <= 100`

---

## 🧠 Algorithmic Approach & Key Observations

### 1. The Interval Exclusion Principle
The condition that $|a - b| \le d$ can be algebraically rewritten as:
$$a - d \le b \le a + d$$
This means an element $a \in \text{arr1}$ is considered **valid** if and only if **no element in $\text{arr2}$ falls within the closed interval $[a - d, a + d]$**.

### 2. Early-Exit Pruning
Instead of checking all pairs $(a, b)$, we iterate through each element $a \in \text{arr1}$ and scan elements $b \in \text{arr2}$:
- The moment we encounter any $b$ such that $|a - b| \le d$, we immediately mark $a$ as invalid (`ok = false`) and `break` the inner loop early.
- If the inner loop finishes without finding any violating element, we increment our valid counter `count++`.
- Given $N, M \le 500$, the maximum possible comparisons is $500 \times 500 = 250,000$, which executes in less than 4 ms and beats over 74% of solutions on LeetCode.

### 3. Alternative Binary Search Approach
Alternatively, one could sort `arr2` in $\mathcal{O}(M \log M)$ time, then for each element $a \in \text{arr1}$, use binary search (`lower_bound`) to find the first element in `arr2` that is $\ge a - d$. If that element is $\le a + d$, then $a$ is invalid.
However, because $N, M \le 500$, the linear scan with early break is simpler, requires zero memory overhead, and has exceptional cache locality.

---

## 📊 Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N \cdot M)$ worst case, $\mathcal{O}(N)$ best/average case
  - Outer loop runs $N = \text{arr1.length}$ times.
  - Inner loop checks at most $M = \text{arr2.length}$ elements, breaking immediately upon finding the first violating element.
  - At most $500 \times 500 = 250,000$ operations in the absolute worst case.
- **Space Complexity:** $\mathcal{O}(1)$ strictly constant auxiliary space
  - Only uses scalar primitive variables (`count`, `ok`, `a`, `b`).
  - Operates directly in-place with zero heap allocations.

---

## 💻 Multi-Language Source Code

### ☕ Java (JDK 17)
```java
class Solution {
    public int findTheDistanceValue(int[] arr1, int[] arr2, int d) {
        int count = 0;

        for (int a : arr1) {
            boolean ok = true;
            for (int b : arr2) {
                if (Math.abs(a - b) <= d) {
                    ok = false;
                    break;
                }
            }
            if (ok) count++;
        }

        return count;
    }
}
```

### 🐍 Python (Python 3)
```python
class Solution:
    def findTheDistanceValue(self, arr1: list[int], arr2: list[int], d: int) -> int:
        count = 0
        for a in arr1:
            ok = True
            for b in arr2:
                if abs(a - b) <= d:
                    ok = False
                    break
            if ok:
                count += 1
        return count
```

### ⚡ C++ (C++20)
```cpp
#include <vector>
#include <cmath>

using namespace std;

class Solution {
public:
    int findTheDistanceValue(vector<int>& arr1, vector<int>& arr2, int d) {
        int count = 0;

        for (int a : arr1) {
            boolean ok = true;
            for (int b : arr2) {
                if (abs(a - b) <= d) {
                    ok = false;
                    break;
                }
            }
            if (ok) count++;
        }

        return count;
    }
};
```

### 🌐 JavaScript (Node.js ES2022)
```javascript
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @param {number} d
 * @return {number}
 */
var findTheDistanceValue = function(arr1, arr2, d) {
    let count = 0;

    for (const a of arr1) {
        let ok = true;
        for (const b of arr2) {
            if (Math.abs(a - b) <= d) {
                ok = false;
                break;
            }
        }
        if (ok) count++;
    }

    return count;
};
```

---

<p align="center">
  <a href="../../README.md"><strong>⬅️ Return to November Solutions</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="https://codebytushu.com/Leetcode/"><strong>🌐 Official Live Platform</strong></a>
</p>
