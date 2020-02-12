const descriptionTitle = document.querySelector(".description");
const descriptionAmount = document.querySelector(".Amount");
const incomeOrExpenses = document.querySelector(".incomeorexpenses");
const addButton = document.querySelector(".add-button");
const incomeList = document.querySelector(".income-list");
const expensesList = document.querySelector(".expenses-list");
const calculatedAmount = document.querySelector(".calculated-amount");
const clearLocalStorage = document.querySelector(".clear-localstorage");

const timeAndDate = () => {
  const date = new Date();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  const year = date.getFullYear();
  const hour = (date.getHours() < 10 ? "0" : "") + date.getHours();
  const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  const index = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const fullDate = `${index[month]}${day},${year} ${hour}:${minutes}`;
  return fullDate;
};

const personAccount = {
  incomes: [
    {
      description: "Salary",
      amount: 4000,
      date: timeAndDate()
    },
    {
      description: "Prize",
      amount: 5000,
      date: timeAndDate()
    }
  ],
  expenses: [
    {
      description: "Rent",
      amount: 900,
      date: timeAndDate()
    },
    {
      description: "Transport",
      amount: 100,
      date: timeAndDate()
    }
  ],
  totalIncome: function() {
    const income = this.incomes.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);
    return income;
  },
  totalExpense: function() {
    //return this.expenses.reduce((acc, curr) => acc + curr.amount);
    const expense = this.expenses.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);
    return expense;
  },
  accountBalance: function() {
    const balance = this.totalIncome() - this.totalExpense();
    return balance;
  }
};

const getAccount = JSON.parse(localStorage.getItem("accountInformation"));
if (!getAccount) {
  localStorage.setItem("accountInformation", JSON.stringify(personAccount));
} else {
  const getAccount = JSON.parse(localStorage.getItem("accountInformation"));
  personAccount.incomes = getAccount.incomes;
  personAccount.expenses = getAccount.expenses;
}
calculatedAmount.innerHTML = `You have ${personAccount.accountBalance()}€ in your account`;

function defaultIncome() {
  for (const a of personAccount.incomes) {
    const li = document.createElement("li");
    li.innerHTML = `<div class="listDiv">
    <li class="list">${a.description}</li>
    <li class="list">${a.amount}€</li>
    <li class="list">${a.date}</li>
    
    </div>`;
    incomeList.appendChild(li);
  }
}
defaultIncome();

function defaultExpense() {
  for (const b of personAccount.expenses) {
    const li = document.createElement("li");
    li.innerHTML = `<div class="listDiv">
    <div class="list">${b.description}</div>
    <div class="list">${b.amount}€</div>
    <div class="list">${b.date}</div>
    </div>`;
    expensesList.appendChild(li);
  }
}
defaultExpense();

addButton.addEventListener("click", function() {
  description = descriptionTitle.value;
  amount = parseInt(descriptionAmount.value);
  ieValue = incomeOrExpenses.value;
  if (description && amount && ieValue == "Income") {
    personAccount.incomes.push({ description, amount, date: timeAndDate() });
    localStorage.setItem("accountInformation", JSON.stringify(personAccount));
    incomeList.innerHTML = "";
    defaultIncome();
  } else if (description && amount && ieValue == "Expenses") {
    personAccount.expenses.push({ description, amount, date: timeAndDate() });
    localStorage.setItem("accountInformation", JSON.stringify(personAccount));
    expensesList.innerHTML = "";
    defaultExpense();
  }
  calculatedAmount.innerHTML = `You have ${personAccount.accountBalance()}€ in your account`;
});
clearLocalStorage.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
