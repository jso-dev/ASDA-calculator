import {render, screen} from '@testing-library/react'
import App from './App'
import { act } from 'react-dom/test-utils'

const operand1 = '8',
    operand2 = '5'

test('Addition digit test', () => {
    // Arrange
    render(<App />)

    const button1 = screen.getByRole('button', {name: operand1})
    const button2 = screen.getByRole('button', {name: '+'})
    const button3 = screen.getByRole('button', {name: operand2})
    const evaluate = screen.getByRole('button', {name: '='})
    const result = screen.getByRole('screen', {role: 'screen'})
    const expectedResult = (parseFloat(operand1) + parseFloat(operand2)).toString()

    // Act
    act(()=> {
        button1.click()
        button2.click()
        button3.click()
        evaluate.click()
    })

    // Assertion
    expect(result.textContent).toBe(expectedResult)
})

test('Addition decimal test', () => {
    // Arrange
    render(<App />)
    const button1 = screen.getByRole('button', {name: operand1})
    const button2 = screen.getByRole('button', {name: '+'})
    const button3 = screen.getByRole('button', {name: operand2})
    const decimalButton = screen.getByRole('button', {name: '.'})
    const evaluate = screen.getByRole('button', {name: '='})
    const result = screen.getByRole('screen', {role: 'screen'})
    const expectedResult = (parseFloat(`${operand1}.${operand2}`) + parseFloat(`${operand2}.${operand1}`)).toString()

    // Act
    act(()=> {
        button1.click()
        decimalButton.click()
        button3.click()

        button2.click()

        button3.click()
        decimalButton.click()
        button1.click()
        evaluate.click()
    })

    // Assertion
    expect(result.textContent).toBe(expectedResult)
})

test('Subtraction digit test', () => {
    // Arrange
    render(<App />)
    const button1 = screen.getByRole('button', {name: operand1})
    const button2 = screen.getByRole('button', {name: '-'})
    const button3 = screen.getByRole('button', {name: operand2})
    const evaluate = screen.getByRole('button', {name: '='})
    const result = screen.getByRole('screen', {role: 'screen'})
    const expectedResult = (parseFloat(operand1) - parseFloat(operand2)).toString()

    // Act
    act(()=> {
        button1.click()
        button2.click()
        button3.click()
        evaluate.click()
    })

    // Assertion
    expect(result.textContent).toBe(expectedResult)
})

test('Subtraction decimal test', () => {
    // Arrange
    render(<App />)
    const button1 = screen.getByRole('button', {name: operand1})
    const button2 = screen.getByRole('button', {name: '-'})
    const button3 = screen.getByRole('button', {name: operand2})
    const decimalButton = screen.getByRole('button', {name: '.'})
    const evaluate = screen.getByRole('button', {name: '='})
    const result = screen.getByRole('screen', {role: 'screen'})
    const expectedResult = (parseFloat(`${operand1}.${operand2}`) - parseFloat(`${operand2}.${operand1}`)).toString()


    // Act
    act(()=> {
        button1.click()
        decimalButton.click()
        button3.click()

        button2.click()

        button3.click()
        decimalButton.click()
        button1.click()
        evaluate.click()
    })

    // Assertion
    expect(result.textContent).toBe(expectedResult)
})

test('Division digit test', () => {
    // Arrange
    render(<App />)
    const button1 = screen.getByRole('button', {name: operand1})
    const button2 = screen.getByRole('button', {name: '÷'})
    const button3 = screen.getByRole('button', {name: operand2})
    const evaluate = screen.getByRole('button', {name: '='})
    const result = screen.getByRole('screen', {role: 'screen'})
    const expectedResult = (parseFloat(operand1) / parseFloat(operand2)).toString()

    // Act
    act(()=> {
        button1.click()
        button2.click()
        button3.click()
        evaluate.click()
    })

    // Assertion
    expect(result.textContent).toBe(expectedResult)
})

