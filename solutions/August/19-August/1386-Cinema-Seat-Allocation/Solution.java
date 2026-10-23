import java.util.HashMap;
import java.util.Map;

/**
 * Problem: LeetCode 1386 - Cinema Seat Allocation
 * Difficulty: Medium
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    public int maxNumberOfFamilies(int n, int[][] reservedSeats) {
        Map<Integer, Integer> rowMask = new HashMap<>();

        for (int[] rs : reservedSeats) {
            int row = rs[0];
            int seat = rs[1];
            int mask = rowMask.getOrDefault(row, 0);
            mask |= (1 << seat); // bit `seat` set means that seat number is reserved
            rowMask.put(row, mask);
        }

        int leftBlock = (1 << 2) | (1 << 3) | (1 << 4) | (1 << 5);  // seats 2,3,4,5
        int midBlock = (1 << 4) | (1 << 5) | (1 << 6) | (1 << 7);   // seats 4,5,6,7
        int rightBlock = (1 << 6) | (1 << 7) | (1 << 8) | (1 << 9); // seats 6,7,8,9

        long total = 0;

        for (int mask : rowMask.values()) {
            if ((mask & leftBlock) == 0 && (mask & rightBlock) == 0) {
                total += 2;
            } else if ((mask & leftBlock) == 0 || (mask & midBlock) == 0 || (mask & rightBlock) == 0) {
                total += 1;
            }
            // else: all three blocks are blocked, this row contributes 0
        }

        long emptyRows = (long) n - rowMask.size();
        total += emptyRows * 2;

        return (int) total;
    }
}
