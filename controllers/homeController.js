const { rs, re, qu } = require("../utils/utils");

const searchMovies = async (req, res) => {
	let { query, startIndex, length } = req.body;
    if (startIndex === undefined || length === undefined) return re(res, { message: 'Please give startIndex and length' }, 400);

	let [err, data] = await qu(
		`select mo.* from movies as mo where ${
			query ? `name like "%${query}%" ` : ""
		} order by id limit ${length} offset ${startIndex}`
	);
	if (err) return re(res, err);

	return rs(res, data);
};
module.exports.searchMovies = searchMovies;
