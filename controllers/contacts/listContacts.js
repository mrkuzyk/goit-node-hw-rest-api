const { Contact } = require("../../models/contact");

const listContacts = async (_, res, next) => {
    try {
        const allContacts = await Contact.find({}, '-createdAt -updatedAt')
        res.json({ allContacts })
    } catch (error) {
        next(error)
    };
};

module.exports = listContacts;