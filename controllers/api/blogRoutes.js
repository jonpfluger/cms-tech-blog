const router = require('express').Router()
const {Blog} = require('../../models')

// GET route (all)
router.get('/', async (req, res) => {
  try {
    const allBlogs = await Blog.findAll()
    res.status(200).json(allBlogs)
  } catch(err) {
    res.status(400).json(err)
  }
})

// GET route (single)
router.get('/:id', async (req, res) => {
  try {
    const singleBlog = await Blog.findOne({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(singleBlog)
  } catch(err) {
    res.status(400).json(err)
  }
})

// POST route (create)
router.post('/', async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            userId: req.session.userId
        })
        res.status(200).json(newBlog)
    } catch(err) {
        res.status(400).json(err)
    }
})

// PUT route (edit)
router.put('/:id', async (req, res) => {
    try {
      const updatedBlog = await Blog.update(req.body, {
        where: {
          id: req.params.id
        }
      })
      res.status(200).json(updatedBlog)
    } catch (err) {
      res.status(400).json(err);
    }
})

// DELETE route
router.delete('/:id', async (req, res) => {
    try {
      const deletedBlog = await Blog.destroy({
        where: {
          id: req.params.id,
        }
      })
      
      res.status(200).json(deletedBlog)
    } catch (err) {
      res.status(500).json(err)
    }
})

module.exports = router