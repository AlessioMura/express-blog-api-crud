const instruments = require('../db/instrumentsData.js');

const index = (req, res) => {
    res.json({
        data: instruments,
        counter: instruments.length
    });
};

module.exports = {
    index
}