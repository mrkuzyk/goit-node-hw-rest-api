const { Contact } = require("../../models/contact");

const listContacts = async (req, res, next) => {
    try {
        const { _id } = req.user;
        // const { _id: owner } = req.user;
        const { page = 1, limit = 10, favorite = false  } = req.query;
        const skip = (page - 1) * limit;
        const searchContacts = (favorite === 'true') ? { owner: _id, favorite } : { owner: _id };

        const allContacts = await Contact
            .find(searchContacts, '-createdAt -updatedAt', {skip: skip, limit: Number(limit)})
            .populate('owner', 'email');
        res.json({ allContacts })
    } catch (error) {
        next(error);
    };
};

module.exports = listContacts;