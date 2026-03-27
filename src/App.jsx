import './App.css'
import { useState } from 'react'

function App() {
  const PLAYING = 0, WONX = 1, WONO = 2, DRAW = 3;
  const emptyCells = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ]
  

  const [cellValues, setCellValues] = useState(structuredClone(emptyCells));
  const [curSymbol, setCurSymbol] = useState("X");
  const [state, setState] = useState(PLAYING);

  function switchCurSymbol() {
    (curSymbol === "X" ? setCurSymbol("O") : setCurSymbol("X"));
  }

  function calcState(symbol) {
    for (let i = 0; i < 3; i++) {
      if ((
        cellValues[i][0] === symbol && 
        cellValues[i][1] === symbol && 
        cellValues[i][2] === symbol
      ) || (
        cellValues[0][i] === symbol && 
        cellValues[1][i] === symbol && 
        cellValues[2][i] === symbol
      )) {
        return symbol === "X" ? WONX : WONO;
      }
    }

    if ((
      cellValues[0][0] === symbol && 
      cellValues[1][1] === symbol && 
      cellValues[2][2] === symbol
    ) || (
      cellValues[0][2] === symbol && 
      cellValues[1][1] === symbol && 
      cellValues[2][0] === symbol
    )) {
      return symbol === "X" ? WONX : WONO;
    }

    if (cellValues.flat().filter(x => x === " ").length === 0) {
      return DRAW;
    }

    return PLAYING;
  }

  function OnCellClick(id) {
    setCellValues((prev) => {
      const newCellValues = [...prev];
      newCellValues[Math.floor(id / 3)][id % 3] = curSymbol;
      return newCellValues;
    });
    switchCurSymbol();
    setState(calcState(curSymbol));
  }

  return <>
  <div className="GameBoard">
    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((cell) => (
      <div 
        className="GameBoardCell" 
        key={cell} 
        id={cell} 
        onClick={() => OnCellClick(cell)}
      >
        {cell}
      </div>
    ))}
  </div>
  {
    (state === WONO || state === WONX || state === DRAW) && <div>
      {state === DRAW ? "Draw" : state === WONO ? "O wins" : "X wins"}
    </div>
  }
  <button onClick={() => {
    setCellValues(structuredClone(emptyCells));
    setState(PLAYING);
    setCurSymbol("X");
  }}>
    reset
  </button>
  </>
}

export default App