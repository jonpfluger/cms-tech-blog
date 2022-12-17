const router = require('express').Router()
const {User, Blog, Comment} = require('../models')
const withAuth = require('../utils/auth')

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

module.exports = router