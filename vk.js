const VKApi = require('node-vkapi')
const fs = require('fs')
const request = require('request')

require('dotenv').config()

// request.get('https://api.vk.com/method/users.get?user_id=210700286&v=5.52', (err, res, body) => {
//   if (err) {
//     return console.error(err)
//   }
//   console.log(body)
//   console.log(process.env)
// })

// request.get(`https://api.vk.com/method/photos.getOwnerPhotoUploadServer?v=5.52&access_token=${process.env.ACCESS_TOKEN}&owner_id=-139663000`, (err, res, body) => {
//   if (err) {
//     return console.error(err)
//   }
//   console.log(body)
// })

request.get('https://api.vk.com/method/photos.getOwnerPhotoUploadServer', {
  v: '5.52',
  access_token: process.env.ACCESS_TOKEN,
  owner_id: -139663000
}, (err, res, body) => {
  if (err) {
    return console.error(err)
  }
  console.log(body)
})

// VK.auth.user({
//   scope: ['wall', 'notify', 'friends', 'photos', 'audio', 'video', 'pages']
// })
//   .then(token => {
//     VK.call('photos.getOwnerPhotoUploadServer', {
//       owner_id: -token.user_id
//     })
//     .then(console.log)
//     // VK.upload('photo_main', {
//     //   data: fs.createReadStream('schedule.png')
//     // })
//     // .then(r => {
//     //   console.log(r)
//     //   // return VK.call('wall.post', {
//     //   //   owner_id: r[0].owner_id,
//     //   //   attachments: 'photo' + r[0].owner_id + '_' + r[0].id
//     //   // }).then(res => {
//     //   //   return 'https://vk.com/wall' + r[0].owner_id + '_' + res.post_id
//     //   // })
//     // })
//     // .then(link => console.log('Your post with photo is here: ' + link))
//     .catch(console.log)
//   })
//   .catch(console.log)

// VK.auth.user({
//   scope: ['manage', 'docs', 'messages', 'photos']
// }).then(token => {
//   return VK.call('photos.getOwnerPhotoUploadServer', {
//     owner_id: -token.user_id
//   }).then(res => {
//     console.log(res)
//   })
//   // console.log(VK.options.token)
//   // return VK.call('photos.getOwnerPhotoUploadServer', {
//   //   owner_id: -token.user_id
//   // }).then(res => {
//   //   console.log(res)
//   //   // return 'https://vk.com/wall' + token.user_id + '_' + res.post_id
//   // })
// }).then(link => {
//   // console.log('Post was published: ' + link)
// }).catch(error => {
//   console.log(error)
// })
