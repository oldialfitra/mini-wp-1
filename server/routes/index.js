const router = require('express').Router(),
    routerUser = require('./user'),
    routerArticle = require('./article'),
    routerTag = require('./tag')

router.use('/users', routerUser)

router.use('/articles', routerArticle)

router.use('/tags', routerTag)

module.exports = router