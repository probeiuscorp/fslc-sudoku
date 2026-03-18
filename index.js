// system for interacting with boards
let _ = undefined;
const initialBoard = {
  __cells: [
    _, _, _,  6, _, _,  1, _, 2,
    5, 8, 3,  _, 1, _,  _, _, _,
    _, _, _,  _, 3, _,  _, _, 8,

    2, _, _,  _, _, 7,  6, _, 3,
    6, _, 8,  3, _, 2,  _, _, _,
    _, 3, 1,  _, _, 8,  4, _, _,

    _, _, 4,  _, _, _,  8, _, _,
    7, 6, _,  8, _, _,  3, 4, _,
    _, 1, _,  4, _, _,  _, _, _,
  ],
  // TODO: add __initialCells, a set of which indices (in row-major)
  // that were initially filled out and so should not be changed in
  // the withDifferentCell function (you should make that code change too!)
}
initialBoard.__initialCells = new Set()
for (let i = 0; i < 81; i++) {
  if (initialBoard.__cells[i] != _){
    initialBoard.__initialCells.add(i)
  }
}

// users of boards should only use these functions
function getRowMajor(board) {
  return board.__cells;
}
function getRows(board) {
  return Array.from({ length: 9 }, (_, i) => {
    return board.__cells.slice(i * 9, (i + 1) * 9);
  });
}
// TODO: Implement getColumns and get3x3s. They should return an array of arrays
function getColumns(board) {
  // return something like [[_, 5, _, 2, 6, _, _, 7, _], ...]
  return [];
}
function get3x3s(board) {
  // return something like [[_, _, _, 5, 8, 3, _, _, _], ...]
  return [];
}
function withDifferentCell(board, icol, irow, digit) {
  const copy = board.__cells.slice();
  copy[icol + irow * 9] = digit;
  return { __cells: copy };
}

// system for showing boards
function writeBoardToDocument(node, board) {
  const grid = document.createElement('div');
  grid.className = 'sudoku-grid';
  getRowMajor(board).forEach((digit, i) => {
    const cell = document.createElement('div');
    cell.tabIndex = 0;
    cell.dataset.icol = i % 9;
    cell.dataset.irow = i / 9 | 0;
    cell.className = 'sudoku-cell';
    if (initialBoard.__initialCells.has(i)) {
      cell.classList.add('original-cell')
    }
    if (digit !== undefined) {
      cell.innerHTML = digit;
    }
    grid.appendChild(cell);
  });
  node.replaceChildren(grid);
}
const superContainer = document.getElementById('game-board');
function notifyNewBoard(board) {
  checkValidityOfBoard(board);
  writeBoardToDocument(superContainer, board);
}
notifyNewBoard(initialBoard);

// system for handling events
let currentBoard = initialBoard;
superContainer.addEventListener('keydown', (e) => {
  const maybeDigit = +e.key;
  const targetCell = e.target;
  if (!isNaN(maybeDigit) && targetCell.dataset.icol) {
    const icol = +targetCell.dataset.icol;
    const irow = +targetCell.dataset.irow;
    const newBoard = withDifferentCell(currentBoard, icol, irow, maybeDigit);
    currentBoard = newBoard;
    notifyNewBoard(currentBoard);
  }
});

// system to validate board
function isValidSudokuBoard(board) {
  // TODO: determine validity of game board
  return true;
}
function checkValidityOfBoard(board) {
  if (!isValidSudokuBoard(board)) {
    superContainer.classList.add('board-invalid');
  } else {
    superContainer.classList.remove('board-invalid');
  }
}
