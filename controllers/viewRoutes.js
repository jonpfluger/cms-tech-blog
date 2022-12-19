const router = require('express').Router()
const {User, Blog, Comment} = require('../models')
const withAuth = require('../utils/auth')

// homepage
router.get('/', async (req, res) => {
    try {
        let blogs = await Blog.findAll({
            include: User
        })
        blogs = blogs.map(blog => blog.get({plain: true}))
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// login
router.get('/login', async (req, res) => {
    try {
        res.render('login')
    } catch(err) {
        res.status(500).json(err)
    }
})

router.get('/', withAuth, async (req, res) => {
    try {
        res.render('newPost', {
            logged_in: req.session.logged_in
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

router.get('/create', withAuth, async (req, res) => {
    try {
        res.render('newPost', {
            logged_in: req.session.logged_in
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
      let blogs = await Blog.findAll({
        where: {
          user_id: req.session.user_id
        },
        include: [User],
        order: [['date_created', 'DESC']]
      })
      blogs = blogs.map(blog => {
        return {
          ...blog.get({ plain: true }),
          logged_in: req.session.logged_in
        }
      })
      res.render('dashboard', {
        blogs,
        logged_in: req.session.logged_in,
      })
    } catch (err) {
      res.status(500).json(err)
    }
  });

module.exports = router