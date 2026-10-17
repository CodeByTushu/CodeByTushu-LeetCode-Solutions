/**
 * @param {string} num
 * @param {number} t
 * @return {string}
 */
var smallestNumber = function(num, t) {
  let target = BigInt(t);
  const primes = [2n, 3n, 5n, 7n];
  const primeCount = { 2: 0, 3: 0, 5: 0, 7: 0 };

  for (const p of primes) {
    while (target % p === 0n) {
      primeCount[Number(p)]++;
      target /= p;
    }
  }

  if (target !== 1n) return "-1";

  const FACTOR_COUNTS = {
    0: {},
    1: {},
    2: { 2: 1 },
    3: { 3: 1 },
    4: { 2: 2 },
    5: { 5: 1 },
    6: { 2: 1, 3: 1 },
    7: { 7: 1 },
    8: { 2: 3 },
    9: { 3: 2 }
  };

  function getFactorCount(count) {
    const c2 = count[2] || 0;
    const c3 = count[3] || 0;
    const c5 = count[5] || 0;
    const c7 = count[7] || 0;

    const count8 = Math.floor(c2 / 3);
    const rem2 = c2 % 3;
    const count9 = Math.floor(c3 / 2);
    let count3 = c3 % 2;
    let count4 = Math.floor(rem2 / 2);
    let count2 = rem2 % 2;
    let count6 = 0;

    if (count2 === 1 && count3 === 1) {
      count2 = 0;
      count3 = 0;
      count6 = 1;
    }
    if (count3 === 1 && count4 === 1) {
      count2 = 1;
      count6 = 1;
      count3 = 0;
      count4 = 0;
    }

    return {
      2: count2,
      3: count3,
      4: count4,
      5: c5,
      6: count6,
      7: c7,
      8: count8,
      9: count9
    };
  }

  function sumValues(factors) {
    let sum = 0;
    for (let d = 2; d <= 9; d++) sum += factors[d] || 0;
    return sum;
  }

  function construct(factors) {
    let res = "";
    for (let d = 2; d <= 9; d++) {
      if (factors[d]) res += String(d).repeat(factors[d]);
    }
    return res;
  }

  function subtract(a, b) {
    const res = { ...a };
    for (const [k, v] of Object.entries(b)) {
      res[k] = Math.max(0, (res[k] || 0) - v);
    }
    return res;
  }

  function isSubset(req, cur) {
    for (const p of [2, 3, 5, 7]) {
      if ((cur[p] || 0) < (req[p] || 0)) return false;
    }
    return true;
  }

  const factorCount = getFactorCount(primeCount);
  const minDigits = sumValues(factorCount);
  if (minDigits > num.length) {
    return construct(factorCount);
  }

  const primeCountPrefix = { 2: 0, 3: 0, 5: 0, 7: 0 };
  for (let i = 0; i < num.length; i++) {
    const d = Number(num[i]);
    const fc = FACTOR_COUNTS[d];
    for (const [p, cnt] of Object.entries(fc)) {
      primeCountPrefix[p] += cnt;
    }
  }

  let firstZeroIndex = num.indexOf('0');
  if (firstZeroIndex === -1) {
    firstZeroIndex = num.length;
    if (isSubset(primeCount, primeCountPrefix)) {
      return num;
    }
  }

  let curPrefix = { ...primeCountPrefix };
  const n = num.length;
  for (let i = n - 1; i >= 0; i--) {
    const d = Number(num[i]);
    curPrefix = subtract(curPrefix, FACTOR_COUNTS[d]);
    const spaceAfter = n - 1 - i;

    if (i > firstZeroIndex) continue;

    for (let bigger = d + 1; bigger <= 9; bigger++) {
      const neededAfterPrefix = subtract(primeCount, curPrefix);
      const needed = subtract(neededAfterPrefix, FACTOR_COUNTS[bigger]);
      const factorsAfter = getFactorCount(needed);
      const sumAfter = sumValues(factorsAfter);

      if (sumAfter <= spaceAfter) {
        const fillOnes = spaceAfter - sumAfter;
        return (
          num.slice(0, i) +
          bigger +
          "1".repeat(fillOnes) +
          construct(factorsAfter)
        );
      }
    }
  }

  const factorsAfterExt = getFactorCount(primeCount);
  const fillOnes = n + 1 - sumValues(factorsAfterExt);
  return "1".repeat(fillOnes) + construct(factorsAfterExt);
};
