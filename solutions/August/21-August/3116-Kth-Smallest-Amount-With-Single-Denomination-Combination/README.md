# LeetCode 3116: Kth Smallest Amount With Single Denomination Combination

- **Publication Date:** 21 August 2026
- **Difficulty:** Hard
- **Problem Link:** [https://leetcode.com/problems/kth-smallest-amount-with-single-denomination-combination/](https://leetcode.com/problems/kth-smallest-amount-with-single-denomination-combination/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/NBCDNnXg-vQ?si=h0WS-7vUmmTN3M1f)

---

## Problem Summary

You are given an integer array `coins` representing coins of different denominations and an integer `k`.

You have an infinite number of coins of each denomination. However, you are **not allowed** to combine coins of different denominations (i.e., every valid amount must be an integer multiple of some single coin in `coins`).

Return the **$k^{\text{th}}$ smallest amount** that can be made using these coins.

---

### Examples

#### Example 1:

- **Input:** `coins = [3,6,9], k = 3`
- **Output:** `9`
- **Explanation:**
  - Coin 3 produces multiples: $3, 6, 9, 12, 15, \dots$
  - Coin 6 produces multiples: $6, 12, 18, 24, \dots$
  - Coin 9 produces multiples: $9, 18, 27, 36, \dots$
  - All of the coins combined produce: $3, 6, \mathbf{9}, 12, 15, \dots$
  - The $3^{\text{rd}}$ smallest amount is $9$.

#### Example 2:

- **Input:** `coins = [5,2], k = 7`
- **Output:** `12`
- **Explanation:**
  - Coin 5 produces multiples: $5, 10, 15, 20, \dots$
  - Coin 2 produces multiples: $2, 4, 6, 8, 10, 12, 14, 15, \dots$
  - All of the coins combined produce: $2, 4, 5, 6, 8, 10, \mathbf{12}, 14, 15, \dots$
  - The $7^{\text{th}}$ smallest amount is $12$.

---

### Constraints

- $1 \le \text{coins.length} \le 15$
- $1 \le \text{coins}[i] \le 25$
- $1 \le k \le 2 \times 10^9$
- `coins` contains pairwise distinct integers.

---

## Topics and Tags

- **Array**
- **Math**
- **Binary Search**
- **Bit Manipulation**
- **Combinatorics**
- **Number Theory**

---

## Intuition and Approach

### 1. Monotonicity and Binary Search on the Answer:
An amount $x$ is valid if it is divisible by at least one coin denomination.
Let $f(x)$ denote the count of valid numbers in the range $[1, x]$.
As $x$ increases, $f(x)$ is strictly non-decreasing. This monotonic property allows us to **binary search** for the smallest $x$ such that:
$$f(x) \ge k$$

- **Lower Bound:** $lo = 1$
- **Upper Bound:** $hi = k \times \min(\text{coins}) \le 2 \times 10^9 \times 25 = 5 \times 10^{10}$

### 2. Counting Multiples via Principle of Inclusion-Exclusion (PIE):
For a chosen value $x$, how many numbers $\le x$ are divisible by at least one coin in `coins`?
By PIE:
$$f(x) = \sum_{\emptyset \ne S \subseteq \text{coins}} (-1)^{|S| - 1} \left\lfloor \frac{x}{\text{LCM}(S)} \right\rfloor$$

Since $n = \text{coins.length} \le 15$:
- There are $2^n - 1 \le 2^{15} - 1 = 32{,}767$ non-empty subsets $S$, which can be cleanly represented using bitmasks from $1$ to $(1 \ll n) - 1$.
- For each subset mask:
  - Compute the running Least Common Multiple ($\text{LCM}$) of the selected coins.
  - If at any point $\text{LCM} > x$, we can prune this subset early because $\lfloor x / \text{LCM} \rfloor = 0$.
  - If the subset size (popcount of mask) is odd, add $\lfloor x / \text{LCM} \rfloor$ to the count; if even, subtract it.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}\big(2^n \cdot n \cdot \log(k \cdot \min(\text{coins}))\big)$
  - Binary search requires $\approx \log_2(5 \times 10^{10}) \approx 36$ steps.
  - Each predicate evaluation loops through $2^n \le 32{,}768$ masks, computing LCM across at most $n \le 15$ elements with early pruning.
  - Total operations $\approx 36 \times 32{,}768 \approx 1.1 \times 10^6$, running effortlessly in under $20\text{ ms}$.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Evaluation uses only scalar registers and bitwise operations without dynamic memory allocation.
