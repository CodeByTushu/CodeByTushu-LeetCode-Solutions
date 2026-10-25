/**
 * Problem: LeetCode 3507 - Minimum Pair Removal to Sort Array I
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 * 
 * Simulation Approach (Greedy Adjacent Pair Collapse)
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */

#include <vector>
#include <climits>

using namespace std;

class Solution {
public:
    int minimumPairRemoval(vector<int>& nums) {
        vector<int> arr = nums;
        int ops = 0;

        while (!isNonDecreasing(arr)) {
            int minSum = INT_MAX;
            int minIdx = -1;

            // Find leftmost adjacent pair with minimum sum
            for (size_t i = 0; i + 1 < arr.size(); ++i) {
                int sum = arr[i] + arr[i + 1];
                if (sum < minSum) {
                    minSum = sum;
                    minIdx = i;
                }
            }

            // Replace the pair with their sum
            arr[minIdx] = minSum;
            arr.erase(arr.begin() + minIdx + 1);
            ops++;
        }

        return ops;
    }

private:
    bool isNonDecreasing(const vector<int>& arr) {
        for (size_t i = 0; i + 1 < arr.size(); ++i) {
            if (arr[i] > arr[i + 1]) {
                return false;
            }
        }
        return true;
    }
};
