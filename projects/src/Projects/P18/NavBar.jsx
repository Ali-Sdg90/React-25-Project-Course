import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { cookingContext } from "./Context/Context";

const NavBar = () => {
    const { search, setSearch } = useContext(cookingContext);

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <Link to={"/React-25-Project-Course/cooking-site/home"}>
                        <button>Cooking Site Main Page</button>
                    </Link>
                    <Link to={"/React-25-Project-Course/cooking-site/favorite"}>
                        <button>My Favorites</button>
                    </Link>
                </div>

                <div>
                    <span>Search: </span>
                    <input
                        type="text"
                        value={search}
                        placeholder="Food Name"
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>
            </div>
            <hr style={{ width: "100%" }} />
        </>
    );
};

export default NavBar;
