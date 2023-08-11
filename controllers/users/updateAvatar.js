const path = require('path')
const fs = require('fs/promises')
const User = require('../../models/user')
const jimp = require('jimp')

const avatarsDir = path.join(__dirname, '../', '../', 'public', 'avatars')

const updateAvatar = async(req, res) => {
    const {_id} = req.user
    const {path: tempUpload, filename} = req.file

    const resultUpload = path.join(avatarsDir, filename)

    jimp.read(tempUpload).then((image) => {
        return image
        .cover(250, 250)
        .quality(90)
        .write(resultUpload)
      })
      .catch((err) => {
        console.error(err);
      });

    
    await fs.rename(tempUpload, resultUpload)

    const avatarURL = path.join('avatars', filename)
    await User.findByIdAndUpdate(_id, {avatarURL})

    res.json({
        avatarURL
    })
}

module.exports = updateAvatar