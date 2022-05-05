import { useReducer } from 'react';
import './App.css';
import DigitButton from './components/DigitButton';
import OperationButton from './components/OperationButton';

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate"
}

function reducer(state, {type, payload}) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      if (payload.digit === "." && state.currentOperand?.includes(".")) {
        return state
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }

    case ACTIONS.CHOOSE_OPERATION:
      console.log(state)
      if (state.currentOperand === null && state.previousOperand === null) {
        return state
      }
      if (state.currentOperand === null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        }
      }
      if (state.currentOperand == null) return state
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null }
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      }
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      }
      break
    default:
      return state
  }
}

function evaluate({currentOperand, previousOperand, operation}) {
  const prev = parseFloat(previousOperand),
        current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return ""
  let evaluation = ""
  switch (operation) {
    case "+":
      evaluation = prev + current
      break
    case "-":
        evaluation = prev - current
      break
    case "÷":
        evaluation = prev / current
      break
    case "x":
        evaluation = prev * current
      break
    default:
      return ""
  }
  return evaluation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [{ previousOperand, currentOperand, operation }, dispatch] = useReducer(reducer, {})

  return (
    <div className="calculator-grid">
      <div className="calculator-screen">
        <div className="previousOperand">
          {(formatOperand(previousOperand))} {operation}
        </div>
        <div className="currentOperand">
          {formatOperand(currentOperand)}
        </div>
      </div>
        <button className="span-2" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button> 
        <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
        <OperationButton dispatch={dispatch} operation="+">+</OperationButton>

        <DigitButton dispatch={dispatch} digit="9">9</DigitButton>
        <DigitButton dispatch={dispatch} digit="8">8</DigitButton>
        <DigitButton dispatch={dispatch} digit="7">7</DigitButton>
        <OperationButton dispatch={dispatch} operation="-">-</OperationButton>

        <DigitButton dispatch={dispatch} digit="6">6</DigitButton>
        <DigitButton dispatch={dispatch} digit="5">5</DigitButton>
        <DigitButton dispatch={dispatch} digit="4">4</DigitButton>
        <OperationButton dispatch={dispatch} operation="÷">÷</OperationButton>

        <DigitButton dispatch={dispatch} digit="3">3</DigitButton>
        <DigitButton dispatch={dispatch} digit="2">2</DigitButton>
        <DigitButton dispatch={dispatch} digit="1">1</DigitButton>
        <OperationButton dispatch={dispatch} operation="x">x</OperationButton>

        <DigitButton dispatch={dispatch} digit=".">.</DigitButton>
        <DigitButton dispatch={dispatch} digit="0">0</DigitButton>
        <button className="span-2" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>
  );
}

export default App;