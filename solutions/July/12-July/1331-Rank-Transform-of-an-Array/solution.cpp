#include <vector>
#include <algorithm>
#include <unordered_map>

using namespace std;

class Solution {
public:
    vector<int> arrayRankTransform(vector<int>& arr) {
        vector<int> sorted = arr;
        sort(sorted.begin(), sorted.end());

        unordered_map<int, int> rank;
        int r = 1;
        for (int num : sorted) {
            if (rank.find(num) == rank.end()) {
                rank[num] = r++;
            }
        }

        vector<int> ans(arr.size());
        for (int i = 0; i < (int)arr.size(); i++) {
            ans[i] = rank[arr[i]];
        }
        return ans;
    }
};
