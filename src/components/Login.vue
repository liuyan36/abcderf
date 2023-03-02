<template>
  <div class="login">
    <!-- 登录logo -->
    <div class="login-first">
      <img
        class="login-first-logo"
        src="../assets/login/login-logo.png"
        alt=""
      />
    </div>

    <!-- 内容区域 -->
    <div class="login-second">
      <div class="second-left">
        <img class="second-left-img" src="../assets/login/login-back.png" />
        <div class="second-left-block">
          <div class="second-left-block-title">
            <span class="title1">您好</span
            ><span class="title2">, 欢迎登录</span>
          </div>
          <div class="second-left-block-login">乡米网后台管理系统</div>
        </div>
      </div>
      <div class="second-right">
        <div class="second-right-block">
          <div
            class="block-list"
            v-for="(item, index) in registerName"
            :key="index"
            :class="{ acitve: index == registerIndex }"
            @click="registerNameBtn(index)"
          >
            <div class="block-list-title">{{ item }}</div>
            <div class="block-list-lint" v-if="index == registerIndex"></div>
          </div>
        </div>

        <div v-show="registerIndex == 0">
          <div class="second-right-phone">
            <el-input placeholder="请输入手机号" v-model="phone">
              <i slot="prefix" class="el-input__icon el-icon-phones"></i>
            </el-input>
          </div>
          <div class="second-right-error" v-if="errorShow == true">
            账号不存在
          </div>
          <div class="second-right-verification">
            <el-input placeholder="输入验证码" v-model="verification">
              <i
                slot="prefix"
                :size="20"
                class="el-input__icon el-icon-verification"
              ></i>
              <el-button slot="append" @click="verificationBtn" v-if="show == 0"
                >发送验证码</el-button
              >
              <el-button slot="append" v-if="show == 1"
                >{{ count }}秒</el-button
              >
            </el-input>
          </div>
        </div>

        <div v-show="registerIndex == 1">
          <div class="second-right-account">
            <!-- <el-input placeholder="请输入账号" v-model="account">
              <i slot="prefix" class="el-input__icon el-icon-zhanghao"></i>
            </el-input> -->

            <el-autocomplete
              class="inline-input"
              v-model="account"
              :fetch-suggestions="querySearch"
              placeholder="请输入账号"
              @select="handleSelect"
            >
              <i slot="prefix" class="el-input__icon el-icon-zhanghao"></i
            ></el-autocomplete>
          </div>
          <div class="second-right-error" v-if="errorShow == true">
            账号不存在
          </div>
          <div class="second-right-password">
            <el-input
              placeholder="请输入登录密码"
              v-model="password"
              show-password
            >
              <i slot="prefix" class="el-input__icon el-icon-mima"></i>
            </el-input>
          </div>
          <div class="second-right-remember" @click="checkBtn">
            <img
              class="remember-left"
              :src="
                checkIshow == false
                  ? require('../assets/login/login-notcheck.png')
                  : require('../assets/login/login-check.png')
              "
            />
            <div class="remember-right">记住账号密码</div>
          </div>
        </div>
        <div class="second-right-button" @click="registerBtn">登 录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { postlogin, postcode } from '../api/login'

var verify = require('../utils/verify')

import Cookies from 'js-cookie'

