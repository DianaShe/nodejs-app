const express = require('express')

const ctrl = require('../../controllers/contacts')

const {validateBody, validateId } = require('../../middlewares/contacts')

const {addSchema, updateFavoriteSchema} = require('../../schemas/contacts')

const router = express.Router()

router.get('/', ctrl.listContacts)

router.get('/:contactId', validateId, ctrl.getContactById)

router.post('/', validateBody(addSchema), ctrl.addContact)

router.delete('/:contactId', validateId, ctrl.removeContact)

router.put('/:contactId', validateId, validateBody(addSchema), ctrl.updateContact)

router.patch('/:contactId/favorite', validateId, validateBody(updateFavoriteSchema), ctrl.updateFavorite)

module.exports = router
