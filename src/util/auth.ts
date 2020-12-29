import Cookies from 'js-cookie';

const TokenKey = 'TYF_BLOG';

export function getToken(): string {
    return `Bearer ${Cookies.get(TokenKey)}` || '';
}

export function setToken(token: string) {
    return Cookies.set(TokenKey, token);
}

export function removeToken() {
    return Cookies.remove(TokenKey);
}
