'use strict'
// Get DOM elements
const user = document.querySelector('.login__input--user')
const pin = document.querySelector('.login__input--pin')
const login = document.querySelector('.login__btn')
const mainApp = document.querySelector('.app')
const balance = document.querySelector('.balance__value')
const amtSpent = document.querySelector('.summary__value--out')
const amtEarnt = document.querySelector('.summary__value--in')
const intRate = document.querySelector('.summary__value--interest')

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

// Set empty logged in User object
const loggedInUser = {}

// Handle login function
const handleLogin = (e) => {
  e.preventDefault()
  accountData.forEach(item => {
    if (item.user === user.value && item.pin === Number(pin.value)) {
      console.log('Correct')
      // If credentials are correct display app screen
      mainApp.style.opacity = 1
      console.log(item)
      // Set logged in user details
      loggedInUser.name = item.owner
      loggedInUser.movements = item.movements
      loggedInUser.interestRate = item.interestRate
      loggedInUser.user = item.user
      loggedInUser.pin = item.pin
      // Get balance
      getAccountBalance(loggedInUser)
      // Get summary
      getAccountSummary(loggedInUser)
      return loggedInUser
    } else {
      // If incorrect make sure app screen is not displayed
      // mainApp.style.opacity = 0
    }
  })
}

// Function to get and display balance
const getAccountBalance = (data) => {
  // Get balance
  const userBalance = data.movements.reduce((acc, curr) => {
    return acc + curr
  })
  balance.innerHTML = userBalance
  return userBalance
}

// Function to get and display account summary
const getAccountSummary = (data) => {
  console.log('Fetching account data')
  console.log('*********************')
  console.log(data)
  // Calculate amount spent and outout to DOM
  const spent = data.movements.map(item => item < 0 ? item : 0)
    .reduce((acc, curr) => acc + curr)
  amtSpent.innerHTML = spent
  console.log(spent)
  // Calculate amount earnt and output to DOM
  const earnt = data.movements.map(item => item > 0 ? item : 0)
    .reduce((acc, curr) => acc + curr )
  amtEarnt.innerHTML = earnt
  console.log(earnt)
  // Calculate interest earnt
  const interest = data.movements.reduce((acc, curr) => (acc + curr) * data.interestRate * 1)
  intRate.innerHTML = interest
  console.log(interest)
}

// Event listeners
login.addEventListener('click', handleLogin)
