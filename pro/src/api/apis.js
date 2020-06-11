import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:5000'

// 登录API_Login
// account:用户名
// passowrd:密码
export const API_Login = (account,password)=>  axios.post('/users/checkLogin',{account,password})

// token验证API_token
// token值 字符串
export const API_token = (token)=>  axios.get('/users/checktoken',{params: {token}})

// 添加账号API_add_count
// account :用户名
// password :密码
// userGroup 用户组
export const API_add_count = (account,password,userGroup)=>  axios.post('/users/add',{account,password,userGroup})

// 获取账号PAI_acc_list
// currentPage 当前页
// pageSize 每页条数
export const API_acc_list = (currentPage,pageSize)=>  axios.get('/users/list',{params: {currentPage,pageSize}})

// 删除单个账号API_del_single
// id 当前id
export const API_del_single = (id)=>  axios.get('/users/del',{params: {id}})

// 批量删除接口API_del_all
// ids 需要删除的id数组
export const API_del_all = (ids)=>  axios.get('/users/batchdel',{params: {ids}})

// 修改账号接口API_edit_account
// id 当前id
// account 用户名
// userGroup 用户分组
export const API_edit_account = (id,account,userGroup)=>  axios.post('/users/edit',{id,account,userGroup})

// 修改密码API_chage_pass
// newPwd 新密码
// id 用户id
export const API_chage_pass = (newPwd,id)=>  axios.post('/users/editpwd',{newPwd,id})

// 原密码验证API_old_pass
// id 用户id
// oldPwd 原来密码
export const API_old_pass = (id,oldPwd)=>  axios.get('/users/checkoldpwd',{params: {id,oldPwd}})

// 获取个人信息API_get_personal
// 用户id
export const API_get_personal = (id)=>  axios.get('/users/accountinfo',{params:{id}})

// 获取分类列表
// currentPage 当前页
// pageSize 显示多少条数据
export const API_get_cate = (currentPage,pageSize)=>  axios.get('/goods/catelist',{params: {currentPage,pageSize}})

// 添加分类接口API_add_cate
// cateName 分类名称
// state 是否启用状态
export const API_add_cate = (cateName,state) =>  axios.post('/goods/addcate',{cateName,state})

// 删除分类接口API_del_cate
// id 当前id
export const API_del_cate = (id)=>  axios.get('/goods/delcate',{params: {id}})

// 修改分类接口API_update_cate
// id 用户id
// cateName 分类名称
// state 是否启用状态
export const API_update_cate = (id,cateName,state) =>  axios.post('/goods/editcate',{id,cateName,state})

// 获取商品列表接口API_get_goodslist
export const API_get_goodslist = (currentPage,pageSize)=>  axios.get('/goods/list',{params: {currentPage,pageSize}})

// 添加商品接口API_add_goods
// name 商品名字
// category 商品分类
// category 商品价格
// imgUrl 图片路径
// goodsDesc 商品描述
export const API_add_goods = (name,category,price,imgUrl,goodsDesc) =>  axios.post('/goods/add',{name,category,price,imgUrl,goodsDesc})

// 删除商品接口 API_del_goods
// id 当前id
export const API_del_goods = (id)=>  axios.get('/goods/del',{params: {id}})

// 订单列表接口 API_get_order
// currentPage 当前页
// pageSize 每页显示条数
// 可传参数
// orderNo 订单号
// consignee 收货人
// phone 手机号
// orderState 订单状态
// date 订单时间段
export const API_get_order = (currentPage,pageSize,orderNo,consignee,phone,orderState,date)=>  axios.get('/order/list',{params: {currentPage,pageSize,orderNo,consignee,phone,orderState,date}})

// 商品分类接口 API_goods_cate  不传参数
export const API_goods_cate = ()=>  axios.get('/goods/categories')

// 修改商品信息接口 API_goods_edit 
// name 商品名称
// category 商品分类
// price 商品价格
// imgUrl 商品图片名字
// goodsDesc 商品描述
// id 当前id
export const API_goods_edit = (name,category,price,imgUrl,goodsDesc,id)=>  axios.post('/goods/edit',{name,category,price,imgUrl,goodsDesc,id})

// 首页报表 API_order_totalData
export const API_order_totalData = ()=>  axios.get('/order/totaldata')

// 订单报表 API_ordertotal
export const API_ordertotal = (date)=>  axios.get('/order/ordertotal',{params:{date}})

// 修改订单信息 API_edit_goods
// 
export const API_edit_goods = (id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState) =>  axios.post('/goods/edit',{id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState})

// 获取店铺详情
export const API_get_shops = ()=>  axios.get('/shop/info')