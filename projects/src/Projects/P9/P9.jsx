import React, { useEffect, useState } from "react";
import Style from "./P9.module.css";

const BASE_URL = "https://dummyjson.com/users";

const P9 = () => {
    const [selectedTab, setSelectedTab] = useState(-1);
    const [tabOutput, setTabOutput] = useState("");
    const [numberOfTabs, setNumberOfTabs] = useState(10);
    const [data, setData] = useState({
        data: [],
        isLoading: true,
        errorMsg: "",
    });

    const getData = async () => {
        try {
            const response = await fetch(BASE_URL);

            const data = await response.json();

            const users = data.users;

            setData({
                data: users,
                isLoading: false,
                errorMsg: "",
            });
        } catch (error) {
            console.log(error);

            setData({
                data: [],
                isLoading: false,
                errorMsg: error,
            });
        }
    };

    const tabMaker = (noOfTabs = 3) => {
        const tabs = [];

        for (let i = 0; i < noOfTabs; i++) {
            tabs.push(
                <div className={Style.tabs} onClick={() => setSelectedTab(i)}>
                    Tab {i + 1}
                </div>
            );
        }

        return tabs;
    };

    useEffect(() => {
        return () => getData();
    }, []);

    useEffect(() => {
        setTabOutput(data.data[selectedTab]);
    }, [selectedTab]);

    return (
        <div className={Style.container}>
            {!data.isLoading ? (
                data.errorMsg ? (
                    <h1>ERROR: {data.errorMsg}</h1>
                ) : (
                    <>
                        <div className={Style.tabInput}>
                            <div>Number of Tabs: </div>
                            <div>
                                <input
                                    type="number"
                                    value={numberOfTabs}
                                    max="30"
                                    min="0"
                                    onChange={(e) => {
                                        setNumberOfTabs(e.target.value);
                                    }}
                                />
                                <span>/30</span>
                            </div>
                        </div>

                        <div className={Style.tabs}>
                            {tabMaker(numberOfTabs)}
                        </div>
                        {tabOutput && (
                            <>
                                <h5>
                                    {tabOutput.id}. {tabOutput.firstName}{" "}
                                    {tabOutput.lastName}
                                </h5>
                                <div>Email: {tabOutput.email}</div>
                                <div>Phone: {tabOutput.phone}</div>
                            </>
                        )}
                    </>
                )
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
};

export default P9;
