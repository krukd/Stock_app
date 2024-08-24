import axios from "axios";

const TOKEN = "cr456p9r01ql234htuugcr456p9r01ql234htuv0";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN,
  },
});
