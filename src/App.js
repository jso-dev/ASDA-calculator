import { useEffect, useReducer, useCallback } from 'react';
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

const initialState = {
  previousOperand: null,
  currentOperand: null,
  operation: null,
  overwrite: false
}

function reducer(state, {type, payload}) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        // if true prevents adding additional numbers to the answer of a sum
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }

      if (payload.digit === "0" && state.currentOperand === "0") {
        // prevent more than one 0 at the beginning of an operand
        return state
      }

      if (payload.digit === "." && state.currentOperand?.includes(".")) {
        // prevent more than one . in a number
        return state
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }

    case ACTIONS.CHOOSE_OPERATION:
      // negative numbers solution attempt
      // sums are not evaluating when using decimals.
      // if (state.currentOperand === null && payload.operation === '-') {
        // still issues: -50*2 = 0 not -100
      //   return {
      //     ...state,
      //     currentOperand: '-0'
      //   }
      // }

      // if (payload.operation === '-' && state.operation === '-') {
      //   return {
      //     ...state,
      //     currentOperand: '-0'
      //   }
      // }


      if (state.currentOperand === null && state.previousOperand === null) {
        // if there are no operands return the state unchanged
        return state
      }

      if (state.currentOperand === null) {
        // displayed the operation symbol where there is a prevOperand
        return {
          ...state,
          operation: payload.operation,
        }
      }

      if (state.previousOperand === null) {
        // prepares the state to await the second operand for the equation
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }

      return {
        // all other checks are passed so the currentOperand is set as the previousOperand
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }
    case ACTIONS.CLEAR:
      return initialState
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        // if true, clears the previous answer instead of deleting a single digit from it
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        }
      }

      if (state.currentOperand === null) return state

      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null }
      }

      return {
        // removes the last digit
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      }
    case ACTIONS.EVALUATE:
      if (
        state.operation === null ||
        state.currentOperand === null ||
        state.previousOperand === null
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
    default:
      return state
  }
}

function evaluate({currentOperand, previousOperand, operation}) {
  const prev = parseFloat(previousOperand),
        current = parseFloat(currentOperand)

  if (isNaN(prev) || isNaN(current)) return null

  let evaluation = ""
  
  switch (operation) {
    case "+":
      evaluation = prev + current
      break
    case "-":
        evaluation = prev - current
      break
    case "??":
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

const INTEGER_FORMATTER = new Intl.NumberFormat("en-GB", {
  maximumFractionDigits: 0,
})

function formatOperand(operand) {
  if (operand === null) {
    return
  }

  const [integer, decimal] = operand.split(".")

  if (decimal === undefined) {
    return INTEGER_FORMATTER.format(integer)
  }

  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const keyUpAction = useCallback((e) => {
    if (
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.'
    ) {
      return dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit: e.key}})
    }

    if (
        e.key === '+' ||
        e.key === '-' ||
        e.key === '/' ||
        e.key === '*'
    ) {
      return dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: {operation: e.key === '*' ? 'x' : e.key}})
    }

    if (e.key === 'Enter') {
      return dispatch({type: ACTIONS.EVALUATE})
    }

    if (e.key === 'Backspace') {
      return dispatch({type: ACTIONS.DELETE_DIGIT})
    }

    if (e.key === 'Escape') {
      return dispatch({type: ACTIONS.CLEAR})
    }
    
    return
  }, []);

  useEffect(() => {
    window.addEventListener('keyup', keyUpAction)

    return () => {
      window.removeEventListener('keyup', keyUpAction)
    }
  }, [keyUpAction])


  return (
    <div className="calculator-grid">
      <div className="calculator-screen">
        <div className="previousOperand">
          {(formatOperand(state.previousOperand))} {state.operation}
        </div>
        <div className="currentOperand" role="screen">
          {formatOperand(state.currentOperand) || '0'}
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
        <OperationButton dispatch={dispatch} operation="??">??</OperationButton>

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