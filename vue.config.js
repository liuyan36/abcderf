module.exports = {
    // 基本路径
    publicPath: './',
    css: {
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [
                    require("postcss-px2rem")({
                        remUnit: 192///设计图宽度/10
                    })
                ]
            }
        }
    },
    devServer: {
        proxy: {
            // 配置跨域
            '/api': {
                // target: 'https://k3.bainong365.cn/', // 测试环境
                // target: 'https://api.xmw1688.com/', // 正式环境

                target: 'https://laravel-api-manager.xmw1688.com/', // 正式环境
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
}
