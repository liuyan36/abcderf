// 活动管理模块接口
import { get, post, put, deletefn } from "../api/request";
// 大转盘管理
export const getluck = params => get(`/v1/manager/luck`, params)

// 大转盘编辑
export const postluckCompile = params => post(`/v1/manager/luck`, params)

// 大转盘禁用启用
export const putluckDisable = params => put(`/v1/manager/luck/update`)

// 大转盘奖励编辑
export const postluckCompileAward = params => post(`/v1/manager/luck/detail`, params)

// 大转盘中奖明细
export const getluckprizeDetail = params => get(`/v1/manager/luck/detail`, params)

// 红包管理
export const getred = params => get(`/v1/manager/red`, params)

// 红包管理禁用启用
export const putredDisable = params => put(`/v1/manager/red/update`, params)

// 规则编辑
export const postredruleCompile = params => post(`/v1/manager/red`, params)

// 红包新增编辑
export const postredAdd = params => post(`/v1/manager/red/detail`, params)

// 红包删除
export const deletefnredDetails = params => deletefn(`/v1/manager/red/${params}`)

// 红包兑换明细
export const getredDetails = params => get(`/v1/manager/red/log`, params)

// 每日爆品管理
export const geteverydayGoods = params => get(`/v1/manager/bomb`, params)

// 每日爆品规则
export const geteverydayGoodsrule = params => post(`/v1/manager/bomb`, params)

// 每日爆品 禁用启用
export const puteverydayDisable = params => put(`/v1/manager/bomb/update`, params)

// 每日爆品 新增编辑
export const posteverydayAdd = params => post(`/v1/manager/bomb/detail`, params)

// 每日爆品 商品删除
export const deletefneveryday = params => deletefn(`/v1/manager/bomb/${params}`)

// 每日爆品 置顶
export const puteverydayTop = params => put(`/v1/manager/bomb/detail/${params}`)

// 限时秒杀
export const getTimeseckill = params => get(`/v1/manager/kill`, params)

// 秒杀规则编辑
export const postTimeseckillRule = params => post(`/v1/manager/kill`, params)

// 秒杀禁用启用
export const putTimeseckillDisable = params => put(`/v1/manager/kill/update`, params)

// 秒杀新增编辑
export const postTimeseckillAdd = params => post(`/v1/manager/kill/detail`, params)

// 秒杀新增编辑
export const deletefnTimeseckillDetele = params => deletefn(`/v1/manager/kill/${params}`)

// 秒杀新增编辑
export const putTimeseckill = params => put(`/v1/manager/kill/detail/${params}`)

