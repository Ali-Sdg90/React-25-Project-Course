import React, { useEffect, useState } from "react";

const useFetchHook = ({ url, options = {} }) => {
    const [fetchData, setFetchData] = useState({
        data: null,
        isLoading: true,
        errorMsg: "",
    });

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(url, options);

                if (response.ok) {
                    const data = await response.json();

                    setFetchData({
                        data: data,
                        isLoading: false,
                        errorMsg: "",
                    });
                } else {
                    setFetchData({
                        data: null,
                        isLoading: false,
                        errorMsg: `ERROR: ${response.status}`,
                    });
                }
            } catch (error) {
                setFetchData({
                    data: null,
                    isLoading: false,
                    errorMsg: `ERROR: ${error.message}`,
                });
            }
        };

        getData();
    }, [url, options]);

    return fetchData;
};

export default useFetchHook;
