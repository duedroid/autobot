const axios = require("axios");

const crypto = require("crypto");

const serverTimestamp = async () => {
  const url = `${process.env.BINANCE_API_URL}/api/v3/time`;
  const res = await axios.get(url);
  return res.data.serverTime;
};

const createSignature = async (data, apiSecret) => {
  data.timestamp = await serverTimestamp();
  const dataStr = new URLSearchParams(data)
  console.log(dataStr.toString())
  return crypto
    .createHmac("sha256", apiSecret)
    .update(dataStr.toString())
    .digest("hex");
};

module.exports = { createSignature };
