// Electron集成Vue Cli3创建项目 https://www.psvmc.cn/article/2019-11-05-vue-cli3-electron.html
const path = require("path")
module.exports = {
  pluginOptions: {
    electronBuilder: {
      // 打包参数配置
      builderOptions: {
        appId: "com.borun.shutdown",
        productName: "SEV关机助手",
        copyright: "Copyright © 2020",
        icon: "build/icons/icon.ico",
        asar: true,
        directories: {
          output: "build" // 输出文件路径
        },
        // files: [
        //   "dist_electron/**/*"
        // ],
        // publish: {  // 发布到 Github release 中
        //   provider: "Github",
        //   url: "https://github.com/Run2948/vue-electron.git"
        // },
        dmg: {
          contents: [
            {
              x: 410,
              y: 150,
              type: "link",
              path: "/Applications"
            },
            {
              x: 130,
              y: 150,
              type: "file"
            }
          ]
        },
        mac: {
          icon: "build/icons/icon.icns"
        },
        win: {
          icon: "build/icons/icon.ico",
          target: [
            {
              target: "zip",
            },
            {
              target: "nsis",
              // arch: ["x64"]
            }
          ]
        },
        linux: {
          icon: "build/icons"
        },
        nsis: {
          oneClick: false, // 是否一键安装
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true,// 允许修改安装目录

          installerIcon: "build/icons/icon.ico",// 安装图标
          installerHeader: "build/icons/icon.png", // 安装头部
          installerHeaderIcon: "build/icons/icon.ico",  // 安装时头部图标
          uninstallerIcon: "build/icons/icon.ico",//卸载图标
          license: "build/LICENSE.txt", // 证书

          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true,// 创建开始菜单图标
          shortcutName: "SEV关机助手", // 图标名称
          runAfterFinish: false // 安装完毕后立即启动
        }
      }
    }
  },
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === "production", config => {
      config
        .entry("app")
        .clear()
        .add("./src/main-prod.js")

      config.set("externals", {
        vue: "Vue",
        "vue-router": "VueRouter"
      })

      config.plugin("html").tap(args => {
        args[0].isProd = true
        return args
      })
    })

    // 开发模式
    config.when(process.env.NODE_ENV === "development", config => {
      config
        .entry("app")
        .clear()
        .add("./src/main-dev.js")

      config.plugin("html").tap(args => {
        args[0].isProd = false
        return args
      })
    })
  }
}
