import axiosObj, {AxiosInstance, AxiosRequestConfig} from "axios";
import store from "../store/index";
import {message} from 'ant-design-vue';
import {toLogin} from '@/router';
import {removeToken, getToken} from '@/util/auth';

export const baseURL = process.env.VUE_APP_BASE_URL;
export const uploadURL = process.env.VUE_APP_UPLOADURL;

interface ApiResult<T> {
    msg: string;
    code: number;
    data: T;
}

export type ApiPromise<R> = Promise<ApiResult<R>>;

const defaultConfig = {
    baseURL,
    // 请求超时时间
    timeout: 60 * 1000,
    // 跨域请求时是否需要凭证
    // withCredentials: true, // Check cross-site Access-Control
    heards: {
        get: {
            // 将普适性的请求头作为基础配置。当需要特殊请求头时，将特殊请求头作为参数传入，覆盖基础配置
        },
        post: {
            "Content-Type": "application/json;charset=utf-8"
            // 将普适性的请求头作为基础配置。当需要特殊请求头时，将特殊请求头作为参数传入，覆盖基础配置
        }
    }
};

/**
 * 请求失败后的错误统一处理，当然还有更多状态码判断，根据自己业务需求去扩展即可
 * @param status 请求失败的状态码
 * @param msg 错误信息
 */
const errorHandle = (status: number, msg: string) => {
    // 状态码判断
    switch (status) {
        // 401: 未登录状态，跳转登录页
        case 401:
            // 如果不需要自动刷新token，可以在这里移除本地存储中的token，跳转登录页
            removeToken();
            toLogin();

            return;
            break;
        // 403 token过期
        case 403:
            removeToken();
            // 页面刷新
            parent.location.reload();
            return;
            break;
        // 404请求不存在
        case 404:
            // 提示资源不存在
            break;
        default:
    }
};


let _axios: AxiosInstance;

// 创建实例
_axios = axiosObj.create(defaultConfig);
// 请求拦截器
_axios.interceptors.request.use(
    function (config) {
        // 从cookie里获取token
        const token = getToken() ? `Bearer ${getToken()}` : undefined;
        // 如果token存在就在请求头里添加
        token && (config.headers.Authorization = token);
        return config;
    },
    function (error) {
        error.data = {};
        error.data.msg = "服务器异常";
        return Promise.reject(error);
    }
);
// 响应拦截器
_axios.interceptors.response.use(
    function (response) {
        if(response.data instanceof Blob){
            //是流文件
            return Promise.resolve(response);
        }
        if (response.data.code === 0) {
            // 只返回response中的data数据
            return Promise.resolve(response);
        }
        return Promise.reject(response || '操作失败')
    },
    function (error) {
        if (error) {
            // 请求已发出，但不在2xx范围内
            errorHandle(error.response.status, error.response.msg);
            return Promise.reject(error);
        } else {
            // 断网
            message.error('网络错误')
            return Promise.reject(error);
        }
    }
);

export function post<R>(url: string, data?: any, conf?: AxiosRequestConfig): ApiPromise<R> {
    return new Promise((resolve, reject) => {
        _axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
        _axios.request(Object.assign({}, conf, {url, method: 'post', data}))
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data)
            })
    });
}

export function get<R>(url: string, params?: any, conf?: AxiosRequestConfig): ApiPromise<R> {
    return new Promise((resolve, reject) => {
        _axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
        _axios.request(Object.assign({}, conf, {url, method: 'get', params}))
            .then((res: any) => {
                resolve(res.data);
            })
            .catch((err: any) => {
                reject(err.data)
            })
    });
}

export function upLoad<R>(url: string, data?: any, conf?: AxiosRequestConfig): ApiPromise<R> {
    return new Promise((resolve, reject) => {
        _axios.defaults.baseURL = process.env.VUE_APP_UPLOADURL;
        _axios.request(Object.assign({}, conf, {url, method: 'post', data}))
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data)
            })
    });
}
