// Переключение темы
const body = document.querySelector('body')

body.addEventListener('click', (e) => {
    if (e.target.nodeName === 'INPUT') {
        body.classList.remove('light', 'dark')
        body.classList.add(`${e.target.value}`)
    }
})


/*
Алгоритм:
1. Вводим число, каждая вводимая цифра попадает в currentOperand
2. При нажатии на любой operator, что означает - ввод операнда окончен, в переменную operator заносится нажатый оператор. Раннее вводимое число заносится в firstOperand, а currentOperand очищается. 
3. Вводим второй операнд, каждая вводимая цифра попадает в currentOperand
4. При следующем нажатии на любой оператор (или равно), считается результат и заносится в firstOperand, а currentOperand очищается
5. И так по кругу
*/


const display = document.querySelector('.result')
const allBtns = document.querySelector('.all-btns')
const operation = document.querySelector('.operation')


let currentOperand = ''
let firstOperand = 0
let currentOperator = ''
let isWaitingNextValue = false

allBtns.addEventListener('click', (e) => {
    if (e.target.getAttribute('value') !== null) setCurrentOperand(e.target.getAttribute('value'))
    if (e.target.getAttribute('operator') !== null) setOperator(e.target.getAttribute('operator'))
    if (e.target.getAttribute('operation') === 'reset') resetAll()
    if (e.target.getAttribute('operation') === 'equals') calcResult()
    if (e.target.getAttribute('operation') === 'delete') deleteLastDigit()
})

// При вводе числа
const setCurrentOperand = (number) => {
    if (currentOperand === '' && number === '0') return
    currentOperand += number
    isWaitingNextValue = false
    showOnDisplay(currentOperand)
}

const setOperator = (operator) => {
    if (isWaitingNextValue && currentOperator) {
        // Если нажали на один оператор, потом на другой
        currentOperator = operator
        showCurrentOperation(`${firstOperand} ${currentOperator}`)
        return
    }
    if (firstOperand === 0) {
        // Если в firstOperand пусто, то заносим туда данные из currentOperand
        firstOperand = currentOperand
        currentOperand = ''
        currentOperator = operator
        showOnDisplay('0')
    } else {
        isWaitingSecondNumber = true
        // Нажали на + - * или /. Считаем и заносим результат в переменную currentOperand для дальнейших операций
        firstOperand = String(calculateResult[operator](firstOperand, currentOperand))
        currentOperand = ''
        showOnDisplay(firstOperand)
    }

    showCurrentOperation(`${firstOperand} ${currentOperator}`)
    isWaitingNextValue = true
    currentOperator = operator
}


const calculateResult = {
    '+': () => Number(firstOperand) + Number(currentOperand),
    '-': () => Number(firstOperand) - Number(currentOperand),
    '*': () => Number(firstOperand) * Number(currentOperand),
    '/': () => Number(firstOperand) / Number(currentOperand)
}

const calcResult = () => {
    if (firstOperand === 0) return
    
    showCurrentOperation(`${firstOperand} ${currentOperator} ${currentOperand} =`)
    firstOperand = String(calculateResult[currentOperator](firstOperand, currentOperand))
    showOnDisplay(firstOperand)
    currentOperand = ''
}

const deleteLastDigit = () => {
    // Если ничего не вводили, ничего не делаем
    if (currentOperand === '') return
    // Если показывается одно число, то при удалении заменяем его на ноль
    if (currentOperand.length === 1) {
        currentOperand = ''
        showOnDisplay('0')
        return
    }
    currentOperand = currentOperand.slice(0, -1)
    showOnDisplay(currentOperand)
}

const resetAll = () => {
    currentOperand = ''
    firstOperand = 0
    currentOperator = ''
    isWaitingNextValue = false
    showOnDisplay('0')
    showCurrentOperation('')
}

const showOnDisplay = (str) => display.textContent = `${str}`

document.addEventListener('keydown', (e) => {
    if (e.key >= 0 || e.key <= 9 || e.key === '.') setCurrentOperand(e.key)
    if (e.key === '-' || e.key === '+' || e.key === '*' || e.key === '/') setOperator(e.key)
    if (e.key === 'Escape') resetAll()
    if (e.key === 'Enter') calcResult()
    if (e.key === 'Backspace') deleteLastDigit()
})

const showCurrentOperation = (item) => operation.innerHTML = `${item}`



