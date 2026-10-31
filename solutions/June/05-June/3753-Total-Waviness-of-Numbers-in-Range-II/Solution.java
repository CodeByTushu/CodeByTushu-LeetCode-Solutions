import java.util.Arrays;

/**
 * Problem: LeetCode 3753 - Total Waviness of Numbers in Range II
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {

    private String num;
    private long[][][][] memoCnt;
    private long[][][][] memoSum;

    public long totalWaviness(long num1, long num2) {
        return solve(num2) - solve(num1 - 1);
    }

    private long solve(long x) {
        if (x <= 0) return 0;

        num = String.valueOf(x);
        int n = num.length();

        memoCnt = new long[n + 1][11][11][20];
        memoSum = new long[n + 1][11][11][20];

        for (int i = 0; i <= n; i++) {
            for (int j = 0; j < 11; j++) {
                for (int k = 0; k < 11; k++) {
                    Arrays.fill(memoCnt[i][j][k], -1);
                    Arrays.fill(memoSum[i][j][k], -1);
                }
            }
        }

        return dfs(0, 10, 10, 0, true)[1];
    }

    private long[] dfs(int pos, int prev1, int prev2,
                       int waviness, boolean tight) {

        if (pos == num.length()) {
            return new long[]{1, waviness};
        }

        if (!tight &&
            memoCnt[pos][prev1][prev2][waviness] != -1) {

            return new long[]{
                memoCnt[pos][prev1][prev2][waviness],
                memoSum[pos][prev1][prev2][waviness]
            };
        }

        int limit = tight ? num.charAt(pos) - '0' : 9;

        long count = 0;
        long sum = 0;

        for (int digit = 0; digit <= limit; digit++) {

            boolean nextTight = tight && (digit == limit);

            int nextWaviness = waviness;

            if (prev2 != 10 && prev1 != 10) {

                if ((prev1 > prev2 && prev1 > digit) ||
                    (prev1 < prev2 && prev1 < digit)) {
                    nextWaviness++;
                }
            }

            int nextPrev2 = prev1;
            int nextPrev1 = digit;

            if (prev1 == 10 && digit == 0) {
                nextPrev1 = 10;
                nextPrev2 = 10;
            }

            long[] res = dfs(
                pos + 1,
                nextPrev1,
                nextPrev2,
                nextWaviness,
                nextTight
            );

            count += res[0];
            sum += res[1];
        }

        if (!tight) {
            memoCnt[pos][prev1][prev2][waviness] = count;
            memoSum[pos][prev1][prev2][waviness] = sum;
        }

        return new long[]{count, sum};
    }
}
