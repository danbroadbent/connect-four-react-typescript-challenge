import { useState } from "react";
import { Board, Row } from "../models/board";
import C4Row from "./C4Row";

const numOfCols = 7;
const numOfRows = 6;

const emptyBoard: Board = {
  rows: Array.from({ length: numOfRows }).map(() => {
    return {
      cells: Array.from({ length: numOfCols }).map(() => ({ value: null })),
    };
  }),
};

const capitalizeFirstLetter = (word: string): string => {
  return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
};

const C4Board = () => {
  const [board, setBoard] = useState<Board>(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState<"red" | "yellow">("red");
  const [gameOverMessage, setGameOverMessage] = useState<string>("");
  let playerTurnMessage = `${capitalizeFirstLetter(currentPlayer)}'s turn`;

  const checkHorizontalWin = (board: Board, rowIndex: number): boolean => {
    const row = board.rows[rowIndex];
    let consecutiveChips = 0;
    for (let i = 0; i < numOfCols; i++) {
      if (row.cells[i].value === currentPlayer) {
        consecutiveChips++;
      } else {
        consecutiveChips = 0;
      }
      if (consecutiveChips > 3) {
        return true;
      }
    }
    return false;
  };

  const checkVerticalWin = (board: Board, colIndex: number): boolean => {
    let consecutiveChips = 0;
    for (let i = 0; i < numOfRows; i++) {
      if (board.rows[i].cells[colIndex].value === currentPlayer) {
        consecutiveChips++;
      } else {
        consecutiveChips = 0;
      }
      if (consecutiveChips > 3) {
        return true;
      }
    }
    return false;
  };

  const checkDiagonalDownWin = (
    board: Board,
    colIndex: number,
    rowIndex: number
  ): boolean => {
    let startingRowIndex = 0;
    let startingColumnIndex = 0;
    const distanceFromZero = rowIndex - colIndex;
    if (distanceFromZero > 0) {
      startingRowIndex = distanceFromZero;
    }
    if (distanceFromZero < 0) {
      startingColumnIndex = Math.abs(distanceFromZero);
    }

    let consecutiveChips = 0;
    for (let i = 0; i < numOfRows; i++) {
      if (
        board.rows[startingRowIndex + i]?.cells[startingColumnIndex + i]
          ?.value === currentPlayer
      ) {
        consecutiveChips++;
      } else {
        consecutiveChips = 0;
      }
      if (consecutiveChips > 3) {
        return true;
      }
    }
    return false;
  };

  const checkDiagonalUpWin = (
    board: Board,
    colIndex: number,
    rowIndex: number
  ) => {
    let startingRowIndex = 0;
    let startingColumnIndex = numOfCols;
    const distanceFromZero = rowIndex - (numOfCols - colIndex);
    if (distanceFromZero > 0) {
      startingRowIndex = distanceFromZero;
    }
    if (distanceFromZero < 0) {
      startingColumnIndex = numOfCols - Math.abs(distanceFromZero);
    }

    let consecutiveChips = 0;
    for (let i = 0; i < numOfRows; i++) {
      if (
        board.rows[startingRowIndex + i]?.cells[startingColumnIndex - i]
          ?.value === currentPlayer
      ) {
        consecutiveChips++;
      } else {
        consecutiveChips = 0;
      }
      if (consecutiveChips > 3) {
        return true;
      }
    }
    return false;
  };

  const checkForTie = (board: Board): boolean => {
    let boardFull = true;
    board.rows[0].cells.forEach((cell) => {
      if (!cell.value) {
        boardFull = false;
      }
    });
    return boardFull;
  };

  const checkForWinner = (
    board: Board,
    rowIndex: number,
    colIndex: number
  ): void => {
    const isWinner =
      checkHorizontalWin(board, rowIndex) ||
      checkVerticalWin(board, colIndex) ||
      checkDiagonalDownWin(board, colIndex, rowIndex) ||
      checkDiagonalUpWin(board, colIndex, rowIndex);
    if (isWinner) {
      setGameOverMessage(`${capitalizeFirstLetter(currentPlayer)} won!`);
    }
    if (checkForTie(board)) {
      setGameOverMessage("Draw!");
    }
  };

  const dropChip = (colIndex: number): void => {
    const _board: Board = structuredClone(board);
    let columnFull = false;
    let rowIndex = 0;
    for (let i: number = numOfRows - 1; i >= 0; i--) {
      const cellValue = _board.rows[i].cells[colIndex].value;
      if (!cellValue) {
        _board.rows[i].cells[colIndex].value = currentPlayer;
        rowIndex = i;
        break;
      }
      if (i === 0 && cellValue) {
        columnFull = true;
      }
    }
    if (!columnFull) {
      setBoard(_board);
      setCurrentPlayer((prevState) => (prevState === "red" ? "yellow" : "red"));
      checkForWinner(_board, rowIndex, colIndex);
    }
  };

  const resetGame = (): void => {
    setBoard(emptyBoard);
    setCurrentPlayer("red");
    setGameOverMessage("");
  };

  return (
    <div>
      <h2>{gameOverMessage ? gameOverMessage : playerTurnMessage}</h2>
      <div className="game-controls">
        {gameOverMessage ? (
          <div className="play-again">
            <button onClick={resetGame}>Play Again</button>
          </div>
        ) : (
          Array.from({ length: numOfCols }).map((_, i: number) => (
            <div className="button-container" key={i}>
              <button className="button" onClick={() => dropChip(i)}>
                Drop
              </button>
            </div>
          ))
        )}
      </div>
      <table className="board">
        <tbody>
          {board.rows.map((row: Row, i: number) => (
            <C4Row key={i} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default C4Board;
