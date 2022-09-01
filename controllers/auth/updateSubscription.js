const { RequestError } = require("../../helpers");
const { User, schemas } = require("../../models/user");

const updateSubscription = async (req, res, next) => {
    try {
        const { error } = schemas.updateSubscriptionSchema.validate(req.body);

        if (error) {
            throw RequestError(400, 'subscription value is invalid');
        };

        const { token } = req.user;
        const updateUser = await User.findOneAndUpdate({token}, req.body, {new: true, projection: {email: 1, subscription: 1}});

        if (!updateUser) {
            throw RequestError(404, 'Not found');
        };

        res.json({ updateUser });
    } catch (error) {
        next(error);
    }
};

module.exports = updateSubscription;