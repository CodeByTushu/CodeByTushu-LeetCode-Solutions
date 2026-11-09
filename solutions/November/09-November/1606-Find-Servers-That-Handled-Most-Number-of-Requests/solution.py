"""
Problem: LeetCode 1606 - Find Servers That Handled Most Number of Requests
Difficulty: Hard
Language: Python 3
Author: CodeByTushu
"""
import heapq


class Solution:
    def busiestServers(self, k: int, arrival: list[int], load: list[int]) -> list[int]:
        count = [0] * k
        free_ge = list(range(k))  # Available servers with ID >= (i % k)
        free_lt = []              # Available servers with ID < (i % k)
        busy = []                 # Min-heap of (completion_timestamp, server_id)

        for i, (start, duration) in enumerate(zip(arrival, load)):
            target = i % k

            # When request index modulo resets to 0, flush wrapped servers back
            if target == 0:
                while free_lt:
                    heapq.heappush(free_ge, heapq.heappop(free_lt))

            # Release all servers whose task finishes on or before the current start time
            while busy and busy[0][0] <= start:
                _, s = heapq.heappop(busy)
                if s >= target:
                    heapq.heappush(free_ge, s)
                else:
                    heapq.heappush(free_lt, s)

            # Rebalance servers whose ID is strictly less than target
            while free_ge and free_ge[0] < target:
                heapq.heappush(free_lt, heapq.heappop(free_ge))

            # Pick the lowest available server >= target, or wrap around
            if free_ge:
                server = heapq.heappop(free_ge)
            elif free_lt:
                server = heapq.heappop(free_lt)
            else:
                continue  # All k servers busy -> request is dropped

            count[server] += 1
            heapq.heappush(busy, (start + duration, server))

        max_req = max(count)
        return [idx for idx, c in enumerate(count) if c == max_req]
