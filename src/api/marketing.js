// 登录界面接口
import { get, post, put, deletefn } from "../api/request";

// 轮播图列表
export const getMarketSwiperList = params => get(`/v1/manager/banner`, params)

// 轮播图详情
export const getMarketSwiperdetail = params => get(`/v1/manager/banner/${params}`)

// 轮播图删除
export const deletefnMarketSwiper = params => deletefn(`/v1/manager/banner/${params}`)

// 轮播图置顶
export const putfnMarketSwiper = params => put(`/v1/manager/banner/${params}`)

// 轮播图添加或者修改
export const postfnMarketSwiperAdd = params => post(`/v1/manager/banner`, params)




// 金刚列表
export const getMarketKingList = params => get(`/v1/manager/jin`, params)

// 金刚区添加修改
export const postMarketKingAdd = params => post(`/v1/manager/jin`, params)

// 金刚区删除
export const deletefnMarketKing = params => deletefn(`/v1/manager/jin/${params}`)

// 金刚区置顶
export const putfnMarketKing = params => put(`/v1/manager/jin/${params}`)

// 金刚区 下级 列表
export const getMarketKingsecon = params => get(`/v1/manager/jin/good`, params)

// 金刚区  下级 修改新增
export const postMarketKingseconAdd = params => post(`/v1/manager/jin/good`, params)

// 金刚区删除
export const deletefnMarketKingsecon = params => deletefn(`/v1/manager/jin/good/${params}`)


// 金刚区  下级 置顶
export const putfnMarketKingsecon = params => put(`/v1/manager/jin/good/${params}`)


