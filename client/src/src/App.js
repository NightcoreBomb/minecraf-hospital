import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Shop from "./components/Shop";
import SetSpawn from "./components/SetSpawn";
import PotionRecipe from "./components/PotionRecipe";
import SpawnLocation from "./components/SpawnLocation";
import AdminPotions from "./components/AdminPotions";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/set-spawn" element={<SetSpawn />} />
                <Route path="/potion-recipe" element={<PotionRecipe />} />
                <Route path="/spawn-location" element={<SpawnLocation />} />
                <Route path="/admin-potions" element={<AdminPotions />} />
            </Routes>
        </Router>
    );
}

export default App;
