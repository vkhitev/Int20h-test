const request = require('request')
const Future = require('ramda-fantasy').Future

exports.futureAll = function futureAll (futures) {
  return new Future((reject, resolve) => {
    let results = []
    let count = 0
    let done = false

    futures.forEach((fut, i) => {
      fut.fork(
        (error) => {
          if (!done) {
            done = true
            reject(error)
          }
        },
        (result) => {
          results[i] = result
          count += 1
          if (count === futures.length) {
            resolve(results)
          }
        })
    })
  })
}

exports.getRequest = function getRequest (url) {
  return new Future((reject, resolve) => {
    request.get(url, (err, res, body) => {
      if (err) {
        return reject(err)
      }
      resolve(body)
    })
  })
}

exports.parseJSON = function parseJSON (str) {
  return new Future(function (reject, resolve) {
    try {
      resolve(JSON.parse(str))
    } catch (err) {
      reject({ error: 'JSON parse error' })
    }
  })
}
