// Setup
var VK = require('vksdk')
var vk = new VK({
  'appId': 5873407,
  'appSecret': 'Yq4CTHuwGAQlUo7pSxHE',
  'language': 'ru'
})

vk.setToken({ token: '0742bdcd2244c80f3ee28e4bd35a63d59494fa0405d649d2efbc82693f87dc7c9bacaa737a58ff3cd9b94' })

// vk.on('serverTokenReady', function (_o) {
//   console.log(_o)
//   vk.setToken(_o.access_token)
// })

// vk.setSecureRequests(true)

// // Request server API method
// vk.request('photos.getOwnerPhotoUploadServer', {}, function (_dd) {
//   // console.log(_dd)
// })

// /**
//  * Request server methods
//  */

// // Setup server access token for server API methods
// vk.on('serverTokenReady', function (_o) {
//     // Here will be server access token
//   vk.setToken(_o.access_token)
// })

// // Turn on requests with access tokens
// vk.setSecureRequests(true)

// // Request server API method
// vk.request('secure.getSMSHistory', {}, function (_dd) {
//   console.log(_dd)
// })

/**
 * Request client methods
 */
// First you have to pass access_token from client side JS code
// vk.setToken('0742bdcd2244c80f3ee28e4bd35a63d59494fa0405d649d2efbc82693f87dc7c9bacaa737a58ff3cd9b94')

// Request 'users.get' method
// vk.request('photos.getOwnerPhotoUploadServer', {
// }, function (_o) {
//   console.log(_o)
// })
