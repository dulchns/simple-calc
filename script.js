let inactiveScreen = document.querySelector('.inactive-screen')
let activeScreen = document.querySelector('.active-screen')
let calcButtons = document.querySelectorAll('.calc-button')

function getCalcData() {
    let inputStr = ''
    let isNanFlag = 0

    calcButtons.forEach( btn => {

        btn.addEventListener('click', el => {
            
            isNanFlag = (isNaN(el.target.textContent)) ? isNanFlag + 1 : isNanFlag

            if(el.target.textContent === 'C') {
                inactiveScreen.textContent = '0'
                activeScreen.textContent = '0'
                isNanFlag = 0
                inputStr = ''
            } 

            else if(el.target.textContent === '=' || isNanFlag > 1) {
                inactiveScreen.textContent = inputStr + ' ='
                activeScreen.textContent = resultCalc(inputStr)
                inputStr = activeScreen.textContent
                isNanFlag = 0
            } 
            
            else if(isNanFlag <= 1) {
                inputStr += (isNaN(el.target.textContent)) ? ` ${el.target.textContent} ` : el.target.textContent
                activeScreen.textContent = inputStr
            }

        })
    })
    
}

function resultCalc(str) {
    let [operator] = str.split('').filter(char => isNaN(char) && char !== '.')
    let [a, b] = str.split(operator)
    a = Number(a)
    b = Number(b) || a
    

    let calcFunctions = {
        '+': () => a + b,
        '-': () => a - b,
        '/': () => a / b,
        '*': () => a * b,
    }
    
    return (operator) ? calcFunctions[operator]() : a
}

getCalcData()