const { rs, re, qu } = require("../utils/utils");

const sample = async (req, res) => {
    let [err, data] = await qu("select * FROM movies WHERE year > 2005");
    if (err) return re(res, err);

    rs(res, data);
};
module.exports.sample = sample;