// 首页界面接口
import { get, post, put, deletefn } from "../api/request";

// 首页界面接口
export const getIndex = params => get(`/v1/manager/index`, params)
// 首页销售额曲线
export const getPrice = params => get(`/v1/manager/index/price`, params)
