const currentUser = require("./currentUser");
const login = require("./login");
const logout = require("./logout");
const register = require("./register");
const updateAvatar = require("./updateAvatar");
const updateSubscription = require("./updateSubscription");

module.exports = {
    register,
    login,
    logout,
    updateSubscription,
    currentUser,
    updateAvatar,
};