/**
 * Problem: LeetCode 3360 - Stone Removal Game
 * Difficulty: Easy
 * Language: Java
 * Author: CodeByTushu
 */

class Solution {
    public boolean canAliceWin(int n) {
        int remove = 10;
        boolean aliceTurn = true;

        while (n >= remove) {
            n -= remove;
            remove--;
            aliceTurn = !aliceTurn;
        }

        // Jis player ki turn hai aur wo move nahi kar sakta, wo haar gaya.
        // Agar ab Bob ki turn hai, matlab Bob haara, Alice jeeti.
        return !aliceTurn;
    }
}
