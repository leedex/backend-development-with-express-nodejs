const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON requests

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const users = [{ username: 'testuser', password: 'testpassword' }];

app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        // Generate a token or return a success message
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});
// Example using bcrypt for hashing (install bcrypt using npm)
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Replace with hashed password comparison and JWT token generation
let expenses = []; // Mock data storage

app.get('/api/expenses', (req, res) => {
    res.json(expenses);
});

app.post('/api/expenses', (req, res) => {
    const newExpense = req.body;
    expenses.push(newExpense);
    res.status(201).json(newExpense);
});

app.put('/api/expenses/:id', (req, res) => {
    const { id } = req.params;
    const updatedExpense = req.body;
    expenses = expenses.map(expense => expense.id === parseInt(id) ? updatedExpense : expense);
    res.json(updatedExpense);
});

app.delete('/api/expenses/:id', (req, res) => {
    const { id } = req.params;
    expenses = expenses.filter(expense => expense.id !== parseInt(id));
    res.status(204).send();
});
app.get('/api/expense', (req, res) => {
    const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);
    res.json({ totalExpense });
});
