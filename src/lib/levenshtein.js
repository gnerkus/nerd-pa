/**
 * Compute the levenshtein distance between two words and return the result.
 * @param  {String} first  The first word
 * @param  {String} second The second word
 * @return {Number}        The levenshtein distance between both words
 */
function levenshtein(first, second) {
  // Quick checks to avoid redundant computation
  if (first === second) {
    return 0;
  } else if (first.length === 0) {
    return second.length;
  } else if (second.length === 0) {
    return first.length;
  }

  // Create matrix row to hold temp computation of distances from first
  let VEC_ONE = (new Array(second.length + 1)).fill(0);
  // Create matrix row to hold final computation of distances from first
  const VEC_TWO = (new Array(second.length + 1)).fill(0);

  // Initialize VEC_ONE
  VEC_ONE = VEC_ONE.map((elem, idx) => idx);

  // Iterate through each character of the first word
  first.split('').forEach((element, index) => {
    // Reset the values of VEC_TWO. Previous values were stored in VEC_ONE
    VEC_TWO[0] = index + 1;

    second.split('').forEach((elem, idx) => {
      // Compute the cost
      const COST = first[index] === second[idx] ? 0 : 1;

      // Update the values in VEC_TWO
      VEC_TWO[idx + 1] = Math.min(VEC_TWO[idx] + 1, VEC_ONE[idx + 1] + 1, COST + VEC_ONE[idx]);
    });

    VEC_ONE = VEC_TWO.slice();
  });

  return VEC_TWO[second.length];
}

export default levenshtein;
