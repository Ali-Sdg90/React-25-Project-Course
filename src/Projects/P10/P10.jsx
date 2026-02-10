import React, { useEffect, useState } from "react";
import Style from "./P10.module.css";

const P10 = () => {
    const [userName, setUserName] = useState("Ali-Sdg90");
    const [data, setData] = useState({
        data: [],
        isLoading: true,
        errorMsg: "",
    });

    useEffect(() => {
        setData({
            data: [],
            isLoading: true,
            errorMsg: "",
        });

        const getData = async () => {
            try {
                const response = await fetch(
                    "https://api.github.com/users/" + userName
                );
                const data = await response.json();

                setData({ data: data, isLoading: false, errorMsg: "" });
            } catch (err) {
                setData({ data: [], isLoading: false, errorMsg: err });
            }
        };

        getData();
    }, [userName]);

    return (
        <div className={Style.container}>
            <span>GitHub Username: </span>
            <input
                type="text"
                value={userName}
                placeholder="GitHub Username"
                onChange={(e) => setUserName(e.target.value)}
            />
            {!data.isLoading ? (
                data.errorMsg ? (
                    <h1>Error: {data.errorMsg.message}</h1>
                ) : data.data.id ? (
                    <div className={Style.dataContainer}>
                        {/* {console.log(data)} */}
                        <img src={data.data.avatar_url} />
                        <div>Name: {data.data.name ? data.data.name : "-"}</div>
                        <div>
                            Company:{" "}
                            {data.data.company ? data.data.company : "-"}
                        </div>
                        <div>Created at: {data.data.created_at}</div>
                        <div>
                            Number of Public Repos:{" "}
                            {data.data.public_repos
                                ? data.data.public_repos
                                : "0"}
                        </div>
                        <a
                            href={data.data.html_url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <button>Link to GitHub Profile</button>
                        </a>
                    </div>
                ) : (
                    <h1>{data.data.message}</h1>
                )
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
};

export default P10;
