# SpendWise - Interactive Budgeting Application

SpendWise is an interactive budgeting web application designed to help users track monthly spending and evaluate financial goals.

## Improvements Made This Week
- Added real-time calculation and display of budget totals, expenditures, and remaining funds.
- Replaced console-only output with dynamic DOM elements for live dashboard feedback.
- Created budget warning banners that automatically trigger based on total spending limits.

## How JavaScript Concepts Are Applied

### 1. Conditionals (Decision Making)
Conditional statements (`if / else if / else`) evaluate user inputs and check spending levels:
- Prevents invalid or negative budget/expense values from being accepted.
- Evaluates remaining balance against total budget thresholds to trigger visual alerts:
  - **Success**: Spending is under 80% of budget.
  - **Warning**: Over 80% of budget spent.
  - **Danger**: Budget exceeded.

### 2. Arrays (Data Storage)
The `expenses` array (`let expenses = []`) is used to store multiple expense objects (`{ title, amount }`). It acts as a continuous list of transaction records.

### 3. Loops (Data Processing)
A `for` loop iterates through the `expenses` array in the `updateDashboard()` function to:
- Accumulate total expenses spent.
- Iterate over stored records and dynamically generate `<li>` elements in the DOM.

### 4. DOM Manipulation
The DOM is updated using JavaScript selectors (`document.getElementById`) and properties (`textContent`, `appendChild`, `innerHTML`, `className`) to instantly show changes in budget totals and expense logs without refreshing the page.

### 5. Event Handling
Event listeners handle user actions:
- `click` event listener on the "Set Budget" button updates the budget value.
- `submit` event listener on the expense form collects input values and appends new expenses.

## Challenges Encountered & Resolutions
- **Challenge**: Dynamic elements accumulated duplicate entries when adding new expenses.
- **Resolution**: Cleared `expenseList.innerHTML = ""` prior to running the render loop, ensuring the view accurately reflects the updated array state.