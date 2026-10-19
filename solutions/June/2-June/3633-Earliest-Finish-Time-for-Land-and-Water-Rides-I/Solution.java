class Solution {
    public int earliestFinishTime(int[] landStartTime, int[] landDuration,int[] waterStartTime, int[] waterDuration) {

        int answer = Integer.MAX_VALUE;

        // Land ride first, then Water ride
        for (int i = 0; i < landStartTime.length; i++) {
            int landFinish = landStartTime[i] + landDuration[i];

            for (int j = 0; j < waterStartTime.length; j++) {
                int waterStart = Math.max(landFinish, waterStartTime[j]);
                int totalFinish = waterStart + waterDuration[j];

                answer = Math.min(answer, totalFinish);
            }
        }

        // Water ride first, then Land ride
        for (int i = 0; i < waterStartTime.length; i++) {
            int waterFinish = waterStartTime[i] + waterDuration[i];

            for (int j = 0; j < landStartTime.length; j++) {
                int landStart = Math.max(waterFinish, landStartTime[j]);
                int totalFinish = landStart + landDuration[j];

                answer = Math.min(answer, totalFinish);
            }
        }

        return answer;
    }
}
