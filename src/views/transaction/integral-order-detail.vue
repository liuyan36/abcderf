<template>
  <div class="order" v-loading="loading">
    <div class="order-first">
      <div class="order-first-top">
        <div
          class="order-first-top-list"
          v-for="(item, index) in 3"
          :key="index"
        >
          <div>
            <div class="order-first-top-list-title">
              {{
                index == 0
                  ? orderObj.createTime == null
                    ? ''
                    : '订单兑换时间'
                  : index == 1
                  ? orderObj.fahuoTime == null
                    ? ''
                    : '订单发货时间'
                  : index == 2
                  ? orderObj.shouhuoTime == null
                    ? ''
                    : '订单收货时间'
                  : ''
              }}
            </div>
            <div class="order-first-top-list-time">
              {{
                index == 0
                  ? orderObj.createTime
                  : index == 1
                  ? orderObj.fahuoTime
                  : index == 2
                  ? orderObj.shouhuoTime
                  : ''
              }}
            </div>
          </div>
        </div>

        <div class="order-first-top-position">
          <div class="order-first-top-position-img" @click="remarkClick">
            <img
              :src="
                orderObj.status == 0
                  ? require('../../assets/home/state2.png')
                  : orderObj.status == 1
                  ? require('../../assets/home/state2.png')
                  : orderObj.status == 2
                  ? require('../../assets/home/state2.png')
                  : orderObj.status == 3
                  ? require('../../assets/home/state2.png')
                  : orderObj.status == 4
                  ? require('../../assets/home/state2.png')
                  : orderObj.status == 5
                  ? require('../../assets/home/state4.png')
                  : orderObj.status == 6
                  ? require('../../assets/home/state1.png')
                  : orderObj.status == 9
                  ? require('../../assets/home/state5.png')
                  : ''
              "
              alt=""
            />
          </div>
          <div class="order-first-top-position-text">
            {{
              orderObj.status == 0
                ? '已取消'
                : orderObj.status == 1
                ? '待支付'
                : orderObj.status == 2
                ? '已支付'
                : orderObj.status == 3
                ? '已发货'
                : orderObj.status == 4
                ? '待评价'
                : orderObj.status == 5
                ? '已完成'
                : orderObj.status == 6
                ? '售后中'
                : orderObj.status == 9
                ? '已删除'
                : ''
            }}
          </div>
        </div>
      </div>

      <div class="order-first-center">
        {{
          orderObj.status == 2
            ? '买家已付款，商品等待发货中。（一旦物流填写成功，则视为待收货订单。）'
            : orderObj.status == 3
            ? '买家已付款，商家已发货，待买家收货中。'
            : orderObj.status == 5
            ? '商品已收货，订单已完成。'
            : ''
        }}
      </div>

      <div class="order-first-bottom">
        <div
          class="order-first-bottom-list"
          v-for="(item, index) in 7"
          :key="index"
        >
          <div class="order-first-bottom-list-title">
            {{
              index == 0
                ? '用户id'
                : index == 1
                ? '用户名称'
                : index == 2
                ? '用户电话'
                : index == 3
                ? '支付方式'
                : index == 4
                ? '收件人'
                : index == 5
                ? '收件人电话'
                : '收件人地址'
            }}
          </div>
          <div class="order-first-bottom-list-text">
            {{
              index == 0
                ? orderObj.userId
                : index == 1
                ? orderObj.userName
                : index == 2
                ? orderObj.userPhone
                : index == 3
                ? orderObj.paytype == 1
                  ? '微信支付'
                  : orderObj.paytype == 2
                  ? '支付宝支付'
                  : orderObj.paytype == 3
                  ? '立减券抵扣'
                  : orderObj.paytype == 4
                  ? '积分支付'
                  : ''
                : index == 4
                ? orderObj.name
                : index == 5
                ? orderObj.phone
                : orderObj.address
            }}
            <span v-if="index == 1" class="order-first-bottom-list-text-span"
              >联系他</span
            >

            <div v-if="index == 3">
              <img
                v-if="
                  orderObj.paytype == 1 ||
                  orderObj.paytype == 2 ||
                  orderObj.paytype == 4
                "
                style="width: 17px; height: 17px; margin-left: 4px"
                :src="
                  orderObj.paytype == 1
                    ? require('../../assets/home/wxico.png')
                    : orderObj.paytype == 2
                    ? require('../../assets/home/zhifuico.png')
                    : orderObj.paytype == 4
                    ? require('../../assets/home/icon_jb.png')
                    : ''
                "
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="order-first-logistics"
        @click="logisticsClick"
        v-if="orderObj.status == 3 || orderObj.status == 5"
      >
        物流详情
      </div>
    </div>

    <div class="order-second">
      <div class="order-second-title">订单信息</div>

      <div class="order-second-center">
        <el-table
          :data="tableData"
          border
          style="width: 100%; cursor: pointer"
          :header-cell-style="{
            color: '#333333',
            backgroundColor: '#FAFAFA',
          }"
        >
          <el-table-column label="订单号" width="180">
            {{ orderObj.ordernum }}
          </el-table-column>
          <el-table-column label="支付单号" width="200">
            {{ orderObj.paycode }}
          </el-table-column>
          <el-table-column label="商品信息" width="726">
            <template slot-scope="scope">
              <div class="order-second-center-table">
                <div class="order-second-center-table-left">
                  <img :src="scope.row.image" alt="" />
                </div>
                <div class="order-second-center-table-right">
                  <div class="order-second-center-table-right-title">
                    {{ scope.row.name }}
                  </div>
                  <div class="order-second-center-table-right-text">
                    {{ scope.row.goods_spec_name }}
                    <span style="margin-left: 10px; color: #222222"
                      >x{{ scope.row.num }}</span
                    >
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="商品单价">
            <template slot-scope="scope">{{ scope.row.integral }}积分</template>
          </el-table-column>
          <el-table-column label="商品总价">
            <template slot-scope="scope"
              >{{ scope.row.totalPrice }}积分</template
            >
          </el-table-column>
          <el-table-column label="实付款">
            <template slot-scope="scope"
              >{{ scope.row.realityPrice }}积分</template
            >
          </el-table-column>
        </el-table>
      </div>

      <div class="order-second-bottom">
        <div
          class="order-second-bottom-list"
          v-for="(item, index) in 3"
          :key="index"
        >
          <div class="order-second-bottom-list-title">
            {{
              index == 0
                ? '订单商品总金额'
                : index == 1
                ? '订单商品运费'
                : '实付款'
            }}
          </div>
          <div class="order-second-bottom-list-text">
            {{
              index == 0
                ? orderObj.use_integral
                : index == 1
                ? orderObj.freight
                  ? 0
                  : orderObj.freight
                : orderObj.use_integral
            }}<span v-if="index != 1">积分</span>
            <span v-else>元</span>
          </div>
        </div>
      </div>
    </div>

    <!--物流弹出框-->
    <div class="logistics">
      <el-dialog
        :visible.sync="logisticsDialogVisible"
        style="margin-top: 10vh"
        @close="logisticsClose"
      >
        <span slot="footer" class="dialog-footer">
          <div class="logistics-div">
            <div class="logistics-div-top">
              <div class="logistics-div-top-title">物流详情</div>
              <img
                class="logistics-div-top-img"
                src="../../assets/common/close.png"
                @click="logisticsClose"
              />
            </div>

            <div class="logistics-div-center">
              <div class="logistics-div-center-title">平台备注</div>
              <div
                class="logistics-div-center-text"
                :style="{ color: logisticsObj.break == null ? '#ccc' : '' }"
              >
                {{
                  logisticsObj.break == null ? '暂无备注！' : logisticsObj.break
                }}
              </div>

              <div class="logistics-div-center-block">
                <div class="logistics-div-center-block-left">
                  物流公司：{{ logisticsObj.wuliu_name }}
                </div>
                <div class="logistics-div-center-block-right">
                  物流单号：{{ logisticsObj.wuliu_num }}
                </div>
              </div>

              <div class="logistics-div-center-step">
                <el-steps direction="vertical" :active="1">
                  <el-step
                    v-for="(item, index) in logisticsArray"
                    :title="item.ftime + `---(${item.status})`"
                    :key="index"
                    :description="item.context"
                  ></el-step>
                </el-steps>
              </div>
            </div>

            <div class="logistics-div-bottom">
              <div class="logistics-div-bottom-title" @click="logisticsClose">
                确 定
              </div>
            </div>
          </div>
        </span>
      </el-dialog>
    </div>

    <!--备注弹出框-->
    <div class="remark">
      <el-dialog
        :visible.sync="remarkDialogVisible"
        style="margin-top: 10vh"
        @close="remarkClose"
      >
        <span slot="footer" class="dialog-footer">
          <div class="remark-div">
            <div class="remark-div-top">
              <div class="remark-div-top-title">订单备注</div>
              <img
                class="remark-div-top-img"
                src="../../assets/common/close.png"
                @click="remarkClose"
              />
            </div>

            <div class="remark-div-center">
              <div class="remark-div-center-textarea">
                <el-input
                  type="textarea"
                  placeholder="请填写订单备注信息"
                  v-model="remarkOrdermessage"
                  maxlength=""
                  show-word-limit
                ></el-input>
              </div>

              <div class="remark-div-center-display">
                <el-radio-group v-model="remarkRadio">
                  <el-radio
                    v-for="(item, index) in 5"
                    :key="index"
                    :label="index"
                    ><img
                      class="remark-div-center-display-img"
                      :src="
                        index == 0
                          ? require('../../assets/home/state1.png')
                          : index == 1
                          ? require('../../assets/home/state2.png')
                          : index == 2
                          ? require('../../assets/home/state3.png')
                          : index == 3
                          ? require('../../assets/home/state4.png')
                          : require('../../assets/home/state5.png')
                      "
                      alt=""
                  /></el-radio>
                </el-radio-group>
              </div>
            </div>

            <div class="remark-div-bottom">
              <div class="remark-div-bottom-title" @click="remarkConfirm">
                确 定
              </div>
            </div>
          </div>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getIntegraldetail,
  getAfterlogistics,
  postOrderremark,
} from '../../api/order'

