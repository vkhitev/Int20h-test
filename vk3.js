require('dotenv').config()

const VKApi = require('node-vkapi')
const fs = require('fs')
const request = require('request')

const VK = new VKApi({
  // app: {
  //   id: process.env.APP_ID,
  //   secret: process.env.APP_SECRET
  // },
  // auth: {
  //   login: process.env.VK_LOGIN,
  //   pass: process.env.VK_PASS
  // },
  token: process.env.ACCESS_TOKEN
})

VK.upload('photo_main', {
  data: fs.createReadStream('schedule.png')
}).then(res => {
  const server = res.post_id
  const hash = res.photo_hash
  const photo = res.photo_src
  console.log(photo)
  request.post(`https://api.vk.com/method/photos.saveOwnerPhoto?v=5.62&access_token=${process.env.ACCESS_TOKEN}&owner_id=-139663000&server=${server}&hash=${hash}&photo=${photo}`, (err, res, body) => {
    if (err) {
      return console.log(err)
    }
    console.log(body)
  })
  // return VK.call('wall.post', {
  //   owner_id: r[0].owner_id,
  //   attachments: 'photo' + r[0].owner_id + '_' + r[0].id
  // }).then(res => {
  //   return 'https://vk.com/wall' + r[0].owner_id + '_' + res.post_id
  // })
}).catch(console.log)
