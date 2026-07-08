type Level = {
  easy: number;
  medium: number;
  hard: number;
};

export default class Sudoku {
  static size: number = 9; // CONFIG
  originalBoard: number[][] = [];
  currentBoard: number[][] = [];
  history: number[][][] = [];
  historyIndex: number = 0;
  level: number = 0;
  
  constructor(level: number = 20) {
    this.level = level;
  }
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
  isValidElement(row: number, col: number, num: number, board: number[][]): boolean {
    for (let x = 0; x < Sudoku.size; x++) {
      if (board[row][x] === num) {
        return false;
      }
    }
    for (let x = 0; x < Sudoku.size; x++) {
      if (board[x][col] === num) {
        return false;
      }
    }
    const startRow = row - (row % Math.sqrt(Sudoku.size)); // size should be from CONFIG
    const startCol = col - (col % Math.sqrt(Sudoku.size));
    for (let i = startRow; i < startRow + Math.sqrt(Sudoku.size); i++) {
      for (let j = startCol; j < startCol + Math.sqrt(Sudoku.size); j++) {
        if (board[i][j] === num) {
          return false;
        }
      }
    }
    return true;
  }
  solveSudoku(): boolean {
    for (let row = 0; row < Sudoku.size; row++) {
      for (let col = 0; col < Sudoku.size; col++) {
        if (this.originalBoard[row][col] === 0) {
          for (let num = 1; num <= Sudoku.size; num++) {
            if (this.isValidElement(row, col, num, this.originalBoard)) {
              this.originalBoard[row][col] = num;
              if (this.solveSudoku()) {
                return true;
              }
              this.originalBoard[row][col] = 0;
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
      this.originalBoard = this.generateBoard();
      const shuffled = this.shuffledNumbers();
      for (let col = 0; col < Sudoku.size; col++) {
        this.originalBoard[0][col] = shuffled[col];
      }
      solved = this.solveSudoku();
    }
  }
  removeElements(count: number): void {
    let removed = 0;
    while (removed < count) {
      const row = Math.floor(Math.random() * Sudoku.size);
      const col = Math.floor(Math.random() * Sudoku.size);
      if (this.originalBoard[row][col] !== 0) {
        this.originalBoard[row][col] = 0;
        removed++;
      }
    }
  }
  updateCell(row: number, col: number, num: number): boolean {
    if (this.isValidElement(row, col, num, this.currentBoard)) {
      this.history = this.history.slice(0, this.historyIndex + 1);
      this.history.push(this.deepCopyBoard(this.currentBoard));
      this.historyIndex++;
      this.currentBoard[row][col] = num;
      return true;
    }
    return false;
  }

  undo(): void {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.currentBoard = this.deepCopyBoard(this.history[this.historyIndex]);
    }
  }

  reset(): void {
    this.currentBoard = this.deepCopyBoard(this.originalBoard);
    this.history = [];
    this.historyIndex = 0;
  }

  eraseCell(row: number, col: number): void {
    this.history = this.history.slice(0, this.historyIndex + 1);
    this.history.push(this.deepCopyBoard(this.currentBoard));
    this.historyIndex++;
    this.currentBoard[row][col] = 0;
  }

  isCompleted(): boolean {
    for (let row = 0; row < Sudoku.size; row++) {
      for (let col = 0; col < Sudoku.size; col++) {
        if (this.currentBoard[row][col] === 0) {
          return false;
        }
      }
    }
    return true;
  }

  timer(): void {
    // Implement timer logic here
  }

  rank(): void {
    // Implement ranking logic here
  }

  private deepCopyBoard(board: number[][]): number[][] {
    return board.map((row) => [...row]);
  }

  initialize(): void {
    this.currentBoard = this.deepCopyBoard(this.originalBoard);
    this.fillBoard();
    this.removeElements(this.level); // Default to easy level
  }
}
