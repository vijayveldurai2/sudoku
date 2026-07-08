import React from "react";
import Sudoku from "../engine/Sudoku";
import Keys from "./Keys";

type Value = {
  cellIndex: number;
  rowIndex: number;
  value: number;
};

export default function Board() {
  const [board, setBoard] = React.useState<number[][]>([]);
  const [value, setValue] = React.useState<Value>({
    cellIndex: 0,
    rowIndex: 0,
    value: 0,
  });
  const [selectedCell, setSelectedCell] = React.useState<string | null>(null);
  const sudoku = React.useMemo(() => new Sudoku(), []);

  React.useEffect(() => {
    sudoku.initialize();
    setBoard(sudoku.boardArray.map((row) => [...row]));
  }, [sudoku]);

  React.useEffect(() => {
    if (value.value !== 0) {
      const updated = sudoku.updateCell(
        value.rowIndex,
        value.cellIndex,
        value.value
      );
      if (updated) {
        setBoard(sudoku.boardArray.map((row) => [...row]));
      }
    }
  }, [sudoku, value]);
  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    setValue({ ...value, rowIndex, cellIndex });
    setSelectedCell(`${rowIndex}-${cellIndex}`);
    console.log(`Cell clicked at row ${rowIndex}, column ${cellIndex}`);
  };
  return (
    <>
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <div
              className={`cell ${selectedCell === `${rowIndex}-${cellIndex}` ? "selected" : ""}`}
              key={cellIndex}
              onClick={() => {
                handleCellClick(rowIndex, cellIndex);
              }}
            >
              {cell === 0 ? "" : cell}
            </div>
          ))}
        </div>
      ))}
    </div>
    <Keys setSelectedKey={(key) => {
      console.log(`Key ${key} clicked`);
      setValue({ ...value, value: key });
    }} />
    </>
  );
}
