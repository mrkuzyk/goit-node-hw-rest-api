const addContact = require('./addContact');
const getContactById = require('./getContactById');
const listContacts = require('./listContacts');
const removeContact = require('./removeContact');
const updateContact = require('./updateContact');
const updateStatusContact = require('./updateStatusContact ');


module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
}