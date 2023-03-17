const sequelize = require('../config/connection');
const { Usertech, Commenttech, Blogtech } = require('../_models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await Usertech.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) {
    await Blogtech.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const comments = await Commenttech.bulkCreate(commentData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
