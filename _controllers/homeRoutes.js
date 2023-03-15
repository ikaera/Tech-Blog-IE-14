const router = require('express').Router();
const { UserTech, CommentTech, BlogTech } = require('../_models');
const withAuth = require('../utils/auth');

// GET all blogs for homepage
router.get('/', async (req, res) => {
  try {
    const blogData = await BlogTech.findAll({
      include: [
        {
          model: UserTech,
          attributes: ['name', 'email'],
        },
      ],
    });

    const blogs = blogData.map((b) => b.get({ plain: true }));

    res.render('homepage', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one blog
router.get('/blog/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the gallery
    try {
      const blogData = await BlogTech.findByPk(req.params.id, {
        include: [
          {
            model: UserTech,
            attributes: [
              'username',
              'id',
              'title',
              'artist',
              'exhibition_date',
              'filename',
              'description',
            ],
          },
          {
            model: CommentTech,
            include: [UserTech],
          },
        ],
      });
      const blog = blogData.get({ plain: true });

      res.render('blog', { blog, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// GET dashboard

// GET login

// GET signUp
