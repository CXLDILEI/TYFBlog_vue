<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script lang="ts">
    import {defineComponent, onMounted} from 'vue';
    import {useStore} from 'vuex';
    import {getToken} from '@/util/auth';

    export default defineComponent({
        setup() {
            const store = useStore();
            onMounted(() => {
                //如果本地存有token重新设置用户信息；
                if (getToken()) {
                    store.dispatch('user/setUserInfo');
                }
            })
        }
    })
</script>
<style>
    #app {
        font-family: Lato, "PingFang SC", "Microsoft YaHei", sans-serif !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #314659;
    }

    .main-content {
        min-height: 100vh;
        padding: 16px;
        background: transparent;
        font-size: 15px;
    }

    .backgound {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        zoom: 1;
        background-repeat: no-repeat;
        background-position: center 0;
        background-size: cover;
        -webkit-background-size: cover;
        -o-background-size: cover;
        background-color: #40a9ff73;
        background-attachment: fixed !important;
        opacity: .7;
    }

    .margin-b-default {
        margin-bottom: 8px;
    }
</style>
