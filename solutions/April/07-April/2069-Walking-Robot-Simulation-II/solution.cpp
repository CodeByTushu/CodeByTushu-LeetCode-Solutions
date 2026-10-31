#include <vector>
#include <string>

using namespace std;

/**
 * Problem: LeetCode 2069 - Walking Robot Simulation II
 * Language: C++
 * Time Complexity: Constructor O(W + H), step/getPos/getDir O(1)
 * Space Complexity: O(W + H)
 */
class Robot {
private:
    vector<vector<int>> coords;
    vector<string> dirs;
    int perimeter;
    int idx;
    bool moved;

public:
    Robot(int width, int height) {
        perimeter = 2 * (width + height) - 4;
        coords.reserve(perimeter);
        dirs.reserve(perimeter);
        idx = 0;
        moved = false;

        // Bottom row
        for (int i = 0; i < width; ++i) {
            coords.push_back({i, 0});
            dirs.push_back("East");
        }
        // Right col
        for (int j = 1; j < height; ++j) {
            coords.push_back({width - 1, j});
            dirs.push_back("North");
        }
        // Top row
        for (int i = width - 2; i >= 0; --i) {
            coords.push_back({i, height - 1});
            dirs.push_back("West");
        }
        // Left col
        for (int j = height - 2; j > 0; --j) {
            coords.push_back({0, j});
            dirs.push_back("South");
        }

        dirs[0] = "South";
    }

    void step(int num) {
        moved = true;
        idx = (idx + num) % perimeter;
    }

    vector<int> getPos() {
        return coords[idx];
    }

    string getDir() {
        if (!moved) return "East";
        return dirs[idx];
    }
};
