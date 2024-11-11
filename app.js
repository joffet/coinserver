const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

const getCoinData = async () => {
  let response = null;
  try {
    response = await fetch(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=10&sort=market_cap&cryptocurrency_type=all&tag=all",
      {
        method: "GET",
        headers: {
          "X-CMC_PRO_API_KEY": process.env.COIN_KEY,
        },
      }
    );
  } catch (error) {
    console.log({ error });
  }
  console.log(response);
  return response;
};

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.get("/get", async (request, response) => {
  const data = await getCoinData();
  const json = await data?.json();
  response.set("Access-Control-Allow-Origin", "*"); // CORS sidestep
  response.send(json);
});