import { getexpressage } from '../../api/common'

import Bus from '../../utils/bus' // bus发送跳转关闭临时组件
export default {
  data() {
    return {
      // 获取订单详情id
      orderId: '',
      // 获取订单详情基本数据对象
      orderObj: {},
      // 获取订单详情 表单存储数组数据
      tableData: [],
      // 物流弹出框 开启
      logisticsDialogVisible: false,
      // 物流弹出框 基本信息对象
      logisticsObj: {},
      // 物流弹出框 二级基本信息路径数组
      logisticsArray: [],
      // 备注弹出框  开启
      remarkDialogVisible: false,
      // 备注弹出框 单选
      remarkRadio: 0,
      // 备注弹出框  备注信息填写
      remarkOrdermessage: '',
      // 监听用户刷新
      loading: false,
    }
  },
  created() {
    // 接收上级id
    this.orderId = this.$route.query.orderId
    this.loading = true
    // 获取订单详情基本数据
    this.getIntegraldetailClick()
  },
  updated() {
    if (this.$route.query.orderId == undefined) {
      Bus.$emit('detele', 'integralOrderdetail')
    }
  },

  methods: {
    // 获取订单详情基本数据
    getIntegraldetailClick() {
      if (this.orderId == undefined) {
        Bus.$emit('detele', 'integralOrderdetail')
        return
      }

      this.tableData = []

      let params = this.orderId

      getIntegraldetail(params).then((res) => {
        if (res.resultStatus == true) {
          this.orderObj = res.resultData
          console.log('查询对象', this.orderObj)
          //   // 数组存储对象
          this.tableData = res.resultData.orderDetailList
          console.log('查询数组', this.tableData)
          this.remarkOrdermessage = res.resultData.oBreak
          // 备注级别
          this.remarkRadio = res.resultData.breakLevel
          this.loading = false
        }
      })
    },

    // 物流模块区域 开启物流弹出框
    logisticsClick() {
      let params = {
        orderId: this.orderId,
      }

      getAfterlogistics(params).then((res) => {
        if (res.resultStatus == true) {
          console.log('获取物流详情', res)
          this.logisticsObj = res.resultData
          this.logisticsInquire()
        }
      })
    },
    // 获取物流详情内部数据进行查询物流
    logisticsInquire() {
      let params = {
        wuliu_code: this.logisticsObj.wuliu_code, // 物流编码
        wuliu_num: this.logisticsObj.wuliu_num, // 物流单号
      }

      getexpressage(params).then((res) => {
        if (res.resultStatus == true) {
          console.log('获取物流具体想起', res)
          this.logisticsArray = res.resultData.data
          this.logisticsDialogVisible = true
        }
      })
    },
    // 物流模块区域 关闭 取消
    logisticsClose() {
      this.logisticsDialogVisible = false
    },

    // 备注旗帜点击
    remarkClick() {
      this.remarkDialogVisible = true
    },
    // 备注旗帜点击
    remarkClose() {
      this.remarkDialogVisible = false
    },
    // 备注弹出框 确定
    remarkConfirm() {
      if (this.remarkOrdermessage == '') {
        this.$message({
          message: '抱歉，必须填写对应的订单备注！',
          type: 'warning',
          duration: 1500,
        })
        return
      }

      let params = {
        orderId: this.orderId, //  订单id
        breakLevel: this.remarkRadio, // 备注级别
        oBreak: this.remarkOrdermessage, // 备注
      }

      postOrderremark(params).then((res) => {
        if (res.resultStatus == true) {
          this.$message({
            message: '填写成功！',
            type: 'success',
            duration: 1500,
          })
          this.remarkDialogVisible = false
        }
      })
    },
  },
}
</script>

  <style lang="less" scoped>
