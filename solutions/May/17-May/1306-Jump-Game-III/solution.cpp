/**
 * Problem: LeetCode 1306 - Jump Game III
 * Difficulty: Medium
 * Language: C++ (17/20)
 * Author: CodeByTushu
 */
#include <vector>
#include <queue>

using namespace std;

class Solution {
public:
    bool canReach(vector<int>& arr, int start) {
        int n = arr.size();
        queue<int> q;
        vector<bool> visited(n, false);

        q.push(start);
        visited[start] = true;

        while (!q.empty()) {
            int curr = q.front();
            q.pop();

            // Target reached: current index has value 0
            if (arr[curr] == 0) {
                return true;
            }

            // Jump forward: curr + arr[curr]
            int forward = curr + arr[curr];
            if (forward < n && !visited[forward]) {
                visited[forward] = true;
                q.push(forward);
            }

            // Jump backward: curr - arr[curr]
            int backward = curr - arr[curr];
            if (backward >= 0 && !visited[backward]) {
                visited[backward] = true;
                q.push(backward);
            }
        }

        return false;
    }
};
