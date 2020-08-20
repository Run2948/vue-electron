<template>
  <el-card :body-style="{ height: '100%',padding: '16px',boxSizing: 'border-box', }" class="box-card div drag">
    <el-container style="height:100%">
      <el-header class="headers">
        <el-col :span="4" class="avatar">
          <img :src="getImgSrc" style="height:100%;width:100%;border-radius:50%;" />
        </el-col>
        <el-col :span="16">
          <el-row class="header-title">定时关机</el-row>
          <el-row class="header-sub-title">基于Vue、Electron打造的一款入门级小应用</el-row>
        </el-col>
        <el-col :span="4">
          <el-row class="header-sub-title noDrag versions">
            <el-button class="versions" type="text">{{Versions}}</el-button>
          </el-row>
        </el-col>
      </el-header>
      <el-main class="main">
        <el-row class="row timeCard">{{getTime}}:{{getMinute}}:{{getSecond}}</el-row>
        <el-row style="height:50%;">
          <el-row class="row" style="position: relative;top: 13px;">
            <el-input-number
              :max="99"
              :min="0"
              :step="0.1"
              class="noDrag"
              controls-position="right"
              v-model="InputValue"
              v-on:change="valueChange"
            ></el-input-number>
          </el-row>
          <el-row class="row">
            <el-button-group class="noDrag">
              <el-button :disabled="!BtnDisabled" @click="end" icon="el-icon-delete" type="primary"></el-button>
              <el-button :disabled="BtnDisabled" @click="begin" icon="el-icon-check" type="success"></el-button>
            </el-button-group>
          </el-row>
        </el-row>
      </el-main>
      <!--
      <el-footer class="footer">
        <el-row type="flex">
          <el-col :span="6" class="noDrag">
            <el-button class="versions" slot="reference" type="text">
              <img src="../assets/Feedback.svg" style="height:32px;width:32px;" />
            </el-button>
          </el-col>
          <el-col :span="12" class="noDrag">
            <a @click="open('https://gitee.com/Enious/Shutdown-Electron-Vue')" href="javascript:void(0);">
              <img alt="Fork me on Gitee" src="https://gitee.com/Enious/Shutdown-Electron-Vue/widgets/widget_6.svg" />
            </a>
          </el-col>
          <el-col :span="6" class="noDrag">
            <el-button class="versions" slot="reference" type="text">
              <img src="../assets/QR.svg" style="height:32px;width:32px;" />
            </el-button>
          </el-col>
        </el-row>
      </el-footer>
      -->
    </el-container>
  </el-card>
</template>

