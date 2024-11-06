const instruments = require('../db/instrumentsData.js');

const index = (req, res) => {
    res.json({
        data: instruments,
        counter: instruments.length
    });
};

const show = (req, res) => {
    const singleInstrument = instruments.find((instrument) => instrument.id === Number(req.params.id));
    console.log(req.params);
    

    if (!singleInstrument) {
        return res.status(404).json({
            error: 'Instrument not found'
        });
    }

    return res.json({
        data: singleInstrument
    })

}


module.exports = {
    index,
    show
}