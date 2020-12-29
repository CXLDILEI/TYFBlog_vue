import {Module} from 'vuex';
import {RootState} from '@/store';
import {getUserInfo} from '@/api/auth'

export interface ILoginInfoState {
    token?: string;
    info?: unknown;
}

export interface UserInfo {
    attachmentNote: Array<unknown>
    avatar: string
    createTime: string
    sex: number
    userName: string
    _id: string
}

const state = {
    token: ''
}
const mutations = {
    setToken(state: ILoginInfoState, token: string) {
        state.token = token;
    },
    setInfo(state: ILoginInfoState, info: UserInfo) {
        state.info = info;
    },
}
const actions = {
    setUserInfo(ctx: { commit: (arg0: string, arg1: any) => void; }) {
        getUserInfo().then((res) => {
            ctx.commit('setInfo', res.data.userInfo)
        })
    }
}

const user: Module<ILoginInfoState, RootState> = {
    namespaced: true,
    state,
    mutations,
    actions,
};

export default user;
