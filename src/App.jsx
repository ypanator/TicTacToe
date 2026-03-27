import './App.css'
import { useState } from 'react'

function App() {
  const [cellValues, setCellValues] = useState(
    [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "]
    ]
  );
  const [curSymbol, setCurSymbol] = useState("X");

  function switchCurSymbol() {
    (curSymbol === "X" ? setCurSymbol("O") : setCurSymbol("X"));
  }

  function OnCellClick(id) {
    setCellValues((prev) => {
      const newCellValues = [...prev];
      newCellValues[Math.floor(id / 3)][id % 3] = curSymbol;
      return newCellValues;
    });
    switchCurSymbol();
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
  <div className="test"></div>
  </>
}

export default App