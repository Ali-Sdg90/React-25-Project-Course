import React, { useEffect, useState } from "react";
import Style from "./P11.module.css";

const P11 = () => {
    const [inputName, setInputName] = useState("");
    const [suggestedNames, setSuggestedNames] = useState([]);
    const [data, setData] = useState({
        data: [],
        isLoading: true,
        errorMsg: "",
    });

    useEffect(() => {
        setSuggestedNames(
            data.data.filter((item) => item.indexOf(inputName) !== -1)
        );
    }, [inputName]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch("https://dummyjson.com/users");
                const data = await response.json();

                setData({
                    data: data.users.map((user) => user.firstName),
                    isLoading: false,
                    errorMsg: "",
                });
            } catch (error) {
                setData({
                    data: [],
                    isLoading: false,
                    errorMsg: error.message,
                });
            }
        };

        getData();
    }, []);

    return (
        <div className={Style.container}>
            <span>Search Name: </span>
            <input
                placeholder="First Name"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
            />
            {inputName && (
                <div>
                    {suggestedNames.map((item) => {
                        return <div>{item}</div>;
                    })}
                </div>
            )}
        </div>
    );
};

export default P11;
