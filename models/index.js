const User = require('./User')
const Blog = require('./Blog')
const Comment = require('./Comment')

User.hasMany(Blog, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
})

Blog.belongsTo(User, {
  foreignKey: 'userId'
})

Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
})

Comment.belongsTo(Blog, {
  foreignKey: 'blog_id'
})

User.hasMany(Comment, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
})

Comment.belongsTo(User, {
  foreignKey: 'userId'
})

module.exports = {User, Blog, Comment}