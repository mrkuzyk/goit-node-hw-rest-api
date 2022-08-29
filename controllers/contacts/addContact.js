const { RequestError } = require('../../helpers');
const {Contact, schemas} = require('../../models/contact');

const addContact = async (req, res, next) => {
    try {
        const { error } = schemas.addSchema.validate(req.body);

        if (error) {
            throw RequestError(400, error.message)
        };

        const newContact = await Contact.create(req.body);
        res.status(201).json({ newContact });
    } catch (error) {
        next(error);
    }
};

module.exports = addContact;