import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Shop = () => {
    const [potions, setPotions] = useState([]);
    const [nickname, setNickname] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [menuActive, setMenuActive] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/api/potions")
            .then((response) => response.json())
            .then((data) => setPotions(data))
            .catch((error) => console.error("Помилка при отриманні зілля:", error));
    }, []);

    const handleBuyPotion = (potionName) => {
        if (nickname.trim() === "") {
            setErrorMessage("Будь ласка, введіть ваш нікнейм перед покупкою.");
            return;
        }

        const potion = potions.find((p) => p.name === potionName);
        if (!potion) { setErrorMessage("Зілля не знайдено."); return; }
        if (potion.amount <= 0) { setErrorMessage("Немає достатньо зілля для покупки."); return; }

        fetch(`http://localhost:5000/api/give-potion/${potion.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nickname }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    setPotions((prevPotions) =>
                        prevPotions.map((p) =>
                            p.id === potion.id ? { ...p, amount: p.amount - 1 } : p
                        )
                    );
                    setErrorMessage("");
                    alert(`Ви успішно купили ${potionName}!`);
                } else {
                    setErrorMessage(data.error || "Сталася помилка при видачі зілля.");
                }
            })
            .catch((error) => {
                setErrorMessage("Сталася помилка при видачі зілля.");
                console.error("Error:", error);
            });
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

            {/* 👇 ТУТ ЗМІНА: Додано клас "shop-wide" 👇 */}
            <div className="spawn-page-content shop-wide">

                <div className="spawn-header-section">
                    <div className="spawn-title">
                        <h1>Наявні зілля для покупки</h1>
                    </div>
                    <div className="spawn-map">
                        <img src="/assets/images/potion.gif" alt="Potions" />
                    </div>
                </div>

                <div className="shop-controls-container">
                    <div className="spawn-form-box" style={{ maxWidth: "600px" }}>
                        <h2 className="centered-text">Ваші дані</h2>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                placeholder="Введіть ваш нікнейм"
                                className="minecraft-input centered-input"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                            />
                        </div>
                        {errorMessage && (
                            <div className="result-frame error" style={{ marginTop: "10px" }}>
                                {errorMessage}
                            </div>
                        )}
                    </div>
                </div>

                <div className="shop-grid">
                    {potions.map((potion, index) => (
                        <div key={index} className="shop-card">
                            <h3>{potion.name}</h3>
                            <div className="shop-card-info">
                                <p><strong>Ефект:</strong> {potion.effect}</p>
                                <p><strong>Кількість:</strong> {potion.amount}</p>
                            </div>

                            <button
                                className="minecraft-btn shop-btn"
                                onClick={() => handleBuyPotion(potion.name)}
                                disabled={potion.amount <= 0}
                            >
                                {potion.amount > 0 ? "Купити" : "Немає в наявності"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Shop;