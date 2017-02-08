// const cron = require('node-cron')

// Runs every day at 00:00:00 AM.
// cron.schedule('0 0 0 * * *', () => {
//   console.log('hi')
// })

const getSchedule = require('./scheduler')

const path = require('path')
const fs = require('fs')

const Canvas = require('canvas')
const printSchedule = require('./drawer')

getSchedule().fork(console.error, data => {
  const canvas = new Canvas(1750, 2000)
  printSchedule(canvas, data)

  const out = fs.createWriteStream(path.join(__dirname, 'schedule.png'))

  canvas
    .pngStream()
    .on('data', function (chunk) {
      out.write(chunk)
    })
    .on('end', function () {
      console.log('saved png')
    })
})
