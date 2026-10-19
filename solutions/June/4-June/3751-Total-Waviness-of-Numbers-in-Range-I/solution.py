class Solution:
    def totalWaviness(self, num1: int, num2: int) -> int:
        def getWaviness(num: int) -> int:
            s = str(num)
            if len(s) < 3:
                return 0

            waviness = 0
            for i in range(1, len(s) - 1):
                if (s[i] > s[i - 1] and s[i] > s[i + 1]) or (
                    s[i] < s[i - 1] and s[i] < s[i + 1]
                ):
                    waviness += 1
            return waviness

        ans = 0
        for num in range(num1, num2 + 1):
            ans += getWaviness(num)
        return ans
