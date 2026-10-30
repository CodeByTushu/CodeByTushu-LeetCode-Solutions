/**
 * Problem: LeetCode 1622 - Fancy Sequence
 * Difficulty: Hard
 * Language: JavaScript
 * Author: CodeByTushu
 */

const MOD = 1000000007n;

function power(base, exp) {
    let res = 1n;
    base = base % MOD;
    while (exp > 0n) {
        if (exp & 1n) {
            res = (res * base) % MOD;
        }
        base = (base * base) % MOD;
        exp >>= 1n;
    }
    return res;
}

function modInverse(n) {
    return power(n, MOD - 2n);
}

var Fancy = function() {
    this.values = [];
    this.a = 1n;
    this.b = 0n;
};

/** 
 * @param {number} val
 * @return {void}
 */
Fancy.prototype.append = function(val) {
    let diff = (BigInt(val) - this.b) % MOD;
    if (diff < 0n) {
        diff += MOD;
    }
    let invA = modInverse(this.a);
    this.values.push((diff * invA) % MOD);
};

/** 
 * @param {number} inc
 * @return {void}
 */
Fancy.prototype.addAll = function(inc) {
    this.b = (this.b + BigInt(inc)) % MOD;
};

/** 
 * @param {number} m
 * @return {void}
 */
Fancy.prototype.multAll = function(m) {
    this.a = (this.a * BigInt(m)) % MOD;
    this.b = (this.b * BigInt(m)) % MOD;
};

/** 
 * @param {number} idx
 * @return {number}
 */
Fancy.prototype.getIndex = function(idx) {
    if (idx >= this.values.length) {
        return -1;
    }
    return Number((this.a * this.values[idx] + this.b) % MOD);
};
