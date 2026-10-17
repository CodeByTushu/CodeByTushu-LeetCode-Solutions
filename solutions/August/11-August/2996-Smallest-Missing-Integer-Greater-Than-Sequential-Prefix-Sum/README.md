# LeetCode 2996: Smallest Missing Integer Greater Than Sequential Prefix Sum

- **Publication Date:** 11 August 2026
- **Difficulty:** Easy
- **Problem Link:** [https://leetcode.com/problems/smallest-missing-integer-greater-than-sequential-prefix-sum/](https://leetcode.com/problems/smallest-missing-integer-greater-than-sequential-prefix-sum/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/B46sB6XHfLQ?si=lsCDtikQl0QXDpzD)

---

## Problem Summary

You are given a **0-indexed** array of integers `nums`.

A prefix `nums[0..i]` is **sequential** if, for all $1 \le j \le i$, $\text{nums}[j] = \text{nums}[j - 1] + 1$. In particular, the prefix consisting only of `nums[0]` is sequential.

Return the **smallest integer** $x$ missing from `nums` such that $x$ is greater than or equal to the sum of the longest sequential prefix.

---

### Examples

#### Example 1:

- **Input:** `nums = [1,2,3,2,5]`
- **Output:** `6`
- **Explanation:**
  - The longest sequential prefix of `nums` is `[1, 2, 3]` with a sum of $1 + 2 + 3 = 6$.
  - $6$ is not present in `nums`.
  - Therefore, $6$ is the smallest missing integer greater than or equal to the sum of the longest sequential prefix.

#### Example 2:

- **Input:** `nums = [3,4,5,1,12,14,13]`
- **Output:** `15`
- **Explanation:**
  - The longest sequential prefix of `nums` is `[3, 4, 5]` with a sum of $3 + 4 + 5 = 12$.
  - $12, 13,$ and $14$ belong to `nums`, while $15$ does not.
  - Therefore, $15$ is the smallest missing integer greater than or equal to the sequential prefix sum.

---

### Constraints

- $1 \le \text{nums.length} \le 50$
- $1 \le \text{nums}[i] \le 50$

---

## Topics and Tags

- **Array**
- **Hash Table**
- **Sorting**
- **Prefix Sum**

---

## Intuition and Approach

### 1. Identify the Longest Sequential Prefix:
- By definition, the prefix starts at index $0$ with value `nums[0]`.
- We initialize `sum = nums[0]` and iterate $i$ from $1$ onward.
- While $i < n$ and $\text{nums}[i] == \text{nums}[i - 1] + 1$:
  - Add $\text{nums}[i]$ to `sum`.
  - Increment $i$.
- As soon as $\text{nums}[i] \ne \text{nums}[i - 1] + 1$ or the end of the array is reached, the longest sequential prefix has concluded.

### 2. Search for the Smallest Missing Integer $\ge \text{sum}$:
- Insert all elements of `nums` into a hash set for $\mathcal{O}(1)$ average lookup time.
- Starting from `sum`, we verify whether `sum` is contained in the set:
  - If `set.contains(sum)`, we increment `sum++`.
  - We repeat until `sum` is no longer in the set.
- The first value of `sum` not in `nums` satisfies both conditions:
  1. It is $\ge$ the initial sequential prefix sum.
  2. It does not exist in `nums`.
  3. It is the minimum such integer.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - Scanning the sequential prefix takes at most $N$ steps.
  - Constructing the hash set takes $\mathcal{O}(N)$ time.
  - The search loop increments `sum` at most $N$ times since there are at most $N$ distinct values in the array.
  - Overall time complexity is linear $\mathcal{O}(N)$, running in $< 1\text{ ms}$ for $N \le 50$.
- **Auxiliary Space Complexity:** $\mathcal{O}(N)$
  - A hash set stores up to $N$ unique elements from `nums`.

---

## Solutions

- [☕ Java Solution (`Solution.java`)](./Solution.java)
- [🐍 Python Solution (`solution.py`)](./solution.py)
- [⚡ C++ Solution (`solution.cpp`)](./solution.cpp)
- [🌐 JavaScript Solution (`solution.js`)](./solution.js)
