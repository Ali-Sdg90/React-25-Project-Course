import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

const P20 = () => {
    // const [data, setData] = useState({});
    const [chartState, setChartState] = useState({});
    const [getDataState, setGetDataState] = useState("loading");

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/proxy/cloudflare",
                );

                setGetDataState("success");

                // console.log("Response >>", res.data);

                // console.log(res.data.result.main.timestamps);
                // console.log(res.data.result.main.values);

                const timestamps = res.data.result.main.timestamps;
                const values = res.data.result.main.values;

                // const data = timestamps.map((value, index) => {
                //     return {
                //         x: value,
                //         y: values[index],
                //     };
                // });
                // console.log("Data >>", data);

                setChartState({
                    series: [
                        {
                            name: "Iran's Internet Traffic",
                            data: values,
                        },
                    ],
                    options: {
                        chart: {
                            height: 350,
                            type: "line",
                            zoom: {
                                enabled: false,
                            },
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        stroke: {
                            curve: "straight",
                        },
                        title: {
                            text: "Iran's Internet Traffic per 7 Days",
                            align: "left",
                        },
                        grid: {
                            row: {
                                colors: ["#f3f3f3", "transparent"],
                                opacity: 0.5,
                            },
                        },
                        xaxis: {
                            categories: timestamps,
                        },
                        theme: {
                            mode: "dark",
                            palette: "palette1",
                        },
                    },
                });
            } catch (error) {
                console.log("Error >>", error);
                setGetDataState("error");
            }
        };

        getData();
    }, []);

    return (
        <div>
            <h2>
                Get Data From Cloudflare API via My Custom Server and Display It
                with React ApexChart
            </h2>

            {getDataState === "success" && chartState.series ? (
                <ReactApexChart
                    options={chartState.options}
                    series={chartState.series}
                    type="line"
                    height={350}
                />
            ) : getDataState === "error" ? (
                <>
                    <div>Error loading data!</div>
                    <div>
                        This feature uses local server to proxy Cloudflare API
                        requests, so in github pages, this feature is not
                        working {":_("}
                    </div>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default P20;
