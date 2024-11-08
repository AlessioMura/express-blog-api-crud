const { error } = require('console');
const posts = require('../db/db.js')
const fs = require('fs')

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
    fs.writeFileSync('./db/db.js', `module.exports = ${JSON.stringify(posts, null, 4)}`)

    return res.status(201).json({
        status: 201,
        data: posts,
        count: posts.length
    })

}

const update = (req, res) => {
    // find the post by slug
    const singlePost = posts.find(post => post.slug === req.params.slug);


    // check if the user is updating the correct post
    if (!singlePost) {
        return res.status(404).json({ error: 'Post not found' })
    }


    // update the post object
    posts.title = req.body.title;
    posts.slug = req.body.slug;
    posts.content = req.body.content;
    posts.image = req.body.image;
    posts.tags = req.body.tags;


    // update the js file
    fs.writeFileSync('./db/db.js', `module.exports = ${JSON.stringify(posts, null, 4)}`)


    // return the updated postList item
    res.status(201).json({
        status: 201,
        data: posts,
        counter: posts.length
    })
}

const destroy = (req, res) => {
    // find the post by slug
    const singlePost = posts.find(post => post.slug === req.params.slug);

    // check if the user is deleting the correct post
    if (!singlePost) {
        return res.status(404).json({ error: 'Post not found' })
    }


    // remove the post from the postList
    const newPosts = posts.filter(post => post.slug !== req.params.slug);

    // update the js file
    fs.writeFileSync('./db/db.js', `module.exports = ${JSON.stringify(newPosts, null, 4)}`)

    // return the updated postList item
    res.status(201).json({
        status: 201,
        data: newPosts
    })
}



module.exports = {
    index,
    show,
    create,
    update,
    destroy
}