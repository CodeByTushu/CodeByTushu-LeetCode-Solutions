from typing import List

class Solution:
    def braceExpansionII(self, expression: str) -> List[str]:
        self.s = expression
        self.i = 0

        result = self.parse()
        return sorted(result)

    def parse(self) -> set:
        result = {""}

        while self.i < len(self.s) and self.s[self.i] != '}':
            if self.s[self.i] == ',':
                break

            next_set = self.parse_single()
            result = {
                a + b
                for a in result
                for b in next_set
            }

        return result

    def parse_single(self) -> set:
        if self.s[self.i] == '{':
            self.i += 1
            result = set()

            while True:
                result.update(self.parse())

                if self.i < len(self.s) and self.s[self.i] == ',':
                    self.i += 1
                else:
                    break

            self.i += 1
            return result

        ch = self.s[self.i]
        self.i += 1
        return {ch}
