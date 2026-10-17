class Solution:
    def hasValidPath(self, grid: list[list[str]]) -> bool:
        m, n = len(grid), len(grid[0])
        total_len = m + n - 1
        
        # Path length must be even to form a valid balanced parentheses string
        if total_len % 2 == 1:
            return False
        if grid[0][0] == ')' or grid[m - 1][n - 1] == '(':
            return False
            
        max_bal = total_len // 2
        # dp[i][j][b] tracks if open parenthesis balance b is reachable at cell (i, j)
        dp = [[[False] * (max_bal + 2) for _ in range(n)] for _ in range(m)]
        dp[0][0][1] = True
        
        for i in range(m):
            for j in range(n):
                if i == 0 and j == 0:
                    continue
                delta = 1 if grid[i][j] == '(' else -1
                for b in range(max_bal + 1):
                    prev = b - delta
                    if 0 <= prev <= max_bal:
                        reachable = False
                        if i > 0 and dp[i - 1][j][prev]:
                            reachable = True
                        if j > 0 and dp[i][j - 1][prev]:
                            reachable = True
                        if reachable:
                            dp[i][j][b] = True
                            
        return dp[m - 1][n - 1][0]
