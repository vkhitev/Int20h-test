const rp = require('request-promise')
const fs = require('fs')
const path = require('path')

function parseJSON (data) {
  return JSON.parse(data)
}

module.exports = function (token, groupId, imagePath) {
  return rp.get('https://api.vk.com/method/photos.getOwnerPhotoUploadServer', {
    qs: {
      v: '5.62',
      access_token: token,
      owner_id: '-' + groupId
    }
  }).then(parseJSON)
    .then(body => {
      console.log(body)
      return rp.post(body.response.upload_url, {
        formData: {
          photo: fs.createReadStream(path.join(__dirname, '../', imagePath))
        }
      })
    })
    .then(parseJSON)
    .then(body => {
      const { server, hash, photo } = body
      console.log(body)
      return rp.get('https://api.vk.com/method/photos.saveOwnerPhoto', {
        qs: {
          v: '5.62',
          access_token: token,
          server,
          hash,
          photo
        }
      })
    })
    .then(console.log)
    .catch(console.log)
}
