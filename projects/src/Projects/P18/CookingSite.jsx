import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Details from "./Pages/Details";
import Favorite from "./Pages/Favorite";
import Context from "./Context/Context";

const CookingSite = () => {
    return (
        <div>
            <Context>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/details/:id" element={<Details />} />
                    <Route path="/favorite" element={<Favorite />} />
                    <Route
                        path="*"
                        element={<h1>Cooking Page Not Found!</h1>}
                    />
                </Routes>
            </Context>
        </div>
    );
};

export default CookingSite;
