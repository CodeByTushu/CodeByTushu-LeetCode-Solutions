# LeetCode 2091: Removing Minimum and Maximum From Array

- **Publication Date:** 30 August 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/removing-minimum-and-maximum-from-array/](https://leetcode.com/problems/removing-minimum-and-maximum-from-array/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/cZKW_78Ixvk?si=7lXwUplubmuaG8mW)

---

## Problem Summary

You are given a **0-indexed** array of **distinct** integers `nums`.

There is an element in `nums` that has the lowest value and an element that has the highest value. We call them the **minimum** and **maximum** respectively. Your goal is to remove **both** these elements from the array.

A deletion is defined as either removing an element from the **front** of the array or removing an element from the **back** of the array.

Return the **minimum number of deletions** it would take to remove both the minimum and maximum element from the array.

---

### Examples

#### Example 1:

- **Input:** `nums = [2,10,7,5,4,1,8,6]`
- **Output:** `5`
- **Explanation:**
  - The minimum element in the array is `nums[5]`, which is `1`.
  - The maximum element in the array is `nums[1]`, which is `10`.
  - We can remove both the minimum and maximum by removing `2` elements from the front and `3` elements from the back.
  - This results in `2 + 3 = 5` deletions, which is the minimum number possible.

#### Example 2:

- **Input:** `nums = [0,-4,19,1,8,-2,-3,5]`
- **Output:** `3`
- **Explanation:**
  - The minimum element in the array is `nums[1]`, which is `-4`.
  - The maximum element in the array is `nums[2]`, which is `19`.
  - We can remove both the minimum and maximum by removing `3` elements from the front.
  - This results in only `3` deletions, which is the minimum number possible.

#### Example 3:

- **Input:** `nums = [101]`
- **Output:** `1`
- **Explanation:**
  - There is only one element in the array, which makes it both the minimum and maximum element.
  - We can remove it with `1` deletion.

---

### Constraints

- $1 \le \text{nums.length} \le 10^5$
- $-10^5 \le \text{nums}[i] \le 10^5$
- The integers in `nums` are **distinct**.

---

## Topics and Tags

- **Array**
- **Greedy**
- **Math**

---

## Intuition and Approach

### 1. Identifying the Positions
Since all elements in `nums` are distinct, there is exactly one minimum element and one maximum element. In a single linear scan through the array, we find their respective indices:
- Let `minIdx` be the index of the minimum element.
- Let `maxIdx` be the index of the maximum element.
- For symmetry and ease of calculation, let `left = min(minIdx, maxIdx)` and `right = max(minIdx, maxIdx)`.

### 2. Three Removal Strategies
Because we can only delete elements from either the front or the back of the array, removing both the elements at index `left` and index `right` ($0 \le left \le right < n$) can be accomplished using one of three independent strategies:
1. **Both from the Front:**
   - Delete all elements from index `0` up through `right`.
   - Total deletions: $\text{bothFront} = right + 1$.
2. **Both from the Back:**
   - Delete all elements from index `left` through index `n - 1`.
   - Total deletions: $\text{bothBack} = n - left$.
3. **Split Removal (One from Front, One from Back):**
   - Delete `left + 1` elements from the front (covering index `left`).
   - Delete `n - right` elements from the back (covering index `right`).
   - Total deletions: $\text{splitWay} = (left + 1) + (n - right)$.

### 3. Optimal Decision
Taking the minimum of these three strategies guarantees the optimal answer:
$$\text{result} = \min(\text{bothFront}, \text{bothBack}, \text{splitWay})$$

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - A single linear pass through `nums` finds both the minimum and maximum elements in $\mathcal{O}(N)$ time.
  - The arithmetic and minimum comparisons execute in $\mathcal{O}(1)$ time.
  - Total time complexity is $\mathcal{O}(N)$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Only a few scalar integer variables are allocated (`minIdx`, `maxIdx`, `left`, `right`, and strategy costs). No additional memory is required.
