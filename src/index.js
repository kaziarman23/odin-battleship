import createPlayer from "./player.js";

export function initDemo() {
  const player = createPlayer("You", false);
  const computer = createPlayer("CPU", true);

  // Pre-place ships for both sides (deterministic example)
  // e.g. place a length-3 ship horizontally at (0,0),(0,1),(0,2) for player
  player.getGameboard().placeShip(3, [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  player.getGameboard().placeShip(2, [
    [2, 2],
    [3, 2],
  ]);

  // Computer
  computer.getGameboard().placeShip(3, [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  computer.getGameboard().placeShip(2, [
    [5, 5],
    [5, 6],
  ]);

  return { player, computer };
}
