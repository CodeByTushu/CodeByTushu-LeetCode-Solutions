class Solution:
    def reverseParentheses(self, s: str) -> str:
        stack = []
        current = []

        for c in s:
            if c == '(':
                stack.append(current)
                current = []
            elif c == ')':
                current.reverse()
                current = stack.pop() + current
            else:
                current.append(c)

        return "".join(current)
