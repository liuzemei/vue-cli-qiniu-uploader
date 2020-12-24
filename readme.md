### 1. 功能说明

执行 `npm run build` 之后，将会自动上传所有的 js 及 css 文件到七牛云。

并自动替换 index.html 中的资源引入路径。

### 2. 使用说明

1. 安装插件

```shell
npm install vue-cli-plugin-qiniu-uploader -D
```

2. 在根目录下创建或修改配置文件

`vue.config.js`

```js
// vue.config.js

const VueCliPluginQiniuUploader = require("vue-cli-plugin-qiniu-uploader");
module.exports = {
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      return {
        plugins: [new VueCliPluginQiniuUploader()],
      };
    }
  },
};
```

3. 在`vue.config.js`同级创建配置文件

`qiniuKey.json`

```json
// qiniuKey.json
{
  "accessKey": "",
  "secretKey": "",
  "bucket": "",
  "zone": "",
  "url": ""
}
```

| 参数名    | 备注                                                      |
| --------- | :-------------------------------------------------------- |
| accessKey | 七牛云秘钥管理处申请或查看。                              |
| secretKey | 七牛云秘钥管理处申请或查看。                              |
| bucket    | 自己创建的空间名称                                        |
| zone      | 目前支持 5 个区域(huadong/huabei/huanan/beimei/dongnanya) |
| url       | 配置的七牛加速域名                                        |

4. 执行 `npm run build` 命令

5. 完成...

完成后，查看一下自己的 `index.html` 应该是已经变成了 配制的 url 开头的链接了。

> 注意 `.gitignore` 文件添加一下 `qiniuKey.json` 不然，会上传到 github 上...
