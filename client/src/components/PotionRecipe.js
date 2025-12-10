import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const effectStyles = {
    "Швидкість": { color: "#00BFFF" },
    "Сила": { color: "red" },
    "Відновлення": { color: "limegreen" },
    "Нічне бачення": { color: "#0022ff" },
    "Невидимість": { color: "#555" },
    "Вогнестійкість": { color: "#FF8C00" },
    "Водне дихання": { color: "#1E90FF" },
    "Стрибучість": { color: "#3be10d" },
    "Повільне падіння": { color: "#A0522D" },
    "Слабкість": { color: "#808080" },
    "Отруєння": { color: "darkgreen" },
    "Шкода": { color: "#8B0000" },
    "Стійкість та Повільність": { color: "#556B2F" },
};

const potionsData = [
    {
        id: 1,
        name: "Зілля швидкості",
        effect: "Швидкість",
        steps: [
            "Заповніть пляшечки водою.",
            "Додайте Незерський наріст для отримання Незавершеного зілля.",
            "Додайте Цукор для створення Зілля швидкості.",
            "Опціонально: додайте Червоний камінь для подовження тривалості.",
        ],
        ingredients: ["Пляшечка води", "Незерський наріст", "Цукор", "Червоний камінь (опціонально)"],
    },
    {
        id: 2,
        name: "Зілля сили",
        effect: "Сила",
        steps: [
            "Заповніть пляшечки водою.",
            "Додайте Незерський наріст для отримання Незавершеного зілля.",
            "Додайте Порошок Іфріта для створення Зілля сили.",
            "Опціонально: додайте Червоний камінь для подовження тривалості.",
        ],
        ingredients: ["Пляшечка води", "Незерський наріст", "Порошок Іфріта", "Червоний камінь (опціонально)"],
    },
    {
        id: 3,
        name: "Зілля регенерації",
        effect: "Відновлення",
        steps: [
            "Заповніть пляшечки водою.",
            "Додайте Незерський наріст для отримання Незавершеного зілля.",
            "Додайте Сльозу Ґаста для створення Зілля регенерації.",
            "Опціонально: додайте Червоний камінь для подовження тривалості.",
        ],
        ingredients: ["Пляшечка води", "Незерський наріст", "Сльоза Ґаста", "Червоний камінь (опціонально)"],
    },
    {
        id: 4,
        name: "Зілля нічного бачення",
        effect: "Нічне бачення",
        steps: [
            "Заповніть пляшечки водою.",
            "Додайте Незерський наріст для отримання Незавершеного зілля.",
            "Додайте Золоту моркву для створення Зілля нічного бачення.",
            "Опціонально: додайте Червоний камінь для подовження тривалості.",
        ],
        ingredients: ["Пляшечка води", "Незерський наріст", "Золота морква", "Червоний камінь (опціонально)"],
    },
    {
        id: 5,
        name: "Зілля невидимості",
        effect: "Невидимість",
        steps: [
            "Приготуйте Зілля нічного бачення.",
            "Додайте Зброджене павуче око для перетворення на Зілля невидимості.",
            "Опціонально: додайте Червоний камінь для подовження тривалості.",
        ],
        ingredients: ["Зілля нічного бачення", "Зброджене павуче око", "Червоний камінь (опціонально)"],
    },
    {
        id: 6,
        name: "Зілля вогнестійкості",
        effect: "Вогнестійкість",
        steps: [
            "Заповніть пляшечки водою.",
            "Додайте Незерський наріст для отримання Незавершеного зілля.",
            "Додайте Кремезний крем для створення Зілля вогнестійкості.",
            "Опціонально: додайте Червоний камінь для подовження тривалості.",
        ],
        ingredients: ["Пляшечка води", "Незерський наріст", "Кремезний крем", "Червоний камінь (опціонально)"],
    },
    {
        id: 7,
        name: "Зілля водного дихання",
        effect: "Водне дихання",
        steps: [
            "Заповніть пляшечки водою.",
            "Додайте Незерський наріст для отримання Незавершеного зілля.",
            "Додайте Рибу-сферу для створення Зілля водного дихання.",
            "Опціонально: додайте Червоний камінь для подовження тривалості.",
        ],
        ingredients: ["Пляшечка води", "Незерський наріст", "Риба-сфера", "Червоний камінь (опціонально)"],
    },
    {
        id: 8,
        name: "Зілля стрибучості",
        effect: "Стрибучість",
        steps: [
            "Заповніть пляшечки водою.",
            "Додайте Незерський наріст для отримання Незавершеного зілля.",
            "Додайте Кролячу лапку для створення Зілля стрибучості.",
            "Опціонально: додайте Червоний камінь для подовження тривалості.",
        ],
        ingredients: ["Пляшечка води", "Незерський наріст", "Кроляча лапка", "Червоний камінь (опціонально)"],
    },
    {
        id: 9,
        name: "Зілля повільного падіння",
        effect: "Повільне падіння",
        steps: [
            "Заповніть пляшечки водою.",
            "Додайте Незерський наріст для отримання Незавершеного зілля.",
            "Додайте Мембрану фантома для створення Зілля повільного падіння.",
            "Опціонально: додайте Червоний камінь для подовження тривалості.",
        ],
        ingredients: ["Пляшечка води", "Незерський наріст", "Мембрана фантома", "Червоний камінь (опціонально)"],
    },
    {
        id: 10,
        name: "Зілля слабкості",
        effect: "Слабкість",
        steps: [
            "Заповніть пляшечки водою.",
            "Додайте Зброджене павуче око для створення Зілля слабкості.",
            "Опціонально: додайте Червоний камінь для подовження тривалості.",
        ],
        ingredients: ["Пляшечка води", "Зброджене павуче око", "Червоний камінь (опціонально)"],
    },
    {
        id: 11,
        name: "Зілля отрути",
        effect: "Отруєння",
        steps: [
            "Заповніть пляшечки водою.",
            "Додайте Незерський наріст для отримання Незавершеного зілля.",
            "Додайте Павуче око для створення Зілля отрути.",
            "Опціонально: додайте Червоний камінь для подовження тривалості.",
        ],
        ingredients: ["Пляшечка води", "Незерський наріст", "Павуче око", "Червоний камінь (опціонально)"],
    },
    {
        id: 12,
        name: "Зілля шкоди",
        effect: "Шкода",
        steps: [
            "Приготуйте Зілля отрути або Зілля відновлення.",
            "Додайте Зброджене павуче око для перетворення на Зілля шкоди.",
        ],
        ingredients: ["Зілля отрути або Зілля відновлення", "Зброджене павуче око"],
    },
    {
        id: 13,
        name: "Зілля майстра черепах",
        effect: "Стійкість та Повільність",
        steps: [
            "Заповніть пляшечки водою.",
            "Додайте Незерський наріст для отримання Незавершеного зілля.",
            "Додайте Черепашачий панцир для створення Зілля майстра черепах.",
            "Опціонально: додайте Червоний камінь для подовження тривалості.",
        ],
        ingredients: ["Пляшечка води", "Незерський наріст", "Черепашачий панцир", "Червоний камінь (опціонально)"],
    },
];

