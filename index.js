
const fs = require('fs')
const upload = require('./qiniu')
const replaceHtml = require('./replaceHtml')

function QiniuUploader() { }
QiniuUploader.prototype.apply = function (compiler) {
  compiler.hooks.done.tap("Qiniu Uploader Plugin", async stats => {
    const { assets } = stats.compilation
    const uploader = []
    const keys = []
    for (const key in assets) {
      const { existsAt } = assets[key]
      if (/\.(js|css)$/.test(existsAt)) {
        keys.push(key)
        uploader.push(upload(key, existsAt))
      }
    }
    await Promise.all(uploader)
    const { source, existsAt } = assets['index.html']
    const html = replaceHtml(source(), keys)
    fs.unlinkSync(existsAt)
    fs.writeFileSync(existsAt, html)
  })
}

module.exports = QiniuUploader