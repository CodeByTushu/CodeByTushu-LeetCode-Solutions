/**
 * Problem: LeetCode 2126 - Destroying Asteroids
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    bool asteroidsDestroyed(int mass, vector<int>& asteroids) {
        sort(asteroids.begin(), asteroids.end());
        long long currentMass = mass;

        for (int asteroid : asteroids) {
            if (currentMass < asteroid) {
                return false;
            }
            currentMass += asteroid;
        }

        return true;
    }
};