const PotionRecipe = () => {
    const [selectedPotion, setSelectedPotion] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [menuActive, setMenuActive] = useState(false);

    const handlePotionSelect = (potion) => {
        setSelectedPotion(potion);
        setCurrentStep(0);
    };

    const nextStep = () => {
        if (currentStep < selectedPotion.steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="home-container">
            {/* Меню (Таке саме як і на інших сторінках) */}
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
                {/* Заголовок і картинка (Використовуємо старі класи для сумісності) */}
                <div className="spawn-header-section">
                    <div className="spawn-title">
                        <h1>Отримати рецепт зілля</h1>
                    </div>
                    <div className="spawn-map">
                        <img src="/assets/images/recipes.jpg" alt="Potion Recipes" />
                    </div>
                </div>

                {/* Основний блок рецептів (Поміщений в адаптивний контейнер) */}
                <div className="spawn-interaction-area">
                    <div className="spawn-form-box" style={{ maxWidth: "800px" }}> {/* Трохи ширше для тексту */}
                        <h2 className="centered-text">Оберіть зілля для рецепту</h2>

                        <div className="input-wrapper">
                            <select
                                className="minecraft-select"
                                onChange={(e) => handlePotionSelect(potionsData.find(p => p.id === parseInt(e.target.value)))}
                            >
                                <option value="">-- Виберіть зілля --</option>
                                {potionsData.map(potion => (
                                    <option key={potion.id} value={potion.id}>{potion.name}</option>
                                ))}
                            </select>
                        </div>

                        {selectedPotion && (
                            <div className="potion-details">
                                <h3 className="centered-text" style={{ fontSize: "1.8rem", marginTop: "20px" }}>
                                    {selectedPotion.name}
                                </h3>

                                <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
                                    <strong>Ефект: </strong>
                                    <span style={{
                                        fontWeight: "bold",
                                        ...(effectStyles[selectedPotion.effect] || { color: "black" })
                                    }}>
                                       {selectedPotion.effect}
                                    </span>
                                </p>

                                <div className="ingredients-box">
                                    <h4>Інгредієнти:</h4>
                                    <ul>
                                        {selectedPotion.ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="steps-box">
                                    <h4>Крок {currentStep + 1} з {selectedPotion.steps.length}:</h4>
                                    <p className="step-text">{selectedPotion.steps[currentStep]}</p>
                                </div>

                                <div className="form-row-horizontal" style={{ marginTop: "20px" }}>
                                    <button
                                        className="minecraft-btn"
                                        onClick={prevStep}
                                        disabled={currentStep === 0}
                                        style={{ backgroundColor: currentStep === 0 ? "#ccc" : "#28a745" }}
                                    >
                                        Назад
                                    </button>
                                    <button
                                        className="minecraft-btn"
                                        onClick={nextStep}
                                        disabled={currentStep === selectedPotion.steps.length - 1}
                                        style={{ backgroundColor: currentStep === selectedPotion.steps.length - 1 ? "#ccc" : "#28a745" }}
                                    >
                                        Далі
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PotionRecipe;