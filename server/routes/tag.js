const router = require('express').Router(),
    controllerTag = require('../controllers/tag')

router.post('/', controllerTag.addTag)

router.get('/', controllerTag.getAll)

router.get('/:id', controllerTag.getOne)

router.put('/:id', controllerTag.updateTag)

router.delete('/:id', controllerTag.deleteTag)

module.exports = router