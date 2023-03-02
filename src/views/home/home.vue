<template>
  <div class="home" v-loading="loading">
    <div class="home-first">
      <div class="home-first-list" v-for="(item, index) in 4" :key="index">
        <div class="home-first-list-div">
          <div class="home-first-list-div-left">
            <img
              :src="
                index == 0
                  ? require('../../assets/home/top3.png')
                  : index == 1
                  ? require('../../assets/home/top4.png')
                  : index == 2
                  ? require('../../assets/home/top5.png')
                  : require('../../assets/home/top6.png')
              "
              alt=""
            />
          </div>
          <div class="home-first-list-div-right">
            <div class="home-first-list-div-right-title">
              {{
                index == 0
                  ? '销售总金额（元）'
                  : index == 1
                  ? '当日销售金额（元）'
                  : index == 2
                  ? '会员收费总金额（元）'
                  : '会员收费当日金额（元）'
              }}
            </div>
            <div class="home-first-list-div-right-num">
              {{
                index == 0
                  ? homeOrderobj.orderPrice
                    ? homeOrderobj.orderPrice.toFixed(2)
                    : homeOrderobj.orderPrice
                  : index == 1
                  ? homeOrderobj.todayOrderPrice
                    ? homeOrderobj.todayOrderPrice.toFixed(2)
                    : homeOrderobj.todayOrderPrice
                  : index == 2
                  ? homeOrderobj.vipPrice
                    ? homeOrderobj.vipPrice.toFixed(2)
                    : homeOrderobj.vipPrice
                  : homeOrderobj.todayVipPrice
                  ? homeOrderobj.todayVipPrice.toFixed(2)
                  : homeOrderobj.todayVipPrice
              }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="home-second">
      <div class="home-second-left">
        <div class="home-second-left-title">用户类型图</div>

        <div class="home-second-left-div">
          <div class="home-second-left-div-left">
            <div id="chartPie" style="width: 300px; height: 300px"></div>

            <div class="home-second-left-div-left-block">
              <div class="home-second-left-div-left-block-title">
                用户总数（人）
              </div>
              <div class="home-second-left-div-left-block-text">
                {{ homeUserobj.userNum }}
              </div>
            </div>
          </div>
          <div class="home-second-left-div-right">
            <div
              class="home-second-left-div-right-list"
              v-for="(info, num) in 2"
              :key="num"
            >
              <div class="home-second-left-div-right-list-top">
                <div
                  class="home-second-left-div-right-list-top-display"
                  v-for="(item, index) in 2"
                  :key="index"
                >
                  <div
                    class="home-second-left-div-right-list-top-display-title"
                  >
                    <span
                      v-if="index == 0"
                      class="home-second-left-div-right-list-top-display-title1"
                      :style="{ background: num == 0 ? '#36c100' : '#FCC627' }"
                    ></span>
                    {{
                      num == 0
                        ? index == 0
                          ? '普通用户（人）'
                          : '当日新增用户数（人）'
                        : index == 0
                        ? 'VIP 用户（人）'
                        : '当日新增VIP用户（人）'
                    }}
                  </div>
                  <div class="home-second-left-div-right-list-top-display-num">
                    {{
                      num == 0
                        ? index == 0
                          ? homeUserobj.ptNum
                          : homeUserobj.addUserNum
                        : index == 0
                        ? homeUserobj.vipNum
                        : homeUserobj.addVipNum
                    }}

                    <div
                      v-if="index == 1"
                      class="
                        home-second-left-div-right-list-top-display-num-span
                      "
                    >
                      <img
                        class="
                          home-second-left-div-right-list-top-display-num-span-img
                        "
                        :src="
                          num == 0
                            ? homeUserobj.addUserRate >= 0
                              ? require('../../assets/user/user-rise.png')
                              : require('../../assets/user/user-fall.png')
                            : homeUserobj.addVipRate >= 0
                            ? require('../../assets/user/user-rise.png')
                            : require('../../assets/user/user-fall.png')
                        "
                      />
                      <div
                        class="
                          home-second-left-div-right-list-top-display-num-span-title
                        "
                      >
                        {{
                          num == 0
                            ? homeUserobj.addUserRate
                            : homeUserobj.addVipRate
                        }}%
                      </div>
                      <div
                        class="
                          home-second-left-div-right-list-top-display-num-span-text
                        "
                      >
                        同比昨日
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="home-second-right">
        <div
          class="home-second-right-list"
          v-for="(item, index) in 2"
          :key="index"
        >
          <img
            class="home-second-right-list-img"
            :src="
              index == 0
                ? require('../../assets/home/top2.png')
                : require('../../assets/home/top1.png')
            "
            alt=""
          />

          <div class="home-second-right-list-top">
            <div class="home-second-right-list-top-title">
              {{ index == 0 ? '总订单数（单）' : '待处理售后（单）' }}
            </div>
            <div class="home-second-right-list-top-price">
              {{
                index == 0 ? homeOrderobj.orderNum : homeOrderobj.afterOrderNum
              }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="home-thirdly">
      <div class="home-thirdly-top">
        <div class="home-thirdly-top-left">销售金额数据图</div>
        <div class="home-thirdly-top-right">
          <el-date-picker
            v-model="pitchMonth"
            type="month"
            placeholder="选择月"
            @change="numpeopleBtn"
            value-format="yyyy-MM"
          >
          </el-date-picker>
        </div>
      </div>

      <div class="home-thirdly-center">
        <div class="home-thirdly-center-left">
          <div
            id="chartMarket"
            style="width: 7.395833rem; height: 1.59375rem"
          ></div>
        </div>
        <div class="home-thirdly-center-right">
          <div
            class="daily-right-block"
            v-for="(item, index) in 2"
            :key="index"
          >
            <div class="daily-right-block-title">
              {{
                index == 0
                  ? '昨日销售金额（元）'
                  : index == 1
                  ? '今日销售金额（元）'
                  : ''
              }}
            </div>

            <div class="daily-right-block-num">
              {{
                index == 0
                  ? homeMarkeobj.yesterdayPrice
                    ? homeMarkeobj.yesterdayPrice.toFixed(2)
                    : homeMarkeobj.yesterdayPrice
                  : index == 1
                  ? homeMarkeobj.todayPrice
                    ? homeMarkeobj.todayPrice.toFixed(2)
                    : homeMarkeobj.todayPrice
                  : ''
              }}
            </div>
            <div class="daily-right-block-comparison" v-if="index == 1">
              <img
                class="comparison-img"
                :src="
                  homeMarkeobj.addPriceRate >= 0
                    ? require('../../assets/user/user-rise.png')
                    : require('../../assets/user/user-fall.png')
                "
              />
              <div class="comparison-percent">
                {{ homeMarkeobj.addPriceRate }}%
              </div>
              <div class="comparison-npercent">同比昨日</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getIndex, getPrice } from '../../api/home'

import { getDateTime } from '../../utils/time' // 时间戳转化

export default {
  data() {
    return {
      // 首页订单部分基本数据存储
      homeOrderobj: {},
      // 首页用户部分基本数据存储
      homeUserobj: {},
      // 第二区域 获取选中月份
      pitchMonth: '',
      // 首页销售额曲部分数据存储
      homeMarkeobj: {},
      // 监听用户刷新
      loading: false,
    }
  },
  created() {
    this.loading = true
    // 第二区域 每日新增人数 获取月份
    this.pitchMonth = getDateTime('month')
    // 获取首页基本数据方法
    this.getIndexClick()
    // 获取销售额曲上线
    this.getPriceClick()
  },
  methods: {
    //  获取首页基本数据方法
    getIndexClick() {
      let params = {}

      getIndex(params).then((res) => {
        console.log('获取数据', res)
        if (res.resultStatus == true) {
          this.homeOrderobj = res.resultData.order
          // 首页用户部分基本数据存储
          this.homeUserobj = res.resultData.user
          this.loading = false

          this.$nextTick(() => {
            // 第二区域折线图
            this.getsecondpie(this.homeUserobj)
          })
        }
      })
    },

    // 获取销售额曲上线
    getPriceClick() {
      let params = {
        month: this.pitchMonth,
      }

      getPrice(params).then((res) => {
        if (res.resultStatus == true) {
          console.log('接口请求', res)
          this.homeMarkeobj = res.resultData
          //  获取日期对照表
          // 获取日期数组
          let userNewly = res.resultData.orderPriceList
          console.log('1', userNewly)
          // 当前月份时间日期
          let userTime = []
          let userPeople = []
          userNewly.forEach((item, index) => {
            userTime.push(item.time.slice(-2))
            userPeople.push(item.num)
          })

          this.$nextTick(() => {
            this.getMarketpicture(userTime, userPeople)
          })
        }
      })
    },

    // 第二区域扇形统计图
    getsecondpie(data) {
      var myChart = this.$echarts.init(document.getElementById('chartPie'))

      // 绘制图表
      myChart.setOption(
        {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
          },
          color: ['#36C100', '#FCC627'],
          grid: {
            x: 105,
            y: 105,
            x2: 105,
            y2: 105,
            borderWidth: 1,
          },
          series: [
            {
              name: '总人数',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center',
              },
              emphasis: {
                label: {
                  show: false,
                  fontSize: '12',
                  fontWeight: 'bold',
                },
              },
              labelLine: {
                show: false,
              },
              data: [
                { value: data.ptNum, name: '普通用户（人）' },
                { value: data.vipNum, name: 'VIP用户（人）' },
              ],
            },
          ],
        },
        true
      )
    },

    // 第三区域 点击获取月份
    numpeopleBtn(val) {
      if (val) {
        var year = val.split('-')[0]
        var month = val.split('-')[1]
        this.pitchMonth = year + '-' + month
        // 触发 月份
        this.getPriceClick()
      }
    },
    // 第三区域
    getMarketpicture(time, people) {
      var myChart = this.$echarts.init(document.getElementById('chartMarket'))
      // 绘制图表
      myChart.setOption(
        {
          tooltip: {
            trigger: 'axis',
          },
          calculable: true,
          xAxis: [
            {
              name: '日期',
              type: 'category',
              boundaryGap: false,
              data: time,
              axisLine: {
                show: true,
                // 坐标轴线
                lineStyle: {
                  color: '#999999',
                },
              },
              axisTick: {
                //刻度线
                show: false,
                lineStyle: {
                  color: '#999999',
                },
              },
            },
          ],
          grid: {
            left: '4%',
            right: '4%',
            top: '60px',
            bottom: '20%',
          },
          yAxis: [
            {
              name: '元',
              type: 'value',
              axisLabel: {
                formatter: '{value}',
              },
              splitLine: {
                show: false, //不显示分隔线
              },
              minInterval: 1,
            },
          ],
          color: ['#DCE7FC'],
          series: [
            {
              symbol: 'none',
              name: '新增(元)',
              type: 'line',
              color: ['#29D647'],
              smooth: true,
              data: people,
              itemStyle: {
                normal: {
                  color: '#29D647',
                  lineStyle: {
                    width: 3, //设置线条粗细
                    shadowOffsetX: 0, // 折线的X偏移
                    shadowColor: 'rgba(41, 214, 71, 1)', //折线颜色
                  },
                },
              },
            },
          ],
        },
        true
      )
    },
  },
}
</script>

