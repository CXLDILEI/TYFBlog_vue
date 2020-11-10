import { Module, MutationTree, ActionTree, ActionContext, GetterTree } from 'vuex';
import {RootState} from '@/store'

export interface ILoginInfoState {
    token?: string;
    info?: unknown;
}

const state = {
    token: ''
}
const mutations = {
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
