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
const movementDisplay = document.querySelector('.movements')
const timer = document.querySelector('.timer')
const transferBtn = document.querySelector('.form__btn--transfer')
const transferTo = document.querySelector('.form__input--to')
const transferAmt = document.querySelector('.form__input--amount')
const loanBtn = document.querySelector('.form__btn--loan')
const loanAmt = document.querySelector('.form__input--loan-amount')

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
      // Start logout timer
      logoutUser()
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
      // Display transactions
      displayTransactions(loggedInUser)
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

// Function to display transactions
const displayTransactions = (data) => {
  console.log('Displaying transactions')
  movementDisplay.innerHTML = ''
  data.movements.forEach(item => {
    if (item > 0) {
      movementDisplay.innerHTML += `
      <div class="movements__row">
        <div class="movements__type movements__type--deposit">2 deposit</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${item}</div>
      </div>
      `
    } else {
      movementDisplay.innerHTML += `
      <div class="movements__row">
        <div class="movements__type movements__type--withdrawal">1 withdrawal</div>
        <div class="movements__date">24/01/2037</div>
        <div class="movements__value">${item}</div>
      </div>
      `
    }
  })
}

// Logout timer function
const logoutUser = () => {
  let mins = 4
  let sec = 59

  setInterval(() => {
    if (sec === 0) {
      sec = 59
      mins--
    }

    if (mins === -1) {
      window.location.reload()
    }

    timer.innerHTML = `${mins}:${sec}`
  }, 1000)
}

// Function to transfer to another account
const handleTransfer = (e) => {
  e.preventDefault()
  console.log(transferTo.value)
  console.log(transferAmt.value)
  accountData.filter(item => {
    if (item.user === transferTo.value) {
      return item.movements.push(Number(transferAmt.value))
    } else {
      return
    }
  })
  console.log(accountData)
}

// Function to request loan
const handleLoadRequest = (e) => {
  e.preventDefault()
  console.log(loanAmt.value)
}

// Event listeners
login.addEventListener('click', handleLogin)
transferBtn.addEventListener('click', handleTransfer)
loanBtn.addEventListener('click', handleLoadRequest)
