const { rs, re, qu } = require("../utils/utils");
const { getImage } = require("../controllers/imageController");

const getById = async (req, res) => {
    let { id } = req.params;

    let [err, directorData] = await qu(
        `
        select 
            directors.*, 
            group_concat(
                distinct directors_genres.genre separator ', '
            ) as 'genres' 
        from 
            directors 
        left join directors_genres on directors.id = directors_genres.director_id 
        where 
            directors.id = ${id}
        group by 
            directors.id;
        `
    );
    if (err || directorData.length === 0) return re(res, err);
    directorData = directorData[0];

    let [err2, movieData] = await qu(
        `
        select 
            m.* 
        from 
            directors as d, 
            movies_directors as md, 
            movies as m 
        where 
            d.id = ${id} 
            and d.id = md.director_id 
            and md.movie_id = m.id;
        `
    );
    if (err2) return re(res, err2);

    for (let i = 0; i < movieData.length; i++) {
        movieData[i].poster_path = await getImage({
            title: movieData[i].name,
            year: movieData[i].year,
        });
    }

    return rs(res, { directorData, movieData });
};
module.exports.getById = getById;
