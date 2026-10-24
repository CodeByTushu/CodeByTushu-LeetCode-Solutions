/**
 * Problem: LeetCode 2409 - Count Days Spent Together
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int countDaysTogether(String arriveAlice, String leaveAlice, String arriveBob, String leaveBob) {
        int[] days = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        int[] prefix = new int[13];
        for (int m = 1; m <= 12; m++) {
            prefix[m] = prefix[m - 1] + days[m - 1];
        }
        int aA = toDay(arriveAlice, prefix);
        int lA = toDay(leaveAlice, prefix);
        int aB = toDay(arriveBob, prefix);
        int lB = toDay(leaveBob, prefix);
        int start = Math.max(aA, aB);
        int end = Math.min(lA, lB);
        return Math.max(0, end - start + 1);
    }

    private int toDay(String date, int[] prefix) {
        int month = Integer.parseInt(date.substring(0, 2));
        int day = Integer.parseInt(date.substring(3, 5));
        return prefix[month - 1] + day;
    }
}
