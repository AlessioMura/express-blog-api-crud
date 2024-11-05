const express = require('express')
const app = express()
const postsRouter = require('./router/posts.js')

app.use(express.static('public'))

require('dotenv').config()
const HOST = process.env.HOST
const PORT = process.env.PORT


app.listen(PORT, (req, res) => {
    console.log(`server is running in at ${HOST}:${PORT}`);

})

app.use('/posts', postsRouter);
