import createGameboard from "./gameboard.js";

/**
 * Player factory
 * - name: string
 * - isComputer: boolean
 *
 * Public methods:
 * - getGameboard()
 * - attack(opponentGameboard, coord)  // for real player
 * - makeRandomMove(opponentGameboard) // for computer (returns move coord + result)
 */

export default function createPlayer(name = "Player", isComputer = false) {
  const gameboard = createGameboard();
  const attempted = new Set(); // for computer move bookkeeping

  function getGameboard() {
    return gameboard;
  }

  function _coordKey([r, c]) {
    return `${r},${c}`;
  }

  function attack(opponentGameboard, coord) {
    // Delegates to opponent's gameboard.receiveAttack
    return opponentGameboard.receiveAttack(coord);
  }

  function makeRandomMove(opponentGameboard, bounds = { rows: 10, cols: 10 }) {
    // bounds default 10x10 grid (rows x cols). Ensures not trying same move twice.
    if (!isComputer) {
      throw new Error("makeRandomMove should only be used by computer players");
    }

    // simple random generator avoiding previous tries
    let attempts = 0;
    while (attempts < bounds.rows * bounds.cols) {
      const r = Math.floor(Math.random() * bounds.rows);
      const c = Math.floor(Math.random() * bounds.cols);
      const key = _coordKey([r, c]);
      if (!attempted.has(key)) {
        attempted.add(key);
        const result = opponentGameboard.receiveAttack([r, c]);
        return { coord: [r, c], result };
      }
      attempts += 1;
    }

    throw new Error("no legal moves remaining");
  }

  return {
    name,
    isComputer,
    getGameboard,
    attack,
    makeRandomMove,
  };
}
