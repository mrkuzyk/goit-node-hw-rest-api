const { RequestError } = require('../../helpers');
const { Contact, schemas } = require('../../models/contact');

const updateContact = async (req, res, next) => {
    try {
        const { error } = schemas.addSchema.validate(req.body);

        if (error) {
            throw RequestError(400, error.message)
        };

        const { contactId } = req.params;
        const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});

        if (!updateContact) {
            throw RequestError(404, 'Not found');
        };

        res.json({ updateContact })
    } catch (error) {
        next(error);
    };
};

module.exports = updateContact;