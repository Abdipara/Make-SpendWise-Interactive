// State Management variables
let totalBudget = 0;
let expenses = []; // Array to store expense objects

// DOM Element References
const budgetInput = document.getElementById("budget-input");
const setBudgetBtn = document.getElementById("set-budget-btn");
const budgetFeedback = document.getElementById("budget-feedback");

const expenseForm = document.getElementById("expense-form");
const expenseTitle = document.getElementById("expense-title");
const expenseAmount = document.getElementById("expense-amount");

const totalBudgetDisplay = document.getElementById("total-budget-display");
const totalSpentDisplay = document.getElementById("total-spent-display");
const remainingBudgetDisplay = document.getElementById("remaining-budget-display");
const expenseList = document.getElementById("expense-list");

// Set Total Budget Handler
setBudgetBtn.addEventListener("click", () => {
  const value = parseFloat(budgetInput.value);

  // Decision Making: Validate input
  if (isNaN(value) || value <= 0) {
    budgetFeedback.textContent = "Please enter a valid budget amount.";
    budgetFeedback.className = "feedback-msg danger";
    return;
  }

  totalBudget = value;
  budgetInput.value = "";
  updateDashboard();
});

// Add New Expense Handler
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = expenseTitle.value.trim();
  const amount = parseFloat(expenseAmount.value);

  if (title && !isNaN(amount) && amount > 0) {
    // Array Usage: Store expense record object in array
    expenses.push({ title, amount });

    // Reset Form Fields
    expenseTitle.value = "";
    expenseAmount.value = "";

    updateDashboard();
  }
});

// Update Dashboard Function (Calculations, Loops, DOM Updates & Conditionals)
function updateDashboard() {
  // Loop Usage: Calculate total expenses spent
  let totalSpent = 0;
  for (let i = 0; i < expenses.length; i++) {
    totalSpent += expenses[i].amount;
  }

  const remaining = totalBudget - totalSpent;

  // DOM Updates: Update numeric displays
  totalBudgetDisplay.textContent = `$${totalBudget.toFixed(2)}`;
  totalSpentDisplay.textContent = `$${totalSpent.toFixed(2)}`;
  remainingBudgetDisplay.textContent = `$${remaining.toFixed(2)}`;

  // DOM Update & Loop Usage: Render list items
  expenseList.innerHTML = "";
  if (expenses.length === 0) {
    expenseList.innerHTML = '<li class="empty-msg">No expenses recorded yet.</li>';
  } else {
    // Using a loop to append each expense to the list
    for (let i = 0; i < expenses.length; i++) {
      const item = document.createElement("li");
      item.className = "expense-item";
      item.innerHTML = `<span>${expenses[i].title}</span> <strong>$${expenses[i].amount.toFixed(2)}</strong>`;
      expenseList.appendChild(item);
    }
  }

  // Decision Making: Evaluate spending thresholds using Conditionals
  if (totalBudget === 0) {
    budgetFeedback.textContent = "Please set a monthly budget to get started.";
    budgetFeedback.className = "feedback-msg";
  } else if (remaining < 0) {
    budgetFeedback.textContent = "Warning: You have exceeded your overall budget!";
    budgetFeedback.className = "feedback-msg danger";
  } else if (remaining <= totalBudget * 0.2) {
    budgetFeedback.textContent = "Caution: You have used over 80% of your budget!";
    budgetFeedback.className = "feedback-msg warning";
  } else {
    budgetFeedback.textContent = "Your spending is within healthy budget limits.";
    budgetFeedback.className = "feedback-msg success";
  }
}