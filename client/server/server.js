const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const { Rcon } = require('rcon-client');

const app = express();
app.use(cors());
app.use(express.json());

// Підключення до БД
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ilovedb2025',
    database: 'minecraft_hospital'
});


// RCON-конфіг
const rconConfig = {
    host: '192.168.1.76',
    port: 25575,
    password: '22848'
};

const util = require('util');
const dbQuery = util.promisify(db.query).bind(db);

const potionMap = {
    'Швидкість': 'swiftness',
    'Нічне бачення': 'night_vision',
    'Миттєве зцілення': 'healing',
    'Сила': 'strength',
    'Вогнестійкість': 'fire_resistance',
    'Водне дихання': 'water_breathing',
    'Стрибучість': 'leaping',
    'Повільне падіння': 'slow_falling',
    'Регенерація': 'regeneration',
    'Невидимість': 'invisibility'
};


db.connect(err => {
    if (err) {
        console.error('Помилка підключення до БД:', err);
    } else {
        console.log('Підключено до MySQL');
    }
});


// Отримати останній спавнпоінт за нікнеймом
app.get('/api/last-spawn/:nickname', (req, res) => {
    const { nickname } = req.params;
    db.query(
        'SELECT coordinates, set_date FROM spawnpoints WHERE nickname = ? ORDER BY set_date DESC LIMIT 1',
        [nickname],
        (err, results) => {
            if (err) return res.status(500).json({ error: 'Помилка запиту до БД' });
            if (results.length === 0) return res.status(404).json({ message: 'Спавнпоінт не знайдено' });
            res.json(results[0]);
        }
    );
});

// Отримати всі зілля (і в адмін і в шопі)
app.get('/api/potions', (req, res) => {
    db.query('SELECT id, name, amount, effect FROM potions', (err, results) => {
        if (err) {
            console.error("Помилка запиту до БД (potions):", err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Маршрут для оновлення кількості зілля на адмін сторінці
app.post('/api/potions/update', (req, res) => {
    const { potionId, amount } = req.body;

    // Перевірка на коректність даних
    if (typeof potionId !== 'number' || typeof amount !== 'number') {
        return res.status(400).json({ message: 'Невірні дані' });
    }

    // Оновлення кількості зілля в БД
    const query = 'UPDATE potions SET amount = ? WHERE id = ?';
    db.query(query, [amount, potionId], (err, results) => {
        if (err) {
            console.error('Помилка оновлення:', err);
            return res.status(500).send('Помилка оновлення');
        }
        if (results.affectedRows > 0) {
            res.status(200).send('Кількість зілля оновлена');
        } else {
            res.status(404).send('Зілля не знайдено');
        }
    });
});


// 🔹 Відправити команду на сервер Minecraft через RCON і зберегти в БД
app.post('/api/rcon-command', async (req, res) => {
    const { host, port, password, command } = req.body;

    if (!command) {
        return res.status(400).json({ error: 'Command не надано!' });
    }

    const parts = command.split(" ");
    const nickname = parts[1];
    const coordinates = parts.slice(2).join(" "); // "X Y Z"

    try {
        const rcon = await Rcon.connect({ host, port, password });
        const response = await rcon.send(command);
        await rcon.end();

        // Зберегти у таблицю spawnpoints
        db.query(
            'INSERT INTO spawnpoints (nickname, coordinates) VALUES (?, ?)',
            [nickname, coordinates],
            (err, result) => {
                if (err) {
                    console.error('Помилка при збереженні в БД:', err);
                    return res.status(500).json({ error: 'Команду виконано, але не збережено в БД' });
                }
                res.json({ response });
            }
        );

    } catch (err) {
        console.error('Помилка RCON:', err);
        res.status(500).json({ error: 'Не вдалося виконати RCON-команду', details: err.message });
    }
});

// Видача зілля за нікнеймом через RCON
// Користувач отримує одну штуку зілля

app.post('/api/give-potion/:id', async (req, res) => {
    const potionId = parseInt(req.params.id);
    const { nickname } = req.body;

    if (!nickname || isNaN(potionId)) {
        return res.status(400).json({ error: 'Некоректні дані' });
    }

    try {
        // Отримати зілля з БД
        db.query('SELECT * FROM potions WHERE id = ?', [potionId], async (err, results) => {
            if (err) return res.status(500).json({ error: 'DB помилка' });
            if (results.length === 0) return res.status(404).json({ error: 'Зілля не знайдено' });

            const potion = results[0];

            if (potion.amount < 1) return res.status(400).json({ error: 'Зілля закінчилось' });

            const effectId = potionMap[potion.effect];
            if (!effectId) return res.status(500).json({ error: `Невідомий ефект: ${potion.effect}` });

            // Формуємо правильну команду для видачі зілля, використовуючи нікнейм
            const command = `/give ${nickname} potion[potion_contents={potion:"${effectId}"}] 1`;

            // Виконання команди через RCON
            const rcon = await Rcon.connect(rconConfig);
            const response = await rcon.send(command);
            await rcon.end();

            // Зменшити кількість у БД
            db.query('UPDATE potions SET amount = amount - 1 WHERE id = ?', [potionId], (err2) => {
                if (err2) console.error('Помилка оновлення кількості:', err2);
            });

            res.json({ message: `Зілля "${potion.name}" видано гравцю ${nickname}`, response });
        });
    } catch (err) {
        console.error('❗ Помилка при видачі зілля:', err);
        res.status(500).json({ error: 'Помилка сервера', details: err.message });
    }
});

app.listen(5000, () => console.log('Сервер працює на порту 5000'));
