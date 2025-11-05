import createShip from "./ship.js";

/**
 * Coordinates representation:
 * - A coordinate is an array [row, col] where row and col are integers >= 0.
 * - Internally we stringify to "r,c" to index maps.
 *
 * Public methods:
 * - placeShip(length, coordsArray) -> places a ship at explicit coordinates
 * - receiveAttack(coord) -> { result: 'hit'|'miss'|'already' , ship? }
 * - getMisses() -> array of coords
 * - allShipsSunk() -> boolean
 * - getShips() -> array of ship metadata (for rendering/tests)
 */

function coordToKey([r, c]) {
  return `${r},${c}`;
}

export default function createGameboard() {
  // Map from coordKey -> { ship, indexInShipCoords } so we can dispatch hits
  const coordMap = new Map();
  const ships = []; // each ship entry: { ship, coords: [[r,c], ...], hits: Set(coordKey) }
  const misses = new Set();

  function placeShip(length, coordsArray) {
    if (!Array.isArray(coordsArray) || coordsArray.length !== length) {
      throw new Error(
        "coordsArray must be array with length equal to ship length"
      );
    }

    // Validate coordinates are unique and not overlapping existing ships
    const keys = coordsArray.map(coordToKey);
    const uniqueKeys = new Set(keys);
    if (uniqueKeys.size !== keys.length) {
      throw new Error("duplicate coordinates in coordsArray");
    }

    for (const k of keys) {
      if (coordMap.has(k)) {
        throw new Error("cannot place ship over existing ship");
      }
    }

    const ship = createShip(length);
    const shipRecord = {
      ship,
      coords: coordsArray.map((c) => [c[0], c[1]]),
      hits: new Set(),
    };
    ships.push(shipRecord);

    // Register coordinates
    keys.forEach((k, idx) => {
      coordMap.set(k, { shipRecord, idx });
    });

    return shipRecord;
  }

  function receiveAttack(coord) {
    const key = coordToKey(coord);
    // Already missed here
    if (misses.has(key)) {
      return { result: "already", reason: "miss" };
    }

    const mapping = coordMap.get(key);
    if (!mapping) {
      misses.add(key);
      return { result: "miss" };
    }

    const { shipRecord } = mapping;

    // check if that coord was already hit (avoid double-hit)
    if (shipRecord.hits.has(key)) {
      return { result: "already", reason: "hit", ship: shipRecord.ship };
    }

    // register hit
    shipRecord.hits.add(key);
    shipRecord.ship.hit();

    return { result: "hit", ship: shipRecord.ship };
  }

  function getMisses() {
    // return array of [r,c]
    return Array.from(misses).map((k) => k.split(",").map(Number));
  }

  function allShipsSunk() {
    return ships.length > 0 && ships.every((s) => s.ship.isSunk());
  }

  function getShips() {
    // Return ship metadata (do not expose internal objects' internals more than needed)
    return ships.map((s) => ({
      coords: s.coords.map((c) => [c[0], c[1]]),
      length: s.ship.length,
      hits: Array.from(s.hits),
    }));
  }

  function hasShipAt(coord) {
    return coordMap.has(coordToKey(coord));
  }

  return {
    placeShip,
    receiveAttack,
    getMisses,
    allShipsSunk,
    getShips,
    hasShipAt,
  };
}
