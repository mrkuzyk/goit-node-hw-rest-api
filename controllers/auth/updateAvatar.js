const path = require('path');
const { User } = require('../../models/user');
const fs = require('fs').promises;
const Jimp = require('jimp');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')

const updateAvatar = async (req, res, next) => {
    try {
        const { path: tempUpload, filename } = req.file;
        const { _id } = req.user;
        const [extension] = filename.split('.').reverse();
        const avatarName = `${_id}.${extension}`;
        const resultUpload = path.join(avatarsDir, avatarName);
        await fs.rename(tempUpload, resultUpload);
        const resizeAvatar = await Jimp.read(resultUpload);
        await resizeAvatar.resize(250, 250).write(resultUpload);
        const avatarURL = path.join('avatars', resultUpload);
        await User.findByIdAndUpdate(_id, { avatarURL });
        res.json({
            avatarURL,
        })

    } catch (error) {
        await fs.unlink(req.file.path);
        throw error;
    }
};

module.exports = updateAvatar;