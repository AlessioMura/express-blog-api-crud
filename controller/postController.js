const posts = require('../db/db.js')

const index = (req, res) => {
    let html = '';

    posts.forEach(post => {
        const { title, content, image, slug, tags } = post;

        return html +=
        `
        <li>
            <h3>${title}</h3>
            <span>[${slug}]</span>
            <p>${content}</p>
            <img src="/imgs/posts/${image}"</img> <br>
        </li>
        <p>Tags: ${tags.join(', ')}</p>
        <hr>
        `
    })
    return res.send(`<ul>${html}</ul>`)
}

const show = (req, res) => {
    const singlePost = posts.find(post => post.slug === req.params.slug);
    return res.json({
        data: singlePost
    })
}


module.exports = {
    index,
    show
}