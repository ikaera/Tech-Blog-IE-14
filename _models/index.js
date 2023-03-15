const UserTech = require('./UserTech');
const BlogTech = require('./BlogTech');
const CommentTech = require('./CommentTech');

UserTech.hasMany(BlogTech, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

BlogTech.belongsTo(UserTech, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

BlogTech.hasMany(CommentTech, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE',
});

CommentTech.belongsTo(UserTech, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

module.exports = { UserTech, BlogTech, CommentTech };
