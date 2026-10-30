/**
 * Problem: 3474. Lexicographically Smallest Generated String
 * Difficulty: Hard
 * Language: JavaScript (ES6+)
 * 
 * Approach:
 * Greedily satisfy 'T' constraints, fill gaps with 'a', break any accidental
 * 'F' matches by flipping the rightmost unfixed character in that window to 'b',
 * and verify the result.
 * 
 * Time Complexity: O(n * m)
 * Space Complexity: O(n + m) auxiliary space
 * 
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var generateString = function(str1, str2) {
    const n = str1.length;
    const m = str2.length;
    const sz = n + m - 1;

    const ans = new Array(sz).fill(null);
    const modifiable = new Array(sz).fill(true);

    // 1. Enforce 'T' constraints
    for (let i = 0; i < n; i++) {
        if (str1[i] === 'T') {
            for (let j = 0; j < m; j++) {
                const pos = i + j;
                const ch = str2[j];
                if (ans[pos] !== null && ans[pos] !== ch) {
                    return "";
                }
                ans[pos] = ch;
                modifiable[pos] = false;
            }
        }
    }

    // 2. Fill unassigned with 'a'
    for (let i = 0; i < sz; i++) {
        if (ans[i] === null) {
            ans[i] = 'a';
        }
    }

    // 3. Resolve 'F' constraints
    for (let i = 0; i < n; i++) {
        if (str1[i] === 'F') {
            let match = true;
            for (let j = 0; j < m; j++) {
                if (ans[i + j] !== str2[j]) {
                    match = false;
                    break;
                }
            }

            if (match) {
                let modifiablePos = -1;
                for (let j = m - 1; j >= 0; j--) {
                    if (modifiable[i + j]) {
                        modifiablePos = i + j;
                        break;
                    }
                }

                if (modifiablePos === -1) {
                    return "";
                }

                ans[modifiablePos] = 'b';
                modifiable[modifiablePos] = false;
            }
        }
    }

    // 4. Final verification
    for (let i = 0; i < n; i++) {
        let match = true;
        for (let j = 0; j < m; j++) {
            if (ans[i + j] !== str2[j]) {
                match = false;
                break;
            }
        }
        if (str1[i] === 'T' && !match) return "";
        if (str1[i] === 'F' && match) return "";
    }

    return ans.join("");
};
