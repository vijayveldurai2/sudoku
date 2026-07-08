export default class Sudoku {
  static size: number = 9;
  boardArray: number[][] = [];
  constructor() {}
  generateBoard(): number[][] {
    const board: number[][] = [];
    for (let i = 0; i < Sudoku.size; i++) {
      board[i] = [];
      for (let j = 0; j < Sudoku.size; j++) {
        board[i][j] = 0;
      }
    }
    return board;
  }
  shuffledNumbers(): number[] {
    const numbers: number[] = [];
    for (let i = 1; i <= Sudoku.size; i++) {
      numbers.push(i);
    }
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
  }
  isValidElement(row: number, col: number, num: number): boolean {
    for (let x = 0; x < Sudoku.size; x++) {
      if (this.boardArray[row][x] === num) {
        return false;
      }
    }
    for (let x = 0; x < Sudoku.size; x++) {
      if (this.boardArray[x][col] === num) {
        return false;
      }
    }
    const startRow = row - (row % Math.sqrt(Sudoku.size));
    const startCol = col - (col % Math.sqrt(Sudoku.size));
    for (let i = startRow; i < startRow + Math.sqrt(Sudoku.size); i++) {
      for (let j = startCol; j < startCol + Math.sqrt(Sudoku.size); j++) {
        if (this.boardArray[i][j] === num) {
          return false;
        }
      }
    }
    return true;
  }
  solveSudoku(): boolean {
    for (let row = 0; row < Sudoku.size; row++) {
      for (let col = 0; col < Sudoku.size; col++) {
        if (this.boardArray[row][col] === 0) {
          for (let num = 1; num <= Sudoku.size; num++) {
            if (this.isValidElement(row, col, num)) {
              this.boardArray[row][col] = num;
              if (this.solveSudoku()) {
                return true;
              }
              this.boardArray[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  fillBoard(): void {
    let solved = false;
    while (!solved) {
      this.boardArray = this.generateBoard();
      const shuffled = this.shuffledNumbers();
      for (let col = 0; col < Sudoku.size; col++) {
        this.boardArray[0][col] = shuffled[col];
      }
      solved = this.solveSudoku();
    }
  }
  removeElements(count: number): void {
    let removed = 0;
    while (removed < count) {
      const row = Math.floor(Math.random() * Sudoku.size);
      const col = Math.floor(Math.random() * Sudoku.size);
      if (this.boardArray[row][col] !== 0) {
        this.boardArray[row][col] = 0;
        removed++;
      }
    }
  }
  updateCell(row: number, col: number, num: number): boolean {
    if (this.isValidElement(row, col, num)) {
      this.boardArray[row][col] = num;
      return true;
    }
    return false;
  }

  initialize(): void {
    this.fillBoard();
    this.removeElements(20);
  }
}