test('Division decimal test', () => {
    // Arrange
    render(<App />)
    const button1 = screen.getByRole('button', {name: operand1})
    const button2 = screen.getByRole('button', {name: '÷'})
    const button3 = screen.getByRole('button', {name: operand2})
    const decimalButton = screen.getByRole('button', {name: '.'})
    const evaluate = screen.getByRole('button', {name: '='})
    const result = screen.getByRole('screen', {role: 'screen'})
    const expectedResult = (parseFloat(`${operand1}.${operand2}`) / parseFloat(`${operand2}.${operand1}`)).toString()


    // Act
    act(()=> {
        button1.click()
        decimalButton.click()
        button3.click()

        button2.click()

        button3.click()
        decimalButton.click()
        button1.click()
        evaluate.click()
    })

    // Assertion
    expect(result.textContent).toBe(expectedResult)
})

test('Mutiplication digit test', () => {
    // Arrange
    render(<App />)
    const button1 = screen.getByRole('button', {name: operand1})
    const button2 = screen.getByRole('button', {name: 'x'})
    const button3 = screen.getByRole('button', {name: operand2})
    const evaluate = screen.getByRole('button', {name: '='})
    const result = screen.getByRole('screen', {role: 'screen'})
    const expectedResult = (parseFloat(operand1) * parseFloat(operand2)).toString()

    // Act
    act(()=> {
        button1.click()
        button2.click()
        button3.click()
        evaluate.click()
    })

    // Assertion
    expect(result.textContent).toBe(expectedResult)
})

test('Mutiplication decimal test', () => {
    // Arrange
    render(<App />)
    const button1 = screen.getByRole('button', {name: operand1})
    const button2 = screen.getByRole('button', {name: 'x'})
    const button3 = screen.getByRole('button', {name: operand2})
    const decimalButton = screen.getByRole('button', {name: '.'})
    const evaluate = screen.getByRole('button', {name: '='})
    const result = screen.getByRole('screen', {role: 'screen'})
    const expectedResult = (parseFloat(`${operand1}.${operand2}`) * parseFloat(`${operand2}.${operand1}`)).toString()

    // Act
    act(()=> {
        button1.click()
        decimalButton.click()
        button3.click()

        button2.click()

        button3.click()
        decimalButton.click()
        button1.click()
        evaluate.click()
    })

    // Assertion
    expect(result.textContent).toBe(expectedResult)
})

test('Clear button test', () => {
    // Arrange
    render(<App />)
    const button1 = screen.getByRole('button', {name: operand1})
    const button2 = screen.getByRole('button', {name: operand2})
    const button3 = screen.getByRole('button', {name: /ac/i})
    const result = screen.getByRole('screen', {role: 'screen'})
    const expectedResult = ''

    // Act
    act(()=> {
        // will generate '8855'
        button1.click()
        button1.click()
        button2.click()
        button2.click()
        button3.click()
    })

    // Assertion
    expect(result.textContent).toBe(expectedResult)
})

test('Delete button test', () => {
    // Arrange
    render(<App />)
    const button1 = screen.getByRole('button', {name: operand1})
    const button2 = screen.getByRole('button', {name: operand2})
    const button3 = screen.getByRole('button', {name: /del/i})
    const result = screen.getByRole('screen', {role: 'screen'})
    const expectedResult = '885'

    // Act
    act(()=> {
        // will generate '8855'
        button1.click()
        button1.click()
        button2.click()
        button2.click()
        button3.click()
    })

    // Assertion
    expect(result.textContent).toBe(expectedResult)
})

test('Only one leading 0 test', () => {
    // Arrange
    render(<App />)
    const button1 = screen.getByRole('button', {name: '0'})
    const result = screen.getByRole('screen', {role: 'screen'})
    const expectedResult = '0'

    // Act
    act(()=> {
        // should only allow one 0
        button1.click()
        button1.click()
        button1.click()
        button1.click()
    })

    // Assertion
    expect(result.textContent).toBe(expectedResult)
})

// test whole sums -- done
// test decimal sums -- done
// test negative whole sums - rejected
// test negative decimal sums - rejected
// test each operation -- done
// test clear - done
// test delete - done
// test evaluate - done
// test only 1 leading 0 - done
// test all buttons are rendered???