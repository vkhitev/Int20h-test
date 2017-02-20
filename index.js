require('dotenv').config()

const fetchChannelSchedule = require('./src/scheduler').fetchChannelSchedule
const drawChannelSchedule = require('./src/drawer').drawChannelSchedule
const saveAsVkTitle = require('./src/vk-saver')

const fs = require('fs')
const path = require('path')

const channelName = '1+1'
const imgName = `schedule_${channelName}.png`

fetchChannelSchedule(channelName).fork(console.error, data => {
  const out = fs.createWriteStream(path.join(__dirname, imgName))
  const canvas = drawChannelSchedule(data)

  canvas
    .pngStream()
    .on('data', function (chunk) {
      out.write(chunk)
    })
    .on('end', function () {
      console.log('Saved png:', imgName)
      saveAsVkTitle(process.env.ACCESS_TOKEN, process.env.GROUP_ID, imgName)
        .catch(console.error)
    })
    .on('error', console.error)
})
