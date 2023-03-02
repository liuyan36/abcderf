<template>
  <div class="sale" v-loading="loading">
    <div class="sale-first">
      <div class="sale-first-top">
        <div class="sale-first-top-title">买家信息</div>
      </div>
      <div class="sale-first-center">
        <div
          class="sale-first-center-list"
          v-for="(item, index) in 11"
          :key="index"
        >
          <div class="sale-first-center-list-title">
            {{
              index == 0
                ? '用户id'
                : index == 1
                ? '用户名称'
                : index == 2
                ? '用户电话'
                : index == 3
                ? '订单号'
                : index == 4
                ? '收件人'
                : index == 5
                ? '订单类型'
                : index == 6
                ? '收件人电话'
                : index == 7
                ? '支付方式'
                : index == 8
                ? '支付订单'
                : index == 9
                ? '售后申请时间'
                : '收件人地址'
            }}
          </div>
          <div class="sale-first-center-list-text">
            {{
              index == 0
                ? afterObj.userId
                : index == 1
                ? afterObj.userName
                : index == 2
                ? afterObj.userPhone
                : index == 3
                ? afterObj.ordernum
                : index == 4
                ? afterObj.name
                : index == 5
                ? afterObj.activityStatus == 0
                  ? '普通订单'
                  : afterObj.activityStatus == 10
                  ? 'VIP订单'
                  : afterObj.activityStatus == 30
                  ? '每日爆款'
                  : afterObj.activityStatus == 40
                  ? '限时秒杀'
                  : afterObj.activityStatus == 50
                  ? '福利订单'
                  : ''
                : index == 6
                ? afterObj.phone
                : index == 7
                ? afterObj.paytype == 1
                  ? '微信支付'
                  : afterObj.paytype == 2
                  ? '支付宝支付'
                  : afterObj.paytype == 3
                  ? '立减券抵扣'
                  : afterObj.paytype == 4
                  ? '积分支付'
                  : ''
                : index == 8
                ? afterObj.paycode
                : index == 9
                ? afterObj.shouhouTime
                : afterObj.address
            }}

            <img
              v-if="index == 7"
              :src="
                afterObj.paytype == 1
                  ? require('../../assets/home/wxico.png')
                  : afterObj.paytype == 2
                  ? require('../../assets/home/zhifuico.png')
                  : ''
              "
              alt=""
            />
          </div>
        </div>
      </div>

      <div class="sale-first-bottom" @click="logisticsClick">物流详情</div>
    </div>

    <div class="sale-second">
      <div class="sale-second-top">商品信息</div>
      <div class="sale-second-display">
        <div class="sale-second-display-left">
          <img :src="afterObj.goodimage" alt="" />
        </div>
        <div class="sale-second-display-right">
          <div class="sale-second-display-right-title">
            {{ afterObj.goodname }}
          </div>
          <div class="sale-second-display-right-num">
            {{ afterObj.goods_spec_name
            }}<span style="margin-left: 17px; color: #222222; font-weight: 600"
              >x{{ afterObj.goodnum }}</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="sale-thirdly">
      <div class="sale-thirdly-top">售后明细</div>

      <div
        class="sale-thirdly-center"
        v-if="afterrecordObj.schedule != 'COMPELETE' && afterShow == true"
      >
        <div
          class="sale-thirdly-center-list"
          v-for="(item, index) in 4"
          :key="index"
        >
          <div class="sale-thirdly-center-list-title">
            {{
              index == 0
                ? '售后类型'
                : index == 1
                ? '商品实付金额'
                : index == 2
                ? '买家仅退款原因'
                : index == 3
                ? '买家发起时间'
                : ''
            }}
          </div>
          <div class="sale-thirdly-center-list-text">
            {{
              index == 0
                ? afterrecordObj.return_type == 'MONEY'
                  ? '仅退款'
                  : afterrecordObj.return_type == 'HAM'
                  ? '退货退款'
                  : afterrecordObj.return_type == 'EXCHANE'
                  ? '换货'
                  : ''
                : index == 1
                ? Number(afterObj.realityPrice) +
                  Number(afterObj.realityFreight) +
                  '' +
                  `(含¥${afterObj.realityFreight}运费)`
                : index == 2
                ? afterrecordObj.break
                : index == 3
                ? afterrecordObj.createTime
                : ''
            }}
          </div>
        </div>

        <!-- 退货退款流程 -->
        <div
          class="sale-thirdly-center"
          v-if="afterrecordObj.return_type == 'HAM'"
        >
          <div
            class="sale-thirdly-center-list"
            v-for="(item, num) in 3"
            :key="num"
          >
            <div class="sale-thirdly-center-list-title">
              {{
                num == 0
                  ? '平台处理'
                  : num == 1
                  ? '处理时间'
                  : num == 2
                  ? '用户寄回单号'
                  : ''
              }}
            </div>
            <div
              class="sale-thirdly-center-list-text"
              :style="{
                color:
                  num == 0 && afterrecordObj.shouhou_status == 1
                    ? '#36C100'
                    : '',
              }"
            >
              {{
                num == 0
                  ? afterrecordObj.shouhou_status == 0
                    ? '平台未处理'
                    : afterrecordObj.shouhou_status == 1
                    ? '已同意申请'
                    : afterrecordObj.shouhou_status == 2
                    ? '已拒绝申请'
                    : ''
                  : num == 1
                  ? afterrecordObj.updateTime
                  : num == 2
                  ? afterrecordObj.shouhou_wuliu_no
                  : ''
              }}

              <span v-if="num == 2" style="color: #2aa4ff; cursor: pointer"
                >用户修改记录</span
              >
            </div>
          </div>
        </div>
      </div>

      <!--退货退款-->
      <div v-if="afterrecordObj.return_type == 'HAM'">
        <div
          class="sale-thirdly-amount"
          v-if="afterrecordObj.return_type == 'HAM'"
        >
          <div class="sale-thirdly-amount-title">买家提供凭证</div>
          <img
            class="sale-thirdly-amount-img"
            v-for="(item, index) in afterrecordObj.image"
            :key="index"
            :src="item"
          />
        </div>

        <div
          class="sale-thirdly-bottom"
          v-if="
            afterrecordObj.return_type == 'HAM' &&
            afterrecordObj.shouhou_status != 1
          "
        >
          <div class="sale-thirdly-bottom-left" @click="refuseFefund">
            拒绝申请
          </div>
          <div class="sale-thirdly-bottom-right" @click="consentApply">
            同意申请
          </div>
        </div>

        <div
          class="sale-thirdly-amount"
          v-if="afterrecordObj.schedule == 'RETERUN'"
        >
          <div class="sale-thirdly-amount-title">退款金额(元)</div>
          <div class="sale-thirdly-amount-input">
            <el-input
              v-model="afterRefundamount"
              placeholder="请输入金额"
              class="inputmoneys"
              clearable
            ></el-input>
          </div>
        </div>

        <div
          class="sale-thirdly-bottom"
          v-if="afterrecordObj.schedule == 'RETERUN'"
        >
          <div class="sale-thirdly-bottom-left" @click="refuseFefund">
            拒绝退款
          </div>
          <div class="sale-thirdly-bottom-right" @click="consentFefund">
            同意退款
          </div>
        </div>
      </div>
      <!--完毕-->

      <!--仅退款-->
      <div v-else>
        <div
          class="sale-thirdly-amount"
          v-if="
            afterrecordObj.return_type == 'MONEY' &&
            afterrecordObj.schedule == 'WITH'
          "
        >
          <div class="sale-thirdly-amount-title">退款金额(元)</div>
          <div class="sale-thirdly-amount-input">
            <el-input
              v-model="afterRefundamount"
              placeholder="请输入金额"
              class="inputmoneys"
              clearable
            ></el-input>
          </div>
        </div>

        <div
          class="sale-thirdly-bottom"
          v-if="
            afterrecordObj.return_type == 'MONEY' &&
            afterrecordObj.schedule == 'WITH'
          "
        >
          <div class="sale-thirdly-bottom-left" @click="refuseFefund">
            拒绝退款
          </div>
          <div class="sale-thirdly-bottom-right" @click="consentFefund">
            同意退款
          </div>
        </div>
      </div>

      <div class="sale-thirdly-negotiate" v-if="afterrecordArray.length > 0">
        <div
          class="sale-thirdly-negotiate-block"
          v-for="(info, num) in afterrecordArray"
          :key="num"
        >
          <div class="sale-thirdly-negotiate-div">
            <div
              class="sale-thirdly-negotiate-div-list"
              v-for="(item, index) in 7"
              :key="index"
            >
              <div class="sale-thirdly-negotiate-div-list-title">
                {{
                  index == 0
                    ? '售后类型'
                    : index == 1
                    ? '商品实付金额'
                    : index == 2
                    ? `买家${
                        info.return_type == 'MONEY'
                          ? '仅退款'
                          : info.return_type == 'HAM'
                          ? '退货退款'
                          : info.return_type == 'EXCHANE'
                          ? '换货'
                          : ''
                      }原因`
                    : index == 3
                    ? '买家发起时间'
                    : index == 4
                    ? '平台处理'
                    : index == 5
                    ? '处理时间'
                    : index == 6
                    ? '操作人'
                    : ''
                }}
              </div>
              <div
                class="sale-thirdly-negotiate-div-list-text"
                :style="{
                  color:
                    index == 4 && info.shouhou_status == 1
                      ? '#36C100'
                      : index == 4 && info.shouhou_status == 2
                      ? '#FF4133'
                      : '',
                }"
              >
                {{
                  index == 0
                    ? info.return_type == 'MONEY'
                      ? '仅退款'
                      : info.return_type == 'HAM'
                      ? '退货退款'
                      : info.return_type == 'EXCHANE'
                      ? '换货'
                      : ''
                    : index == 1
                    ? Number(afterObj.realityPrice) +
                      Number(afterObj.realityFreight) +
                      '' +
                      `(含¥${afterObj.realityFreight}运费)`
                    : index == 2
                    ? info.break
                    : index == 3
                    ? info.createTime
                    : index == 4
                    ? info.shouhou_status == 0
                      ? '平台未处理'
                      : info.shouhou_status == 1
                      ? '已同意退款'
                      : info.shouhou_status == 2
                      ? '已拒绝申请'
                      : ''
                    : index == 5
                    ? info.updateTime
                    : index == 6
                    ? info.adminName
                    : ''
                }}
              </div>
            </div>

            <div
              class="sale-thirdly-negotiate-div-list"
              v-if="info.shouhou_status == 1"
            >
              <div class="sale-thirdly-negotiate-div-list-title">退款金额</div>
              <div class="sale-thirdly-negotiate-div-list-text">
                ¥{{ info.return_price }}
              </div>
            </div>

            <div
              class="sale-thirdly-negotiate-div-position"
              v-if="info.shouhou_status == 1"
            >
              <img src="../../assets/sale/remark.png" alt="" />
            </div>
          </div>
          <div
            class="sale-thirdly-negotiate-div"
            style="margin-top: 23px"
            v-if="info.shouhou_status == 1"
          >
            <div class="sale-thirdly-negotiate-div-list" style="width: 100%">
              <div class="sale-thirdly-negotiate-div-list-title">订单状态</div>
              <div class="sale-thirdly-negotiate-div-list-text">
                {{
                  afterObj.is_shouhou == 0
                    ? '未售后'
                    : afterObj.is_shouhou == 1
                    ? '已申请售后'
                    : afterObj.is_shouhou == 2
                    ? '已售后'
                    : afterObj.is_shouhou == 3
                    ? '已拒绝'
                    : ''
                }}
              </div>
            </div>
          </div>
          <div
            class="sale-thirdly-negotiate-div"
            style="margin-top: 23px"
            v-if="info.return_type == 'HAM'"
          >
            <div class="sale-thirdly-negotiate-div-list" style="width: 100%">
              <div class="sale-thirdly-negotiate-div-list-title">
                买家提供凭证
              </div>
              <img
                class="sale-thirdly-negotiate-div-list-img"
                v-for="(item, index) in info.image"
                :key="index"
                :src="item"
              />
            </div>
          </div>
          <div
            class="sale-thirdly-negotiate-div"
            style="margin-top: 23px"
            v-if="info.shouhou_status != 1"
          >
            <div class="sale-thirdly-negotiate-div-list" style="width: 100%">
              <div class="sale-thirdly-negotiate-div-list-title">拒绝理由</div>
              <div class="sale-thirdly-negotiate-div-list-text">
                {{ info.service_break }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 拒绝理由一级弹出框 -->
    <div class="reasons">
      <el-dialog
        :visible.sync="reasonsDialogVisible"
        style="margin-top: 10vh"
        @close="reasonsReset"
      >
        <span slot="footer" class="dialog-footer">
          <div class="reasons-div">
            <div class="reasons-div-top">
              <div class="reasons-div-top-title">拒绝理由</div>
              <img
                class="reasons-div-top-img"
                src="../../assets/common/close.png"
                @click="reasonsReset"
              />
            </div>

            <div class="reasons-div-center">
              <el-input
                type="textarea"
                rows="6"
                placeholder="请输入拒绝理由"
                v-model="reasonsText"
                maxlength="200"
                show-word-limit
              ></el-input>
            </div>

            <div class="reasons-div-bottom">
              <div
                class="reasons-div-bottom-title"
                @click="reasonsStairConfirm"
              >
                确 定
              </div>
            </div>
          </div>
        </span>
      </el-dialog>
    </div>

    <!--拒绝理由二级确定-->
    <div class="reasonsConfirm">
      <el-dialog
        :visible.sync="reasonsConfirmDialogVisible"
        width="394px"
        style="margin-top: 10vh"
        @close="reasonsConfirm"
      >
        <span slot="footer" class="dialog-footer">
          <div class="reasonsConfirm-div">
            <img
              class="reasonsConfirm-div-img"
              src="../../assets/common/common-warning.png"
            />
            <div class="reasonsConfirm-div-title">是否确定该拒绝理由</div>
            <div class="reasonsConfirm-div-text">
              一旦确定后，则拒绝该用户售后，为了引起不必要的纠纷，请谨慎处理。
            </div>
            <div class="reasonsConfirm-div-button">
              <div
                class="reasonsConfirm-div-button-left"
                @click="confirmReasons"
              >
                确定
              </div>
              <div
                class="reasonsConfirm-div-button-right"
                @click="reasonsConfirm"
              >
                取消
              </div>
            </div>
          </div>
        </span>
      </el-dialog>
    </div>

    <!-- 用户退款弹出框确定-->
    <div class="amountConfirm">
      <el-dialog
        :visible.sync="amountConfirmDialogVisible"
        width="394px"
        style="margin-top: 10vh"
        @close="amountConfirmClose"
      >
        <span slot="footer" class="dialog-footer">
          <div class="amountConfirm-div">
            <img
              class="amountConfirm-div-img"
              src="../../assets/common/common-warning.png"
            />
            <div class="amountConfirm-div-title">是否将此订单同意退款？</div>
            <div class="amountConfirm-div-text">
              一旦同意则不能更改，退款金额将原渠道返回用户账户。售后订单也自动跳转为“已售后订单”！
            </div>
            <div class="amountConfirm-div-button">
              <div
                class="amountConfirm-div-button-left"
                @click="confirmReasonsClick"
              >
                确定
              </div>
              <div
                class="amountConfirm-div-button-right"
                @click="amountConfirmClose"
              >
                取消
              </div>
            </div>
          </div>
        </span>
      </el-dialog>
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
  </div>
</template>

<script>
import {
  getAfterdetail,
  postAfterrefund,
  postAfteragressd,
  getAfterlogistics,
  postAfterrechanging,
} from '../../api/order'

import { getexpressage } from '../../api/common'

import Bus from '../../utils/bus' // bus发送跳转关闭临时组件

export default {
  data() {
    return {
      // 获取售后详情id
      afterId: '',
      // 不管是退货退款还是仅退款都需要手动填写对应退款金额
      afterRefundamount: '',
      // 获取售后记录第一条对象
      afterrecordObj: {},
      // 获取售后记录除开第一条对象数组
      afterrecordArray: [],
      // 存储售后订单详情对象
      afterObj: {},
      // 用户如果第一条记录是 COMPELETE则true 否则是 false
      afterShow: false,
      // 拒绝理由一级弹出框开启
      reasonsDialogVisible: false,
      // 拒绝理由一级弹出框内文本输入
      reasonsText: '',
      // 拒绝理由二级弹出框确定
      reasonsConfirmDialogVisible: false,
      // 同意退款 弹出框
      amountConfirmDialogVisible: false,
      // 物流弹出框 开启
      logisticsDialogVisible: false,
      // 物流弹出框 基本信息对象
      logisticsObj: {},
      // 物流弹出框 二级基本信息路径数组
      logisticsArray: [],
      // 退货退款中点击同意申请 出现
      consentApplyFalse: false,
      // 监听用户刷新
      loading: false,
    }
  },

  created() {
    this.afterId = this.$route.query.orderId
    this.loading = true
    // 获取售后详情
    this.afterDetailget()
  },

  updated() {
    if (this.$route.query.orderId == undefined) {
      Bus.$emit('detele', 'afterSaledetail')
    }
  },
  methods: {
    // 获取售后订单详情
    afterDetailget() {
      this.afterObj = {}
      this.afterrecordObj = {}
      this.afterrecordArray = []

      if (this.afterId == undefined) {
        Bus.$emit('detele', 'afterSaledetail')
        return
      }

      let params = this.afterId
      getAfterdetail(params).then((res) => {
        console.log('获取售后详情', res)
        if (res.resultStatus == true) {
          this.afterObj = res.resultData // 售后详情对象

          if (res.resultData.orderReturn[0].schedule != 'COMPELETE') {
            // 获取当前申请记录中第一条
            this.afterrecordObj = res.resultData.orderReturn.shift()
            // 获取当前申请记录中除开第一条数组  协商历史记录
            this.afterrecordArray = res.resultData.orderReturn
            this.afterShow = true
          } else {
            this.afterrecordArray = res.resultData.orderReturn
            this.afterShow = false
          }

          console.log('是否有数据', this.afterrecordArray)

          this.loading = false
        }
      })
    },

    // 拒绝退款
    refuseFefund() {
      this.reasonsDialogVisible = true
    },
    // 同意退款 弹出框开启
    consentFefund() {
      if (this.afterRefundamount == '') {
        this.$message({
          message: '抱歉，退款必须填写对应的商品金额',
          type: 'warning',
          duration: 1500,
        })
        return
      }
      console.log('用户点击同意退款')
      this.amountConfirmDialogVisible = true
    },

    // 同意退款 弹出框确定
    confirmReasonsClick() {
      console.log('二级弹出框确定')

      let params = {
        sjtkprice: this.afterRefundamount, // 退款金额
        orderreturn_id: this.afterrecordObj.id, // 售后记录id
      }

      postAfteragressd(params).then((res) => {
        if (res.resultStatus == true) {
          this.$message({
            message: '同意退款！',
            type: 'success',
          })
          this.loading = true
          // 获取售后详情
          this.afterDetailget()
          this.amountConfirmDialogVisible = false
        }
      })
    },

    // 同意退款 弹出框关闭
    amountConfirmClose() {
      this.amountConfirmDialogVisible = false
    },

    //  关闭弹出框
    reasonsReset() {
      this.reasonsDialogVisible = false
    },
    // 拒绝理由一级弹出框
    reasonsStairConfirm() {
      console.log('一级点击确定')
      if (this.reasonsText == '') {
        this.$message({
          message: '抱歉，拒绝理由必须填写才可拒绝该售后！',
          type: 'warning',
          duration: 1500,
        })

        return
      }

      this.reasonsConfirmDialogVisible = true
    },

    // 拒绝理由二级弹出框 确定
    confirmReasons() {
      let params = {
        service_image: '', // 驳回凭证 多图片;隔开
        service_break: this.reasonsText, // 驳回备注
        orderreturn_id: this.afterrecordObj.id, // 售后记录id
      }

      postAfterrefund(params).then((res) => {
        if (res.resultStatus == true) {
          this.$message({
            message: '拒绝成功！',
            type: 'success',
          })
          this.loading = true
          // 获取售后详情
          this.afterDetailget()
          this.reasonsDialogVisible = false
          this.reasonsConfirmDialogVisible = false
        }
      })
    },
    // 拒绝理由二级弹出框 关闭 取消
    reasonsConfirm() {
      this.reasonsConfirmDialogVisible = false
    },

    // 物流模块区域 开启物流弹出框
    logisticsClick() {
      let params = {
        orderId: this.afterObj.order_id,
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

    // 同意申请  出现输入金额
    consentApply() {
      let params = {
        orderreturn_id: this.afterrecordObj.id, // 售后记录id
      }

      postAfterrechanging(params).then((res) => {
        if (res.resultStatus == true) {
          this.loading = true
          this.afterDetailget()
          // this.consentApplyFalse = true
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
.sale {
  .sale-first {
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px #edeff7;
    border-radius: 10px;
    padding: 24px;
    box-sizing: border-box;

    .sale-first-top {
      .sale-first-top-title {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #222222;
      }
    }
    .sale-first-center {
      margin-top: 29px;
      display: flex;
      flex-wrap: wrap;

      .sale-first-center-list {
        width: 160px;
        margin-right: 34px;
        margin-bottom: 25px;
        .sale-first-center-list-title {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sale-first-center-list-text {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #222222;
          margin-top: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: flex;
          align-items: center;

          img {
            width: 17px;
            height: 17px;
            margin-left: 5px;
          }
        }
      }

      .sale-first-center-list:last-child {
        width: 400px;
        margin-right: 0;
      }
    }

    .sale-first-bottom {
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
    }
  }
  .sale-second {
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px #edeff7;
    border-radius: 10px;
    margin-top: 24px;
    padding: 24px;
    box-sizing: border-box;
    .sale-second-top {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #222222;
    }
    .sale-second-display {
      margin-top: 24px;
      display: flex;
      align-items: center;

      .sale-second-display-left {
        width: 70px;
        height: 70px;
        border: 1px solid #ccc;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .sale-second-display-right {
        margin-left: 12px;
        .sale-second-display-right-title {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #555555;
        }
        .sale-second-display-right-num {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #555555;
          margin-top: 9px;
        }
      }
    }
  }
  .sale-thirdly {
    padding: 24px;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px #edeff7;
    border-radius: 10px;
    margin-top: 24px;
    .sale-thirdly-top {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #222222;
      margin-bottom: 27px;
    }
    .sale-thirdly-center {
      display: flex;
      .sale-thirdly-center-list {
        width: 160px;
        margin-right: 34px;
        .sale-thirdly-center-list-title {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
        }
        .sale-thirdly-center-list-text {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          margin-top: 8px;
        }
      }
      .sale-thirdly-center-list:last-child {
        margin-right: 0;
        width: 200px;
      }
    }

    .sale-thirdly-amount {
      margin-top: 22px;
      .sale-thirdly-amount-title {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
      }
      .sale-thirdly-amount-input {
        margin-top: 4px;
        width: 168px;
        height: 32px;
        /deep/ .el-input {
          height: 32px;
        }

        /deep/ .el-input__inner {
          padding: 0 10px;
          box-sizing: border-box;
          height: 32px;
          background-color: rgba(255, 255, 255, 0);
        }
      }

      .sale-thirdly-amount-img {
        width: 64px;
        height: 64px;
        border-radius: 5px;
        margin-top: 4px;
        margin-right: 17px;
      }
    }
    .sale-thirdly-bottom {
      display: flex;
      margin-top: 25px;

      .sale-thirdly-bottom-left,
      .sale-thirdly-bottom-right {
        width: 88px;
        height: 32px;
        background: #ffffff;
        border-radius: 10px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.65);
        text-align: center;
        line-height: 32px;
        cursor: pointer;
      }
      .sale-thirdly-bottom-right {
        background: linear-gradient(135deg, #36c53d 0%, #3fd747 100%);
        color: #ffffff;
        margin-left: 24px;
        border: 0px solid rgba(0, 0, 0, 0.15);
      }
    }
    .sale-thirdly-negotiate {
      margin-top: 30px;

      .sale-thirdly-negotiate-block {
        padding: 25px 0;
        box-sizing: border-box;
        border-top: 1px solid #e9edf4;
        position: relative;
        .sale-thirdly-negotiate-div {
          display: flex;

          .sale-thirdly-negotiate-div-list {
            width: 160px;
            margin-right: 34px;
            .sale-thirdly-negotiate-div-list-title {
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
            }
            .sale-thirdly-negotiate-div-list-text {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #333333;
              margin-top: 8px;
            }

            .sale-thirdly-negotiate-div-list-img {
              width: 64px;
              height: 64px;
              border-radius: 5px;
              margin-right: 16px;
            }
          }

          .sale-thirdly-negotiate-div-position {
            position: absolute;
            width: 100px;
            height: 100px;
            right: 100px;
            display: flex;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
  // 拒绝理由一级弹出框
  .reasons {
    /deep/ .el-dialog {
      width: 444px;
      height: 295px;
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
    .reasons-div {
      .reasons-div-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 56px;
        padding: 0 24px;
        box-sizing: border-box;
        border-bottom: 1px solid #d9d9d9;
        .reasons-div-top-title {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 600;
          color: #222222;
        }

        .reasons-div-top-img {
          width: 10px;
          height: 10px;
        }
      }

      .reasons-div-center {
        padding: 24px;
        box-sizing: border-box;
        border-bottom: 1px solid #e9edf4;

        /deep/ .el-textarea .el-textarea__inner {
          // 然后找到对应的类名，在这里将拉伸去掉即可
          resize: none;
        }
      }

      .reasons-div-bottom {
        display: flex;
        height: 52px;
        align-items: center;
        justify-content: flex-end;
        padding: 0 16px;
        box-sizing: border-box;

        .reasons-div-bottom-title {
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
  // 拒绝理由二级确认
  .reasonsConfirm {
    /deep/ .el-dialog {
      width: 394px;
      height: 248px;
    }

    /deep/ .el-dialog__footer {
      padding: 25px 0;
      box-sizing: border-box;
    }

    .reasonsConfirm-div {
      width: 100%;
      text-align: center;
      .reasonsConfirm-div-img {
        width: 56px;
        height: 56px;
        margin: 0 auto;
      }

      .reasonsConfirm-div-title {
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.85);
        margin-top: 8px;
      }

      .reasonsConfirm-div-text {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.45);
        line-height: 20px;
        text-align: center;
        margin: 0 38px;
      }

      .reasonsConfirm-div-button {
        display: flex;
        justify-content: center;
        align-content: center;
        margin-top: 40px;

        .reasonsConfirm-div-button-left,
        .reasonsConfirm-div-button-right {
          width: 88px;
          height: 32px;
          background: linear-gradient(135deg, #36c53d 0%, #3fd747 100%);
          border-radius: 10px;
          text-align: center;
          line-height: 32px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          cursor: pointer;
        }

        .reasonsConfirm-div-button-right {
          margin-left: 8px;
          border: 1px solid #e9edf4;
          color: rgba(0, 0, 0, 0.65);
          background: #ffffff;
        }
      }
    }
  }
  // 同意退款确定
  .amountConfirm {
    /deep/ .el-dialog {
      width: 394px;
      height: 248px;
    }

    /deep/ .el-dialog__footer {
      padding: 25px 0;
      box-sizing: border-box;
    }

    .amountConfirm-div {
      width: 100%;
      text-align: center;
      .amountConfirm-div-img {
        width: 56px;
        height: 56px;
        margin: 0 auto;
      }

      .amountConfirm-div-title {
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.85);
        margin-top: 8px;
      }

      .amountConfirm-div-text {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.45);
        line-height: 20px;
        text-align: center;
        margin: 0 38px;
      }

      .amountConfirm-div-button {
        display: flex;
        justify-content: center;
        align-content: center;
        margin-top: 20px;

        .amountConfirm-div-button-left,
        .amountConfirm-div-button-right {
          width: 88px;
          height: 32px;
          background: linear-gradient(135deg, #36c53d 0%, #3fd747 100%);
          border-radius: 10px;
          text-align: center;
          line-height: 32px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          cursor: pointer;
        }

        .amountConfirm-div-button-right {
          margin-left: 8px;
          border: 1px solid #e9edf4;
          color: rgba(0, 0, 0, 0.65);
          background: #ffffff;
        }
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
}
</style>
