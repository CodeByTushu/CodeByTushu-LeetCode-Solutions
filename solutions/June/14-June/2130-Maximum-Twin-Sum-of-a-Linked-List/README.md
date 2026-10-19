# LeetCode 2130: Maximum Twin Sum of a Linked List

- **Publication Date:** 14 June 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/](https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/an7c2jBXsF0?si=SBXUlKSEHdvE-dco)

---

## Problem Summary

In a linked list of size $n$, where $n$ is **even**, the $i$-th node ($0$-indexed) of the linked list is known as the **twin** of the $(n - 1 - i)$-th node, for $0 \le i \le (n / 2) - 1$.

- For example, if $n = 4$, then node $0$ is the twin of node $3$, and node $1$ is the twin of node $2$. These are the only pairs with twins for $n = 4$.

The **twin sum** is defined as the sum of a node and its twin.

Given the `head` of a linked list with even length, return the **maximum twin sum** of the linked list.

---

### Examples

#### Example 1:
- **Input:** `head = [5, 4, 2, 1]`
- **Output:** `6`
- **Explanation:**
  - Node $0$ (value $5$) and Node $3$ (value $1$) are twins: $\text{sum} = 5 + 1 = 6$.
  - Node $1$ (value $4$) and Node $2$ (value $2$) are twins: $\text{sum} = 4 + 2 = 6$.
  - The maximum twin sum is $\max(6, 6) = 6$.

#### Example 2:
- **Input:** `head = [4, 2, 2, 3]`
- **Output:** `7`
- **Explanation:**
  - Node $0$ and Node $3$ have twin sum $4 + 3 = 7$.
  - Node $1$ and Node $2$ have twin sum $2 + 2 = 4$.
  - The maximum twin sum is $\max(7, 4) = 7$.

---

### Constraints

- The number of nodes in the list is an even integer in the range $[2, 10^5]$.
- $1 \le \text{Node.val} \le 10^5$

---

## Algorithmic Approach

### In-Place $\mathcal{O}(N)$ Time & $\mathcal{O}(1)$ Auxiliary Space

While we could store all node values into an array or stack to easily pair twin elements, that would require $\mathcal{O}(N)$ extra memory. We can achieve $\mathcal{O}(1)$ auxiliary space by modifying the list pointers in-place through three classical linked-list operations:

### 1. Find the Middle of the Linked List
Use the **Fast and Slow Pointer** (Tortoise and Hare) technique:
- Initialize `slow = head` and `fast = head`.
- Move `slow` by $1$ step and `fast` by $2$ steps while `fast != null && fast.next != null`.
- Since the total length $n$ is guaranteed to be even, when `fast` reaches the end (`null`), `slow` will be positioned exactly at the head of the second half of the list (index $n / 2$).

### 2. Reverse the Second Half
Reverse the sublist starting from `slow` in-place:
- Maintain three pointers: `prev = null`, `curr = slow`, and `next`.
- In each iteration, redirect `curr.next` to `prev`, advance `prev` to `curr`, and move `curr` to `next`.
- Upon termination, `prev` will be pointing to the head of the reversed second half (which was originally the tail node at index $n - 1$).

### 3. Compare Twins and Track Maximum Twin Sum
Now, compare elements from both halves:
- Initialize `first = head` and `second = prev`.
- Advance both pointers simultaneously one node at a time.
- At each step, compute $\text{first.val} + \text{second.val}$ and update the running maximum `ans`.
- When `second` becomes `null`, all $n / 2$ twin pairs have been inspected.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N)$ | Finding the middle takes $N / 2$ steps. Reversing the second half takes $N / 2$ steps. Iterating through both halves takes $N / 2$ steps. Overall time is strictly linear $\mathcal{O}(N)$. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | All pointer manipulations and reversals are done in-place without allocating any extra nodes, arrays, or auxiliary data structures. |

---

## Multi-Language Implementations

### Java
```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public int pairSum(ListNode head) {
        // Find middle
        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        // Reverse second half
        ListNode prev = null;
        while (slow != null) {
            ListNode next = slow.next;
            slow.next = prev;
            prev = slow;
            slow = next;
        }
        // Calculate maximum twin sum
        int ans = 0;
        ListNode first = head;
        ListNode second = prev;

        while (second != null) {
            ans = Math.max(ans, first.val + second.val);
            first = first.next;
            second = second.next;
        }
        return ans;
    }
}
```

### Python
```python
from typing import Optional

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def pairSum(self, head: Optional[ListNode]) -> int:
        # Find middle using slow and fast pointers
        slow = head
        fast = head

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        # Reverse second half of the linked list
        prev = None
        curr = slow
        while curr:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node

        # Calculate maximum twin sum
        ans = 0
        first = head
        second = prev

        while second:
            ans = max(ans, first.val + second.val)
            first = first.next
            second = second.next

        return ans
```

### C++
```cpp
#include <algorithm>

using namespace std;

// Definition for singly-linked list.
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

class Solution {
public:
    int pairSum(ListNode* head) {
        // Find middle
        ListNode* slow = head;
        ListNode* fast = head;

        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
        }

        // Reverse second half
        ListNode* prev = nullptr;
        ListNode* curr = slow;
        while (curr != nullptr) {
            ListNode* nextNode = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextNode;
        }

        // Calculate maximum twin sum
        int ans = 0;
        ListNode* first = head;
        ListNode* second = prev;

        while (second != nullptr) {
            ans = max(ans, first->val + second->val);
            first = first->next;
            second = second->next;
        }

        return ans;
    }
};
```

### JavaScript
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number}
 */
var pairSum = function(head) {
    // Find middle
    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // Reverse second half
    let prev = null;
    let curr = slow;
    while (curr !== null) {
        let nextNode = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextNode;
    }

    // Calculate maximum twin sum
    let ans = 0;
    let first = head;
    let second = prev;

    while (second !== null) {
        ans = Math.max(ans, first.val + second.val);
        first = first.next;
        second = second.next;
    }

    return ans;
};
```
