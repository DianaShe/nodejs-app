const Contact = require('../../models/contact')

const listContacts = async (req, res) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 10, favorite} = req.query;
    const skip = (page-1) * limit

    const filterOptions = favorite ? {favorite, owner} : {owner}

    const result = await Contact.find(filterOptions, "-owner", {skip, limit});
    res.json(result);
};

module.exports = listContacts