const router = require('express').Router();
const { Post, User } = require('../../models');

//GET all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes : ['id', 'post_url', 'title', 'created_at'],
        order: [['created_at', 'DESC']],
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

//GET post by id
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post_url', 'title', 'created_at'],
        include: [{
            model: User,
            attributes: ['username']
        }]
    }).then(postData => {
        if(!postData){
            res.status(404).json({ message: 'No post found with this id' });
            return
        }
        res.json(postData)
    }).catch(err => {
        res.status(500).json(err)
    })
})

//CREATE a new post
router.post('/', (req,res) => {
    //expects {title:, post_url:, user_id:}
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.body.user_id
    }).then(postData => {
        res.json(postData)
    }).catch(err => {
        res.status(500).json(err)
    })
})

//UPDATE post title
router.put('/:id', (req, res) => {
    Post.update(
      {
        title: req.body.title
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //DELETE a post
  router.delete('/:id', (req, res) => {
      Post.destroy({
          where: {id: req.params.id}
      })
      .then(postData => {
          if(!dbPostData){
              res.status(404).json({message: 'Post not found'})
              return
          }
          res.json(postData)
      }).catch(err => {
          res.status(500).json(err)
      })
  })

module.exports = router;