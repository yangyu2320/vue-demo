module.exports = {
    outputDir: 'dist',   //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    devServer: {
        open: false, //是否自动弹出浏览器页面
        host: "localhost",
        port: '8010',
        https: false,   //是否使用https协议
        hotOnly: true, //是否开启热更新
        proxy: 'http://localhost:8000'
    }
}