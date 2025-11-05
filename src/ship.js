// Ship factory (ESM)
export default function createShip(length) {
  if (!Number.isInteger(length) || length <= 0) {
    throw new Error("length must be a positive integer");
  }

  let hits = 0;

  return {
    length,
    getHits() {
      return hits;
    },
    hit() {
      // Public interface: increments hit count up to length (can't exceed length)
      if (hits < length) hits += 1;
    },
    isSunk() {
      return hits >= length;
    },
  };
}
