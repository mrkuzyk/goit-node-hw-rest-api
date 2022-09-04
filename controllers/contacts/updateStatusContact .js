const { RequestError } = require('../../helpers');
const { Contact, schemas } = require('../../models/contact');

const updateStatusContact = async (req, res, next) => {
    try {
        const { error } = schemas.updateFavoriteSchema.validate(req.body);

        if (error) {
            throw RequestError(400, 'missing field favorite');
        };

        const { _id: owner } = req.user;
        console.log(req.user);
        const { contactId } = req.params;
        const updateContact = await Contact.findOneAndUpdate({ _id: contactId, owner}, req.body, {new: true});

        if (!updateContact) {
            throw RequestError(404, 'Not found');
        };

        res.json({ updateContact });
    } catch (error) {
        next(error);
    };
};

module.exports = updateStatusContact;