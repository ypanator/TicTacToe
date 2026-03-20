import './App.css'

function App() {
  const [cellValues, setCellValues] = useState([]);

  function OnCellClick(cell) {
    console.log(cell);
  }

  return <>
  <div className="GameBoard">
    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((cell) => (
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