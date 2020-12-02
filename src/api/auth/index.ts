import {ApiPromise, get, post} from '@/api';

export interface LoginInfo {
    userName: string,
    password: string
}

/**
 * 登录
 * @param data
 */
export function login(data: LoginInfo): ApiPromise<any> {
    return post('/user/login', data);
}

/**
 * 获取用户信息
 */
export function getUserInfo(): ApiPromise<any> {
    return get('getUserById');
}
