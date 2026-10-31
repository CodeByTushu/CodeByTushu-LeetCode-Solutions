/**
 * Problem: LeetCode 2751 - Robot Collisions
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <string>
#include <numeric>
#include <algorithm>

using namespace std;

class Solution {
public:
    vector<int> survivedRobotsHealths(vector<int>& positions, vector<int>& healths, string directions) {
        int n = positions.size();
        vector<int> indices(n);
        iota(indices.begin(), indices.end(), 0);

        // Sort indices by positions ascending
        sort(indices.begin(), indices.end(), [&](int a, int b) {
            return positions[a] < positions[b];
        });

        vector<int> st; // stack storing indices of 'R' moving robots

        for (int curr : indices) {
            if (directions[curr] == 'R') {
                st.push_back(curr);
            } else {
                // Robot moving 'L' collides with 'R' robots in stack
                while (!st.empty() && healths[curr] > 0) {
                    int top = st.back();
                    if (healths[top] < healths[curr]) {
                        healths[top] = 0;
                        st.pop_back();
                        healths[curr] -= 1;
                    } else if (healths[top] > healths[curr]) {
                        healths[curr] = 0;
                        healths[top] -= 1;
                    } else {
                        healths[top] = 0;
                        healths[curr] = 0;
                        st.pop_back();
                    }
                }
            }
        }

        vector<int> result;
        for (int i = 0; i < n; i++) {
            if (healths[i] > 0) {
                result.push_back(healths[i]);
            }
        }
        return result;
    }
};
