/**
 * Problem: LeetCode 3464 - Maximize the Distance Between Points on a Square
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maxDistance(int side, vector<vector<int>>& points, int k) {
        int n = points.size();
        vector<long long> arr(n);
        
        for (int i = 0; i < n; ++i) {
            long long x = points[i][0];
            long long y = points[i][1];
            
            if (x == 0) {
                arr[i] = y;
            } else if (y == side) {
                arr[i] = (long long)side + x;
            } else if (x == side) {
                arr[i] = 3LL * side - y;
            } else {
                arr[i] = 4LL * side - x;
            }
        }
        
        sort(arr.begin(), arr.end());
        
        long long perimeter = 4LL * side;
        vector<long long> arrExt(2 * n);
        for (int i = 0; i < n; ++i) {
            arrExt[i] = arr[i];
            arrExt[i + n] = arr[i] + perimeter;
        }
        
        auto canPlace = [&](long long d) -> bool {
            for (int i = 0; i < n; ++i) {
                long long curr = arr[i];
                int count = 1;
                int idx = i;
                
                for (int step = 1; step < k; ++step) {
                    long long target = curr + d;
                    auto it = lower_bound(arrExt.begin() + idx + 1, arrExt.begin() + i + n, target);
                    if (it == arrExt.begin() + i + n) break;
                    
                    idx = it - arrExt.begin();
                    curr = *it;
                    count++;
                }
                
                if (count == k && (arr[i] + perimeter - curr) >= d) {
                    return true;
                }
            }
            return false;
        };
        
        long long left = 1, right = side, ans = 0;
        while (left <= right) {
            long long mid = left + (right - left) / 2;
            if (canPlace(mid)) {
                ans = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return ans;
    }
};
