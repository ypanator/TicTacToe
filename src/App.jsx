import './App.css'
import { useState } from 'react'

function App() {
  const PLAYING = 0, WON_X = 1, WON_O = 2, DRAW = 3;
  const X = "X", O = "O", EMPTY = " ";
  
  const [cellValues, setCellValues] = useState(
    [
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY]
    ]
  );
  const [curSymbol, setCurSymbol] = useState(X);
  const [gameState, setGameState] = useState(PLAYING);
  const [infoBoxRender, setInfoBoxRender] = useState(false);
  const [infoBoxText, setInfoBoxText] = useState("");

  // aparently useEffect is not necessary here *shrug*
  if (gameState === PLAYING) {
    setInfoBoxRender(false)
  } else {
    setInfoBoxRender(true);
    if (gameState === WON_O) {
      setInfoBoxText("O wins");
    }
    if (gameState === WON_X) {
      setInfoBoxText("X wins");
    }
    if (gameState === DRAW) {
      setInfoBoxText("Draw");
    }
  }

  function restart() {
    setCellValues(
      [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]
      ]
    );
    setGameState(PLAYING);
    setCurSymbol(X);
  }

  function switchCurSymbol() {
    (curSymbol === X ? setCurSymbol(O) : setCurSymbol(X));
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
        return symbol === X ? WON_X : WON_O;
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
      return symbol === X ? WON_X : WON_O;
    }

    if (cellValues.flat().filter(x => x === EMPTY).length === 0) {
      return DRAW;
    }

    return PLAYING;
  }

  function OnCellClick(id) {
    if (gameState !== PLAYING) return;

    setCellValues((prev) => {
      const newCellValues = [...prev];
      newCellValues[Math.floor(id / 3)][id % 3] = curSymbol;
      return newCellValues;
    });

    switchCurSymbol();
    setGameState(calcState(curSymbol));
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
    infoBoxRender && <div className="InfoBox">{infoBoxText}</div>
  }
  <button onClick={restart}>
    restart
  </button>
  </>
}

export default App