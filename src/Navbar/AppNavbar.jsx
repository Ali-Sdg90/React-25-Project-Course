import React, { useEffect, useState } from "react";
import Style from "./AppNavbar.module.css";
import { Link, useLocation } from "react-router-dom";

const AppNavbar = () => {
    const location = useLocation();

    const [isInCookingSite, setIsInCookingSite] = useState(false);
    const [profileImg, setProfileImg] = useState("");

    useEffect(() => {
        if (location.pathname.includes("cooking-site")) {
            setIsInCookingSite(true);
        } else {
            setIsInCookingSite(false);
        }
    }, [location.pathname]);

    useEffect(() => {
        setProfileImg(getRandomProfileImg);
    }, []);

    const changeImg = () => {
        setProfileImg(getRandomProfileImg);
    };

    const getRandomProfileImg = () => {
        const isMale = !!Math.floor(Math.random() * 2);

        const randomNumber = Math.floor(Math.random() * 78);

        // console.log(
        //     `https://xsgames.co/randomusers/assets/avatars/${
        //         isMale ? "male" : "female"
        //     }/${randomNumber}.jpg`
        // );

        return `https://xsgames.co/randomusers/assets/avatars/${
            isMale ? "male" : "female"
        }/${randomNumber}.jpg`;
    };

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
                <img
                    src={profileImg}
                    className={Style.img}
                    alt="Profile image"
                    title="Click to Change"
                    onClick={changeImg}
                />
            </div>
        </span>
    );
};

export default AppNavbar;
