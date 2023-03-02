// 公共界面接口
import { get, post, put, deletefn } from "../api/request";
// 地区接口
export const getdistrict = params => get(`/common/district`, params)

// 品牌接口
export const getbrand = params => get(`/v1/manager/brand`, params)

// 上传接口
export const postuploading = params => post(`/common/upload`, params)

// 快递查询
export const getexpressage = params => get(`/common/kuaidi`, params)

/******基础设置接口****** */

// 通知列表
export const getinform = params => get(`/v1/manager/message`, params)

// 通知详情
export const getinformDetail = params => get(`/v1/manager/message/${params}`)

// 通知添加
export const postinformAdd = params => post(`/v1/manager/message`, params)

// 关于我们详情
export const getaboutDetail = params => get(`/v1/manager/about`, params)

// 关于我们详情修改
export const postaboutDetail = params => post(`/v1/manager/about`, params)

// 帮助列表
export const gethelp = params => get(`/v1/manager/help`, params)

// 帮助详情
export const gethelpDetail = params => get(`/v1/manager/help/${params}`)

// 帮助新增修改
export const posthelpAdd = params => post(`/v1/manager/help`, params)

// 帮助删除
export const deletefnhelp = params => deletefn(`/v1/manager/help/${params}`)

// 协议管理
export const getagreement = params => get(`/v1/manager/yinsi`, params)

// 协议详情
export const getagreementDetail = params => get(`/v1/manager/yinsi/${params}`)

// 协议管理修改
export const postagreementAdd = params => post(`/v1/manager/yinsi`, params)





// 敏感词列表
export const getsensitive = params => get(`/v1/manager/mgc`, params)

// 敏感词添加
export const postsensitiveAdd = params => post(`/v1/manager/mgc`, params)

// 敏感词删除
export const deletefnsensitive = params => deletefn(`/v1/manager/mgc/${params}`)

// 联系我们详情
export const getrelationDetail = params => get(`/v1/manager/relation`, params)

// 联系我们修改
export const postrelationAdd = params => post(`/v1/manager/relation`, params)

// 搜索列表
export const getsearch = params => get(`/v1/manager/search`, params)

// 搜索列表添加
export const getsearchAdd = params => post(`/v1/manager/search`, params)

// 搜索列表详情
export const getsearchDetail = params => get(`/v1/manager/search/${params}`)

// 搜索列表删除
export const deletefnsearchDetail = params => deletefn(`/v1/manager/search/${params}`)


