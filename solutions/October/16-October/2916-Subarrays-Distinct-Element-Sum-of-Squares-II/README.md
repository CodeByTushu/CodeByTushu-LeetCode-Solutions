# LeetCode 2916: Subarrays Distinct Element Sum of Squares II

- **Publication Date:** 16 October 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/subarrays-distinct-element-sum-of-squares-ii/](https://leetcode.com/problems/subarrays-distinct-element-sum-of-squares-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/fCsrMnIoxUU?si=HHZbINBY9Qff_bip)

---

## Problem Summary

You are given a 0-indexed integer array `nums`.

The **distinct count** of a subarray of `nums` is defined as:
- Let `nums[i..j]` be a subarray of `nums` consisting of all the indices from `i` to `j` such that `0 <= i <= j < nums.length`. Then the number of distinct values in `nums[i..j]` is called the distinct count of `nums[i..j]`.

Return the sum of the squares of distinct counts of all subarrays of `nums`.

Since the answer may be very large, return it **modulo $10^9 + 7$**.

A subarray is a contiguous **non-empty** sequence of elements within an array.

---

### Examples

#### Example 1:
- **Input:** `nums = [1,2,1]`
- **Output:** `15`
- **Explanation:**
  Six possible subarrays are:
  - `[1]`: 1 distinct value $\to 1^2 = 1$
  - `[2]`: 1 distinct value $\to 1^2 = 1$
  - `[1]`: 1 distinct value $\to 1^2 = 1$
  - `[1, 2]`: 2 distinct values $\to 2^2 = 4$
  - `[2, 1]`: 2 distinct values $\to 2^2 = 4$
  - `[1, 2, 1]`: 2 distinct values $\to 2^2 = 4$
  The total sum of squares is $1 + 1 + 1 + 4 + 4 + 4 = 15$.

#### Example 2:
- **Input:** `nums = [2,2]`
- **Output:** `3`
- **Explanation:**
  Three possible subarrays are:
  - `[2]`: 1 distinct value $\to 1^2 = 1$
  - `[2]`: 1 distinct value $\to 1^2 = 1$
  - `[2, 2]`: 1 distinct value $\to 1^2 = 1$
  The total sum of squares is $1 + 1 + 1 = 3$.

---

### Constraints

- $1 \le \text{nums.length} \le 10^5$
- $1 \le \text{nums}[i] \le 10^5$

---

## Topics and Tags

- *(Unassigned / Pending)*

---

## Approach & Intuition

1. **Expanding Right Endpoint & Transition**:
   - Let $f(i, j)$ denote the number of distinct elements in subarray $\text{nums}[i..j]$ for $0 \le i \le j$.
   - When we advance the right boundary from $j - 1$ to $j$ with current element $x = \text{nums}[j]$:
     - Let $\text{last}[x]$ be the most recent index where $x$ previously occurred (or $-1$ if not seen before).
     - For starting positions $i \in [\text{last}[x] + 1, j]$, the element $x$ is newly added, increasing the distinct count:
       $$f(i, j) = f(i, j - 1) + 1$$
     - For starting positions $i \le \text{last}[x]$, $x$ was already present in $\text{nums}[i..j]$, so $f(i, j) = f(i, j - 1)$.

2. **Segment Tree with Lazy Propagation**:
   - To maintain $a[i] = f(i, j)$ across all start indices $i \in [0, j]$, we maintain a segment tree over indices $[0, n - 1]$.
   - Each node stores:
     - $\text{sum} = \sum a[i] \pmod{10^9 + 7}$
     - $\text{sq} = \sum a[i]^2 \pmod{10^9 + 7}$
   - When adding $+v$ to an interval of length $\text{len}$:
     $$(a[i] + v)^2 = a[i]^2 + 2v \cdot a[i] + v^2$$
     Summing across the entire segment:
     $$\text{new\_sq} = (\text{sq} + 2v \cdot \text{sum} + v^2 \cdot \text{len}) \pmod{10^9 + 7}$$
     $$\text{new\_sum} = (\text{sum} + v \cdot \text{len}) \pmod{10^9 + 7}$$

3. **Incremental Query & Total Sum**:
   - For each $j$ from $0$ to $n - 1$:
     - Update the range $[\text{last}[x] + 1, j]$ with $+1$.
     - Record $\text{last}[x] = j$.
     - The root node `sq[1]` now gives $\sum_{i=0}^j f(i, j)^2 \pmod{10^9 + 7}$.
     - Add `sq[1]` to the cumulative answer modulo $10^9 + 7$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N \log N)$
  - For each of the $N$ elements, range updates in the segment tree take $\mathcal{O}(\log N)$ time.
  - Overall time is $\mathcal{O}(N \log N)$, completing in well under $0.3\text{ seconds}$ across compiled and interpreted environments.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - The segment tree arrays (`sum`, `sq`, `lazy`) require $4N$ entries.
  - Tracking $\text{last}$ occurrences uses $\mathcal{O}(\max(\text{nums}) + N)$ space.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)

---

## Video Explanation

- 🎥 **Watch the full step-by-step video solution on YouTube:** [https://youtu.be/fCsrMnIoxUU?si=HHZbINBY9Qff_bip](https://youtu.be/fCsrMnIoxUU?si=HHZbINBY9Qff_bip)

---

## Resources & Community

- 🌐 **Platform Website:** [https://codebytushu.com/](https://codebytushu.com/)
- 💻 **All LeetCode Solutions:** [https://codebytushu.com/Leetcode/](https://codebytushu.com/Leetcode/)
- 📂 **GitHub Repository:** [https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions](https://github.com/CodeByTushu/CodeByTushu-LeetCode-Solutions)
