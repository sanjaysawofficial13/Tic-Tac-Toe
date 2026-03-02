let turn = "O";
let total_turn = 0;
let gameOver = false;

let winner = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6]
];

let board_array = new Array(9).fill("E");

const board = document.querySelector(".board");
const winningMessage = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");

function updateActivePlayer() {
  document.getElementById("playerO").classList.remove("active-player");
  document.getElementById("playerX").classList.remove("active-player");

  if (turn === "O") {
    document.getElementById("playerO").classList.add("active-player");
  } else {
    document.getElementById("playerX").classList.add("active-player");
  }
}

updateActivePlayer();


function checkWinner() {
  for (let [a, b, c] of winner) {
    if (
      board_array[a] !== "E" &&
      board_array[a] === board_array[b] &&
      board_array[b] === board_array[c]
    ) {
      return true;
    }
  }
  return false;
}

const printer = (event) => {

  if (gameOver) return; 

  const element = event.target;


  if (!element.classList.contains("cell")) return;

  let index = Number(element.id);

  if (board_array[index] !== "E") return;

  element.textContent = turn;
  board_array[index] = turn;
  total_turn++;


  if (checkWinner()) {
    winningMessage.textContent = "Winner is " + turn ;
    gameOver = true;
    return;
  }

  if (total_turn === 9) {
    winningMessage.textContent = "Match is Drawn";
    gameOver = true;
    return;
  }

  turn = turn === "O" ? "X" : "O";
  updateActivePlayer();
};


board.addEventListener("click", printer);

restartButton.addEventListener("click", () => {


  document.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
  });


  turn = "O";
  total_turn = 0;
  gameOver = false;
  board_array.fill("E");


  winningMessage.textContent = "";


  updateActivePlayer();
});
