/**
 * Problem: LeetCode 3934 - Smallest Unique Subarray
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <random>
#include <algorithm>

using namespace std;

class Solution {
    using u64 = unsigned long long;
    using u128 = __uint128_t;
    const u64 MOD = (1ULL << 61) - 1;

    vector<u64> h, pw;
    int n;

    u64 mul(u64 a, u64 b) {
        u128 r = (u128)a * b;
        u64 res = (r & MOD) + (r >> 61);
        if (res >= MOD) res -= MOD;
        return res;
    }

    bool hasUnique(int L) {
        int m = n - L + 1;
        vector<u64> arr(m);
        u64 pwL = pw[L];
        for (int i = 0; i < m; i++) {
            u64 sub = mul(h[i], pwL);
            u64 v = (h[i + L] >= sub) ? (h[i + L] - sub) : (h[i + L] + MOD - sub);
            arr[i] = v;
        }
        sort(arr.begin(), arr.end());

        for (int i = 0; i < m; i++) {
            bool sameLeft = (i > 0 && arr[i] == arr[i - 1]);
            bool sameRight = (i < m - 1 && arr[i] == arr[i + 1]);
            if (!sameLeft && !sameRight) return true;
        }
        return false;
    }

public:
    int smallestUniqueSubarray(vector<int>& nums) {
        n = nums.size();
        mt19937_64 rng(1337);
        u64 base = 1000003ULL + (rng() % 1000000ULL);

        h.resize(n + 1, 0);
        pw.resize(n + 1, 1);
        for (int i = 0; i < n; i++) {
            h[i + 1] = (mul(h[i], base) + (u64)nums[i]) % MOD;
            pw[i + 1] = mul(pw[i], base);
        }

        int lo = 1, hi = n;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (hasUnique(mid)) hi = mid;
            else lo = mid + 1;
        }
        return lo;
    }
};
