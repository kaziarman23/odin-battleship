import createGameboard from "../src/gameboard.js";

describe("Gameboard public behavior", () => {
  test("placeShip places ship and hasShipAt reports correctly", () => {
    const gb = createGameboard();
    gb.placeShip(2, [
      [0, 0],
      [0, 1],
    ]);
    expect(gb.hasShipAt([0, 0])).toBe(true);
    expect(gb.hasShipAt([0, 1])).toBe(true);
    expect(gb.hasShipAt([1, 1])).toBe(false);
  });

  test("receiveAttack hits and misses recorded correctly", () => {
    const gb = createGameboard();
    gb.placeShip(2, [
      [0, 0],
      [0, 1],
    ]);

    const res1 = gb.receiveAttack([0, 0]);
    expect(res1.result).toBe("hit");
    expect(gb.getMisses()).toEqual([]);

    const res2 = gb.receiveAttack([5, 5]);
    expect(res2.result).toBe("miss");
    expect(gb.getMisses()).toEqual([[5, 5]]);
  });

  test("can't hit same coordinate twice (returns 'already')", () => {
    const gb = createGameboard();
    gb.placeShip(2, [
      [0, 0],
      [0, 1],
    ]);

    expect(gb.receiveAttack([0, 0]).result).toBe("hit");
    const second = gb.receiveAttack([0, 0]);
    expect(second.result).toBe("already");
    expect(second.reason).toBe("hit");
  });

  test("allShipsSunk returns true only when all ships sunk", () => {
    const gb = createGameboard();
    gb.placeShip(2, [
      [0, 0],
      [0, 1],
    ]);
    gb.placeShip(1, [[5, 5]]);

    // hit some but not all
    gb.receiveAttack([0, 0]);
    expect(gb.allShipsSunk()).toBe(false);

    // sink first ship
    gb.receiveAttack([0, 1]);
    expect(gb.allShipsSunk()).toBe(false);

    // sink last
    gb.receiveAttack([5, 5]);
    expect(gb.allShipsSunk()).toBe(true);
  });
});
