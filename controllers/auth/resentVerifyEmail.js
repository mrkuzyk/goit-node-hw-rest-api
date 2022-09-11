const { RequestError, sendEmail } = require("../../helpers");
const { schemas, User } = require("../../models/user");

const resentVerifyEmail = async (req, res, next) => {
    try {
        const { error } = schemas.verifyEmailSchema.validate(req.body);

        if (error) {
            throw RequestError(400, 'missing required field email');
        };

        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            throw RequestError(404, 'Not found');
        };

        if (user.verify) {
            throw RequestError(400, 'Verification has already been passed');
        };

        const mail = {
            to: email,
            subject: "Підтвердження реєстрації на сайті",
            html: `<a href="http://localhost/api/users/verify/${user.verificationToken}" target="_blank" > Натисніть для підтвердження email </a>`
        };
        
        await sendEmail(mail);
        res.json({
            message: 'Verification email sent'
        });

    } catch (error) {
        next(error);
    }
};

module.exports = resentVerifyEmail;