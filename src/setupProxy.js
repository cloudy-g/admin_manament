// react脚手架 代理配置
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy('/api1', { // 所有带有/api1前缀的请求都会转发给5000
      target: 'http://localhost:5000', // 目标地址
      changeOrigin: true, // 针对后端而言，  是否真正的修改后端接收的请求的url
      pathRewrite: { // 重写路径
        '^/api1': '',
      }
    })
  )
}