/deep/ .el-input__inner:focus {
  border-color: rgba(217, 217, 217, 1);
}

/deep/ .el-textarea__inner:focus {
  border-color: rgba(217, 217, 217, 1);
}

/deep/ .el-select .el-input.is-focus .el-input__inner {
  border-color: rgba(255, 255, 255, 0);
}

.order {
  .order-first {
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px #edeff7;
    border-radius: 10px;
    padding: 24px;
    box-sizing: border-box;
    .order-first-top {
      display: flex;
      position: relative;
      .order-first-top-list {
        text-align: left;
        margin-right: 70px;
        .order-first-top-list-title {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 600;
          color: #222222;
        }
        .order-first-top-list-time {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 600;
          color: #222222;
          margin: 4px 0 10px;
        }
      }

      .order-first-top-list:last-child {
        margin-right: 0;
      }

      .order-first-top-position {
        position: absolute;
        right: 24px;
        display: flex;
        height: 30px;
        align-items: center;

        .order-first-top-position-img {
          width: 15px;
          height: 16px;
          cursor: pointer;

          img {
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
        }

        .order-first-top-position-text {
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          margin-left: 8px;
        }
      }
    }

    .order-first-center {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
    }

    .order-first-bottom {
      display: flex;
      margin-top: 33px;
      .order-first-bottom-list {
        margin-right: 34px;
        min-width: 160px;
        .order-first-bottom-list-title {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
        }
        .order-first-bottom-list-text {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          margin-top: 4px;
          display: flex;
          align-items: center;

          .order-first-bottom-list-text-span {
            color: #2aa4ff;
            text-decoration: underline;
            cursor: pointer;
            margin-left: 4px;
            display: block;
          }
        }
      }

      .order-first-bottom-list:last-child {
        margin-right: 0;

        .order-first-bottom-list-text {
          width: 400px;
          word-break: break-all;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }

    .order-first-logistics {
      width: 88px;
      height: 36px;
      border-radius: 10px;
      border: 1px solid #36c100;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #36c100;
      text-align: center;
      line-height: 36px;
      cursor: pointer;
      margin-top: 20px;
    }
  }
  .order-second {
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px #edeff7;
    border-radius: 10px;
    padding: 24px;
    box-sizing: border-box;
    margin-top: 24px;
    .order-second-title {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #222222;
    }

    .order-second-center {
      margin-top: 13px;
      /deep/ .el-table thead {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #333333;
        background: #fafafa;
      }

      /deep/ .el-table tr {
        height: 108px;
      }

      .order-second-center-table {
        display: flex;
        align-items: center;

        .order-second-center-table-left {
          width: 70px;
          height: 70px;

          img {
            width: 70px;
            height: 70px;
          }
        }
        .order-second-center-table-right {
          margin-left: 10px;

          .order-second-center-table-right-title {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #555555;
            line-height: 22px;
            height: 44px;
            word-break: break-all;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .order-second-center-table-right-text {
            margin-top: 5px;
          }
        }
      }
    }

    .order-second-bottom {
      margin-top: 22px;
      display: flex;
      .order-second-bottom-list {
        margin-right: 110px;
        .order-second-bottom-list-title {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
        }
        .order-second-bottom-list-text {
          font-size: 20px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 600;
          color: #222222;
          margin-top: 5px;
        }
      }

      .order-second-bottom-list:last-child {
        margin-right: 0;
      }
    }
  }

  // 物流查询
  .logistics {
    /deep/ .el-dialog {
      width: 444px;
      height: 390px;
      background: #ffffff;
      box-shadow: 0px 12px 48px 16px rrgba(134, 77, 77, 0.03) 0px 9px 28px 0px
          rgba(0, 0, 0, 0.05),
        0px 6px 16px -8px rgba(0, 0, 0, 0.08);
      border-radius: 10px;
    }

    /deep/ .el-dialog__footer {
      padding: 0;
      text-align: left;
    }

    .logistics-div {
      .logistics-div-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 56px;
        padding: 0 24px;
        box-sizing: border-box;
        border-bottom: 1px solid #d9d9d9;
        .logistics-div-top-title {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 600;
          color: #222222;
        }

        .logistics-div-top-img {
          width: 10px;
          height: 10px;
        }
      }
      .logistics-div-center {
        padding: 20px 24px 24px;
        box-sizing: border-box;
        .logistics-div-center-title {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
        }
        .logistics-div-center-text {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          margin-top: 4px;
        }
        .logistics-div-center-block {
          display: flex;
          height: 30px;
          background: #a9b8cc;
          width: 100%;
          margin-top: 14px;
          justify-content: space-between;
          align-items: center;
          padding: 0 11px;
          box-sizing: border-box;
          .logistics-div-center-block-left,
          .logistics-div-center-block-right {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
          }
        }
        .logistics-div-center-step {
          height: 152px;
          background: #ffffff;
          border-radius: 0px 0px 5px 5px;
          border: 1px solid #e9edf4;
          overflow: auto;

          /deep/ .el-step__icon-inner {
            display: none;
          }
          /deep/ .el-step__icon {
            width: 10px !important;
            height: 10px !important;
          }

          /deep/ .el-step.is-vertical .el-step__line {
            left: 9px !important;
          }

          /deep/ .el-step.is-vertical .el-step__head {
            padding: 0 5px;
          }
        }
      }

      .logistics-div-bottom {
        display: flex;
        height: 52px;
        align-items: center;
        justify-content: flex-end;
        padding: 0 16px;
        box-sizing: border-box;
        border-top: 1px solid #d9d9d9;

        .logistics-div-bottom-title {
          width: 65px;
          height: 32px;
          background: linear-gradient(135deg, #36c53d 0%, #3fd747 100%);
          border-radius: 10px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          text-align: center;
          line-height: 32px;
          cursor: pointer;
        }
      }
    }
  }
  // 备注弹出框
  .remark {
    /deep/ .el-dialog {
      width: 444px;
      height: 340px;
      background: #ffffff;
      box-shadow: 0px 12px 48px 16px rrgba(134, 77, 77, 0.03) 0px 9px 28px 0px
          rgba(0, 0, 0, 0.05),
        0px 6px 16px -8px rgba(0, 0, 0, 0.08);
      border-radius: 10px;
    }

    /deep/ .el-dialog__footer {
      padding: 0;
      text-align: left;
    }

    .remark-div {
      .remark-div-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 56px;
        padding: 0 24px;
        box-sizing: border-box;
        border-bottom: 1px solid #d9d9d9;
        .remark-div-top-title {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 600;
          color: #222222;
        }

        .remark-div-top-img {
          width: 10px;
          height: 10px;
        }
      }
      .remark-div-center {
        margin: 0 24px;
        margin-top: 21px;
        .remark-div-center-textarea {
          height: 152px;
          background: #ffffff;
          border-radius: 5px;

          /deep/ .el-textarea {
            height: 152px;
            cursor: pointer;
          }

          /deep/ .el-textarea__inner {
            height: 152px;
            cursor: pointer;
            padding: 10px 10px 20px;
          }

          /deep/ .el-textarea .el-textarea__inner {
            // 然后找到对应的类名，在这里将拉伸去掉即可
            resize: none;
          }
        }

        .remark-div-center-display {
          margin-top: 11px;
          .remark-div-center-display-img {
            width: 15px;
            height: 16px;
            margin-left: 8px;
          }

          /deep/ .el-radio__label {
            padding-left: 0;
          }

          /deep/ .el-radio-group {
            font-size: 0;
            display: flex;
            align-items: center;
            justify-content: space-around;
          }

          /deep/ .el-radio__input {
            vertical-align: revert;
          }
        }
      }

      .remark-div-bottom {
        display: flex;
        height: 52px;
        align-items: center;
        justify-content: flex-end;
        padding: 0 16px;
        box-sizing: border-box;
        border-top: 1px solid #d9d9d9;
        margin-top: 32px;

        .remark-div-bottom-title {
          width: 65px;
          height: 32px;
          background: linear-gradient(135deg, #36c53d 0%, #3fd747 100%);
          border-radius: 10px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          text-align: center;
          line-height: 32px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
