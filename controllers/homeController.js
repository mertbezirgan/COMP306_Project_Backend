const { connect } = require("../config/dbConfig");
const { rs, re, qu } = require("../utils/utils");

const searchMovies = async (req, res) => {
    let {
        name,
        sYear,
        eYear,
        sRank,
        eRank,
        selectedGenre,
        startIndex,
        length,
    } = req.body;
    if (startIndex === undefined || length === undefined)
        return re(res, { message: "Please give startIndex and length" }, 400);
    if (sYear === NaN) sYear = null;
    if (eYear === NaN) eYear = null;
    if (sRank === NaN) sRank = null;
    if (eRank === NaN) eRank = null;
    console.log(name, sYear, eYear, sRank, eRank, selectedGenre);
    // if(name === "" && !sYear && !eYear && !sRank && !eRank) return getRandomMovies();
    // and ${selectedGenre != null ? `(mo.id = mg.movie_id and STRCMP(mg.genre, "${selectedGenre}") = 0` : "true" }

    if (selectedGenre) {
        let [err, data] = await qu(
            `select mo.*
			from (SELECT DISTINCT movies.* FROM movies, movies_genres WHERE movies.id = movies_genres.movie_id AND STRCMP(movies_genres.genre, "${selectedGenre}") = 0) as mo
			where
				(${sYear} is null or mo.year > ${sYear})
				and (${eYear} is null or mo.year < ${eYear})
				and (${sRank} is null or mo.rank > ${sRank})
				and (${eRank} is null or mo.rank < ${eRank})
				and ${name != "" ? `name like "%${name}%" ` : "true"} 
			order by id
			limit ${length}
			offset ${startIndex}`
        );
        if (err) return re(res, err);

        return rs(res, data);
    } else {
        let [err, data] = await qu(
            `select mo.*
			from movies as mo
			where
				(${sYear} is null or mo.year > ${sYear})
				and (${eYear} is null or mo.year < ${eYear})
				and (${sRank} is null or mo.rank > ${sRank})
				and (${eRank} is null or mo.rank < ${eRank})
				and ${name != "" ? `name like "%${name}%" ` : "true"} 
			order by id
			limit ${length}
			offset ${startIndex}`
        );
        if (err) return re(res, err);

        return rs(res, data);
    }
};
module.exports.searchMovies = searchMovies;

const getRandomMovies = async (req, res) => {
    // if (startIndex === undefined || length === undefined) return re(res, { message: 'Please give startIndex and length' }, 400);

    let [err, data] = await qu(
        `select mo.*
		from movies as mo
		order by RAND()
		limit 15`
    );
    if (err) return re(res, err);

    return rs(res, data);
};
module.exports.getRandomMovies = getRandomMovies;

const getDistinctGenres = async (req, res) => {
    let [err, data] = await qu(
        `select distinct genre
		from movies_genres`
    );
    if (err) return re(res, err);
    return rs(res, data);
};
module.exports.getDistinctGenres = getDistinctGenres;
