const express = require('express')
const router = express.Router()

const adminAuthMiddlewares = require('../middlewares/auth/admin.auth.middlewares')
const {addShare, getShares, updateShare, deleteShare} = require('../controllers/share.controller')

router.post('/', adminAuthMiddlewares.checkToken, addShare)
router.get('/', getShares)
router.put('/:id', adminAuthMiddlewares.checkToken, updateShare)
router.delete('/:id', adminAuthMiddlewares.checkToken, deleteShare)



module.exports = router