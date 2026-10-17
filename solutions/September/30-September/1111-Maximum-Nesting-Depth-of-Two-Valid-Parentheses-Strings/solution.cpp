#include <vector>
#include <string>

class Solution {
public:
    std::vector<int> maxDepthAfterSplit(std::string seq) {
        int n = seq.size();
        std::vector<int> ans(n);
        int depth = 0;

        for (int i = 0; i < n; ++i) {
            if (seq[i] == '(') {
                depth++;
                ans[i] = depth % 2;
            } else {
                ans[i] = depth % 2;
                depth--;
            }
        }

        return ans;
    }
};
