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
1. Вводим число, каждая вводимая цифра попадает в currentOperand
2. При нажатии на любой operator, что означает - ввод операнда окончен, в переменную operator заносится нажатый оператор. Раннее вводимое число заносится в firstOperand, а currentOperand очищается. 
3. Вводим второй операнд, каждая вводимая цифра попадает в currentOperand
4. При следующем нажатии на любой оператор (или равно), считается результат и заносится в firstOperand, а currentOperand очищается
5. И так по кругу
*/


const result = document.querySelector('.result')
const btns = document.querySelector('.btns')
const operand = document.querySelector('.operand')


let currentOperand = ''
let firstOperand = 0
let currentOperator = ''
let isWaitingNextValue = false

btns.addEventListener('click', (e) => {
    if (e.target.getAttribute('value') !== null) setCurrentOperand(e.target.getAttribute('value'))
    if (e.target.getAttribute('operator') !== null) setOperator(e.target.getAttribute('operator'))
    if (e.target.getAttribute('operation') === 'reset') resetBtn()
    if (e.target.getAttribute('operation') === 'calc') calcResult()
    if (e.target.getAttribute('operation') === 'delete') deleteBtn()

    // Для тестирования
    console.log(`currentOperand: ${currentOperand}`)
    console.log(`firstOperand: ${firstOperand}`)
    console.log(`currentOperator: ${currentOperator}`)
    console.log('    ')
})

// При вводе числа
const setCurrentOperand = (number) => {
    currentOperand += number
    isWaitingNextValue = false
}

const setOperator = (operator) => {
    if (isWaitingNextValue && currentOperator) {
        // Если нажали на один оператор, потом на другой
        console.log('Сменили оператора')
        currentOperator = operator
        return
    }
    if (firstOperand === 0) {
        // Если в firstOperand пусто, то заносим туда данные из currentOperand
        firstOperand = currentOperand
        currentOperand = ''
        currentOperator = operator
    } else {
        isWaitingSecondNumber = true
        // Считаем и заносим результат в переменную currentOperand на случай, если дальше продолжим считать
        // Результат получаем в number, переводим в строку.
        firstOperand = String(calculateResult[operator](firstOperand, currentOperand))
        currentOperand = ''
    }
    isWaitingNextValue = true
    currentOperator = operator
}


const calculateResult = {
    '+': () => {
        console.log('Выполняем сложение')
        return Number(firstOperand) + Number(currentOperand)
    },
    '-': () => {
        console.log('Выполняем вычитание')
        return Number(firstOperand) - Number(currentOperand)
    },
    '*': () => {
        console.log('Выполняем умножение')
        return Number(firstOperand) * Number(currentOperand)
    },
    '/': () => {
        console.log('Выполняем деление')
        return Number(firstOperand) / Number(currentOperand)
    }
}

const calcResult = () => {
    console.log('Равно')
    
    if(firstOperand === 0) return
    firstOperand = String(calculateResult[currentOperator](firstOperand, currentOperand))
    currentOperand = ''
}

const deleteBtn = () => {
    console.log('delete')
}

const resetBtn = () => {
    console.log('reset')
}





