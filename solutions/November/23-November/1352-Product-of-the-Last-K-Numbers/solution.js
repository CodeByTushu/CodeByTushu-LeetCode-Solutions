/**
 * Problem: LeetCode 1352 - Product of the Last K Numbers
 * Difficulty: Medium
 * Language: JavaScript
 * Author: CodeByTushu
 */
var ProductOfNumbers = function() {
    this.prefix = [1];
};

/** 
 * @param {number} num
 * @return {void}
 */
ProductOfNumbers.prototype.add = function(num) {
    if (num === 0) {
        // Reset prefix array on encountering 0
        this.prefix = [1];
    } else {
        this.prefix.push(this.prefix[this.prefix.length - 1] * num);
    }
};

/** 
 * @param {number} k
 * @return {number}
 */
ProductOfNumbers.prototype.getProduct = function(k) {
    const size = this.prefix.length;
    if (k >= size) return 0;
    return Math.floor(this.prefix[size - 1] / this.prefix[size - 1 - k]);
};
