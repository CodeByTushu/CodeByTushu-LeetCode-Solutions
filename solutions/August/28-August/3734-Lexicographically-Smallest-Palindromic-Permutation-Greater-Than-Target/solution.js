/**
 * Problem: LeetCode 3734 - Lexicographically Smallest Palindromic Permutation Greater Than Target
 * Difficulty: Hard
 * Language: JavaScript (ES6+ / Node.js)
 * Author: CodeByTushu
 *
 * @param {string} s
 * @param {string} target
 * @return {string}
 */
var lexPalindromicPermutation = function(s, target) {
    const n = s.length;
    const freq = new Array(26).fill(0);
    const codeA = 97;

    for (let i = 0; i < n; i++) freq[s.charCodeAt(i) - codeA]++;

    // Palindrome possible only if at most 1 odd frequency
    let oddCount = 0;
    for (let f of freq) if (f % 2 !== 0) oddCount++;
    if (oddCount > 1) return "";

    // Middle character for odd length
    let mid = "";
    for (let i = 0; i < 26; i++) {
        if (freq[i] % 2 !== 0) {
            mid = String.fromCharCode(codeA + i);
            break;
        }
    }

    const halfLen = Math.floor(n / 2);

    function buildPalindrome(half, midChar, totalLen) {
        let res = half.join("");
        if (totalLen % 2 !== 0) res += midChar;
        for (let i = half.length - 1; i >= 0; i--) res += half[i];
        return res;
    }

    // Build smallest left half
    const smallestHalf = [];
    for (let i = 0; i < 26; i++) {
        for (let j = 0; j < Math.floor(freq[i] / 2); j++) {
            smallestHalf.push(String.fromCharCode(codeA + i));
        }
    }
    const smallest = buildPalindrome(smallestHalf, mid, n);
    if (smallest > target) return smallest;

    const tHalf = target.substring(0, halfLen);
    const avail = new Array(26).fill(0);
    for (let i = 0; i < 26; i++) avail[i] = Math.floor(freq[i] / 2);

    const builtHalf = new Array(halfLen);
    let bestCandidate = null;

    for (let pos = 0; pos < halfLen; pos++) {
        const tChar = tHalf.charCodeAt(pos) - codeA;

        // Option A: place char > tHalf[pos] at this pos, fill rest smallest
        for (let c = tChar + 1; c < 26; c++) {
            if (avail[c] > 0) {
                avail[c]--;
                builtHalf[pos] = String.fromCharCode(codeA + c);

                const tempAvail = avail.slice();
                const tempHalf = builtHalf.slice();
                let fill = pos + 1;
                for (let cc = 0; cc < 26; cc++) {
                    for (let j = 0; j < tempAvail[cc]; j++) {
                        if (fill < halfLen) tempHalf[fill++] = String.fromCharCode(codeA + cc);
                    }
                }

                const candidate = buildPalindrome(tempHalf, mid, n);
                if (bestCandidate === null || candidate < bestCandidate) {
                    bestCandidate = candidate;
                }

                avail[c]++;
                break; // smallest such c is best
            }
        }

        // Option B: place exact tHalf[pos] char and continue matching
        if (avail[tChar] > 0) {
            avail[tChar]--;
            builtHalf[pos] = String.fromCharCode(codeA + tChar);
        } else {
            break;
        }

        if (pos === halfLen - 1) {
            if (n % 2 !== 0 && mid > target[halfLen]) {
                const candidate = buildPalindrome(builtHalf, mid, n);
                if (bestCandidate === null || candidate < bestCandidate) {
                    bestCandidate = candidate;
                }
            }
            const candidate = buildPalindrome(builtHalf, mid, n);
            if (candidate > target) {
                if (bestCandidate === null || candidate < bestCandidate) {
                    bestCandidate = candidate;
                }
            }
        }
    }

    return bestCandidate !== null ? bestCandidate : "";
};
