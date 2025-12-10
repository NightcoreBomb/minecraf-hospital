import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const SetSpawn = () => {
    const [nickname, setNickname] = useState("");
    const [selectedCoords, setSelectedCoords] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [menuActive, setMenuActive] = useState(false);

    const coordinates = [
        "X: 100, Y: 64, Z: 200",
        "X: -50, Y: 70, Z: 300",
        "X: 250, Y: 65, Z: -100",
        "X: 466, Y: 65, Z: -1000",
    ];

    const handleSubmit = async () => {
        if (!nickname || !selectedCoords) {
            alert("Будь ласка, введіть нікнейм і виберіть координати.");
            return;
        }
        setIsLoading(true);
        const coordsOnly = selectedCoords.replace(/[^0-9,\s\-]/g, "").split(",").map(c => c.trim()).join(" ");
        const command = `spawnpoint ${nickname} ${coordsOnly}`;

        try {
            const response = await fetch('http://localhost:5000/api/rcon-command', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ host: '192.168.1.76', port: 25575, password: '22848', command })
            });
            const data = await response.json();
            if (response.ok) alert(`✅ Спавнпоінт встановлено!\nВідповідь: ${data.response}`);
            else alert(`❌ Помилка: ${data.error}`);
        } catch (err) {
            alert("❌ Помилка з'єднання.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="home-container">
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
                <div className="spawn-header-section">
                    <div className="spawn-title">
                        <h1>Встановити точку відродження</h1>
                    </div>
                    <div className="spawn-map">
                        <img src="/assets/images/map.png" alt="Map" />
                    </div>
                </div>

                <div className="spawn-interaction-area">

                    {/* ІНСТРУКЦІЯ (Повернуто старий вигляд) */}
                    <div className="spawn-instructions">
                        <p>1. Ввести ваш нікнейм</p>
                        <p>2. Вибрати з переліку координату, ті які вам підходять</p>
                        <p>3. Натиснути кнопку "Обрати"</p>
                        <p>4. Трошки зачекати</p>
                    </div>

                    {/* ПАНЕЛЬ КЕРУВАННЯ */}
                    <div className="spawn-form-box">
                        <h2 className="centered-text">Панель керування</h2>

                        <div className="input-wrapper">
                            <input
                                type="text"
                                placeholder="Ваш нікнейм"
                                className="minecraft-input centered-input"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                            />
                        </div>

                        <div className="form-row-horizontal">
                            <select
                                className="minecraft-select"
                                value={selectedCoords}
                                onChange={(e) => setSelectedCoords(e.target.value)}
                            >
                                <option value="" disabled>Оберіть координати</option>
                                {coordinates.map((coord, index) => (
                                    <option key={index} value={coord}>{coord}</option>
                                ))}
                            </select>

                            <button
                                className="minecraft-btn"
                                onClick={handleSubmit}
                                disabled={isLoading}
                            >
                                {isLoading ? "..." : "Обрати"}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SetSpawn;