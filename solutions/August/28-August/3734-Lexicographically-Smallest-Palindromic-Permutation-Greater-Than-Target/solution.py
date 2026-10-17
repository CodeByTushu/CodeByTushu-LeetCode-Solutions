class Solution:
    def lexPalindromicPermutation(self, s: str, target: str) -> str:
        n = len(s)
        freq = [0] * 26
        for c in s:
            freq[ord(c) - ord("a")] += 1

        # Palindrome is possible only if at most 1 character has odd frequency
        odd_count = sum(1 for f in freq if f % 2 != 0)
        if odd_count > 1:
            return ""

        # Middle character for odd length
        mid = ""
        for i in range(26):
            if freq[i] % 2 != 0:
                mid = chr(ord("a") + i)
                break

        half_len = n // 2

        def build_palindrome(half: list[str]) -> str:
            left = "".join(half)
            right = "".join(reversed(half))
            if n % 2 != 0:
                return left + mid + right
            return left + right

        # Build smallest possible palindrome
        smallest_half = []
        for i in range(26):
            for _ in range(freq[i] // 2):
                smallest_half.append(chr(ord("a") + i))

        smallest = build_palindrome(smallest_half)
        if smallest > target:
            return smallest

        t_half = target[:half_len]
        avail = [f // 2 for f in freq]

        built_half = [""] * half_len
        best_candidate = None

        for pos in range(half_len):
            t_char = ord(t_half[pos]) - ord("a")

            # Option A: place char > t_half[pos] at this pos, fill rest with smallest
            for c in range(t_char + 1, 26):
                if avail[c] > 0:
                    avail[c] -= 1
                    built_half[pos] = chr(ord("a") + c)

                    temp_avail = list(avail)
                    temp_half = list(built_half)
                    fill = pos + 1
                    for cc in range(26):
                        for _ in range(temp_avail[cc]):
                            if fill < half_len:
                                temp_half[fill] = chr(ord("a") + cc)
                                fill += 1

                    candidate = build_palindrome(temp_half)
                    if best_candidate is None or candidate < best_candidate:
                        best_candidate = candidate

                    avail[c] += 1
                    break  # Smallest such c is best

            # Option B: place exact t_half[pos] char and continue matching prefix
            if avail[t_char] > 0:
                avail[t_char] -= 1
                built_half[pos] = chr(ord("a") + t_char)
            else:
                break

            # If we've matched entire t_half
            if pos == half_len - 1:
                if n % 2 != 0 and mid > target[half_len]:
                    candidate = build_palindrome(built_half)
                    if best_candidate is None or candidate < best_candidate:
                        best_candidate = candidate

                candidate = build_palindrome(built_half)
                if candidate > target:
                    if best_candidate is None or candidate < best_candidate:
                        best_candidate = candidate

        return best_candidate if best_candidate is not None else ""
