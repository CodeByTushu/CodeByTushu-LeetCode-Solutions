import java.util.*;

/**
 * Problem: LeetCode 1301 - Number of Paths with Max Score
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    private static final int MOD = 1_000_000_007;

    public int[] pathsWithMaxScore(List<String> board) {
        int n = board.size();

        int[][] score = new int[n][n];
        int[][] ways = new int[n][n];

        for (int i = 0; i < n; i++) {
            Arrays.fill(score[i], -1);
        }

        score[n - 1][n - 1] = 0;
        ways[n - 1][n - 1] = 1;

        int[][] dir = {{1, 0}, {0, 1}, {1, 1}};

        for (int i = n - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                if (board.get(i).charAt(j) == 'X') continue;
                if (i == n - 1 && j == n - 1) continue;

                int best = -1;
                int count = 0;

                for (int[] d : dir) {
                    int ni = i + d[0];
                    int nj = j + d[1];

                    if (ni >= n || nj >= n) continue;
                    if (score[ni][nj] == -1) continue;

                    if (score[ni][nj] > best) {
                        best = score[ni][nj];
                        count = ways[ni][nj];
                    } else if (score[ni][nj] == best) {
                        count = (count + ways[ni][nj]) % MOD;
                    }
                }

                if (best == -1) continue;

                char ch = board.get(i).charAt(j);
                if (ch != 'E' && ch != 'S') {
                    best += ch - '0';
                }

                score[i][j] = best;
                ways[i][j] = count;
            }
        }

        if (ways[0][0] == 0) return new int[]{0, 0};

        return new int[]{score[0][0], ways[0][0]};
    }
}
