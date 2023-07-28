const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody, validateId, authenticate } = require("../../middlewares");

const { addSchema, updateFavoriteSchema } = require("../../schemas/contacts");

const router = express.Router();

router.use(authenticate);

router
  .route("/")
  .get(ctrl.listContacts)
  .post(validateBody(addSchema), ctrl.addContact);

router.use("/:contactId", validateId);

router
  .route("/:contactId")
  .get(ctrl.getContactById)
  .put(validateBody(addSchema), ctrl.updateContact)
  .delete(ctrl.removeContact);

router.patch(
  "/:contactId/favorite",
  validateBody(updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;

// router.get('/', ctrl.listContacts)

// router.get('/:contactId', validateId, ctrl.getContactById)

// router.post('/', validateBody(addSchema), ctrl.addContact)

// router.delete('/:contactId', validateId, ctrl.removeContact)

// router.put('/:contactId', validateId, validateBody(addSchema), ctrl.updateContact)