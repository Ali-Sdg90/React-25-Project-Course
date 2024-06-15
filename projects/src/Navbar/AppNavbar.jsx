import React, { useEffect, useState } from "react";
import Style from "./AppNavbar.module.css";
import { Link, useLocation } from "react-router-dom";

const AppNavbar = () => {
    const location = useLocation();

    const [isInCookingSite, setIsInCookingSite] = useState(false);

    useEffect(() => {
        if (location.pathname.includes("cooking-site")) {
            setIsInCookingSite(true);
        } else {
            setIsInCookingSite(false);
        }
    }, [location.pathname]);

    return (
        <span className={Style.container}>
            <div className={Style.leftSide}>
                {isInCookingSite ? (
                    <Link to={"/React-25-Project-Course"}>
                        <button>Main Page</button>
                    </Link>
                ) : (
                    <Link to={"/React-25-Project-Course/cooking-site/home"}>
                        <button>Cooking Page</button>
                    </Link>
                )}
            </div>

            <h1>- React 25 Project Course -</h1>

            <div className={Style.rightSection}>
                <div>IMG</div>
            </div>
        </span>
    );
};

export default AppNavbar;
