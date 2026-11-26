/**
 * Problem: LeetCode 3360 - Stone Removal Game
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */

class Solution {
public:
    bool canAliceWin(int n) {
        int remove = 10;
        bool aliceTurn = true;

        while (n >= remove) {
            n -= remove;
            remove--;
            aliceTurn = !aliceTurn;
        }

        // Agar Bob ki turn aayi aur wo stones nahi utha paya, toh Alice jeet gayi
        return !aliceTurn;
    }
};
