// 用户管理模块接口
import { get, post, put, deletefn } from "../api/request";
// 用户统计基础信息
export const getStatistics = params => get(`/v1/manager/user/statistics/index`, params)

// 用户统计曲线图
export const getuserMonth = params => get(`/v1/manager/user/statistics/month`, params)

// 用户列表
export const getuserList = params => get(`/v1/manager/user`, params)

// 用户冻结或解冻
export const getuserDeblocking = params => put(`/v1/manager/user/${params}`)

// 用户详情
export const getuserParticulars = params => get(`/v1/manager/user/${params}`)

// 用户邀请列表
export const getuserInviteList = params => get(`/v1/manager/user/invite`, params)

// 用户会员充值
export const getuserMemberRecharge = params => get(`/v1/manager/user/vip`, params)

