// /server/db.js
const mysql = require('mysql2');

// Створення з'єднання з MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Твій користувач MySQL
    password: '', // Твій пароль MySQL
    database: 'minecraft_hospital' // Назва твоєї бази даних
});

// Перевірка з'єднання
connection.connect((err) => {
    if (err) {
        console.error('Помилка при з\'єднанні з БД: ' + err.stack);
        return;
    }
    console.log('Підключено до бази даних з id ' + connection.threadId);
});

module.exports = connection; // Експортуємо з'єднання
