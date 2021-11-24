// Переключение темы
const body = document.querySelector('body')

body.addEventListener('click', (e) => {
    if (e.target.nodeName === 'INPUT') {
        body.classList.remove('light')
        body.classList.add(`${e.target.value}`)
    }
})



/*
Алгоритм:
1. Значение булевой переменной isWaitingNextValue устанавливаем false, что означает - еще не вводили цифры
2. Вводим первый операнд - значение попадает в currentNumber
3. При нажатии на любой оператор (+, -, ×, ÷, =), при isWaitingNextValue = false - заносим его в переменную operator
4. А вводимый ранее операнд (первый) попадает в переменную firstNumber
6. Вводим второй операнд, вводимое значение заносится в currentNumber
7. При нажатии на любой оператор (+, -, ×, ÷, =), получаем результат и заносим его в currentNumber
*/




const result = document.querySelector('.result')
const btns = document.querySelector('.btns')
const operand = document.querySelector('.operand')


let currentNumber = ''
let firstNumber = 0
let currentOperator = ''
let isWaitingNextValue = false

btns.addEventListener('click', (e) => {
    if (e.target.getAttribute('value') !== null) setCurrentNumber(e.target.getAttribute('value'))
    if (e.target.getAttribute('operator') !== null) setOperator(e.target.getAttribute('operator'))
    if (e.target.getAttribute('operation') === 'reset') resetBtn()
    if (e.target.getAttribute('operation') === 'delete') deleteBtn()

    console.log(`currentNumber: ${currentNumber}`)
    console.log(`firstNumber: ${firstNumber}`)
    console.log(`currentOperator: ${currentOperator}`)
    console.log('    ')
})

// Вводим число
const setCurrentNumber = (number) => {
    currentNumber += number
    isWaitingNextValue = false
}

const setOperator = (operator) => {
    if (isWaitingNextValue && currentOperator) {
        // Если нажали на один оператор, потом на другой
        console.log('Сменили оператора')
        currentOperator = operator
        return
    }
    if (firstNumber === 0) {
        console.log('Запомнили первое число')
        firstNumber = currentNumber
        currentNumber = ''
        // currentOperator = operator
    } else {
        // Посчитать результаты
        console.log('Считаем результаы')
        isWaitingSecondNumber = true
        operators[operator](firstNumber, currentNumber)
    }
    isWaitingNextValue = true
    currentOperator = operator
}

const deleteBtn = () => {
    console.log('delete')
}

const resetBtn = () => {
    console.log('reset')
}

const operators = {
    '+': (firstNumber, currentNumber) => {
        console.log('Выполнили сложение')
        return Number(firstNumber) + Number(currentNumber)
    },
    '-': () => console.log('Выполнили вычитание'),
    '*': () => console.log('Выполнили умножение'),
    '/': () => console.log('Выполнили деление'),
    '=': () => console.log('Нажали равно'),
}




