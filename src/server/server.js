require("dotenv").config({ path: "../../../.env" });
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/proxy/cloudflare", async (_req, res) => {
    try {
        console.log("Request received for Cloudflare API");

        const response = await axios.get(
            "https://api.cloudflare.com/client/v4/radar/netflows/timeseries",
            {
                headers: {
                    Authorization: "Bearer " + process.env.CLOUDFLARE_API_TOKEN,
                },
                params: {
                    name: "main",
                    location: "IR",
                    dateRange: "7d",
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
