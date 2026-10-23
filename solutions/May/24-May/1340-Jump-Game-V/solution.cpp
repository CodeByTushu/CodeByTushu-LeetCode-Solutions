/**
 * Problem: LeetCode 1340 - Jump Game V
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maxJumps(vector<int>& arr, int d) {
        int n = arr.size();
        vector<int> memo(n, 0);
        int maxVisited = 0;

        for (int i = 0; i < n; ++i) {
            maxVisited = max(maxVisited, dfs(arr, d, i, memo));
        }

        return maxVisited;
    }

private:
    int dfs(const vector<int>& arr, int d, int i, vector<int>& memo) {
        if (memo[i] != 0) {
            return memo[i];
        }

        int n = arr.size();
        int res = 1;

        // Jump rightwards: i + 1, ..., i + d
        for (int j = i + 1; j <= min(i + d, n - 1); ++j) {
            if (arr[j] >= arr[i]) {
                break;
            }
            res = max(res, 1 + dfs(arr, d, j, memo));
        }

        // Jump leftwards: i - 1, ..., i - d
        for (int j = i - 1; j >= max(i - d, 0); --j) {
            if (arr[j] >= arr[i]) {
                break;
            }
            res = max(res, 1 + dfs(arr, d, j, memo));
        }

        return memo[i] = res;
    }
};
