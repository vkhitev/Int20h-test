require('dotenv').config()
const request = require('request')
const fs = require('fs')
const path = require('path')

const token = process.env.ACCESS_TOKEN2

request.get('https://api.vk.com/method/photos.getOwnerPhotoUploadServer', {
  qs: {
    v: '5.62',
    access_token: token,
    owner_id: '-' + process.env.GROUP_ID
  }
}, (err, res, body) => {
  if (err) {
    return console.error(err)
  }
  const uploadUrl = JSON.parse(body).response.upload_url
  console.log(uploadUrl)
  request.post(uploadUrl, {
    formData: {
      photo: fs.createReadStream(path.join(__dirname, 'schedule.png'))
    }
  }, (err, res, body) => {
    if (err) {
      return console.error(err)
    }
    const { server, hash, photo } = JSON.parse(body)
    request.get('https://api.vk.com/method/photos.saveOwnerPhoto', {
      qs: {
        v: '5.62',
        access_token: token,
        server,
        hash,
        photo
      }
    }, (err, res, body) => {
      if (err) {
        return console.error(err)
      }
      console.log(body)
    })
  })
})
