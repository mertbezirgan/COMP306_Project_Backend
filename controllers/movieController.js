const { rs, re, qu } = require("../utils/utils");
const { getImage } = require("../controllers/imageController");

const getById = async (req, res) => {
    let { id } = req.params;

    let [err, movieData] = await qu(
        `
        select 
            movies.*,
            group_concat(distinct movies_genres.genre separator ', ') as 'genres'
        from 
            movies
        left join movies_genres on movies.id = movies_genres.movie_id
        where 
            movies.id = ${id}
        group by 
            movies.id;
        `
    );
    if (err || movieData.length === 0) return re(res, err);

    movieData = movieData[0];
    const imageData = await getImage({
        title: movieData.name,
        year: movieData.year,
    });

    let [err3, directorData] = await qu(
        `
        select 
            directors.id as 'did',
            directors.first_name as 'dfn',
            directors.last_name as 'dln'
        from 
            movies
        left join movies_directors on movies.id = movies_directors.movie_id
        left join directors on movies_directors.director_id = directors.id
        where 
            movies.id = ${id};
        `
    );
    if (err3) return re(res, err3);

    let [err2, actorsData] = await qu(
        `select r.actor_id as 'actor_id', a.first_name as 'afn', a.last_name as 'aln', a.gender as 'gender', r.role as 'role' from movies as mo, roles as r, actors as a where mo.id = ${id} and mo.id = r.movie_id and r.actor_id = a.id;`
    );
    if (err2) return re(res, err2);

    return rs(res, { movieData, actorsData, directorData, imageData });
};
module.exports.getById = getById;
