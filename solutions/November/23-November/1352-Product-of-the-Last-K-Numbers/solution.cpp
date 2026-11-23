/**
 * Problem: LeetCode 1352 - Product of the Last K Numbers
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */
#include <vector>

using namespace std;

class ProductOfNumbers {
private:
    vector<int> prefix;

public:
    ProductOfNumbers() {
        prefix.push_back(1);
    }

    void add(int num) {
        if (num == 0) {
            // Reset prefix array on encountering 0
            prefix.clear();
            prefix.push_back(1);
        } else {
            prefix.push_back(prefix.back() * num);
        }
    }

    int getProduct(int k) {
        int n = prefix.size();
        if (k >= n) return 0;
        return prefix.back() / prefix[n - 1 - k];
    }
};
