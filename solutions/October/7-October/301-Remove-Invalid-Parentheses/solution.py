from typing import List

class Solution:
    def removeInvalidParentheses(self, s: str) -> List[str]:
        left_rem = 0
        right_rem = 0

        for c in s:
            if c == '(':
                left_rem += 1
            elif c == ')':
                if left_rem > 0:
                    left_rem -= 1
                else:
                    right_rem += 1

        result = []

        def is_valid(string: str) -> bool:
            count = 0
            for char in string:
                if char == '(':
                    count += 1
                elif char == ')':
                    count -= 1
                    if count < 0:
                        return False
            return count == 0

        def dfs(string: str, start: int, left: int, right: int):
            if left == 0 and right == 0:
                if is_valid(string):
                    result.append(string)
                return

            for i in range(start, len(string)):
                # Skip duplicate adjacent removals to prevent redundant branches
                if i > start and string[i] == string[i - 1]:
                    continue

                c = string[i]
                if c != '(' and c != ')':
                    continue

                next_str = string[:i] + string[i + 1:]

                if c == '(' and left > 0:
                    dfs(next_str, i, left - 1, right)
                elif c == ')' and right > 0:
                    dfs(next_str, i, left, right - 1)

        dfs(s, 0, left_rem, right_rem)
        return result
