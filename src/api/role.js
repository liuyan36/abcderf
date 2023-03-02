// 权限界面接口
import { get, post, put, deletefn } from "../api/request";

// 管理员列表
export const getAdminList = params => get(`/v1/manager/admin`, params)

// 管理员列表  删除
export const deletefnAdminList = params => deletefn(`/v1/manager/admin/${params}`)

// 管理员列表  详情
export const getAdminListDetail = params => get(`/v1/manager/admin/${params}`)

// 管理员列表  新增
export const postAdminListAdd = params => post(`/v1/manager/admin`, params)

// 管理员日志
export const getAdministrator = params => get(`/v1/manager/admin/log`, params)


