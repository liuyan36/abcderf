<template>
  <div class="error">
    <div class="error-center">
      <img
        class="error-center-img"
        src="../assets/common/common-404.png"
        alt=""
      />
      <div class="error-center-title">404错误</div>
      <div class="error-center-text">sorry您访问的页面弄丢了</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    back() {
      this.$router.back()
    },
  },
}
</script>

<style lang="less" scoped>
.error {
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  .error-center {
    width: 174px;
    text-align: center;
    .error-center-img {
      width: 174px;
      height: 174px;
    }

    .error-center-title {
      font-size: 36px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #222222;
    }

    .error-center-text {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
    }
  }
}
</style>
