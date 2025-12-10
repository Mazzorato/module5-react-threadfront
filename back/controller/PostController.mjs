const Post = require('../models/PostModel');

exports.getAllPosts = async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
};

