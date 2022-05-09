import "./TicTacToe.css";
import { useState } from "react";
import X from "../assets/x.svg";
import O from "../assets/o.svg";

const TicTacToe = () => {
  const INITIAL_EMPTY = [
    "0_0",
    "0_1",
    "0_2",
    "1_0",
    "1_1",
    "1_2",
    "2_0",
    "2_1",
    "2_2",
  ];

  const INITIAL_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const [lastWin, setLastWin] = useState<String>("");
  const [modalWin, setModalWin] = useState(false);
  const [turn, setTurn] = useState(true);
  const [player, setPlayer] = useState("X");
  const [vsMachine, setVsMachine] = useState(true);
  const [playMachine, setplayMachine] = useState(false);
  const [board, setBoard] = useState<any[]>(INITIAL_BOARD);
  const [empty, setEmpty] = useState<String[]>(INITIAL_EMPTY);

  const handleClick = (e: any) => {
    const position = e.target.id.split("_");
    if (empty.includes(e.target.id) && turn) {
      const index = empty.indexOf(e.target.id);
      const newEmpty = empty.slice();
      newEmpty.splice(index, 1);
      setEmpty(newEmpty);
      const newBoard = board.slice();
      newBoard[position[0]][position[1]] = player;
      setBoard(newBoard);
      const result = handleCheck();
      if (!result) {
        !!vsMachine && setTurn(false);
        !!vsMachine
          ? handleMachine(newBoard, newEmpty)
          : setPlayer(player === "X" ? "O" : "X");
      } else {
        showWin(player);
      }
    }
  };

  const bestPosition = () => {
    const row1 = posibleWin("0_0", "0_1", "0_2");
    const row2 = posibleWin("1_0", "1_1", "1_2");
    const row3 = posibleWin("2_0", "2_1", "2_2");
    const col1 = posibleWin("0_0", "1_0", "2_0");
    const col2 = posibleWin("0_1", "1_1", "2_1");
    const col3 = posibleWin("0_2", "1_2", "2_2");
    const diag1 = posibleWin("0_0", "1_1", "2_2");
    const diag2 = posibleWin("0_2", "1_1", "2_0");
    const position =
      row1 || row2 || row3 || col1 || col2 || col3 || diag1 || diag2;
    return position;
  };

  const posibleWin = (pos1: String, pos2: String, pos3: String) => {
    const first: any = board[+pos1.split("_")[0]][+pos1.split("_")[1]];
    const second: any = board[+pos2.split("_")[0]][+pos2.split("_")[1]];
    const third: any = board[+pos3.split("_")[0]][+pos3.split("_")[1]];

    if (first === second && first !== null) {
      if (third === null) return pos3.split("_");
    } else if (first === third && first !== null) {
      if (second === null) return pos2.split("_");
    } else if (second === third && second !== null) {
      if (first === null) return pos1.split("_");
    }

    return null;
  };

  const generateRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const randomPosition = (newEmpty: any[]) => {
    const randomPosition = generateRandomInt(0, newEmpty.length);
    const position = newEmpty[randomPosition].split("_");
    newEmpty.splice(randomPosition, 1);
    setEmpty(newEmpty);
    return position;
  };

  const handleMachine = (newBoard: any[], newEmpty: any[]) => {
    const position: any = bestPosition();
    if (newEmpty.length > 0) {
      if (position) {
        setTimeout(() => {
          newBoard[position[0]][position[1]] = player === "X" ? "O" : "X";
          const index = newEmpty.indexOf(position.join("_"));
          newEmpty.splice(index, 1);
          setEmpty(newEmpty);
          setBoard(newBoard);
          setplayMachine(!playMachine);
          const win = handleCheck();
          setTurn(true);
          if (win) {
            showWin(player === "X" ? "O" : "X");
          }
        }, 1000);
      } else {
        const random = randomPosition(newEmpty);
        setTimeout(() => {
          newBoard[random[0]][random[1]] = player === "X" ? "O" : "X";
          setBoard(newBoard);
          setplayMachine(!playMachine);
          const win = handleCheck();
          setTurn(true);
          if (win) {
            showWin(player === "X" ? "O" : "X");
          }
        }, 1000);
      }
    }
  };

  const showWin = (winner: String) => {
    setLastWin(winner);
    setModalWin(true);
    setBoard(INITIAL_BOARD);
    setEmpty(INITIAL_EMPTY);
    setTimeout(() => {
      setModalWin(false);
    }, 3000);
  };

  const resetGame = () => {
    setBoard(INITIAL_BOARD);
    setEmpty(INITIAL_EMPTY);
    setTurn(true);
  };

  const handleCheck = () => {
    const row1 = board[0].every((el: any) => el === board[0][0] && el !== null);
    const row2 = board[1].every((el: any) => el === board[1][0] && el !== null);
    const row3 = board[2].every((el: any) => el === board[2][0] && el !== null);
    const col1 = [board[0][0], board[1][0], board[2][0]].every(
      (el: any) => el === board[0][0] && el !== null
    );
    const col2 = [board[0][1], board[1][1], board[2][1]].every(
      (el: any) => el === board[0][1] && el !== null
    );
    const col3 = [board[0][2], board[1][2], board[2][2]].every(
      (el: any) => el === board[0][2] && el !== null
    );
    const diag1 = [board[0][0], board[1][1], board[2][2]].every(
      (el: any) => el === board[0][0] && el !== null
    );
    const diag2 = [board[0][2], board[1][1], board[2][0]].every(
      (el: any) => el === board[0][2] && el !== null
    );

    if (row1 || row2 || row3 || col1 || col2 || col3 || diag1 || diag2) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="tictactoe">
        <div className="title">
          <h2>Tic Tac Toe</h2>
        </div>
        <div className="versus">
          <button onClick={() => setVsMachine(false)} className={`${!vsMachine && 'btn--active'}`}>Player vs Player</button>
          <button onClick={() => setVsMachine(true)} className={`${vsMachine && 'btn--active'}`}>Player vs IA</button>
        </div>
        <div className="buttons">
          <button onClick={resetGame}>Reset</button>
        </div>
        <div className="board">
          <div
            id="0_0"
            className={`cell ${board[0][0] !== null && "active"}`}
            onClick={handleClick}
          >
            {board[0][0] === "X" && <img src={X} alt="X" />}
            {board[0][0] === "O" && <img src={O} alt="X" />}
          </div>
          <div
            id="0_1"
            className={`cell ${board[0][1] !== null && "active"}`}
            onClick={handleClick}
          >
            {board[0][1] === "X" && <img src={X} alt="X" />}
            {board[0][1] === "O" && <img src={O} alt="X" />}
          </div>
          <div
            id="0_2"
            className={`cell ${board[0][2] !== null && "active"}`}
            onClick={handleClick}
          >
            {board[0][2] === "X" && <img src={X} alt="X" />}
            {board[0][2] === "O" && <img src={O} alt="X" />}
          </div>
          <div
            id="1_0"
            className={`cell ${board[1][0] !== null && "active"}`}
            onClick={handleClick}
          >
            {board[1][0] === "X" && <img src={X} alt="X" />}
            {board[1][0] === "O" && <img src={O} alt="X" />}
          </div>
          <div
            id="1_1"
            className={`cell ${board[1][1] !== null && "active"}`}
            onClick={handleClick}
          >
            {board[1][1] === "X" && <img src={X} alt="X" />}
            {board[1][1] === "O" && <img src={O} alt="X" />}
          </div>
          <div
            id="1_2"
            className={`cell ${board[1][2] !== null && "active"}`}
            onClick={handleClick}
          >
            {board[1][2] === "X" && <img src={X} alt="X" />}
            {board[1][2] === "O" && <img src={O} alt="X" />}
          </div>
          <div
            id="2_0"
            className={`cell ${board[2][0] !== null && "active"}`}
            onClick={handleClick}
          >
            {board[2][0] === "X" && <img src={X} alt="X" />}
            {board[2][0] === "O" && <img src={O} alt="X" />}
          </div>
          <div
            id="2_1"
            className={`cell ${board[2][1] !== null && "active"}`}
            onClick={handleClick}
          >
            {board[2][1] === "X" && <img src={X} alt="X" />}
            {board[2][1] === "O" && <img src={O} alt="X" />}
          </div>
          <div
            id="2_2"
            className={`cell ${board[2][2] !== null && "active"}`}
            onClick={handleClick}
          >
            {board[2][2] === "X" && <img src={X} alt="X" />}
            {board[2][2] === "O" && <img src={O} alt="X" />}
          </div>
        </div>
      </div>

      {modalWin && (
        <div className="modalWin">
          <h3>{lastWin} Wins this match!!!</h3>
        </div>
      )}
    </>
  );
};

export default TicTacToe;
