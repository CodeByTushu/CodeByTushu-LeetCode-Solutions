#include <vector>

using namespace std;

/**
 * Problem: LeetCode 3875 - Construct Uniform Parity Array I
 * Language: C++ (C++17 / C++20)
 * Approach: Parity Counting & Arithmetic Analysis
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
class Solution {
public:
    bool uniformArray(vector<int>& nums1) {
        int oddCount = 0, evenCount = 0;
        for (int x : nums1) {
            if (x % 2 == 0) {
                evenCount++;
            } else {
                oddCount++;
            }
        }

        bool allEven = (oddCount == 0 || oddCount >= 2);
        bool allOdd = (evenCount == 0 || oddCount >= 1);
        return allEven || allOdd;
    }
};
