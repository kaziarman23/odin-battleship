import createPlayer from "../src/player.js";

describe("Player public interface", () => {
  test("player has an own gameboard", () => {
    const p = createPlayer("TestPlayer", false);
    const gb = p.getGameboard();
    expect(typeof gb.placeShip).toBe("function");
  });

  test("attack delegates to opponent gameboard", () => {
    const p1 = createPlayer("P1", false);
    const p2 = createPlayer("P2", false);

    p2.getGameboard().placeShip(1, [[4, 4]]);
    const result = p1.attack(p2.getGameboard(), [4, 4]);
    expect(result.result).toBe("hit");
  });

  test("computer makeRandomMove makes legal move and doesn't throw if moves remain", () => {
    const cpu = createPlayer("CPU", true);
    const human = createPlayer("Human", false);

    // fill human with a couple of ships so board isn't empty — not required but realistic
    human.getGameboard().placeShip(2, [
      [0, 0],
      [0, 1],
    ]);

    const move = cpu.makeRandomMove(human.getGameboard(), { rows: 6, cols: 6 });
    expect(Array.isArray(move.coord)).toBe(true);
    expect(["miss", "hit", "already"]).toContain(move.result.result);
  });

  test("non-computer cannot call makeRandomMove", () => {
    const p = createPlayer("Nope", false);
    expect(() =>
      p.makeRandomMove(createPlayer("other", false).getGameboard())
    ).toThrow();
  });
});
