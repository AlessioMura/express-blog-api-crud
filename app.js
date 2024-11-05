const express = require('express')
const app = express()
const postsRouter = require('./router/posts.js')
app.use(express.json())

app.use(express.static('public'))

app.listen(3000, () => {
    console.log(`server started on port 3000`);

})

app.use('/posts', postsRouter);