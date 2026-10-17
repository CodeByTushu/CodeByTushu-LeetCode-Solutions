class Solution:
    def shortestBeautifulSubstring(self, s: str, k: int) -> str:
        n = len(s)
        result = ""
        min_len = float("inf")

        left = 0
        ones = 0
        for right in range(n):
            if s[right] == "1":
                ones += 1

            # shrink while window has more than k ones or has leading zeros with exactly k ones
            while ones > k or (left <= right and s[left] == "0" and ones == k):
                if s[left] == "1":
                    ones -= 1
                left += 1

            if ones == k:
                length = right - left + 1
                candidate = s[left : right + 1]
                if length < min_len or (length == min_len and candidate < result):
                    min_len = length
                    result = candidate

        return result
