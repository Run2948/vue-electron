<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "sev",
}
</script>

<style>
/* CSS */
html {
  font-size: 62.5% !important; /* 10 ÷ 16 × 100% = 62.5% 方便使用rem做单位*/
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
html,
body,
#app {
  height: 100%;
  overflow: hidden;
  background-color: transparent !important;
  /* border-radius: 4px; */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  padding: 0.45rem;
}
</style>
