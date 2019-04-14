const router = require('express').Router(),
    controllerArticle = require('../controllers/article'),
    image = require('../helpers/images'),
    {authorization} = require('../middleware/auth')

router.post('/',image.multer.single('image'), image.sendUploadToGCS, controllerArticle.createArticle)

router.get('/', controllerArticle.getAllArticle)

router.get('/my', controllerArticle.getMyArticle)

router.get('/:id', controllerArticle.getOneArticle)

router.put('/:id', image.multer.single('image'), image.sendUploadToGCS, authorization, controllerArticle.updateArticle)

router.delete('/:id', authorization, controllerArticle.deleteArticle)

module.exports = router