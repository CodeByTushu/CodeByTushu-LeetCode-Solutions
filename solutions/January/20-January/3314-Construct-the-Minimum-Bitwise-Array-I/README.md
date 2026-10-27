# LeetCode 3314: Construct the Minimum Bitwise Array I

- **Publication Date:** 20 January 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/construct-the-minimum-bitwise-array-i/](https://leetcode.com/problems/construct-the-minimum-bitwise-array-i/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/2dBjS6FYcd4?si=I98AoAZQB-vLi2XR)

---

## Problem Summary

You are given an array `nums` consisting of $n$ prime integers.

You need to construct an array `ans` of length $n$, such that, for each index $i$, the bitwise OR of `ans[i]` and `ans[i] + 1` is equal to `nums[i]`:
$$\text{ans}[i] \mid (\text{ans}[i] + 1) = \text{nums}[i]$$

Additionally, you must **minimize** each value of `ans[i]` in the resulting array.

If it is not possible to find such a value for `ans[i]` that satisfies the condition, then set `ans[i] = -1`.

---

### Examples

#### Example 1:
- **Input:** `nums = [2, 3, 5, 7]`
- **Output:** `[-1, 1, 4, 3]`
- **Explanation:**
  - For $i = 0$: There is no non-negative integer $x$ such that $x \mid (x + 1) = 2$ because $x \mid (x + 1)$ is always odd. Thus, $\text{ans}[0] = -1$.
  - For $i = 1$: $1 \mid (1 + 1) = 1 \mid 2 = 3$. Smallest value is $1$.
  - For $i = 2$: $4 \mid (4 + 1) = 4 \mid 5 = 5$. Smallest value is $4$.
  - For $i = 3$: $3 \mid (3 + 1) = 3 \mid 4 = 7$. Smallest value is $3$.

#### Example 2:
- **Input:** `nums = [11, 13, 31]`
- **Output:** `[9, 12, 15]`
- **Explanation:**
  - For $i = 0$: $9 \mid (9 + 1) = 9 \mid 10 = 11$.
  - For $i = 1$: $12 \mid (12 + 1) = 12 \mid 13 = 13$.
  - For $i = 2$: $15 \mid (15 + 1) = 15 \mid 16 = 31$.

---

### Constraints

- $1 \le \text{nums.length} \le 100$
- $2 \le \text{nums}[i] \le 1000$
- $\text{nums}[i]$ is a prime number.

---

## Topics and Tags

- **Array**
- **Bit Manipulation**

---

## Approach & Intuition

### Key Mathematical & Bitwise Insights

1. **Parity Invariant:**
   - For any integer $x$:
     - If $x$ is even, $x$ has lowest bit $0$ and $x + 1$ has lowest bit $1$. Thus, $x \mid (x + 1)$ has lowest bit $1$ (odd).
     - If $x$ is odd, $x$ has lowest bit $1$. Thus, $x \mid (x + 1)$ has lowest bit $1$ (odd).
   - Therefore, $x \mid (x + 1)$ is **always an odd integer**.
   - Since $\text{nums}[i]$ is prime, the only even prime is $2$.
   - For $\text{nums}[i] = 2$, no integer $x$ can satisfy the condition, so we must set $\text{ans}[i] = -1$.

2. **Binary Representation of $x \mid (x + 1)$:**
   - Consider the binary representation of $x$. Suppose $x$ ends with $k$ trailing ones:
     $$x = \dots 0 \underbrace{1 1 \dots 1}_{k \text{ ones}}$$
   - Adding $1$ flips the lowest zero bit at index $k$ to $1$ and turns all $k$ trailing ones into zeros:
     $$x + 1 = \dots 1 \underbrace{0 0 \dots 0}_{k \text{ zeros}}$$
   - Taking their bitwise OR yields:
     $$x \mid (x + 1) = \dots 1 \underbrace{1 1 \dots 1}_{k \text{ ones}}$$
   - Notice that the operation $x \mid (x + 1)$ simply sets the lowest zero bit of $x$ to $1$.

3. **Minimizing $x$:**
   - Given an odd prime $p = \text{nums}[i]$ with trailing ones:
     $$p = \dots 0 \underbrace{1 1 \dots 1}_{k \text{ ones}}$$
   - Any $x$ that satisfies $x \mid (x + 1) = p$ can be formed by choosing any bit $b \in \{0, 1, \dots, k - 1\}$ from the contiguous trailing ones of $p$ and setting it to $0$.
   - To make $x = p - 2^b$ as **small as possible**, we must subtract the largest possible power of $2$, which corresponds to the **highest bit** in the block of trailing ones (i.e., bit $k - 1$).

4. **$\mathcal{O}(1)$ Bit-Trick to Find the Highest Trailing 1 Bit:**
   - Consider $p + 1$:
     $$p + 1 = \dots 1 \underbrace{0 0 \dots 0}_{k \text{ zeros}}$$
   - The lowest set bit of $p + 1$ is isolated via `lowbit = (p + 1) & -(p + 1)`, which equals $2^k$.
   - The highest bit in the trailing ones block of $p$ is therefore:
     $$\text{highest\_bit} = \frac{2^k}{2} = \text{lowbit} \gg 1$$
   - Thus, the minimal value is directly:
     $$\text{ans}[i] = p - (( (p + 1) \ \& \ -(p + 1) ) \gg 1)$$

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$
  - For each number in `nums`, the answer is computed using basic bitwise arithmetic in $\mathcal{O}(1)$ time.
  - Across $n$ elements, total time is strictly linear $\mathcal{O}(n) \le 100$ operations ($< 1\text{ ms}$).
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - No auxiliary space is used other than the output array.

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
