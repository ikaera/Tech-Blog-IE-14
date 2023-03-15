const router = require('express').Router();
const { CommentTech } = require('../../_models');

// GET all comments
router.get('/', async (req, res) => {
  try {
    const comData = await CommentTech.findAll({
      include: [
        {
          model: UserTech,
          attributes: ['username', 'filename', 'description'],
        },
      ],
    });

    const comments = comData.map((b) => b.get({ plain: true }));

    res.render('homepage', {
      comments,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one comment

router.get('/blog/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the gallery
    try {
      const comData = await CommentTech.findByPk(req.params.id, {
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
      const comment = comData.get({ plain: true });

      res.render('comment', { comment, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

router.post('/', async (req, res) => {
  try {
    const newCom = await CommentTech.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newCom);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const comData = await CommentTech.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!comData) {
      res.status(404).json({ message: '404 No Comment found with this id!' });
      return;
    }

    res.status(200).json(comData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
