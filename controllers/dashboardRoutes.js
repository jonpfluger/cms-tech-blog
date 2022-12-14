const router = require('express').Router()
const {User, Blog, Comment} = require('../models')
const withAuth = require('../utils/auth')

router.get('/', withAuth, async (req, res) => {
    try {
        res.render('loggedIn', {
            layout: 'dashboard',
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

router.get('/create', withAuth, async (req, res) => {
    try {
        res.render('newPost', {
            layout: 'dashboard',
        })
    } catch(err) {
        res.status(500).json(err)
    }
})



module.exports = router