import { Module, MutationTree, ActionTree, ActionContext, GetterTree } from 'vuex';
import {RootState} from '@/store'

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
const actions= {
}

const user: Module<ILoginInfoState,RootState> = {
    namespaced: true,
    state,
    mutations,
    actions,
};

export default user;
