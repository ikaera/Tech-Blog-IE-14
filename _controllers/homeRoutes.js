const router = require('express').Router();
const { Usertech, Commenttech, Blogtech } = require('../_models');
const withAuth = require('../utils/auth');

// GET all blogs for homepage
router.get('/', async (req, res) => {
  try {
    const blogData = await Blogtech.findAll({
      include: [
        {
          model: Usertech,
          attributes: ['username'],
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
router.get('/blog/:id', withAuth, async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  // if (!req.session.loggedIn) {
  //   res.redirect('/login');
  // } else {
  // If the user is logged in, allow them to view the gallery
  try {
    const blogData = await Blogtech.findByPk(req.params.id, {
      include: [
        {
          model: Usertech,
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
          model: Commenttech,
          include: [Usertech],
        },
      ],
    });
    const blog = blogData.get({ plain: true });

    res.render('blog', { ...blog, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await Usertech.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blogtech }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET login
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// GET signUp
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

module.exports = router;
