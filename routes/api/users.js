const express = require('express')

const { validateBody, authenticate } = require("../../middlewares");

const { registerSchema, loginSchema, updateSubscriptionSchema } = require("../../schemas/users");

const ctrl = require('../../controllers/users')

const router = express.Router()

router.post('/register', validateBody(registerSchema), ctrl.register)

router.post('/login', validateBody(loginSchema), ctrl.login)

router.use(authenticate)

router.get('/current', ctrl.getCurrent)

router.post('/logout', ctrl.logout)

router.patch('/subscription', validateBody(updateSubscriptionSchema), ctrl.updateSubscription)

module.exports = router