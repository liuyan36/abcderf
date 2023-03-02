<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      keepAliveData: ['manage'],
    }
  },
  computed: {
    ...mapState(['isShowLoading']),
  },
}
</script>

<style lang="less">
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: PingFangSC-Regular, PingFang SC;
  cursor: default;
  margin: 0 !important;
  padding: 0 !important;

  .el-month-table td.today .cell {
    color: #606266;
    font-weight: 400;
  }

  .el-date-table td.today span {
    color: #606266;
    font-weight: 400;
  }

  .el-table tr {
    height: 70px;
  }

  .el-loading-mask {
    background-color: rgba(255, 255, 255, 0.5);
  }
}

li,
ul,
p,
div,
body,
html,
table {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

input {
  cursor: pointer;
}

html,
body {
  height: 100%;
  overflow: hidden;
}

li {
  list-style: none;
}

#app {
  height: 100%;
}

/* loading */
.global-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}

/*全局引入 滚动条 */

/* 消息提示样式修改 */

.el-message {
  padding: 13px 15px !important;
  min-width: 0px !important;
  top: 50% !important;
}

.el-message--error {
  background-color: rgba(255, 65, 51, 0.1) !important;
  border-color: #fde2e2;
}

.el-message__content {
  font-size: 14px !important;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600 !important;
  color: #ff4133 !important;
}

.el-loading-spinner .path {
  stroke: #36c100 !important;
}

.el-popup-parent--hidden {
  padding-right: 0 !important;
}

.el-month-table td {
  padding: 0.041667rem 0 !important;
}

</style>
