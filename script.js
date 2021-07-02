'use strict'
// Get DOM elements
const user = document.querySelector('.login__input--user')
const pin = document.querySelector('.login__input--pin')
const login = document.querySelector('.login__btn')
const mainApp = document.querySelector('.app')

// Data
const accountData = [
  {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    user: 'js',
    pin: 1111
  },
  {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    user: 'jd',
    pin: 2222
  },
  {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    user: 'stw',
    pin: 3333
  },
  {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    user: 'ss',
    pin: 4444
  }

]
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111
// }

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222
// }

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333
// }

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444
// }

// Handle login function
const handleLogin = (e) => {
  e.preventDefault()
  // if (user.value === 'Will' && Number(pin.value) === 6302) {
  //   console.log('Correct Login')
  //   // If credentials are correct display app screen
  //   mainApp.style.opacity = 1
  // } else {
  //   console.log('Incorrect credentials')
  //   // If incorrect make sure app screen is not displayed
  //   mainApp.style.opacity = 0
  // }
  accountData.forEach(item => {
    console.log(item.pin)
    console.log(Number(pin.value))
    if (item.user === user.value && item.pin === Number(pin.value)) {
      console.log('Correct')
      // If credentials are correct display app screen
      mainApp.style.opacity = 1
      return item
    } else {
      // If incorrect make sure app screen is not displayed
      // mainApp.style.opacity = 0
    }
  })
}

// Event listeners
const activeUser = login.addEventListener('click', handleLogin)