const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSchemaValidationError } = require('../helpers');

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: String,
    phone: String,
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
},{versionKey: false, timestamps: true });

contactSchema.post('save', handleSchemaValidationError);

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.bool(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.bool().required(),
});

const schemas = {
    addSchema,
    updateFavoriteSchema,
};

const Contact = model('contact', contactSchema);

module.exports = {
    Contact,
    schemas
};