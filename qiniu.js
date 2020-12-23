const path = require('path')
const { accessKey, secretKey, bucket, zone = 'huabei' } = require(path.resolve('qiniuKey.json'))
const qiniu = require('qiniu')
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const config = new qiniu.conf.Config()
config.zone = setZone(zone)
const formUploader = new qiniu.form_up.FormUploader(config)

module.exports = (key, filePath) => {
  return new Promise((resolve, reject) => {
    token = getQiniuToken(key)
    formUploader.putFile(token, key, filePath, new qiniu.form_up.PutExtra(), function (respErr, respBody, respInfo) {
      if (respErr) {
        reject(respErr)
      }
      if (respInfo.statusCode == 200) {
        console.log("七牛已上传::", respBody.key)
        resolve(respBody)
      } else {
        console.log(respBody)
        resolve(respBody)
      }
    });
  })
}

function setZone(zone) {
  const zoneMap = {
    huadong: "Zone_z0",
    huabei: "Zone_z1",
    huanan: "Zone_z2",
    beimei: "Zone_na0",
    dongnanya: "Zone_as0"
  }
  return qiniu.zone[zoneMap[zone]]
}

function getQiniuToken(key) {
  const putPolicy = new qiniu.rs.PutPolicy({
    scope: bucket + ":" + key
  })
  return putPolicy.uploadToken(mac)
}