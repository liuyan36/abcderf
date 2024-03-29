import axios from 'axios'
import Qs from 'qs';
import { Message } from 'element-ui';
import { resetTokenAndClearUser } from '../utils'

// 环境的切换:开发，测试，生产
if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'https://laravel-api-manager.xmw1688.com/'
    // axios.defaults.baseURL = 'https://k3.bainong365.cn/'
} else if (process.env.NODE_ENV === 'debug') {
    axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = 'https://laravel-api-manager.xmw1688.com/'
    // axios.defaults.baseURL = 'https://k3.bainong365.cn/'
}
axios.defaults.timeout = 100000
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;multipart/form-data'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// // 请求拦截器
axios.interceptors.request.use(config => {
    // 在发送请求之前做些什么 验证token之类的
    config.headers['accessToken'] = localStorage.getItem('token')

    return config;
}, error => {
    // 对请求错误做些什么
    Message.error({ message: '请求超时!' })
    return Promise.error(error);
})

// 响应拦截
axios.interceptors.response.use(response => {
    // 对响应数据做点什么
    return response;
}, error => {
    // 对响应错误做点什么
    return Promise.reject(error);
});

// 封装get方法和post方法

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            if (res.data.resultStatus == true) {
                resolve(res.data);
            } else {
                resolve(res.data);
                if (res.data.resultStatus == false && res.data.errorMessage == '禁止访问' && res.data.errorCode == '000403') {
                    resetTokenAndClearUser()

                    location.reload();

                    Message({ message: '您的ID已在其他设备登录, 请您重新登录', type: 'error' });
                } else {
                    Message({ message: res.data.errorMessage, type: 'error' });
                }
            }


            // Loading.service(true).close();
            // Message({message: '请求成功', type: 'success'});


        }).catch(err => {
            reject(err.data)
            // Loading.service(true).close();
            Message({ message: '加载失败', type: 'error' });
        })
    });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                if (res.data.resultStatus == true) {
                    resolve(res.data);
                } else {
                    resolve(res.data);
                    if (res.data.resultStatus == false && res.data.errorMessage == '禁止访问' && res.data.errorCode == '000403') {
                        resetTokenAndClearUser()
                        location.reload();

                        Message({ message: '您的ID已在其他设备登录, 请您重新登录', type: 'error' });

                    } else {
                        Message({ message: res.data.errorMessage, type: 'error' });
                    }
                }
                // Loading.service(true).close();
                // Message({message: '请求成功', type: 'success'});
            })
            .catch(err => {
                reject(err.data)
                // Loading.service(true).close();
                Message({ message: '加载失败', type: 'error' });
            })
    });
}

/**
 * post方法，参数序列化
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function qspost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, Qs.stringify(params))
            .then(res => {
                if (res.data.resultStatus == true) {
                    resolve(res.data);
                } else {
                    resolve(res.data);
                    if (res.data.resultStatus == false && res.data.errorMessage == '禁止访问' && res.data.errorCode == '000403') {
                        resetTokenAndClearUser()
                        location.reload();

                        Message({ message: '您的ID已在其他设备登录, 请您重新登录', type: 'error' });
                    } else {
                        Message({ message: res.data.errorMessage, type: 'error' });
                    }
                }
                // Loading.service(true).close();
                // Message({message: '请求成功', type: 'success'});
            })
            .catch(err => {
                reject(err.data)
                // Loading.service(true).close();
                Message({ message: '加载失败', type: 'error' });
            })
    });
}


/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url, params) {
    return new Promise((resolve, reject) => {
        axios.put(url, params)
            .then(res => {
                if (res.data.resultStatus == true) {
                    resolve(res.data);
                } else {
                    resolve(res.data);
                    if (res.data.resultStatus == false && res.data.errorMessage == '禁止访问' && res.data.errorCode == '000403') {
                        resetTokenAndClearUser()
                        location.reload();

                        Message({ message: '您的ID已在其他设备登录, 请您重新登录', type: 'error' });
                    } else {
                        Message({ message: res.data.errorMessage, type: 'error' });
                    }
                }

            })
            .catch(err => {
                reject(err.data)
                // Loading.service(true).close();
                Message({ message: '加载失败', type: 'error' });
            })
    });
}


/**
 * delete
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function deletefn(url, params) {
    return new Promise((resolve, reject) => {
        axios.delete(url, params)
            .then(res => {
                if (res.data.resultStatus == true) {
                    resolve(res.data);
                } else {
                    resolve(res.data);
                    if (res.data.resultStatus == false && res.data.errorMessage == '禁止访问' && res.data.errorCode == '000403') {
                        resetTokenAndClearUser()
                        location.reload();

                        Message({ message: '您的ID已在其他设备登录, 请您重新登录', type: 'error' });
                    } else {
                        Message({ message: res.data.errorMessage, type: 'error' });
                    }
                }
                // Loading.service(true).close();
                // Message({message: '请求成功', type: 'success'});
            })
            .catch(err => {
                reject(err.data)
                // Loading.service(true).close();
                Message({ message: '加载失败', type: 'error' });
            })
    });
}
