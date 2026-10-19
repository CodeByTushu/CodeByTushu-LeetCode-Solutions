# LeetCode 3751: Total Waviness of Numbers in Range I

- **Publication Date:** 04 June 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/total-waviness-of-numbers-in-range-i/](https://leetcode.com/problems/total-waviness-of-numbers-in-range-i/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/wPTp66qc6W8?si=hZwaQwoPsGt7DPlY)

---

## Problem Summary

You are given two integers `num1` and `num2` representing an inclusive range `[num1, num2]`.

The **waviness** of a number is defined as the total count of its **peaks** and **valleys**:
- A digit is a **peak** if it is strictly greater than both of its immediate neighbors ($d_{i-1} < d_i > d_{i+1}$).
- A digit is a **valley** if it is strictly less than both of its immediate neighbors ($d_{i-1} > d_i < d_{i+1}$).
- The first and last digits of a number **cannot** be peaks or valleys.
- Any number with fewer than 3 digits has a waviness of `0`.

Return the **total sum of waviness** for all numbers in the range `[num1, num2]`.

---

### Examples

#### Example 1:
- **Input:** `num1 = 120`, `num2 = 130`
- **Output:** `3`
- **Explanation:**
  - In the range `[120, 130]`:
    - `120`: middle digit `2` is a peak ($1 < 2 > 0$), waviness = `1`.
    - `121`: middle digit `2` is a peak ($1 < 2 > 1$), waviness = `1`.
    - `130`: middle digit `3` is a peak ($1 < 3 > 0$), waviness = `1`.
    - All other numbers in the range have a waviness of `0`.
  - Total waviness = $1 + 1 + 1 = 3$.

#### Example 2:
- **Input:** `num1 = 1`, `num2 = 100`
- **Output:** `0`
- **Explanation:**
  - Numbers from `1` to `99` have fewer than 3 digits, so their waviness is `0`.
  - For `100`, the middle digit `0` has neighbors `1` and `0`. Since $0$ is not strictly less than both neighbors ($0 < 1$, but $0 == 0$), it is neither a peak nor a valley.
  - Total waviness = `0`.

---

### Constraints

- $1 \le \text{num1} \le \text{num2} \le 10^5$

---

## Algorithmic Approach

### 1. Direct Range Iteration
Under the given constraints where $\text{num2} \le 10^5$, the total count of integers in the range is at most $10^5$, and each number has at most $6$ digits ($d \le 6$). We can simulate the process directly for every number in the range:
1. If the number has fewer than 3 digits ($\text{length} < 3$), its waviness is immediately $0$.
2. For numbers with $\ge 3$ digits, examine each internal digit $d_i$ for $1 \le i \le \text{length} - 2$:
   - Check if $d_i$ is a peak: $(d_i > d_{i-1}) \land (d_i > d_{i+1})$.
   - Check if $d_i$ is a valley: $(d_i < d_{i-1}) \land (d_i < d_{i+1})$.
   - If either condition holds, increment the number's waviness counter.
3. Accumulate and return the sum of all individual waviness counts.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}((num2 - num1) \times d)$ | We iterate through all numbers in the interval $[num1, num2]$. For each number, digit inspection runs in $\mathcal{O}(d)$ time where $d \le 6$. For $10^5$ numbers, total operations are well under $6 \times 10^5$, executing in a few milliseconds. |
| **Auxiliary Space** | $\mathcal{O}(d)$ | Only a temporary character buffer or string slice of length $d \le 6$ is allocated per number. |

---

## Multi-Language Implementations

### Java
```java
class Solution {
    public int totalWaviness(int num1, int num2) {

        int ans = 0;

        for (int num = num1; num <= num2; num++) {
            ans += getWaviness(num);
        }

        return ans;
    }

    private int getWaviness(int num) {

        char[] digits = String.valueOf(num).toCharArray();

        if (digits.length < 3) {
            return 0;
        }

        int waviness = 0;

        for (int i = 1; i < digits.length - 1; i++) {

            if ((digits[i] > digits[i - 1] && digits[i] > digits[i + 1]) ||
                (digits[i] < digits[i - 1] && digits[i] < digits[i + 1])) {
                waviness++;
            }
        }

        return waviness;
    }
}
```

### Python
```python
class Solution:
    def totalWaviness(self, num1: int, num2: int) -> int:
        def getWaviness(num: int) -> int:
            s = str(num)
            if len(s) < 3:
                return 0

            waviness = 0
            for i in range(1, len(s) - 1):
                if (s[i] > s[i - 1] and s[i] > s[i + 1]) or (
                    s[i] < s[i - 1] and s[i] < s[i + 1]
                ):
                    waviness += 1
            return waviness

        ans = 0
        for num in range(num1, num2 + 1):
            ans += getWaviness(num)
        return ans
```

### C++
```cpp
#include <string>

using namespace std;

class Solution {
public:
    int totalWaviness(int num1, int num2) {
        int ans = 0;
        for (int num = num1; num <= num2; ++num) {
            ans += getWaviness(num);
        }
        return ans;
    }

private:
    int getWaviness(int num) {
        string s = to_string(num);
        if (s.length() < 3) {
            return 0;
        }

        int waviness = 0;
        for (size_t i = 1; i < s.length() - 1; ++i) {
            if ((s[i] > s[i - 1] && s[i] > s[i + 1]) ||
                (s[i] < s[i - 1] && s[i] < s[i + 1])) {
                waviness++;
            }
        }
        return waviness;
    }
};
```

### JavaScript
```javascript
/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var totalWaviness = function(num1, num2) {
    function getWaviness(num) {
        const s = num.toString();
        if (s.length < 3) {
            return 0;
        }

        let waviness = 0;
        for (let i = 1; i < s.length - 1; i++) {
            if ((s[i] > s[i - 1] && s[i] > s[i + 1]) ||
                (s[i] < s[i - 1] && s[i] < s[i + 1])) {
                waviness++;
            }
        }
        return waviness;
    }

    let ans = 0;
    for (let num = num1; num <= num2; num++) {
        ans += getWaviness(num);
    }
    return ans;
};
```
