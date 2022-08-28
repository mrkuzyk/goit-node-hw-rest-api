const { RequestError } = require('../../helpers');
const { Contact } = require('../../models/contact');

const getContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const oneContact = await Contact.findById(contactId); // якщо робити пошук по ід тільки
        // const oneContact = await Contact.findOne({_id : contactId}); //якщо робити пошук по іншим критеріям

        if (!oneContact) {
            throw RequestError(404, 'Not found');
        }

        res.json({ oneContact });
    } catch (error) {
        next(error)
    };
};

module.exports = getContactById;