class Solution:
    def earliestFinishTime(
        self,
        landStartTime: list[int],
        landDuration: list[int],
        waterStartTime: list[int],
        waterDuration: list[int],
    ) -> int:
        answer = float('inf')

        # Land ride first, then Water ride
        for ls, ld in zip(landStartTime, landDuration):
            landFinish = ls + ld
            for ws, wd in zip(waterStartTime, waterDuration):
                waterStart = max(landFinish, ws)
                totalFinish = waterStart + wd
                answer = min(answer, totalFinish)

        # Water ride first, then Land ride
        for ws, wd in zip(waterStartTime, waterDuration):
            waterFinish = ws + wd
            for ls, ld in zip(landStartTime, landDuration):
                landStart = max(waterFinish, ls)
                totalFinish = landStart + ld
                answer = min(answer, totalFinish)

        return int(answer)
