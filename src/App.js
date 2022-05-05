import './App.css';

function App() {
  return (
    <div className="calculator-grid">
      <div className="calculator-screen">
        <div className="previousOperand">
          12,345 /
        </div>
        <div className="currentOperand">
          67,890
        </div>
      </div>
        <button className="span-2">AC</button> 
        <button>DEL</button>
        <button>+</button>

        <button>9</button>
        <button>8</button>
        <button>7</button>
        <button>-</button>

        <button>6</button>
        <button>5</button>
        <button>4</button>
        <button>/</button>

        <button>3</button>
        <button>2</button>
        <button>1</button>
        <button>x</button>

        <button>.</button>
        <button>0</button>
        <button className="span-2">=</button>


    </div>
  );
}

export default App;