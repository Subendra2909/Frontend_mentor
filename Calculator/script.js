class Calculator {
    constructor(leftOperandTxt, rightOperandTxt){
        this.leftOperandTxt = leftOperandTxt
        this.rightOperandTxt = rightOperandTxt
        this.resetNum()
    }


    resetNum() {
        this.leftOperand = ''
        this.rightOperand  = ''
        this.operation = undefined
    }

    deleteNum () {
        this.rightOperand = this.rightOperand.toString().slice(0, -1)
    }

    appendNum (number) {
        if(number === '.' && this.rightOperand.includes('.')) return
        this.rightOperand = this.rightOperand.toString() + number.toString()
    }

    chooseOperation (operation){
        if(this.rightOperand === '') return
        if(this.leftOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.leftOperand = this.rightOperand
        this.rightOperand = ''
    }

    compute () {
        let computation
        const left = parseFloat(this.leftOperand)
        const right = parseFloat(this.rightOperand)
        if(isNaN(left) || isNaN(right)) return 
        switch (this.operation) {
            case '+':
                computation = left + right
                break
            case '-':
                computation = left - right
                break
            case '*':
                computation = left * right
                break
            case '/':
                computation = left / right
                break
            default:
                return
        }
        this.rightOperand = computation
        this.operation = undefined
        this.leftOperand = ''
    }

    getDisplayNum(number) {
        const stringNum = number.toString();
        const intDigits = parseFloat(stringNum.split('.')[0]);
        const decimalDigits = stringNum.split('.')[1];
        let integerDisplay
        if (isNaN(intDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = intDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }

        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }
        else {
            return integerDisplay
        }
       
    }

    update () {
        this.rightOperandTxt.innerText = this.getDisplayNum(this.rightOperand);
        if(this.operation != null){
            this.leftOperandTxt.innerText = `${this.leftOperand} ${this.operation}`
        } 
        else{
            this.leftOperandTxt.innerText = ''
        }
        
    }

}


const numButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equal]')
const resetButton = document.querySelector('[data-reset]')
const leftOperandTxt = document.querySelector('[data-leftOperand]')
const rightOperandTxt = document.querySelector('[data-rightOperand]')
const deleteButton = document.querySelector('[data-delete]')

const calculator = new Calculator(leftOperandTxt, rightOperandTxt)

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText)
        calculator.update()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.update()
    })
})

equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.update()
})

resetButton.addEventListener('click', button => {
    calculator.resetNum()
    calculator.update()
})

deleteButton.addEventListener('click', button => {
    calculator.deleteNum()
    calculator.update()
})


const toggle = document.getElementById('change')
const body = document.querySelector('body')
const buttonArea = document.getElementById('buttons_area')
const deleteB = document.getElementById('del')
const equalto = document.getElementsByClassName('equal')
const resetn = document.getElementsByClassName('reset')
const keys = document.getElementsByClassName('key')



toggle.onclick = function(){
    toggle.classList.toggle('active')
    body.classList.toggle('active')
    buttonArea.classList.toggle('active')

}