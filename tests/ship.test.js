import createShip from "../src/ship.js";

describe("Ship factory / class public interface", () => {
  test("hit() increments hits and isSunk() returns false until enough hits", () => {
    const ship = createShip(3);
    expect(ship.length).toBe(3);
    expect(ship.getHits()).toBe(0);
    expect(ship.isSunk()).toBe(false);

    ship.hit();
    expect(ship.getHits()).toBe(1);
    expect(ship.isSunk()).toBe(false);

    ship.hit();
    ship.hit();
    expect(ship.getHits()).toBe(3);
    expect(ship.isSunk()).toBe(true);

    // Extra hits should not increase beyond length
    ship.hit();
    expect(ship.getHits()).toBe(3);
  });

  test("invalid lengths throw", () => {
    expect(() => createShip(0)).toThrow();
    expect(() => createShip(-1)).toThrow();
    expect(() => createShip("3")).toThrow();
  });
});
