/**
 * Problem: LeetCode 2409 - Count Days Spent Together
 * Difficulty: Easy
 * Language: C++
 * Author: CodeByTushu
 */
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int countDaysTogether(string arriveAlice, string leaveAlice, string arriveBob, string leaveBob) {
        vector<int> days = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        vector<int> prefix(13, 0);
        for (int m = 1; m <= 12; m++) {
            prefix[m] = prefix[m - 1] + days[m - 1];
        }

        auto toDay = [&](const string& date) {
            int month = stoi(date.substr(0, 2));
            int day = stoi(date.substr(3, 2));
            return prefix[month - 1] + day;
        };

        int aA = toDay(arriveAlice);
        int lA = toDay(leaveAlice);
        int aB = toDay(arriveBob);
        int lB = toDay(leaveBob);

        int start = max(aA, aB);
        int end = min(lA, lB);
        return max(0, end - start + 1);
    }
};
