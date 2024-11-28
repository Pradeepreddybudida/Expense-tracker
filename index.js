// Load expenses from local storage on page load
window.onload = function () {
    if (localStorage.getItem('expenses')) {
        const expenses = JSON.parse(localStorage.getItem('expenses'));
        expenses.forEach(expense => renderExpense(expense));
    }
};

// Add a new expense
function addExpense() {
    const amount = document.getElementById('expenseAmount').value;
    const description = document.getElementById('expenseDescription').value;
    const category = document.getElementById('expenseCategory').value;

    if (amount && description && category) {
        const expense = { amount, description, category };

        // Save to local storage
        let expenses = localStorage.getItem('expenses')
            ? JSON.parse(localStorage.getItem('expenses'))
            : [];
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));

        // Render the expense
        renderExpense(expense);

        // Clear input fields
        document.getElementById('expenseAmount').value = '';
        document.getElementById('expenseDescription').value = '';
        document.getElementById('expenseCategory').value = 'Movie';
    } else {
        alert('Please fill out all fields.');
    }
}

// Render an expense in the list
function renderExpense(expense) {
    const expenseList = document.getElementById('expenseList');

    const li = document.createElement('li');
    li.textContent = `${expense.amount} - ${expense.category} - ${expense.description} ${" "}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Expense';
    deleteButton.onclick = () => deleteExpense(li, expense);
    li.appendChild(deleteButton);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit Expense';
    editButton.onclick = () => editExpense(li, expense);
    li.appendChild(editButton);

    expenseList.appendChild(li);
}

// Delete an expense
function deleteExpense(li, expense) {
    const expenses = JSON.parse(localStorage.getItem('expenses'));
    const updatedExpenses = expenses.filter(e => e.amount !== expense.amount || e.description !== expense.description || e.category !== expense.category);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    li.remove();
}

// Edit an expense
function editExpense(li, expense) {
    const newAmount = prompt('Enter new amount:', expense.amount);
    const newDescription = prompt('Enter new description:', expense.description);
    const newCategory = prompt('Enter new category:', expense.category);

    if (newAmount && newDescription && newCategory) {
        const expenses = JSON.parse(localStorage.getItem('expenses'));
        const index = expenses.findIndex(e => e.amount === expense.amount && e.description === expense.description && e.category === expense.category);
        if (index !== -1) {
            expenses[index] = { amount: newAmount, description: newDescription, category: newCategory };
            localStorage.setItem('expenses', JSON.stringify(expenses));

            li.textContent = `${newAmount} - ${newCategory} - ${newDescription}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete Expense';
            deleteButton.onclick = () => deleteExpense(li, { amount: newAmount, description: newDescription, category: newCategory });
            li.appendChild(deleteButton);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit Expense';
            editButton.onclick = () => editExpense(li, { amount: newAmount, description: newDescription, category: newCategory });
            li.appendChild(editButton);
        }
    } else {
        alert('All fields are required.');
    }
}
