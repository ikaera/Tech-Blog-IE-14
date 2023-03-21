const router = require('express').Router();
const { Commenttech, Usertech, Blogtech } = require('../../_models');
const withAuth = require('../../utils/auth');

// // GET all comments
// router.get('/', async (req, res) => {
//   try {
//     const comData = await Commenttech.findAll({
//       include: [
//         {
//           model: Usertech,
//           attributes: ['username'],
//         },
//       ],
//     });

//     const comments = comData.map((b) => b.get({ plain: true }));

//     res.render('homepage', {
//       comments,
//       loggedIn: req.session.loggedIn,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// GET one comment

// router.get('/blog/:id', async (req, res) => {
//   // If the user is not logged in, redirect the user to the login page
//   if (!req.session.loggedIn) {
//     res.redirect('/login');
//   } else {
//     // If the user is logged in, allow them to view the gallery
//     try {
//       const comData = await Commenttech.findByPk(req.params.id, {
//         include: [
//           {
//             model: Usertech,
//             attributes: ['username', 'id'],
//           },
//           {
//             model: Commenttech,
//             include: [Usertech],
//           },
//         ],
//       });
//       const comment = comData.get({ plain: true });

//       res.render('comment', { comment, loggedIn: req.session.loggedIn });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   }
// });
//Create a comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newCom = await Commenttech.create({
      ...req.body,
      user_id: req.session.user_id,
      // include: [
      //   {
      //     model: Usertech,
      //     attributes: ['username'],
      //   },
      // ],
      include: [
        {
          model: Usertech,
          attributes: ['username'],
        },
      ],
    });

    res.status(200).json(newCom);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.delete('/:id', async (req, res) => {
//   try {
//     const comData = await Commenttech.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!comData) {
//       res.status(404).json({ message: '404 No Comment found with this id!' });
//       return;
//     }

//     res.status(200).json(comData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
