#include <vector>
#include <unordered_set>

using namespace std;

class Solution {
public:
    int missingMultiple(vector<int>& nums, int k) {
        unordered_set<int> set(nums.begin(), nums.end());

        int multiple = k;
        while (set.count(multiple)) {
            multiple += k;
        }

        return multiple;
    }
};