import { md5 } from '../utils/md5'
export default {
  data() {
    return {
      // 数组名称
      registerName: ['手机验证码登录', '账号密码登录'],
      // 数组名称下标
      registerIndex: 0,
      // 手机号
      phone: '',
      // 验证码
      verification: '',
      // 账号
      account: '',
      // 账号弹出框  带建议搜索框数组
      restaurant: [],
      // 密码
      password: '',
      // 判断是否选中 false不选择  true 选中
      checkIshow: false,
      // 发送验证码
      show: 0, // 0 获取验证码 1 倒计时
      count: '', // 数值
      timer: null, // 关闭倒计时
      //pwdless: 'password', //密码框的类型
      // 判断当前输入错误
      errorShow: false,
    }
  },
  created() {
    if (JSON.parse(Cookies.get('info') != undefined)) {
      this.restaurant = JSON.parse(Cookies.get('info'))

      this.restaurant = this.fn2(JSON.parse(Cookies.get('info')), 'account')

      this.restaurant.map((item) => {
        item.value = item.account
        return item
      })
    }
  },
  methods: {
    // 点击切换登录模式
    registerNameBtn(index) {
      this.registerIndex = index
      this.errorShow = false
    },
    // 点击是否记住密码
    checkBtn() {
      this.checkIshow = !this.checkIshow
    },
    // 点击发送验证码
    verificationBtn() {
      // 判断手机号不能为空
      if (!verify.codeVerification(this.phone)) {
        this.$message.error('电话号码格式不正确！')
        return
      }
      const times = 60 // 倒计时时间
      if (!this.timer) {
        this.count = times
        this.show = 1
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= times) {
            this.count--
          } else {
            this.show = 0
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }

      // 开启验证
      this.codePhone()
    },

    // 发送验证码
    codePhone() {
      let params = {
        phone: this.phone,
      }
      postcode(params).then((res) => {})
    },

    // 用户点击登录
    registerBtn() {
      if (this.registerIndex == 0) {
        if (this.phone != '' && this.verification != '') {
          console.log('手机号加验证码登录')
          let params = {
            loginType: 'CODE',
            phone: this.phone,
            password: '',
            code: this.verification,
          }
          postlogin(params).then((res) => {
            // 获取登录数据
            console.log('手机号登录', res)
            // 获取登录数据
            if (res.resultStatus == true) {
              // 存储登录后个人信息
              localStorage.setItem('info', JSON.stringify(res.resultData))
              // 存储登录后的accessToken 登录凭证
              localStorage.setItem('token', res.resultData.accessToken)
              this.$router.go(0)
            } else {
              this.$message.error(res.errorMessage)
            }
          })
        }
      } else {
        if (this.account != '' && this.password != '') {
          console.log('账号加密码登录')
          let params = {
            loginType: 'USER',
            phone: this.account,
            password: md5(this.password),
            code: '',
          }
          postlogin(params).then((res) => {
            // 获取登录数据
            if (res.resultStatus == true) {
              // 存储登录后个人信息
              localStorage.setItem('info', JSON.stringify(res.resultData))
              // 存储登录后的accessToken 登录凭证
              localStorage.setItem('token', res.resultData.accessToken)
              if (this.checkIshow == true) {
                let obj = {
                  password: this.password,
                  account: this.account,
                }
                this.restaurant.push(obj)
                var jj = JSON.stringify(this.restaurant)
                // // 记住账号密码
                Cookies.set('info', jj, { expires: 30 })
              }

              this.$router.go(0)
            }
          })
        }
      }
    },

    querySearch(queryString, cb) {
      var restaurants = this.restaurant
      console.log('触发', restaurants)
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    loadAll() {
      return this.restaurant
    },
    handleSelect(item) {
      // 账号
      this.account = item.value
      // 密码
      this.password = item.password
    },
    fn2(arr, name) {
      var hash = {}
      return arr.reduce(function (acc, cru, index) {
        if (!hash[cru[name]]) {
          hash[cru[name]] = { index: index }
          acc.push(cru)
        } else {
          acc.splice(hash[cru[name]]['index'], 1, cru)
        }
        return acc
      }, [])
    },
  },
}
</script>

<style lang="less" scoped>
/deep/ .el-input__inner:focus {
  border-color: rgba(221, 221, 221, 1);
}

.login {
  width: 1200px;
  margin: 0 auto;

  .login-first {
    width: 100%;
    height: 67px;
    display: flex;
    margin-top: 59px;

    .login-first-logo {
      width: 136px;
      height: 67px;
    }
  }

  .login-second {
    width: 100%;
    height: 620px;
    margin-top: 40px;
    position: relative;
    display: flex;
    box-shadow: 0px 0px 10px 0px #edeff7;
    border-radius: 10px;

    .second-left {
      width: 604px;
      height: 100%;
      position: relative;

      .second-left-img {
        position: absolute;
        width: 100%;
        height: 100%;
      }

      .second-left-block {
        position: relative;
        margin-left: 80px;
        top: 91px;

        .second-left-block-title {
          .title1 {
            font-size: 64px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #ffffff;
          }

          .title2 {
            font-size: 30px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 500;
            color: #ffffff;
          }
        }

        .second-left-block-login {
          height: 42px;
          font-size: 25px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 42px;
        }
      }
    }

    .second-right {
      width: 370px;
      margin: 0 auto;
      margin-top: 110px;

      .second-right-block {
        display: flex;
        justify-content: space-between;
        width: 100%;

        .block-list {
          cursor: pointer;

          .block-list-title {
            height: 40px;
            font-size: 20px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 40px;
          }

          .block-list-lint {
            width: 120px;
            height: 4px;
            background: #222222;
            border-radius: 2px;
            margin: 0 auto;
          }
        }

        .acitve {
          .block-list-title {
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 600;
            color: #222222;
          }
        }
      }

      /* 手机号验证码 */
      .second-right-phone,
      .second-right-verification {
        width: 100%;
        height: 56px;
        border-radius: 10px;
        margin-top: 34px;
        font-size: 20px;

        /deep/ .el-input__inner::-webkit-input-placeholder {
          font-size: 16px !important;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400 !important;
          color: #888888 !important;
        }

        /deep/ .el-input__inner {
          height: 56px;
          position: relative;
        }

        /deep/ .el-input__icon {
          width: 54px;
        }

        /deep/ .el-input--prefix .el-input__inner {
          padding-left: 54px;
        }

        /deep/ .el-input__icon {
          font-size: 20px;
          line-height: 56px;
        }
      }

      .second-right-verification {
        margin-top: 14px;

        /deep/ .el-input__inner {
          border-right: 0;
        }

        /deep/ .el-input-group__append {
          background: #ffffff !important;
          font-size: 16px !important;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #36c100 !important;
        }

        /deep/ .el-button {
          height: 38px;
          border-left: 0;
          border-left: 1px solid #dddddd;
          border-radius: 0;
          display: flex;
          align-items: center;
        }
      }

      .second-right-error {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ed6d1f;
        margin-top: 5px;
        margin-left: 20px;
      }

      /* 账号密码区域 */
      .second-right-account,
      .second-right-password {
        width: 100%;
        height: 56px;
        border-radius: 10px;
        margin-top: 34px;
        font-size: 20px;

        /deep/ .el-input__inner::-webkit-input-placeholder {
          font-size: 16px !important;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400 !important;
          color: #888888 !important;
        }

        /deep/ .el-input__inner {
          height: 56px;
          position: relative;
        }

        /deep/ .el-input__icon {
          width: 54px;
        }

        /deep/ .el-input--prefix .el-input__inner {
          padding-left: 54px;
        }

        /deep/ .el-input__icon {
          font-size: 20px;
          line-height: 56px;
        }

        /deep/ .el-autocomplete {
          width: 100%;
        }
      }

      .second-right-password {
        margin-top: 14px;
      }

      .second-right-remember {
        display: flex;
        height: 21px;
        align-items: center;
        margin-top: 30px;
        cursor: pointer;

        .remember-left {
          width: 16px;
          height: 16px;
        }

        .remember-right {
          font-size: 15px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #222222;
          margin-left: 7px;
        }
      }

      .second-right-button {
        cursor: pointer;
        width: 370px;
        height: 60px;
        background: linear-gradient(302deg, #36c53d 0%, #3fd747 100%);
        border-radius: 10px;
        font-size: 20px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
        text-align: center;
        line-height: 60px;
        margin-top: 54px;
      }
    }
  }
}
</style>
