#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maximumElementAfterDecrementingAndRearranging(vector<int>& arr) {
        sort(arr.begin(), arr.end());

        int ans = 1;

        for (int i = 1; i < arr.size(); i++) {
            ans = min(arr[i], ans + 1);
        }

        return ans;
    }
};
