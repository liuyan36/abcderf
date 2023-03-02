// postcss.config.js 文件

module.exports={
    plugins:[
      require("postcss-px2rem-exclude")({
        remUnit: 16, // 配置1rem = 16px
        exclude: /node_modules/
      }),
    ]
  }
