# LeetCode 2333: Minimum Sum of Squared Difference

- **Publication Date:** 10 October 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/minimum-sum-of-squared-difference/](https://leetcode.com/problems/minimum-sum-of-squared-difference/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/pZeFXqcBrmw?si=IGa9ALoQNbC5Z45a)

---

## Problem Summary

You are given two positive `0`-indexed integer arrays `nums1` and `nums2`, both of length `n`.

You are also given two positive integers `k1` and `k2`. You can modify any element of `nums1` by increasing or decreasing it by `1` at most `k1` times, and you can modify any element of `nums2` by increasing or decreasing it by `1` at most `k2` times.

Return the **minimum sum of squared difference** $\sum_{i=0}^{n-1} (nums1[i] - nums2[i])^2$ after applying at most `k1` operations on `nums1` and at most `k2` operations on `nums2`.

---

## Topics and Tags

- **Array**
- **Math**
- **Greedy**
- **Bucket Sort** / **Frequency Array**
- **Sorting & Counting**

---

## Approach

1. **Operation Equivalence**:
   - Modifying an element in `nums1` by $\pm 1$ or modifying an element in `nums2` by $\mp 1$ has the identical net effect: reducing the absolute difference $|nums1[i] - nums2[i]|$ by $1$.
   - Hence, the total operations available can be pooled together into $k = k1 + k2$.

2. **Greedy Reduction Strategy**:
   - Because the squared function $f(x) = x^2$ grows super-linearly, decrementing a large difference yields a significantly greater reduction in the objective value than decrementing a smaller difference:
     $$(x)^2 - (x - 1)^2 = 2x - 1$$
   - Therefore, we must always greedily reduce the largest differences first.

3. **Bucket Counting Optimization**:
   - The values in `nums1` and `nums2` are bounded ($1 \le nums[i] \le 10^5$), so the maximum possible difference $M = \max(diff)$ is at most $10^5$.
   - Rather than maintaining an $\mathcal{O}(N \log N)$ max-heap or conducting binary search, we maintain a frequency bucket `count[d]` where $d$ is the difference value.
   - We scan downwards from $d = \max(diff)$ down to $1$:
     - For each value $d$, we have $\text{count}[d]$ elements.
     - The number of decrements we can apply to move them from $d$ to $d - 1$ is $\text{take} = \min(\text{count}[d], k)$.
     - We decrement $\text{count}[d]$ by $\text{take}$, increment $\text{count}[d - 1]$ by $\text{take}$, and decrease $k$ by $\text{take}$.
     - When $k = 0$, we stop early.

4. **Sum of Squares Calculation**:
   - Finally, we calculate $\sum_{d=1}^{M} \text{count}[d] \times d^2$ using 64-bit integer (`long` / `long long` / `BigInt`) to prevent arithmetic overflow.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N + M)$
  - $\mathcal{O}(N)$ to compute the initial differences $|nums1[i] - nums2[i]|$.
  - $\mathcal{O}(M)$ to traverse down the frequency bucket array from $M = \max(diff) \le 10^5$ to $1$.
  - Overall time is linear and runs in under $15\text{ ms}$, substantially outperforming heap-based solutions.
- **Auxiliary Space Complexity:** $\mathcal{O}(M)$
  - Frequency bucket array of size $M + 1 \le 100,001$ integers. Input arrays are not modified.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/pZeFXqcBrmw?si=IGa9ALoQNbC5Z45a](https://youtu.be/pZeFXqcBrmw?si=IGa9ALoQNbC5Z45a)
