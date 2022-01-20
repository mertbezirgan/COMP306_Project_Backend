const { rs, re, qu } = require("../utils/utils");
const { getImage } = require("../controllers/imageController");

const getById = async (req, res) => {
    let { id } = req.params;

    let [err, actorData] = await qu(
        `
        select * from actors where id = ${id}
        `
    );
    if (err || actorData.length === 0) return re(res, err);
    actorData = actorData[0];

    let [err2, movieData] = await qu(
        `
        select 
            m.*, 
            r.* 
        from 
            actors as a, 
            roles as r, 
            movies as m 
        where 
            a.id = ${id}
            and a.id = r.actor_id 
            and r.movie_id = m.id;
        `
    );
    if (err2) return re(res, err2);

    for (let i = 0; i < movieData.length; i++) {
        movieData[i].poster_path = await getImage({
            title: movieData[i].name,
            year: movieData[i].year,
        });
    }

    return rs(res, { actorData, movieData });
};
module.exports.getById = getById;
