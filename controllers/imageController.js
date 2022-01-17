const { rs, re } = require("../utils/utils");
const qs = require("qs");
const axios = require("axios");

const API_KEY = "73d5b4e2a425c8682ebf04098326d042";
const API_URL = "https://api.themoviedb.org/3/search/movie";

const getImage = async (params) => {
    let { title, year } = params;

    try {
        console.log(title, year);
        let tmdbResult = await searchTMDB({ title, year });
        return tmdbResult;
    } catch (error) {
        return console.log(error);
    }
};

const searchTMDB = async ({ title, year }) => {
    let searchParams = {
        query: title,
        api_key: API_KEY,
        page: 1,
    };

    if (year) {
        searchParams["year"] = year;
    }

    const url = `${API_URL}?${qs.stringify(searchParams)}`;
    let resp = await axios.default.get(url);
    let result = resp.data.results[0];
    // console.log("result: ", result);
    if (result) {
        result.poster_path = `https://image.tmdb.org/t/p/w500${result.poster_path}`;
    } else {
        result = {
            poster_path: `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg`,
        };
    }
    return result.poster_path;
};

module.exports = { getImage };
