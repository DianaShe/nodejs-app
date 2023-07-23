import listContacts from "./listContacts";
import getContactById from "./getContactById";
import addContact from "./addContact";
import removeContact from "./removeContact";
import updateContact from "./updateContact";
import updateFavorite from "./updateFavorite";

const {ctrlWrapper} = require("../../utils");

module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact),
    updateFavorite: ctrlWrapper(updateFavorite)
  };