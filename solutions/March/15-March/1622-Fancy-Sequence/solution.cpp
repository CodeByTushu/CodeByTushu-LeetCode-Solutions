/**
 * Problem: LeetCode 1622 - Fancy Sequence
 * Difficulty: Hard
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>

using namespace std;

class Fancy {
private:
    static constexpr long long MOD = 1'000'000'007LL;
    vector<long long> values;
    long long a;
    long long b;

    long long power(long long base, long long exp) {
        long long res = 1;
        base %= MOD;
        while (exp > 0) {
            if (exp & 1) {
                res = (res * base) % MOD;
            }
            base = (base * base) % MOD;
            exp >>= 1;
        }
        return res;
    }

    long long modInverse(long long n) {
        return power(n, MOD - 2);
    }

public:
    Fancy() : a(1), b(0) {
        values.reserve(100000);
    }

    void append(int val) {
        long long diff = (val - b) % MOD;
        if (diff < 0) {
            diff += MOD;
        }
        long long invA = modInverse(a);
        values.push_back((diff * invA) % MOD);
    }

    void addAll(int inc) {
        b = (b + inc) % MOD;
    }

    void multAll(int m) {
        a = (a * m) % MOD;
        b = (b * m) % MOD;
    }

    int getIndex(int idx) {
        if (idx >= values.size()) {
            return -1;
        }
        return (a * values[idx] + b) % MOD;
    }
};
