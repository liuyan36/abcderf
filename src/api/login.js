// 登录界面接口
import { get, post, put, deletefn } from "../api/request";
// 登录接口
export const postlogin = params => post(`/v1/manager/login`, params)

// 退出登录接口
export const loginout = params => post(`/v1/manager/loginout`, params)

// 发送验证码
export const postcode = params => post(`/common/code`, params)

// 获取个人信息接口
export const getinfo = params => get(`/v1/manager/login/info`, params)
