const router = require('express').Router()
const {User, Blog, Comment} = require('../models')
const withAuth = require('../utils/auth')

// homepage
router.get('/', async (req, res) => {
    try {
        let blogs = await Blog.findAll({
            include: [User]
        })
        blogs = blogs.map(blog => blog.get({plain: true}))
        console.log(blogs)
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

// dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        let blogs = await Blog.findAll({
            where: {
                userId: req.session.userId
            },
            include: User
        })
        console.log(req.session.userId)
        blogs = blogs.map(blog => blog.get({plain: true}))
        console.log(blogs)
        res.render('dashboard', {
            blogs,
            url: req.originalUrl,
            logged_in: req.session.logged_in
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// new post
router.get('/create', withAuth, async (req, res) => {
    try {
        let user = await User.findOne({
            where: {
                id: req.session.userId
            }
        })
        user = user.get({plain: true})
        res.render('newPost', {
            user,
            url: req.originalUrl,
            logged_in: req.session.logged_in
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// edit
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        let blog = await Blog.findOne({
            where: {
                id: req.params.id
            },
            include: User
        })

        blog = blog.get({plain: true})

        res.render('editPost', {
            blog,
            url: req.originalUrl,
            logged_in: req.session.logged_in
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router