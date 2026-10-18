#include <vector>
#include <string>
#include <algorithm>

using namespace std;

class Solution {
private:
    static constexpr int MOD = 1'000'000'007;

public:
    vector<int> pathsWithMaxScore(vector<string>& board) {
        int n = board.size();

        vector<vector<int>> score(n, vector<int>(n, -1));
        vector<vector<int>> ways(n, vector<int>(n, 0));

        score[n - 1][n - 1] = 0;
        ways[n - 1][n - 1] = 1;

        const int dir[3][2] = {{1, 0}, {0, 1}, {1, 1}};

        for (int i = n - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                if (board[i][j] == 'X') continue;
                if (i == n - 1 && j == n - 1) continue;

                int best = -1;
                int count = 0;

                for (const auto& d : dir) {
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

                char ch = board[i][j];
                if (ch != 'E' && ch != 'S') {
                    best += ch - '0';
                }

                score[i][j] = best;
                ways[i][j] = count;
            }
        }

        if (ways[0][0] == 0) return {0, 0};

        return {score[0][0], ways[0][0]};
    }
};
