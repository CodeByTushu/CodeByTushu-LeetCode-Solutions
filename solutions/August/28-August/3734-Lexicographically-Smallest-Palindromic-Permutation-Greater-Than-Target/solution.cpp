#include <string>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    string lexPalindromicPermutation(string s, string target) {
        int n = s.length();
        vector<int> freq(26, 0);
        for (char c : s) {
            freq[c - 'a']++;
        }

        // Palindrome possible only if at most 1 odd frequency
        int oddCount = 0;
        for (int f : freq) {
            if (f % 2 != 0) oddCount++;
        }
        if (oddCount > 1) return "";

        // Middle character for odd length
        char mid = 0;
        for (int i = 0; i < 26; i++) {
            if (freq[i] % 2 != 0) {
                mid = (char)('a' + i);
                break;
            }
        }

        int halfLen = n / 2;

        // Build smallest left half
        vector<char> smallestHalf;
        smallestHalf.reserve(halfLen);
        for (int i = 0; i < 26; i++) {
            for (int j = 0; j < freq[i] / 2; j++) {
                smallestHalf.push_back((char)('a' + i));
            }
        }

        string smallest = buildPalindrome(smallestHalf, mid, n);
        if (smallest > target) return smallest;

        string tHalf = target.substr(0, halfLen);

        vector<int> avail(26, 0);
        for (int i = 0; i < 26; i++) avail[i] = freq[i] / 2;

        vector<char> builtHalf(halfLen);
        string bestCandidate = "";
        bool hasCandidate = false;

        for (int pos = 0; pos < halfLen; pos++) {
            int tChar = tHalf[pos] - 'a';

            // Option A: place char > tHalf[pos] at this pos, fill rest smallest
            for (int c = tChar + 1; c < 26; c++) {
                if (avail[c] > 0) {
                    avail[c]--;
                    builtHalf[pos] = (char)('a' + c);

                    vector<int> tempAvail = avail;
                    vector<char> tempHalf = builtHalf;
                    int fill = pos + 1;
                    for (int cc = 0; cc < 26; cc++) {
                        for (int j = 0; j < tempAvail[cc]; j++) {
                            if (fill < halfLen) tempHalf[fill++] = (char)('a' + cc);
                        }
                    }

                    string candidate = buildPalindrome(tempHalf, mid, n);
                    if (!hasCandidate || candidate < bestCandidate) {
                        bestCandidate = candidate;
                        hasCandidate = true;
                    }

                    avail[c]++;
                    break;
                }
            }

            // Option B: place exact tHalf[pos] char and continue matching
            if (avail[tChar] > 0) {
                avail[tChar]--;
                builtHalf[pos] = (char)('a' + tChar);
            } else {
                break;
            }

            // If we've matched entire tHalf
            if (pos == halfLen - 1) {
                if (n % 2 != 0 && mid > target[halfLen]) {
                    string candidate = buildPalindrome(builtHalf, mid, n);
                    if (!hasCandidate || candidate < bestCandidate) {
                        bestCandidate = candidate;
                        hasCandidate = true;
                    }
                }
                string candidate = buildPalindrome(builtHalf, mid, n);
                if (candidate > target) {
                    if (!hasCandidate || candidate < bestCandidate) {
                        bestCandidate = candidate;
                        hasCandidate = true;
                    }
                }
            }
        }

        return hasCandidate ? bestCandidate : "";
    }

private:
    string buildPalindrome(const vector<char>& half, char mid, int n) {
        string res;
        res.reserve(n);
        for (char c : half) res.push_back(c);
        if (n % 2 != 0) res.push_back(mid);
        for (int i = (int)half.size() - 1; i >= 0; i--) res.push_back(half[i]);
        return res;
    }
};
