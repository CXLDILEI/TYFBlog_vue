import {createStore} from 'vuex'
import user from './modules/user';

export interface RootState {
    user?: any;
}

const store = createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user
    }
})
// 热重载
if ((module as any).hot) {
    (module as any).hot.accept(
        [
            './modules/user',
        ],
        () => {
            store.hotUpdate({
                modules: {
                    user: require('./modules/user'),
                }
            });
        }
    );
}
export default store;
