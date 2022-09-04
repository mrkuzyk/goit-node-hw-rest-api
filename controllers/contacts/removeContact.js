const { RequestError } = require('../../helpers');
const { Contact } = require('../../models/contact');


const removeContact = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const { contactId } = req.params;
        const removedContact = await Contact.findOneAndRemove({_id: contactId, owner});

        if (!removedContact) {
            throw RequestError(404, 'Not found');
        }

        res.json({ message: 'contact deleted' });
    } catch (error) {
        next(error)
    }
};

module.exports = removeContact;