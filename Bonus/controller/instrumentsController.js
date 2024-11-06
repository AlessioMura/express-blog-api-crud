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

const store = (req, res) => {
    const instrument = {
        id: instruments[instruments.length - 1].id + 1,
        name: req.body.name,
        marca: req.body.marca,
        price: req.body.price,
    }

    instruments.push(instrument);
}


module.exports = {
    index,
    show,
    store
}