<style lang="less" scoped>
.home {
  .home-first {
    height: 100px;
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px #edeff7;
    border-radius: 10px;
    display: flex;
    padding: 18px 0;
    box-sizing: border-box;

    .home-first-list {
      width: calc(100% / 4);
      height: 100%;
      border-right: 2px solid #f4f5f9;
      display: flex;
      justify-content: center;
      align-items: center;
      .home-first-list-div {
        display: flex;
        align-items: center;
        .home-first-list-div-left {
          width: 72px;
          height: 72px;
          background: #f4f5f9;
          border-radius: 50%;

          img {
            width: 100%;
            height: 100%;
          }
        }
        .home-first-list-div-right {
          margin-left: 12px;
          .home-first-list-div-right-title {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #222222;
          }
          .home-first-list-div-right-num {
            font-size: 24px;
            font-family: DINAlternate-Bold, DINAlternate;
            font-weight: bold;
            color: #222222;
            margin-top: 4px;
          }
        }
      }
    }
  }
  .home-second {
    margin-top: 24px;
    display: flex;
    .home-second-left {
      background: #ffffff;
      box-shadow: 0px 0px 10px 0px #edeff7;
      border-radius: 10px;
      width: 1152px;
      padding: 24px;
      box-sizing: border-box;

      .home-second-left-title {
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #222222;
      }
      .home-second-left-div {
        margin-top: 37px;
        margin-left: 188px;
        display: flex;
        .home-second-left-div-left {
          width: 210px;
          height: 210px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;

          .home-second-left-div-left-block {
            position: absolute;
            right: 25%;
            text-align: center;
            .home-second-left-div-left-block-title {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #222222;
            }
            .home-second-left-div-left-block-text {
              font-size: 24px;
              font-family: DINAlternate-Bold, DINAlternate;
              font-weight: bold;
              color: #222222;
              margin-top: 4px;
            }
          }
        }
        .home-second-left-div-right {
          margin-left: 111px;

          .home-second-left-div-right-list {
            display: flex;
            margin-bottom: 52px;
            .home-second-left-div-right-list-top {
              display: flex;
              .home-second-left-div-right-list-top-display {
                margin-right: 63px;
                .home-second-left-div-right-list-top-display-title {
                  display: flex;
                  height: 20px;
                  font-size: 14px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #222222;
                  align-items: center;
                }

                .home-second-left-div-right-list-top-display-title1 {
                  width: 12px;
                  height: 12px;
                  border-radius: 6px;
                  display: block;
                  margin-right: 13px;
                }
                .home-second-left-div-right-list-top-display-num {
                  font-size: 24px;
                  font-family: DINAlternate-Bold, DINAlternate;
                  font-weight: bold;
                  color: #222222;
                  margin-top: 8px;
                  display: flex;
                  align-items: center;

                  .home-second-left-div-right-list-top-display-num-span {
                    display: flex;
                    align-items: center;
                    margin-left: 30px;

                    .home-second-left-div-right-list-top-display-num-span-img {
                      width: 11px;
                      height: 11px;
                    }

                    .home-second-left-div-right-list-top-display-num-span-title {
                      font-size: 16px;
                      font-family: DINAlternate-Bold, DINAlternate;
                      font-weight: bold;
                      color: #222222;
                      margin: 0 6px;
                    }
                    .home-second-left-div-right-list-top-display-num-span-text {
                      font-size: 12px;
                      font-family: PingFangSC-Regular, PingFang SC;
                      font-weight: 400;
                      color: rgba(34, 34, 34, 0.35);
                    }
                  }
                }
              }

              .home-second-left-div-right-list-top-display:last-child {
                margin-right: 0;
              }
            }
          }

          .home-second-left-div-right-list:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
    .home-second-right {
      margin-left: 24px;
      .home-second-right-list {
        width: 488px;
        height: 160px;
        background: #ffffff;
        box-shadow: 0px 0px 10px 0px #edeff7;
        border-radius: 10px;
        margin-bottom: 23px;

        position: relative;
        .home-second-right-list-img {
          position: absolute;
          width: 100%;

          height: 96px;
          display: flex;
          object-fit: fill;
          bottom: 0;
        }

        .home-second-right-list-top {
          padding: 24px;
          box-sizing: border-box;
          position: relative;
          .home-second-right-list-top-title {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #222222;
          }
          .home-second-right-list-top-price {
            margin-top: 8px;
            font-size: 34px;
            font-family: DINAlternate-Bold, DINAlternate;
            font-weight: bold;
            color: #222222;
          }
        }
      }
      .home-second-right-list:last-child {
        margin-bottom: 0;
      }
    }
  }

  .home-thirdly {
    padding: 24px;
    box-sizing: border-box;
    margin-top: 24px;
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px #edeff7;
    border-radius: 10px;
    .home-thirdly-top {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .home-thirdly-top-left {
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #222222;
      }
      .home-thirdly-top-right {
        width: 180px;
        height: 40px;
        background: #ffffff;
        border-radius: 2px;

        /deep/ .el-date-editor.el-input {
          width: 180px;
        }

        /deep/ .el-input--prefix .el-input__inner {
          padding-left: 50px;
        }

        /deep/ .el-input__inner {
          height: 40px;
          line-height: 40px;
        }
      }
    }

    .home-thirdly-center {
      display: flex;
      justify-content: space-between;
      margin-top: 25px;

      .home-thirdly-center-left {
        width: 1420px !important;
        height: 100%;
      }
      .home-thirdly-center-right {
        margin-right: 32px;
        margin-top: 48px;

        .daily-right-block {
          margin-top: 34px;

          .daily-right-block-title {
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999;
            line-height: 20px;
          }
          .daily-right-block-num {
            height: 28px;
            font-size: 24px;
            font-weight: bold;
            color: #222222;
            line-height: 28px;
            text-align: left;
            margin-top: 8px;
          }

          .daily-right-block-comparison {
            display: flex;
            align-items: center;
            height: 17px;
            margin-top: 6px;
            .comparison-img {
              width: 16px;
              height: 16px;
              margin-right: 6px;
            }
            .comparison-percent {
              font-size: 16px;
              font-family: DINAlternate-Bold, DINAlternate;
              font-weight: bold;
              color: #222222;
              margin-right: 6px;
            }
            .comparison-npercent {
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(34, 34, 34, 0.35);
            }
          }
        }
      }
    }
  }
}
</style>
