/**
 * Problem: LeetCode 2452 - Words Within Two Edits of Dictionary
 * Difficulty: Medium
 * Language: C++
 * Author: CodeByTushu
 */

#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    vector<string> twoEditWords(vector<string>& queries, vector<string>& dictionary) {
        vector<string> result;
        int wordLen = queries[0].length();
        
        for (const string& query : queries) {
            for (const string& word : dictionary) {
                int diff = 0;
                for (int i = 0; i < wordLen; ++i) {
                    if (query[i] != word[i]) {
                        if (++diff > 2) break;
                    }
                }
                if (diff <= 2) {
                    result.push_back(query);
                    break;
                }
            }
        }
        
        return result;
    }
};
