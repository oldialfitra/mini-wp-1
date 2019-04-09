const router = require('express').Router(),
    controllerArticle = require('../controllers/article')

router.post('/', controllerArticle.createArticle)

router.get('/all/:id', controllerArticle.getAllArticle)

router.get('/one/:id', controllerArticle.getOneArticle)

router.put('/:id', controllerArticle.updateArticle)

router.delete('/:id', controllerArticle.deleteArticle)

module.exports = router