const { rs, re, qu } = require("../utils/utils");

const searchMovies = async (req, res) => {
	let { name, sYear, eYear, sRank, eRank , startIndex, length } = req.body;
    if (startIndex === undefined || length === undefined) return re(res, { message: 'Please give startIndex and length' }, 400);

	let [err, data] = await qu(
		`select mo.*
		from movies as mo
		where 
			${name != "" ? `name like "%${name}%" ` : "" }
		order by id
		limit ${length}
		offset ${startIndex}`
	);
	if (err) return re(res, err);

	return rs(res, data);
};
module.exports.searchMovies = searchMovies;


const getRandomMovies = async (req, res) => {
    // if (startIndex === undefined || length === undefined) return re(res, { message: 'Please give startIndex and length' }, 400);

	let [err, data] = await qu(
		`select mo.*
		from movies as mo
		order by RAND()
		limit 10`
	);
	if (err) return re(res, err);

	return rs(res, data);
}
module.exports.getRandomMovies = getRandomMovies;