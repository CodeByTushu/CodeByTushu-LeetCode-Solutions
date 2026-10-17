# LeetCode 2958: Length of Longest Subarray With at Most K Frequency

- **Publication Date:** 12 August 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/length-of-longest-subarray-with-at-most-k-frequency/](https://leetcode.com/problems/length-of-longest-subarray-with-at-most-k-frequency/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/XymP0XzPwng?si=6vNOYD09gMIil917)

---

## Problem Summary

You are given an integer array `nums` and an integer `k`.

The **frequency** of an element `x` is the number of times it occurs in an array.

An array is called **good** if the frequency of each element in this array is **less than or equal to** `k`.

Return the length of the **longest good subarray** of `nums`.

A **subarray** is a contiguous non-empty sequence of elements within an array.

---

### Examples

#### Example 1:

- **Input:** `nums = [1,2,3,1,2,3,1,2], k = 2`
- **Output:** `6`
- **Explanation:** The longest possible good subarray is `[1,2,3,1,2,3]` since the values $1, 2,$ and $3$ occur at most twice in this subarray. Note that the subarrays `[2,3,1,2,3,1]` and `[3,1,2,3,1,2]` are also good. There is no good subarray with length greater than $6$.

#### Example 2:

- **Input:** `nums = [1,2,1,2,1,2,1,2], k = 1`
- **Output:** `2`
- **Explanation:** The longest possible good subarray is `[1,2]` since the values $1$ and $2$ occur at most once in this subarray. Note that `[2,1]` is also good. There is no good subarray with length greater than $2$.

#### Example 3:

- **Input:** `nums = [5,5,5,5,5,5,5], k = 4`
- **Output:** `4`
- **Explanation:** The longest possible good subarray is `[5,5,5,5]` since the value $5$ occurs $4$ times in this subarray.

---

### Constraints

- $1 \le \text{nums.length} \le 10^5$
- $1 \le \text{nums}[i] \le 10^9$
- $1 \le k \le \text{nums.length}$

---

## Topics and Tags

- **Array**
- **Hash Table**
- **Sliding Window**

---

## Intuition and Approach

### Sliding Window Technique:
A subarray is contiguous, so we can naturally use a dynamic **sliding window** defined by two pointers, `left` and `right`:
1. Expand the window by advancing `right` across the array and updating the frequency of `nums[right]` in a hash table `freq`.
2. Notice that after adding `nums[right]`, the only element whose frequency might exceed $k$ is `nums[right]` itself.
3. If `freq[nums[right]] > k`, the current window `[left, right]` is invalid.
   - Shrink the window from the left by decrementing `freq[nums[left]]` and incrementing `left++`.
   - Continue until the count of `nums[right]` is restored to $\le k$.
4. Once the window is valid, its length is `right - left + 1`. We update our running maximum length:
   $$\text{maxLen} = \max(\text{maxLen}, \text{right} - \text{left} + 1)$$

Because both `left` and `right` traverse the array at most once, the total time remains linear $\mathcal{O}(N)$.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - The pointer `right` iterates from $0$ to $N - 1$.
  - The pointer `left` only increments and never resets, moving at most $N$ times across the entire algorithm.
  - Each hash table insertion and lookup takes $\mathcal{O}(1)$ average time.
  - Overall time complexity is $\mathcal{O}(N)$, completing well within 50 ms for $N = 10^5$.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - A hash map stores counts of distinct values currently within the sliding window, bounded by $\min(N, \text{distinct values})$.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
