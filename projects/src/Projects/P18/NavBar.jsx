import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { cookingContext } from "./Context/Context";
import Style from "./NavBar.module.css";

const NavBar = ({ navMode }) => {
    const { search, setSearch, searchFavorite, setSearchFavorite } =
        useContext(cookingContext);

    return (
        <div className={Style.container}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <Link to={"/React-25-Project-Course/cooking-site/home"}>
                        <button>Recipes Home Page</button>
                    </Link>
                    <Link to={"/React-25-Project-Course/cooking-site/favorite"}>
                        <button>Favorite Recipes</button>
                    </Link>
                </div>

                {navMode !== "details" &&
                    (navMode === "Home" ? (
                        <div>
                            <span>Search in Recipes: </span>
                            <input
                                type="text"
                                value={search}
                                placeholder="Recipe Name"
                                onChange={(event) =>
                                    setSearch(event.target.value.toLowerCase())
                                }
                            />
                        </div>
                    ) : (
                        <div>
                            <span>Search in Favorites: </span>
                            <input
                                type="text"
                                value={searchFavorite}
                                placeholder="Favorite Recipe"
                                onChange={(event) =>
                                    setSearchFavorite(
                                        event.target.value.toLowerCase()
                                    )
                                }
                            />
                        </div>
                    ))}
            </div>

            <hr style={{ width: "100%" }} />
        </div>
    );
};

export default NavBar;
