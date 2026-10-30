/**
 * Problem: LeetCode 1622 - Fancy Sequence
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */

import java.util.ArrayList;
import java.util.List;

class Fancy {
    private static final long MOD = 1_000_000_007L;
    private final List<Long> values;
    private long a;
    private long b;

    public Fancy() {
        this.values = new ArrayList<>();
        this.a = 1L;
        this.b = 0L;
    }

    private long power(long base, long exp) {
        long res = 1L;
        base %= MOD;
        while (exp > 0) {
            if ((exp & 1) == 1) {
                res = (res * base) % MOD;
            }
            base = (base * base) % MOD;
            exp >>= 1;
        }
        return res;
    }

    private long modInverse(long n) {
        return power(n, MOD - 2);
    }

    public void append(int val) {
        // x = (val - b) * inv(a) % MOD
        long diff = (val - b) % MOD;
        if (diff < 0) {
            diff += MOD;
        }
        long invA = modInverse(a);
        long x = (diff * invA) % MOD;
        values.add(x);
    }

    public void addAll(int inc) {
        b = (b + inc) % MOD;
    }

    public void multAll(int m) {
        a = (a * m) % MOD;
        b = (b * m) % MOD;
    }

    public int getIndex(int idx) {
        if (idx >= values.size()) {
            return -1;
        }
        return (int) ((a * values.get(idx) + b) % MOD);
    }
}
