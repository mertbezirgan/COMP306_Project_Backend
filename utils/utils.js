
const db = require("../config/dbConfig");

// Util for returning query into promise
const qu = (q) => {
    return new Promise((resolve) => {
        try {
            db.query(q, (err, result) => {
                if (err) resolve([err, null]);
                else resolve([null, result]);
            });
        } catch (error) {
            resolve([error, null]);
        }
    });
};
module.exports.qu = qu;

// Util for returning success data
const rs = (res, data, status) => {
    res.status(status || 200).send({
        'success': true,
        data
    });
};
module.exports.rs = rs;

// Util for returning error data
const re = (res, error, status) => {
    res.status(status || 500).send({
        'success': false,
        error
    });
};
module.exports.re = re;
