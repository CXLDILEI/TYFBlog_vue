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
