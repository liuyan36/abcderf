// 商品管理模块接口
import { get, post, put, deletefn } from "../api/request";

// 商品分类模块
// 商品一级分类
export const getcommodityClassify = params => get(`/v1/manager/goods/type/one`, params)

// 商品一级分类详情
export const getcommodityClassifyParticulars = params => get(`/v1/manager/goods/type/one/${params}`)

// 商品一级分类新增修改
export const postcommodityClassifyAdd = params => post(`/v1/manager/goods/type/one`, params)

// 商品一级分类删除
export const deletefncommodityClassifyDetele = params => deletefn(`/v1/manager/goods/type/one/${params}`)

//  商品二级分类
export const getsecondClass = params => get(`/v1/manager/goods/type/two`, params)

//  商品二级分类详情
export const getsecondClassParticulars = params => get(`/v1/manager/goods/type/two/${params}`)


//  商品二级分类新增修改
export const postsecondClassAdd = params => post(`/v1/manager/goods/type/two`, params)

// 商品一级显示隐藏
export const putsecondClassConceal = params => put(`/v1/manager/goods/type/two/${params}`)

// 商品一级分类删除
export const deletefnsecondClassDetele = params => deletefn(`/v1/manager/goods/type/two/${params}`)


// 销售商品模块
// 商品列表
export const getMarketList = params => get(`/v1/manager/good`, params)

// 商品列表详情
export const getMarketDetails = params => get(`/v1/manager/good/${params}`)

//  商品上下架修改
export const putMarketStand = params => put(`/v1/manager/good/${params}`)

//  商品批量下架修改
export const putMarketStandList = params => put(`/v1/manager/good/update/more`, params)

//  商品删除
export const deletefnMarket = params => deletefn(`/v1/manager/good/${params}`)

//  商品批量删除
export const postfnMarketList = params => post(`/v1/manager/good/delete/more`, params)

// 商品分类转移
export const postMarketTransfer = params => post(`/v1/manager/good/transfer`, params)

// 商品添加 或者 商品编辑
export const postMarketAdd = params => post(`/v1/manager/good`, params)

// 积分模块
// 积分商品列表
export const getintegralList = params => get(`/v1/manager/integral/good`, params)

// 积分商品分类转移
export const postintegralTransfer = params => post(`/v1/manager/integral/good/transfer`, params)

//  积分商品上下架修改
export const putintegralStand = params => put(`/v1/manager/integral/good/${params}`)

//  积分商品批量下架修改
export const putintegralStandList = params => put(`/v1/manager/integral/good/update/more`, params)

// 积分商品详情
export const getintegralDetails = params => get(`/v1/manager/integral/good/${params}`)

//  积分商品删除
export const deletefniIntegral = params => deletefn(`/v1/manager/integral/good/${params}`)

//  积分商品批量删除
export const postfnintegralList = params => post(`/v1/manager/integral/good/delete/more`, params)

// 积分商品添加 或者 积分商品编辑
export const postintegralAdd = params => post(`/v1/manager/integral/good`, params)


// 商品规格详情列表
export const getMarkSkulist = params => get(`/v1/manager/good/stock`, params)

// 商品规格详情修改
export const postMarkSkulistEdit = params => post(`/v1/manager/good/stock`, params)

// 积分商品规格详情列表
export const getintegralSkulist = params => get(`/v1/manager/integral/good/stock`, params)

// 积分商品规格详情修改
export const postintegralSkulistEdit = params => post(`/v1/manager/integral/good/stock`, params)


// 福利商品 详情
export const getWelfaredetail = params => get(`/v1/manager/welfare/good/${params}`)

// 福利商品 新增修改
export const postWelfareadd = params => post(`v1/manager/welfare/good`, params)

// 福利商品 列表
export const getWelfarelist = params => get(`/v1/manager/welfare/good`, params)
