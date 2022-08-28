const { RequestError } = require('../../helpers');
const { Contact } = require('../../models/contact');


const removeContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const removedContact = await Contact.findByIdAndRemove(contactId);

        if (!removedContact) {
            throw RequestError(404, 'Not found');
        }

        res.json({ message: 'contact deleted' })
    } catch (error) {
        next(error)
    }
};

module.exports = removeContact;