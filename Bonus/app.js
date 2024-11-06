const express = require('express');
const app = express();
const instrumentsRouter = require('./router/instruments')
app.use(express.json());

app.listen(3002, () => {
    console.log("Server started on port 3002");
});

app.use('/instruments', instrumentsRouter)