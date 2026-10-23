import java.util.*;

/**
 * Problem: LeetCode 1096 - Brace Expansion II
 * Difficulty: Hard
 * Language: Java
 * Author: CodeByTushu
 */
class Solution {
    private String s;
    private int i;

    public List<String> braceExpansionII(String expression) {
        this.s = expression;
        this.i = 0;

        Set<String> resultSet = parse();
        List<String> sortedList = new ArrayList<>(resultSet);
        Collections.sort(sortedList);
        return sortedList;
    }

    private Set<String> parse() {
        Set<String> result = new HashSet<>();
        result.add("");

        while (i < s.length() && s.charAt(i) != '}') {
            if (s.charAt(i) == ',') {
                break;
            }

            Set<String> nextSet = parseSingle();
            Set<String> newResult = new HashSet<>();
            for (String a : result) {
                for (String b : nextSet) {
                    newResult.add(a + b);
                }
            }
            result = newResult;
        }

        return result;
    }

    private Set<String> parseSingle() {
        if (s.charAt(i) == '{') {
            i++; // skip '{'
            Set<String> result = new HashSet<>();

            while (true) {
                result.addAll(parse());

                if (i < s.length() && s.charAt(i) == ',') {
                    i++; // skip ','
                } else {
                    break;
                }
            }

            i++; // skip '}'
            return result;
        }

        char ch = s.charAt(i);
        i++;
        Set<String> single = new HashSet<>();
        single.add(String.valueOf(ch));
        return single;
    }
}
