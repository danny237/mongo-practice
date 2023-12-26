import express from 'express'
import { getAll, login, register } from '../controllers/userController'

const router = express.Router()

router.route('/').get(getAll).post(login)
router.post('/register', register)
router.logout('/logout', logout)

export default router
