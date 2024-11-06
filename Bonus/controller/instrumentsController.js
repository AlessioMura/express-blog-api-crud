const instruments = require('../db/instrumentsData.js');
const fs = require('fs');

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
        nome: req.body.nome,
        marca: req.body.marca,
        prezzo: req.body.prezzo,
    }

    instruments.push(instrument);

    fs.writeFileSync('./db/instrumentsData.js', `module.exports = ${JSON.stringify(instruments, null, 4)}`)

    return res.status(201).json({
        status: 201,
        data: instruments,
        counter: instruments.length
    });
}

const update = (req, res) => {
    const singleInstrument = instruments.find((instrument) => instrument.id === Number(req.params.id))

    if (!singleInstrument) {
        return res.status(404).json({
            error: 'Instrument not found'
        });
    }

    instruments.id = req.body.id;
    instruments.nome = req.body.nome;
    instruments.marca = req.body.marca;
    instruments.prezzo = req.body.prezzo;

    fs.writeFileSync('./db/instrumentsData.js', `module.exports = ${JSON.stringify(instruments, null, 4)}`)

    return res.status(201).json({
        status: 201,
        data: instruments,
        counter: instruments.length
    });

}

module.exports = {
    index,
    show,
    store,
    update
}