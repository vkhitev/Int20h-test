module.exports = function printSchedule (canvas, data) {
  const ctx = canvas.getContext('2d')
  const channelPos = { x: 20, y: 50 }
  const projectPos = { x: 20, y: 90 }
  data.sort((a, b) => b.program.length - a.program.length)
  data.forEach((channel, i) => {
    ctx.font = '50px Sans'
    ctx.fillText(channel.channel, channelPos.x, channelPos.y)
    channel.program.forEach(project => {
      ctx.font = '16px Sans'
      ctx.fillText(project.realtime_begin, projectPos.x, projectPos.y)
      ctx.font = '20px Sans'
      let title = project.title
      if (project.subtitle) {
        title += '. ' + project.subtitle
      }
      ctx.fillText(title, projectPos.x + 50, projectPos.y)
      projectPos.y += 30
    })
    // Высшая математика
    if (i % 3 !== 2) {
      channelPos.x += 550
      projectPos.x += 550
      projectPos.y = channelPos.y + 40
    } else {
      channelPos.x = 20
      channelPos.y += 1100
      projectPos.x = channelPos.x
      projectPos.y = channelPos.y + 40
    }
  })
}
