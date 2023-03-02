//订单界面接口
import { get, post, put, deletefn } from "../api/request";
// 订单管理
export const order = params => get(`/v1/manager/order`, params)

//获取物流
export const wuliu = params => get(`/v1/manager/order/wuliu`, params)
//填写备注
export const break1 = data => post(`/v1/manager/order/break`, data)
//发货
export const send = data => post(`/v1/manager/order/send`, data)

//物流公司
export const kuaidi = params => get(`/v1/manager/kuaidi`, params)


// -----------重构
// 售后订单列表
export const getAfterlist = params => get(`/v1/manager/after/order`, params)
// 售后订单详情
export const getAfterdetail = params => get(`/v1/manager/after/order/${params}`)
// 售后订单详情 拒绝
export const postAfterrefund = params => post(`/v1/manager/after/order/refund`, params)
// 售后订单详情 同意仅退款
export const postAfteragressd = params => post(`/v1/manager/after/order/agressd`, params)
// 订单详情  物流
export const getAfterlogistics = params => get(`/v1/manager/order/wuliu`, params)
// 售后订单详情 同意退货
export const postAfterrechanging = params => post(`/v1/manager/after/order/rechanging`, params)

// 订单列表
export const getOrderlist = params => get(`/v1/manager/order`, params)
// 订单详情
export const getOrderdetails = params => get(`/v1/manager/order/${params}`)
// 订单详情 填写备注
export const postOrderremark = params => post(`/v1/manager/order/break`, params)


// 积分订单详情
export const getIntegraldetail = params => get(`/v1/manager/integral/order/${params}`)

// 积分订单列表
export const getIntegral = params => get(`/v1/manager/integral/order`, params)

//物流公司
export const getLogisticscompany = params => get(`/v1/manager/kuaidi`, params)

// 物流公司 发货
export const postShipments = data => post(`/v1/manager/order/send`, data)
