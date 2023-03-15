const UserTech = require('./UserTech');
const BlogTech = require('./BlogTech');
const CommentTech = require('./CommentTech');

UserTech.hasMany(BlogTech, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

BlogTech.belongsTo(UserTech, {
  foreignKey: 'user_id',
});

BlogTech.hasMany(CommentTech, {
  foreignKey: 'blog_id',
});

CommentTech.belongsTo(UserTech, {
  foreignKey: 'user_id',
});

module.exports = { UserTech, BlogTech, CommentTech };
