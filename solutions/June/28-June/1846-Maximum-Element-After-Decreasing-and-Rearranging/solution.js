/**
 * @param {number[]} arr
 * @return {number}
 */
var maximumElementAfterDecrementingAndRearranging = function(arr) {
    arr.sort((a, b) => a - b);

    let ans = 1;

    for (let i = 1; i < arr.length; i++) {
        ans = Math.min(arr[i], ans + 1);
    }

    return ans;
};
