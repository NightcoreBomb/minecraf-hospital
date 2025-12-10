import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/home.css";

const AdminPotions = () => {
    const [potions, setPotions] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/potions")  // Переконайся, що правильний шлях до API
            .then((res) => {
                const grouped = groupPotions(res.data);
                setPotions(grouped);
            })
            .catch((err) => console.error("Помилка завантаження зіль:", err));
    }, []);

    const groupPotions = (data) => {
        const grouped = {};
        data.forEach((potion) => {
            if (!grouped[potion.name]) {
                grouped[potion.name] = { name: potion.name, effect: potion.effect, amount: potion.amount, id: potion.id };
            } else {
                grouped[potion.name].amount += potion.amount;
            }
        });
        return Object.values(grouped);
    };

    // Оновити кількість зілля
    const updatePotionAmount = (potionId, newAmount) => {
        axios.post("http://localhost:5000/api/potions/update", { potionId, amount: newAmount })
            .then(() => {
                setPotions((prevPotions) =>
                    prevPotions.map((potion) =>
                        potion.id === potionId ? { ...potion, amount: newAmount } : potion
                    )
                );
            })
            .catch((err) => console.error("Помилка оновлення кількості зілля:", err));
    };

    // Обробники кнопок
    const handleDecrease = (potionId, amount) => {
        if (amount > 0) {
            updatePotionAmount(potionId, amount - 1);
        }
    };

    const handleIncrease = (potionId, amount) => {
        updatePotionAmount(potionId, amount + 1);
    };

    return (
        <div className="content">
            <div className="main_text" style={{ marginTop: "20px" }}>Редагування кількості зіль</div>
            <div className="box1" style={{ flexWrap: "wrap", gap: "40px", justifyContent: "center", marginTop: "200px" }}>
                {potions.map((potion, index) => (
                    <div key={index} style={{
                        background: "white",
                        borderRadius: "30px",
                        padding: "20px",
                        width: "250px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                        textAlign: "center",
                        position: "relative"  // Для кнопок з `z-index`
                    }}>
                        <h3 style={{ fontFamily: "Minecraft 1.1" }}>{potion.name}</h3>
                        <p style={{ fontFamily: "Minecraft 1.1" }}>Ефект: {potion.effect}</p>
                        <p style={{ fontFamily: "Minecraft 1.1" }}>Кількість: {potion.amount}</p>
                        <div style={{ display: "flex", justifyContent: "center", gap: "10px", position: "relative", zIndex: "10" }}>
                            <button
                                className="potion-button"
                                onClick={() => handleDecrease(potion.id, potion.amount)}
                            >
                                -
                            </button>
                            <button
                                className="potion-button"
                                onClick={() => handleIncrease(potion.id, potion.amount)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPotions;
