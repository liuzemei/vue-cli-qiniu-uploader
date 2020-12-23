const path = require('path')
const { url } = require(path.resolve('qiniuKey.json'))

module.exports = function handleHtml(html, keys) {
  const regStr = keys.map(item => `(?:/${item})`).join('|').replace(/\./g, '\\.')
  const reg = new RegExp(regStr, 'g')
  return html.replace(reg, a => {
    return url + a
  })
}
