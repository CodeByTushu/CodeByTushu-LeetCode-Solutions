# LeetCode 1927: Sum Game

- **Publication Date:** 23 August 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/sum-game/](https://leetcode.com/problems/sum-game/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/vQ0iABESqvk?si=XDI-GisCWhYbkbyK)

---

## Problem Summary

Alice and Bob take turns playing a game, with **Alice starting first**.

You are given a string `num` of **even length** consisting of digits and `'?'` characters. On each turn, a player replaces a single `'?'` with any digit between `'0'` and `'9'`. The game ends when there are no more `'?'` characters remaining in `num`.

- **Bob wins** if the sum of the digits in the first half of `num` equals the sum of the digits in the second half.
- **Alice wins** if the sums are not equal.

Assuming both Alice and Bob play optimally, return `true` if Alice will win and `false` if Bob will win.

---

### Examples

#### Example 1:

- **Input:** `num = "5023"`
- **Output:** `false`
- **Explanation:**
  - There are no `'?'` marks to replace.
  - Sum of first half: $5 + 0 = 5$.
  - Sum of second half: $2 + 3 = 5$.
  - Both sums are equal, so Bob wins.

#### Example 2:

- **Input:** `num = "25??"`
- **Output:** `true`
- **Explanation:**
  - Alice replaces one `'?'` with `'9'`, making it impossible for Bob to balance the two halves.
  - Alice wins.

#### Example 3:

- **Input:** `num = "?3295???"`
- **Output:** `false`
- **Explanation:**
  - It can be proven that Bob can always match Alice's moves by picking complementary digits summing to $9$.
  - Bob always wins.

---

### Constraints

- $2 \le \text{num.length} \le 10^5$
- `num.length` is even.
- `num` consists only of digits `'0'`–`'9'` and `'?'`.

---

## Topics and Tags

- **Math**
- **Greedy**
- **Game Theory**
- **String**

---

## Intuition and Approach

### 1. Parity of Question Marks:
Let $q_1$ and $q_2$ denote the number of `'?'` marks in the first and second halves, respectively, and let $\text{sum}_1$ and $\text{sum}_2$ denote their respective known digit sums.
- If the total number of question marks $q_1 + q_2$ is **odd**, Alice has the last move.
  - No matter what sum Bob achieves, on her final move Alice can select any digit from $0$ to $9$.
  - At most one digit makes the two halves equal, so Alice simply chooses any of the other 9 digits to ensure inequality.
  - Therefore, if $(q_1 + q_2) \pmod 2 == 1$, **Alice always wins (`true`)**.

### 2. Symmetrical Pairing and the Complementary Strategy (Sum of 9):
When $q_1 + q_2$ is **even**, Bob plays second and has the final move.
- Whenever Alice plays a digit $d$ in a question mark pair on one side, Bob can respond by playing $9 - d$ in the matched question mark on the same side, guaranteeing that every pair of turns on the same side contributes exactly $9$ to that side's sum.
- If there are question marks on both sides, Bob can mirror Alice's placements to maintain parity.
- Thus, the net imbalance of question marks between the two sides is $\Delta q = q_1 - q_2$.
- Because turns alternate, Bob controls the completion of each of the $|\Delta q| / 2$ pairs. Each pair will contribute $9$.
- To make the sums equal, the difference in known digit sums $\text{diff} = \text{sum}_1 - \text{sum}_2$ must be perfectly offset by the question mark contribution:
  $$\text{finalDiff} = (\text{sum}_1 - \text{sum}_2) + \frac{9 \cdot (q_1 - q_2)}{2} = 0$$
- If $\text{finalDiff} == 0$, Bob can force a tie; otherwise, Alice can force unequal sums and win.

---

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N)$
  - A single linear scan through the string of length $N$ to compute sums and count question marks.
  - Constant-time arithmetic comparison at the end.
- **Auxiliary Space Complexity:** $\mathcal{O}(1)$
  - Requires only scalar counters.
