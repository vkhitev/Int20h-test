const R = require('ramda')

const fw = require('./future-wrappers')

// Wow such FP very compose

function buildProjectUrl (id) {
  return `https://api.ovva.tv/v2/ru/tvguide/${id}`
}

function formatDate (seconds) {
  const date = new Date(1000 * seconds)
  let hours = date.getHours()
  let minutes = date.getMinutes()
  if (hours < 10) {
    hours = '0' + hours
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  return hours + ':' + minutes
}

const parsedGetRequest = R.compose(
  R.chain(fw.parseJSON),
  fw.getRequest
)

const parseIds = R.compose(
  R.project(['channel_id', 'channel_name']),
  R.prop('channels'),
  R.prop('data')
)

const selectChannelIds = R.partial(R.compose(
  R.map(parseIds),
  parsedGetRequest
), ['https://api.ovva.tv/v2/ru/tvguide'])

const parseProjects = R.compose(
  R.map(R.over(R.lensProp('realtime_begin'), formatDate)),
  R.project([
    'title',
    'subtitle',
    'realtime_begin'
  ]),
  R.prop('programs'),
  R.prop('data')
)

const selectProjects = R.compose(
  R.map(R.map(parseProjects)),
  fw.futureAll,
  R.map(parsedGetRequest),
  R.map(buildProjectUrl)
)

const propId = R.map(R.prop('channel_id'))
const propName = R.map(R.prop('channel_name'))

const mergeProjectsWithChannels = (ids) => R.compose(
  R.map(R.zipWith((channel, program) => ({
    channel, program
  }), propName(ids))),
  selectProjects,
  propId
)(ids)

const fetchSchedule = R.composeK(
  mergeProjectsWithChannels,
  selectChannelIds
)

const fetchChannelSchedule = (channel) =>
  R.compose(
    R.map(R.nth(0)),
    R.map(R.filter(R.whereEq({ channel }))),
    fetchSchedule
  )()

exports.fetchSchedule = fetchSchedule
exports.fetchChannelSchedule = fetchChannelSchedule
