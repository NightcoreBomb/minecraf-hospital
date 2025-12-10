import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
    // Стан для мобільного меню
    const [menuActive, setMenuActive] = useState(false);

    return (
        <div className="home-container">
            {/* Навігація */}
            <nav className="navbar">
                <div className="nav-logo desktop-only">
                    <img src="/assets/images/pngwing.com (1).png" alt="Logo" />
                </div>

                {/* Кнопка меню (з'являється тільки на мобільному) */}
                <div className="burger-btn" onClick={() => setMenuActive(!menuActive)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                {/* Меню посилань */}
                <div className={`nav-links ${menuActive ? "active" : ""}`}>
                    <Link to="/set-spawn" onClick={() => setMenuActive(false)}>Встановити спавнпоінт</Link>
                    <Link to="/potion-recipe" onClick={() => setMenuActive(false)}>Отримати рецепт зілля</Link>
                    <Link to="/spawn-location" onClick={() => setMenuActive(false)}>Дізнатися де спавнпоінт</Link>
                    <Link to="/shop" onClick={() => setMenuActive(false)}>Наявні зілля</Link>
                </div>

                <div className="nav-logo desktop-only">
                    <img src="/assets/images/pngwing.com (1).png" alt="Logo" />
                </div>
            </nav>

            {/* Заголовок */}
            <header className="hero-header">
                <h1>Лікарня Minecraft</h1>
            </header>

            <div className="sub-header">Які в нас доступні функції?</div>

            {/* Блок 1: Картинка - Текст */}
            <section className="feature-row">
                <div className="feature-img">
                    <img src="/assets/images/maxresdefault.jpg" alt="Spawn Point" />
                </div>
                <div className="feature-text">
                    <h2 style={{ color: "#1fbfa4" }}>Встановлення спавнпоінту</h2>
                    <p>Не хочеш після смерті знову переноситися на спавн?</p>
                    <p>Встановлення точки відродження у наших лікарнях – це те, що тобі треба!</p>
                </div>
            </section>

            {/* Блок 2: Текст - Картинка */}
            <section className="feature-row reverse">
                <div className="feature-text">
                    <h2 style={{ color: "blue" }}>Отримати рецепт зілля</h2>
                    <p>Якщо ви впевнений в собі алхімік, ми можемо надати вам рецепт потрібного зілля!</p>
                    <p className="small-note">(Пам'ятайте, самолікування шкідливе для вашого здоров'я)</p>
                </div>
                <div className="feature-img">
                    <img src="/assets/images/hqdefault.jpg" alt="Potion Recipe" />
                </div>
            </section>

            {/* Блок 3: Картинка - Текст */}
            <section className="feature-row">
                <div className="feature-img">
                    <img src="/assets/images/histiry.jpg" alt="Spawn History" />
                </div>
                <div className="feature-text">
                    <h2 style={{ color: "#a71fbf" }}>Дізнатися вашу точку відродження</h2>
                    <p>Ви користувалися нашими послугами встановлення точки відродження?</p>
                    <p>Прекрасно! Ми можемо показати вам вашу актуальну точку відродження, а також історію загалом!</p>
                </div>
            </section>

            {/* Блок 4: Текст - Картинка */}
            <section className="feature-row reverse">
                <div className="feature-text">
                    <h2 style={{ color: "#b5182f" }}>Наявні зілля</h2>
                    <p>У вас немає вільного часу або можливостей займатися алхімією?</p>
                    <p>Нічого страшного! У нас ви завжди можете придбати зілля за символічну ціну!</p>
                </div>
                <div className="feature-img">
                    <img src="/assets/images/photo_2024-04-05_22-46-45.jpg" alt="Shop" />
                </div>
            </section>
        </div>
    );
};

export default Home;