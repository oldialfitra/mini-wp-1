const router = require('express').Router(),
    routerUser = require('./user'),
    routerArticle = require('./article'),
    routerTag = require('./tag'),
    {authentication} = require('../middleware/auth')

router.use('/users', routerUser)

router.use('', authentication)

router.use('/articles', routerArticle)

router.use('/tags', routerTag)

module.exports = router