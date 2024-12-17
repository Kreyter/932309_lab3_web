const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Массив для хранения задач
let tasks = [];

// Middleware для обработки данных из форм
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Указываем папку для статических файлов
app.use(express.static('public'));

// Маршрут для отображения главной страницы
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Получение всех задач
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Добавление задачи
app.post('/add', (req, res) => {
  const { task } = req.body;
  if (task) tasks.push(task); // Добавляем задачу в массив
  res.redirect('/'); // Перезагрузка страницы
});

// Удаление задачи по индексу
app.post('/delete/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1); // Удаляем задачу из массива
  }
  res.sendStatus(200); // Возвращаем успешный статус
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
