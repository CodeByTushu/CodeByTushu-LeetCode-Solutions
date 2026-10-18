#include <vector>

using namespace std;

/**
 * Problem: LeetCode 1569 - Number of Ways to Reorder Array to Get Same BST
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
class Solution {
private:
    static constexpr long long MOD = 1000000007LL;
    vector<vector<long long>> C;

    long long ways(const vector<int>& list) {
        int size = list.size();
        if (size <= 2) return 1;
        int root = list[0];
        vector<int> left;
        vector<int> right;
        for (int i = 1; i < size; i++) {
            if (list[i] < root) left.push_back(list[i]);
            else right.push_back(list[i]);
        }
        long long res = C[size - 1][left.size()];
        res = (res * ways(left)) % MOD;
        res = (res * ways(right)) % MOD;
        return res;
    }

public:
    int numOfWays(vector<int>& nums) {
        int n = nums.size();
        C.assign(n + 1, vector<long long>(n + 1, 0));
        for (int i = 0; i <= n; i++) {
            C[i][0] = 1;
            for (int j = 1; j <= i; j++) {
                C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD;
            }
        }
        long long total = ways(nums);
        return (total - 1 + MOD) % MOD;
    }
};
