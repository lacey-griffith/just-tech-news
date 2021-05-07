const router = require('express').Router();
const { Post, User } = require('../../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes : ['id', 'post_url', 'title', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(postData => {
        res.json(postData)
    }).catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router;