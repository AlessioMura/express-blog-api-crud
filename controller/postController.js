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

const create = (req, res) => {
    const post = {
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    };
    
    posts.push(post);

    return res.status(201).json({
        status: 201,
        data: posts,
        count: posts.length
    })
    
    res.json({
        body: req.body
    })
}


module.exports = {
    index,
    show,
    create
}