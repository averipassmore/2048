const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/grid', async (req, res, next) => {
  //console.log(req.params.id);
  try {
      const grid = await User.findByPk(req.params.id, {
      attributes: ['cell1', 'cell2', 'cell3', 'cell4', 'cell5', 'cell6', 'cell7', 'cell8', 'cell9', 'cell10', 'cell11', 'cell12', 'cell13', 'cell14', 'cell15', 'cell16']
    })
    res.json(grid);
  } catch (error) {
    next(error);
  }
})

router.put('/:id/grid', async (req, res, next) => {
  try {
    const userGrid = await User.findByPk(req.params.id);
    await userGrid.update(req.body);
    res.json(userGrid);
  } catch (error) {
    next(error);
  }
})
