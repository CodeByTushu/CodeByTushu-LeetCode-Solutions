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
/**
 * Problem: LeetCode 61 - Rotate List
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    ListNode* rotateRight(ListNode* head, int k) {
        if (!head || !head->next || k == 0) {
            return head;
        }

        // Step 1: Find length and tail
        int len = 1;
        ListNode* tail = head;
        while (tail->next != nullptr) {
            tail = tail->next;
            len++;
        }

        // Step 2: Normalize k
        k = k % len;
        if (k == 0) {
            return head;
        }

        // Step 3: Form circular list
        tail->next = head;

        // Step 4: Find new tail
        int stepsToNewTail = len - k;
        ListNode* newTail = tail;
        for (int i = 0; i < stepsToNewTail; i++) {
            newTail = newTail->next;
        }

        // Step 5: Disconnect circular list
        ListNode* newHead = newTail->next;
        newTail->next = nullptr;

        return newHead;
    }
};
