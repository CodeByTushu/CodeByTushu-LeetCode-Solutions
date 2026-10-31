class Solution:
    def minimumDistance(self, word: str) -> int:
        def dist(a: int, b: int) -> int:
            if a == 26 or b == 26:
                return 0
            return abs(a // 6 - b // 6) + abs(a % 6 - b % 6)

        dp = [float('inf')] * 27
        dp[26] = 0

        for i in range(1, len(word)):
            curr = ord(word[i]) - ord('A')
            prev = ord(word[i - 1]) - ord('A')
            next_dp = [float('inf')] * 27

            for j in range(27):
                if dp[j] == float('inf'):
                    continue
                cost1 = dp[j] + dist(prev, curr)
                if cost1 < next_dp[j]:
                    next_dp[j] = cost1

                cost2 = dp[j] + dist(j, curr)
                if cost2 < next_dp[prev]:
                    next_dp[prev] = cost2

            dp = next_dp

        return min(dp)
