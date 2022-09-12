const { RequestError, sendEmail } = require("../../helpers");
const { User, schemas } = require("../../models/user");
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const {nanoid} = require('nanoid');

const register = async (req, res, next) => {
    try {
        const { error } = schemas.registerSchema.validate(req.body);

        if (error) {
            throw RequestError(400, error.message);
        };

        const { email, password, subscription } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            throw RequestError(409, 'Email in use');
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const avatarURL = gravatar.url(email);
        const verificationToken = nanoid(10);

        const mail = {
            to: email,
            subject: "Підтвердження реєстрації на сайті",
            html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank" > Натисніть для підтвердження email </a>`
        };

        await sendEmail(mail);
        const result = await User.create({ email, password: hashPassword, subscription, avatarURL, verificationToken });
        res.status(201).json({
            email: result.email,
            subscription: result.subscription,
        });

    } catch (error) {
        next(error);
    };
};

module.exports = register;