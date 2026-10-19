# LeetCode 2095: Delete the Middle Node of a Linked List

- **Publication Date:** 15 June 2026
- **Difficulty:** Medium
- **Problem Link:** [https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/](https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/)
- **YouTube Solution:** [Watch on YouTube](https://youtu.be/b688RLBzCN4?si=DTTRzKGA5awZy8gQ)

---

## Problem Summary

You are given the `head` of a linked list. **Delete** the middle node, and return the `head` of the modified linked list.

The **middle node** of a linked list of size $n$ is the $\lfloor n / 2 \rfloor$-th node from the start using **$0$-based indexing**, where $\lfloor x \rfloor$ denotes the largest integer less than or equal to $x$.

- For $n = 1, 2, 3, 4$, and $5$, the middle nodes are indices $0, 1, 1, 2$, and $2$, respectively.

---

### Examples

#### Example 1:
- **Input:** `head = [1, 3, 4, 7, 1, 2, 6]`
- **Output:** `[1, 3, 4, 1, 2, 6]`
- **Explanation:**
  - $n = 7$.
  - $\lfloor 7 / 2 \rfloor = 3$.
  - Node $3$ (0-indexed) with value $7$ is the middle node.
  - After deleting node $3$, the resulting linked list is `[1, 3, 4, 1, 2, 6]`.

#### Example 2:
- **Input:** `head = [1, 2, 3, 4]`
- **Output:** `[1, 2, 4]`
- **Explanation:**
  - $n = 4$.
  - $\lfloor 4 / 2 \rfloor = 2$.
  - Node $2$ with value $3$ is the middle node.
  - After deleting node $2$, the resulting linked list is `[1, 2, 4]`.

#### Example 3:
- **Input:** `head = [2, 1]`
- **Output:** `[2]`
- **Explanation:**
  - $n = 2$.
  - $\lfloor 2 / 2 \rfloor = 1$.
  - Node $1$ with value $1$ is deleted, leaving `[2]`.

---

### Constraints

- The number of nodes in the list is in the range $[1, 10^5]$.
- $1 \le \text{Node.val} \le 10^5$

---

## Algorithmic Approach

### Two Pointers: Fast and Slow (Tortoise and Hare)

The standard technique to locate the midpoint of a singly linked list in a single pass without computing its length first is using two pointers moving at different speeds:

1. **Edge Case (Single Node or Empty List):**
   - If `head == null || head.next == null`, the list contains at most $1$ node.
   - Deleting the only node results in an empty list, so we immediately return `null`.

2. **Pointer Initialization:**
   - `slow = head`: Moves $1$ node per step.
   - `fast = head`: Moves $2$ nodes per step.
   - `prev = null`: Tracks the node immediately preceding `slow`.

3. **Traverse the List:**
   - Loop condition: `fast != null && fast.next != null`.
   - In each step:
     - Set `prev = slow`.
     - Advance `slow = slow.next`.
     - Advance `fast = fast.next.next`.
   - When the loop concludes, `fast` has traversed the entire list, and `slow` points precisely to index $\lfloor n / 2 \rfloor$, with `prev` pointing to index $\lfloor n / 2 \rfloor - 1$.

4. **Node Deletion:**
   - Unlink the middle node by updating `prev.next = slow.next`.
   - Return `head`.

---

## Complexity Analysis

| Metric | Complexity | Rationale |
| :--- | :---: | :--- |
| **Time Complexity** | $\mathcal{O}(N)$ | The fast pointer advances two steps per iteration, traversing at most $N$ nodes in $N / 2$ iterations. Single-pass linear time. |
| **Auxiliary Space** | $\mathcal{O}(1)$ | Only three pointer references (`slow`, `fast`, `prev`) are maintained. Zero extra memory allocated. |

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
    public ListNode deleteMiddle(ListNode head) {
       // If there is only one node
        if (head == null || head.next == null) {
            return null;
        }

        ListNode slow = head;
        ListNode fast = head;
        ListNode prev = null;

        // Find the middle node
        while (fast != null && fast.next != null) {
            prev = slow;
            slow = slow.next;
            fast = fast.next.next;
        }

        // Delete the middle node
        prev.next = slow.next;

        return head; 
    }
}
```

### Python
```python
from typing import Optional


# Definition for singly-linked list.
class ListNode:
    def __init__(self, val: int = 0, next: Optional["ListNode"] = None):
        self.val = val
        self.next = next


class Solution:
    def deleteMiddle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # If there is only one node
        if head is None or head.next is None:
            return None

        slow: Optional[ListNode] = head
        fast: Optional[ListNode] = head
        prev: Optional[ListNode] = None

        # Find the middle node
        while fast is not None and fast.next is not None:
            prev = slow
            slow = slow.next
            fast = fast.next.next

        # Delete the middle node
        if prev is not None and slow is not None:
            prev.next = slow.next

        return head
```

### C++
```cpp
#include <iostream>

using namespace std;

/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* deleteMiddle(ListNode* head) {
        // If there is only one node
        if (head == nullptr || head->next == nullptr) {
            return nullptr;
        }

        ListNode* slow = head;
        ListNode* fast = head;
        ListNode* prev = nullptr;

        // Find the middle node
        while (fast != nullptr && fast->next != nullptr) {
            prev = slow;
            slow = slow->next;
            fast = fast->next->next;
        }

        // Delete the middle node
        prev->next = slow->next;

        return head;
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
 * @return {ListNode}
 */
var deleteMiddle = function(head) {
    // If there is only one node
    if (head === null || head.next === null) {
        return null;
    }

    let slow = head;
    let fast = head;
    let prev = null;

    // Find the middle node
    while (fast !== null && fast.next !== null) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }

    // Delete the middle node
    prev.next = slow.next;

    return head;
};
```

---

<p align="center">
  <a href="../14-June/2130-Maximum-Twin-Sum-of-a-Linked-List/"><strong>⬅️ Previous Problem (14 June: #2130)</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../README.md"><strong>🌊 June 2026 Archive</strong></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="../../../README.md"><strong>🗂️ All Solutions Archive</strong></a>
</p>
