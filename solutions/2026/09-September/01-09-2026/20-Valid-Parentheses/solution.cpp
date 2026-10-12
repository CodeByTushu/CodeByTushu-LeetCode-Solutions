#include <string>
#include <vector>

using namespace std;

class Solution {
public:
    bool isValid(string s) {
        if (s.length() % 2 != 0) return false;
        vector<char> stack(s.length());
        int top = -1;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') {
                stack[++top] = c;
            } else {
                if (top < 0) return false;
                char open = stack[top--];
                if ((c == ')' && open != '(') ||
                    (c == '}' && open != '{') ||
                    (c == ']' && open != '[')) {
                    return false;
                }
            }
        }
        return top == -1;
    }
};
