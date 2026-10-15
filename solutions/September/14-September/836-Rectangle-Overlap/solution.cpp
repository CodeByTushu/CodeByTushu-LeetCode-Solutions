#include <vector>

using namespace std;

class Solution {
public:
    bool isRectangleOverlap(vector<int>& rec1, vector<int>& rec2) {
        return !(rec2[0] >= rec1[2] ||   // rec2 right of rec1
                 rec2[2] <= rec1[0] ||   // rec2 left of rec1
                 rec2[1] >= rec1[3] ||   // rec2 above rec1
                 rec2[3] <= rec1[1]);    // rec2 below rec1
    }
};
