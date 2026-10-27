# LeetCode 3315: Construct the Minimum Bitwise Array II

- **Publication Date:** 21 January 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/construct-the-minimum-bitwise-array-ii/](https://leetcode.com/problems/construct-the-minimum-bitwise-array-ii/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/KY2m8zRKHuI?si=2FjvhfJHJsK8n_qt)

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
- $2 \le \text{nums}[i] \le 10^9$
- $\text{nums}[i]$ is a prime number.

---

## Topics and Tags

- **Array**
- **Bit Manipulation**

---

## Approach & Intuition

### Key Mathematical & Bitwise Insights

1. **Why Linear Search Fails:**
   - In Part I (LeetCode 3314), $\text{nums}[i] \le 1000$, which allowed testing candidates linearly.
   - Here in Part II, $\text{nums}[i] \le 10^9$, rendering any linear or brute-force search hopelessly slow ($10^9$ iterations would cause Time Limit Exceeded).
   - An exact, closed-form $\mathcal{O}(1)$ bitwise mathematical solution is required.

2. **Parity Invariant:**
   - For any integer $x$:
     - If $x$ is even, $x$ ends with bit $0$ and $x + 1$ ends with bit $1$. Hence $x \mid (x + 1)$ ends with bit $1$ (odd).
     - If $x$ is odd, $x$ ends with bit $1$. Hence $x \mid (x + 1)$ ends with bit $1$ (odd).
   - Therefore, $x \mid (x + 1)$ is **strictly odd** for all integers $x \ge 0$.
   - Since $\text{nums}[i]$ is prime, the only even prime is $2$.
   - For $\text{nums}[i] = 2$, no integer $x$ exists, requiring $\text{ans}[i] = -1$.

3. **Bitwise Transitions Under $x + 1$:**
   - Suppose $x$ has $k$ trailing ones in binary:
     $$x = \dots 0 \underbrace{1 1 \dots 1}_{k \text{ ones}}$$
   - Adding $1$ changes the lowest zero bit (at index $k$) to $1$ and resets all $k$ trailing ones to zero:
     $$x + 1 = \dots 1 \underbrace{0 0 \dots 0}_{k \text{ zeros}}$$
   - Computing bitwise OR:
     $$x \mid (x + 1) = \dots 1 \underbrace{1 1 \dots 1}_{k \text{ ones}}$$
   - The operation $x \mid (x + 1)$ leaves all higher bits unchanged, keeps all trailing ones set to $1$, and sets the lowest zero bit of $x$ to $1$.

4. **Constructing the Minimal $x$ in $\mathcal{O}(1)$:**
   - Given an odd prime $p = \text{nums}[i]$, its binary representation ends with a block of $k$ trailing ones:
     $$p = \dots 0 \underbrace{1 1 \dots 1}_{k \text{ ones}}$$
   - Any valid $x$ satisfying $x \mid (x + 1) = p$ must be formed by clearing exactly one bit from this trailing ones block of $p$.
   - To **minimize** $x = p - 2^b$, we must subtract the largest valid power of $2$, which is the **highest set bit** in the trailing ones block (bit $k - 1$).
   - Notice that $p + 1$ has its lowest set bit at index $k$ ($2^k$). We isolate it in $\mathcal{O}(1)$ via:
     $$\text{lowbit} = (p + 1) \ \& \ -(p + 1)$$
   - The bit to subtract is simply half of that lowest set bit:
     $$\text{highest\_trailing\_bit} = \text{lowbit} \gg 1$$
   - Thus, the minimal $x$ is:
     $$\text{ans}[i] = p - (((p + 1) \ \& \ -(p + 1)) \gg 1)$$

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(n)$
  - For each element in `nums`, the solution executes bitwise operations in strictly $\mathcal{O}(1)$ time.
  - With $n \le 100$ and $nums[i] \le 10^9$, total runtime is less than $1\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - No additional data structures are allocated beyond the returned array.

---

## Source Code Implementations

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
