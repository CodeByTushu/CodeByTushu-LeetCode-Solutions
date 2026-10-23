#include <vector>
#include <climits>
#include <algorithm>

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
/**
 * Problem: LeetCode 2058 - Find the Minimum and Maximum Number of Nodes Between Critical Points
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
public:
    vector<int> nodesBetweenCriticalPoints(ListNode* head) {
        vector<int> criticalPoints;
        ListNode* prev = head;
        ListNode* curr = head->next;
        int index = 1;

        while (curr->next != nullptr) {
            // Local maxima: curr > prev AND curr > next
            // Local minima: curr < prev AND curr < next
            if ((curr->val > prev->val && curr->val > curr->next->val) ||
                (curr->val < prev->val && curr->val < curr->next->val)) {
                criticalPoints.push_back(index);
            }
            prev = curr;
            curr = curr->next;
            index++;
        }

        // Fewer than 2 critical points
        if (criticalPoints.size() < 2) {
            return {-1, -1};
        }

        int minDist = INT_MAX;
        int maxDist = criticalPoints.back() - criticalPoints.front();

        // Min distance is always between consecutive critical points
        for (size_t i = 1; i < criticalPoints.size(); i++) {
            minDist = min(minDist, criticalPoints[i] - criticalPoints[i - 1]);
        }

        return {minDist, maxDist};
    }
};
