const { rs, re, qu } = require("../utils/utils");

const searchMovies = async (req, res) => {
	let { query, startIndex, length } = req.body;
    if (!startIndex || !length) return re(res, { message: 'Please give startIndex and length' }, 400);

	let [err, data] = await qu(
		`select mo.*, mg.genre from movies as mo, movies_genres as mg where ${
			query ? `name like "%${query}%" and` : ""
		} mo.id = mg.movie_id order by id limit ${length} offset ${startIndex}`
	);
	if (err) re(res, err);

	rs(res, data);
};
module.exports.searchMovies = searchMovies;
