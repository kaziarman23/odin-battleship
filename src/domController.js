// domController.js
// Exports small helper functions to render gameboards and hook click events.
// This module doesn't create DOM elements from scratch for styling — keep that in your HTML/CSS.

export function createBoardElement(boardData, onCellClick) {
  // boardData: object with { rows, cols, getCellInfo(r,c) } or a simple 2D array.
  // onCellClick: (r,c) => void
  const container = document.createElement("div");
  container.classList.add("gameboard-grid");

  for (let r = 0; r < boardData.rows; r++) {
    const rowEl = document.createElement("div");
    rowEl.classList.add("row");
    for (let c = 0; c < boardData.cols; c++) {
      const cell = document.createElement("button");
      cell.classList.add("cell");
      cell.dataset.row = String(r);
      cell.dataset.col = String(c);

      const info = boardData.getCellInfo(r, c);
      // info can contain { hasShip, isHit, isMiss } — you'll decide how to style
      if (info.isHit) {
        cell.textContent = "X";
        cell.classList.add("hit");
      } else if (info.isMiss) {
        cell.textContent = "·";
        cell.classList.add("miss");
      } else {
        cell.textContent = "";
      }

      cell.addEventListener("click", () => {
        onCellClick(r, c);
      });

      rowEl.appendChild(cell);
    }
    container.appendChild(rowEl);
  }

  return container;
}

// A simple renderer that expects a Gameboard object (from this repo)
// and returns rows/cols/getCellInfo implementation for creating a board element.
export function boardDataFromGameboard(
  gameboard,
  rows = 10,
  cols = 10,
  revealShips = false
) {
  return {
    rows,
    cols,
    getCellInfo(r, c) {
      const coord = [r, c];

      // determine if there's a ship and whether it was hit
      const ships = gameboard.getShips(); // returns coords + hits (string keys)
      const key = `${r},${c}`;
      let hasShip = false;
      let isHit = false;

      for (const s of ships) {
        const coords = s.coords.map(([rr, cc]) => `${rr},${cc}`);
        if (coords.includes(key)) {
          hasShip = true;
          if (s.hits && s.hits.includes(key)) {
            isHit = true;
          } else {
            isHit = false;
          }
          break;
        }
      }

      const misses = gameboard.getMisses().map(([mr, mc]) => `${mr},${mc}`);
      const isMiss = misses.includes(key);

      return {
        hasShip: revealShips ? hasShip : false,
        isHit,
        isMiss,
      };
    },
  };
}
