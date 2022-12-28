let inactiveScreen = document.querySelector('.inactive-screen')
let activeScreen = document.querySelector('.active-screen')
let calcButtons = document.querySelectorAll('.calc-button')
let savedNum = 0

function getCalcData() {
  let inputStr = ''
  let isNanFlag = 0

  calcButtons.forEach(btn => {
    btn.addEventListener('click', el => {
      isNanFlag = isNaN(el.target.textContent) && inputStr.length !== 0 ? isNanFlag + 1 : isNanFlag

      if (el.target.textContent === 'C') {
        inactiveScreen.textContent = '0'
        activeScreen.textContent = '0'
        isNanFlag = 0
        savedNum = 0
        inputStr = ''
      } else if (el.target.textContent === '=' || isNanFlag > 1) {
        inactiveScreen.textContent = inputStr + ' ='
        activeScreen.textContent = resultCalc(inputStr)
        inputStr = activeScreen.textContent
        isNanFlag = 0
      } else if (isNanFlag <= 1) {
        if (inputStr.length !== 0 && isNaN(el.target.textContent))
          inputStr += ` ${el.target.textContent} `
        else inputStr += el.target.textContent
        activeScreen.textContent = inputStr
      }
    })
  })
}

function resultCalc(str) {
  let [operator] = str.split('').filter((char, index) => isNaN(char) && char !== '.' && index > 0)
  let checkedStr = isNaN(str[0]) ? str.slice(1) : str
  let [a, b] = checkedStr.split(operator)

  a = str[0] === '-' ? Number(-a) : Number(a)

  if (savedNum === 0) {
    savedNum = Number(b) ? Number(b) : a
  }

  b = Number(b) || savedNum

  let calcFunctions = {
    '+': () => a + b,
    '-': () => a - b,
    '/': () => a / b,
    '*': () => a * b,
  }

  return operator ? calcFunctions[operator]() : a
}

getCalcData()
