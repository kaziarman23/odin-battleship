# ⚓ Battleship Game (ESM + Jest + Babel)

A test-driven implementation of the classic **Battleship** game — built using **modern JavaScript (ES Modules)** and tested with **Jest** using **Babel** for ESM compatibility.

This project follows the [Odin Project: JavaScript Testing Practice](https://www.theodinproject.com/lessons/javascript-battleship) guidelines and demonstrates clean separation between logic and UI.

---

## 🧩 Features

- **Ship Factory / Class**

  - Tracks length, hits, and sunk status
  - `hit()` increments hits
  - `isSunk()` reports whether a ship is sunk

- **Gameboard Factory**

  - Places ships at specific coordinates
  - Handles attacks with `receiveAttack()`
  - Tracks missed shots
  - Reports when all ships are sunk

- **Player Factory**

  - Each player has their own Gameboard
  - Real players can manually attack
  - Computer player can make random legal moves

- **DOM Controller**

  - Basic helper functions to render boards in the browser
  - Keeps UI and logic separate

- **Fully Tested**
  - Unit tests for all public interfaces using Jest
  - Configured with Babel for ESM support

---

## 🧪 Tech Stack

| Tool                 | Purpose                              |
| -------------------- | ------------------------------------ |
| **JavaScript (ESM)** | Core logic                           |
| **Jest**             | Unit testing framework               |
| **Babel**            | Transpile ESM for Jest compatibility |
| **Node.js**          | Runtime environment                  |

---

## ⚙️ Installation & Usage

1. **Clone this repository**
   ```bash
   git clone https://github.com/kaziarman23/odin-battleship.git
   cd odin-battleship
   ```



2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run tests**

   ```bash
   npm test
   ```

   Jest will automatically run all test suites located in the `/tests` directory.

4. **(Optional) Run in browser**

   * Open `index.html` in your browser after implementing your UI.
   * Logic lives in `src/`, and you can import modules into your DOM controller.

---

## 🧰 Project Structure

```
odin-battleship/
│
├── src/
│   ├── ship.js
│   ├── gameboard.js
│   ├── player.js
│   ├── domController.js
│   └── index.js
│
├── tests/
│   ├── ship.test.js
│   ├── gameboard.test.js
│   └── player.test.js
│
├── babel.config.cjs
├── jest.config.cjs
├── package.json
└── README.md
```

---


### ⚔️ “Fire when ready, Captain!”

Enjoy coding your own Battleship!


