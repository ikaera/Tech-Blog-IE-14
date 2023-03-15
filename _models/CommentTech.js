const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class CommentTech extends Model {}

CommentTech.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    use_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'usertech',
        key: 'id',
      },
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    comment_description: {
      type: DataTypes.STRING,
    },

    blog_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blogtech',
        key: 'id',
      },
    },
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: 'commenttech',
  }
);

module.exports = CommentTech;
