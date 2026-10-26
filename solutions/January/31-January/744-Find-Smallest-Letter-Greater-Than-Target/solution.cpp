/**
 * Problem: LeetCode 744 - Find Smallest Letter Greater Than Target
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 * 
 * Binary Search (Upper Bound)
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */

#include <vector>

using namespace std;

class Solution {
public:
    char nextGreatestLetter(vector<char>& letters, char target) {
        int left = 0;
        int right = letters.size();

        while (left < right) {
            int mid = left + (right - left) / 2;
            if (letters[mid] <= target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return letters[left % letters.size()];
    }
};
