import React from 'react'
import Sudoku from '../engine/Sudoku';

type Value = {
    cellIndex: number;
    rowIndex: number;
    value: number;
}

export default function Board() {
    const [board, setBoard] = React.useState<number[][]>([]);
    const [value, setValue] = React.useState<Value | null>(null);
    const sudoku = new Sudoku();
    sudoku.initialize();
    React.useEffect(() => {
        setBoard(sudoku.boardArray);
    }, []);
    React.useEffect(() => {
        const test = sudoku.isValidElement(value?.rowIndex || 0, value?.cellIndex || 0, value?.value || 0);
        console.log(test);
    }, [value])
  return (
    <div>
        {board.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: 'flex' }}>
                {row.map((cell, cellIndex) => (
                    <div
                        contentEditable
                        suppressContentEditableWarning
                        key={cellIndex}
                        style={{ width: '40px', height: '40px', border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onInput={(e) => {
                            const newValue = e.currentTarget.textContent;
                            if (newValue && !isNaN(parseInt(newValue)) && parseInt(newValue) >= 1 && parseInt(newValue) <= 9) {
                                setValue({ cellIndex, rowIndex, value: parseInt(newValue) });
                            }
                        }}
                    >
                        {cell === 0 ? '' : cell}
                    </div>
                ))}
            </div>
        ))}
    </div>
  )
}
