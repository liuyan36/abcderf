//供应商接口
import { get, post, put, deletefn } from "../api/request";

// 供应商运费模板列表
export const getfreight = params => get(`/v1/manager/supplier/freight`, params)

// 供应商运费模板地区列表
export const getarea = params => get(`/v1/manager/supplier/freight/area`, params)

//设置非免邮地区
export const postareano = params => post(`/v1/manager/supplier/freight/area/no`, params)

//设置免邮地区
export const postareayes = params => post(`/v1/manager/supplier/freight/area/yes`, params)

//获取运费规则
export const getrule = params => get(`/v1/manager/supplier/freight/rule`, params)

//设置运费规则
export const postrule = params => post(`/v1/manager/supplier/freight/rule`, params)

// 删除运费规则
export const deletefnRule = params => deletefn(`/v1/manager/supplier/freight/rule?id=${params.id}`)



//供应商列表
export const getsupplier = params => get(`/v1/manager/supplier`, params)

//供应商详情
export const getsupplierId = params => get(`/v1/manager/supplier/${params}`)

//供应商添加修改
export const postsupplier = params => post(`/v1/manager/supplier`, params)

//供应商删除
export const deletesupplier = params => deletefn(`/v1/manager/supplier/${params}`)

//供应商终止合作
export const endsupplier = params => deletefn(`/v1/manager/supplier/end/${params}`)

//供应商继续合作
export const putsupplier = params => put(`/v1/manager/supplier/${params}`)

//供应商运费模板删除
export const deletefreight = params => deletefn(`/v1/manager/supplier/freight/${params}?force=1`)

//供应商运费模板新增修改
export const postfreight = params => post(`/v1/manager/supplier/freight`, params)

