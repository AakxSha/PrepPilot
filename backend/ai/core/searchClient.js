const axios = require("axios");

async function search(query) {
  const response = await axios.get("https://api.tavily.com/search", {
    params: {
      api_key: process.env.TAVILY_API_KEY,
      query: query,
      max_results: 5,
    },
  });

  return response.data.results;
}

module.exports = search;
