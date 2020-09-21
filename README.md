# vue-electron

## Project setup

```bash
vue create vue-electron

vue add electron-builder
```

### Electron configuration

```bash
module.exports = {
  pluginOptions: {
    electronBuilder: {
      // 打包参数配置
      builderOptions: {
        appId: "com.borun.shutdown", 
        productName: "SEV关机助手",  // 项目名称，也是生成 exe 文件的前缀
        copyright: "Copyright © 2020", // 版权信息
        icon: "build/icons/icon.ico",  // 项目图标
        asar: true,  
        directories: {  // 输出文件夹
          output: "dist_electron" // 输出文件路径
        },
        // files: [
        //   "dist_electron/**/*"
        // ],
        // publish: {  // 发布到 Github 中
        //   provider: "Github", // 服务器提供商 比如 Github 等等
        //   url: "https://github.com/Run2948/vue-electron.git" // 服务器地址
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
              // arch: ["x64","ia32"] // 这样配置是打包32位+64位的安装包，打包出来的安装包体积比较大，一般建议直接打32或64位的安装包。
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
  ...
}

```

### Compiles and hot-reloads for development
```bash
npm run electron:serve
```

### Compiles and minifies for production
```bash
npm run electron:build
```

## Electron 环境搭建

#### 安装（全局安装，只需安装一次）

> 安装速度慢，使用淘宝镜像加速：
>
> `npm config set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/`

```bash
npm i -g electron
```

#### 1. 创建项目 （通过 Git 克隆项目）

```bash
git clone https://github.com/electron/electron-quick-start

npm i

npm start
```

#### 2.创建项目 （通过 electron-forge 脚手架）

> `electron-forge` 相当于 `electron` 的一个脚手架，可以让我们更方便的创建、运行、打包 `electron` 项目。

##### 1. 全局安装 `electron-forge`

`npm i -g electron-forge` 

##### 2.创建项目

`electron-forge init myapp`

**注意：此命令会默认执行 npm install ** 

##### 3.运行项目

```bash
cd myapp

npm start
```

