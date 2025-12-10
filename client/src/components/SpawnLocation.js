import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const SpawnLocation = () => {
    // --- ЛОГІКА (БЕЗ ЗМІН) ---
    const [nickname, setNickname] = useState("");
    const [lastSpawn, setLastSpawn] = useState(null);
    const [spawnError, setSpawnError] = useState(null);

    // Додаємо стан для мобільного меню
    const [menuActive, setMenuActive] = useState(false);

    const fetchLastSpawn = async () => {
        if (!nickname) {
            alert("Спочатку введіть нікнейм");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/last-spawn/${nickname}`);
            if (!response.ok) {
                const error = await response.json();
                setSpawnError(error.message || "Не знайдено");
                setLastSpawn(null);
                return;
            }
            const data = await response.json();
            setLastSpawn(data);
            setSpawnError(null);
        } catch (err) {
            console.error("Помилка запиту:", err);
            setSpawnError("Помилка з'єднання з сервером");
            setLastSpawn(null);
        }
    };

    return (
        <div className="home-container">
            {/* АДАПТИВНА НАВІГАЦІЯ */}
            <nav className="navbar">
                <div className="nav-logo desktop-only">
                    <img src="/assets/images/pngwing.com (1).png" alt="Logo" className="bytpuck" />
                </div>

                <div className="burger-btn" onClick={() => setMenuActive(!menuActive)}>
                    <span></span><span></span><span></span>
                </div>

                <div className={`nav-links ${menuActive ? "active" : ""}`}>
                    <Link to="/set-spawn" onClick={() => setMenuActive(false)}>Встановити спавнпоінт</Link>
                    <Link to="/potion-recipe" onClick={() => setMenuActive(false)}>Отримати рецепт зілля</Link>
                    <Link to="/spawn-location" onClick={() => setMenuActive(false)}>Дізнатися де спавнпоінт</Link>
                    <Link to="/shop" onClick={() => setMenuActive(false)}>Наявні зілля</Link>
                </div>

                <div className="nav-logo desktop-only">
                    <img src="/assets/images/pngwing.com (1).png" alt="Logo" className="bytpuck" />
                </div>
            </nav>

            <div className="spawn-page-content">
                {/* ЗАГОЛОВОК І КАРТА */}
                {/* Використовуємо існуючий клас для правильного розташування */}
                <div className="spawn-header-section">
                    <div className="spawn-title">
                        <h1>Дізнатися де точка відродження</h1>
                    </div>
                    <div className="spawn-map">
                        <img src="/assets/images/map.png" alt="Map" />
                    </div>
                </div>

                {/* БЛОК ВЗАЄМОДІЇ */}
                <div className="spawn-interaction-area">
                    <div className="spawn-form-box">
                        <h2 className="centered-text">Останній спавнпоінт</h2>

                        {/* Поле вводу */}
                        <div className="input-wrapper">
                            <input
                                type="text"
                                placeholder="Ваш нікнейм"
                                className="minecraft-input centered-input"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                            />
                        </div>

                        {/* Кнопка */}
                        <button
                            onClick={fetchLastSpawn}
                            className="minecraft-btn"
                            style={{ maxWidth: "300px", width: "100%" }}
                        >
                            Показати
                        </button>

                        {/* Результат (успіх) */}
                        {lastSpawn && (
                            <div className="result-frame">
                                <p className="result-title">✅ Знайдено!</p>
                                <p><strong>Координати:</strong> {lastSpawn.coordinates}</p>
                                <p><strong>Дата:</strong> {new Date(lastSpawn.set_date).toLocaleString()}</p>
                            </div>
                        )}

                        {/* Результат (помилка) */}
                        {spawnError && (
                            <div className="result-frame error">
                                <p>❌ {spawnError}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpawnLocation;