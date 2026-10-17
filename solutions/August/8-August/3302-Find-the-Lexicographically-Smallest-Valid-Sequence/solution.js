/**
 * @param {string} word1
 * @param {string} word2
 * @return {number[]}
 */
var validSequence = function(word1, word2) {
  const n = word1.length;
  const m = word2.length;
  const ans = new Array(m);
  const last = new Array(m).fill(-1);

  // last[j] stores the latest index i in word1 matching word2[j]
  // such that the suffix word2[j...m-1] can be matched in word1[i...]
  let i = n - 1;
  let j = m - 1;
  while (i >= 0 && j >= 0) {
    if (word1[i] === word2[j]) {
      last[j] = i;
      j--;
    }
    i--;
  }

  let canSkip = true;
  j = 0;
  for (i = 0; i < n; i++) {
    if (j === m) break;
    if (word1[i] === word2[j]) {
      ans[j++] = i;
    } else if (canSkip && (j === m - 1 || i < last[j + 1])) {
      canSkip = false;
      ans[j++] = i;
    }
  }

  return j === m ? ans : [];
};
