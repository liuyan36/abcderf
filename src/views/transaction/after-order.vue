<template>
  <div class="after" v-loading="loading">
    <div class="after-first">
      <div class="after-first-top">
        <div
          class="top-list"
          v-for="(item, index) in afterTitleList"
          :key="index"
          :class="{ active: afterTitleIndex == index }"
          @click="titleBtn(index)"
        >
          <div class="top-list-title">{{ item }}</div>
          <div class="top-list-lint" v-if="afterTitleIndex == index"></div>
        </div>
      </div>

      <div class="after-first-center">
        <div class="first-center-list" v-for="(item, index) in 8" :key="index">
          <div class="first-center-list-title">
            {{
              index == 0
                ? '用户id'
                : index == 1
                ? '用户名称'
                : index == 2
                ? '用户电话'
                : index == 3
                ? '供应商名称'
                : index == 4
                ? '物流单号'
                : index == 5
                ? '订单号'
                : index == 6
                ? '收件人'
                : '收件人电话'
            }}
          </div>

          <div class="first-center-list-input">
            <el-input
              v-if="index == 0"
              placeholder="请输入用户id"
              v-model="afterUserid"
              clearable
            ></el-input>
            <el-input
              v-if="index == 1"
              placeholder="请输入用户名称"
              v-model="afterUsername"
              clearable
            ></el-input>
            <el-input
              v-if="index == 2"
              placeholder="请输入用户电话"
              v-model="afterUserphone"
              clearable
            ></el-input>
            <el-input
              v-if="index == 3"
              placeholder="请输入供应商名称"
              v-model="afterSuppliername"
              clearable
            ></el-input>
            <el-input
              v-if="index == 4"
              placeholder="请输入物流单号"
              v-model="afterLogistics"
              clearable
            ></el-input>
            <el-input
              v-if="index == 5"
              placeholder="请输入订单号"
              v-model="afterOrdernum"
              clearable
            ></el-input>
            <el-input
              v-if="index == 6"
              placeholder="请输入收件人"
              v-model="afterRecipients"
              clearable
            ></el-input>
            <el-input
              v-if="index == 7"
              placeholder="请输入收件人电话"
              v-model="afterRecipientsphone"
              clearable
            ></el-input>
            <!-- <el-date-picker
                v-if="index == 4"
                value-format="yyyy-MM-dd"
                v-model="supplierabortTime"
                type="daterange"
                range-separator
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div> -->
          </div>
        </div>
      </div>

      <div class="after-first-center">
        <div class="first-center-list" v-for="(item, index) in 6" :key="index">
          <div class="first-center-list-title">
            {{
              index == 0
                ? '收货地址'
                : index == 1
                ? '售后状态'
                : index == 2
                ? '支付方式'
                : index == 3
                ? '支付单号'
                : index == 4
                ? '订单创建时间'
                : index == 5
                ? '订单支付时间'
                : ''
            }}
          </div>

          <div class="first-center-list-input">
            <el-input
              v-if="index == 0"
              placeholder="请输入收货地址"
              v-model="afterTake"
              clearable
            ></el-input>

            <el-select
              v-if="index == 1"
              v-model="afterOrderstatusType"
              clearable
              placeholder="请选择"
              :disabled="afterOrderstatusDisabled"
            >
              <el-option
                v-for="item in afterOrderstatusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>

            <el-select
              v-if="index == 2"
              v-model="afterPaymentType"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in afterPaymentList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>

            <el-input
              v-if="index == 3"
              placeholder="请输入支付单号"
              v-model="afterPaymentNum"
              clearable
            ></el-input>

            <el-date-picker
              v-if="index == 4"
              value-format="yyyy-MM-dd"
              v-model="afterEstablishtime"
              type="daterange"
              range-separator
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <el-date-picker
              v-if="index == 5"
              value-format="yyyy-MM-dd"
              v-model="afterPaymentTime"
              type="daterange"
              range-separator
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </div>
      </div>

      <div class="after-first-center">
        <div class="first-center-list" v-for="(item, index) in 2" :key="index">
          <div class="first-center-list-title">
            {{ index == 0 ? '寄回单号' : '订单类型' }}
          </div>

          <div class="first-center-list-input">
            <el-input
              v-if="index == 0"
              placeholder="请输入物流单号"
              v-model="afterSendbackNum"
              clearable
            ></el-input>

            <el-select
              v-if="index == 1"
              v-model="afterOrderType"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in afterOrderList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>

      <div class="after-first-bottom">
        <div class="first-bottom-inquire" @click="afterInquire">查询</div>
        <div class="first-bottom-reset" @click="afterReset">重置</div>
      </div>
    </div>

    <div class="after-second">
      <div class="after-second-div">
        <div class="after-second-div-left">查询结果</div>
        <div class="after-second-div-right">
          <div class="after-second-div-right-refresh" @click="refreshClick">
            刷新
          </div>
          <div class="after-second-div-right-derive" @click="deriveClick">
            <img
              class="after-second-div-right-derive-img"
              src="../../assets/common/common-derive.png"
            />
            <div class="after-second-div-right-derive-text">导出订单</div>
          </div>
        </div>
      </div>

      <div class="after-second-table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          border=""
          @selection-change="handleSelectionChange"
          :header-cell-style="{
            color: '#333333',
            backgroundColor: '#FAFAFA',
          }"
        >
          <!-- 自定义暂无数据 -->
          <template slot="empty">
            <div class="empty-block">
              <img
                class="empty-block-img"
                src="../../assets/common/common-empty.png"
              />
              <div class="empty-block-text">暂无数据～</div>
            </div>
          </template>
          <el-table-column type="selection" width="45"></el-table-column>
          <el-table-column label="订单号" width="200">
            <template slot-scope="scope">
              <div class="table-ordernum">
                <div class="table-ordernum-title">{{ scope.row.ordernum }}</div>
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scope.row.oBreak"
                  placement="top-start"
                >
                  <img
                    v-if="scope.row.oBreak != null"
                    class="table-ordernum-img"
                    :src="
                      scope.row.breakLevel == 0
                        ? require('../../assets/home/state1.png')
                        : scope.row.breakLevel == 1
                        ? require('../../assets/home/state2.png')
                        : scope.row.breakLevel == 2
                        ? require('../../assets/home/state3.png')
                        : scope.row.breakLevel == 3
                        ? require('../../assets/home/state4.png')
                        : scope.row.breakLevel == 4
                        ? require('../../assets/home/state5.png')
                        : ''
                    "
                  />
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="收件人名称" width="150">
          </el-table-column>
          <el-table-column label="收件人信息" width="206">
            <template slot-scope="scope">
              <div class="table-recipients">
                <div class="table-recipients-phone">{{ scope.row.phone }}</div>
                <div class="table-recipients-address">
                  {{ scope.row.address }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="userId"
            label="用户ID"
            width="78"
          ></el-table-column>
          <el-table-column label="用户名称" width="138">
            <template slot-scope="scope">
              <div class="table-user">
                <div class="table-user-name">{{ scope.row.userName }}</div>
                <div class="table-user-relation">联系他</div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="订单类型" width="158">
            <template slot-scope="scope">
              <div class="table-type">
                {{
                  scope.row.activityStatus == 0
                    ? '普通订单'
                    : scope.row.activityStatus == 10
                    ? 'VIP订单'
                    : scope.row.activityStatus == 30
                    ? '每日爆款'
                    : scope.row.activityStatus == 40
                    ? '限时秒杀'
                    : scope.row.activityStatus == 50
                    ? '福利订单'
                    : ''
                }}
              </div>
            </template>
          </el-table-column>

          <el-table-column label="订单状态" width="110">
            <template slot-scope="scope">
              <div
                class="table-status"
                :style="{
                  color:
                    scope.row.is_shouhou == 0
                      ? ''
                      : scope.row.is_shouhou == 1
                      ? '#5CDBD3'
                      : scope.row.is_shouhou == 2
                      ? '#F759AB'
                      : '#9254DE',
                }"
              >
                {{
                  scope.row.is_shouhou == 0
                    ? '未售后'
                    : scope.row.is_shouhou == 1
                    ? '售后中'
                    : scope.row.is_shouhou == 2
                    ? '已售后'
                    : scope.row.is_shouhou == 3
                    ? '已驳回'
                    : ''
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="商品信息" width="278">
            <template slot-scope="scope">
              <div class="table-commodity">
                <div class="table-commodity-left">
                  <img :src="scope.row.goods_image" alt="" />
                </div>
                <div class="table-commodity-right">
                  <div class="table-commodity-right-title">
                    {{ scope.row.goods_name }}
                  </div>
                  <div class="table-commodity-right-text">
                    {{ scope.row.goods_spec_name }}
                    <span style="color: #222222"
                      >x{{ scope.row.goods_num }}</span
                    >
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="商品总价" width="103">
            <template slot-scope="scope">
              <div class="table-commodityPrice">￥{{ scope.row.price }}</div>
            </template>
          </el-table-column>

          <el-table-column label="运费" width="103">
            <template slot-scope="scope">
              <div class="table-commodityPrice">
                ￥{{ scope.row.realityFreight || 0.0 }}
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="" label="实付款" width="90">
            <template slot-scope="scope">￥{{ scope.row.allprice }}</template>
          </el-table-column>
          <el-table-column prop="" label="支付方式" width="100">
            <template slot-scope="scope">
              <div class="table-paytype">
                <div class="table-paytype-title">
                  {{
                    scope.row.paytype == 1
                      ? '微信支付'
                      : scope.row.paytype == 2
                      ? '支付宝支付'
                      : scope.row.paytype == 3
                      ? '立减券抵扣'
                      : scope.row.paytype == 4
                      ? '积分支付'
                      : ''
                  }}
                </div>
                <img
                    class="table-paytype-img"
                    :src="
                      scope.row.paytype == 1
                        ? require('../../assets/home/wxico.png')
                        : scope.row.paytype == 2
                        ? require('../../assets/home/zhifuico.png')
                        : index == 4
                        ? require('../../assets/home/icon_jb.png')
                        : ''
                    "
                  />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="" label="物流详情" width="90">
            <template slot-scope="scope">
              <div class="table-logistics" @click="logisticsCheck(scope.row)">
                物流查看
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="supplierName" label="供应商名称" width="111">
          </el-table-column>
          <el-table-column prop="" label="供应商总价" width="100">
            <template slot-scope="scope"
              >￥{{ scope.row.supplier_cost }}</template
            >
          </el-table-column>
          <el-table-column prop="createTime" label="订单创建时间" width="184">
          </el-table-column>
          <el-table-column prop="payTime" label="订单支付时间" width="194">
          </el-table-column>
          <el-table-column prop="shouhuoTime" label="确认收货时间" width="194">
          </el-table-column>
          <el-table-column prop="" label="操作" width="106" fixed="right">
            <template slot-scope="scope">
              <div class="table-operation">
                <div
                  class="table-operation-title"
                  @click="remarkClick(scope.row)"
                >
                  备注
                </div>
                <div
                  class="table-operation-title"
                  style="margin-left: 10px"
                  @click="examineClick(scope.row)"
                >
                  查看
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="integral-second-Pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="prev, pager, next, sizes"
          :total="totalNum"
        >
        </el-pagination>
      </div>
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

    <!-- 物流填写 -->
    <div class="logisticswrite">
      <el-dialog
        :visible.sync="logisticswriteDialogVisible"
        style="margin-top: 10vh"
        @close="logisticswriteClose"
      >
        <span slot="footer" class="dialog-footer">
          <div class="logisticswrite-div">
            <div class="logisticswrite-div-top">
              <div class="logisticswrite-div-top-title">物流填写</div>
              <img
                class="logisticswrite-div-top-img"
                src="../../assets/common/close.png"
                @click="logisticswriteClose"
              />
            </div>

            <div class="logisticswrite-div-center">
              <div class="logisticswrite-div-center-display">
                <div
                  class="logisticswrite-div-center-display-list"
                  v-for="(item, index) in 2"
                  :key="index"
                >
                  <div class="logisticswrite-div-center-display-list-title">
                    {{ index == 0 ? '物流公司' : '物流单号' }}
                  </div>
                  <div class="logisticswrite-div-center-display-list-input">
                    <el-select
                      v-if="index == 0"
                      v-model="logisticswriteCompanyType"
                      clearable
                      placeholder="请选择"
                      @change="companyChange"
                    >
                      <el-option
                        v-for="item in logisticswriteCompanyList"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                      >
                      </el-option>
                    </el-select>

                    <el-input
                      v-if="index == 1"
                      placeholder="请输入物流单号"
                      v-model="logisticswriteTracking"
                      clearable
                    ></el-input>
                  </div>
                </div>
              </div>

              <div class="logisticswrite-div-center-textarea">
                <el-input
                  type="textarea"
                  placeholder="请填写订单物流备注信息"
                  v-model="logisticswriteTrackingRemark"
                  maxlength=""
                  show-word-limit
                ></el-input>
              </div>
            </div>

            <div class="logisticswrite-div-bottom">
              <div
                class="logisticswrite-div-bottom-title"
                @click="logisticswriteConfirm"
              >
                确 定
              </div>
            </div>
          </div>
        </span></el-dialog
      >
    </div>
  </div>
</template>

  <script>
import {
  getAfterlist,
  postOrderremark,
  getLogisticscompany,
  postShipments,
  getAfterlogistics,
} from '../../api/order'

export default {
  data() {
    return {
      // 第一区域 表头数组
      afterTitleList: ['全部订单', '待发货', '待收货', '已完成'],
      // 第一区域 表头数组下标选中
      afterTitleIndex: 0,
      // 第一区域 用户id
      afterUserid: '',
      //  第一区域 用户名称
      afterUsername: '',
      //  第一区域 用户电话
      afterUserphone: '',
      //  第一区域 供应商名称
      afterSuppliername: '',
      //  第一区域 物流单号
      afterLogistics: '',
      //  第一区域 订单号
      afterOrdernum: '',
      //  第一区域 收件人
      afterRecipients: '',
      //  第一区域 收件人电话
      afterRecipientsphone: '',
      //  第一区域 收货地址
      afterTake: '',
      //  第一区域 售后状态
      afterOrderstatusType: '',
      afterOrderstatusList: [
        {
          value: 0,
          label: '未售后',
        },
        {
          value: 1,
          label: '售后中',
        },
        {
          value: 2,
          label: '已售后',
        },
        {
          value: 3,
          label: '已驳回',
        },
      ],
      afterOrderstatusDisabled: false,
      //  第一区域 支付方式
      afterPaymentType: '',
      afterPaymentList: [
        {
          value: 1,
          label: '微信',
        },
        {
          value: 2,
          label: '支付宝',
        },
        {
          value: 3,
          label: '立减券抵扣',
        },
        {
          value: 4,
          label: '积分支付',
        },
      ],
      //  第一区域 支付单号
      afterPaymentNum: '',
      //  第一区域 订单创建时间
      afterEstablishtime: [],
      afterEstablishtimeA: '',
      afterEstablishtimeB: '',
      //  第一区域 订单支付时间
      afterPaymentTime: [],
      afterPaymentTimeA: '',
      afterPaymentTimeB: '',
      //  第一区域 寄回单号
      afterSendbackNum: '',
      //  第一区域 订单类型
      afterOrderType: '',
      afterOrderList: [
        {
          value: 50,
          label: '福利订单',
        },
        {
          value: 0,
          label: '普通订单',
        },
        {
          value: 10,
          label: 'VIP订单',
        },
        {
          value: 30,
          label: '爆品订单',
        },
        {
          value: 40,
          label: '秒杀订单',
        },
      ],

      // 第二区域 表格数组
      tableData: [],
      // 第二区域 表格总条数
      totalNum: 0,
      // 存储表格选中的值
      multipleSelection: [],
      // 页码
      page: 1,
      // 页数
      limit: 10,
      // 监听用户刷新
      loading: false,
      // 控制当前页面功能性按钮开关
      afterFunShow: false,
      // 备注弹出框  开启
      remarkDialogVisible: false,
      // 备注弹出框 单选
      remarkRadio: 0,
      // 备注弹出框  备注信息填写
      remarkOrdermessage: '',
      // 备注弹出框 当前这条订单的对象
      remarkObj: {},
      // 物流弹出框 当前这条订单的对象
      logisticsObj: {},
      // 物流弹出框 填写 开启
      logisticswriteDialogVisible: false,
      // 物流弹出框 填写 物流公司
      logisticswriteCompanyType: '',
      logisticswriteCompanyList: [],
      // 物流弹出框 填写 物流单号
      logisticswriteTracking: '',
      // 物流弹出框 填写 物流单号备注
      logisticswriteTrackingRemark: '',
      // 物流弹出框 填写 物流公司选中对象
      logisticswriteCompanyObj: {},
    }
  },
  created() {
    this.loading = true
    // 获取积分订单列表数据
    this.getAfterlistClick()
  },
  // 控制页面刷新或者挂载完后进行权限开启
  updated() {
    this.afterFunShow = this.$store.state.pageFunctionShow
  },
  methods: {
    // 获取积分订单列表数据
    getAfterlistClick() {
      this.tableData = []

      let params = {
        userId: this.afterUserid,
        userName: this.afterUsername,
        userPhone: this.afterUserphone,
        supplierName: this.afterSuppliername,
        wuliu_num: this.afterLogistics,
        name: this.afterRecipients,
        phone: this.afterRecipientsphone,
        address: this.afterTake,
        ordernum: this.afterOrdernum,
        status: '',
        paytype: this.afterPaymentType,
        activityStatus: this.afterOrderType,
        createStartTime: this.afterEstablishtimeA,
        createEndTime: this.afterEstablishtimeB,
        payStartTime: this.afterPaymentTimeA,
        payEndTime: this.afterPaymentTimeB,
        shouStartTime: '',
        shouEndTime: '',
        paycode: this.afterPaymentNum,
        shouhou_wuliu_no: this.afterSendbackNum,
        is_shouhou: this.afterOrderstatusType,
        pageSize: this.limit,
        pageNo: this.page,
      }

      getAfterlist(params).then((res) => {
        if (res.resultStatus == true) {
          // 获取数据表格
          this.tableData = res.resultData.orderList
          // 获取总条数
          this.totalNum = res.resultData.totalNum
          // 关闭刷新
          this.loading = false
        }
      })
    },
    // 点击对应分类进行切换
    titleBtn(index) {
      this.afterTitleIndex = index
      console.log('切换')

      if (index == 0) {
        this.afterOrderstatusDisabled = false
        this.afterOrderstatusType = ''
      } else {
        this.afterOrderstatusDisabled = true
        this.afterOrderstatusType = index
      }

      this.afterReset()
    },
    // 第一区域 查询
    afterInquire() {
      this.loading = true
      // 订单创建时间
      if (
        this.afterEstablishtime != null &&
        this.afterEstablishtime.length != 0
      ) {
        this.afterEstablishtimeA = Date.parse(this.afterEstablishtime[0]) / 1000
        this.afterEstablishtimeB = Date.parse(this.afterEstablishtime[1]) / 1000
      } else {
        this.afterEstablishtimeA = ''
        this.afterEstablishtimeB = ''
      }
      // 订单支付时间
      if (this.afterPaymentTime != null && this.afterPaymentTime.length != 0) {
        this.afterPaymentTimeA = Date.parse(this.afterPaymentTime[0]) / 1000
        this.afterPaymentTimeB = Date.parse(this.afterPaymentTime[1]) / 1000
      } else {
        this.afterPaymentTimeA = ''
        this.afterPaymentTimeB = ''
      }

      this.page = 1

      this.$nextTick(() => {
        this.getAfterlistClick()
      })
    },
    // 第一区域  重置
    afterReset() {
      this.loading = true
      this.afterUserid = ''
      this.afterUsername = ''
      this.afterUserphone = ''
      this.afterSuppliername = ''
      this.afterLogistics = ''
      this.afterRecipients = ''
      this.afterRecipientsphone = ''
      this.afterTake = ''
      this.afterOrdernum = ''
      this.afterPaymentType = ''
      this.afterEstablishtimeA = ''
      this.afterEstablishtimeB = ''
      this.afterPaymentTimeA = ''
      this.afterPaymentTimeB = ''
      this.afterPaymentNum = ''
      this.afterSendbackNum = ''
      this.afterOrderstatusType =
        this.afterTitleIndex == 0 ? '' : this.afterOrderstatusType
      this.page = 1
      this.afterOrderType = ''

      this.$nextTick(() => {
        this.getAfterlistClick()
      })
    },
    // 表格区域点击选中 勾选对应的
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 备注旗帜点击
    remarkClick(e) {
      if (this.afterFunShow == false) {
        return
      }

      this.remarkObj = e
      this.remarkOrdermessage = e.oBreak
      this.remarkRadio = e.breakLevel
      console.log('查询e', this.remarkObj)

      this.remarkDialogVisible = true
    },

    // 操作 点击查看跳转详情
    examineClick(e) {
      if (this.afterFunShow == false) {
        return
      }

      this.$router.push({
        path: '/afterSaledetail',
        query: {
          orderId: e.id,
        },
      })
    },

    // 备注旗帜点击 关闭
    remarkClose() {
      this.remarkOrdermessage = ''
      this.remarkRadio = 0
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
        orderId: this.remarkObj.id, //  订单id
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
          this.loading = true
          this.remarkClose()
          this.getAfterlistClick()
        }
      })
    },

    // 物流弹出框  填写查看
    logisticsCheck(e) {
      if (this.afterFunShow == false) {
        return
      }

      console.log('查询', e)

      this.logisticsObj = e
      this.getLogisticscompanyClick()
    },
    // 获取物流公司
    getLogisticscompanyClick() {
      let params = {}

      getLogisticscompany(params).then((res) => {
        if (res.resultStatus == true) {
          this.logisticswriteCompanyList = res.resultData
          this.logisticswriteDialogVisible = true
          // 获取公司进行筛选
          this.getLogisticsdetail()
        }
      })
    },

    getLogisticsdetail() {
      let params = {
        orderId: this.logisticsObj.id,
      }

      getAfterlogistics(params).then((res) => {
        if (res.resultStatus == true) {
          if (res.resultData == null) {
            return
          }
          // 物流单号
          this.logisticswriteTracking = res.resultData.wuliu_num
          // 物流备注
          this.logisticswriteTrackingRemark = res.resultData.break
          // 物流公司
          this.logisticswriteCompanyList.forEach((item, index) => {
            if (res.resultData.wuliu_name == item.name) {
              this.logisticswriteCompanyObj = item
              this.logisticswriteCompanyType = item.name
            }
          })
        }
      })
    },

    // 物流填写弹出框  关闭
    logisticswriteClose() {
      this.logisticswriteDialogVisible = false
    },
    // 物流填写弹出框 下拉勾选
    companyChange(e) {
      this.logisticswriteCompanyList.forEach((item, index) => {
        if (e == item.code) {
          this.logisticswriteCompanyObj = item
        }
      })
    },
    // 物流填写弹出框  确定
    logisticswriteConfirm() {
      let params = {
        orderId: this.logisticsObj.id, // 订单id
        wuliu_code: this.logisticswriteCompanyObj.code, // 物流公司编码
        wuliu_name: this.logisticswriteCompanyObj.name, // 物流名称
        wuliu_num: this.logisticswriteTracking, // 物流单号
        break: this.logisticswriteTrackingRemark, // 备注
      }
      postShipments(params).then((res) => {
        if (res.resultStatus == true) {
          this.$message({
            message: '物流填写成功！',
            type: 'success',
            duration: 1500,
          })
          this.logisticswriteCompanyType = ''
          this.logisticswriteTracking = ''
          this.logisticswriteTrackingRemark = ''

          this.loading = true
          this.logisticswriteDialogVisible = false
          this.getAfterlistClick()
        }
      })
    },
    // 刷新
    refreshClick() {
      this.loading = true
      this.getAfterlistClick()
    },
    deriveClick() {
      // 导出
      if (this.afterFunShow == false) {
        return
      }

      let commodityIds = this.multipleSelection
        .map((item) => {
          return item.id
        })
        .join(';')

      let Url =
        'https://laravel-api-manager.xmw1688.com/v1/manager/after/order?excel=' +
        1 +
        '&ids=' +
        commodityIds +
        '&userId' +
        this.afterUserid +
        '&userName=' +
        this.afterUsername +
        '&userPhone=' +
        this.afterUserphone +
        '&name=' +
        this.mafterRecipients +
        '&wuliu_num=' +
        this.afterLogistics +
        '&phone=' +
        this.afterRecipientsphone +
        '&supplierName=' +
        this.afterSuppliername +
        '&address=' +
        this.afterTake +
        '&ordernum=' +
        this.afterOrdernum +
        '&status=' +
        this.afterOrderstatusType +
        '&paytype=' +
        this.afterPaymentType +
        '&createStartTime=' +
        this.afterEstablishtimeA +
        '&createEndTime=' +
        this.afterEstablishtimeB +
        '&payStartTime=' +
        this.afterPaymentTimeA +
        '&payEndTime=' +
        this.afterPaymentTimeB +
        '&shouStartTime=' +
        '' +
        '&shouEndTime=' +
        '' +
        '&paycode=' +
        this.afterPaymentNum +
        '&activityStatus=' +
        this.afterOrderType +
        '&accessToken=' +
        localStorage.getItem('token')

      window.location.href = Url

      console.log('查看参数', Url)

      this.loading = false
    },

    // 查询当前页码多少条
    handleSizeChange(val) {
      this.limit = val
      this.loading = true
      this.getAfterlistClick()
    },
    // 查询当前页
    handleCurrentChange(val) {
      this.page = val
      this.loading = true
      this.getAfterlistClick()
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
.after {
  .after-first {
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px #edeff7;
    border-radius: 10px;
    padding: 0 24px 24px;
    box-sizing: border-box;

    .after-first-top {
      display: flex;
      height: 55px;
      border-bottom: 1px solid #f4f5f9;
      .top-list {
        width: 66px;
        height: 55px;
        position: relative;
        margin-right: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        .top-list-title {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
        }

        .top-list-lint {
          position: absolute;
          bottom: 0;
          width: 56px;
          height: 4px;
          background: linear-gradient(135deg, #36c53d 0%, #3fd747 100%);
          border-radius: 15px 15px 0px 0px;
        }
      }

      .active {
        .top-list-title {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 600;
          color: #222222;
        }
      }
    }

    .after-first-center {
      display: flex;
      margin-top: 20px;
      .first-center-list {
        margin-right: 22px;
        .first-center-list-title {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
        }

        .first-center-list-input {
          width: 100%;
          margin-top: 4px;
          /deep/ .el-input {
            height: 32px;
            width: 180px;
          }

          /deep/ .el-input__inner {
            padding: 0 10px;
            box-sizing: border-box;
            height: 32px;
            background-color: rgba(255, 255, 255, 0);
          }

          /deep/ .el-select .el-input.is-focus .el-input__inner {
            border-color: rgba(217, 217, 217, 1);
          }

          /deep/ .el-range-editor.el-input__inner {
            padding: 0;
            padding: 0 12px;
            box-sizing: border-box;
          }

          /deep/ .el-date-editor--daterange.el-input__inner {
            width: 382px;
          }

          /deep/ .el-date-editor .el-range-separator {
            width: 26px;
            padding: 0;
            height: 32px;
            line-height: 32px;
            background-image: url('../../assets/activities/activities-right.png');
            background-repeat: no-repeat;
            background-position: center;
          }
        }
      }

      .first-center-list:last-child {
        margin-right: 0;
      }
    }

    .after-first-bottom {
      display: flex;
      margin-top: 27px;

      .first-bottom-inquire,
      .first-bottom-reset {
        width: 110px;
        height: 36px;
        background: #222222;
        border-radius: 10px;
        text-align: center;
        line-height: 36px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        cursor: pointer;
      }

      .first-bottom-reset {
        background: #f4f5f9;
        margin-left: 10px;
        color: #999999;
      }
    }
  }

  .after-second {
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px #edeff7;
    border-radius: 10px;
    margin-top: 24px;
    padding: 24px;
    box-sizing: border-box;

    .after-second-div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;

      .after-second-div-left {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #222222;
      }

      .after-second-div-right {
        display: flex;
        align-items: center;
        justify-content: center;
        .after-second-div-right-refresh {
          width: 70px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(34, 34, 34, 0.4);
          text-align: center;
          line-height: 36px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #222222;
          cursor: pointer;
        }

        .after-second-div-right-derive {
          width: 110px;
          height: 36px;
          background: linear-gradient(135deg, #36c53d 0%, #3fd747 100%);
          border-radius: 10px;
          margin-left: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          .after-second-div-right-derive-img {
            width: 12px;
            height: 12px;
          }
          .after-second-div-right-derive-text {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
            margin-left: 8px;
          }
        }
      }
    }

    .after-second-table {
      /deep/ .el-table thead {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #333333;
        background: #d8d8d8;
      }

      /deep/ .el-table tr {
        height: 46px;
      }

      /deep/ .el-table__empty-text {
        line-height: 0;
      }

      /deep/ .el-table__cell {
        vertical-align: top;
      }

      .empty-block {
        margin-top: 62px;
        padding-bottom: 40px;
        .empty-block-img {
          width: 130px;
          height: 130px;
          margin: 0 auto;
        }

        .empty-block-text {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          margin-top: 10px;
          height: 17px;
          line-height: 17px;
        }
      }
      .table-ordernum {
        .table-ordernum-title {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #555555;
        }
        .table-ordernum-img {
          margin-top: 9px;
          width: 15px;
          height: 16px;
          cursor: pointer;
        }
      }

      .table-recipients {
        .table-recipients-phone {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #555555;
        }

        .table-recipients-address {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #555555;
          line-height: 22px;
          margin-top: 5px;
          word-break: break-all;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }

      .table-user {
        .table-user-name {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #555555;
        }
        .table-user-relation {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #2aa4ff;
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .table-status {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
      }

      .table-commodity {
        display: flex;
        align-content: center;
        .table-commodity-left {
          width: 70px;
          height: 70px;
          border: 1px solid #ccc;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .table-commodity-right {
          width: 196px;
          margin-left: 12px;
          .table-commodity-right-title {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #555555;
            line-height: 22px;
            word-break: break-all;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .table-commodity-right-text {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #555555;
            margin-top: 4px;
          }
        }
      }

      .table-commodityPrice {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #555555;
        margin-bottom: 4px;
      }

      .table-commodityPrice:last-child {
        margin-bottom: 0;
      }

      .table-paytype {
        .table-paytype-title {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #555555;
        }
        .table-paytype-img {
          width: 34px;
          height: 34px;
          margin-top: 7px;
        }
      }

      .table-operation {
        display: flex;
        align-items: center;
        .table-operation-title {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #2aa4ff;
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .table-logistics {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #2aa4ff;
        text-decoration: underline;
        cursor: pointer;
      }
    }

    .integral-second-Pagination {
      height: 88px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      /deep/ .el-pagination .btn-prev {
        padding: 0;
        width: 32px;
        height: 32px;
        background: #ffffff;
        border-radius: 2px;
        border: 1px solid #d9d9d9;
        margin-right: 8px;
      }

      /deep/ .el-pagination .btn-next {
        padding: 0;
        width: 32px;
        height: 32px;
        background: #ffffff;
        border-radius: 2px;
        border: 1px solid #d9d9d9;
      }

      /deep/ .el-pager li {
        padding: 0;
        width: 32px;
        height: 32px;
        background: #ffffff;
        border-radius: 2px;
        border: 1px solid #d9d9d9;
        line-height: 32px;
        margin-right: 8px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.65);
      }

      /deep/ .el-pager li.active {
        background: #000000;
        color: #ffffff;
      }

      /deep/ .el-input--mini .el-input__inner {
        height: 32px;
      }

      /deep/ .el-input__inner {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.65);
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
  // 物流填写弹出框
  .logisticswrite {
    /deep/ .el-dialog {
      width: 444px;
      height: 370px;
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

    .logisticswrite-div {
      .logisticswrite-div-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 56px;
        padding: 0 24px;
        box-sizing: border-box;
        border-bottom: 1px solid #d9d9d9;
        .logisticswrite-div-top-title {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 600;
          color: #222222;
        }

        .logisticswrite-div-top-img {
          width: 10px;
          height: 10px;
        }
      }

      .logisticswrite-div-center {
        padding: 20px 0;
        box-sizing: border-box;
        margin: 0 24px;
        .logisticswrite-div-center-display {
          display: flex;
          justify-content: space-between;

          .logisticswrite-div-center-display-list {
            .logisticswrite-div-center-display-list-title {
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #333333;
            }
            .logisticswrite-div-center-display-list-input {
              margin-top: 4px;
              /deep/ .el-input {
                height: 32px;
                width: 180px;
              }

              /deep/ .el-input__inner {
                padding: 0 10px;
                box-sizing: border-box;
                height: 32px;
                background-color: rgba(255, 255, 255, 0);
              }

              /deep/ .el-select .el-input.is-focus .el-input__inner {
                border-color: rgba(217, 217, 217, 1);
              }
            }
          }
        }

        .logisticswrite-div-center-textarea {
          height: 152px;
          background: #ffffff;
          border-radius: 5px;
          margin-top: 14px;

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
      }

      .logisticswrite-div-bottom {
        display: flex;
        height: 52px;
        align-items: center;
        justify-content: flex-end;
        padding: 0 16px;
        box-sizing: border-box;
        border-top: 1px solid #d9d9d9;

        .logisticswrite-div-bottom-title {
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
