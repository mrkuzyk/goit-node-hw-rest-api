const { RequestError } = require("../../helpers");
const { User, schemas } = require("../../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
    try {
        const { error } = schemas.loginSchema.validate(req.body);

        if (error) {
            throw RequestError(400, error.message);
        };

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            throw RequestError(401, 'Email or password is wrong');
        };

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            throw RequestError(401, 'Email or password is wrong');
        };

        if (!user.verify) {
            throw RequestError(403, 'Email not verify');
        };

        const payload = {
            id: user._id,
        }

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
        await User.findByIdAndUpdate(user._id, { token });

        res.json({
            token,
            user,
        });

    } catch (error) {
        next(error);
    };
};

module.exports = login;