# LeetCode 1356: Sort Integers by The Number of 1 Bits

- **Publication Date:** 25 February 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/sort-integers-by-the-number-of-1-bits/](https://leetcode.com/problems/sort-integers-by-the-number-of-1-bits/)
- **YouTube Solution:** *Coming Soon*

---

## Problem Summary

You are given an integer array `arr`. Sort the integers in the array in ascending order by the number of `1`'s in their binary representation. In case of two or more integers having the same number of `1`'s, sort them in ascending numerical order.

Return the array after sorting it.

---

### Examples

#### Example 1:
- **Input:** `arr = [0,1,2,3,4,5,6,7,8]`
- **Output:** `[0,1,2,4,8,3,5,6,7]`
- **Explanation:**
  - `0` has 0 set bits: `[0]`
  - `1, 2, 4, 8` all have 1 set bit: `[1, 2, 4, 8]`
  - `3, 5, 6` all have 2 set bits: `[3, 5, 6]`
  - `7` has 3 set bits: `[7]`
  - Result: `[0, 1, 2, 4, 8, 3, 5, 6, 7]`.

#### Example 2:
- **Input:** `arr = [1024,512,256,128,64,32,16,8,4,2,1]`
- **Output:** `[1,2,4,8,16,32,64,128,256,512,1024]`
- **Explanation:** All numbers have exactly 1 set bit; thus, they are sorted in regular ascending order.

---

### Constraints

- $1 \le \text{arr.length} \le 500$
- $0 \le \text{arr}[i] \le 10^4$

---

## Topics and Tags

- **Primary Tags:** Sorting, Bit Manipulation
- **Secondary Tags:** Array

---

## Detailed Algorithm Walkthrough

### 1. In-Place Value Encoding Trick

Notice the key constraint: $\text{arr}[i] \le 10^4$.
Because every element is strictly less than $10,001$, we can embed both the primary key (number of set bits) and the secondary key (original value) into a single integer:
$$\text{encoded} = \text{bitCount}(\text{arr}[i]) \times 10,001 + \text{arr}[i]$$

Why does this work?
- Since $\text{arr}[i] < 10,001$, when dividing by $10,001$:
  - The quotient represents the primary sort key: $\lfloor \text{encoded} / 10,001 \rfloor = \text{bitCount}(\text{arr}[i])$.
  - The remainder represents the secondary sort key: $\text{encoded} \pmod{10,001} = \text{arr}[i]$.
- When comparing two encoded numbers:
  - If their bit counts differ, the one with fewer bits has a strictly smaller quotient and will be placed first.
  - If their bit counts are identical, their quotients match, and regular numerical comparison naturally sorts them by their original value $\text{arr}[i]$!
- The maximum possible encoded value is $14 \times 10,001 + 10,000 = 150,014 \ll 2^{31} - 1$, preventing any integer overflow.

### 2. High-Performance In-Place Sorting

1. Transform every element in `arr`:
   $$\text{arr}[i] = \text{arr}[i] + \text{bitCount}(\text{arr}[i]) \times 10,001$$
2. Call `Arrays.sort(arr)` directly on the primitive `int[]` array. This uses dual-pivot quicksort with zero object boxing/unboxing overhead.
3. Unpack the original values:
   $$\text{arr}[i] = \text{arr}[i] \pmod{10,001}$$
4. Return `arr`.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N \log N)$, where $N = \text{arr.length} \le 500$. Computing set bits takes $\mathcal{O}(N)$ time, and primitive dual-pivot quicksort takes $\mathcal{O}(N \log N)$ time with minimal constant factors.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$. Solved completely in-place on the primitive array with zero extra memory allocation.

---

## Source Code

### Java
```java
/**
 * Problem: LeetCode 1356 - Sort Integers by The Number of 1 Bits
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
import java.util.Arrays;

class Solution {
    public int[] sortByBits(int[] arr) {
        // Since arr[i] <= 10000, we can encode the bit count into the number:
        // encoded = bitCount * 10001 + originalValue
        for (int i = 0; i < arr.length; i++) {
            arr[i] += Integer.bitCount(arr[i]) * 10001;
        }

        // Sort the primitive array directly in-place
        Arrays.sort(arr);

        // Decode the original value
        for (int i = 0; i < arr.length; i++) {
            arr[i] %= 10001;
        }

        return arr;
    }
}
```

### Python
```python
"""
Problem: LeetCode 1356 - Sort Integers by The Number of 1 Bits
Difficulty: Easy
Language: Python
Author: CodeByTushu
"""

from typing import List

class Solution:
    def sortByBits(self, arr: List[int]) -> List[int]:
        return sorted(arr, key=lambda x: (x.bit_count(), x))
```

### C++
```cpp
/**
 * Problem: LeetCode 1356 - Sort Integers by The Number of 1 Bits
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    vector<int> sortByBits(vector<int>& arr) {
        sort(arr.begin(), arr.end(), [](int a, int b) {
            int countA = __builtin_popcount(a);
            int countB = __builtin_popcount(b);
            if (countA != countB) {
                return countA < countB;
            }
            return a < b;
        });
        return arr;
    }
};
```

### JavaScript
```javascript
/**
 * Problem: LeetCode 1356 - Sort Integers by The Number of 1 Bits
 * Difficulty: Easy
 * Language: JavaScript
 * Author: CodeByTushu
 */

/**
 * @param {number[]} arr
 * @return {number[]}
 */
var sortByBits = function(arr) {
    function countBits(n) {
        let count = 0;
        while (n > 0) {
            n &= (n - 1);
            count++;
        }
        return count;
    }

    return arr.sort((a, b) => {
        const bitsA = countBits(a);
        const bitsB = countBits(b);
        if (bitsA !== bitsB) {
            return bitsA - bitsB;
        }
        return a - b;
    });
};
```