<script>
export default {
  name: "landing-page",
  data() {
    return {
      Time: 0,
      Minute: 0,
      Second: 0,
      Name: "",
      Versions: "",
      OS: require("os").platform(),
      BtnText: "开始",
      isBtn: false,
      Timer: null,
      Img: [
        require("../assets/1.png"),
        require("../assets/2.png"),
        require("../assets/3.png"),
        require("../assets/4.png"),
        require("../assets/5.png"),
        require("../assets/6.png"),
        require("../assets/7.png"),
        require("../assets/8.png"),
        require("../assets/9.png"),
        require("../assets/10.png"),
        require("../assets/11.png"),
        require("../assets/12.png"),
        require("../assets/13.png"),
      ],
      BtnDisabled: false,
      InputValue: 0,
    }
  },
  mounted() {
    //! ipc通信 向主进程发消息
    this.$electron.ipcRenderer.send("get-app-versions")
    this.$electron.ipcRenderer.send("get-app-name")
    //! 响应主进程消息
    this.$electron.ipcRenderer.on("got-app-versions", (event, versions) => {
      this.Versions = `V ${versions}`
    })

    this.$electron.ipcRenderer.on("got-app-name", (event, name) => {
      this.Name = `${name}`
    })

    this.$electron.ipcRenderer.on(
      "got-timing-message",
      (event, TimingMessage) => {
        if (TimingMessage === "不支持") {
          this.$message({
            message: "不支持的系统！",
            type: "error",
            center: true,
          })
        }
      }
    )

    this.$electron.ipcRenderer.on("got-end-message", (event, EndMessage) => {
      if (EndMessage === "不支持") {
        this.$message({
          message: "不支持的系统！",
          type: "error",
          center: true,
        })
      }
    })

    // console.log(document.getElementsByTagName('input')[0].onkeyup = function () { this.value = this.value.replace(/\D/g, '') }) // eslint-disabled-line
    document.getElementsByTagName("input")[0].onkeyup = function () {
      this.value = this.value.replace(/(\d*\.\d).*/, "$1")
    }
  },
  computed: {
    getImgSrc() {
      const index = parseInt(Math.random() * 13)
      return this.Img[index]
    },
    gotTitle() {
      return this.Name + "  v" + this.Versions
    },
    getTime() {
      return this.Time < 10 ? `0${this.Time}` : `${this.Time}`
    },
    getMinute() {
      return this.Minute < 10 ? `0${this.Minute}` : `${this.Minute}`
    },
    getSecond() {
      return this.Second < 10 ? `0${this.Second}` : `${this.Second}`
    },
  },
  methods: {
    begin() {
      if (this.InputValue !== 0) {
        this.$message({
          message: `将在${this.Time}时 ${this.Minute}分 ${this.Second}秒后强制关机！`,
          type: "success",
          center: true,
        })

        this.BtnDisabled = true
        this.Timer = setInterval(() => {
          if (this.Second === 0 && this.Minute !== 0) {
            this.Minute -= 1
            this.Second = 60
          } else if (this.Minute === 0 && this.Time !== 0) {
            this.Time -= 1
            this.Minute = 60 //! 应该是59
          } else if (
            this.Time === 0 &&
            this.Minute === 0 &&
            this.Second === 0
          ) {
            // TODO  推送系统通知
            this.$electron.ipcRenderer.send("set-timing-shutdown")
            clearInterval(this.Timer)
            // console.log('关机' + this.Timer)
          } else {
            this.Second--
          }
        }, 1000)
      } else {
        // TODO UI通知不能为空
        this.$message({
          message: "错误，请输入时间！",
          center: true,
          type: "error",
        })
      }
    },
    end() {
      this.BtnDisabled = false
      clearInterval(this.Timer)
      // console.log('清除' + this.Timer)
      this.InputValue = 0
      this.Time = 0
      this.Minute = 0
      this.Second = 0
      this.$electron.ipcRenderer.send("set-end-shutdown")

      this.$message({
        message: "您已经取消了关机计划！",
        center: true,
        type: "warning",
      })
    },
    valueChange(value) {
      this.$nextTick(() => {
        // * 这是一个坑，必须在这判断value 的值不然会导致绑定的值为NaN
        if (value === undefined) {
          value = 0
        }
        this.InputValue = value
        this.Time = parseInt(value)
        this.Minute = Math.round((value - this.Time) * 60)
      })
    },
    open(link) {
      this.$electron.shell.openExternal(link)
    },
  },
}
</script>

<style lang="scss" scoped>
.div {
  user-select: none;
  height: 100%;
  // background: #5c6bc0;
  background-image: url("../assets/background.svg");
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgba(130, 36, 132, 0.5) !important;
  border: 0px;
}
.drag {
  //! 一般添加到根组件上
  -webkit-app-region: drag;
}
.noDrag {
  //! 添加到所有又事件触发的组件上，不然不能触发事件
  -webkit-app-region: no-drag;
}
.timeCard {
  // height: 20%;
  // width: 85%;
  // margin: 0 auto;
  text-align: center;
  line-height: initial;
  font-size: 72px;
  border-radius: 0.45rem;
  background-color: rgba(58, 58, 58, 0.118);
}
.row {
  height: 100%;
  display: flex;
  div {
    height: 100%;
    div {
      width: inherit;
      font-size: 46px;
      color: rgb(92, 107, 192);
    }
  }
}
.btnColor-start {
  background-color: antiquewhite;
}
.btnColor-end {
  background-color: rgb(190, 16, 16);
}
//! 头部，内容，底部

.headers {
  height: 4rem !important;
  padding: 0 !important;
  margin-bottom: 0.8rem;
  white-space: nowrap;
  font-weight: 600;
  .avatar {
    height: 40px;
    width: 40px;
    margin-right: 12px;
    border-radius: 50%;
    text-align: center;
  }
  .header-title {
    font-size: 16px !important;
    color: rgba(140, 114, 179, 0.918) !important;
  }
  .header-sub-title {
    font-size: 14px;

    color: rgba(140, 114, 179, 0.6) !important;
  }
  .versions {
    color: rgba(140, 114, 179, 0.6) !important;
    &:hover {
      color: rgb(156, 179, 213) !important;
    }
  }
}
.main {
  height: 88%;
  padding: 0px !important;
  // display: flex;
  // align-items: center;
  // flex-direction: column;
}
// .footer {
//   height: auto !important;
//   padding: 0px !important;
//   .noDrag {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
// }
.row {
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .noDrag {
    height: initial;
  }
}
</style>
