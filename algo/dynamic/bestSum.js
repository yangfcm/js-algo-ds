/**
 * Write a function bestSum(target, numbers) that takes in a target sum and an array of numbers as arguments
 * The function should return an array containing the shortest combination of numbers that add up to exactly the target sum.
 * If there is more than one shortest combinations, return any one of them.
 * You may use an element of the array as many times as needed.
 * Assum all input numbers are non-negative.
 */
function solution1(target, numbers) {
  if (target === 0) return [];
  if (target < 0) return null;

  let shortestCombination = null;

  for (let num of numbers) {
    const remainder = target - num;
    const remainderCombination = solution1(remainder, numbers);
    if (remainderCombination !== null) {
      const combination = [...remainderCombination, num];
      if (
        shortestCombination === null ||
        combination.length < shortestCombination.length
      ) {
        shortestCombination = combination;
      }
    }
  }

  return shortestCombination;
}

function solution2(target, numbers, memo = {}) {
  if (target in memo) return memo[target];
  if (target === 0) return [];
  if (target < 0) return null;

  let shortestCombination = null;

  for (let num of numbers) {
    const remainder = target - num;
    const remainderCombination = solution2(remainder, numbers, memo);
    if (remainderCombination !== null) {
      const combination = [...remainderCombination, num];
      if (
        shortestCombination === null ||
        combination.length < shortestCombination.length
      ) {
        shortestCombination = combination;
      }
    }
  }

  memo[target] = shortestCombination;

  return shortestCombination;
}

function solution3(target, numbers) {
  const sumArr = new Array(target + 1).fill(null);
  sumArr[0] = [];
  for (let i = 0; i <= target; i++) {
    if (sumArr[i] !== null) {
      for (let num of numbers) {
        const combination = [...sumArr[i], num];
        if (!sumArr[i + num] || combination.length < sumArr[i + num].length) {
          sumArr[i + num] = combination;
        }
      }
    }
  }
  return sumArr[target];
}

module.exports = { solution1, solution2, solution3 };
