const router = require('express').Router(),
    controllerTag = require('../controllers/tag')

router.get('/', controllerTag.getAll)

router.get('/one', controllerTag.getOne)

module.exports = router